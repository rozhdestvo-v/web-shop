import React, { useState, useMemo, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, InputAdornment, Slider, Checkbox } from '@mui/material';
import { Search, Tune, FilterList, Sort } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { GlassCard, GlassButton, ProductCard } from '../../components';
import { products, categories } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const CatalogPage: React.FC = () => {
  const { addToCart } = useCart();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular');
  const [showInStock, setShowInStock] = useState(false);

  // Синхронизация searchQuery с query-параметром из URL
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Категория
    if (selectedCategory !== 'all') {
      const categoryMap: Record<string, string[]> = {
        mousepads: ['Коврики'],
        keyboards: ['Клавиатуры'],
        mice: ['Мышки'],
        chairs: ['Кресла'],
        antistress: ['Антистресс'],
        stands: ['Подставки'],
      };
      const categoryNames = categoryMap[selectedCategory] || [];
      result = result.filter((p) => categoryNames.includes(p.category));
    }

    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Цена
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // В наличии
    if (showInStock) {
      result = result.filter((p) => p.rating && p.rating > 0);
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, sortBy, showInStock]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок */}
      <Box
        sx={{
          mb: 4,
          opacity: 0,
          animation: 'fade-in 0.5s ease-out forwards',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: isDark ? '#f8fafc' : '#1e293b',
            mb: 1,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Каталог товаров
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isDark ? '#94a3b8' : '#64748b',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Найдено товаров:{' '}
          <Box
            component="span"
            sx={{
              background: isDark
                ? 'rgba(59, 130, 246, 0.2)'
                : 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              px: 1.5,
              py: 0.25,
              borderRadius: '8px',
              fontWeight: 700,
            }}
          >
            {filteredProducts.length}
          </Box>
        </Typography>
      </Box>

      {/* Поиск и фильтры */}
      <GlassCard
        elevation="medium"
        sx={{
          p: 2.5,
          mb: 4,
          opacity: 0,
          animation: 'slide-down 0.5s ease-out 0.1s forwards',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {/* Поиск */}
          <TextField
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchQuery(newValue);
              // Обновляем URL параметр
              if (newValue.trim()) {
                searchParams.set('search', newValue.trim());
              } else {
                searchParams.delete('search');
              }
              setSearchParams(searchParams);
            }}
            fullWidth
            sx={{
              flexGrow: 1,
              minWidth: 200,
              
              '& .MuiOutlinedInput-root': {
                background: isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '14px',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.3)'}`,
                color: isDark ? '#f8fafc' : '#1e293b',
                transition: 'all 0.3s ease',
                
                '& fieldset': { border: 'none' },
                
                '&:hover': {
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(59, 130, 246, 0.5)',
                },
                
                '&.Mui-focused': {
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(255, 255, 255, 0.9)',
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
                },
              },
              
              '& .MuiInputBase-input::placeholder': {
                color: isDark ? '#64748b' : '#94a3b8',
              },
              
              '& .MuiInputBase-input': {
                color: isDark ? '#f8fafc' : '#1e293b',
                py: 1.5,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#3b82f6', fontSize: 22 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Кнопка фильтров для мобильных */}
          <GlassButton
            variant="outlined"
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.4)',
              color: isDark ? '#f8fafc' : '#3b82f6',
            }}
          >
            <FilterList sx={{ mr: 1 }} /> Фильтры
          </GlassButton>
        </Box>
      </GlassCard>

      <Grid container spacing={3}>
        {/* Сайдбар с фильтрами */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              display: { xs: showFilters ? 'block' : 'none', md: 'block' },
              position: { md: 'sticky' },
              top: 120,
              zIndex: 10,
            }}
          >
            {/* Категории */}
            <GlassCard
              elevation="medium"
              sx={{
                p: 2.5,
                mb: 3,
                opacity: 0,
                animation: 'slide-down 0.5s ease-out 0.2s forwards',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? '#f8fafc' : '#1e293b',
                  mb: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Tune fontSize="small" />
                Категории
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <Box
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        padding: '12px 14px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        background: isActive
                          ? isDark
                            ? 'rgba(59, 130, 246, 0.2)'
                            : 'rgba(59, 130, 246, 0.12)'
                          : 'transparent',
                        border: isActive
                          ? `1px solid ${isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)'}`
                          : '1px solid transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        
                        '&:hover': {
                          background: isActive
                            ? isDark
                              ? 'rgba(59, 130, 246, 0.25)'
                              : 'rgba(59, 130, 246, 0.15)'
                            : isDark
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(59, 130, 246, 0.05)',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <span
                        style={{
                          fontSize: '1.3rem',
                          filter: isActive ? 'none' : 'grayscale(0.3)',
                          transition: 'filter 0.3s ease',
                        }}
                      >
                        {cat.icon}
                      </span>
                      <Typography
                        sx={{
                          color: isActive
                            ? '#3b82f6'
                            : isDark
                              ? '#cbd5e1'
                              : '#475569',
                          fontWeight: isActive ? 700 : 500,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {cat.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </GlassCard>

            {/* Цена */}
            <GlassCard
              elevation="medium"
              sx={{
                p: 2.5,
                mb: 3,
                opacity: 0,
                animation: 'slide-down 0.5s ease-out 0.3s forwards',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? '#f8fafc' : '#1e293b',
                  mb: 2.5,
                }}
              >
                Цена
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, value) => setPriceRange(value as [number, number])}
                valueLabelDisplay="auto"
                min={0}
                max={150000}
                sx={{
                  color: '#3b82f6',
                  mb: 2,
                  
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#ffffff',
                    border: '3px solid #3b82f6',
                    width: 22,
                    height: 22,
                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                    transition: 'all 0.2s ease',
                    
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.6)',
                      transform: 'scale(1.1)',
                    },
                    '&.Mui-focusVisible': {
                      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)',
                    },
                  },
                  
                  '& .MuiSlider-track': {
                    backgroundColor: '#3b82f6',
                    border: 'none',
                    height: 6,
                  },
                  
                  '& .MuiSlider-rail': {
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(59, 130, 246, 0.3)',
                    height: 6,
                  },
                  
                  '& .MuiSlider-valueLabel': {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    fontWeight: 600,
                    px: 1,
                    py: 0.5,
                    borderRadius: '8px',
                    
                    '&:before': {
                      display: 'none',
                    },
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(59, 130, 246, 0.05)',
                  borderRadius: '10px',
                  p: 1.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? '#cbd5e1' : '#475569',
                    fontWeight: 700,
                  }}
                >
                  {priceRange[0].toLocaleString()} ₽
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? '#cbd5e1' : '#475569',
                    fontWeight: 700,
                  }}
                >
                  {priceRange[1].toLocaleString()} ₽
                </Typography>
              </Box>
            </GlassCard>

            {/* Фильтр "В наличии" */}
            {/* <GlassCard
              elevation="medium"
              sx={{
                p: 2,
                mb: 3,
                opacity: 0,
                animation: 'slide-down 0.5s ease-out 0.4s forwards',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  cursor: 'pointer',
                  
                  '&:hover .MuiCheckbox-root': {
                    color: '#3b82f6',
                  },
                }}
                onClick={() => setShowInStock(!showInStock)}
              >
                <Checkbox
                  checked={showInStock}
                  onChange={() => setShowInStock(!showInStock)}
                  sx={{
                    color: isDark ? '#cbd5e1' : '#475569',
                    '&.Mui-checked': {
                      color: '#3b82f6',
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: isDark ? '#cbd5e1' : '#475569',
                    fontWeight: 500,
                  }}
                >
                  В наличии
                </Typography>
              </Box>
            </GlassCard> */}

            {/* Сортировка */}
            <GlassCard
              elevation="medium"
              sx={{
                p: 2.5,
                opacity: 0,
                animation: 'slide-down 0.5s ease-out 0.5s forwards',
              }}
            >
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
                <Sort fontSize="small" />
                Сортировка
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { value: 'popular', label: 'По популярности' },
                  { value: 'price-asc', label: 'Сначала дешёвые' },
                  { value: 'price-desc', label: 'Сначала дорогие' },
                  { value: 'name', label: 'По названию' },
                ].map((option) => (
                  <Box
                    key={option.value}
                    onClick={() => setSortBy(option.value as typeof sortBy)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: sortBy === option.value
                        ? isDark
                          ? 'rgba(59, 130, 246, 0.15)'
                          : 'rgba(59, 130, 246, 0.08)'
                        : 'transparent',
                      border: sortBy === option.value
                        ? `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`
                        : '1px solid transparent',
                      transition: 'all 0.3s ease',
                      
                      '&:hover': {
                        background: sortBy === option.value
                          ? isDark
                            ? 'rgba(59, 130, 246, 0.2)'
                            : 'rgba(59, 130, 246, 0.12)'
                          : isDark
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(59, 130, 246, 0.05)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        border: `2px solid ${sortBy === option.value ? '#3b82f6' : isDark ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.3)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        '&::after': {
                          content: sortBy === option.value ? '""' : 'none',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#3b82f6',
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        color: sortBy === option.value
                          ? '#3b82f6'
                          : isDark
                            ? '#cbd5e1'
                            : '#475569',
                        fontWeight: sortBy === option.value ? 600 : 500,
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </GlassCard>
          </Box>
        </Grid>

        {/* Сетка товаров */}
        <Grid size={{ xs: 12, md: 9 }}>
          {filteredProducts.length > 0 ? (
            <Grid container spacing={2.5}>
              {filteredProducts.map((product, index) => (
                <Grid
                  key={product.id}
                  size={{ xs: 12, sm: 6, lg: 4 }}
                  sx={{
                    opacity: 0,
                    animation: 'scale-in 0.5s ease-out forwards',
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <GlassCard
              elevation="high"
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards',
              }}
            >
              <Box
                sx={{
                  fontSize: '4rem',
                  mb: 2,
                }}
              >
                🔍
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: isDark ? '#f8fafc' : '#1e293b',
                  mb: 2,
                }}
              >
                Ничего не найдено
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  mb: 3,
                  maxWidth: '400px',
                  mx: 'auto',
                }}
              >
                Попробуйте изменить параметры поиска или фильтры
              </Typography>
              <GlassButton
                variant="contained"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setPriceRange([0, 150000]);
                  setShowInStock(false);
                }}
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                }}
              >
                Сбросить фильтры
              </GlassButton>
            </GlassCard>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CatalogPage;
