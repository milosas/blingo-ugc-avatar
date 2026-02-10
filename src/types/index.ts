// Avatar with image for model
export interface Avatar {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // URL to avatar image
  promptDescription: string; // How to describe in prompt
  isCustom?: boolean; // true for custom avatars
}

// Scene options
export interface Scene {
  id: string;
  name: string;
  description: string;
  promptDescription: string;
}

// Mood options
export interface Mood {
  id: string;
  name: string;
  description: string;
  promptDescription: string;
}

// Pose options
export interface Pose {
  id: string;
  name: string;
  description: string;
  promptDescription: string;
}

export interface UploadedImage {
  file: File;
  previewUrl: string;
}

// Aspect ratio options for flux-2/pro-image-to-image
export type AspectRatio = '1:1' | '4:3' | '3:4' | '4:5' | '16:9' | '9:16' | '3:2' | '2:3';

// Resolution options
export type Resolution = '1K' | '2K';

// Image count options
export type ImageCount = 1 | 2 | 3;

export interface AspectRatioOption {
  id: AspectRatio;
  name: string;
  description: string;
}

export interface ResolutionOption {
  id: Resolution;
  name: string;
  description: string;
}

export interface ImageCountOption {
  id: ImageCount;
  name: string;
  description: string;
}

export interface Config {
  // Selection fields
  avatar: Avatar | null;
  scene: Scene | null;
  mood: Mood | null;
  pose: Pose | null;
  // User's custom instruction
  userPrompt: string;
  // Technical settings
  aspectRatio: AspectRatio;
  resolution: Resolution;
  imageCount: ImageCount;
}
