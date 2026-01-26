// Avatar with image for model
export interface Avatar {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // URL to avatar image
  promptDescription: string; // How to describe in prompt
}

// Scene options
export interface Scene {
  id: string;
  name: string;
  description: string;
  promptDescription: string;
}

// Style options
export interface Style {
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

export interface UploadedImage {
  file: File;
  previewUrl: string;
}

// Aspect ratio options for flux-2/pro-image-to-image
export type AspectRatio = '1:1' | '4:3' | '3:4' | '16:9' | '9:16' | '3:2' | '2:3' | 'auto';

// Resolution options
export type Resolution = '1K' | '2K';

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

export interface Config {
  // Selection fields
  avatar: Avatar | null;
  scene: Scene | null;
  style: Style | null;
  mood: Mood | null;
  // User's custom instruction
  userPrompt: string;
  // Technical settings
  aspectRatio: AspectRatio;
  resolution: Resolution;
}
