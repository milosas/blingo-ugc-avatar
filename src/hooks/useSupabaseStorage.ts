import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { GenerationConfig } from '../types/database';

interface SaveImageOptions {
  imageUrl: string;
  imageBase64?: string; // Base64 data URL from Edge Function (preferred for CORS-free handling)
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
  ): Promise<SavedImage> {
    // Guest mode - throw error (caller should check for user first)
    if (!user) {
      throw new Error('User not authenticated');
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
          throw new Error(`Profile creation failed: ${insertProfileError.message}`);
        }
      }

      // 1. Get image blob - prefer base64 (CORS-free) over URL fetch
      let blob: Blob;

      if (options.imageBase64) {
        // Use base64 data directly (from Edge Function) - no CORS issues
        const base64Response = await fetch(options.imageBase64);
        blob = await base64Response.blob();
      } else {
        // Fallback: fetch from URL (may fail due to CORS)
        const response = await fetch(options.imageUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        blob = await response.blob();
      }

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
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      // 4. Get signed URL for private bucket (valid for 1 year)
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('generated-images')
        .createSignedUrl(storagePath, 60 * 60 * 24 * 365); // 1 year

      if (signedUrlError || !signedUrlData) {
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
      // Throw so Promise.all can catch it
      throw err;
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
