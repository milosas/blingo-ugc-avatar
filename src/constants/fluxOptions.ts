import type { AspectRatioOption, ResolutionOption, Avatar, Scene, Style, Mood } from '../types';

// Avatar options with reference images
export const AVATARS: Avatar[] = [
  {
    id: 'elegant-woman',
    name: 'Elegant Woman',
    description: 'Professional female model',
    imageUrl: '/avatars/elegant-woman.jpg',
    promptDescription: 'elegant professional woman model'
  },
  {
    id: 'casual-woman',
    name: 'Casual Woman',
    description: 'Relaxed, everyday look',
    imageUrl: '/avatars/casual-woman.jpg',
    promptDescription: 'casual young woman'
  },
  {
    id: 'athletic-woman',
    name: 'Athletic Woman',
    description: 'Sporty, fit appearance',
    imageUrl: '/avatars/athletic-woman.jpg',
    promptDescription: 'athletic fit woman'
  },
  {
    id: 'business-man',
    name: 'Business Man',
    description: 'Professional male model',
    imageUrl: '/avatars/business-man.jpg',
    promptDescription: 'professional business man'
  },
  {
    id: 'casual-man',
    name: 'Casual Man',
    description: 'Relaxed male look',
    imageUrl: '/avatars/casual-man.jpg',
    promptDescription: 'casual young man'
  }
];

// Scene options
export const SCENES: Scene[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, simple background',
    promptDescription: 'minimal clean white background'
  },
  {
    id: 'photo-studio',
    name: 'Photo Studio',
    description: 'Professional studio setup',
    promptDescription: 'professional photo studio with soft lighting'
  },
  {
    id: 'urban',
    name: 'Urban',
    description: 'City street setting',
    promptDescription: 'urban city street background'
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Outdoor natural setting',
    promptDescription: 'natural outdoor setting with greenery'
  }
];

// Style options
export const STYLES: Style[] = [
  {
    id: 'casual',
    name: 'Casual',
    description: 'Relaxed, everyday style',
    promptDescription: 'casual relaxed style'
  },
  {
    id: 'sport',
    name: 'Sport',
    description: 'Athletic, sporty look',
    promptDescription: 'sporty athletic style'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated, refined',
    promptDescription: 'elegant sophisticated style'
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Urban fashion style',
    promptDescription: 'modern streetwear style'
  }
];

// Mood options
export const MOODS: Mood[] = [
  {
    id: 'serious',
    name: 'Serious',
    description: 'Professional, focused',
    promptDescription: 'serious confident expression'
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Fun, energetic',
    promptDescription: 'playful happy expression'
  },
  {
    id: 'relaxed',
    name: 'Relaxed',
    description: 'Calm, at ease',
    promptDescription: 'relaxed natural expression'
  },
  {
    id: 'confident',
    name: 'Confident',
    description: 'Strong, assured',
    promptDescription: 'confident powerful expression'
  }
];

// Aspect ratio options
export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '2:3', name: '2:3 Portrait', description: 'Classic portrait orientation' },
  { id: '3:4', name: '3:4 Portrait', description: 'Standard portrait' },
  { id: '1:1', name: '1:1 Square', description: 'Square format' },
  { id: '4:3', name: '4:3 Landscape', description: 'Standard landscape' },
  { id: '3:2', name: '3:2 Classic', description: 'Classic photo ratio' },
  { id: '16:9', name: '16:9 Widescreen', description: 'Widescreen format' },
  { id: '9:16', name: '9:16 Vertical', description: 'Vertical/mobile format' },
  { id: 'auto', name: 'Auto', description: 'Match input image ratio' }
];

// Resolution options
export const RESOLUTIONS: ResolutionOption[] = [
  { id: '1K', name: '1K', description: 'Standard quality (faster)' },
  { id: '2K', name: '2K', description: 'High quality (slower)' }
];

// Build the full prompt from config
export function buildPrompt(config: {
  avatar: Avatar | null;
  scene: Scene | null;
  style: Style | null;
  mood: Mood | null;
  userPrompt: string;
}): string {
  const parts: string[] = [];

  // Start with user's instruction
  if (config.userPrompt.trim()) {
    parts.push(config.userPrompt.trim());
  }

  // Add avatar description
  if (config.avatar) {
    parts.push(`Model: ${config.avatar.promptDescription}`);
  }

  // Add style
  if (config.style) {
    parts.push(config.style.promptDescription);
  }

  // Add mood
  if (config.mood) {
    parts.push(config.mood.promptDescription);
  }

  // Add scene
  if (config.scene) {
    parts.push(config.scene.promptDescription);
  }

  // Add quality keywords
  parts.push('high quality fashion photography, professional lighting');

  return parts.join(', ');
}

export const DEFAULT_USER_PROMPT = 'Put this clothing on the model, full body photo';
