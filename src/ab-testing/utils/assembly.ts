/**
 * Utility functions for the Workplace Assembly A/B experiment
 */
import { ASSEMBLY_EXPERIMENT_CONFIG, ASSEMBLY_FEATURE_FLAG } from '../config/assembly';
// Import from the correct file
import { AssemblyFeatureFlag } from '../types/featureFlag';
import { AssemblyExperimentConfig } from '../types/assembly';
import { assignVariant } from './abTest';
import { ABVariant } from '../types';

/** Get the current experiment configuration */
export function getAssemblyExperimentConfig(): AssemblyExperimentConfig {
  return ASSEMBLY_EXPERIMENT_CONFIG;
}

/** Get the current feature flag state (including possible forced variant or rollback) */
export function getAssemblyFeatureFlag(): AssemblyFeatureFlag {
  // Merge runtime flag with static config
  const base = ASSEMBLY_FEATURE_FLAG;
  // If rollback is forced, override to control variant only
  if (base.rollbackToControl) {
    return { ...base, enabled: true, trafficSplit: 0, forceVariant: 'A' };
  }
  return base;
}

/** Determine the variant for a given session, respecting feature flag overrides */
export function determineAssemblyVariant(): ABVariant {
  const flag = getAssemblyFeatureFlag();
  if (!flag.enabled) return 'A';
  if (flag.forceVariant) return flag.forceVariant;
  // Use generic assignVariant which respects trafficSplit
  return assignVariant();
}

/** Helper to check if the current user is in the assembly flow (variant B or C) */
export function isAssemblyVariant(): boolean {
  const variant = determineAssemblyVariant();
  return variant === 'B' || variant === 'C';
}

/** Helper to check specifically for variant C */
export function isVariantC(): boolean {
  return determineAssemblyVariant() === 'C';
}

/** Retrieve draft from localStorage (if any) */
export function loadAssemblyDraft(): any {
  try {
    const raw = localStorage.getItem('assembly_draft');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Save draft to localStorage */
export function saveAssemblyDraft(draft: any): void {
  try {
    localStorage.setItem('assembly_draft', JSON.stringify(draft));
  } catch {
    // ignore storage errors
  }
}

/** Clear draft from storage */
export function clearAssemblyDraft(): void {
  try {
    localStorage.removeItem('assembly_draft');
  } catch {}
}