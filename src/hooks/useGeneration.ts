import { useState, useRef, useEffect, useCallback } from 'react';
import type { GenerationState, GenerationResponse, ErrorType, GenerationTask, GeneratedImage } from '../types/generation';
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

const KIE_AI_API_KEY = 'sk-oP0cLg1TZWZJazREOVpKa1I5Q1JaS2hLWXBRQ0FYdGE';

export function useGeneration() {
  const [state, setState] = useState<GenerationState>(INITIAL_STATE);
  const abortControllerRef = useRef<AbortController | null>(null);
  const progressTimersRef = useRef<NodeJS.Timeout[]>([]);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Poll kie.ai API for task status
  const pollTask = async (taskId: string): Promise<{ status: string; url?: string }> => {
    try {
      const response = await fetch('https://api.kie.ai/api/v1/jobs/queryTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KIE_AI_API_KEY}`
        },
        body: JSON.stringify({ taskId })
      });

      const data = await response.json();

      // kie.ai response: { code: 200, data: { status: "SUCCESS", output: { output_urls: [...] } } }
      if (data.data) {
        const status = data.data.status;
        const url = data.data.output?.output_urls?.[0];

        return { status, url };
      }

      return { status: 'PENDING' };
    } catch (err) {
      console.error('Poll task error:', err);
      return { status: 'ERROR' };
    }
  };

  // Start polling for task results
  const startPolling = useCallback((tasks: GenerationTask[]) => {
    console.log('Starting polling for tasks:', tasks);

    setState(prev => ({
      ...prev,
      status: 'polling',
      tasks: tasks
    }));

    let completedCount = 0;

    pollingIntervalRef.current = setInterval(async () => {
      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          if (task.url) return task; // Already completed

          const result = await pollTask(task.taskId);

          if (result.status === 'SUCCESS' && result.url) {
            completedCount++;
            console.log(`Task ${task.angle} complete! (${completedCount}/3)`);

            return {
              ...task,
              status: 'success' as const,
              url: result.url
            };
          } else if (result.status === 'ERROR' || result.status === 'FAILED') {
            return {
              ...task,
              status: 'failed' as const
            };
          }

          return {
            ...task,
            status: 'processing' as const
          };
        })
      );

      // Update state with partial results
      const completedImages: GeneratedImage[] = updatedTasks
        .filter(t => t.url)
        .map(t => ({ url: t.url!, angle: t.angle }));

      setState(prev => ({
        ...prev,
        tasks: updatedTasks,
        results: completedImages.length > 0 ? completedImages : null
      }));

      // Check if all tasks completed
      const allComplete = updatedTasks.every(t => t.status === 'success' || t.status === 'failed');

      if (allComplete) {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }

        progressTimersRef.current.forEach(timer => clearTimeout(timer));
        progressTimersRef.current = [];

        const successfulImages = updatedTasks
          .filter(t => t.url)
          .map(t => ({ url: t.url!, angle: t.angle }));

        setState({
          status: 'success',
          progress: 'complete',
          results: successfulImages,
          tasks: updatedTasks,
          error: null
        });

        console.log('All tasks complete!', successfulImages);
      }

      // Update tasks reference for next iteration
      tasks = updatedTasks;
    }, 10000); // Poll every 10 seconds
  }, []);

  const generate = useCallback(async (config: Config, images: UploadedImage[]) => {
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    // Clear any existing timers and polling
    progressTimersRef.current.forEach(timer => clearTimeout(timer));
    progressTimersRef.current = [];

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    // Set initial loading state
    setState({
      status: 'loading',
      progress: 'sending',
      results: null,
      tasks: null,
      error: null
    });

    // Create timeout signal (120 seconds)
    const timeoutSignal = AbortSignal.timeout(API_CONFIG.timeout);

    // Combine user abort and timeout signals
    const combinedSignal = AbortSignal.any([
      abortControllerRef.current.signal,
      timeoutSignal
    ]);

    // Set up progress stage timers (adjusted for polling flow)
    const timer1 = setTimeout(() => {
      setState(prev => (prev.status === 'loading' || prev.status === 'polling') ? { ...prev, progress: 'generating-1' } : prev);
    }, 15000); // 15s

    const timer2 = setTimeout(() => {
      setState(prev => (prev.status === 'loading' || prev.status === 'polling') ? { ...prev, progress: 'generating-2' } : prev);
    }, 30000); // 30s

    const timer3 = setTimeout(() => {
      setState(prev => (prev.status === 'loading' || prev.status === 'polling') ? { ...prev, progress: 'generating-3' } : prev);
    }, 45000); // 45s

    progressTimersRef.current = [timer1, timer2, timer3];

    try {
      // Use n8nService to make the API call
      const data: any = await generateImages(config, images, combinedSignal);

      console.log('n8n response:', data);

      // Check if we got tasks (new flow) or images (old flow)
      if (data.tasks && Array.isArray(data.tasks)) {
        // New flow: Start polling
        startPolling(data.tasks);
      } else if (data.images && Array.isArray(data.images)) {
        // Old flow: Direct images
        progressTimersRef.current.forEach(timer => clearTimeout(timer));
        progressTimersRef.current = [];

        setState({
          status: 'success',
          progress: 'complete',
          results: data.images,
          tasks: null,
          error: null
        });
      } else {
        console.error('Invalid response format:', data);
        progressTimersRef.current.forEach(timer => clearTimeout(timer));
        progressTimersRef.current = [];

        setState({
          status: 'error',
          progress: 'sending',
          results: null,
          tasks: null,
          error: 'API_ERROR'
        });
      }
    } catch (err: any) {
      // Clear progress timers on error
      progressTimersRef.current.forEach(timer => clearTimeout(timer));
      progressTimersRef.current = [];

      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }

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
        tasks: null,
        error: errorType
      });
    }
  }, [startPolling]);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    progressTimersRef.current.forEach(timer => clearTimeout(timer));
    progressTimersRef.current = [];

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    setState(INITIAL_STATE);
  }, []);

  const reset = useCallback(() => {
    progressTimersRef.current.forEach(timer => clearTimeout(timer));
    progressTimersRef.current = [];

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    generate,
    cancel,
    reset
  };
}
