import React, { useState } from 'react';
import { Container, Typography, Box, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';
import { CheckCircle, LocalShipping, Payment, Person } from '@mui/icons-material';
import { GlassCard, GlassButton, GlassInput } from '../../components';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const { items, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);

  // Форма
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: '',
    paymentMethod: 'card', // 'card' или 'cash'
    deliveryMethod: 'cdek', // 'cdek', 'post', 'courier'
  });

  const shippingCost = getTotalPrice() >= 5000 ? 0 : 500;
  const total = getTotalPrice() + shippingCost;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Здесь будет логика отправки заказа
    alert('Заказ оформлен! Спасибо за покупку.');
    clearCart();
    navigate('/');
  };

  const isFormValid = formData.lastName && formData.firstName && formData.phone;

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <GlassCard
          elevation="high"
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          <Box sx={{ fontSize: '5rem', mb: 2 }}>🛒</Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: isDark ? '#f8fafc' : '#1e293b',
              mb: 2,
            }}
          >
            Корзина пуста
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDark ? '#94a3b8' : '#64748b',
              mb: 4,
            }}
          >
            Добавьте товары, чтобы оформить заказ
          </Typography>
          <GlassButton
            variant="contained"
            size="large"
            onClick={() => navigate('/catalog')}
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
        Оформление заказа
      </Typography>

      <Grid container spacing={4}>
        {/* Форма */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Контактные данные */}
            <GlassCard
              elevation="medium"
              sx={{
                p: 3,
                opacity: 0,
                animation: 'slide-right 0.5s ease-out 0.1s forwards',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  <Person sx={{ fontSize: 24, color: '#ffffff' }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f8fafc' : '#1e293b',
                  }}
                >
                  Контактные данные
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <GlassInput
                    label="Фамилия"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={!formData.lastName}
                    helperText={!formData.lastName ? 'Обязательное поле' : ''}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <GlassInput
                    label="Имя"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={!formData.firstName}
                    helperText={!formData.firstName ? 'Обязательное поле' : ''}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <GlassInput
                    label="Отчество"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <GlassInput
                    label="Телефон"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    error={!formData.phone}
                    helperText={!formData.phone ? 'Обязательное поле' : ''}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <GlassInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@mail.ru"
                  />
                </Grid>
              </Grid>
            </GlassCard>

            {/* Способ оплаты */}
            <GlassCard
              elevation="medium"
              sx={{
                p: 3,
                opacity: 0,
                animation: 'slide-right 0.5s ease-out 0.2s forwards',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <Payment sx={{ fontSize: 24, color: '#ffffff' }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f8fafc' : '#1e293b',
                  }}
                >
                  Способ оплаты
                </Typography>
              </Box>

              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  sx={{ gap: 1.5 }}
                >
                  <FormControlLabel
                    value="card"
                    control={
                      <Radio
                        sx={{
                          color: isDark ? '#94a3b8' : '#64748b',
                          '&.Mui-checked': {
                            color: '#10b981',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            fontSize: '1.5rem',
                          }}
                        >
                          💳
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: isDark ? '#f8fafc' : '#1e293b',
                            }}
                          >
                            Картой при получении
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? '#94a3b8' : '#64748b',
                            }}
                          >
                            Оплата картой в пункте выдачи
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(59, 130, 246, 0.15)',
                      background: formData.paymentMethod === 'card'
                        ? isDark
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(16, 185, 129, 0.08)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      width: '100%',

                      '&:hover': {
                        background: isDark
                          ? 'rgba(16, 185, 129, 0.2)'
                          : 'rgba(16, 185, 129, 0.12)',
                      },
                    }}
                  />
                  <FormControlLabel
                    value="cash"
                    control={
                      <Radio
                        sx={{
                          color: isDark ? '#94a3b8' : '#64748b',
                          '&.Mui-checked': {
                            color: '#10b981',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            fontSize: '1.5rem',
                          }}
                        >
                          💵
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: isDark ? '#f8fafc' : '#1e293b',
                            }}
                          >
                            Наличными при получении
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? '#94a3b8' : '#64748b',
                            }}
                          >
                            Оплата наличными курьеру или в пункте выдачи
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(59, 130, 246, 0.15)',
                      background: formData.paymentMethod === 'cash'
                        ? isDark
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(16, 185, 129, 0.08)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      width: '100%',

                      '&:hover': {
                        background: isDark
                          ? 'rgba(16, 185, 129, 0.2)'
                          : 'rgba(16, 185, 129, 0.12)',
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </GlassCard>

            {/* Тип доставки */}
            <GlassCard
              elevation="medium"
              sx={{
                p: 3,
                opacity: 0,
                animation: 'slide-right 0.5s ease-out 0.3s forwards',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                  }}
                >
                  <LocalShipping sx={{ fontSize: 24, color: '#ffffff' }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f8fafc' : '#1e293b',
                  }}
                >
                  Тип доставки
                </Typography>
              </Box>

              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={formData.deliveryMethod}
                  onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                  sx={{ gap: 1.5 }}
                >
                  <FormControlLabel
                    value="cdek"
                    control={
                      <Radio
                        sx={{
                          color: isDark ? '#94a3b8' : '#64748b',
                          '&.Mui-checked': {
                            color: '#f59e0b',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            fontSize: '1.5rem',
                          }}
                        >
                          📦
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: isDark ? '#f8fafc' : '#1e293b',
                            }}
                          >
                            CDEK
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? '#94a3b8' : '#64748b',
                            }}
                          >
                            Доставка в пункт выдачи CDEK (2-5 дней)
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(59, 130, 246, 0.15)',
                      background: formData.deliveryMethod === 'cdek'
                        ? isDark
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(245, 158, 11, 0.08)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      width: '100%',

                      '&:hover': {
                        background: isDark
                          ? 'rgba(245, 158, 11, 0.2)'
                          : 'rgba(245, 158, 11, 0.12)',
                      },
                    }}
                  />
                  <FormControlLabel
                    value="post"
                    control={
                      <Radio
                        sx={{
                          color: isDark ? '#94a3b8' : '#64748b',
                          '&.Mui-checked': {
                            color: '#f59e0b',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            fontSize: '1.5rem',
                          }}
                        >
                          🏤
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: isDark ? '#f8fafc' : '#1e293b',
                            }}
                          >
                            Почта России
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? '#94a3b8' : '#64748b',
                            }}
                          >
                            Доставка в отделение почты (5-14 дней)
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(59, 130, 246, 0.15)',
                      background: formData.deliveryMethod === 'post'
                        ? isDark
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(245, 158, 11, 0.08)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      width: '100%',

                      '&:hover': {
                        background: isDark
                          ? 'rgba(245, 158, 11, 0.2)'
                          : 'rgba(245, 158, 11, 0.12)',
                      },
                    }}
                  />
                  <FormControlLabel
                    value="courier"
                    control={
                      <Radio
                        sx={{
                          color: isDark ? '#94a3b8' : '#64748b',
                          '&.Mui-checked': {
                            color: '#f59e0b',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            fontSize: '1.5rem',
                          }}
                        >
                          🚚
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: isDark ? '#f8fafc' : '#1e293b',
                            }}
                          >
                            Курьером
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? '#94a3b8' : '#64748b',
                            }}
                          >
                            Доставка курьером до двери (1-3 дня)
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(59, 130, 246, 0.15)',
                      background: formData.deliveryMethod === 'courier'
                        ? isDark
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(245, 158, 11, 0.08)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      margin: 0,
                      width: '100%',

                      '&:hover': {
                        background: isDark
                          ? 'rgba(245, 158, 11, 0.2)'
                          : 'rgba(245, 158, 11, 0.12)',
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </GlassCard>
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
              animation: 'slide-left 0.5s ease-out 0.2s forwards',
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
              <CheckCircle sx={{ color: '#10b981' }} />
              Заказ
            </Typography>

            {/* Товары */}
            <Box sx={{ mb: 3, maxHeight: 300, overflow: 'auto' }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5,
                    pb: 1.5,
                    borderBottom: isDark
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(59, 130, 246, 0.15)',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: isDark ? '#f8fafc' : '#1e293b',
                        fontSize: '0.9rem',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? '#94a3b8' : '#64748b',
                      }}
                    >
                      {item.quantity} шт.
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: isDark ? '#f8fafc' : '#1e293b',
                    }}
                  >
                    {(item.price * item.quantity).toLocaleString()} ₽
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Итого */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                Товары
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
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

            {/* Кнопка оформления */}
            <GlassButton
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={!isFormValid}
              sx={{
                mb: 2,
                py: 2,
                background: isFormValid
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'rgba(16, 185, 129, 0.3)',
                boxShadow: isFormValid
                  ? '0 8px 24px rgba(16, 185, 129, 0.4)'
                  : 'none',
                fontSize: '1.05rem',

                '&:hover': {
                  background: isFormValid
                    ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                    : 'rgba(16, 185, 129, 0.3)',
                  transform: isFormValid ? 'translateY(-3px)' : 'none',
                  boxShadow: isFormValid
                    ? '0 12px 32px rgba(16, 185, 129, 0.5)'
                    : 'none',
                },

                '&.Mui-disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
            >
              Оформить заказ
            </GlassButton>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                color: isDark ? '#64748b' : '#94a3b8',
              }}
            >
              Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
            </Typography>
          </GlassCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
