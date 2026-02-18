-- Avatar Models: group multiple photos per model (up to 5 photos, 10 models per user)

BEGIN;

-- Ensure moddatetime extension is available
CREATE EXTENSION IF NOT EXISTS moddatetime WITH SCHEMA extensions;

-- ============================================================================
-- AVATAR_MODELS TABLE
-- ============================================================================
CREATE TABLE public.avatar_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cover_photo_id UUID,  -- references custom_avatars.id, set after photos exist
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.avatar_models ENABLE ROW LEVEL SECURITY;

-- Performance indexes
CREATE INDEX avatar_models_user_id_idx ON public.avatar_models(user_id, created_at DESC);

-- Auto-update updated_at
CREATE TRIGGER handle_avatar_models_updated_at BEFORE UPDATE ON public.avatar_models
  FOR EACH ROW EXECUTE PROCEDURE extensions.moddatetime(updated_at);

-- ============================================================================
-- RLS POLICIES - AVATAR_MODELS
-- ============================================================================
CREATE POLICY "Users can insert own models"
ON public.avatar_models FOR INSERT
TO authenticated
WITH CHECK ( (SELECT auth.uid()) = user_id );

CREATE POLICY "Users can view own models"
ON public.avatar_models FOR SELECT
TO authenticated
USING ( (SELECT auth.uid()) = user_id );

CREATE POLICY "Users can update own models"
ON public.avatar_models FOR UPDATE
TO authenticated
USING ( (SELECT auth.uid()) = user_id )
WITH CHECK ( (SELECT auth.uid()) = user_id );

CREATE POLICY "Users can delete own models"
ON public.avatar_models FOR DELETE
TO authenticated
USING ( (SELECT auth.uid()) = user_id );

-- ============================================================================
-- MODEL LIMIT TRIGGER (10 models per user)
-- ============================================================================
CREATE FUNCTION public.check_model_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF (SELECT count(*) FROM public.avatar_models WHERE user_id = NEW.user_id) >= 10 THEN
    RAISE EXCEPTION 'Model limit reached: maximum 10 models per user';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_model_limit
  BEFORE INSERT ON public.avatar_models
  FOR EACH ROW EXECUTE PROCEDURE public.check_model_limit();

-- ============================================================================
-- ADD model_id AND display_order TO custom_avatars
-- ============================================================================
ALTER TABLE public.custom_avatars
  ADD COLUMN model_id UUID REFERENCES public.avatar_models(id) ON DELETE CASCADE,
  ADD COLUMN display_order INT DEFAULT 0;

CREATE INDEX custom_avatars_model_id_idx ON public.custom_avatars(model_id, display_order);

-- ============================================================================
-- PHOTOS PER MODEL LIMIT (5 photos per model)
-- ============================================================================
CREATE FUNCTION public.check_photos_per_model()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.model_id IS NOT NULL AND
     (SELECT count(*) FROM public.custom_avatars WHERE model_id = NEW.model_id) >= 5 THEN
    RAISE EXCEPTION 'Photo limit reached: maximum 5 photos per model';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_photos_per_model
  BEFORE INSERT ON public.custom_avatars
  FOR EACH ROW EXECUTE PROCEDURE public.check_photos_per_model();

-- ============================================================================
-- REPLACE OLD AVATAR LIMIT TRIGGER
-- ============================================================================
DROP TRIGGER IF EXISTS enforce_avatar_limit ON public.custom_avatars;
DROP FUNCTION IF EXISTS public.check_avatar_limit();

-- ============================================================================
-- ADD FK for cover_photo_id (now that custom_avatars has model_id)
-- ============================================================================
ALTER TABLE public.avatar_models
  ADD CONSTRAINT avatar_models_cover_photo_fk
  FOREIGN KEY (cover_photo_id) REFERENCES public.custom_avatars(id) ON DELETE SET NULL;

-- ============================================================================
-- DATA MIGRATION: wrap each existing avatar into its own model
-- Temporarily disable the model limit trigger so users with >10 avatars
-- can still be migrated (each existing avatar becomes its own model).
-- ============================================================================
ALTER TABLE public.avatar_models DISABLE TRIGGER enforce_model_limit;

DO $$
DECLARE
  avatar_row RECORD;
  new_model_id UUID;
BEGIN
  FOR avatar_row IN
    SELECT id, user_id, description, created_at
    FROM public.custom_avatars
    WHERE model_id IS NULL
    ORDER BY created_at ASC
  LOOP
    -- Create a model for this avatar
    INSERT INTO public.avatar_models (user_id, name, created_at, updated_at)
    VALUES (
      avatar_row.user_id,
      COALESCE(avatar_row.description, 'Model'),
      avatar_row.created_at,
      now()
    )
    RETURNING id INTO new_model_id;

    -- Link avatar to model
    UPDATE public.custom_avatars
    SET model_id = new_model_id, display_order = 0
    WHERE id = avatar_row.id;

    -- Set as cover photo
    UPDATE public.avatar_models
    SET cover_photo_id = avatar_row.id
    WHERE id = new_model_id;
  END LOOP;
END;
$$;

-- Re-enable the model limit trigger after migration
ALTER TABLE public.avatar_models ENABLE TRIGGER enforce_model_limit;

COMMIT;
