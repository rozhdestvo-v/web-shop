# 🧪 A/B Testing System — Pain-Based Filter

## Гипотеза №1

> **Если фильтровать товары не по традиционным категориям, а по «боли» клиента (сценариям использования), это повысит CTR фильтров, глубину просмотра и конверсию в корзину.**

Примеры: «Чистый стол» вместо «Органайзеры», «Зарядка в дороге» вместо «Powerbank», «Защита от дождя» вместо «Чехлы для электроники».

---

## 📁 Файловая структура

```
src/
├── ab-testing/                          # Модуль A/B тестирования
│   ├── index.ts                         # Barrel export (единая точка входа)
│   ├── types/
│   │   └── index.ts                     # TypeScript типы и интерфейсы
│   ├── config/
│   │   └── painTags.ts                  # Маппинг «Категория → Боль» + метаданные
│   ├── utils/
│   │   ├── abTest.ts                    # A/B распределение + Feature Flag
│   │   └── analyticsQueries.ts          # SQL-запросы для аналитики
│   ├── hooks/
│   │   ├── index.ts                     # Barrel export хуков
│   │   ├── useABTest.ts                 # Хук использования A/B теста
│   │   └── useAnalytics.ts              # Хук отправки аналитических событий
│   └── components/
│       ├── index.ts                     # Barrel export компонентов
│       └── PainFilter.tsx               # Компонент фильтра по «болям»
│
├── pages/
│   ├── CatalogPage/
│   │   └── CatalogPage.tsx              # ✅ Интегрирован A/B тест
│   └── ABTestDashboardPage/
│       └── ABTestDashboardPage.tsx      # 📊 Админ-дашборд для мониторинга
│
└── App.tsx                              # ✅ Добавлен роут /ab-test-dashboard
```

---

## 🚀 Быстрый старт

### 1. Включение/выключение теста

```typescript
// src/ab-testing/utils/abTest.ts
export const ENABLE_PAIN_FILTER_AB: boolean = true; // ← false для отключения
```

При `false` все пользователи получают Variant A (классические категории).

### 2. Проверка работы

1. Откройте `/catalog`
2. В правом верхнем углу вы увидите бейдж: `🧪 Variant A` или `🧪 Variant B`
3. **Variant A**: стандартный фильтр по категориям
4. **Variant B**: фильтр по «болям» (сценариям использования)

### 3. Тестирование обоих вариантов

Откройте админ-дашборд: `/ab-test-dashboard`

В секции **Debug Controls** нажмите:
- **Force Variant A** — принудительно включить классический фильтр
- **Force Variant B** — принудительно включить фильтр по болям
- **Reset Assignment** — сбросить назначение (случайное распределение)

---

## 🗺 Маппинг категорий → болей

### Логика группировки

Каждая «боль» описывает **сценарий использования**, а не техническую категорию.
Один товар может иметь **несколько тегов болей** (многие-ко-многим).

| Категория | Товар | Теги болей |
|-----------|-------|------------|
| Коврики | XL Gaming Desk Mat | `pro-gaming`, `immersive-setup`, `clean-desk` |
| Коврики | Minimalist Wool Felt | `productive-work`, `ergonomic-comfort`, `clean-desk` |
| Клавиатуры | Mechanical Keychron K2 | `productive-work`, `pro-gaming`, `cable-management` |
| Клавиатуры | Custom GMK Keycaps | `immersive-setup`, `pro-gaming`, `clean-desk` |
| Мышки | Logitech MX Master 3S | `productive-work`, `ergonomic-comfort`, `mobile-productivity` |
| Мышки | Razer DeathAdder V3 | `pro-gaming`, `immersive-setup`, `ergonomic-comfort` |
| Кресла | Herman Miller Aeron | `ergonomic-comfort`, `productive-work`, `clean-desk` |
| Кресла | Secretlab TITAN Evo | `pro-gaming`, `ergonomic-comfort`, `immersive-setup` |
| Антистресс | Fidget Cube Pro | `stress-relief`, `focus-helper`, `productive-work` |
| Антистресс | Pop It Giant | `stress-relief`, `focus-helper` |
| Подставки | Monitor Arm Dual | `clean-desk`, `space-optimization`, `ergonomic-comfort` |
| Подставки | Laptop Stand Aluminum | `mobile-productivity`, `ergonomic-comfort`, `space-optimization` |

### Группы тегов

| Группа | Теги |
|--------|------|
| 🖥 Работа | `clean-desk`, `productive-work`, `ergonomic-comfort` |
| 🎮 Гейминг | `pro-gaming`, `immersive-setup` |
| 🚗 Мобильность | `on-the-go`, `mobile-productivity` |
| 🛡 Защита | `device-protection`, `weather-proof` |
| 😌 Здоровье | `stress-relief`, `focus-helper` |
| 📐 Организация | `space-optimization`, `cable-management` |

### Добавление нового тега

1. Добавьте тип в `src/ab-testing/types/index.ts`:
```typescript
export type PainTag = ... | 'my-new-tag';
```

2. Добавьте метаданные в `src/ab-testing/config/painTags.ts`:
```typescript
'my-new-tag': {
  label: 'Мой новый тег',
  icon: '🆕',
  description: 'Описание сценария',
  color: '#ff0000',
}
```

3. Сопоставьте товары в `PRODUCT_PAIN_MAP`.

