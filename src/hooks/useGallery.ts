import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { GeneratedImage } from '../types/database';

interface UseGalleryReturn {
  images: GeneratedImage[];
  loading: boolean;
  error: string | null;
  deleteImage: (imageId: string, storagePath: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useGallery(): UseGalleryReturn {
  const { user } = useAuth();
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    // Guest mode - return empty array (expected behavior)
    if (!user) {
      setImages([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('generated_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(0, 49); // First 50 images

      if (queryError) throw queryError;

      setImages(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch images';
      setError(errorMessage);
      console.error('Gallery fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteImage = useCallback(async (imageId: string, storagePath: string): Promise<void> => {
    // Guest mode - nothing to delete
    if (!user) return;

    try {
      // Delete from storage bucket first
      const { error: storageError } = await supabase
        .storage
        .from('generated-images')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Then delete from database
      const { error: dbError } = await supabase
        .from('generated_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      // Refresh gallery after successful delete
      await fetchImages();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete image';
      setError(errorMessage);
      console.error('Delete error:', err);
      throw err;
    }
  }, [user, fetchImages]);

  const refresh = useCallback(async (): Promise<void> => {
    await fetchImages();
  }, [fetchImages]);

  // Fetch images on mount and when user changes
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    images,
    loading,
    error,
    deleteImage,
    refresh
  };
}
