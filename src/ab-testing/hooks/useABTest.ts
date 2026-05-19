/**
 * useABTest Hook
 * 
 * React-хук для использования A/B теста в компонентах.
 * Возвращает текущий вариант, состояние и утилиты.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ABVariant, PainTag } from '../types';
import {
  assignVariant,
  getSessionId,
  AB_TEST_CONFIG,
  ENABLE_PAIN_FILTER_AB,
  resetABTestAssignment,
  forceVariant,
} from '../utils/abTest';
import { getPainTagsForProduct, PRODUCT_PAIN_MAP } from '../config/painTags';

export interface UseABTestReturn {
  /** Текущий вариант теста (A, B или C) */
  variant: ABVariant;
  /** Является ли текущий вариант Variant B (pain filter) */
  isVariantB: boolean;
  /** Является ли текущий вариант Variant C (assembly flow) */
  isVariantC: boolean;
  /** Включён ли A/B тест */
  isEnabled: boolean;
  /** ID эксперимента */
  experimentId: string;
  /** ID сессии */
  sessionId: string;
  /** Выбранные теги болей (state) */
  selectedPainTags: PainTag[];
  /** Установка выбранных тегов */
  setSelectedPainTags: (tags: PainTag[]) => void;
  /** Утилита: получить теги боли для товара */
  getProductPainTags: (productId: number) => PainTag[];
  /** Утилита: получить ID товаров по тегу боли */
  getProductIdsByTag: (tag: PainTag) => number[];
  /** Утилита: отфильтровать товары по выбранным тегам */
  filterProductsByPainTags: (productIds: number[]) => number[];
  /** Утилита: сбросить назначение варианта (для тестирования) */
  resetAssignment: () => void;
  /** Утилита: принудительно установить вариант */
  forceVariant: (variant: ABVariant) => void;
}

/**
 * Хук для использования A/B теста.
 * 
 * Пример:
 * ```tsx
 * const ab = useABTest();
 * 
 * if (ab.isVariantB) {
 *   // Показываем фильтр по болям
 *   return <PainFilter onChange={ab.setSelectedPainTags} value={ab.selectedPainTags} />;
 * }
 * 
 * if (ab.isVariantC) {
 *   // Показываем сборку сетапа
 *   return <AssemblyFlow />;
 * }
 * 
 * // Иначе — стандартный фильтр по категориям (Variant A)
 * ```
 */
export function useABTest(): UseABTestReturn {
  const [variant, setVariant] = useState<ABVariant>('A');
  const [selectedPainTags, setSelectedPainTags] = useState<PainTag[]>([]);

  useEffect(() => {
    // Назначаем вариант при монтировании
    const assigned = assignVariant();
    setVariant(assigned);
  }, []);

  const filterProductsByPainTags = useCallback(
    (productIds: number[]): number[] => {
      if (selectedPainTags.length === 0) {
        return productIds; // Нет фильтров — возвращаем все
      }

      // Товар должен иметь ХОТЯ БЫ ОДИН из выбранных тегов (OR-логика)
      return productIds.filter((id) => {
        const productTags = getPainTagsForProduct(id);
        return selectedPainTags.some((tag) => productTags.includes(tag));
      });
    },
    [selectedPainTags]
  );

  const getProductPainTags = useCallback((productId: number): PainTag[] => {
    return getPainTagsForProduct(productId);
  }, []);

  const getProductIdsByTag = useCallback((tag: PainTag): number[] => {
    const result: number[] = [];
    Object.entries(PRODUCT_PAIN_MAP).forEach(([productId, { painTags }]) => {
      if (painTags.includes(tag)) {
        result.push(Number(productId));
      }
    });
    return result;
  }, []);

  return useMemo(
    () => ({
      variant,
      isVariantB: variant === 'B',
      isVariantC: variant === 'C',
      isEnabled: ENABLE_PAIN_FILTER_AB && AB_TEST_CONFIG.enabled,
      experimentId: AB_TEST_CONFIG.experimentId,
      sessionId: getSessionId(),
      selectedPainTags,
      setSelectedPainTags,
      getProductPainTags,
      getProductIdsByTag,
      filterProductsByPainTags,
      resetAssignment: resetABTestAssignment,
      forceVariant: forceVariant,
    }),
    [
      variant,
      selectedPainTags,
      getProductPainTags,
      getProductIdsByTag,
      filterProductsByPainTags,
    ]
  );
}