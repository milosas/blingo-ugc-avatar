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
      console.warn('Guest user - skipping storage');
      throw new Error('User not authenticated');
    }

    setUploading(true);
    setError(null);

    console.log('saveGeneratedImage started:', { imageUrl: options.imageUrl.substring(0, 50) + '...' });

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

      // 1. Get image blob - prefer base64 (CORS-free) over URL fetch
      let blob: Blob;

      if (options.imageBase64) {
        // Use base64 data directly (from Edge Function) - no CORS issues
        console.log('Using base64 data from Edge Function...');
        const base64Response = await fetch(options.imageBase64);
        blob = await base64Response.blob();
        console.log('Base64 converted to blob, size:', blob.size);
      } else {
        // Fallback: fetch from URL (may fail due to CORS)
        console.log('Fetching image from URL...');
        const response = await fetch(options.imageUrl);
        if (!response.ok) {
          console.error('Failed to fetch image:', response.status, response.statusText);
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        blob = await response.blob();
        console.log('Image fetched, blob size:', blob.size);
      }

      // 2. Generate unique storage path: user_id/timestamp-uuid.png
      const fileName = `${Date.now()}-${crypto.randomUUID()}.png`;
      const storagePath = `${user.id}/${fileName}`;

      // 3. Upload to Supabase Storage bucket
      console.log('Uploading to Supabase storage...');
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
      console.log('Upload successful, path:', storagePath);

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
      console.log('Inserting into database...');
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
      console.log('Database insert successful, id:', dbData.id);

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
