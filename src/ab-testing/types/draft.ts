// Draft model for "Сборка рабочего места" experiment
// Represents a user's partially completed assembly saved locally or on server

export interface AssemblyDraft {
  /** User identifier (could be userId from auth or generated anonymous id) */
  userId: string;
  /** Current step index (0‑based) */
  step: number;
  /** Category identifier for the current step */
  categoryId: string;
  /** Selected product identifier for this step */
  productId: number;
  /** Action performed: 'add_to_cart' | 'add_to_favorites' */
  action: 'add_to_cart' | 'add_to_favorites';
  /** Timestamp of last update (ISO string) */
  updatedAt: string;
}
