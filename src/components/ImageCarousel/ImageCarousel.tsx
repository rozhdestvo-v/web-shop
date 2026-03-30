import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  height?: number;
  onImageChange?: (index: number) => void;
  currentIndex?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt,
  height = 220,
  onImageChange,
  currentIndex: propCurrentIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isControlled = propCurrentIndex !== undefined;

  // Используем внешнее значение, если передано 
  const effectiveIndex = isControlled && propCurrentIndex !== undefined 
    ? propCurrentIndex 
    : currentIndex;

  // Синхронизация с внешним currentIndex
  useEffect(() => {
    if (isControlled && propCurrentIndex !== undefined && propCurrentIndex !== currentIndex) {
      setCurrentIndex(propCurrentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propCurrentIndex, isControlled]);

  // Обновляем позицию при изменении currentIndex
  useEffect(() => {
    if (!isDragging && containerRef.current) {
      containerRef.current.style.transition = 'transform 0.3s ease-out';
      containerRef.current.style.transform = `translateX(-${effectiveIndex * 100}%)`;
    }
  }, [effectiveIndex, isDragging]);

  // Уведомляем родителя об изменении изображения (только в неконтролируемом режиме)
  useEffect(() => {
    if (!isControlled) {
      onImageChange?.(currentIndex);
    }
  }, [currentIndex, onImageChange, isControlled]);

  // Обработка перехода к следующему/предыдущему изображению
  const goNext = () => {
    const nextIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    onImageChange?.(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    onImageChange?.(prevIndex);
  };

  // Mouse/Touch события для свайпов
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const diff = clientX - startX;
    setTranslateX(diff);
    const baseTranslate = -effectiveIndex * 100;
    const percentageDiff = (diff / containerRef.current.offsetWidth) * 100;
    containerRef.current.style.transform = `translateX(${baseTranslate + percentageDiff}%)`;
  };

  const handleEnd = () => {
    if (!isDragging || !containerRef.current) return;
    setIsDragging(false);
    
    const containerWidth = containerRef.current.offsetWidth;
    const swipeThreshold = containerWidth * 0.3; // 30% от ширины экрана
    
    // Если свайп прошел больше 30% экрана
    if (translateX > swipeThreshold) {
      goPrev();
    } else if (translateX < -swipeThreshold) {
      goNext();
    }
    // Иначе возвращаемся к исходному изображению
    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();
  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  // Если изображений нет или только одно
  if (images.length <= 1) {
    return (
      <Box
        component="img"
        src={images[0] || ''}
        alt={alt}
        sx={{
          width: '100%',
          height,
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <Box
      className="image-carousel-container"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height,
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
        userSelect: 'none',
        '&:hover .carousel-nav': {
          opacity: 1,
        },
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Контейнер с изображениями */}
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          height: '100%',
          transform: `translateX(-${effectiveIndex * 100}%)`,
          willChange: 'transform',
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`${alt} - ${index + 1}`}
            sx={{
              minWidth: '100%',
              height: '100%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
            draggable={false}
          />
        ))}
      </Box>

      {/* Кнопки навигации */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          width: 36,
          height: 36,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.7)',
            opacity: 1,
          },
        }}
        className="carousel-nav"
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          width: 36,
          height: 36,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.7)',
            opacity: 1,
          },
        }}
        className="carousel-nav"
      >
        <ChevronRight />
      </IconButton>

      {/* Индикаторы */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          p: 1,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
          zIndex: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
              onImageChange?.(index);
            }}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: index === effectiveIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.8)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
