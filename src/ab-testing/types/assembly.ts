/**
 * Types for "Сборка рабочего места" (Workplace Assembly) experiment
 * 
 * This experiment tests a step-by-step product selection flow
 * where users must select exactly one product from each predefined category.
 */

/** Category in the assembly sequence */
export interface AssemblyCategory {
  /** Unique category identifier */
  id: string;
  /** Display name */
  name: string;
  /** Order in the sequence (0-based) */
  stepOrder: number;
  /** Whether this category is required or can be skipped */
  required: boolean;
  /** Fallback category ID if this one is unavailable */
  fallbackCategoryId?: string;
}

/** Product with assembly-specific fields */
export interface AssemblyProduct {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryId: string;
  rating: number;
  description: string;
  /** Whether this product is currently in stock */
  inStock: boolean;
}

/** Step state in the assembly flow */
export interface AssemblyStep {
  stepIndex: number;
  categoryId: string;
  categoryName: string;
  products: AssemblyProduct[];
  selectedProductId: number | null;
  selectedAction: 'add_to_cart' | 'add_to_favorites' | null;
  completed: boolean;
  skipped: boolean;
}

/** Full assembly session state */
export interface AssemblySession {
  sessionId: string;
  userId: string | null;
  experimentVariant: 'A' | 'B'; // A = control (standard catalog), B = assembly flow
  currentStepIndex: number;
  steps: AssemblyStep[];
  status: 'in_progress' | 'completed' | 'abandoned';
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
  draftExpiresAt: string; // 24 hours from last update or order completion
}

/** Analytics events specific to assembly flow */
export type AssemblyEventType =
  | 'assembly_started'
  | 'assembly_step_viewed'
  | 'assembly_product_selected'
  | 'assembly_action_chosen' // add to cart or favorites
  | 'assembly_step_completed'
  | 'assembly_step_skipped'
  | 'assembly_back_clicked'
  | 'assembly_completed'
  | 'assembly_abandoned'
  | 'assembly_draft_saved'
  | 'assembly_draft_restored'
  | 'assembly_error';

/** Request to save draft */
export interface SaveDraftRequest {
  userId: string;
  step: number;
  categoryId: string;
  productId: number;
  action: 'add_to_cart' | 'add_to_favorites';
  sessionId: string;
}

/** Response from draft save */
export interface SaveDraftResponse {
  success: boolean;
  draftExpiresAt: string;
  message?: string;
}

/** Request to fetch category sequence */
export interface CategorySequenceRequest {
  userId: string;
  sessionId: string;
  variant: 'A' | 'B';
}

/** Response with category sequence */
export interface CategorySequenceResponse {
  categories: AssemblyCategory[];
  sessionId: string;
  draftExpiresAt: string;
}

/** Request to record product selection */
export interface RecordSelectionRequest {
  sessionId: string;
  stepIndex: number;
  categoryId: string;
  productId: number;
  action: 'add_to_cart' | 'add_to_favorites';
  timestamp: string;
}

/** Response from selection recording */
export interface RecordSelectionResponse {
  success: boolean;
  nextStepIndex: number | null;
  isComplete: boolean;
  message?: string;
}

/** Assembly experiment configuration */
export interface AssemblyExperimentConfig {
  experimentId: string;
  name: string;
  hypothesis: string;
  enabled: boolean;
  trafficSplit: number; // 0.5 = 50% to variant B
  categories: AssemblyCategory[];
  draftTTLHours: number; // 24 hours
  maxStepDropoffRate: number; // 0.15 = 15%
  targetCompletionTimeMinutes: number; // 2 minutes
  minSampleSizePerGroup: number; // 5000 sessions
  statisticalSignificancePValue: number; // 0.05
  statisticalPower: number; // 0.8 = 80%
}

/** Feature flag state for assembly experiment */
