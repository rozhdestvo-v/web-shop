import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Drawer, List, ListItem, ListItemText, ListItemButton, InputBase } from '@mui/material';
import { ShoppingCart, Menu, Close, Storefront, AccountCircle, Brightness4, Brightness7, Search as SearchIcon, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import GlassButton from '../GlassButton/GlassButton';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { mode, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const isDark = mode === 'dark';

  // Эффект скролла для изменения прозрачности хедера
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          pt: 1.5,
          px: 2,
          animation: 'slide-down 0.5s ease-out',
        }}
      >
        <Box
          sx={{
            // Glassmorphism header
            background: scrolled
              ? isDark
                ? 'rgba(15, 15, 35, 0.85)'
                : 'rgba(255, 255, 255, 0.85)'
              : isDark
                ? 'rgba(15, 15, 35, 0.7)'
                : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            
            // Border
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.5)',
            
            // Shadow
            boxShadow: scrolled
              ? isDark
                ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                : '0 8px 32px rgba(31, 41, 55, 0.1)'
              : 'none',
            
            // Rounded corners
            borderRadius: '20px',
            
            // Transition
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            
            px: { xs: 2, md: 3, lg: 4 },
            py: 1.5,
          }}
        >
          <Toolbar sx={{ minHeight: 'auto !important', p: 0 }}>
            {/* Логотип */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                flexGrow: { xs: 1, md: 0 },
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate('/')}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderRadius: '12px',
                  p: 1,
                  mr: 1.5,
                  boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Storefront sx={{ fontSize: 28, color: '#ffffff' }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  CodeShop
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                  }}
                >
                  для IT-профи
                </Typography>
              </Box>
            </Box>

            {/* Навигация для десктопа */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Box
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      
                      // Active state
                      background: isActive
                        ? isDark
                          ? 'rgba(59, 130, 246, 0.15)'
                          : 'rgba(59, 130, 246, 0.1)'
                        : 'transparent',
                      
                      '&:hover': {
                        background: isDark
                          ? 'rgba(59, 130, 246, 0.2)'
                          : 'rgba(59, 130, 246, 0.08)',
                      },
                      
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isActive ? '60%' : '0%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease',
                      },
                      
                      '&:hover::after': {
                        width: isActive ? '60%' : '40%',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: isActive
                          ? '#3b82f6'
                          : isDark
                            ? '#e2e8f0'
                            : '#475569',
                        fontWeight: isActive ? 700 : 600,
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: '#3b82f6',
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Поиск для десктопа */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                flexGrow: 0.5,
                maxWidth: '400px',
                mx: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '14px',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.3)'}`,
                  px: 2,
                  py: 1,
                  transition: 'all 0.3s ease',
                  width: '100%',
                  
                  '&:hover': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(255, 255, 255, 0.75)',
                    borderColor: isDark
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(59, 130, 246, 0.5)',
                  },
                  
                  '&:focus-within': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(255, 255, 255, 0.85)',
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <SearchIcon sx={{ color: '#94a3b8', mr: 1.5, fontSize: 20 }} />
                <InputBase
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    flexGrow: 1,
                    color: isDark ? '#f8fafc' : '#1e293b',
                    fontSize: '0.95rem',
                    
                    '& .MuiInputBase-input::placeholder': {
                      color: isDark ? '#64748b' : '#94a3b8',
                    },
                  }}
                />
                {searchQuery && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery('')}
                    sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>

            {/* Кнопки справа */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Переключатель темы */}
              <IconButton
                onClick={toggleTheme}
                sx={{
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(59, 130, 246, 0.1)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                  color: isDark ? '#f8fafc' : '#475569',
                  transition: 'all 0.3s ease',
                  
                  '&:hover': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(59, 130, 246, 0.2)',
                    transform: 'rotate(15deg) scale(1.1)',
                    borderColor: '#3b82f6',
                  },
                }}
                size="medium"
              >
                {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>

              {/* Корзина */}
              <IconButton
                onClick={() => navigate('/cart')}
                sx={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: '#ffffff',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.5)',
                  },
                }}
              >
                <Badge
                  badgeContent={getTotalItems()}
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      minWidth: '20px',
                      height: '20px',
                      borderRadius: '10px',
                      border: '2px solid rgba(255, 255, 255, 0.8)',
                      top: '-4px',
                      right: '-4px',
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* Профиль */}
              <IconButton
                onClick={() => navigate('/profile')}
                sx={{
                  display: { xs: 'none', xl: 'flex' },
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(59, 130, 246, 0.1)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                  color: isDark ? '#f8fafc' : '#475569',
                  transition: 'all 0.3s ease',
                  
                  '&:hover': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(59, 130, 246, 0.2)',
                    transform: 'scale(1.05)',
                    borderColor: '#3b82f6',
                  },
                }}
              >
                <AccountCircle />
              </IconButton>

              {/* CTA кнопка */}
              <GlassButton
                variant="contained"
                size="medium"
                onClick={() => navigate('/catalog')}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                  
                  '&:hover': {
                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 8px 30px rgba(59, 130, 246, 0.5)',
                  },
                }}
              >
                Купить
                <KeyboardArrowRight />
              </GlassButton>

              {/* Мобильное меню */}
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(59, 130, 246, 0.1)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                  color: isDark ? '#f8fafc' : '#475569',
                }}
              >
                <Menu />
              </IconButton>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Пустой блок для компенсации фиксированного хедера */}
      <Box sx={{ height: { xs: 95, md: 105 } }} />

      {/* Выдвижное меню для мобильных */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            background: isDark
              ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 55, 0.98) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
            backdropFilter: 'blur(24px)',
            color: isDark ? '#f8fafc' : '#1e293b',
            borderLeft: isDark
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(59, 130, 246, 0.2)',
          },
        }}
      >
        {/* Header мобильного меню */}
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: isDark
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(59, 130, 246, 0.15)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Storefront sx={{ fontSize: 28, color: '#3b82f6', mr: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              CodeShop
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              background: isDark
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(59, 130, 246, 0.1)',
              color: isDark ? '#f8fafc' : '#475569',
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Поиск в мобильном меню */}
        <Box sx={{ p: 2.5 }}>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: isDark
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(255, 255, 255, 0.6)',
              borderRadius: '14px',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.3)'}`,
              px: 2,
              py: 1.5,
            }}
          >
            <SearchIcon sx={{ color: '#94a3b8', mr: 1.5 }} />
            <InputBase
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1, color: isDark ? '#f8fafc' : '#1e293b' }}
            />
          </Box>
        </Box>

        {/* Навигация */}
        <List sx={{ px: 2, py: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: '14px',
                  background: location.pathname === item.path
                    ? isDark
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'rgba(59, 130, 246, 0.1)'
                    : 'transparent',
                  '&:hover': {
                    background: isDark
                      ? 'rgba(59, 130, 246, 0.2)'
                      : 'rgba(59, 130, 246, 0.08)',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 700 : 600,
                    color: location.pathname === item.path ? '#3b82f6' : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Кнопки в мобильном меню */}
        <Box sx={{ p: 2.5, mt: 'auto' }}>
          <GlassButton
            variant="contained"
            fullWidth
            onClick={() => {
              navigate('/catalog');
              setDrawerOpen(false);
            }}
            sx={{ mb: 1.5 }}
          >
            Перейти в каталог
          </GlassButton>
          <GlassButton
            variant="outlined"
            fullWidth
            onClick={() => {
              navigate('/profile');
              setDrawerOpen(false);
            }}
          >
            Профиль
          </GlassButton>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
