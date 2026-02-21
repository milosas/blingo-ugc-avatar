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
  avatar_type: 'photo' | 'stylized';
  gender: 'male' | 'female' | 'other' | null;
  age_range: 'child' | 'teen' | 'young_adult' | 'adult' | 'senior' | null;
  hair_color: 'black' | 'brown' | 'blonde' | 'red' | 'gray' | 'white' | 'other' | null;
  hair_length: 'short' | 'medium' | 'long' | 'bald' | null;
  model_id: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AvatarModel {
  id: string;
  user_id: string;
  name: string;
  cover_photo_id: string | null;
  created_at: string;
  updated_at: string;
  photos?: CustomAvatar[];
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
  avatar?: string | null;
  garmentPhotoType?: string | null;
  qualityMode?: string | null;
  imageCount?: number;
  // Legacy fields kept for backward compat with existing gallery items
  clothingType?: string | null;
  mood?: string | null;
  scene?: string | null;
  customPrompt?: string | null;
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
