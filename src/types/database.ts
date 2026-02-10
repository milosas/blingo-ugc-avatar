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

export interface CustomAvatar {
  id: string;
  user_id: string;
  storage_path: string;
  image_url: string;
  description: string | null;
  avatar_type: 'photo' | 'stylized' | 'pending' | 'generated';
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

export interface PostConfig {
  industry: string;
  prompt: string;
  tone: 'professional' | 'friendly' | 'motivating' | 'humorous';
  emoji: 'yes' | 'no' | 'minimal';
  length: 'short' | 'medium' | 'long';
}

export interface GeneratedPost {
  id: string;
  user_id: string;
  text: string | null;
  image_url: string | null;
  storage_path: string | null;
  config: PostConfig | null;
  is_favorite: boolean;
  created_at: string;
}
