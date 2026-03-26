import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Rating, IconButton, Paper, Chip, Divider, Table, TableBody, TableCell, TableRow, TableContainer, Snackbar } from '@mui/material';
import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite,
  Share,
  ArrowBack,
  Check,
  Description,
  Tune,
  Reviews,
  Star,
  ThumbUp,
  VerifiedUser,
  LocalShipping,
  Replay,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { GlassCard, GlassButton } from '../../components';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [quantity, setQuantity] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([]);
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareSnackbarOpen(true);
    } catch (err) {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShareSnackbarOpen(true);
    }
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <GlassCard
          elevation="high"
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            opacity: 0,
            animation: 'scale-in 0.5s ease-out forwards',
          }}
        >
          <Box sx={{ fontSize: '5rem', mb: 2 }}>❌</Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: isDark ? '#f8fafc' : '#1e293b',
              mb: 2,
            }}
          >
            Товар не найден
          </Typography>
          <GlassButton
            variant="contained"
            onClick={() => navigate('/catalog')}
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            }}
          >
            В каталог
          </GlassButton>
        </GlassCard>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleHelpfulClick = (reviewIndex: number) => {
    setHelpfulReviews((prev) =>
      prev.includes(reviewIndex)
        ? prev.filter((i) => i !== reviewIndex)
        : [...prev, reviewIndex]
    );
  };

  const steps = [
    { label: 'Описание', icon: <Description fontSize="small" /> },
    { label: 'Характеристики', icon: <Tune fontSize="small" /> },
    { label: 'Отзывы', icon: <Reviews fontSize="small" /> },
  ];

  // Расширенные характеристики в зависимости от категории
  const getCategorySpecifications = () => {
    const baseSpecs: Record<string, { label: string; value: string }[]> = {
      'Коврики': [
        { label: 'Размер', value: '900 × 400 × 4 мм' },
        { label: 'Материал поверхности', value: 'Микроткань' },
        { label: 'Материал основы', value: 'Натуральный каучук' },
        { label: 'Тип поверхности', value: 'Гладкая' },
        { label: 'Водостойкость', value: 'Да' },
      ],
      'Клавиатуры': [
        { label: 'Тип переключателей', value: 'Механические' },
        { label: 'Тип подключения', value: 'Проводное / Беспроводное' },
        { label: 'Раскладка', value: 'ANSI / ISO' },
        { label: 'Подсветка', value: 'RGB' },
        { label: 'N-Key Rollover', value: 'Полный' },
        { label: 'Время отклика', value: '1 мс' },
      ],
      'Мышки': [
        { label: 'Тип сенсора', value: 'Оптический' },
        { label: 'Макс. DPI', value: '25600' },
        { label: 'Количество кнопок', value: '8' },
        { label: 'Тип подключения', value: 'Беспроводное / Проводное' },
        { label: 'Вес', value: '63 г (без кабеля)' },
        { label: 'Ускорение', value: '50G' },
      ],
      'Кресла': [
        { label: 'Макс. нагрузка', value: '150 кг' },
        { label: 'Регулировка высоты', value: 'Газлифт 4 класса' },
        { label: 'Регулировка наклона', value: '90° - 135°' },
        { label: 'Подлокотники', value: '4D' },
        { label: 'Поясничная поддержка', value: 'Регулируемая' },
        { label: 'Материал обивки', value: 'Дышащая сетка' },
      ],
      'Антистресс': [
        { label: 'Материал', value: 'Силикон / Пластик' },
        { label: 'Размер', value: '100 × 100 × 30 мм' },
        { label: 'Вес', value: '150 г' },
        { label: 'Возраст', value: '3+' },
        { label: 'Количество режимов', value: '6' },
      ],
      'Подставки': [
        { label: 'Материал', value: 'Алюминий' },
        { label: 'Макс. размер экрана', value: '32"' },
        { label: 'Макс. нагрузка', value: '10 кг' },
        { label: 'Регулировка угла', value: '0° - 45°' },
        { label: 'Вентиляция', value: 'Активная / Пассивная' },
      ],
    };

    return baseSpecs[product.category] || [];
  };

  const specifications = [
    { label: 'Бренд', value: 'CodeShop Pro' },
    { label: 'Серия', value: 'Professional' },
    { label: 'Страна бренда', value: 'США' },
    { label: 'Гарантия', value: '24 месяца' },
    { label: 'Артикул', value: `CS-${product.id.toString().padStart(4, '0')}` },
    ...getCategorySpecifications(),
    { label: 'Комплектация', value: 'Товар, упаковка, инструкция, гарантийный талон' },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Алексей К.',
      rating: 5,
      text: 'Отличный товар! Пользуюсь уже месяц, всё супер. Качество на высоте, полностью соответствует описанию. Доставка была быстрой, упаковка надёжная. Рекомендую!',
      date: '2 дня назад',
      verified: true,
      helpful: 24,
      images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=100'],
    },
    {
      id: 2,
      name: 'Мария С.',
      rating: 4,
      text: 'Качество хорошее, но доставка заняла больше времени, чем ожидалось. В целом покупкой довольна, товар работает как надо. Из минусов — немного завышена цена.',
      date: '1 неделю назад',
      verified: true,
      helpful: 12,
      images: [],
    },
    {
      id: 3,
      name: 'Дмитрий В.',
      rating: 5,
      text: 'Рекомендую! Соответствует описанию, качество на высоте. Использую ежедневно для работы, никаких нареканий. За свои деньги — отличный выбор.',
      date: '2 недели назад',
      verified: false,
      helpful: 8,
      images: [],
    },
    {
      id: 4,
      name: 'Игорь М.',
      rating: 5,
      text: 'Превосходное качество! Видно, что производитель не экономил на материалах. Очень доволен покупкой, буду заказывать ещё.',
      date: '3 недели назад',
      verified: true,
      helpful: 15,
      images: [],
    },
    {
      id: 5,
      name: 'Елена П.',
      rating: 4,
      text: 'Хороший товар за свои деньги. Есть небольшие недочёты в дизайне, но на функционал это не влияет. В целом рекомендую к покупке.',
      date: '1 месяц назад',
      verified: true,
      helpful: 6,
      images: [],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Кнопка назад */}
      <Box
        sx={{
          mb: 3,
          opacity: 0,
          animation: 'fade-in 0.5s ease-out forwards',
        }}
      >
        <GlassButton
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
          sx={{
            borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.4)',
            color: isDark ? '#f8fafc' : '#3b82f6',
            '& .MuiButton-startIcon': {
  marginRight: '8px',
},
            '&:hover': {
              background: isDark
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(59, 130, 246, 0.05)',
              borderColor: '#3b82f6',
              transform: 'translateX(-4px)',
            },
          }}
        >
          Назад
        </GlassButton>
      </Box>

      <Grid container spacing={4}>
        {/* Изображения */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              opacity: 0,
              animation: 'slide-right 0.5s ease-out 0.1s forwards',
            }}
          >
            <GlassCard elevation="high" sx={{ overflow: 'hidden', mb: 2 }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </GlassCard>

            {/* Миниатюры */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {[1, 2, 3, 4].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: index === 0
                      ? '2px solid #3b82f6'
                      : isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(59, 130, 246, 0.2)',
                    cursor: 'pointer',
                    opacity: index === 0 ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                    
                    '&:hover': {
                      opacity: 1,
                      transform: 'scale(1.05)',
                      borderColor: '#3b82f6',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt=""
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Информация о товаре */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              opacity: 0,
              animation: 'slide-left 0.5s ease-out 0.2s forwards',
            }}
          >
            {/* Категория */}
            <Box
              sx={{
                display: 'inline-block',
                background: isDark
                  ? 'rgba(59, 130, 246, 0.2)'
                  : 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                px: 1.5,
                py: 0.5,
                borderRadius: '10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                mb: 1.5,
                border: isDark
                  ? '1px solid rgba(59, 130, 246, 0.3)'
                  : '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              {product.category}
            </Box>

            {/* Название */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: isDark ? '#f8fafc' : '#1e293b',
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2.25rem' },
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </Typography>

            {/* Рейтинг */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                pb: 3,
                borderBottom: isDark
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              <Rating
                value={product.rating || 4}
                precision={0.1}
                readOnly
                sx={{
                  color: '#fbbf24',
                  '& .MuiRating-iconEmpty': {
                    color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                }}
              />
              <Typography
                sx={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  fontWeight: 600,
                }}
              >
                {product.rating || 4.0} • 124 отзыва
              </Typography>
            </Box>

            {/* Цена */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                  }}
                >
                  {product.price.toLocaleString()} ₽
                </Typography>
                {product.oldPrice && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: isDark ? '#64748b' : '#94a3b8',
                      textDecoration: 'line-through',
                      fontWeight: 500,
                    }}
                  >
                    {product.oldPrice.toLocaleString()} ₽
                  </Typography>
                )}
              </Box>
              {product.oldPrice && (
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    borderRadius: '10px',
                    px: 1.5,
                    py: 0.5,
                    mt: 1.5,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  <Check fontSize="small" />
                  Экономия {product.oldPrice - product.price} ₽
                </Box>
              )}
            </Box>

            {/* Описание */}
            <Typography
              variant="body1"
              sx={{
                color: isDark ? '#cbd5e1' : '#475569',
                mb: 3,
                lineHeight: 1.8,
                fontSize: '1rem',
              }}
            >
              {product.description || 'Высококачественный товар для профессионалов. Создан с учётом всех современных требований и стандартов. Идеально подходит для ежедневного использования.'}
            </Typography>

            {/* Количество и кнопки */}
            <GlassCard
              elevation="medium"
              sx={{
                p: 2.5,
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {/* Количество */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(59, 130, 246, 0.05)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    
                    '&:hover': {
                      borderColor: '#3b82f6',
                    },
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    sx={{
                      color: '#3b82f6',
                      width: 44,
                      height: 44,
                      
                      '&:hover': {
                        background: 'rgba(59, 130, 246, 0.15)',
                      },
                    }}
                  >
                    -
                  </IconButton>
                  <Box
                    sx={{
                      px: 3,
                      py: 1,
                      color: isDark ? '#f8fafc' : '#1e293b',
                      fontWeight: 700,
                      minWidth: 50,
                      textAlign: 'center',
                      fontSize: '1.1rem',
                    }}
                  >
                    {quantity}
                  </Box>
                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{
                      color: '#3b82f6',
                      width: 44,
                      height: 44,
                      
                      '&:hover': {
                        background: 'rgba(59, 130, 246, 0.15)',
                      },
                    }}
                  >
                    +
                  </IconButton>
                </Box>

                {/* В корзину */}
                <GlassButton
                  variant="contained"
                  onClick={handleAddToCart}
                  startIcon={addedToCart ? <Check /> : <AddShoppingCart />}
                  sx={{
                    flexGrow: 1,
                    py: 1.8,
                    background: addedToCart
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    boxShadow: addedToCart
                      ? '0 4px 16px rgba(16, 185, 129, 0.4)'
                      : '0 4px 16px rgba(59, 130, 246, 0.4)',
                    '& .MuiButton-startIcon': {
                      marginRight: '8px',
                    },
                    '&:hover': {
                      background: addedToCart
                        ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                        : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {addedToCart ? 'Добавлено!' : 'В корзину'}
                </GlassButton>

                {/* В избранное */}
                <IconButton
                  onClick={() => {
                    if (product) {
                      toggleFavorite(product);
                    }
                  }}
                  sx={{
                    background: isFavorite(product?.id || 0)
                      ? 'rgba(239, 68, 68, 0.15)'
                      : isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(59, 130, 246, 0.1)',
                    border: `1px solid ${isFavorite(product?.id || 0) ? '#ef4444' : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                    color: isFavorite(product?.id || 0) ? '#ef4444' : isDark ? '#f8fafc' : '#475569',
                    width: 52,
                    height: 52,

                    '&:hover': {
                      background: isFavorite(product?.id || 0)
                        ? 'rgba(239, 68, 68, 0.25)'
                        : isDark
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(59, 130, 246, 0.15)',
                      transform: 'scale(1.1) rotate(5deg)',
                      borderColor: '#ef4444',
                    },
                  }}
                >
                  {isFavorite(product?.id || 0) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>

                {/* Поделиться */}
                <IconButton
                  onClick={handleShare}
                  sx={{
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(59, 130, 246, 0.1)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                    color: isDark ? '#f8fafc' : '#475569',
                    width: 52,
                    height: 52,

                    '&:hover': {
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(59, 130, 246, 0.15)',
                      transform: 'scale(1.1) rotate(-5deg)',
                      borderColor: '#3b82f6',
                    },
                  }}
                >
                  <Share />
                </IconButton>
              </Box>
            </GlassCard>

            {/* Преимущества */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { icon: '🚚', text: 'Бесплатная доставка от 5000 ₽' },
                { icon: '🛡️', text: 'Гарантия 2 года' },
                { icon: '↩️', text: 'Возврат в течение 30 дней' },
                { icon: '💬', text: 'Поддержка 24/7' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.03)'
                      : 'rgba(59, 130, 246, 0.03)',
                    borderRadius: '12px',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.05)'
                      : '1px solid rgba(59, 130, 246, 0.08)',
                  }}
                >
                  <Box sx={{ fontSize: '1.25rem' }}>{item.icon}</Box>
                  <Typography
                    sx={{
                      color: isDark ? '#cbd5e1' : '#475569',
                      fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Вкладки с информацией */}
      <Box
        sx={{
          mt: 6,
          opacity: 0,
          animation: 'fade-in 0.5s ease-out 0.4s forwards',
        }}
      >
        <GlassCard elevation="high" sx={{ p: 3 }}>
          {/* Кастомные табы вместо Stepper */}
          <Box
            sx={{
              display: 'flex',
              mb: 4,
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
              p: 1,
              background: isDark
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(59, 130, 246, 0.03)',
              borderRadius: '16px',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.08)'
                : '1px solid rgba(59, 130, 246, 0.1)',
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={step.label}
                onClick={() => setActiveStep(index)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: activeStep === index
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    : 'transparent',
                  color: activeStep === index ? '#ffffff' : isDark ? '#94a3b8' : '#64748b',
                  fontWeight: activeStep === index ? 700 : 500,
                  boxShadow: activeStep === index
                    ? '0 4px 16px rgba(59, 130, 246, 0.4)'
                    : 'none',
                  
                  '&:hover': {
                    background: activeStep === index
                      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
                      : isDark
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(59, 130, 246, 0.08)',
                    transform: 'translateY(-2px)',
                  },
                  
                  '& .tab-icon': {
                    color: activeStep === index ? '#ffffff' : 'inherit',
                  },
                }}
              >
                <Box className="tab-icon" sx={{ fontSize: 20 }}>
                  {step.icon}
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontSize: '0.9rem',
                  }}
                >
                  {step.label}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ minHeight: 300 }}>
            {/* Вкладка 1: Описание */}
            {activeStep === 0 && (
              <Box
                sx={{
                  animation: 'fade-in 0.4s ease-out',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: isDark ? '#cbd5e1' : '#475569',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                    mb: 3,
                  }}
                >
                  {product.description || 'Этот товар создан специально для профессионалов, которые ценят качество и комфорт. Инновационные материалы и продуманный дизайн обеспечивают максимальную производительность и долговечность.'}
                </Typography>
                
                <Divider sx={{ my: 3, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.15)' }} />
                
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#f8fafc' : '#1e293b',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Star sx={{ color: '#fbbf24', fontSize: 20 }} />
                  Преимущества
                </Typography>
                
                <Grid container spacing={2}>
                  {[
                    { icon: <VerifiedUser sx={{ fontSize: 18 }} />, text: 'Оригинальный продукт' },
                    { icon: <LocalShipping sx={{ fontSize: 18 }} />, text: 'Быстрая доставка' },
                    { icon: <Replay sx={{ fontSize: 18 }} />, text: 'Легкий возврат' },
                    { icon: <ThumbUp sx={{ fontSize: 18 }} />, text: 'Гарантия качества' },
                  ].map((item, idx) => (
                    <Grid key={idx} size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1.5,
                          background: isDark
                            ? 'rgba(59, 130, 246, 0.1)'
                            : 'rgba(59, 130, 246, 0.05)',
                          borderRadius: '10px',
                          border: isDark
                            ? '1px solid rgba(59, 130, 246, 0.2)'
                            : '1px solid rgba(59, 130, 246, 0.1)',
                        }}
                      >
                        <Box sx={{ color: '#3b82f6' }}>{item.icon}</Box>
                        <Typography
                          sx={{
                            color: isDark ? '#cbd5e1' : '#475569',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {/* Вкладка 2: Характеристики */}
            {activeStep === 1 && (
              <Box
                sx={{
                  animation: 'fade-in 0.4s ease-out',
                }}
              >
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{
                    background: 'transparent',
                    boxShadow: 'none',
                  }}
                >
                  <Table>
                    <TableBody>
                      {specifications.map((spec, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td': {
                              borderBottom: 'none',
                            },
                            '&:hover': {
                              background: isDark
                                ? 'rgba(255, 255, 255, 0.03)'
                                : 'rgba(59, 130, 246, 0.03)',
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              color: isDark ? '#94a3b8' : '#64748b',
                              fontWeight: 500,
                              borderBottom: isDark
                                ? '1px solid rgba(255, 255, 255, 0.08)'
                                : '1px solid rgba(59, 130, 246, 0.1)',
                              py: 2,
                            }}
                          >
                            {spec.label}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: isDark ? '#f8fafc' : '#1e293b',
                              fontWeight: 600,
                              borderBottom: isDark
                                ? '1px solid rgba(255, 255, 255, 0.08)'
                                : '1px solid rgba(59, 130, 246, 0.1)',
                              py: 2,
                            }}
                          >
                            {spec.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            
            {/* Вкладка 3: Отзывы */}
            {activeStep === 2 && (
              <Box
                sx={{
                  animation: 'fade-in 0.4s ease-out',
                }}
              >
                {/* Статистика отзывов */}
                <Box
                  sx={{
                    mb: 3,
                    p: 2.5,
                    background: isDark
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '14px',
                    border: isDark
                      ? '1px solid rgba(59, 130, 246, 0.2)'
                      : '1px solid rgba(59, 130, 246, 0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: '#fbbf24',
                          fontSize: '3rem',
                          lineHeight: 1,
                        }}
                      >
                        4.7
                      </Typography>
                      <Rating value={4.7} precision={0.1} readOnly sx={{ color: '#fbbf24' }} />
                      <Typography variant="caption" sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                        {reviews.length} отзывов
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.15)' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = reviews.filter((r) => r.rating === stars).length;
                        const percent = (count / reviews.length) * 100;
                        return (
                          <Box key={stars} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography sx={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#64748b', minWidth: 30 }}>
                              {stars} ★
                            </Typography>
                            <Box
                              sx={{
                                flexGrow: 1,
                                height: 6,
                                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.15)',
                                borderRadius: 3,
                                overflow: 'hidden',
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${percent}%`,
                                  height: '100%',
                                  background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                                  borderRadius: 3,
                                }}
                              />
                            </Box>
                            <Typography sx={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#64748b', minWidth: 25 }}>
                              {count}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>

                {/* Список отзывов */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {reviews.map((review, index) => (
                    <Paper
                      key={review.id}
                      sx={{
                        p: 2.5,
                        background: isDark
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(59, 130, 246, 0.03)',
                        border: isDark
                          ? '1px solid rgba(255, 255, 255, 0.08)'
                          : '1px solid rgba(59, 130, 246, 0.1)',
                        borderRadius: '14px',
                        boxShadow: 'none',
                        transition: 'all 0.3s ease',
                        
                        '&:hover': {
                          background: isDark
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(59, 130, 246, 0.05)',
                        },
                      }}
                      elevation={0}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1.5,
                          flexWrap: 'wrap',
                          gap: 1,
                        }}
                      >
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: isDark ? '#f8fafc' : '#1e293b',
                              }}
                            >
                              {review.name}
                            </Typography>
                            {review.verified && (
                              <Chip
                                label="Проверенная покупка"
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.65rem',
                                  background: isDark
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : 'rgba(16, 185, 129, 0.1)',
                                  color: '#10b981',
                                  border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'}`,
                                  fontWeight: 600,
                                }}
                              />
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Rating value={review.rating} size="small" readOnly sx={{ color: '#fbbf24' }} />
                            <Typography
                              variant="caption"
                              sx={{
                                color: isDark ? '#64748b' : '#94a3b8',
                              }}
                            >
                              {review.date}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          color: isDark ? '#cbd5e1' : '#475569',
                          lineHeight: 1.7,
                          mb: 2,
                        }}
                      >
                        {review.text}
                      </Typography>
                      
                      {/* Фото отзыва */}
                      {review.images && review.images.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          {review.images.map((img, idx) => (
                            <Box
                              key={idx}
                              component="img"
                              src={img}
                              alt=""
                              sx={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: isDark
                                  ? '1px solid rgba(255,255,255,0.1)'
                                  : '1px solid rgba(59,130,246,0.15)',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      
                      {/* Кнопка "Полезен" */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                          onClick={() => handleHelpfulClick(index)}
                          sx={{
                            background: helpfulReviews.includes(index)
                              ? 'rgba(59, 130, 246, 0.15)'
                              : isDark
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(59, 130, 246, 0.05)',
                            color: helpfulReviews.includes(index) ? '#3b82f6' : isDark ? '#94a3b8' : '#64748b',
                            border: `1px solid ${helpfulReviews.includes(index) ? 'rgba(59, 130, 246, 0.3)' : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.15)'}`,
                            
                            '&:hover': {
                              background: helpfulReviews.includes(index)
                                ? 'rgba(59, 130, 246, 0.25)'
                                : isDark
                                  ? 'rgba(255, 255, 255, 0.1)'
                                  : 'rgba(59, 130, 246, 0.1)',
                              borderColor: '#3b82f6',
                            },
                          }}
                        >
                          <ThumbUp fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDark ? '#94a3b8' : '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          Полезно ({review.helpful + (helpfulReviews.includes(index) ? 1 : 0)})
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </GlassCard>
      </Box>

      {/* Уведомление о копировании ссылки */}
      <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setShareSnackbarOpen(false)}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Check sx={{ color: '#10b981', fontSize: 24 }} />
            <Typography sx={{ color: isDark ? '#f8fafc' : '#1e293b', fontWeight: 500 }}>
              Ссылка скопирована в буфер обмена
            </Typography>
          </Box>
        }
        sx={{
          '& .MuiSnackbarContent-root': {
            background: isDark
              ? 'rgba(30, 30, 60, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            borderRadius: '14px',
          },
        }}
      />
    </Container>
  );
};

export default ProductPage;
