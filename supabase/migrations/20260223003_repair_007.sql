-- Repair migration 007: fix avatar_type constraint
-- 007 partially applied: columns added but constraint failed due to existing data

-- Add columns if they don't exist (idempotent)
ALTER TABLE custom_avatars
  ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('male', 'female', 'other')),
  ADD COLUMN IF NOT EXISTS age_range text CHECK (age_range IN ('child', 'teen', 'young_adult', 'adult', 'senior')),
  ADD COLUMN IF NOT EXISTS hair_color text CHECK (hair_color IN ('black', 'brown', 'blonde', 'red', 'gray', 'white', 'other')),
  ADD COLUMN IF NOT EXISTS hair_length text CHECK (hair_length IN ('short', 'medium', 'long', 'bald'));

-- Fix data first
UPDATE custom_avatars SET avatar_type = 'photo' WHERE avatar_type NOT IN ('photo', 'stylized');

-- Drop old constraint if exists, add new one
ALTER TABLE custom_avatars DROP CONSTRAINT IF EXISTS custom_avatars_avatar_type_check;
ALTER TABLE custom_avatars ADD CONSTRAINT custom_avatars_avatar_type_check CHECK (avatar_type IN ('photo', 'stylized'));
