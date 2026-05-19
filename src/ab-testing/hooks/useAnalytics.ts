/**
 * Analytics Hook for A/B Testing
 * 
 * Хук для отправки аналитических событий A/B теста.
 * 
 * Поддерживаемые платформы аналитики:
 * - Custom fetch endpoint (по умолчанию, универсальный)
 * - Google Analytics 4 (GA4)
 * - PostHog
 * - Amplitude
 * 
 * Архитектура:
 * - Единый интерфейс для всех платформ
 * - Кастомный fetch как fallback (отправляет на ваш endpoint)
 * - Автоматическое обогащение событий данными о варианте теста
 * - Буферизация событий при отсутствии соединения
 */

import { useCallback, useRef, useEffect } from 'react';
import {
  AnalyticsEvent,
  AnalyticsEventType,
  ABVariant,
  PainTag,
} from '../types';
import { AB_TEST_CONFIG, getSessionId, getCurrentVariant } from '../utils/abTest';

// ─── Конфигурация аналитики ─────────────────────────────────────────────────────

export interface AnalyticsConfig {
  /** Тип платформы аналитики */
  platform: 'custom' | 'ga4' | 'posthog' | 'amplitude';
  /** Endpoint для custom fetch */
  customEndpoint?: string;
  /** GA4 Measurement ID */
  ga4MeasurementId?: string;
  /** PostHog API Key */
  posthogApiKey?: string;
  /** PostHog Host */
  posthogHost?: string;
  /** Amplitude API Key */
  amplitudeApiKey?: string;
  /** Включить логирование в консоль (для разработки) */
  debug?: boolean;
}

/**
 * Конфигурация по умолчанию.
 * Замените на вашу платформу аналитики.
 */
export const ANALYTICS_CONFIG: AnalyticsConfig = {
  platform: 'custom', // Замените на 'ga4', 'posthog' или 'amplitude'
  customEndpoint: '/api/analytics/events', // Ваш endpoint
  debug: process.env.NODE_ENV === 'development',
};

// ─── Буфер событий (offline support) ────────────────────────────────────────────

const EVENT_BUFFER_KEY = 'ab_test_event_buffer';
const MAX_BUFFER_SIZE = 50;

function getEventBuffer(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(EVENT_BUFFER_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveEventBuffer(events: AnalyticsEvent[]): void {
  try {
    // Храним только последние MAX_BUFFER_SIZE событий
    const trimmed = events.slice(-MAX_BUFFER_SIZE);
    localStorage.setItem(EVENT_BUFFER_KEY, JSON.stringify(trimmed));
  } catch {
    // Игнорируем ошибки квоты localStorage
  }
}

// ─── Функции отправки на разные платформы ───────────────────────────────────────

/**
 * Отправка через custom fetch (универсальный метод).
 */
async function sendCustomFetch(event: AnalyticsEvent, endpoint: string): Promise<void> {
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
    keepalive: true, // Важно: отправка даже при уходе со страницы
  });
}

/**
 * Отправка в Google Analytics 4.
 */
function sendGA4(event: AnalyticsEvent, measurementId: string): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('event', event.event, {
    experiment_id: event.experimentId,
    variant: event.variant,
    session_id: event.sessionId,
    product_id: event.productId,
    product_name: event.productName,
    category: event.category,
    pain_tag: event.painTag,
    page_url: event.pageUrl,
    ...event.properties,
  });
}

/**
 * Отправка в PostHog.
 */
function sendPostHog(event: AnalyticsEvent, apiKey: string, host: string): void {
  if (typeof window === 'undefined' || !(window as any).posthog) {
    return;
  }

  (window as any).posthog.capture(event.event, {
    experiment_id: event.experimentId,
    variant: event.variant,
    session_id: event.sessionId,
    product_id: event.productId,
    product_name: event.productName,
    category: event.category,
    pain_tag: event.painTag,
    page_url: event.pageUrl,
    ...event.properties,
  });
}

/**
 * Отправка в Amplitude.
 */
function sendAmplitude(event: AnalyticsEvent, apiKey: string): void {
  if (typeof window === 'undefined' || !(window as any).amplitude) {
    return;
  }

  (window as any).amplitude.logEvent({
    event_type: event.event,
    event_properties: {
      experiment_id: event.experimentId,
      variant: event.variant,
      session_id: event.sessionId,
      product_id: event.productId,
      product_name: event.productName,
      category: event.category,
      pain_tag: event.painTag,
      page_url: event.pageUrl,
      ...event.properties,
    },
  });
}

// ─── React Hook ─────────────────────────────────────────────────────────────────

export interface UseAnalyticsOptions {
  config?: Partial<AnalyticsConfig>;
}

/**
 * Хук для отправки аналитических событий A/B теста.
 * 
 * Использование:
 * ```tsx
 * const analytics = useAnalytics();
 * analytics.track('click_pain_tag', { painTag: 'clean-desk', productId: 1 });
 * ```
 */
