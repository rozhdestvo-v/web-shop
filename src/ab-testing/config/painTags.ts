/**
 * Pain Tags Configuration
 * 
 * Маппинг «Категория → Боль» для A/B теста (Гипотеза №1).
 * 
 * Логика группировки:
 * - Каждая «боль» описывает сценарий использования, а не техническую категорию.
 * - Один товар может иметь несколько тегов болей (многие-ко-многим).
 * - Теги болей сгруппированы по жизненным сценариям: работа, гейминг, мобильность, комфорт, организация.
 * 
 * Graceful degradation: если товар не имеет painTags, он остаётся в Variant A (классическая фильтрация).
 */

import { PainTag, ProductPainMapping } from '../types';

// ─── Справочник тегов болей с метаданными ───────────────────────────────────────

export const PAIN_TAGS_META: Record<PainTag, {
  label: string;
  icon: string;
  description: string;
  color: string;
}> = {
  // 🖥 Работа / Продуктивность
  'clean-desk': {
    label: 'Чистый стол',
    icon: '🧹',
    description: 'Организация рабочего пространства без хаоса',
    color: '#10b981',
  },
  'productive-work': {
    label: 'Продуктивная работа',
    icon: '⚡',
    description: 'Максимальная эффективность за рабочим местом',
    color: '#3b82f6',
  },
  'ergonomic-comfort': {
    label: 'Эргономичность',
    icon: '🪑',
    description: 'Здоровая осанка и комфорт при долгой работе',
    color: '#8b5cf6',
  },

  // 🎮 Гейминг
  'pro-gaming': {
    label: 'Про-гейминг',
    icon: '🎮',
    description: 'Точность и скорость в играх',
    color: '#ef4444',
  },
  'immersive-setup': {
    label: 'Иммерсивный сетап',
    icon: '🖥️',
    description: 'Полное погружение в игровую атмосферу',
    color: '#f59e0b',
  },

  // 🚗 Мобильность / В дороге
  'on-the-go': {
    label: 'В дороге',
    icon: '🚗',
    description: 'Работа и развлечения в движении',
    color: '#06b6d4',
  },
  'mobile-productivity': {
    label: 'Мобильность',
    icon: '💼',
    description: 'Эффективность вне офиса',
    color: '#0ea5e9',
  },

  // 🛡 Защита / Надёжность
  'device-protection': {
    label: 'Защита устройств',
    icon: '🛡️',
    description: 'Безопасность техники от повреждений',
    color: '#f97316',
  },
  'weather-proof': {
    label: 'Защита от дождя',
    icon: '🌧️',
    description: 'Работа в любых погодных условиях',
    color: '#6366f1',
  },

  // 😌 Антистресс / Здоровье
  'stress-relief': {
    label: 'Снятие стресса',
    icon: '😌',
    description: 'Снижение напряжения и тревожности',
    color: '#ec4899',
  },
  'focus-helper': {
    label: 'Концентрация',
    icon: '🧠',
    description: 'Улучшение фокуса и внимания',
    color: '#a855f7',
  },

  // 📐 Организация пространства
  'space-optimization': {
    label: 'Оптимизация места',
    icon: '📐',
    description: 'Максимум пользы от минимума места',
    color: '#14b8a6',
  },
  'cable-management': {
    label: 'Без проводов',
    icon: '🔌',
    description: 'Избавление от кабельного хаоса',
    color: '#64748b',
  },
};

// ─── Маппинг продуктов на теги болей ─────────────────────────────────────────────
// На основе текущих 12 товаров из products.ts

export const PRODUCT_PAIN_MAP: ProductPainMapping = {
  // Коврики для мышек
  1: { // XL Gaming Desk Mat
    painTags: ['clean-desk', 'pro-gaming', 'immersive-setup'],
  },
  2: { // Minimalist Wool Felt
    painTags: ['clean-desk', 'productive-work', 'ergonomic-comfort'],
  },

  // Клавиатуры
  3: { // Mechanical Keychron K2
    painTags: ['productive-work', 'pro-gaming', 'cable-management'],
  },
  4: { // Custom GMK Keycaps Set
    painTags: ['immersive-setup', 'pro-gaming', 'clean-desk'],
  },

  // Мышки
  5: { // Logitech MX Master 3S
    painTags: ['productive-work', 'ergonomic-comfort', 'mobile-productivity'],
  },
  6: { // Razer DeathAdder V3
    painTags: ['pro-gaming', 'immersive-setup', 'ergonomic-comfort'],
  },

  // Кресла
  7: { // Herman Miller Aeron
    painTags: ['ergonomic-comfort', 'productive-work', 'clean-desk'],
  },
  8: { // Secretlab TITAN Evo
    painTags: ['pro-gaming', 'ergonomic-comfort', 'immersive-setup'],
  },

  // Антистресс
  9: { // Fidget Cube Pro
    painTags: ['stress-relief', 'focus-helper', 'productive-work'],
  },
  10: { // Pop It Giant
    painTags: ['stress-relief', 'focus-helper'],
  },

  // Подставки
  11: { // Monitor Arm Dual
    painTags: ['clean-desk', 'space-optimization', 'ergonomic-comfort'],
  },
  12: { // Laptop Stand Aluminum
    painTags: ['mobile-productivity', 'ergonomic-comfort', 'space-optimization'],
  },
};

// ─── Утилита: получить теги болей для продукта ───────────────────────────────────

export function getPainTagsForProduct(productId: number): PainTag[] {
  const mapping = PRODUCT_PAIN_MAP[productId];
  return mapping?.painTags ?? [];
}

// ─── Утилита: получить все уникальные теги болей из каталога ─────────────────────

export function getAllPainTags(): PainTag[] {
  const allTags = new Set<PainTag>();
  Object.values(PRODUCT_PAIN_MAP).forEach(({ painTags }) => {
    painTags.forEach((tag: PainTag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

// ─── Утилита: получить товары по тегу боли ───────────────────────────────────────

export function getProductIdsByPainTag(painTag: PainTag): number[] {
  const result: number[] = [];
  Object.entries(PRODUCT_PAIN_MAP).forEach(([productId, { painTags }]) => {
    if (painTags.includes(painTag)) {
      result.push(Number(productId));
    }
  });
  return result;
}
