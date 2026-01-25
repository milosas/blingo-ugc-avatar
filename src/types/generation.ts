export type GenerationProgress =
  | 'sending'
  | 'generating-1'
  | 'generating-2'
  | 'generating-3'
  | 'complete';

export type ErrorType = 'TIMEOUT' | 'NETWORK' | 'API_ERROR';

export interface GeneratedImage {
  url: string;
  angle: 'far' | 'medium' | 'close';
}

export interface GenerationTask {
  taskId: string;
  angle: 'far' | 'medium' | 'close';
  status: 'pending' | 'processing' | 'success' | 'failed';
  url?: string;
}

export interface GenerationState {
  status: 'idle' | 'loading' | 'polling' | 'success' | 'error';
  progress: GenerationProgress;
  results: GeneratedImage[] | null;
  tasks: GenerationTask[] | null;
  error: ErrorType | null;
}

export interface GenerationResponse {
  success: boolean;
  images?: GeneratedImage[];
  tasks?: GenerationTask[];
  pollInterval?: number;
}
