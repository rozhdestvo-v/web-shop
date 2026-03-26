import React from 'react';
import { Button, SxProps, Theme, CircularProgress } from '@mui/material';

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text' | 'glass';
  size?: 'small' | 'medium' | 'large';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  loading?: boolean;
  color?: 'primary' | 'success' | 'danger' | 'warning';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'contained',
  size = 'medium',
  onClick,
  href,
  fullWidth,
  sx,
  disabled,
  loading,
  color = 'primary',
  startIcon,
  endIcon,
}) => {
  const colorVariants = {
    primary: {
      contained: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      containedHover: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      outlined: 'rgba(59, 130, 246, 0.2)',
      outlinedBorder: 'rgba(59, 130, 246, 0.5)',
      glow: 'rgba(59, 130, 246, 0.4)',
      text: '#3b82f6',
    },
    success: {
      contained: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      containedHover: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
      outlined: 'rgba(16, 185, 129, 0.2)',
      outlinedBorder: 'rgba(16, 185, 129, 0.5)',
      glow: 'rgba(16, 185, 129, 0.4)',
      text: '#10b981',
    },
    danger: {
      contained: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      containedHover: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
      outlined: 'rgba(239, 68, 68, 0.2)',
      outlinedBorder: 'rgba(239, 68, 68, 0.5)',
      glow: 'rgba(239, 68, 68, 0.4)',
      text: '#ef4444',
    },
    warning: {
      contained: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      containedHover: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      outlined: 'rgba(245, 158, 11, 0.2)',
      outlinedBorder: 'rgba(245, 158, 11, 0.5)',
      glow: 'rgba(245, 158, 11, 0.4)',
      text: '#f59e0b',
    },
  };

  const sizeStyles = {
    small: {
      padding: '8px 16px',
      fontSize: '0.875rem',
      minHeight: '36px',
    },
    medium: {
      padding: '12px 24px',
      fontSize: '1rem',
      minHeight: '44px',
    },
    large: {
      padding: '16px 32px',
      fontSize: '1.125rem',
      minHeight: '52px',
    },
  };

  const baseStyles = {
    // Glassmorphism base
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    
    // Border radius
    borderRadius: '14px',
    
    // Font
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '0.02em',
    
    // Transition - GPU accelerated
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform, box-shadow, background',

    // Icon spacing - can be overridden via sx prop
    '& .MuiButton-startIcon': {
      marginRight: size === 'small' ? 6 : 8,
      '& > *:nth-of-type(1)': {
        fontSize: size === 'small' ? 18 : 20,
      },
    },
    '& .MuiButton-endIcon': {
      marginLeft: size === 'small' ? 6 : 8,
      '& > *:nth-of-type(1)': {
        fontSize: size === 'small' ? 18 : 20,
      },
    },
  };

  const variantStyles = {
    contained: {
      background: colorVariants[color].contained,
      border: 'none',
      color: '#ffffff',
      boxShadow: `0 4px 20px ${colorVariants[color].glow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
      
      '&:hover': {
        background: colorVariants[color].containedHover,
        transform: 'translateY(-3px)',
        boxShadow: `0 8px 30px ${colorVariants[color].glow}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
      },
      
      '&:active': {
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 16px ${colorVariants[color].glow}`,
      },
    },
    
    outlined: {
      background: 'transparent',
      border: `2px solid ${colorVariants[color].outlinedBorder}`,
      color: colorVariants[color].text,
      
      '&:hover': {
        background: colorVariants[color].outlined,
        borderColor: colorVariants[color].text,
        transform: 'translateY(-2px)',
      },
    },
    
    text: {
      background: 'transparent',
      border: 'none',
      color: colorVariants[color].text,
      boxShadow: 'none',
      
      '&:hover': {
        background: `${colorVariants[color].outlined}`,
      },
    },
    
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: '#ffffff',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  };

  return (
    <Button
      variant={variant === 'text' || variant === 'glass' ? 'text' : 'contained'}
      size={size}
      onClick={onClick}
      href={href}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={!loading && endIcon}
      sx={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        
        // Disabled state
        '&.Mui-disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
          transform: 'none',
          boxShadow: 'none',
        },
        
        // Focus visible
        '&:focus-visible': {
          outline: '2px solid rgba(59, 130, 246, 0.5)',
          outlineOffset: '2px',
        },
        
        // Custom sx overrides
        ...sx,
      }}
    >
      {loading ? 'Загрузка...' : children}
    </Button>
  );
};

export default GlassButton;
