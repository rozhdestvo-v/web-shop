import React from 'react';
import {
  Box,
  Chip,
  Typography,
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { PainTag } from '../types';

export interface PainFilterProps {
  value: PainTag[];
  onChange: (tags: PainTag[]) => void;
  availableTags?: PainTag[];
}

const PAIN_TAG_LABELS: Record<PainTag, string> = {
  'clean-desk': 'Чистый рабочий стол',
  'productive-work': 'Продуктивная работа',
  'ergonomic-comfort': 'Эргономика и комфорт',
  'pro-gaming': 'Профессиональный гейминг',
  'immersive-setup': 'Иммерсивная установка',
  'on-the-go': 'В движении',
  'mobile-productivity': 'Мобильная продуктивность',
  'device-protection': 'Защита устройства',
  'weather-proof': 'Влагозащита',
  'stress-relief': 'Снятие стресса',
  'focus-helper': 'Помощник в концентрации',
  'space-optimization': 'Оптимизация пространства',
  'cable-management': 'Управление кабелями',
};

const PAIN_TAG_ICONS: Record<PainTag, string> = {
  'clean-desk': '🧹',
  'productive-work': '💼',
  'ergonomic-comfort': '💺',
  'pro-gaming': '🎮',
  'immersive-setup': '🎬',
  'on-the-go': '🚗',
  'mobile-productivity': '💻',
  'device-protection': '🛡️',
  'weather-proof': '☔',
  'stress-relief': '😌',
  'focus-helper': '🎯',
  'space-optimization': '📐',
  'cable-management': '🔌',
};

export const PainFilter: React.FC<PainFilterProps> = ({ 
  value, 
  onChange, 
  availableTags = Object.keys(PAIN_TAG_LABELS) as PainTag[] 
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const handleTagToggle = (tag: PainTag) => {
    if (value.includes(tag)) {
      onChange(value.filter(t => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      mb: 3, 
      backgroundColor: isDark ? '#1e293b' : '#f8fafc',
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#334155' : '#e2e8f1'}`
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 600, 
          color: isDark ? '#f1f5f9' : '#1e293b',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        🎯 Фильтр по боли
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {availableTags.map(tag => (
          <Chip
            key={tag}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span>{PAIN_TAG_ICONS[tag]}</span>
                <span>{PAIN_TAG_LABELS[tag]}</span>
              </Box>
            }
            clickable
            onClick={() => handleTagToggle(tag)}
            variant={value.includes(tag) ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: value.includes(tag) 
                ? isDark 
                  ? '#3b82f6' 
                  : '#dbeafe'
                : isDark 
                  ? '#334155' 
                  : '#f1f5f9',
              color: value.includes(tag) 
                ? isDark 
                  ? '#ffffff' 
                  : '#1e40af'
                : isDark 
                  ? '#cbd5e1' 
                  : '#475569',
              borderColor: value.includes(tag) 
                ? isDark 
                  ? '#60a5fa' 
                  : '#93c5fd'
                : isDark 
                  ? '#475569' 
                  : '#cbd5e1',
              '&:hover': {
                backgroundColor: value.includes(tag) 
                  ? isDark 
                    ? '#2563eb' 
                    : '#bfdbfe'
                  : isDark 
                    ? '#475569' 
                    : '#e2e8f0',
              }
            }}
          />
        ))}
      </Box>
      
      {value.length > 0 && (
        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f1'}` }}>
          <Typography variant="body2" sx={{ color: isDark ? '#94a3b8' : '#64748b', mb: 1 }}>
            Выбрано: {value.length} {value.length === 1 ? 'фильтр' : value.length < 5 ? 'фильтра' : 'фильтров'}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {value.map(tag => (
              <Chip
                key={tag}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <span>{PAIN_TAG_ICONS[tag]}</span>
                    <span>{PAIN_TAG_LABELS[tag]}</span>
                  </Box>
                }
                size="small"
                onDelete={() => handleTagToggle(tag)}
                sx={{ 
                  backgroundColor: isDark ? '#1e3a8a' : '#eff6ff',
                  color: isDark ? '#93c5fd' : '#1d4ed8',
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PainFilter;