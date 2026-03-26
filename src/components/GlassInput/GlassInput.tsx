import React from 'react';
import { TextField, SxProps, Theme, InputAdornment } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

interface GlassInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

const GlassInput: React.FC<GlassInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  fullWidth = true,
  size = 'medium',
  sx,
  error,
  helperText,
  startIcon,
  endIcon,
  multiline,
  rows,
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      size={size}
      error={error}
      helperText={helperText}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          // Glassmorphism base
          background: isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          
          // Border
          borderRadius: '14px',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
          color: isDark ? '#f8fafc' : '#1e293b',
          
          // Transition
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          // Hover state
          '&:hover': {
            background: isDark
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(59, 130, 246, 0.5)',
          },
          
          // Focused state
          '&.Mui-focused': {
            background: isDark
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.9)',
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
          },
          
          // Error state
          '&.Mui-error': {
            borderColor: '#ef4444',
            boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)',
          },
          
          // Fieldset (border)
          '& fieldset': {
            border: 'none',
          },
          
          // Input text
          '& .MuiInputBase-input': {
            padding: size === 'small' ? '10px 14px' : '14px 16px',
            color: isDark ? '#f8fafc' : '#1e293b',
            
            '&::placeholder': {
              color: isDark ? '#64748b' : '#94a3b8',
              opacity: 1,
            },
          },
          
          // Multiline
          ...(multiline && {
            '& .MuiInputBase-inputMultiline': {
              minHeight: rows ? `${rows * 28}px` : '80px',
            },
          }),
        },
        
        // Label
        '& .MuiInputLabel-root': {
          color: isDark ? '#94a3b8' : '#64748b',
          
          '&.Mui-focused': {
            color: '#3b82f6',
          },
          
          '&.Mui-error': {
            color: '#ef4444',
          },
        },
        
        // Helper text
        '& .MuiFormHelperText-root': {
          color: error ? '#ef4444' : (isDark ? '#64748b' : '#94a3b8'),
          marginLeft: '4px',
          fontSize: '0.75rem',
        },
        
        // Icons
        '& .MuiInputAdornment-root': {
          color: isDark ? '#64748b' : '#94a3b8',
        },
        
        // Custom sx overrides
        ...sx,
      }}
    />
  );
};

export default GlassInput;
