/**
 * A/B Test Analytics Queries
 * 
 * SQL-запросы и примеры агрегации результатов A/B теста.
 * 
 * Предполагаемая схема хранения:
 * - Таблица `ab_test_events` — сырые события
 * - Таблица `ab_test_sessions` — сессии пользователей
 * 
 * Для production замените на вашу СУБД (PostgreSQL, ClickHouse, BigQuery и т.д.)
 */

// ─── SQL: Создание таблицы событий ─────────────────────────────────────────────

export const CREATE_EVENTS_TABLE = `
CREATE TABLE IF NOT EXISTS ab_test_events (
    id              SERIAL PRIMARY KEY,
    event_type      VARCHAR(50) NOT NULL,          -- view_filter, click_pain_tag, product_click, add_to_cart, conversion
    experiment_id   VARCHAR(100) NOT NULL,          -- pain-filter-v1
    variant         VARCHAR(1) NOT NULL,            -- A или B
    session_id      VARCHAR(100) NOT NULL,          -- ID сессии
    product_id      INTEGER,                        -- ID товара (если применимо)
    product_name    VARCHAR(255),                   -- Название товара
    category        VARCHAR(100),                   -- Категория товара
    pain_tag        VARCHAR(50),                    -- Тег боли (если применимо)
    properties      JSONB,                          -- Дополнительные свойства
    timestamp       TIMESTAMP NOT NULL,             -- Время события
    page_url        VARCHAR(500),                   -- URL страницы
    user_agent      VARCHAR(500),                   -- User-Agent (для сегментации)
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX idx_ab_events_experiment ON ab_test_events(experiment_id);
CREATE INDEX idx_ab_events_variant ON ab_test_events(variant);
CREATE INDEX idx_ab_events_session ON ab_test_events(session_id);
CREATE INDEX idx_ab_events_timestamp ON ab_test_events(timestamp);
CREATE INDEX idx_ab_events_type ON ab_test_events(event_type);
`;

// ─── SQL: Создание таблицы сессий ──────────────────────────────────────────────

export const CREATE_SESSIONS_TABLE = `
CREATE TABLE IF NOT EXISTS ab_test_sessions (
    session_id      VARCHAR(100) PRIMARY KEY,
    variant         VARCHAR(1) NOT NULL,            -- A или B
    assigned_at     TIMESTAMP NOT NULL,             -- Время назначения варианта
    first_seen      TIMESTAMP DEFAULT NOW(),
    last_seen       TIMESTAMP DEFAULT NOW(),
    user_agent      VARCHAR(500),
    referrer        VARCHAR(500),
    country         VARCHAR(50),                    -- Гео (если доступно)
    device_type     VARCHAR(50),                    -- desktop/mobile/tablet
    is_bot          BOOLEAN DEFAULT FALSE
);
`;

// ─── SQL: Агрегация метрик по вариантам ────────────────────────────────────────

export const QUERY_AGGREGATE_METRICS = `
-- Агрегация основных метрик по вариантам
SELECT 
    e.variant,
    COUNT(DISTINCT e.session_id) AS unique_users,
    
    -- Просмотры фильтра
    COUNT(DISTINCT CASE WHEN e.event_type = 'view_filter' THEN e.session_id END) AS view_filter_users,
    COUNT(CASE WHEN e.event_type = 'view_filter' THEN 1 END) AS view_filter_events,
    
    -- Клики по тегам болей (только Variant B)
    COUNT(DISTINCT CASE WHEN e.event_type = 'click_pain_tag' THEN e.session_id END) AS click_pain_tag_users,
    COUNT(CASE WHEN e.event_type = 'click_pain_tag' THEN 1 END) AS click_pain_tag_events,
    
    -- Клики по товарам
    COUNT(DISTINCT CASE WHEN e.event_type = 'product_click' THEN e.session_id END) AS product_click_users,
    COUNT(CASE WHEN e.event_type = 'product_click' THEN 1 END) AS product_click_events,
    
    -- Добавления в корзину
    COUNT(DISTINCT CASE WHEN e.event_type = 'add_to_cart' THEN e.session_id END) AS add_to_cart_users,
    COUNT(CASE WHEN e.event_type = 'add_to_cart' THEN 1 END) AS add_to_cart_events,
    
    -- Конверсии (оформление заказа)
    COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.session_id END) AS conversion_users,
    COUNT(CASE WHEN e.event_type = 'conversion' THEN 1 END) AS conversion_events,
    
    -- CTR фильтра (click_pain_tag / view_filter)
    ROUND(
        COUNT(CASE WHEN e.event_type = 'click_pain_tag' THEN 1 END)::NUMERIC / 
        NULLIF(COUNT(CASE WHEN e.event_type = 'view_filter' THEN 1 END), 0) * 100, 
        2
    ) AS filter_ctr_percent,
    
    -- CTR товаров (product_click / view_filter)
    ROUND(
        COUNT(CASE WHEN e.event_type = 'product_click' THEN 1 END)::NUMERIC / 
        NULLIF(COUNT(CASE WHEN e.event_type = 'view_filter' THEN 1 END), 0) * 100, 
        2
    ) AS product_ctr_percent,
    
    -- Conversion Rate (conversion / unique_users)
    ROUND(
        COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.session_id END)::NUMERIC / 
        NULLIF(COUNT(DISTINCT e.session_id), 0) * 100, 
        2
    ) AS conversion_rate_percent

FROM ab_test_events e
WHERE e.experiment_id = 'pain-filter-v1'
  AND e.timestamp >= NOW() - INTERVAL '30 days'  -- За последние 30 дней
GROUP BY e.variant
ORDER BY e.variant;
`;

