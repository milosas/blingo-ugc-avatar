import { useState, useRef, useEffect, useCallback } from 'react';
import type { GenerationState, ErrorType } from '../types/generation';
import type { Config, UploadedImage } from '../types';
import { API_CONFIG } from '../constants/api';
import { generateImages } from '../services/n8nService';

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
  const progressTimersRef = useRef<NodeJS.Timeout[]>([]);

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

    // Create timeout signal (n8n does server-side polling)
    const timeoutSignal = AbortSignal.timeout(API_CONFIG.timeout);

    // Combine user abort and timeout signals
    const combinedSignal = AbortSignal.any([
      abortControllerRef.current.signal,
      timeoutSignal
    ]);

    // Set up progress stage timers (n8n polling takes ~60-120s)
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
      // Use n8nService to make the API call - n8n now handles polling
      const data = await generateImages(config, images, combinedSignal);

      console.log('n8n response:', data);

      // Clear timers on success
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      // n8n returns { success: true, images: [...] }
      if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        setState({
          status: 'success',
          progress: 'complete',
          results: data.images,
          tasks: null,
          error: null
        });
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
  }, []);

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
