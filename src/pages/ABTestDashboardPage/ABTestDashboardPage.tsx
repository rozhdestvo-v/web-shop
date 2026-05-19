/**
 * ABTestDashboard Page
 * 
 * Админ-дашборд для мониторинга результатов A/B теста.
 * Показывает метрики по Variant A и Variant B, статистическую значимость.
 * 
 * Для доступа добавьте: /catalog?admin_ab=true
 */

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { GlassCard } from '../../components';
import { AB_TEST_CONFIG, resetABTestAssignment, forceVariant } from '../../ab-testing/utils/abTest';
import { ABTestMetrics, ABVariant } from '../../ab-testing/types';

// ─── Mock Data (замените на реальные данные из вашей аналитики) ────────────────

const MOCK_METRICS: Record<ABVariant, ABTestMetrics> = {
  A: {
    variant: 'A',
    users: 850,
    viewFilter: 680,
    clickPainTag: 0, // Variant A не использует pain tags
    productClicks: 240,
    addToCart: 65,
    conversions: 22,
    ctrFilter: 0,
    ctrProduct: 0.353,
    conversionRate: 0.0259,
    assemblyViews: 0,
    assemblyCompletions: 0,
  },
  B: {
    variant: 'B',
    users: 820,
    viewFilter: 750,
    clickPainTag: 480,
    productClicks: 380,
    addToCart: 95,
    conversions: 42,
    ctrFilter: 0.640,
    ctrProduct: 0.506,
    conversionRate: 0.0512,
    assemblyViews: 0,
    assemblyCompletions: 0,
  },
  C: {
    variant: 'C',
    users: 810,
    viewFilter: 720,
    clickPainTag: 0,
    productClicks: 420,
    addToCart: 105,
    conversions: 48,
    ctrFilter: 0,
    ctrProduct: 0.617,
    conversionRate: 0.0593,
    assemblyViews: 650,
    assemblyCompletions: 120,
  },
};

// ─── Компонент метрики ─────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  valueA: number | string;
  valueB: number | string;
  valueC: number | string;
  winner?: ABVariant;
  format?: 'number' | 'percent';
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  valueA,
  valueB,
  valueC,
  winner,
  format = 'number',
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const formatValue = (val: number | string) => {
    if (typeof val === 'number') {
      if (format === 'percent') {
        return `${(val * 100).toFixed(1)}%`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <GlassCard
      elevation="medium"
      sx={{
        p: 2.5,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: isDark ? '#94a3b8' : '#64748b',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.7rem',
          mb: 1.5,
          display: 'block',
        }}
      >
        {label}
      </Typography>
      <Box display="flex" justifyContent="center" gap={1}>
        <Box flex="1" textAlign="center">
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: winner === 'A' ? '#10b981' : isDark ? '#cbd5e1' : '#475569',
            }}
          >
            {formatValue(valueA)}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#3b82f6', fontWeight: 600 }}
          >
            Variant A
          </Typography>
        </Box>
        <Box flex="1" textAlign="center">
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: winner === 'B' ? '#10b981' : isDark ? '#cbd5e1' : '#475569',
            }}
          >
            {formatValue(valueB)}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#f59e0b', fontWeight: 600 }}
          >
            Variant B
          </Typography>
        </Box>
        <Box flex="1" textAlign="center">
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: winner === 'C' ? '#10b981' : isDark ? '#cbd5e1' : '#475569',
            }}
          >
            {formatValue(valueC)}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#ef4444', fontWeight: 600 }}
          >
            Variant C
          </Typography>
        </Box>
      </Box>
    </GlassCard>
  );
};

// ─── Страница ──────────────────────────────────────────────────────────────────

