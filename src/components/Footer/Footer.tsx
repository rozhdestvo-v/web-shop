import React from 'react';
import { Box, Container, Typography, Grid, Divider, IconButton } from '@mui/material';
import { GitHub, Telegram, Email, Phone, LocationOn, Favorite } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    магазин: [
      { label: 'Каталог', href: '/catalog' },
      { label: 'Новинки', href: '/catalog?sort=new' },
      { label: 'Акции', href: '/catalog?filter=sale' },
      { label: 'Подарочные карты', href: '/gift-cards' },
    ],
    помощь: [
      { label: 'Доставка и оплата', href: '/delivery' },
      { label: 'Возврат', href: '/returns' },
      { label: 'Гарантия', href: '/warranty' },
      { label: 'FAQ', href: '/faq' },
    ],
    компания: [
      { label: 'О нас', href: '/about' },
      { label: 'Контакты', href: '/contacts' },
      { label: 'Блог', href: '/blog' },
      { label: 'Вакансии', href: '/careers' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 55, 0.98) 100%)'
          : 'linear-gradient(135deg, rgba(59, 130, 246, 0.98) 0%, rgba(30, 58, 138, 0.98) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0.2)',
        mt: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Декоративные элементы */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-50%',
          right: '-10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* О магазине */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: '14px',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: '#ffffff' }}
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: '#ffffff',
                    fontSize: '1.5rem',
                  }}
                >
                  CodeShop
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? '#94a3b8' : 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.8,
                  mb: 3,
                  maxWidth: '300px',
                }}
              >
                Магазин товаров для программистов. Создаём уютное рабочее место для максимальной продуктивности.
              </Typography>

              {/* Социальные сети */}
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <IconButton
                  href="https://github.com/codeshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    
                    '&:hover': {
                      background: '#ffffff',
                      color: isDark ? '#1e293b' : '#3b82f6',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://t.me/codeshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    
                    '&:hover': {
                      background: '#ffffff',
                      color: '#0088cc',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <Telegram />
                </IconButton>
                <IconButton
                  href="mailto:support@codeshop.ru"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    
                    '&:hover': {
                      background: '#ffffff',
                      color: '#3b82f6',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <Email />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Ссылки - Магазин */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                mb: 2.5,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Магазин
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.магазин.map((link) => (
                <Box
                  key={link.label}
                  component="a"
                  href={link.href}
                  sx={{
                    color: isDark ? '#94a3b8' : 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(4px)',
                    },
                    
                    '&::before': {
                      content: '"→"',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      color: '#3b82f6',
                    },
                    
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Ссылки - Помощь */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                mb: 2.5,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Помощь
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.помощь.map((link) => (
                <Box
                  key={link.label}
                  component="a"
                  href={link.href}
                  sx={{
                    color: isDark ? '#94a3b8' : 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(4px)',
                    },
                    
                    '&::before': {
                      content: '"→"',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      color: '#3b82f6',
                    },
                    
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Ссылки - Компания */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                mb: 2.5,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Компания
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.компания.map((link) => (
                <Box
                  key={link.label}
                  component="a"
                  href={link.href}
                  sx={{
                    color: isDark ? '#94a3b8' : 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(4px)',
                    },
                    
                    '&::before': {
                      content: '"→"',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      color: '#3b82f6',
                    },
                    
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Контакты */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                mb: 2.5,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Контакты
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: isDark ? '#94a3b8' : 'rgba(255, 255, 255, 0.85)',
                }}
              >
                <Email sx={{ fontSize: 20, color: '#3b82f6' }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    
                    '&:hover': {
                      color: '#ffffff',
                    },
                  }}
                  component="a"
                  href="mailto:support@codeshop.ru"
                >
                  support@codeshop.ru
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: isDark ? '#94a3b8' : 'rgba(255, 255, 255, 0.85)',
                }}
              >
                <Phone sx={{ fontSize: 20, color: '#3b82f6' }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'inherit' }}
                  component="a"
                  href="tel:+78001234567"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  8 800 123-45-67
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: isDark ? '#94a3b8' : 'rgba(255, 255, 255, 0.85)',
                }}
              >
                <LocationOn sx={{ fontSize: 20, color: '#3b82f6' }} />
                <Typography variant="body2" sx={{ color: 'inherit', lineHeight: 1.4 }}>
                  Москва,<br />ул. Цифровая, 42
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Разделитель */}
        <Divider
          sx={{
            my: 5,
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
          }}
        />

        {/* Нижняя строка */}
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? '#64748b' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
              }}
            >
              © {currentYear} CodeShop. Все права защищены.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                gap: 3,
                flexWrap: 'wrap',
              }}
            >
              <Box
                component="a"
                href="/privacy"
                sx={{
                  color: isDark ? '#64748b' : 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease',
                  
                  '&:hover': {
                    color: '#ffffff',
                  },
                }}
              >
                Политика конфиденциальности
              </Box>
              <Box
                component="a"
                href="/terms"
                sx={{
                  color: isDark ? '#64748b' : 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease',
                  
                  '&:hover': {
                    color: '#ffffff',
                  },
                }}
              >
                Условия использования
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Made with love */}
        <Box
          sx={{
            mt: 4,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isDark ? '#475569' : 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.8rem',
            }}
          >
            Сделано с
          </Typography>
          <Favorite
            sx={{
              fontSize: 16,
              color: '#ef4444',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isDark ? '#475569' : 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.8rem',
            }}
          >
            для разработчиков
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
