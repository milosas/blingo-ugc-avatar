import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { GenerationConfig } from '../types/database';

interface SaveImageOptions {
  imageUrl: string;
  prompt: string;
  config: Record<string, any>;
}

interface SavedImage {
  id: string;
  publicUrl: string;
  storagePath: string;
}

export function useSupabaseStorage() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function saveGeneratedImage(
    options: SaveImageOptions
  ): Promise<SavedImage | null> {
    // Guest mode - silently skip storage (expected behavior)
    if (!user) {
      console.warn('Guest user - skipping storage');
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      // 1. Fetch image from provided URL (n8n returns image URL)
      const response = await fetch(options.imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();

      // 2. Generate unique storage path: user_id/timestamp-uuid.png
      const fileName = `${Date.now()}-${crypto.randomUUID()}.png`;
      const storagePath = `${user.id}/${fileName}`;

      // 3. Upload to Supabase Storage bucket
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('generated-images')
        .upload(storagePath, blob, {
          contentType: 'image/png',
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 4. Get public URL (works with private bucket + auth)
      const { data: { publicUrl } } = supabase
        .storage
        .from('generated-images')
        .getPublicUrl(storagePath);

      // 5. Insert metadata into generated_images table
      const { data: dbData, error: dbError } = await supabase
        .from('generated_images')
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          storage_path: storagePath,
          prompt: options.prompt,
          config: options.config as GenerationConfig
        })
        .select()
        .single();

      if (dbError) throw dbError;

      return {
        id: dbData.id,
        publicUrl,
        storagePath
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Storage upload failed';
      setError(errorMessage);
      console.error('Storage upload error:', err);
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(storagePath: string, imageId: string): Promise<void> {
    // Guest mode - nothing to delete
    if (!user) return;

    try {
      // Delete from storage bucket
      const { error: storageError } = await supabase
        .storage
        .from('generated-images')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('generated_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;
    } catch (err) {
      console.error('Delete error:', err);
      throw err;
    }
  }

  return {
    saveGeneratedImage,
    deleteImage,
    uploading,
    error
  };
}
