import { useState, useRef, useEffect, useCallback } from 'react';
import type { GenerationState, ErrorType } from '../types/generation';
import type { Config, UploadedImage } from '../types';
import { API_CONFIG } from '../constants/api';
import { generateImages } from '../services/generationService';
import { useSupabaseStorage } from './useSupabaseStorage';
import { useAuth } from './useAuth';
import { buildPrompt } from '../constants/fluxOptions';

const INITIAL_STATE: GenerationState = {
  status: 'idle',
  progress: 'sending',
  results: null,
  tasks: null,
  error: null
};

export function useGeneration() {
  const [state, setState] = useState<GenerationState>(INITIAL_STATE);
  const abortControllerRef = useRef<AbortController | null>(null);
  const progressTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { user } = useAuth();
  const { saveGeneratedImage } = useSupabaseStorage();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const generate = useCallback(async (config: Config, images: UploadedImage[]) => {
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    // Clear any existing timers
    progressTimersRef.current.forEach(timer => clearTimeout(timer));
    progressTimersRef.current = [];

    // Set initial loading state
    setState({
      status: 'loading',
      progress: 'sending',
      results: null,
      tasks: null,
      error: null
    });

    // Create timeout signal (Edge Function does server-side polling)
    const timeoutSignal = AbortSignal.timeout(API_CONFIG.timeout);

    // Combine user abort and timeout signals
    const combinedSignal = AbortSignal.any([
      abortControllerRef.current.signal,
      timeoutSignal
    ]);

    // Set up progress stage timers (generation takes ~60-120s)
    const timer1 = setTimeout(() => {
      setState(prev => prev.status === 'loading' ? { ...prev, progress: 'generating-1' } : prev);
    }, 10000); // 10s

    const timer2 = setTimeout(() => {
      setState(prev => prev.status === 'loading' ? { ...prev, progress: 'generating-2' } : prev);
    }, 40000); // 40s

    const timer3 = setTimeout(() => {
      setState(prev => prev.status === 'loading' ? { ...prev, progress: 'generating-3' } : prev);
    }, 80000); // 80s

    progressTimersRef.current = [timer1, timer2, timer3];

    try {
      // Call Edge Function - it handles kie.ai polling
      const data = await generateImages(config, images, combinedSignal);

      console.log('Generation response:', data);

      // Clear timers on success
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      // Edge Function returns { success: true, images: [...] }
      if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        setState({
          status: 'success',
          progress: 'complete',
          results: data.images,
          tasks: null,
          error: null
        });

        // Save to Supabase if user is authenticated
        if (user) {
          console.log('User authenticated, saving images to gallery...', { userId: user.id, imageCount: data.images?.length || 0 });

          // Build the prompt that was used for generation
          const generatedPrompt = buildPrompt({
            avatar: config.avatar,
            scene: config.scene,
            mood: config.mood,
            pose: config.pose,
            userPrompt: config.userPrompt
          });

          // Save all generated images - await to ensure they're saved
          try {
            const savedImages = await Promise.all(
              data.images.map((image, index) => {
                console.log(`Saving image ${index + 1}/${data.images?.length || 0}:`, image.url.substring(0, 50) + '...', 'has base64:', !!image.base64);
                return saveGeneratedImage({
                  imageUrl: image.url,
                  imageBase64: image.base64, // Pass base64 for CORS-free storage
                  prompt: generatedPrompt,
                  config: {
                    avatar: config.avatar?.id ?? null,
                    scene: config.scene?.id ?? null,
                    mood: config.mood?.id ?? null,
                    pose: config.pose?.id ?? null,
                    aspectRatio: config.aspectRatio,
                    resolution: config.resolution
                  }
                });
              })
            );
            console.log('All images saved to gallery successfully:', savedImages);
          } catch (err) {
            console.error('Failed to save images to gallery:', err);
            // Don't throw - user already has the generated images displayed
          }
        } else {
          console.log('User not authenticated, skipping gallery save');
        }
      } else {
        console.error('No images in response:', data);
        setState({
          status: 'error',
          progress: 'sending',
          results: null,
          tasks: null,
          error: 'API_ERROR'
        });
      }
    } catch (err: unknown) {
      // Clear progress timers on error
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      // Determine error type
      let errorType: ErrorType;
      const error = err as Error;

      if (error.name === 'TimeoutError') {
        errorType = 'TIMEOUT';
      } else if (error.name === 'AbortError') {
        // User cancelled - reset to idle (silent)
        setState(INITIAL_STATE);
        return;
      } else if (error.message === 'API_ERROR') {
        errorType = 'API_ERROR';
      } else if (error.message === 'AVATAR_LOAD_FAILED') {
        errorType = 'AVATAR_LOAD_FAILED';
      } else {
        errorType = 'NETWORK';
      }

      setState({
        status: 'error',
        progress: 'sending',
        results: null,
        tasks: null,
        error: errorType
      });
    }
  }, [user, saveGeneratedImage]);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    progressTimersRef.current.forEach(timer => clearTimeout(timer));
    progressTimersRef.current = [];
    setState(INITIAL_STATE);
  }, []);

  const reset = useCallback(() => {
    progressTimersRef.current.forEach(timer => clearTimeout(timer));
    progressTimersRef.current = [];
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    generate,
    cancel,
    reset
  };
}
