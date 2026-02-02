import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { CustomAvatar } from '../types/database';

interface UseCustomAvatarsReturn {
  avatars: CustomAvatar[];
  loading: boolean;
  error: string | null;
  createAvatar: (file: File) => Promise<CustomAvatar | null>;
  updateDescription: (avatarId: string, description: string) => Promise<void>;
  deleteAvatar: (avatarId: string, storagePath: string) => Promise<void>;
  refresh: () => Promise<void>;
  refreshAvatar: (avatarId: string) => Promise<CustomAvatar | null>;
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
          description: 'Analyzing image...',
          avatar_type: 'pending'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      // Trigger Edge Function (non-blocking) - don't await
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      fetch(`${supabaseUrl}/functions/v1/analyze-avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          avatarId: dbData.id,
          imageUrl: signedUrlData.signedUrl
        })
      }).catch(err => {
        // Log error but don't fail upload
        console.error('Edge Function call failed:', err);
      });

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

  const updateDescription = useCallback(async (avatarId: string, description: string): Promise<void> => {
    // Guest mode - nothing to update
    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from('custom_avatars')
        .update({
          description,
          updated_at: new Date().toISOString()
        })
        .eq('id', avatarId);

      if (updateError) throw updateError;

      // Refresh to get latest data
      await fetchAvatars();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update description';
      setError(errorMessage);
      console.error('Update description error:', err);
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

  const refresh = useCallback(async (): Promise<void> => {
    await fetchAvatars();
  }, [fetchAvatars]);

  const refreshAvatar = useCallback(async (avatarId: string): Promise<CustomAvatar | null> => {
    // Guest mode - nothing to refresh
    if (!user) return null;

    try {
      const { data, error: queryError } = await supabase
        .from('custom_avatars')
        .select('*')
        .eq('id', avatarId)
        .single();

      if (queryError || !data) return null;

      // Update local state
      setAvatars(prev => prev.map(a => a.id === avatarId ? data : a));
      return data;
    } catch (err) {
      console.error('Refresh avatar error:', err);
      return null;
    }
  }, [user]);

  // Fetch avatars when user changes
  useEffect(() => {
    fetchAvatars();
  }, [fetchAvatars]);

  return {
    avatars,
    loading,
    error,
    createAvatar,
    updateDescription,
    deleteAvatar,
    refresh,
    refreshAvatar
  };
}
