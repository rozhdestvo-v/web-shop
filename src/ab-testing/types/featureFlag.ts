/**
 * Feature flag configuration for A/B testing experiments
 */
export interface AssemblyFeatureFlag {
  /** Whether the experiment is enabled */
  enabled: boolean;
  /** Traffic split between variants (0.0-1.0) */
  trafficSplit: number;
  /** Force assignment to specific variant for testing/admin purposes */
  forceVariant?: 'A' | 'B';
  /** Emergency rollback to control group */
  rollbackToControl: boolean;
}