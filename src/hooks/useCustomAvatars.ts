import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { CustomAvatar } from '../types/database';

interface UseCustomAvatarsReturn {
  avatars: CustomAvatar[];
  loading: boolean;
  error: string | null;
  createAvatar: (file: File) => Promise<CustomAvatar | null>;
  saveGeneratedAvatar: (base64Data: string, description: string) => Promise<CustomAvatar | null>;
  deleteAvatar: (avatarId: string, storagePath: string) => Promise<void>;
  updateDescription: (avatarId: string, description: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useCustomAvatars(): UseCustomAvatarsReturn {
  const { user } = useAuth();
  const [avatars, setAvatars] = useState<CustomAvatar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvatars = useCallback(async () => {
    // Guest mode - return empty array (expected behavior)
    if (!user) {
      setAvatars([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('custom_avatars')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;

      setAvatars(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch avatars';
      setError(errorMessage);
      console.error('Avatar fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createAvatar = useCallback(async (file: File): Promise<CustomAvatar | null> => {
    // Guest mode - cannot create avatars
    if (!user) {
      throw new Error('Must be logged in to upload avatars');
    }

    try {
      // Ensure profile exists (backfill for users created before migration)
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

      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        throw new Error('Only JPEG and PNG images are supported');
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error('File size must be less than 10MB');
      }

      // Get file extension
      const ext = file.type === 'image/jpeg' ? 'jpg' : 'png';

      // Generate storage path: user_id/timestamp-uuid.ext
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const storagePath = `${user.id}/${fileName}`;

      // Upload to custom-avatars bucket
      const { error: uploadError } = await supabase
        .storage
        .from('custom-avatars')
        .upload(storagePath, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      // Create signed URL (valid for 1 year)
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('custom-avatars')
        .createSignedUrl(storagePath, 60 * 60 * 24 * 365); // 1 year

      if (signedUrlError || !signedUrlData) {
        console.error('Failed to create signed URL:', signedUrlError);
        throw new Error(`Signed URL creation failed: ${signedUrlError?.message}`);
      }

      // Insert into custom_avatars table
      const { data: dbData, error: dbError } = await supabase
        .from('custom_avatars')
        .insert({
          user_id: user.id,
          storage_path: storagePath,
          image_url: signedUrlData.signedUrl,
          description: null,
          avatar_type: 'photo'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      // Refresh list to include new avatar
      await fetchAvatars();

      return dbData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create avatar';
      setError(errorMessage);
      console.error('Create avatar error:', err);
      throw err;
    }
  }, [user, fetchAvatars]);

  const saveGeneratedAvatar = useCallback(async (base64Data: string, description: string): Promise<CustomAvatar | null> => {
    if (!user) {
      throw new Error('Must be logged in to save avatars');
    }

    try {
      // Ensure profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        const { error: insertProfileError } = await supabase
          .from('profiles')
          .insert({ id: user.id, email: user.email })
          .select()
          .single();

        if (insertProfileError) {
          throw new Error(`Profile creation failed: ${insertProfileError.message}`);
        }
      }

      // Convert base64 data URL to blob
      const base64String = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
      const mimeMatch = base64Data.match(/data:([^;]+);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      const byteCharacters = atob(base64String);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: mimeType });

      const ext = mimeType === 'image/jpeg' ? 'jpg' : 'png';
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const storagePath = `${user.id}/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase
        .storage
        .from('custom-avatars')
        .upload(storagePath, blob, {
          contentType: mimeType,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      // Create signed URL
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('custom-avatars')
        .createSignedUrl(storagePath, 60 * 60 * 24 * 365);

      if (signedUrlError || !signedUrlData) {
        throw new Error(`Signed URL creation failed: ${signedUrlError?.message}`);
      }

      // Insert into DB
      const { data: dbData, error: dbError } = await supabase
        .from('custom_avatars')
        .insert({
          user_id: user.id,
          storage_path: storagePath,
          image_url: signedUrlData.signedUrl,
          description,
          avatar_type: 'stylized'
        })
        .select()
        .single();

      if (dbError) {
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      await fetchAvatars();
      return dbData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save generated avatar';
      setError(errorMessage);
      console.error('Save generated avatar error:', err);
      throw err;
    }
  }, [user, fetchAvatars]);

  const deleteAvatar = useCallback(async (avatarId: string, storagePath: string): Promise<void> => {
    // Guest mode - nothing to delete
    if (!user) return;

    try {
      // Delete from storage bucket first
      const { error: storageError } = await supabase
        .storage
        .from('custom-avatars')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('custom_avatars')
        .delete()
        .eq('id', avatarId);

      if (dbError) throw dbError;

      // Refresh list to remove deleted avatar
      await fetchAvatars();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete avatar';
      setError(errorMessage);
      console.error('Delete avatar error:', err);
      throw err;
    }
  }, [user, fetchAvatars]);

  const updateDescription = useCallback(async (avatarId: string, description: string): Promise<void> => {
    // Guest mode - cannot update
    if (!user) return;

    try {
      const { error: dbError } = await supabase
        .from('custom_avatars')
        .update({ description: description || null })
        .eq('id', avatarId)
        .eq('user_id', user.id); // Security: ensure user owns avatar

      if (dbError) throw dbError;

      // Refresh list to show updated description
      await fetchAvatars();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update description';
      setError(errorMessage);
      console.error('Update description error:', err);
      throw err;
    }
  }, [user, fetchAvatars]);

  const refresh = useCallback(async (): Promise<void> => {
    await fetchAvatars();
  }, [fetchAvatars]);

  // Fetch avatars when user changes
  useEffect(() => {
    fetchAvatars();
  }, [fetchAvatars]);

  return {
    avatars,
    loading,
    error,
    createAvatar,
    saveGeneratedAvatar,
    deleteAvatar,
    updateDescription,
    refresh
  };
}
