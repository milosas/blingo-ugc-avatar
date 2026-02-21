-- Add metadata columns for avatar description dropdowns
ALTER TABLE custom_avatars
  ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('male', 'female', 'other')),
  ADD COLUMN IF NOT EXISTS age_range text CHECK (age_range IN ('child', 'teen', 'young_adult', 'adult', 'senior')),
  ADD COLUMN IF NOT EXISTS hair_color text CHECK (hair_color IN ('black', 'brown', 'blonde', 'red', 'gray', 'white', 'other')),
  ADD COLUMN IF NOT EXISTS hair_length text CHECK (hair_length IN ('short', 'medium', 'long', 'bald'));

-- Update avatar_type constraint to remove 'pending' and default to 'photo'
-- First drop the old constraint, then add new one
ALTER TABLE custom_avatars DROP CONSTRAINT IF EXISTS custom_avatars_avatar_type_check;
ALTER TABLE custom_avatars ADD CONSTRAINT custom_avatars_avatar_type_check CHECK (avatar_type IN ('photo', 'stylized'));

-- Set all 'pending' avatars to 'photo'
UPDATE custom_avatars SET avatar_type = 'photo' WHERE avatar_type = 'pending';
