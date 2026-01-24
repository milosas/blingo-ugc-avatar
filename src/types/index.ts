export interface Avatar {
  id: string;
  name: string;
  description: string;
  skinTone: 'light' | 'medium' | 'dark';
  vibe: string;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
}

export interface Style {
  id: string;
  name: string;
  description: string;
}

export interface UploadedImage {
  file: File;
  previewUrl: string;
}

export interface Config {
  avatar: Avatar | null;
  scene: Scene | null;
  style: Style | null;
}
