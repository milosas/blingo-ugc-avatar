import { useState, useRef, useCallback } from 'react';
import { postProcessImage } from '../services/generationService';
import { API_CONFIG } from '../constants/api';
import type { GeneratedImage } from '../types/generation';

interface PostProcessState {
  isProcessing: boolean;
  result: GeneratedImage | null;
  error: string | null;
}

export function usePostProcess() {
  const [state, setState] = useState<PostProcessState>({
    isProcessing: false,
    result: null,
    error: null
  });
  const abortRef = useRef<AbortController | null>(null);

  const process = useCallback(async (
    action: 'background' | 'relight' | 'edit',
    sourceImageUrl: string,
    params: {
      backgroundPrompt?: string;
      lightingStyle?: string;
      editPrompt?: string;
    }
  ) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    // Combine user abort with timeout (same as main generation)
    const timeoutSignal = AbortSignal.timeout(API_CONFIG.timeout);
    const combinedSignal = AbortSignal.any([
      abortRef.current.signal,
      timeoutSignal
    ]);

    setState({ isProcessing: true, result: null, error: null });

    try {
      const data = await postProcessImage(action, sourceImageUrl, params, combinedSignal);

      if (data.images && data.images.length > 0) {
        setState({ isProcessing: false, result: data.images[0], error: null });
        return data.images[0];
      } else {
        setState({ isProcessing: false, result: null, error: 'No result returned' });
        return null;
      }
    } catch (err) {
      const error = err as Error;
      if (error.name === 'AbortError') {
        setState({ isProcessing: false, result: null, error: null });
        return null;
      }
      if (error.name === 'TimeoutError') {
        setState({ isProcessing: false, result: null, error: 'Užklausa užtruko per ilgai. Bandykite dar kartą.' });
        return null;
      }
      setState({ isProcessing: false, result: null, error: error.message || 'Post-processing failed' });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({ isProcessing: false, result: null, error: null });
  }, []);

  return {
    ...state,
    process,
    reset
  };
}