const ABTestDashboardPage: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [forceVariantState, setForceVariantState] = useState<ABVariant | null>(null);

  const metrics = MOCK_METRICS;

  // Определяем победителя по conversion rate
  const winner = useMemo(() => {
    const rates = {
      A: metrics.A.conversionRate,
      B: metrics.B.conversionRate,
      C: metrics.C.conversionRate,
    };
    
    // Находим максимальный conversion rate
    const maxRate = Math.max(rates.A, rates.B, rates.C);
    
    // Проверяем, является ли разница статистически значимой (> 10% от лучшего)
    if (maxRate - rates.A > 0.1 && maxRate - rates.B > 0.1 && maxRate - rates.C > 0.1) {
      return rates.A === maxRate ? 'A' : rates.B === maxRate ? 'B' : 'C';
    }
    
    return undefined;
  }, [metrics]);

  const handleForceVariant = (variant: ABVariant) => {
    forceVariant(variant);
    setForceVariantState(variant);
  };

  const handleReset = () => {
    resetABTestAssignment();
    setForceVariantState(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          🧪 A/B Test Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isDark ? '#94a3b8' : '#64748b',
            fontWeight: 500,
          }}
        >
          {AB_TEST_CONFIG.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDark ? '#64748b' : '#94a3b8',
            fontStyle: 'italic',
            mt: 0.5,
          }}
        >
          Гипотеза: {AB_TEST_CONFIG.hypothesis}
        </Typography>
      </Box>

      {/* Метрики */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
        <Box>
          <MetricCard
            label="Conversion Rate"
            valueA={metrics.A.conversionRate}
            valueB={metrics.B.conversionRate}
            valueC={metrics.C.conversionRate}
            winner={winner}
            format="percent"
          />
        </Box>
        <Box>
          <MetricCard
            label="Users"
            valueA={metrics.A.users}
            valueB={metrics.B.users}
            valueC={metrics.C.users}
          />
        </Box>
        <Box>
          <MetricCard
            label="View Filter"
            valueA={metrics.A.viewFilter}
            valueB={metrics.B.viewFilter}
            valueC={metrics.C.viewFilter}
          />
        </Box>
        <Box>
          <MetricCard
            label="Product Clicks"
            valueA={metrics.A.productClicks}
            valueB={metrics.B.productClicks}
            valueC={metrics.C.productClicks}
          />
        </Box>
        <Box>
          <MetricCard
            label="Add to Cart"
            valueA={metrics.A.addToCart}
            valueB={metrics.B.addToCart}
            valueC={metrics.C.addToCart}
          />
        </Box>
        <Box>
          <MetricCard
            label="Assembly Views (C)"
            valueA={0}
            valueB={0}
            valueC={metrics.C.assemblyViews || 0}
          />
        </Box>
        <Box>
          <MetricCard
            label="Assembly Completions (C)"
            valueA={0}
            valueB={0}
            valueC={metrics.C.assemblyCompletions || 0}
          />
        </Box>
      </Box>

      {/* Debug Controls */}
      <GlassCard sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: isDark ? '#e2e8f0' : '#1e293b' }}>
          🔧 Debug Controls
        </Typography>
        <Typography variant="body2" sx={{ color: isDark ? '#94a3b8' : '#64748b', mb: 2 }}>
          Используйте для тестирования. В продакшене эти кнопки должны быть скрыты.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={() => handleForceVariant('A')}
            sx={{
              borderColor: forceVariantState === 'A' ? '#3b82f6' : undefined,
              color: '#3b82f6',
            }}
          >
            Force Variant A
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleForceVariant('B')}
            sx={{
              borderColor: forceVariantState === 'B' ? '#f59e0b' : undefined,
              color: '#f59e0b',
            }}
          >
            Force Variant B
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleForceVariant('C')}
            sx={{
              borderColor: forceVariantState === 'C' ? '#ef4444' : undefined,
              color: '#ef4444',
            }}
          >
            Force Variant C
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset Assignment
          </Button>
          {forceVariantState && (
            <Chip
              label={`Current: Variant ${forceVariantState}`}
              sx={{
                background:
                  forceVariantState === 'A'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : forceVariantState === 'B'
                      ? 'rgba(245, 158, 11, 0.15)'
                      : 'rgba(239, 68, 68, 0.15)',
                color: forceVariantState === 'A' 
                  ? '#3b82f6' 
                  : forceVariantState === 'B' 
                    ? '#f59e0b' 
                    : '#ef4444',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
      </GlassCard>
    </Container>
  );
};

export default ABTestDashboardPage;
