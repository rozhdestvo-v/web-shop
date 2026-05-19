import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Collapse,
  Alert,
} from '@mui/material';
import { Favorite, Share, ArrowBack, SkipNext } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import { ProductCard } from '../../components';
import { useAnalytics } from '../hooks';
import { useABTest } from '../hooks';
import { AssemblyCategory, AssemblyProduct } from '../types';

interface ExtendedAssemblyCategory extends AssemblyCategory {
  products: AssemblyProduct[]; // Adding products property to the category
}

interface AssemblyFlowProps {
  categories: ExtendedAssemblyCategory[];
  onNextStep: () => void;
  onBackStep: () => void;
  onSkipStep: () => void;
  onSaveDraft: (draft: Partial<any>) => void; // Changed from AssemblySession to any temporarily
  onLoadDraft: (sessionId: string) => void;
}

export const AssemblyFlow: React.FC<AssemblyFlowProps> = ({ categories, onNextStep, onBackStep, onSkipStep, onSaveDraft, onLoadDraft }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Renamed variables to avoid conflicts
  const { variant: currentTestVariant } = useABTest();
  const analytics = useAnalytics();
  const { mode } = useTheme();
  const isDarkMode = mode === 'dark';

  // Labels for each step
  const stepLabels: Record<string, string> = {};
  categories.forEach(category => {
    stepLabels[category.id] = category.name;
  });

  // Handle selection of an item
  const handleSelectItem = (categoryId: string, product: AssemblyProduct) => {
    // Track the selection
    analytics.track('assembly_product_selected', { 
      variant: currentTestVariant,
      properties: { 
        step: categoryId, 
        productId: product.id
      } 
    });

    // Move to next step
    const currentIndex = categories.findIndex(cat => cat.id === categoryId);
    if (currentIndex < categories.length - 1) {
      const nextStep = categories[currentIndex + 1];
      setCurrentStep(currentIndex + 1);
      
      // Track progress
      analytics.track('assembly_step_viewed', { 
        variant: currentTestVariant,
        properties: { 
          step: nextStep.id, 
          progress: ((currentIndex + 1) / categories.length) * 100 
        } 
      });
    } else {
      // Completed all steps
      analytics.track('assembly_flow_start', { 
        variant: currentTestVariant,
        properties: { 
          totalSteps: categories.length
        } 
      });
    }
  };

  // Handle sharing the setup
  const handleShareSetup = () => {
    analytics.track('assembly_share_clicked', {
      variant: currentTestVariant,
      properties: { 
        step: currentStep,
        shareMethod: 'clipboard'
      }
    });
    
    // Copy link to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Ссылка на ваш сетап скопирована!');
  };

  // Handle adding all to wishlist
  const handleAddAllToWishlist = () => {
    analytics.track('add_to_cart', { 
      variant: currentTestVariant,
      properties: { 
        action: 'addAllToWishlist',
        step: currentStep
      } 
    });
    
    // Scroll to wishlist section or notify user
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(prev => prev + 1);
      analytics.track('assembly_step_viewed', {
        variant: currentTestVariant,
        properties: {
          step: categories[currentStep + 1].id,
          progress: ((currentStep + 1) / categories.length) * 100
        }
      });
    }
  };

  // Navigate to previous step
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      analytics.track('assembly_step_viewed', {
        variant: currentTestVariant,
        properties: {
          step: categories[currentStep - 1].id,
          progress: ((currentStep - 1) / categories.length) * 100
        }
      });
    }
  };

  // Skip current step
  const handleSkipStep = () => {
    onSkipStep();
    analytics.track('assembly_step_viewed', {
      variant: currentTestVariant,
      properties: {
        step: categories[currentStep].id,
        action: 'skipped'
      }
    });
  };

  // Render UI
  return (
    <Box sx={{ 
      p: 3, 
      maxWidth: '1200px', 
      mx: 'auto',
      backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
      borderRadius: '16px',
      boxShadow: isDarkMode ? '0 10px 50px rgba(0,0,0,0.5)' : '0 10px 50px rgba(0,0,0,0.1)'
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 3, 
          fontWeight: 700, 
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Собрать сетап
      </Typography>

      {/* Progress indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1,
                position: 'relative',
                ...(index < categories.length - 1 && {
                  '&:after': {
                    content: '" "',
                    position: 'absolute',
                    top: '20px',
                    left: '100%',
                    width: '100%',
                    height: '4px',
                    backgroundColor: index < currentStep ? '#3b82f6' : isDarkMode ? '#334155' : '#cbd5e1',
                    zIndex: 0
                  }
                })
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: index <= currentStep ? '#3b82f6' : isDarkMode ? '#334155' : '#cbd5e1',
                  color: 'white',
                  fontWeight: 'bold',
                  zIndex: 1,
                  mr: 1
                }}
              >
                {index + 1}
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 1, 
                  fontWeight: index <= currentStep ? 600 : 400,
                  color: index <= currentStep ? (isDarkMode ? '#f1f5f9' : '#1e293b') : (isDarkMode ? '#64748b' : '#94a3b8'),
                  textAlign: 'center',
                  maxWidth: '100px'
                }}
              >
                {category.name}
              </Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>

      {/* Current step description */}
      <Typography variant="h6" sx={{ mb: 2, color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
        {currentStep < categories.length ? categories[currentStep].name : 'Завершено'}
      </Typography>
      
      {currentStep < categories.length && (
        <Typography variant="body1" sx={{ mb: 3, color: isDarkMode ? '#cbd5e1' : '#475569' }}>
          {categories[currentStep].required 
            ? 'Выберите один товар для продолжения' 
            : 'Вы можете пропустить этот шаг'}
        </Typography>
      )}

      {/* Products grid */}
      {currentStep < categories.length && categories[currentStep]?.products.length > 0 ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, mb: 4 }}>
          {categories[currentStep].products.map((product) => (
            <Box key={product.id} sx={{ minWidth: 0 }}>
              <ProductCard 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  oldPrice: product.oldPrice,
                  image: product.image,
                  category: product.category,
                  rating: product.rating,
                  description: product.description,
                  inStock: product.inStock
                }}
                index={0} // Placeholder; remove if not needed
                onAddToCart={() => handleSelectItem(categories[currentStep].id, product)}
                // onAddToFavorites={() => {
                //   const favoriteProduct = {
                //     id: product.id,
                //     name: product.name,
                //     price: product.price,
                //     image: product.image,
                //     rating: product.rating,
                //     description: product.description,
                //     category: product.category,
                //     inStock: product.inStock
                //   };
                //   addToFavorites(favoriteProduct);
                // }}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Alert severity="info">Товары для этой категории временно отсутствуют</Alert>
      )}

      {/* Navigation buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={goToPrevStep}
          disabled={currentStep === 0}
          sx={{
            borderColor: isDarkMode ? '#475569' : '#cbd5e1',
            color: isDarkMode ? '#e2e8f0' : '#334155',
            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed'
            }
          }}
        >
          Назад
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {!categories[currentStep]?.required && (
            <Button
              variant="outlined"
              startIcon={<SkipNext />}
              onClick={handleSkipStep}
              sx={{
                borderColor: isDarkMode ? '#475569' : '#cbd5e1',
                color: isDarkMode ? '#e2e8f0' : '#334155'
              }}
            >
              Пропустить
            </Button>
          )}

          <Button
            variant="contained"
            onClick={goToNextStep}
            disabled={currentStep === categories.length - 1}
            sx={{
              bgcolor: '#f59e0b',
              '&:hover': {
                bgcolor: '#d97706',
              },
              '&:disabled': {
                bgcolor: isDarkMode ? '#475569' : '#cbd5e1',
                color: isDarkMode ? '#94a3b8' : '#64748b'
              }
            }}
          >
            Далее
          </Button>
        </Box>
      </Box>

      {/* Completion screen */}
      {currentStep === categories.length && (
        <Collapse in={currentStep === categories.length}>
          <Box sx={{ 
            p: 3, 
            textAlign: 'center', 
            border: '2px dashed #3b82f6',
            borderRadius: '12px',
            backgroundColor: isDarkMode ? '#0f172a' : '#eff6ff',
            mb: 3
          }}>
            <Typography variant="h5" sx={{ color: '#3b82f6', mb: 2 }}>
              Поздравляем! Вы собрали свой сетап
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: isDarkMode ? '#cbd5e1' : '#475569' }}>
              Теперь вы можете поделиться им или добавить все товары в избранное
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Share />}
                onClick={handleShareSetup}
                sx={{
                  bgcolor: '#3b82f6',
                  '&:hover': {
                    bgcolor: '#2563eb',
                  }
                }}
              >
                Поделиться сетапом
              </Button>
              
              <Button
                variant="contained"
                startIcon={<Favorite />}
                sx={{
                  bgcolor: '#3b82f6',
                  '&:hover': {
                    bgcolor: '#2563eb',
                  }
                }}
                onClick={handleAddAllToWishlist}
              >
                Перейти к вишлисту
              </Button>
            </Box>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default AssemblyFlow;