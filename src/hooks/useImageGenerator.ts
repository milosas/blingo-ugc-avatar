import { useState, useCallback } from 'react';
import { generatePostImage } from '../services/postService';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface UseImageGeneratorReturn {
  // Form state
  industry: string;
  setIndustry: (v: string) => void;
  prompt: string;
  setPrompt: (v: string) => void;

  // Output
  generatedImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
  savedId: string | null;

  // Improvise
  isImprovising: boolean;
  improvise: () => Promise<void>;

  // Actions
  generate: () => Promise<void>;
  regenerate: () => Promise<void>;
  downloadImage: () => Promise<void>;
  reset: () => void;
}

export function useImageGenerator(): UseImageGeneratorReturn {
  const { user } = useAuth();

  const [industry, setIndustry] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [isImprovising, setIsImprovising] = useState(false);

  const improvise = useCallback(async () => {
    if (!industry) return;
    setIsImprovising(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

      const response = await fetch(`${supabaseUrl}/functions/v1/improvise-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({
          industry,
          existingText: prompt || undefined,
          target: 'image',
        }),
      });

      const data = await response.json();
      if (data.success && data.text) {
        setPrompt(data.text);
      } else {
        setError(data.error || 'Improvizavimas nepavyko');
      }
    } catch (err) {
      setError((err as Error).message || 'Improvizavimas nepavyko');
    } finally {
      setIsImprovising(false);
    }
  }, [industry, prompt]);

  const doGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSavedId(null);

    try {
      const result = await generatePostImage({ industry, prompt });
      setGeneratedImageUrl(result.imageUrl);

      // Auto-save if authenticated
      if (user) {
        setIsSaving(true);
        try {
          const { data } = await supabase
            .from('generated_posts')
            .insert({
              user_id: user.id,
              image_url: result.imageUrl,
              config: { industry, prompt, type: 'image-only' },
            })
            .select('id')
            .single();
          if (data) setSavedId(data.id);
        } finally {
          setIsSaving(false);
        }
      }
    } catch (err) {
      setError((err as Error).message || 'Paveikslėlio generavimas nepavyko');
    } finally {
      setIsLoading(false);
    }
  }, [industry, prompt, user]);

  const generate = useCallback(async () => {
    await doGenerate();
  }, [doGenerate]);

  const regenerate = useCallback(async () => {
    await doGenerate();
  }, [doGenerate]);

  const downloadImage = useCallback(async () => {
    if (!generatedImageUrl) return;
    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open(generatedImageUrl, '_blank');
    }
  }, [generatedImageUrl]);

  const reset = useCallback(() => {
    setGeneratedImageUrl(null);
    setError(null);
    setSavedId(null);
    setIsLoading(false);
    setIsSaving(false);
  }, []);

  return {
    industry, setIndustry,
    prompt, setPrompt,
    generatedImageUrl,
    isLoading,
    error,
    isSaving,
    savedId,
    isImprovising,
    improvise,
    generate,
    regenerate,
    downloadImage,
    reset,
  };
}
