import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { LocalShipping, VerifiedUser, Support, Storefront, Code, Speed, Palette } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GlassButton, ProductCard } from '../../components';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const featuredProducts = products.slice(0, 4);

  const benefits = [
    {
      icon: <LocalShipping sx={{ fontSize: 32 }} />,
      title: 'Бесплатная доставка',
      description: 'При заказе от 5000 ₽',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      glow: 'rgba(59, 130, 246, 0.4)',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 32 }} />,
      title: 'Гарантия качества',
      description: 'Только проверенные бренды',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    {
      icon: <Support sx={{ fontSize: 32 }} />,
      title: 'Поддержка 24/7',
      description: 'Всегда на связи',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    {
      icon: <Storefront sx={{ fontSize: 32 }} />,
      title: 'Огромный выбор',
      description: 'Более 1000 товаров',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
  ];

  const features = [
    {
      icon: <Code sx={{ fontSize: 28 }} />,
      title: 'Для разработчиков',
      description: 'Товары, созданные с учётом потребностей IT-специалистов',
    },
    {
      icon: <Speed sx={{ fontSize: 28 }} />,
      title: 'Премиум качество',
      description: 'Отбираем только лучшие товары с высоким рейтингом',
    },
    {
      icon: <Palette sx={{ fontSize: 28 }} />,
      title: 'Стильный дизайн',
      description: 'Товары, которые украсят ваше рабочее место',
    },
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero секция */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '70vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pt: 4,
        }}
      >
        {/* Декоративные круги с градиентами */}
        <Box
          className="animate-float"
          sx={{
            position: 'absolute',
            top: '-5%',
            left: '-10%',
            width: { xs: '40vw', md: '50vw' },
            height: { xs: '40vw', md: '50vw' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
        <Box
          className="animate-float-reverse"
          sx={{
            position: 'absolute',
            bottom: '-5%',
            right: '-10%',
            width: { xs: '35vw', md: '45vw' },
            height: { xs: '35vw', md: '45vw' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
        <Box
          className="animate-float"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '20vw', md: '30vw' },
            height: { xs: '20vw', md: '30vw' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
            animationDelay: '1s',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <GlassCard
            elevation="high"
            sx={{
              p: { xs: 4, md: 8 },
              background: isDark
                ? 'rgba(30, 30, 60, 0.75)'
                : 'rgba(255, 255, 255, 0.88)',
            }}
          >
            {/* Заголовок с градиентом */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #1d4ed8 100%)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                lineHeight: 1.1,
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            >
              CodeShop
            </Typography>

            {/* Подзаголовок */}
            <Typography
              variant="h5"
              sx={{
                color: isDark ? '#cbd5e1' : '#475569',
                mb: 5,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                maxWidth: '650px',
                mx: 'auto',
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              Магазин товаров для{' '}
              <Box component="span" sx={{ color: '#3b82f6', fontWeight: 700 }}>
                программистов
              </Box>
              . Создаём уютное рабочее место для{' '}
              <Box component="span" sx={{ color: '#10b981', fontWeight: 700 }}>
                максимальной продуктивности
              </Box>
              .
            </Typography>

            {/* Кнопки */}
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <GlassButton
                variant="contained"
                size="large"
                onClick={() => navigate('/catalog')}
                startIcon={<Storefront />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: { xs: '140px', sm: '180px', md: '220px' },
                  maxWidth: { xs: '200px', sm: '240px', md: '280px' },
                  flex: { xs: '0 0 calc(33.333% - 8px)', sm: '0 0 calc(33.333% - 12px)' },

                  '& .MuiButton-startIcon': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },

                  '&:hover': {
                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                    boxShadow: '0 12px 40px rgba(59, 130, 246, 0.5)',
                    transform: 'translateY(-4px) scale(1.03)',
                  },
                }}
              >
                В каталог
              </GlassButton>
              <GlassButton
                variant="outlined"
                size="large"
                onClick={() => navigate('/cart')}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.4)',
                  color: isDark ? '#f8fafc' : '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: { xs: '140px', sm: '180px', md: '220px' },
                  maxWidth: { xs: '200px', sm: '240px', md: '280px' },

                  '&:hover': {
                    background: isDark
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'rgba(59, 130, 246, 0.08)',
                    borderColor: '#3b82f6',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                В корзину
              </GlassButton>
            </Grid>

            {/* Статистика */}
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
              {[
                { value: '100+', label: 'Товаров' },
                { value: '50+', label: 'Клиентов' },
                { value: '99%', label: 'Довольны' },
              ].map((stat, index) => (
                <Grid key={index} size={{ xs: 4, md: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '16px',
                      background: isDark
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(59, 130, 246, 0.05)',
                      border: isDark
                        ? '1px solid rgba(59, 130, 246, 0.2)'
                        : '1px solid rgba(59, 130, 246, 0.15)',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '1.25rem', md: '1.75rem' },
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? '#94a3b8' : '#64748b',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </GlassCard>
        </Container>
      </Box>

      {/* Преимущества */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: isDark ? '#f8fafc' : '#1e293b',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
            }}
          >
            Почему выбирают нас
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDark ? '#94a3b8' : '#64748b',
              maxWidth: '500px',
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            Мы предлагаем лучшие товары для вашего комфорта и продуктивности
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <GlassCard
                elevation="medium"
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: 0,
                  animation: 'fade-in 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Box
                  sx={{
                    background: benefit.gradient,
                    borderRadius: '20px',
                    p: 2.5,
                    mb: 2.5,
                    display: 'inline-flex',
                    boxShadow: `0 8px 24px ${benefit.glow}`,
                    color: '#ffffff',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    
                    '&:hover': {
                      transform: 'scale(1.1) rotate(5deg)',
                      boxShadow: `0 12px 32px ${benefit.glow}`,
                    },
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f8fafc' : '#1e293b',
                    mb: 1,
                    fontSize: '1.1rem',
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                  }}
                >
                  {benefit.description}
                </Typography>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Особенности для IT */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <GlassCard
          elevation="high"
          sx={{
            p: { xs: 4, md: 6 },
            background: isDark
              ? 'rgba(59, 130, 246, 0.1)'
              : 'rgba(59, 130, 246, 0.05)',
            border: isDark
              ? '1px solid rgba(59, 130, 246, 0.2)'
              : '1px solid rgba(59, 130, 246, 0.15)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: isDark ? '#f8fafc' : '#1e293b',
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Создано для <span style={{ color: '#3b82f6' }}>разработчиков</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Мы понимаем ваши потребности и предлагаем товары, которые сделают вашу работу комфортнее
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '14px',
                      p: 1.5,
                      color: '#ffffff',
                      flexShrink: 0,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? '#f8fafc' : '#1e293b',
                        mb: 0.5,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? '#94a3b8' : '#64748b',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </GlassCard>
      </Container>

      {/* Популярные товары */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 5,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: isDark ? '#f8fafc' : '#1e293b',
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                mb: 0.5,
              }}
            >
              Популярные товары
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
              }}
            >
              Выбор наших покупателей
            </Typography>
          </Box>
          <GlassButton
            variant="outlined"
            onClick={() => navigate('/catalog')}
            endIcon={<Code />}
            sx={{
              borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.4)',
              color: isDark ? '#f8fafc' : '#3b82f6',
              
              '&:hover': {
                borderColor: '#3b82f6',
                background: isDark
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'rgba(59, 130, 246, 0.05)',
              },
            }}
          >
            Все товары
          </GlassButton>
        </Box>

        <Grid container spacing={3}>
          {featuredProducts.map((product, index) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA секция */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <GlassCard
          elevation="high"
          sx={{
            p: { xs: 5, md: 8 },
            textAlign: 'center',
            background: isDark
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)',
            border: isDark
              ? '1px solid rgba(59, 130, 246, 0.3)'
              : '1px solid rgba(59, 130, 246, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Декоративный элемент */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: isDark ? '#f8fafc' : '#1e293b',
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Готовы обновить рабочее место?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDark ? '#cbd5e1' : '#475569',
                fontWeight: 600,
                mb: 4,
                fontSize: { xs: '1rem', md: '1.125rem' },
              }}
            >
              Скидка{' '}
              <Box
                component="span"
                sx={{
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.15)',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '8px',
                }}
              >
                10%
              </Box>{' '}
              на первый заказ по промокоду{' '}
              <Box
                component="span"
                sx={{
                  fontFamily: 'monospace',
                  background: isDark
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '8px',
                  border: isDark
                    ? '1px solid rgba(59, 130, 246, 0.3)'
                    : '1px solid rgba(59, 130, 246, 0.2)',
                }}
              >
                WELCOME
              </Box>
            </Typography>
            <GlassButton
              variant="contained"
              size="large"
              onClick={() => navigate('/catalog')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.125rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                
                '&:hover': {
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  boxShadow: '0 12px 40px rgba(59, 130, 246, 0.5)',
                  transform: 'translateY(-4px) scale(1.03)',
                },
              }}
            >
              Начать покупки
            </GlassButton>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default HomePage;
