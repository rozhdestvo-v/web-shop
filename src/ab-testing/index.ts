/**
 * A/B Testing Module — Barrel Export
 *
 * Единая точка входа для системы A/B тестирования.
 * Includes both "pain filter" experiment and "workplace assembly" experiment.
 */

// Types
export type {
  ABVariant,
  ABTestConfig,
  PainTag,
  ProductPainMapping,
  FeatureFlagState,
  AnalyticsEventType,
  AnalyticsEvent,
  ABTestMetrics,
  ABTestResults,
} from './types';

// Assembly experiment types
export type {
  // AssemblyDraft,  // This type doesn't exist, commenting out
  AssemblyCategory,
  AssemblyProduct,
  AssemblyStep,
  AssemblySession,
  AssemblyEventType,
  AssemblyExperimentConfig,
  SaveDraftRequest,
  SaveDraftResponse,
  CategorySequenceRequest,
  CategorySequenceResponse,
  RecordSelectionRequest,
  RecordSelectionResponse,
} from './types/assembly';

export type { AssemblyFeatureFlag as FeatureFlag } from './types/featureFlag';

// Config
export {
  PAIN_TAGS_META,
  PRODUCT_PAIN_MAP,
  getPainTagsForProduct,
  getAllPainTags,
  getProductIdsByPainTag,
} from './config/painTags';

export {
  DEFAULT_ASSEMBLY_CATEGORIES,
  ASSEMBLY_EXPERIMENT_CONFIG,
  ASSEMBLY_FEATURE_FLAG,
} from './config/assembly';

// Utils
export {
  ENABLE_PAIN_FILTER_AB,
  AB_TEST_CONFIG,
  assignVariant,
  getCurrentVariant,
  getSessionId,
  resetABTestAssignment,
  forceVariant,
  getFeatureFlagState,
} from './utils/abTest';

export {
  getAssemblyExperimentConfig,
  getAssemblyFeatureFlag,
  determineAssemblyVariant,
  isAssemblyVariant,
  isVariantC,
  loadAssemblyDraft,
  saveAssemblyDraft,
  clearAssemblyDraft,
} from './utils/assembly';

// Hooks
export { useABTest } from './hooks/useABTest';
export type { UseABTestReturn } from './hooks/useABTest';
export { useAnalytics } from './hooks/useAnalytics';
export type { UseAnalyticsOptions, AnalyticsConfig } from './hooks/useAnalytics';

// Components - Now including PainFilter
export { PainFilter } from './components/PainFilter';
export type { PainFilterProps } from './components/PainFilter';
export { AssemblyFlow } from './components/AssemblyFlow';