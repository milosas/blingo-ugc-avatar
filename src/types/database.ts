// TypeScript types matching database schema

export interface Profile {
  id: string;
  email: string | null;
  created_at: string;
}

export interface ImageNote {
  id: string;
  image_id: string;
  user_id: string;
  note_text: string;
  created_at: string;
  updated_at: string;
}

export interface GeneratedImage {
  id: string;
  user_id: string;
  image_url: string;
  storage_path: string;
  prompt: string | null;
  config: GenerationConfig | null;
  created_at: string;
  updated_at: string;
  note?: ImageNote | null; // Optional: populated when joined
}

export interface GenerationConfig {
  avatar?: string;
  scene?: string;
  style?: string;
  mood?: string;
  aspectRatio?: string;
  resolution?: string;
}
