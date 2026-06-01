/**
 * A/B Test Distribution & Feature Flag Utility
 * 
 * Распределяет пользователей на Variant A / Variant B / Variant C (33/33/34)
 * через Feature Flag с сохранением в cookie/localStorage.
 * 
 * Архитектурные решения:
 * - Используем localStorage для простоты (можно заменить на server-side cookie).
 * - Распределение детерминированное: один и тот же пользователь всегда видит один вариант.
 * - Fallback на Variant A, если тест отключён или произошла ошибка.
 * - Глобальный флаг ENABLE_PAIN_FILTER_AB для быстрого отключения.
 */

import { ABVariant, ABTestConfig, FeatureFlagState } from '../types';

// ─── Глобальный флаг включения/выключения ───────────────────────────────────────

/**
 * Главный переключатель A/B теста.
 * Установите в false, чтобы полностью отключить тест и вернуть Variant A для всех.
 * 
 * Можно вынести в .env: process.env.REACT_APP_ENABLE_PAIN_FILTER_AB
 */
export const ENABLE_PAIN_FILTER_AB: boolean = true;

// ─── Конфигурация эксперимента ──────────────────────────────────────────────────

export const AB_TEST_CONFIG: ABTestConfig = {
  experimentId: 'pain-filter-v1',
  name: 'Pain-Based Filter vs Category Filter vs Assembly Flow',
  hypothesis: 'Фильтрация по «болям» клиента и сборка сетапа повышают CTR фильтров, глубину просмотра и конверсию в корзину',
  trafficSplit: 0.5, // ~33% на каждый из 3 вариантов
  enabled: ENABLE_PAIN_FILTER_AB,
};

// ─── Ключи хранения ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ab_test';
const SESSION_KEY = 'ab_test_session_id';

// ─── Утилиты ────────────────────────────────────────────────────────────────────

/**
 * Генерирует уникальный ID сессии (если ещё не создан).
 */
function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Криптографически безопасный генератор случайного числа [0, 1).
 * Fallback на Math.random() если crypto недоступен.
 */
function secureRandom(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
  }
  return Math.random();
}

/**
 * Определяет вариант A/B/C теста для текущего пользователя.
 * 
 * Логика:
 * 1. Если тест отключён → всегда Variant A.
 * 2. Если уже есть сохранённый вариант → возвращаем его (консистентность).
 * 3. Иначе генерируем новое распределение 33/33/34.
 */
export function assignVariant(): ABVariant {
  // Быстрое отключение
  if (!AB_TEST_CONFIG.enabled) {
    return 'A';
  }

  try {
    // Проверяем, есть ли уже назначенный вариант
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state: FeatureFlagState = JSON.parse(stored);
      return state.variant;
    }

    // Новое распределение для 3 вариантов
    const random = secureRandom();
    let variant: ABVariant;
    
    if (random < AB_TEST_CONFIG.trafficSplit) {
      variant = 'A';
    } else if (random < AB_TEST_CONFIG.trafficSplit * 2) {
      variant = 'B';
      // variant = 'C';
      // variant = 'D';
    } else {
      variant = 'C'; // Третий вариант для "Собрать сетап"
    }

    const state: FeatureFlagState = {
      variant,
      assignedAt: Date.now(),
      sessionId: getOrCreateSessionId(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return variant;
  } catch (error) {
    // Fallback на Variant A при любой ошибке
    console.warn('[AB Test] Error assigning variant, falling back to A:', error);
    return 'A';
  }
}

/**
 * Возвращает текущий назначенный вариант (без создания нового).
 */
export function getCurrentVariant(): ABVariant | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state: FeatureFlagState = JSON.parse(stored);
      return state.variant;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Возвращает ID сессии.
 */
export function getSessionId(): string {
  return getOrCreateSessionId();
}

/**
 * Сбрасывает назначение варианта (для тестирования).
 */
export function resetABTestAssignment(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Принудительно устанавливает вариант (для тестирования/админки).
 */
export function forceVariant(variant: ABVariant): void {
  const state: FeatureFlagState = {
    variant,
    assignedAt: Date.now(),
    sessionId: getOrCreateSessionId(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Возвращает полное состояние Feature Flag.
 */
export function getFeatureFlagState(): FeatureFlagState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Если ещё не назначен — назначаем
  const variant = assignVariant();
  return {
    variant,
    assignedAt: Date.now(),
    sessionId: getOrCreateSessionId(),
  };
}