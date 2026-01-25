import { useState, useRef, useEffect, useCallback } from 'react';
import type { GenerationState, GenerationResponse, ErrorType } from '../types/generation';
import type { Config, UploadedImage } from '../types';
import { API_CONFIG } from '../constants/api';
import { generateImages } from '../services/n8nService';

const INITIAL_STATE: GenerationState = {
  status: 'idle',
  progress: 'sending',
  results: null,
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
      error: null
    });

    // Create timeout signal (60 seconds)
    const timeoutSignal = AbortSignal.timeout(API_CONFIG.timeout);

    // Combine user abort and timeout signals
    const combinedSignal = AbortSignal.any([
      abortControllerRef.current.signal,
      timeoutSignal
    ]);

    // Set up progress stage timers (20 second intervals)
    const timer1 = setTimeout(() => {
      setState(prev => prev.status === 'loading' ? { ...prev, progress: 'generating-1' } : prev);
    }, 20000);

    const timer2 = setTimeout(() => {
      setState(prev => prev.status === 'loading' ? { ...prev, progress: 'generating-2' } : prev);
    }, 40000);

    const timer3 = setTimeout(() => {
      setState(prev => prev.status === 'loading' ? { ...prev, progress: 'generating-3' } : prev);
    }, 50000);

    progressTimersRef.current = [timer1, timer2, timer3];

    try {
      // Use n8nService to make the API call
      const data: any = await generateImages(config, images, combinedSignal);

      console.log('n8n response:', data);

      // Clear progress timers on success
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      // Check if we got images or tasks
      if (data.images && Array.isArray(data.images)) {
        setState({
          status: 'success',
          progress: 'complete',
          results: data.images,
          error: null
        });
      } else {
        console.error('Invalid response format - no images array:', data);
        setState({
          status: 'error',
          progress: 'sending',
          results: null,
          error: 'API_ERROR'
        });
      }
    } catch (err: any) {
      // Clear progress timers on error
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      // Determine error type based on error name or message
      let errorType: ErrorType;

      if (err.name === 'TimeoutError') {
        errorType = 'TIMEOUT';
      } else if (err.name === 'AbortError') {
        // User cancelled - reset to idle (silent)
        setState(INITIAL_STATE);
        return;
      } else if (err.message === 'API_ERROR') {
        errorType = 'API_ERROR';
      } else {
        errorType = 'NETWORK';
      }

      setState({
        status: 'error',
        progress: 'sending',
        results: null,
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
