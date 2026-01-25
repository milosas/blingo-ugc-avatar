import { useState, useRef, useEffect, useCallback } from 'react';
import type { GenerationState, GenerationResponse, ErrorType } from '../types/generation';
import { API_CONFIG } from '../constants/api';

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

  const generate = useCallback(async (config: any, images: string[]) => {
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
      const response = await fetch(API_CONFIG.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config, images }),
        signal: combinedSignal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: GenerationResponse = await response.json();

      // Clear progress timers on success
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      setState({
        status: 'success',
        progress: 'complete',
        results: data.images,
        error: null
      });
    } catch (err: any) {
      // Clear progress timers on error
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      // Determine error type based on error name
      let errorType: ErrorType;
      
      if (err.name === 'TimeoutError') {
        errorType = 'TIMEOUT';
      } else if (err.name === 'AbortError') {
        // User cancelled - reset to idle (silent)
        setState(INITIAL_STATE);
        return;
      } else if (err.message?.includes('HTTP')) {
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
