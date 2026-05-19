/**
 * A/B Testing Types & Interfaces
 * 
 * Типы для системы A/B тестирования с фильтрацией по «болям».
 */

// ─── A/B Test Variant ───────────────────────────────────────────────────────────

export type ABVariant = 'A' | 'B' | 'C';

export interface ABTestConfig {
  /** Уникальный идентификатор эксперимента */
  experimentId: string;
  /** Название эксперимента */
  name: string;
  /** Описание гипотезы */
  hypothesis: string;
  /** Доля трафика для Variant B (0.5 = 50%) */
  trafficSplit: number;
  /** Флаг включения/выключения теста */
  enabled: boolean;
}

// ─── Pain Tags ──────────────────────────────────────────────────────────────────

/**
 * Тег «боли» — сценарий использования товара.
 * Добавляйте новые теги сюда и в config/painTags.ts
 */
export type PainTag =
  // 🖥 Работа / Продуктивность
  | 'clean-desk'
  | 'productive-work'
  | 'ergonomic-comfort'
  // 🎮 Гейминг
  | 'pro-gaming'
  | 'immersive-setup'
  // 🚗 Мобильность / В дороге
  | 'on-the-go'
  | 'mobile-productivity'
  // 🛡 Защита / Надёжность
  | 'device-protection'
  | 'weather-proof'
  // 😌 Антистресс / Здоровье
  | 'stress-relief'
  | 'focus-helper'
  // 📐 Организация пространства
  | 'space-optimization'
  | 'cable-management';

export interface ProductPainMapping {
  [productId: number]: {
    painTags: PainTag[];
  };
}

// ─── Feature Flag ───────────────────────────────────────────────────────────────

export interface FeatureFlagState {
  variant: ABVariant;
  assignedAt: number; // timestamp
  sessionId: string;
}

// ─── Analytics Events ───────────────────────────────────────────────────────────

export type AnalyticsEventType =
  | 'view_filter'           // Пользователь увидел фильтр
  | 'click_pain_tag'        // Клик по тегу боли
  | 'product_click'         // Клик по товару
  | 'add_to_cart'           // Добавление в корзину
  | 'add_to_wishlist'       // Добавление в избранное
  | 'conversion'            // Конверсия (оформление заказа)
  | 'ab_test_assigned'      // Пользователю назначен вариант теста
  | 'filter_reset'          // Сброс фильтров
  | 'search_query'          // Поисковый запрос
  | 'sort_change'            // Изменение сортировки
  | 'view_product_detail'   // Просмотр детальной страницы товара
  | 'assembly_flow_start'   // Начало потока сборки сетапа
  | 'assembly_step_viewed'  // Просмотр шага сборки
  | 'assembly_product_selected' // Выбор продукта в сборке
  | 'assembly_share_clicked' // Клик по кнопке "Поделиться сетапом"
  | 'assembly_flow_complete' // Завершение потока сборки сетапа
  | 'assembly_step_skipped'; // Пропуск шага сборки

export interface AnalyticsEvent {
  /** Тип события */
  event: AnalyticsEventType;
  /** ID эксперимента (если применимо) */
  experimentId?: string;
  /** Вариант теста (A, B или C) */
  variant?: ABVariant;
  /** ID пользователя / сессии */
  sessionId: string;
  /** ID товара (если применимо) */
  productId?: number;
  /** Название товара (если применимо) */
  productName?: string;
  /** Категория товара (если применимо) */
  category?: string;
  /** Тег боли (если применимо) */
  painTag?: PainTag;
  /** Дополнительные данные */
  properties?: Record<string, unknown>;
  /** Timestamp */
  timestamp: number;
  /** URL страницы */
  pageUrl: string;
}

// ─── A/B Test Results (для админ-дашборда) ──────────────────────────────────────

export interface ABTestMetrics {
  variant: ABVariant;
  users: number;
  viewFilter: number;
  clickPainTag: number;
  productClicks: number;
  addToCart: number;
  conversions: number;
  ctrFilter: number;        // clickPainTag / viewFilter
  ctrProduct: number;       // productClicks / viewFilter
  conversionRate: number;   // conversions / users
  // Metrics for assembly flow
  assemblyViews?: number;
  assemblyCompletions?: number;
  wishlistSize?: number;
  uniqueCategoriesInWishlist?: number;
}

export interface ABTestResults {
  experimentId: string;
  startDate: number;
  endDate?: number;
  variantA: ABTestMetrics;
  variantB: ABTestMetrics;
  variantC: ABTestMetrics;
  statisticalSignificance?: number; // p-value
  winner?: ABVariant;
}

// New types for assembly flow
export type AssemblyStep = 'mat' | 'stand' | 'lamp' | 'organizer' | 'complete';

export interface AssemblySelection {
  mat?: number;        // product ID for mousepad
  stand?: number;      // product ID for stand
  lamp?: number;       // product ID for lamp
  organizer?: number;  // product ID for organizer
}

export interface AssemblyProgress {
  currentStep: AssemblyStep;
  selections: AssemblySelection;
  completed: boolean;
}

// Props for AssemblyFlow component
export interface AssemblyFlowProps {
  onComplete: (selections: AssemblySelection) => void;
}

export * from './assembly';
export * from './draft';
export * from './featureFlag';