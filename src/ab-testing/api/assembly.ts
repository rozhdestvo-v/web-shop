/**
 * REST API endpoints for Workplace Assembly A/B experiment
 * 
 * These endpoints are designed to be consumed by the frontend application
 * for fetching category sequences, recording user selections, and managing drafts.
 */

import { Request, Response } from 'express';
import { ASSEMBLY_EXPERIMENT_CONFIG } from '../config/assembly';
import { getAssemblyExperimentConfig } from '../utils/assembly';
import { saveAssemblyDraft, loadAssemblyDraft, clearAssemblyDraft } from '../utils/assembly';
import { isAssemblyVariant } from '../utils/assembly';
import { AssemblyCategory } from '../types/assembly';

/**
 * Get the category sequence for the current user/session
 * 
 * Used to determine which categories to display in each step of the assembly flow.
 * 
 * @param req.query.userId - User identifier
 * @param req.query.sessionId - Session identifier
 * @param req.query.variant - Experiment variant ('A' or 'B')
 * @returns Category sequence with metadata
 */
export async function getCategorySequence(req: Request, res: Response) {
  try {
    const { userId, sessionId, variant } = req.query;
    
    if (!userId || !sessionId || !variant) {
      return res.status(400).json({
        error: 'Missing required parameters: userId, sessionId, variant'
      });
    }
    
    // Check if user is assigned to variant B (assembly flow)
    const isVariantB = variant === 'B' && isAssemblyVariant();
    
    // In variant A, we might return standard catalog data
    // In variant B, we return the assembly category sequence
    const config = getAssemblyExperimentConfig();
    
    // For now, return the configured categories (could be customized per variant)
    const categories = config.categories.map((category: AssemblyCategory) => ({
      ...category,
      // Add any variant-specific modifications here
      isVisible: true,
      priority: category.required ? 1 : 2
    }));
    
    res.json({
      success: true,
      categories,
      variant: variant as 'A' | 'B',
      isAssemblyFlow: isVariantB,
      draftTTLHours: config.draftTTLHours,
      targetCompletionTimeMinutes: config.targetCompletionTimeMinutes
    });
    
  } catch (error) {
    console.error('Error in getCategorySequence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Record product selection and advance to next step
 * 
 * Called when user selects a product and performs an action (add to cart or favorites)
 * 
 * @param req.body.sessionId - Session identifier
 * @param req.body.stepIndex - Current step index
 * @param req.body.categoryId - Category identifier
 * @param req.body.productId - Selected product identifier
 * @param req.body.action - Action taken ('add_to_cart' | 'add_to_favorites')
 * @param req.body.timestamp - ISO timestamp
 * @returns Next step information and completion status
 */
export async function recordSelection(req: Request, res: Response) {
  try {
    const { sessionId, stepIndex, categoryId, productId, action, timestamp } = req.body;
    
    if (!sessionId || stepIndex == null || !categoryId || !productId || !action) {
      return res.status(400).json({
        error: 'Missing required fields: sessionId, stepIndex, categoryId, productId, action'
      });
    }
    
    // Validate action
    if (!['add_to_cart', 'add_to_favorites'].includes(action)) {
      return res.status(400).json({
        error: 'Invalid action. Must be "add_to_cart" or "add_to_favorites"'
      });
    }
    
    // TODO: Save to database (user_assembly_drafts table)
    // TODO: Update session state
    
    // For now, simulate response
    const config = getAssemblyExperimentConfig();
    
    // Determine next step
    const nextStepIndex = stepIndex + 1;
    const isComplete = nextStepIndex >= config.categories.length;
    
    res.json({
      success: true,
      nextStepIndex,
      isComplete,
      message: isComplete 
        ? 'Assembly completed successfully' 
        : 'Step recorded successfully'
    });
    
  } catch (error) {
    console.error('Error in recordSelection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Save current draft state
 * 
 * Persists the current assembly state for later restoration
 * 
 * @param req.body.userId - User identifier
 * @param req.body.sessionId - Session identifier
 * @param req.body.step - Current step index
 * @param req.body.categoryId - Current category identifier
 * @param req.body.productId - Selected product identifier
 * @param req.body.action - Action taken ('add_to_cart' | 'add_to_favorites')
 * @returns Confirmation of save with expiration timestamp
 */
export async function saveDraft(req: Request, res: Response) {
  try {
    const { userId, sessionId, step, categoryId, productId, action } = req.body;
    
    if (!userId || !sessionId || step == null || !categoryId || !productId || !action) {
      return res.status(400).json({
        error: 'Missing required fields: userId, sessionId, step, categoryId, productId, action'
      });
    }
    
    // Create draft object
    const draft = {
      userId,
      sessionId,
      step,
      categoryId,
      productId,
      action,
      updatedAt: new Date().toISOString()
    };
    
    // Save to local storage (client-side) and optionally to server
    saveAssemblyDraft(draft);
    
    // Calculate expiration (24 hours from now)
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    res.json({
      success: true,
      draftSaved: true,
      draftExpiresAt: expiration,
      message: 'Draft saved successfully'
    });
    
  } catch (error) {
    console.error('Error in saveDraft:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Load saved draft state
 * 
 * @param req.query.sessionId - Session identifier
 * @returns Draft data if found and not expired, null otherwise
 */
export async function loadDraft(req: Request, res: Response) {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId parameter' });
    }
    
    const draft = loadAssemblyDraft();
    
    if (!draft) {
      return res.json({ 
        exists: false,
        draft: null 
      });
    }
    
    // Check expiration
    const draftExpiration = new Date(draft.updatedAt);
    const now = new Date();
    
    if (draftExpiration > now) {
      res.json({ 
        exists: true,
        draft 
      });
    } else {
      // Expired, clear it
      clearAssemblyDraft();
      res.json({ 
        exists: false,
        draft: null,
        message: 'Draft expired'
      });
    }
    
  } catch (error) {
    console.error('Error in loadDraft:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Clear saved draft state
 * 
 * @param req.query.sessionId - Session identifier
 * @returns Confirmation of clear operation
 */
export async function clearDraft(req: Request, res: Response) {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId parameter' });
    }
    
    clearAssemblyDraft();
    
    res.json({ 
      success: true,
      message: 'Draft cleared successfully' 
    });
    
  } catch (error) {
    console.error('Error in clearDraft:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get experiment configuration for frontend
 * 
 * Returns detailed configuration including categories, flags, and experiment settings
 * 
 * @param req.query.variant - Experiment variant ('A' or 'B')
 * @returns Full experiment configuration
 */
export async function getExperimentConfig(req: Request, res: Response) {
  try {
    const { variant } = req.query;
    
    const config = getAssemblyExperimentConfig();
    
    res.json({
      success: true,
      config: {
        ...config,
        variant: variant as 'A' | 'B',
        isAssemblyFlow: variant === 'B' && isAssemblyVariant()
      }
    });
    
  } catch (error) {
    console.error('Error in getExperimentConfig:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
