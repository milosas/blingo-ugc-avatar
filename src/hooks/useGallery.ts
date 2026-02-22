import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { GeneratedImage, AvatarModel, CustomAvatar, GeneratedPost } from '../types/database';

interface UseGalleryReturn {
  images: GeneratedImage[];
  models: AvatarModel[];
  posts: GeneratedPost[];
  loading: boolean;
  error: string | null;
  deleteImage: (imageId: string, storagePath: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useGallery(): UseGalleryReturn {
  const { user } = useAuth();
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [models, setModels] = useState<AvatarModel[]>([]);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    // Guest mode - return empty arrays
    if (!user) {
      setImages([]);
      setModels([]);
      setPosts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch all three data types in parallel
      const [imagesResult, modelsResult, photosResult, postsResult] = await Promise.all([
        // Generated images (try-on photos)
        supabase
          .from('generated_images')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .range(0, 49),

        // Avatar models
        supabase
          .from('avatar_models')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),

        // All avatar photos (to attach to models)
        supabase
          .from('custom_avatars')
          .select('*')
          .eq('user_id', user.id)
          .order('display_order', { ascending: true }),

        // Generated posts
        supabase
          .from('generated_posts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .range(0, 49),
      ]);

      // --- Process generated images with signed URLs ---
      const imagesData = imagesResult.data || [];
      if (imagesResult.error) {
        console.error('Gallery images fetch error:', imagesResult.error);
      }

      let processedImages: GeneratedImage[] = [];
      if (imagesData.length > 0) {
        processedImages = await Promise.all(
          imagesData.map(async (img) => {
            const { data: signedUrlData, error: signedUrlError } = await supabase
              .storage
              .from('generated-images')
              .createSignedUrl(img.storage_path, 60 * 60); // 1 hour

            if (signedUrlError || !signedUrlData) {
              console.error('Failed to create signed URL for', img.storage_path, signedUrlError);
              return img;
            }

            return { ...img, image_url: signedUrlData.signedUrl };
          })
        );
      }
      setImages(processedImages);

      // --- Process avatar models with photos ---
      const modelsData = modelsResult.data || [];
      const photosData: CustomAvatar[] = photosResult.data || [];

      if (modelsResult.error && modelsResult.error.code !== 'PGRST116') {
        // avatar_models table might not exist; just log and skip
        console.warn('avatar_models fetch:', modelsResult.error.message);
      }

      // Group photos by model_id
      const photosByModel = new Map<string, CustomAvatar[]>();
      for (const photo of photosData) {
        if (photo.model_id) {
          const arr = photosByModel.get(photo.model_id) || [];
          arr.push(photo);
          photosByModel.set(photo.model_id, arr);
        }
      }

      const enrichedModels: AvatarModel[] = modelsData.map(m => ({
        ...m,
        photos: photosByModel.get(m.id) || [],
      }));

      setModels(enrichedModels);

      // --- Process posts ---
      if (postsResult.error) {
        console.error('Posts fetch error:', postsResult.error);
      }
      setPosts(postsResult.data || []);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch gallery';
      setError(errorMessage);
      console.error('Gallery fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteImage = useCallback(async (imageId: string, storagePath: string): Promise<void> => {
    if (!user) return;

    try {
      const { error: storageError } = await supabase
        .storage
        .from('generated-images')
        .remove([storagePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('generated_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      await fetchAll();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete image';
      setError(errorMessage);
      console.error('Delete error:', err);
      throw err;
    }
  }, [user, fetchAll]);

  const deletePost = useCallback(async (postId: string): Promise<void> => {
    if (!user) return;

    try {
      const { error: dbError } = await supabase
        .from('generated_posts')
        .delete()
        .eq('id', postId);

      if (dbError) throw dbError;

      await fetchAll();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      setError(errorMessage);
      console.error('Delete post error:', err);
      throw err;
    }
  }, [user, fetchAll]);

  const refresh = useCallback(async (): Promise<void> => {
    await fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    images,
    models,
    posts,
    loading,
    error,
    deleteImage,
    deletePost,
    refresh
  };
}
