import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { AvatarModel, CustomAvatar } from '../types/database';

interface UseAvatarModelsReturn {
  models: AvatarModel[];
  loading: boolean;
  error: string | null;
  createModel: (name: string, firstPhoto?: File) => Promise<AvatarModel | null>;
  addPhotoToModel: (modelId: string, file: File) => Promise<CustomAvatar | null>;
  addGeneratedPhotoToModel: (modelId: string, base64Data: string, description: string) => Promise<CustomAvatar | null>;
  deleteModel: (modelId: string) => Promise<void>;
  deletePhoto: (photoId: string, storagePath: string, modelId: string) => Promise<void>;
  movePhoto: (photoId: string, fromModelId: string, toModelId: string) => Promise<void>;
  setCover: (modelId: string, photoId: string) => Promise<void>;
  renameModel: (modelId: string, name: string) => Promise<void>;
  refresh: () => Promise<void>;
}

async function ensureProfile(userId: string, email: string | undefined) {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: userId, email: email || null })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Profile creation failed: ${insertError.message}`);
    }
  }
}

async function uploadPhotoToStorage(userId: string, file: File | Blob, contentType: string) {
  const ext = contentType === 'image/jpeg' ? 'jpg' : 'png';
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const storagePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase
    .storage
    .from('custom-avatars')
    .upload(storagePath, file, {
      contentType,
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Storage upload failed: ${uploadError.message}`);
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase
    .storage
    .from('custom-avatars')
    .createSignedUrl(storagePath, 60 * 60 * 24 * 365);

  if (signedUrlError || !signedUrlData) {
    throw new Error(`Signed URL creation failed: ${signedUrlError?.message}`);
  }

  return { storagePath, imageUrl: signedUrlData.signedUrl };
}