// ─── SQL: Популярные теги болей (Variant B) ────────────────────────────────────

export const QUERY_POPULAR_PAIN_TAGS = `
-- Рейтинг тегов болей по популярности
SELECT 
    e.pain_tag,
    COUNT(*) AS click_count,
    COUNT(DISTINCT e.session_id) AS unique_users,
    
    -- Конверсия в корзину для этого тега
    ROUND(
        COUNT(DISTINCT CASE WHEN e2.event_type = 'add_to_cart' THEN e2.session_id END)::NUMERIC /
        NULLIF(COUNT(DISTINCT e.session_id), 0) * 100,
        2
    ) AS conversion_rate_percent

FROM ab_test_events e
LEFT JOIN ab_test_events e2 
    ON e.session_id = e2.session_id 
    AND e2.event_type = 'add_to_cart'
    AND e2.timestamp >= e.timestamp
    AND e2.timestamp <= e.timestamp + INTERVAL '30 minutes'

WHERE e.experiment_id = 'pain-filter-v1'
  AND e.variant = 'B'
  AND e.event_type = 'click_pain_tag'
  AND e.timestamp >= NOW() - INTERVAL '30 days'

GROUP BY e.pain_tag
ORDER BY click_count DESC;
`;

// ─── SQL: Популярные товары по вариантам ───────────────────────────────────────

export const QUERY_POPULAR_PRODUCTS = `
-- Топ товаров по вариантам
SELECT 
    e.variant,
    e.product_id,
    e.product_name,
    e.category,
    COUNT(*) AS click_count,
    COUNT(DISTINCT e.session_id) AS unique_users,
    
    -- Конверсия в корзину
    ROUND(
        COUNT(DISTINCT CASE WHEN e2.event_type = 'add_to_cart' THEN e2.session_id END)::NUMERIC /
        NULLIF(COUNT(DISTINCT e.session_id), 0) * 100,
        2
    ) AS conversion_rate_percent

FROM ab_test_events e
LEFT JOIN ab_test_events e2 
    ON e.session_id = e2.session_id 
    AND e2.product_id = e.product_id
    AND e2.event_type = 'add_to_cart'
    AND e2.timestamp >= e.timestamp
    AND e2.timestamp <= e.timestamp + INTERVAL '30 minutes'

WHERE e.experiment_id = 'pain-filter-v1'
  AND e.event_type = 'product_click'
  AND e.timestamp >= NOW() - INTERVAL '30 days'

GROUP BY e.variant, e.product_id, e.product_name, e.category
ORDER BY e.variant, click_count DESC
LIMIT 20;
`;

// ─── SQL: Статистическая значимость (упрощённая) ───────────────────────────────

