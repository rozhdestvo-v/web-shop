import React from 'react';
import { Container, Typography, Box, Grid, IconButton, Divider, LinearProgress } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart, LocalShipping, Percent } from '@mui/icons-material';
import { GlassCard, GlassButton } from '../../components';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const shippingCost = getTotalPrice() >= 5000 ? 0 : 500;
  const discount = 0;
  const total = getTotalPrice() + shippingCost - discount;
  const freeShippingProgress = Math.min((getTotalPrice() / 5000) * 100, 100);

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <GlassCard
          elevation="high"
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            opacity: 0,
            animation: 'scale-in 0.5s ease-out forwards',
          }}
        >
          <Box
            sx={{
              fontSize: '5rem',
              mb: 2,
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            🛒
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: isDark ? '#f8fafc' : '#1e293b',
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Корзина пуста
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDark ? '#94a3b8' : '#64748b',
              mb: 4,
              maxWidth: '400px',
              mx: 'auto',
            }}
          >
            Добавьте товары из каталога, чтобы оформить заказ
          </Typography>
          <GlassButton
            variant="contained"
            size="large"
            onClick={() => navigate('/catalog')}
            startIcon={<ShoppingCart />}
            sx={{
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
              
              '&:hover': {
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
                transform: 'translateY(-3px)',
              },
            }}
          >
            Перейти в каталог
          </GlassButton>
        </GlassCard>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          color: isDark ? '#f8fafc' : '#1e293b',
          mb: 4,
          fontSize: { xs: '1.75rem', md: '2.5rem' },
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0,
          animation: 'fade-in 0.5s ease-out forwards',
        }}
      >
        Корзина
      </Typography>

      <Grid container spacing={3}>
        {/* Товары */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {items.map((item, index) => (
              <GlassCard
                key={item.id}
                elevation="medium"
                sx={{
                  p: 2.5,
                  opacity: 0,
                  animation: 'slide-right 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Grid container spacing={2.5} alignItems="center">
                  {/* Изображение */}
                  <Grid size={{ xs: 4, sm: 3, md: 2 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        borderRadius: '14px',
                        border: isDark
                          ? '1px solid rgba(255, 255, 255, 0.1)'
                          : '1px solid rgba(59, 130, 246, 0.15)',
                        transition: 'transform 0.3s ease',
                        
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  </Grid>

                  {/* Информация */}
                  <Grid size={{ xs: 8, sm: 5, md: 4 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#3b82f6',
                        textTransform: 'uppercase',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        mb: 0.5,
                        display: 'block',
                      }}
                    >
                      {item.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? '#f8fafc' : '#1e293b',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        mb: 1,
                        lineHeight: 1.3,
                        
                        '&:hover': {
                          color: '#3b82f6',
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {item.price.toLocaleString()} ₽
                    </Typography>
                  </Grid>

                  {/* Количество */}
                  <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'space-between', sm: 'flex-start' },
                        gap: 1,
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(59, 130, 246, 0.05)',
                        borderRadius: '12px',
                        p: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{
                          background: isDark
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(59, 130, 246, 0.15)',
                          color: '#3b82f6',
                          width: 36,
                          height: 36,
                          
                          '&:hover': {
                            background: 'rgba(59, 130, 246, 0.25)',
                            transform: 'scale(1.1)',
                          },
                        }}
                        size="small"
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          color: isDark ? '#f8fafc' : '#1e293b',
                          fontWeight: 700,
                          minWidth: 36,
                          textAlign: 'center',
                          fontSize: '1rem',
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{
                          background: isDark
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(59, 130, 246, 0.15)',
                          color: '#3b82f6',
                          width: 36,
                          height: 36,
                          
                          '&:hover': {
                            background: 'rgba(59, 130, 246, 0.25)',
                            transform: 'scale(1.1)',
                          },
                        }}
                        size="small"
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Удалить */}
                  <Grid size={{ xs: 6, sm: 3, md: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: { xs: 'flex-end', sm: 'flex-end' },
                      }}
                    >
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={{
                          background: isDark
                            ? 'rgba(239, 68, 68, 0.15)'
                            : 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'}`,
                          width: 44,
                          height: 44,
                          
                          '&:hover': {
                            background: 'rgba(239, 68, 68, 0.25)',
                            borderColor: '#ef4444',
                            transform: 'scale(1.1) rotate(5deg)',
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </GlassCard>
            ))}
          </Box>

          {/* Очистить корзину */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              opacity: 0,
              animation: 'fade-in 0.5s ease-out 0.5s forwards',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontWeight: 600,
              }}
            >
              Товаров: {getTotalItems()}
            </Typography>
            <GlassButton
              variant="outlined"
              onClick={clearCart}
              sx={{
                color: '#ef4444',
                borderColor: isDark ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)',
                
                '&:hover': {
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderColor: '#ef4444',
                },
              }}
            >
              <Delete sx={{ mr: 1 }} /> Очистить корзину
            </GlassButton>
          </Box>
        </Grid>

        {/* Итоговая сумма */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <GlassCard
            elevation="high"
            sx={{
              p: 3,
              position: { lg: 'sticky' },
              top: 120,
              opacity: 0,
              animation: 'slide-left 0.5s ease-out 0.3s forwards',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: isDark ? '#f8fafc' : '#1e293b',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <ShoppingCart /> Заказ
            </Typography>

            {/* Прогресс до бесплатной доставки */}
            {getTotalPrice() < 5000 && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  background: isDark
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(16, 185, 129, 0.05)',
                  borderRadius: '14px',
                  border: isDark
                    ? '1px solid rgba(16, 185, 129, 0.2)'
                    : '1px solid rgba(16, 185, 129, 0.15)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <LocalShipping sx={{ fontSize: 20, color: '#10b981' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? '#cbd5e1' : '#475569',
                      fontWeight: 600,
                    }}
                  >
                    До бесплатной доставки:{' '}
                    <Box component="span" sx={{ color: '#10b981', fontWeight: 700 }}>
                      {(5000 - getTotalPrice()).toLocaleString()} ₽
                    </Box>
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={freeShippingProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(59, 130, 246, 0.15)',
                    
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            )}

            {getTotalPrice() >= 5000 && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  background: isDark
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '14px',
                  border: isDark
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : '1px solid rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    background: '#10b981',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <LocalShipping />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#10b981',
                    fontWeight: 700,
                  }}
                >
                  Бесплатная доставка активирована!
                </Typography>
              </Box>
            )}

            <Divider
              sx={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.15)',
                my: 2,
              }}
            />

            {/* Детали заказа */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                  Товары ({getTotalItems()} шт.)
                </Typography>
                <Typography
                  sx={{
                    color: isDark ? '#f8fafc' : '#1e293b',
                    fontWeight: 600,
                  }}
                >
                  {getTotalPrice().toLocaleString()} ₽
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                  Доставка
                </Typography>
                <Typography
                  sx={{
                    color: shippingCost === 0 ? '#10b981' : isDark ? '#f8fafc' : '#1e293b',
                    fontWeight: 600,
                  }}
                >
                  {shippingCost === 0 ? 'Бесплатно' : `${shippingCost} ₽`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                  <Percent sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                  Скидка
                </Typography>
                <Typography
                  sx={{
                    color: '#10b981',
                    fontWeight: 600,
                  }}
                >
                  -{discount} ₽
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.15)',
                my: 2.5,
              }}
            />

            {/* Итого */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
                p: 2,
                background: isDark
                  ? 'rgba(59, 130, 246, 0.15)'
                  : 'rgba(59, 130, 246, 0.08)',
                borderRadius: '14px',
                border: isDark
                  ? '1px solid rgba(59, 130, 246, 0.2)'
                  : '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? '#f8fafc' : '#1e293b',
                }}
              >
                Итого
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {total.toLocaleString()} ₽
              </Typography>
            </Box>

            {/* Кнопки */}
            <GlassButton
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/checkout')}
              sx={{
                mb: 2,
                py: 2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                fontSize: '1.05rem',
                
                '&:hover': {
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              Оформить заказ
            </GlassButton>

            <GlassButton
              variant="outlined"
              fullWidth
              onClick={() => navigate('/catalog')}
              sx={{
                py: 2,
                borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.4)',
                color: isDark ? '#f8fafc' : '#3b82f6',
                
                '&:hover': {
                  background: isDark
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'rgba(59, 130, 246, 0.05)',
                  borderColor: '#3b82f6',
                },
              }}
            >
              Продолжить покупки
            </GlassButton>
          </GlassCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
