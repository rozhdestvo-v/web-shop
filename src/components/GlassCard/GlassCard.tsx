import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  elevation?: 'low' | 'medium' | 'high';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  sx,
  className,
  onClick,
  hover = true,
  elevation = 'medium',
  padding = 'none',
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const paddingValues = {
    none: '0',
    small: '12px',
    medium: '20px',
    large: '32px',
  };

  const shadowValues = {
    low: isDark
      ? '0 4px 16px rgba(0, 0, 0, 0.3)'
      : '0 4px 16px rgba(31, 41, 55, 0.08)',
    medium: isDark
      ? '0 8px 32px rgba(0, 0, 0, 0.4)'
      : '0 8px 32px rgba(31, 41, 55, 0.12)',
    high: isDark
      ? '0 16px 48px rgba(0, 0, 0, 0.5)'
      : '0 16px 48px rgba(31, 41, 55, 0.18)',
  };

  const hoverShadowValues = {
    low: isDark
      ? '0 8px 24px rgba(0, 0, 0, 0.4)'
      : '0 8px 24px rgba(31, 41, 55, 0.12)',
    medium: isDark
      ? '0 16px 48px rgba(0, 0, 0, 0.6)'
      : '0 16px 48px rgba(31, 41, 55, 0.18)',
    high: isDark
      ? '0 24px 64px rgba(0, 0, 0, 0.7)'
      : '0 24px 64px rgba(31, 41, 55, 0.24)',
  };

  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        // Glassmorphism base
        background: isDark
          ? 'rgba(30, 30, 60, 0.7)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        
        // Borders
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.15)'
          : '1px solid rgba(255, 255, 255, 0.6)',
        
        // Shadow
        boxShadow: shadowValues[elevation],
        
        // Border radius
        borderRadius: '20px',
        
        // Padding
        padding: paddingValues[padding],
        
        // Transitions - GPU accelerated
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
        
        // Will change for performance
        willChange: hover ? 'transform, box-shadow' : 'auto',
        
        // Hover effects
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-6px) scale(1.01)',
            boxShadow: hoverShadowValues[elevation],
            background: isDark
              ? 'rgba(30, 30, 60, 0.8)'
              : 'rgba(255, 255, 255, 0.92)',
          },
        }),
        
        // Click effect
        ...(onClick && {
          cursor: 'pointer',
          '&:active': {
            transform: 'translateY(-2px) scale(0.99)',
          },
        }),
        
        // Custom sx overrides
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