export const QUERY_STATISTICAL_SIGNIFICANCE = `
-- Расчёт статистической значимости (z-test для пропорций)
-- Возвращает p-value и доверительный интервал

WITH variant_stats AS (
    SELECT 
        variant,
        COUNT(DISTINCT session_id) AS total_users,
        COUNT(DISTINCT CASE WHEN event_type = 'conversion' THEN session_id END) AS conversions
    FROM ab_test_events
    WHERE experiment_id = 'pain-filter-v1'
      AND timestamp >= NOW() - INTERVAL '30 days'
    GROUP BY variant
),
proportions AS (
    SELECT 
        MAX(CASE WHEN variant = 'A' THEN conversions::NUMERIC / total_users END) AS p_a,
        MAX(CASE WHEN variant = 'B' THEN conversions::NUMERIC / total_users END) AS p_b,
        MAX(CASE WHEN variant = 'A' THEN total_users END) AS n_a,
        MAX(CASE WHEN variant = 'B' THEN total_users END) AS n_b
    FROM variant_stats
),
z_test AS (
    SELECT 
        p_a,
        p_b,
        n_a,
        n_b,
        (p_b - p_a) AS difference,
        -- Pooled proportion
        ((p_a * n_a + p_b * n_b) / (n_a + n_b)) AS p_pool,
        -- Standard error
        SQRT(
            (p_a * (1 - p_a) / n_a) + (p_b * (1 - p_b) / n_b)
        ) AS se,
        -- Z-score
        (p_b - p_a) / SQRT(
            (p_a * (1 - p_a) / n_a) + (p_b * (1 - p_b) / n_b)
        ) AS z_score
    FROM proportions
)
SELECT 
    p_a AS variant_a_conversion_rate,
    p_b AS variant_b_conversion_rate,
    difference AS absolute_difference,
    ROUND(difference / NULLIF(p_a, 0) * 100, 2) AS relative_lift_percent,
    ROUND(z_score, 4) AS z_score,
    -- Approximate p-value (для z > 1.96 => p < 0.05)
    CASE 
        WHEN ABS(z_score) > 3.29 THEN '< 0.001'
        WHEN ABS(z_score) > 2.58 THEN '< 0.01'
        WHEN ABS(z_score) > 1.96 THEN '< 0.05'
        WHEN ABS(z_score) > 1.64 THEN '< 0.10'
        ELSE '> 0.10 (not significant)'
    END AS p_value,
    CASE 
        WHEN ABS(z_score) > 1.96 THEN 'Statistically significant (p < 0.05)'
        ELSE 'Not statistically significant'
    END AS significance,
    -- 95% Confidence Interval
    ROUND(difference - 1.96 * SQRT((p_a * (1 - p_a) / n_a) + (p_b * (1 - p_b) / n_b)), 6) AS ci_lower,
    ROUND(difference + 1.96 * SQRT((p_a * (1 - p_a) / n_a) + (p_b * (1 - p_b) / n_b)), 6) AS ci_upper
FROM z_test;
`;

// ─── SQL: Временной анализ (daily trend) ───────────────────────────────────────

export const QUERY_DAILY_TREND = `
-- Дневной тренд конверсий по вариантам
SELECT 
    DATE(e.timestamp) AS date,
    e.variant,
    COUNT(DISTINCT e.session_id) AS users,
    COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.session_id END) AS conversions,
    ROUND(
        COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.session_id END)::NUMERIC /
        NULLIF(COUNT(DISTINCT e.session_id), 0) * 100,
        2
    ) AS conversion_rate_percent
FROM ab_test_events e
WHERE e.experiment_id = 'pain-filter-v1'
  AND e.timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(e.timestamp), e.variant
ORDER BY date, variant;
`;

// ─── SQL: Сегментация по устройствам ───────────────────────────────────────────

export const QUERY_DEVICE_SEGMENTATION = `
-- Конверсия по типам устройств
SELECT 
    s.device_type,
    e.variant,
    COUNT(DISTINCT e.session_id) AS users,
    COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.session_id END) AS conversions,
    ROUND(
        COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.session_id END)::NUMERIC /
        NULLIF(COUNT(DISTINCT e.session_id), 0) * 100,
        2
    ) AS conversion_rate_percent
FROM ab_test_events e
JOIN ab_test_sessions s ON e.session_id = s.session_id
WHERE e.experiment_id = 'pain-filter-v1'
  AND e.timestamp >= NOW() - INTERVAL '30 days'
GROUP BY s.device_type, e.variant
ORDER BY s.device_type, e.variant;
`;

// ─── SQL: Очистка старых данных ────────────────────────────────────────────────

export const QUERY_CLEANUP_OLD_DATA = `
-- Удаление данных старше 90 дней (для GDPR compliance)
DELETE FROM ab_test_events 
WHERE timestamp < NOW() - INTERVAL '90 days';

DELETE FROM ab_test_sessions 
WHERE assigned_at < NOW() - INTERVAL '90 days';
`;
