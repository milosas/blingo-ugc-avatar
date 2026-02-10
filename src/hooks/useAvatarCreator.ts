import { useState, useCallback } from 'react';
import { AvatarTraits, DEFAULT_TRAITS, buildAvatarPrompt } from '../constants/avatarTraits';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

interface UseAvatarCreatorReturn {
  traits: AvatarTraits;
  specialFeatures: string;
  prompt: string;
  generatedImage: string | null;
  isGenerating: boolean;
  error: string | null;
  setTrait: (key: keyof AvatarTraits, value: string) => void;
  setSpecialFeatures: (value: string) => void;
  setPrompt: (value: string) => void;
  setError: (error: string | null) => void;
  generateAvatar: () => Promise<void>;
  reset: () => void;
}

export function useAvatarCreator(): UseAvatarCreatorReturn {
  const [traits, setTraits] = useState<AvatarTraits>({ ...DEFAULT_TRAITS });
  const [specialFeatures, setSpecialFeatures] = useState('');
  const [prompt, setPrompt] = useState(() => buildAvatarPrompt(DEFAULT_TRAITS, ''));
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setTrait = useCallback((key: keyof AvatarTraits, value: string) => {
    setTraits(prev => {
      const updated = { ...prev, [key]: value };
      setPrompt(buildAvatarPrompt(updated, specialFeatures));
      return updated;
    });
  }, [specialFeatures]);

  const handleSetSpecialFeatures = useCallback((value: string) => {
    setSpecialFeatures(value);
    setPrompt(buildAvatarPrompt(traits, value));
  }, [traits]);

  const generateAvatar = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setGeneratedImage(data.image);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  const reset = useCallback(() => {
    setTraits({ ...DEFAULT_TRAITS });
    setSpecialFeatures('');
    setPrompt(buildAvatarPrompt(DEFAULT_TRAITS, ''));
    setGeneratedImage(null);
    setError(null);
  }, []);

  return {
    traits,
    specialFeatures,
    prompt,
    generatedImage,
    isGenerating,
    error,
    setTrait,
    setSpecialFeatures: handleSetSpecialFeatures,
    setPrompt,
    setError,
    generateAvatar,
    reset,
  };
}
