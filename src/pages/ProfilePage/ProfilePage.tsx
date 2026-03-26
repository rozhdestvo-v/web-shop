import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Tabs, Tab, IconButton } from '@mui/material';
import { FavoriteBorder, ShoppingCart, Person, Delete, Clear } from '@mui/icons-material';
import { GlassCard, GlassButton, ProductCard } from '../../components';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../components/ProductCard/ProductCard';

const ProfilePage: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState(0);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleRemoveFromFavorites = (productId: number) => {
    removeFromFavorites(productId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок профиля */}
      <Box
        sx={{
          mb: 4,
          opacity: 0,
          animation: 'fade-in 0.5s ease-out forwards',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '16px',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
            }}
          >
            <Person sx={{ fontSize: 40, color: '#ffffff' }} />
          </Box>
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: isDark ? '#f8fafc' : '#1e293b',
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Профиль
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontWeight: 500,
              }}
            >
              Управление избранными товарами
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Вкладки */}
      <GlassCard
        elevation="medium"
        sx={{
          mb: 4,
          p: 1,
          opacity: 0,
          animation: 'slide-down 0.5s ease-out 0.1s forwards',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: '12px',
              mx: 0.5,
              transition: 'all 0.3s ease',
              color: isDark ? '#cbd5e1' : '#475569',

              '&.Mui-selected': {
                background: isDark
                  ? 'rgba(59, 130, 246, 0.25)'
                  : 'rgba(59, 130, 246, 0.15)',
                color: '#3b82f6',
              },

              '&:hover': {
                background: isDark
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'rgba(59, 130, 246, 0.08)',
              },
            },
          }}
        >
          <Tab
            icon={<FavoriteBorder sx={{ mb: 0.5 }} />}
            label="Избранное"
            iconPosition="start"
          />
          <Tab
            icon={<ShoppingCart sx={{ mb: 0.5 }} />}
            label="Заказы"
            iconPosition="start"
          />
        </Tabs>
      </GlassCard>

      {/* Контент вкладок */}
      {activeTab === 0 && (
        <Box
          sx={{
            opacity: 0,
            animation: 'fade-in 0.5s ease-out 0.2s forwards',
          }}
        >
          {favorites.length > 0 ? (
            <>
              {/* Верхняя панель */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f8fafc' : '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <FavoriteBorder />
                  Товары в избранном ({favorites.length})
                </Typography>
                <GlassButton
                  variant="outlined"
                  onClick={clearFavorites}
                  startIcon={<Clear />}
                  size="medium"
                  sx={{
                    color: '#ef4444',
                    borderColor: isDark ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)',
                    px: 3,
                    py: 1,
                    minWidth: 'auto',
                    width: 'auto',
                    
                    '& .MuiButton-startIcon': {
                      marginRight: '8px',
                    },
                    
                    '&:hover': {
                      background: 'rgba(239, 68, 68, 0.1)',
                      borderColor: '#ef4444',
                    },
                  }}
                >
                  Очистить всё
                </GlassButton>
              </Box>

              {/* Сетка товаров */}
              <Grid container spacing={3}>
                {favorites.map((product, index) => (
                  <Grid
                    key={product.id}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    sx={{
                      opacity: 0,
                      animation: 'scale-in 0.5s ease-out forwards',
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        index={index}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <GlassCard
              elevation="high"
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  fontSize: '5rem',
                  mb: 2,
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                🤍
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
                Избранное пусто
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
                Добавляйте товары в избранное, чтобы не потерять их
              </Typography>
              <GlassButton
                variant="contained"
                size="large"
                onClick={() => setActiveTab(0)}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                }}
              >
                Перейти в каталог
              </GlassButton>
            </GlassCard>
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <GlassCard
          elevation="high"
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            opacity: 0,
            animation: 'fade-in 0.5s ease-out 0.3s forwards',
          }}
        >
          <Box
            sx={{
              fontSize: '5rem',
              mb: 2,
            }}
          >
            📦
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: isDark ? '#f8fafc' : '#1e293b',
              mb: 2,
            }}
          >
            История заказов
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDark ? '#94a3b8' : '#64748b',
              mb: 4,
            }}
          >
            Эта функция в разработке
          </Typography>
        </GlassCard>
      )}
    </Container>
  );
};

export default ProfilePage;