export function useAvatarModels(): UseAvatarModelsReturn {
  const { user } = useAuth();
  const [models, setModels] = useState<AvatarModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Track whether avatar_models table exists (migration deployed)
  const legacyMode = useRef<boolean | null>(null); // null = not checked yet

  const fetchModels = useCallback(async () => {
    if (!user) {
      setModels([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if avatar_models table exists (only on first fetch)
      if (legacyMode.current === null) {
        const { error: probeError } = await supabase
          .from('avatar_models')
          .select('id')
          .limit(0);
        legacyMode.current = !!probeError;
        if (probeError) {
          console.warn('avatar_models table not available, using legacy mode');
        }
      }

      if (legacyMode.current) {
        // LEGACY MODE: avatar_models table doesn't exist
        // Show each custom_avatar as its own virtual "model"
        const { data: legacyAvatars, error: legacyError } = await supabase
          .from('custom_avatars')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (legacyError) throw legacyError;

        const virtualModels: AvatarModel[] = (legacyAvatars || []).map(avatar => ({
          id: avatar.id,
          user_id: avatar.user_id,
          name: avatar.description || 'Model',
          cover_photo_id: avatar.id,
          created_at: avatar.created_at,
          updated_at: avatar.updated_at,
          photos: [{
            ...avatar,
            model_id: avatar.id,
            display_order: 0,
          }],
        }));

        setModels(virtualModels);
        return;
      }

      // NORMAL MODE: avatar_models table exists
      const { data: modelsData, error: modelsError } = await supabase
        .from('avatar_models')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (modelsError) throw modelsError;

      // Fetch ALL user's photos
      const { data: allPhotos, error: photosError } = await supabase
        .from('custom_avatars')
        .select('*')
        .eq('user_id', user.id)
        .order('display_order', { ascending: true });

      if (photosError) throw photosError;

      const photos = allPhotos || [];

      // Separate linked vs orphaned
      const photosByModel = new Map<string, CustomAvatar[]>();
      const orphanedPhotos: CustomAvatar[] = [];

      for (const photo of photos) {
        if (photo.model_id) {
          const existing = photosByModel.get(photo.model_id) || [];
          existing.push(photo);
          photosByModel.set(photo.model_id, existing);
        } else {
          orphanedPhotos.push(photo);
        }
      }

      const enrichedModels: AvatarModel[] = (modelsData || []).map(m => ({
        ...m,
        photos: photosByModel.get(m.id) || [],
      }));

      // Auto-migrate orphaned avatars into individual models
      for (const orphan of orphanedPhotos) {
        try {
          const { data: newModel, error: createError } = await supabase
            .from('avatar_models')
            .insert({
              user_id: user.id,
              name: orphan.description || 'Model',
              cover_photo_id: orphan.id,
            })
            .select()
            .single();

          if (createError) {
            console.error('Auto-migrate failed:', createError);
            continue;
          }

          await supabase
            .from('custom_avatars')
            .update({ model_id: newModel.id, display_order: 0 })
            .eq('id', orphan.id);

          enrichedModels.push({
            ...newModel,
            photos: [{ ...orphan, model_id: newModel.id, display_order: 0 }],
          });
        } catch (migrateErr) {
          console.error('Auto-migrate failed for avatar:', orphan.id, migrateErr);
        }
      }

      setModels(enrichedModels);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch models';
      setError(msg);
      console.error('Model fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // --- LEGACY HELPERS ---
  // In legacy mode, "create model" = upload a photo to custom_avatars directly
  // "model id" = the avatar's own id

  const createModel = useCallback(async (name: string, firstPhoto?: File): Promise<AvatarModel | null> => {
    if (!user) throw new Error('Must be logged in');

    try {
      await ensureProfile(user.id, user.email);

      if (legacyMode.current) {
        // Legacy: just upload a photo (no avatar_models table)
        if (!firstPhoto) {
          // Can't create empty model in legacy mode — need at least a photo
          // Create a placeholder virtual model from state
          const virtualModel: AvatarModel = {
            id: crypto.randomUUID(),
            user_id: user.id,
            name,
            cover_photo_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            photos: [],
          };
          // In legacy mode without a photo, just refresh — nothing to persist
          await fetchModels();
          return virtualModel;
        }

        if (!['image/jpeg', 'image/png'].includes(firstPhoto.type)) {
          throw new Error('Only JPEG and PNG images are supported');
        }
        if (firstPhoto.size > 10 * 1024 * 1024) {
          throw new Error('File size must be less than 10MB');
        }

        const { storagePath, imageUrl } = await uploadPhotoToStorage(user.id, firstPhoto, firstPhoto.type);

        const { data: photo, error: photoError } = await supabase
          .from('custom_avatars')
          .insert({
            user_id: user.id,
            storage_path: storagePath,
            image_url: imageUrl,
            description: name,
            avatar_type: 'photo',
          })
          .select()
          .single();

        if (photoError) throw new Error(`Photo insert failed: ${photoError.message}`);

        await fetchModels();
        return {
          id: photo.id,
          user_id: user.id,
          name,
          cover_photo_id: photo.id,
          created_at: photo.created_at,
          updated_at: photo.updated_at,
          photos: [photo],
        };
      }

      // Normal mode: create avatar_models row
      const { data: model, error: modelError } = await supabase
        .from('avatar_models')
        .insert({ user_id: user.id, name })
        .select()
        .single();

      if (modelError) throw new Error(`Model creation failed: ${modelError.message}`);

      if (firstPhoto) {
        if (!['image/jpeg', 'image/png'].includes(firstPhoto.type)) {
          throw new Error('Only JPEG and PNG images are supported');
        }
        if (firstPhoto.size > 10 * 1024 * 1024) {
          throw new Error('File size must be less than 10MB');
        }

        const { storagePath, imageUrl } = await uploadPhotoToStorage(user.id, firstPhoto, firstPhoto.type);

        const { data: photo, error: photoError } = await supabase
          .from('custom_avatars')
          .insert({
            user_id: user.id,
            storage_path: storagePath,
            image_url: imageUrl,
            description: null,
            avatar_type: 'photo',
            model_id: model.id,
            display_order: 0,
          })
          .select()
          .single();

        if (photoError) throw new Error(`Photo insert failed: ${photoError.message}`);

        await supabase
          .from('avatar_models')
          .update({ cover_photo_id: photo.id })
          .eq('id', model.id);
      }

      await fetchModels();
      return model;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create model';
      setError(msg);
      throw err;
    }
  }, [user, fetchModels]);

  const addPhotoToModel = useCallback(async (modelId: string, file: File): Promise<CustomAvatar | null> => {
    if (!user) throw new Error('Must be logged in');

    try {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        throw new Error('Only JPEG and PNG images are supported');
      }
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      const { storagePath, imageUrl } = await uploadPhotoToStorage(user.id, file, file.type);

      const model = models.find(m => m.id === modelId);
      const nextOrder = (model?.photos?.length || 0);

      const insertData: Record<string, unknown> = {
        user_id: user.id,
        storage_path: storagePath,
        image_url: imageUrl,
        description: null,
        avatar_type: 'photo',
      };

      if (!legacyMode.current) {
        insertData.model_id = modelId;
        insertData.display_order = nextOrder;
      }

      const { data: photo, error: dbError } = await supabase
        .from('custom_avatars')
        .insert(insertData)
        .select()
        .single();

      if (dbError) throw new Error(`Photo insert failed: ${dbError.message}`);

      if (!legacyMode.current && nextOrder === 0) {
        await supabase
          .from('avatar_models')
          .update({ cover_photo_id: photo.id })
          .eq('id', modelId);
      }

      await fetchModels();
      return photo;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to add photo';
      setError(msg);
      throw err;
    }
  }, [user, models, fetchModels]);

  const addGeneratedPhotoToModel = useCallback(async (
    modelId: string,
    base64Data: string,
    description: string
  ): Promise<CustomAvatar | null> => {
    if (!user) throw new Error('Must be logged in');

    try {
      await ensureProfile(user.id, user.email);

      // Convert base64 to blob
      const base64String = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
      const mimeMatch = base64Data.match(/data:([^;]+);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      const byteCharacters = atob(base64String);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: mimeType });

      const { storagePath, imageUrl } = await uploadPhotoToStorage(user.id, blob, mimeType);

      const model = models.find(m => m.id === modelId);
      const nextOrder = (model?.photos?.length || 0);

      const insertData: Record<string, unknown> = {
        user_id: user.id,
        storage_path: storagePath,
        image_url: imageUrl,
        description,
        avatar_type: 'stylized',
      };

      if (!legacyMode.current) {
        insertData.model_id = modelId;
        insertData.display_order = nextOrder;
      }

      const { data: photo, error: dbError } = await supabase
        .from('custom_avatars')
        .insert(insertData)
        .select()
        .single();

      if (dbError) throw new Error(`Photo insert failed: ${dbError.message}`);

      if (!legacyMode.current && nextOrder === 0) {
        await supabase
          .from('avatar_models')
          .update({ cover_photo_id: photo.id })
          .eq('id', modelId);
      }

      await fetchModels();
      return photo;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save generated photo';
      setError(msg);
      throw err;
    }
  }, [user, models, fetchModels]);

  const deleteModel = useCallback(async (modelId: string): Promise<void> => {
    if (!user) return;

    try {
      const model = models.find(m => m.id === modelId);
      if (model?.photos) {
        const paths = model.photos.map(p => p.storage_path);
        if (paths.length > 0) {
          await supabase.storage.from('custom-avatars').remove(paths);
        }

        // Delete all photos from DB
        for (const photo of model.photos) {
          await supabase.from('custom_avatars').delete().eq('id', photo.id);
        }
      }

      if (!legacyMode.current) {
        await supabase.from('avatar_models').delete().eq('id', modelId);
      }

      await fetchModels();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete model';
      setError(msg);
      throw err;
    }
  }, [user, models, fetchModels]);

  const deletePhoto = useCallback(async (photoId: string, storagePath: string, modelId: string): Promise<void> => {
    if (!user) return;

    try {
      await supabase.storage.from('custom-avatars').remove([storagePath]);

      const { error: dbError } = await supabase
        .from('custom_avatars')
        .delete()
        .eq('id', photoId);

      if (dbError) throw dbError;

      if (!legacyMode.current) {
        const model = models.find(m => m.id === modelId);
        if (model?.cover_photo_id === photoId) {
          const remainingPhotos = model.photos?.filter(p => p.id !== photoId) || [];
          const newCoverId = remainingPhotos.length > 0 ? remainingPhotos[0].id : null;
          await supabase
            .from('avatar_models')
            .update({ cover_photo_id: newCoverId })
            .eq('id', modelId);
        }
      }

      await fetchModels();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete photo';
      setError(msg);
      throw err;
    }
  }, [user, models, fetchModels]);

  const movePhoto = useCallback(async (photoId: string, fromModelId: string, toModelId: string): Promise<void> => {
    if (!user || legacyMode.current) return;

    try {
      const targetModel = models.find(m => m.id === toModelId);
      const sourceModel = models.find(m => m.id === fromModelId);
      const nextOrder = (targetModel?.photos?.length || 0);

      // Move photo to target model
      const { error: dbError } = await supabase
        .from('custom_avatars')
        .update({ model_id: toModelId, display_order: nextOrder })
        .eq('id', photoId);

      if (dbError) throw dbError;

      // Update source model cover if moved photo was the cover
      if (sourceModel?.cover_photo_id === photoId) {
        const remaining = sourceModel.photos?.filter(p => p.id !== photoId) || [];
        await supabase
          .from('avatar_models')
          .update({ cover_photo_id: remaining.length > 0 ? remaining[0].id : null })
          .eq('id', fromModelId);
      }

      // Auto-set cover on target if it had none
      if (!targetModel?.cover_photo_id) {
        await supabase
          .from('avatar_models')
          .update({ cover_photo_id: photoId })
          .eq('id', toModelId);
      }

      // Auto-delete source model if now empty
      const sourcePhotosLeft = (sourceModel?.photos?.length || 1) - 1;
      if (sourcePhotosLeft <= 0) {
        await supabase.from('avatar_models').delete().eq('id', fromModelId);
      }

      await fetchModels();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to move photo';
      setError(msg);
      throw err;
    }
  }, [user, models, fetchModels]);

  const setCover = useCallback(async (modelId: string, photoId: string): Promise<void> => {
    if (!user || legacyMode.current) return;

    try {
      const { error: dbError } = await supabase
        .from('avatar_models')
        .update({ cover_photo_id: photoId })
        .eq('id', modelId);

      if (dbError) throw dbError;

      await fetchModels();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to set cover';
      setError(msg);
      throw err;
    }
  }, [user, fetchModels]);

  const renameModel = useCallback(async (modelId: string, name: string): Promise<void> => {
    if (!user) return;

    try {
      if (legacyMode.current) {
        // Legacy: update the avatar's description
        await supabase
          .from('custom_avatars')
          .update({ description: name })
          .eq('id', modelId);
      } else {
        const { error: dbError } = await supabase
          .from('avatar_models')
          .update({ name })
          .eq('id', modelId);

        if (dbError) throw dbError;
      }

      await fetchModels();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to rename model';
      setError(msg);
      throw err;
    }
  }, [user, fetchModels]);

  const refresh = useCallback(async (): Promise<void> => {
    await fetchModels();
  }, [fetchModels]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return {
    models,
    loading,
    error,
    createModel,
    addPhotoToModel,
    addGeneratedPhotoToModel,
    deleteModel,
    deletePhoto,
    movePhoto,
    setCover,
    renameModel,
    refresh,
  };
}
