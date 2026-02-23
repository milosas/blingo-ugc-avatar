import { useState, useCallback, useRef } from 'react';
import type { PostConfig } from '../types/database';
import {
  generatePostText,
  generatePostImage,
  generateTextFromImage,
  parseSSEStream,
  savePost,
} from '../services/postService';
import { useAuth } from './useAuth';

export type ImageSource = 'upload' | 'ai' | 'gallery';

interface UsePostCreatorReturn {
  // Form state
  industry: string;
  setIndustry: (v: string) => void;
  prompt: string;
  setPrompt: (v: string) => void;
  tone: PostConfig['tone'];
  setTone: (v: PostConfig['tone']) => void;
  emoji: PostConfig['emoji'];
  setEmoji: (v: PostConfig['emoji']) => void;
  length: PostConfig['length'];
  setLength: (v: PostConfig['length']) => void;

  // Image
  imageSource: ImageSource;
  setImageSource: (v: ImageSource) => void;
  imageFile: File | null;
  setImageFile: (f: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (v: string | null) => void;
  generatedImageUrl: string | null;

  // Output
  generatedText: string;
  isStreaming: boolean;
  isLoadingText: boolean;
  isLoadingImage: boolean;
  error: string | null;
  isSaving: boolean;
  savedPostId: string | null;

  // Improvise
  isImprovising: boolean;
  improvise: () => Promise<void>;

  // Generate text from image
  isGeneratingFromImage: boolean;
  generateFromImage: () => Promise<void>;

  // Actions
  generate: () => Promise<void>;
  regenerateText: () => Promise<void>;
  regenerateImage: () => Promise<void>;
  copyText: () => Promise<boolean>;
  cancel: () => void;
  reset: () => void;
}

export function usePostCreator(): UsePostCreatorReturn {
  const { user } = useAuth();

  // Form state
  const [industry, setIndustry] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<PostConfig['tone']>('friendly');
  const [emoji, setEmoji] = useState<PostConfig['emoji']>('minimal');
  const [length, setLength] = useState<PostConfig['length']>('medium');

  // Image state
  const [imageSource, setImageSource] = useState<ImageSource>('upload');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // Output state
  const [generatedText, setGeneratedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedPostId, setSavedPostId] = useState<string | null>(null);

  const [isImprovising, setIsImprovising] = useState(false);
  const [isGeneratingFromImage, setIsGeneratingFromImage] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const improvise = useCallback(async () => {
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
          industry: industry || 'general',
          existingText: prompt || undefined,
          target: 'topic',
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

  const generateFromImage = useCallback(async () => {
    if (!imagePreview) return;
    setIsGeneratingFromImage(true);
    setIsStreaming(true);
    setGeneratedText('');
    setError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await generateTextFromImage({
        imageUrl: imagePreview,
        tone,
        emoji,
        length,
        signal: controller.signal,
      });

      let fullText = '';
      for await (const chunk of parseSSEStream(response)) {
        if (controller.signal.aborted) break;
        fullText += chunk;
        setGeneratedText(fullText);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message || 'Teksto generavimas pagal nuotrauką nepavyko');
      }
    } finally {
      setIsGeneratingFromImage(false);
      setIsStreaming(false);
    }
  }, [imagePreview, tone, emoji, length]);

  const getConfig = useCallback((): PostConfig => ({
    industry: industry || 'general',
    prompt,
    tone,
    emoji,
    length,
  }), [industry, prompt, tone, emoji, length]);

  const streamText = useCallback(async (signal: AbortSignal) => {
    setIsLoadingText(true);
    setIsStreaming(true);
    setGeneratedText('');
    setError(null);

    try {
      const response = await generatePostText({
        industry: industry || 'general', prompt, tone, emoji, length, signal,
      });

      let fullText = '';
      for await (const chunk of parseSSEStream(response)) {
        if (signal.aborted) break;
        fullText += chunk;
        setGeneratedText(fullText);
      }

      return fullText;
    } catch (err) {
      if ((err as Error).name === 'AbortError') return null;
      throw err;
    } finally {
      setIsLoadingText(false);
      setIsStreaming(false);
    }
  }, [industry, prompt, tone, emoji, length]);

  const generateImage = useCallback(async () => {
    setIsLoadingImage(true);
    try {
      const result = await generatePostImage({ industry: industry || 'general', prompt });
      setGeneratedImageUrl(result.imageUrl);
      return result.imageUrl;
    } catch (err) {
      throw err;
    } finally {
      setIsLoadingImage(false);
    }
  }, [industry, prompt]);

  const doSave = useCallback(async (text: string | null, imageUrl: string | null) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const saved = await savePost({
        text,
        imageUrl,
        config: getConfig(),
      });
      if (saved) setSavedPostId(saved.id);
    } finally {
      setIsSaving(false);
    }
  }, [user, getConfig]);

  const generate = useCallback(async () => {
    setError(null);
    setSavedPostId(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const shouldGenerateImage = imageSource === 'ai';

      const results = await Promise.allSettled([
        streamText(controller.signal),
        ...(shouldGenerateImage ? [generateImage()] : []),
      ]);

      const textResult = results[0];
      const imageResult = shouldGenerateImage ? results[1] : null;

      let finalText: string | null = null;
      let finalImageUrl: string | null = null;

      if (textResult.status === 'fulfilled' && textResult.value) {
        finalText = textResult.value as string;
      } else if (textResult.status === 'rejected') {
        setError(textResult.reason?.message || 'Teksto generavimas nepavyko');
      }

      if (imageResult) {
        if (imageResult.status === 'fulfilled') {
          finalImageUrl = imageResult.value as string;
        } else if (imageResult.status === 'rejected') {
          setError(prev => prev
            ? prev + ' | ' + (imageResult.reason?.message || 'Paveikslėlio generavimas nepavyko')
            : imageResult.reason?.message || 'Paveikslėlio generavimas nepavyko'
          );
        }
      }

      // Use uploaded/gallery image URL
      if ((imageSource === 'upload' || imageSource === 'gallery') && imagePreview) {
        finalImageUrl = imagePreview;
      }

      // Auto-save if we have at least text
      if (finalText) {
        await doSave(finalText, finalImageUrl);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message || 'Generavimo klaida');
      }
    }
  }, [imageSource, imagePreview, streamText, generateImage, doSave]);

  const regenerateText = useCallback(async () => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      await streamText(controller.signal);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message || 'Teksto generavimas nepavyko');
      }
    }
  }, [streamText]);

  const regenerateImage = useCallback(async () => {
    try {
      await generateImage();
    } catch (err) {
      setError((err as Error).message || 'Paveikslėlio generavimas nepavyko');
    }
  }, [generateImage]);

  const copyText = useCallback(async (): Promise<boolean> => {
    if (!generatedText) return false;
    try {
      await navigator.clipboard.writeText(generatedText);
      return true;
    } catch {
      return false;
    }
  }, [generatedText]);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    cancel();
    setGeneratedText('');
    setGeneratedImageUrl(null);
    setError(null);
    setSavedPostId(null);
    setIsLoadingText(false);
    setIsLoadingImage(false);
    setIsStreaming(false);
    setIsSaving(false);
  }, [cancel]);

  return {
    industry, setIndustry,
    prompt, setPrompt,
    tone, setTone,
    emoji, setEmoji,
    length, setLength,
    imageSource, setImageSource,
    imageFile, setImageFile,
    imagePreview, setImagePreview,
    generatedImageUrl,
    generatedText,
    isStreaming,
    isLoadingText,
    isLoadingImage,
    error,
    isSaving,
    savedPostId,
    isImprovising,
    improvise,
    isGeneratingFromImage,
    generateFromImage,
    generate,
    regenerateText,
    regenerateImage,
    copyText,
    cancel,
    reset,
  };
}
