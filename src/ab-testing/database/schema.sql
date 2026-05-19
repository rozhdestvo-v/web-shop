-- Database schema for Workplace Assembly A/B experiment
-- Table: user_assembly_drafts

-- Drop table if exists (for development)
DROP TABLE IF EXISTS user_assembly_drafts;

-- Create user_assembly_drafts table
CREATE TABLE user_assembly_drafts (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    step INTEGER NOT NULL CHECK (step >= 0),
    categoryId VARCHAR(100) NOT NULL,
    productId INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('add_to_cart', 'add_to_favorites')),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sessionId VARCHAR(255) NOT NULL,
    experimentVariant CHAR(1) NOT NULL CHECK (experimentVariant IN ('A', 'B')),
    -- Indexes for performance
    CONSTRAINT chk_action_valid CHECK (action IN ('add_to_cart', 'add_to_favorites')),
    CONSTRAINT chk_variant_valid CHECK (experimentVariant IN ('A', 'B'))
);

-- Indexes for common query patterns
CREATE INDEX idx_user_assembly_drafts_userId ON user_assembly_drafts(userId);
CREATE INDEX idx_user_assembly_drafts_sessionId ON user_assembly_drafts(sessionId);
CREATE INDEX idx_user_assembly_drafts_updatedAt ON user_assembly_drafts(updatedAt);
CREATE INDEX idx_user_assembly_drafts_userId_step ON user_assembly_drafts(userId, step);
CREATE INDEX idx_user_assembly_drafts_experimentVariant ON user_assembly_drafts(experimentVariant);

-- Optional: Add a composite index for fetching latest draft per user/session
CREATE INDEX idx_user_assembly_drafts_latest ON user_assembly_drafts(userId, sessionId, updatedAt DESC);

-- Comments for documentation
COMMENT ON TABLE user_assembly_drafts IS 'Stores draft progress for workplace assembly A/B experiment';
COMMENT ON COLUMN user_assembly_drafts.userId IS 'User identifier (authenticated user ID or anonymous session ID)';
COMMENT ON COLUMN user_assembly_drafts.step IS 'Current step index (0-based) in assembly flow';
COMMENT ON COLUMN user_assembly_drafts.categoryId IS 'Category identifier for current step';
COMMENT ON COLUMN user_assembly_drafts.productId IS 'Selected product ID for this step';
COMMENT ON COLUMN user_assembly_drafts.action IS 'Action taken: add_to_cart or add_to_favorites';
COMMENT ON COLUMN user_assembly_drafts.updatedAt IS 'Timestamp of last update (used for TTL)';
COMMENT ON COLUMN user_assembly_drafts.sessionId IS 'Session identifier for tracking user across devices';
COMMENT ON COLUMN user_assembly_drafts.experimentVariant IS 'Experiment variant: A (control) or B (assembly flow)';

-- Optional: Create a view for active drafts (within TTL)
CREATE OR REPLACE VIEW active_assembly_drafts AS
SELECT *
FROM user_assembly_drafts
WHERE updatedAt >= NOW() - INTERVAL '24 hours';