---

## 📊 Метрики успеха теста

### Ключевые метрики

| Метрика | Описание | Цель |
|---------|----------|------|
| **CTR фильтра** | % пользователей, кликнувших по тегу/категории | B > A на 15%+ |
| **CTR товаров** | % кликов по товарам после фильтрации | B > A на 10%+ |
| **Conversion Rate** | % оформленных заказов | B > A на 20%+ |
| **Глубина просмотра** | Среднее число просмотров товаров | B > A |
| **Add-to-Cart Rate** | % добавлений в корзину | B > A на 15%+ |

### Минимальная длительность теста

- **Минимум**: 2 недели
- **Рекомендуется**: 4 недели
- **Минимальный трафик**: 1000 пользователей на вариант

### Статистическая значимость

- **p-value < 0.05** — результат статистически значим
- **Confidence Interval 95%** — доверительный интервал
- Формула: z-test для пропорций (см. `analyticsQueries.ts`)

---

## 🔌 Интеграция с платформой аналитики

### По умолчанию: Custom Fetch

```typescript
// src/ab-testing/hooks/useAnalytics.ts
export const ANALYTICS_CONFIG: AnalyticsConfig = {
  platform: 'custom',
  customEndpoint: '/api/analytics/events',
  debug: process.env.NODE_ENV === 'development',
};
```

События отправляются POST-запросом на ваш endpoint.

### Google Analytics 4

```typescript
export const ANALYTICS_CONFIG: AnalyticsConfig = {
  platform: 'ga4',
  ga4MeasurementId: 'G-XXXXXXXXXX',
};
```

### PostHog

```typescript
export const ANALYTICS_CONFIG: AnalyticsConfig = {
  platform: 'posthog',
  posthogApiKey: 'phc_xxxxxxxxxx',
  posthogHost: 'https://app.posthog.com',
};
```

### Amplitude

```typescript
export const ANALYTICS_CONFIG: AnalyticsConfig = {
  platform: 'amplitude',
  amplitudeApiKey: 'xxxxxxxxxx',
};
```

---

## 📋 Список аналитических событий

| Событие | Когда отправляется | Данные |
|---------|-------------------|--------|
| `view_filter` | При открытии фильтра | variant, sessionId |
| `click_pain_tag` | Клик по тегу боли | painTag, variant |
| `product_click` | Клик по товару | productId, productName, category |
| `add_to_cart` | Добавление в корзину | productId, painTag (если B) |
| `conversion` | Оформление заказа | properties |
| `ab_test_assigned` | Назначение варианта | variant, sessionId |
| `filter_reset` | Сброс фильтров | variant |
| `sort_change` | Изменение сортировки | sortBy |
| `view_product_detail` | Просмотр страницы товара | productId |

---

## ⚠️ Риски и ограничения

### 1. Загрязнение данных
- **Проблема**: Пользователи могут очищать localStorage, сбрасывая вариант
- **Решение**: Использовать server-side cookies в production

### 2. Сезонность
- **Проблема**: Паттерны покупок меняются (праздники, распродажи)
- **Решение**: Запускать тест на 4+ недели, учитывать сезонность

### 3. Новизна
- **Проблема**: Пользователи могут кликать из любопытства, а не из потребности
- **Решение**: Исключить первую неделю из анализа

### 4. Множественные тесты
- **Проблема**: Одновременные A/B тесты могут влиять друг на друга
- **Решение**: Запускать только один тест на одну аудиторию

### 5. Graceful Degradation
- Если товар не имеет `painTags`, он **не фильтруется** в Variant B
- Решение: убедиться, что все товары имеют хотя бы 1 тег

---

## 🔄 Масштабирование на следующие гипотезы

### Архитектура поддерживает множественные эксперименты:

1. **Добавьте новый конфиг**:
```typescript
export const AB_TEST_CONFIG_2: ABTestConfig = {
  experimentId: 'checkout-flow-v1',
  name: 'New Checkout Flow',
  hypothesis: '...',
  trafficSplit: 0.5,
  enabled: true,
};
```

2. **Создайте отдельный маппинг** (если нужно)

3. **Используйте отдельный хук** или расширьте `useABTest`

4. **Храните состояние каждого теста** в отдельном ключе localStorage

### Рекомендации:
- Один пользователь = один вариант на эксперимент
- Не запускайте пересекающиеся тесты на одной странице
- Используйте ортогональное распределение трафика

---

## ❓ FAQ

### Как принудительно включить Variant B?

```typescript
import { forceVariant } from './ab-testing';
forceVariant('B');
```

### Как полностью отключить тест?

```typescript
// src/ab-testing/utils/abTest.ts
export const ENABLE_PAIN_FILTER_AB = false;
```

### Где смотреть результаты?

`/ab-test-dashboard` — админ-дашборд с мок-данными.
Для production подключите реальные данные из вашей БД.

### Как адаптировать под Next.js?

1. Замените `localStorage` на server-side cookies
2. Используйте `getServerSideProps` для назначения варианта
3. Перенесите аналитику в API routes

### Как добавить новые теги болей?

См. раздел «Добавление нового тега» выше.

---

## 📞 Контакты и поддержка

- **Вопросы по интеграции**: откройте Issue в репозитории
- **Баги**: опишите шаги воспроизведения + скриншот
- **Фичи**: опишите use case и ожидаемый результат
