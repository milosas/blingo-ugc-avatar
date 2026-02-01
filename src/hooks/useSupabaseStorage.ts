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
      // 0. Ensure profile exists (backfill for users created before migration)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        // Profile doesn't exist - create it (backfill)
        const { error: insertProfileError } = await supabase
          .from('profiles')
          .insert({ id: user.id, email: user.email })
          .select()
          .single();

        if (insertProfileError) {
          console.error('Failed to create profile:', insertProfileError);
          throw new Error(`Profile creation failed: ${insertProfileError.message}`);
        }
        console.log('Profile backfilled for user:', user.id);
      }

      // 1. Fetch image from provided URL (Edge Function returns image URL)
      const response = await fetch(options.imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();

      // 2. Generate unique storage path: user_id/timestamp-uuid.png
      const fileName = `${Date.now()}-${crypto.randomUUID()}.png`;
      const storagePath = `${user.id}/${fileName}`;

      // 3. Upload to Supabase Storage bucket
      const { error: uploadError } = await supabase
        .storage
        .from('generated-images')
        .upload(storagePath, blob, {
          contentType: 'image/png',
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      // 4. Get signed URL for private bucket (valid for 1 year)
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('generated-images')
        .createSignedUrl(storagePath, 60 * 60 * 24 * 365); // 1 year

      if (signedUrlError || !signedUrlData) {
        console.error('Failed to create signed URL:', signedUrlError);
        throw new Error(`Signed URL creation failed: ${signedUrlError?.message}`);
      }

      // 5. Insert metadata into generated_images table
      const { data: dbData, error: dbError } = await supabase
        .from('generated_images')
        .insert({
          user_id: user.id,
          image_url: signedUrlData.signedUrl,
          storage_path: storagePath,
          prompt: options.prompt,
          config: options.config as GenerationConfig
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      return {
        id: dbData.id,
        publicUrl: signedUrlData.signedUrl,
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
