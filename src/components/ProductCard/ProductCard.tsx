import React from 'react';
import { Box, Typography, CardMedia, CardContent, Stack, Chip } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, Favorite, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../GlassCard/GlassCard';
import GlassButton from '../GlassButton/GlassButton';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating?: number;
  description?: string;
  reviews?: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  index = 0,
}) => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isDark = mode === 'dark';

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <GlassCard
      hover
      elevation="medium"
      onClick={() => navigate(`/product/${product.id}`)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        
        // Staggered animation
        opacity: 0,
        animation: 'fade-in 0.5s ease-out forwards',
        animationDelay: `${index * 0.08}s`,
        
        '&:hover .product-image': {
          transform: 'scale(1.1)',
        },
        
        '&:hover .add-to-cart-btn': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      }}
    >
      {/* Бейдж скидки */}
      {product.oldPrice && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '10px',
            px: 1.5,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#ffffff',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        >
          -{discount}%
        </Box>
      )}

      {/* Бейдж новинки */}
      {product.isNew && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '10px',
            px: 1.5,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#ffffff',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          }}
        >
          NEW
        </Box>
      )}

      {/* Кнопка избранного */}
      <Box
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
        }}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: isDark
            ? 'rgba(30, 30, 60, 0.8)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid rgba(59, 130, 246, 0.2)',

          '&:hover': {
            transform: 'scale(1.15) rotate(15deg)',
            background: isDark
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(239, 68, 68, 0.1)',
            borderColor: '#ef4444',
          },
        }}
      >
        {isFavorite(product.id) ? (
          <Favorite sx={{ fontSize: 20, color: '#ef4444' }} />
        ) : (
          <FavoriteBorder
            sx={{
              fontSize: 20,
              color: isDark ? '#cbd5e1' : '#64748b',
            }}
          />
        )}
      </Box>

      {/* Изображение с эффектом загрузки */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderBottom: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(59, 130, 246, 0.1)',
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={product.image}
          alt={product.name}
          className="product-image"
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Кнопка "В корзину" появляется при hover */}
        <Box
          className="add-to-cart-btn"
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            right: 12,
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <GlassButton
            variant="contained"
            size="small"
            fullWidth
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            sx={{
              py: 1.2,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
              
              '&:hover': {
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.5)',
              },
            }}
          >
            <AddShoppingCart sx={{ mr: 1, fontSize: 18 }} />
            В корзину
          </GlassButton>
        </Box>
      </Box>

      {/* Контент карточки */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          pt: 1.5,
        }}
      >
        {/* Категория */}
        <Chip
          label={product.category}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            background: isDark
              ? 'rgba(59, 130, 246, 0.15)'
              : 'rgba(59, 130, 246, 0.1)',
            color: '#3b82f6',
            border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
            fontWeight: 600,
            fontSize: '0.7rem',
            px: 1,
            mb: 1,
            transition: 'all 0.3s ease',
            
            '&:hover': {
              background: isDark
                ? 'rgba(59, 130, 246, 0.25)'
                : 'rgba(59, 130, 246, 0.15)',
            },
          }}
        />

        {/* Название */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isDark ? '#f8fafc' : '#1e293b',
            mb: 1,
            flexGrow: 1,
            fontSize: '1rem',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'color 0.3s ease',
            
            '&:hover': {
              color: '#3b82f6',
            },
          }}
        >
          {product.name}
        </Typography>

        {/* Рейтинг */}
        {product.rating && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1.5,
              gap: 0.5,
            }}
          >
            <Box sx={{ display: 'flex', color: '#fbbf24' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fontSize="small"
                  sx={{
                    fontSize: 14,
                    fill: i < Math.floor(product.rating!) ? '#fbbf24' : 'none',
                    stroke: '#fbbf24',
                    strokeWidth: i < Math.floor(product.rating!) ? 0 : 1.5,
                  }}
                />
              ))}
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            >
              {product.rating}
              {product.reviews && ` • ${product.reviews} отзывов`}
            </Typography>
          </Box>
        )}

        {/* Цена и кнопка (для мобильных) */}
        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {product.price.toLocaleString()} ₽
            </Typography>
            {product.oldPrice && (
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? '#64748b' : '#94a3b8',
                  textDecoration: 'line-through',
                  ml: 1,
                  fontWeight: 500,
                }}
              >
                {product.oldPrice.toLocaleString()} ₽
              </Typography>
            )}
          </Box>

          {/* Кнопка для мобильных - всегда видна */}
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <GlassButton
              variant="contained"
              size="small"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              sx={{
                minWidth: 'auto',
                p: 1.2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              }}
            >
              <AddShoppingCart fontSize="small" />
            </GlassButton>
          </Box>
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default ProductCard;
