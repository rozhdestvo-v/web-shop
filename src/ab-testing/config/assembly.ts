/**
 * Configuration for "Сборка рабочего места" (Workplace Assembly) A/B test
 * 
 * Defines the categories, experiment settings, and feature flags
 */

import { AssemblyExperimentConfig, AssemblyCategory } from '../types/assembly';
import { AssemblyFeatureFlag } from '../types/featureFlag';

// Default categories for workplace assembly experiment
// These should be customized based on actual product catalog
export const DEFAULT_ASSEMBLY_CATEGORIES: AssemblyCategory[] = [
  {
    id: 'desk',
    name: 'Стол',
    stepOrder: 0,
    required: true,
  },
  {
    id: 'chair',
    name: 'Стул',
    stepOrder: 1,
    required: true,
  },
  {
    id: 'monitor',
    name: 'Монитор',
    stepOrder: 2,
    required: true,
  },
  {
    id: 'keyboard',
    name: 'Клавиатура',
    stepOrder: 3,
    required: true,
  },
  {
    id: 'mouse',
    name: 'Мышь',
    stepOrder: 4,
    required: true,
  },
  {
    id: 'lamp',
    name: 'Настольная лампа',
    stepOrder: 5,
    required: false, // Optional category
    fallbackCategoryId: 'desk_accessories',
  },
  {
    id: 'desk_accessories',
    name: 'Аксессуары для стола',
    stepOrder: 6,
    required: false,
  },
];

// Assembly experiment configuration
export const ASSEMBLY_EXPERIMENT_CONFIG: AssemblyExperimentConfig = {
  experimentId: 'workplace-assembly-v1',
  name: 'Сборка рабочего места',
  hypothesis: 'Последовательный выбор ровно одного товара из каждой заранее определённой категории ускорит принятие решений и повысит вовлечённость пользователей',
  enabled: true,
  trafficSplit: 0.5, // 50% to variant B (assembly flow)
  categories: DEFAULT_ASSEMBLY_CATEGORIES,
  draftTTLHours: 24, // 24 hours session lifetime
  maxStepDropoffRate: 0.15, // 15% maximum drop-off per step
  targetCompletionTimeMinutes: 2, // Target: ≤2 minutes
  minSampleSizePerGroup: 5000, // Minimum 5000 sessions per group
  statisticalSignificancePValue: 0.05, // p-value < 0.05
  statisticalPower: 0.8, // Power ≥ 80%
};

// Feature flag for assembly experiment (can be toggled without deploy)
export const ASSEMBLY_FEATURE_FLAG: AssemblyFeatureFlag = {
  enabled: true,
  trafficSplit: 0.5,
  forceVariant: undefined, // undefined means use normal traffic split
  rollbackToControl: false, // Set to true for emergency rollback to 100% control
};
