import React from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import { GitHub, Telegram, ShoppingBag, Person, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { getTotalItems } = useCart();

  return (
    <Box
      component="footer"
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 55, 0.98) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
        backdropFilter: 'blur(24px)',
        borderTop: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(59, 130, 246, 0.15)',
        py: 2.5,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Верхняя строка: Лого + Навигация + Соцсети */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Логотип */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                p: 1.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transform: 'rotate(45deg)',
                  animation: 'shimmer 3s infinite',
                },
              }}
            >
              <ShoppingBag sx={{ fontSize: 22, color: '#ffffff' }} />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.1rem',
                letterSpacing: '-0.5px',
              }}
            >
              CodeShop
            </Typography>
          </Box>

          {/* Навигация */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5 }}>
            <Link
              onClick={() => navigate('/catalog')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: '10px',
                cursor: 'pointer',
                color: isDark ? '#cbd5e1' : '#475569',
                fontWeight: 500,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',

                '&:hover': {
                  background: isDark
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(59, 130, 246, 0.08)',
                  color: '#3b82f6',
                },
              }}
            >
              <ShoppingBag fontSize="small" />
              Каталог
            </Link>
            <Link
              onClick={() => navigate('/cart')}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: '10px',
                cursor: 'pointer',
                color: isDark ? '#cbd5e1' : '#475569',
                fontWeight: 500,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                
                '&:hover': {
                  background: isDark
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(59, 130, 246, 0.08)',
                  color: '#3b82f6',
                },
              }}
            >
              <ShoppingCart fontSize="small" />
              Корзина
              {getTotalItems() > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    borderRadius: '9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.8)',
                  }}
                >
                  {getTotalItems() > 9 ? '9+' : getTotalItems()}
                </Box>
              )}
            </Link>
            <Link
              onClick={() => navigate('/profile')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: '10px',
                cursor: 'pointer',
                color: isDark ? '#cbd5e1' : '#475569',
                fontWeight: 500,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                
                '&:hover': {
                  background: isDark
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(59, 130, 246, 0.08)',
                  color: '#3b82f6',
                },
              }}
            >
              <Person fontSize="small" />
              Профиль
            </Link>
          </Box>

          {/* Социальные сети */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              href="https://t.me/codeshop"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 38,
                height: 38,
                background: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(59, 130, 246, 0.1)',
                color: isDark ? '#f8fafc' : '#475569',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                
                '&:hover': {
                  background: '#229ED9',
                  borderColor: '#229ED9',
                  color: '#ffffff',
                  transform: 'scale(1.1)',
                },
              }}
              size="small"
            >
              <Telegram fontSize="small" />
            </IconButton>
            <IconButton
              href="https://github.com/codeshop"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 38,
                height: 38,
                background: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(59, 130, 246, 0.1)',
                color: isDark ? '#f8fafc' : '#475569',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                
                '&:hover': {
                  background: '#333',
                  borderColor: '#333',
                  color: '#ffffff',
                  transform: 'scale(1.1)',
                },
              }}
              size="small"
            >
              <GitHub fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Разделитель */}
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: isDark
              ? '1px solid rgba(255, 255, 255, 0.05)'
              : '1px solid rgba(59, 130, 246, 0.08)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: isDark ? '#64748b' : '#94a3b8',
              fontSize: '0.75rem',
            }}
          >
            © {new Date().getFullYear()} CodeShop. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