export function useAnalytics(options?: UseAnalyticsOptions) {
  const configRef = useRef<AnalyticsConfig>({
    ...ANALYTICS_CONFIG,
    ...options?.config,
  });

  const isOnlineRef = useRef<boolean>(navigator.onLine);

  // Отслеживание состояния сети
  useEffect(() => {
    const handleOnline = () => {
      isOnlineRef.current = true;
      // Отправляем буферизованные события
      flushBufferedEvents();
    };
    const handleOffline = () => {
      isOnlineRef.current = false;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /**
   * Основная функция отправки события.
   */
  const track = useCallback(
    (
      eventType: AnalyticsEventType,
      data?: {
        productId?: number;
        productName?: string;
        category?: string;
        painTag?: PainTag;
        variant?: ABVariant;
        properties?: Record<string, unknown>;
      }
    ) => {
      const variant = data?.variant ?? getCurrentVariant() ?? 'A';
      const sessionId = getSessionId();

      const event: AnalyticsEvent = {
        event: eventType,
        experimentId: AB_TEST_CONFIG.experimentId,
        variant,
        sessionId,
        productId: data?.productId,
        productName: data?.productName,
        category: data?.category,
        painTag: data?.painTag,
        properties: data?.properties,
        timestamp: Date.now(),
        pageUrl: window.location.href,
      };

      // Debug logging
      if (configRef.current.debug) {
        console.log('[AB Analytics]', event);
      }

      // Отправляем на нужную платформу
      const cfg = configRef.current;

      switch (cfg.platform) {
        case 'ga4':
          if (cfg.ga4MeasurementId) {
            sendGA4(event, cfg.ga4MeasurementId);
          }
          break;
        case 'posthog':
          if (cfg.posthogApiKey) {
            sendPostHog(event, cfg.posthogApiKey, cfg.posthogHost || 'https://app.posthog.com');
          }
          break;
        case 'amplitude':
          if (cfg.amplitudeApiKey) {
            sendAmplitude(event, cfg.amplitudeApiKey);
          }
          break;
        case 'custom':
        default:
          if (cfg.customEndpoint) {
            if (isOnlineRef.current) {
              sendCustomFetch(event, cfg.customEndpoint).catch(() => {
                // При ошибке — буферизуем
                bufferEvent(event);
              });
            } else {
              bufferEvent(event);
            }
          }
          break;
      }
    },
    []
  );

  /**
   * Трекер клика по товару.
   */
  const trackProductClick = useCallback(
    (productId: number, productName: string, category: string) => {
      track('product_click', { productId, productName, category });
    },
    [track]
  );

  /**
   * Трекер добавления в корзину.
   */
  const trackAddToCart = useCallback(
    (productId: number, productName: string, category: string, painTag?: PainTag) => {
      track('add_to_cart', { productId, productName, category, painTag });
    },
    [track]
  );

  /**
   * Трекер клика по тегу боли.
   */
  const trackPainTagClick = useCallback(
    (painTag: PainTag) => {
      track('click_pain_tag', { painTag });
    },
    [track]
  );

  /**
   * Трекер просмотра фильтра.
   */
  const trackViewFilter = useCallback(() => {
    track('view_filter');
  }, [track]);

  /**
   * Трекер конверсии.
   */
  const trackConversion = useCallback(
    (properties?: Record<string, unknown>) => {
      track('conversion', { properties });
    },
    [track]
  );

  return {
    track,
    trackProductClick,
    trackAddToCart,
    trackPainTagClick,
    trackViewFilter,
    trackConversion,
  };
}

// ─── Буферизация событий ────────────────────────────────────────────────────────

function bufferEvent(event: AnalyticsEvent): void {
  const buffer = getEventBuffer();
  buffer.push(event);
  saveEventBuffer(buffer);
}

async function flushBufferedEvents(): Promise<void> {
  const buffer = getEventBuffer();
  if (buffer.length === 0) return;

  const cfg = ANALYTICS_CONFIG;
  if (!cfg.customEndpoint) return;

  const sent: AnalyticsEvent[] = [];

  for (const event of buffer) {
    try {
      await fetch(cfg.customEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      });
      sent.push(event);
    } catch {
      // Оставляем в буфере
    }
  }

  // Удаляем отправленные
  const remaining = buffer.filter((e) => !sent.includes(e));
  saveEventBuffer(remaining);
}

// ─── Server-side Cookie (для SSR/Next.js адаптации) ─────────────────────────────

/**
 * Пример установки server-side cookie для A/B теста.
 * Используйте на сервере (API route) при SSR.
 * 
 * Для Next.js: вызывайте в getServerSideProps или API route.
 * Для CRA: используйте localStorage (уже реализовано выше).
 */
export function setABTestCookie(variant: ABVariant): string {
  const state = JSON.stringify({
    variant,
    assignedAt: Date.now(),
  });
  // Base64 encoding для cookie
  return `ab_test=${btoa(state)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

/**
 * Чтение server-side cookie.
 */
export function parseABTestCookie(cookieHeader?: string): ABVariant | null {
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/ab_test=([^;]+)/);
  if (!match) return null;

  try {
    const state = JSON.parse(atob(match[1]));
    return state.variant as ABVariant;
  } catch {
    return null;
  }
}
