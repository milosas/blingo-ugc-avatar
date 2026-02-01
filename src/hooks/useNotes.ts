import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { ImageNote } from '../types/database';

interface UseNotesReturn {
  note: ImageNote | null;
  loading: boolean;
  error: string | null;
  saveNote: (text: string) => Promise<void>;
  deleteNote: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useNotes(imageId: string | null): UseNotesReturn {
  const { user } = useAuth();
  const [note, setNote] = useState<ImageNote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNote = useCallback(async () => {
    // Guest mode or no image selected - return null (expected behavior)
    if (!user || !imageId) {
      setNote(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('image_notes')
        .select('*')
        .eq('image_id', imageId)
        .single();

      // Handle PGRST116 (no rows) - this is expected when no note exists
      if (queryError) {
        if (queryError.code === 'PGRST116') {
          setNote(null);
          return;
        }
        throw queryError;
      }

      setNote(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch note';
      setError(errorMessage);
      console.error('Note fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user, imageId]);

  const saveNote = useCallback(async (text: string): Promise<void> => {
    // Guest mode - cannot save notes
    if (!user || !imageId) {
      throw new Error('Must be logged in to save notes');
    }

    try {
      const { error: upsertError } = await supabase
        .from('image_notes')
        .upsert({
          image_id: imageId,
          user_id: user.id,
          note_text: text,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'image_id',
        });

      if (upsertError) throw upsertError;

      // Refresh to get the latest data from database
      await fetchNote();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save note';
      setError(errorMessage);
      console.error('Save note error:', err);
      throw err;
    }
  }, [user, imageId, fetchNote]);

  const deleteNote = useCallback(async (): Promise<void> => {
    // Guest mode - nothing to delete
    if (!user || !imageId) return;

    try {
      const { error: deleteError } = await supabase
        .from('image_notes')
        .delete()
        .eq('image_id', imageId);

      if (deleteError) throw deleteError;

      // Clear local state after successful delete
      setNote(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete note';
      setError(errorMessage);
      console.error('Delete note error:', err);
      throw err;
    }
  }, [user, imageId]);

  const refresh = useCallback(async (): Promise<void> => {
    await fetchNote();
  }, [fetchNote]);

  // Fetch note when imageId or user changes
  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  return {
    note,
    loading,
    error,
    saveNote,
    deleteNote,
    refresh
  };
}
