import type { AspectRatioOption, ResolutionOption, ImageCountOption, Avatar, Scene, Mood, Pose } from '../types';

// Avatar options with reference images (Unsplash free photos)
// Variety of body framings: full body, half body (waist up), face
export const AVATARS: Avatar[] = [
  // Female avatars - Full body (3)
  {
    id: 'fashion-woman-full',
    name: 'Mados modelis',
    description: 'Pilnas kūnas, stilinga poza',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&h=300&fit=crop',
    promptDescription: 'fashion model woman, full body, stylish pose'
  },
  {
    id: 'elegant-woman-full',
    name: 'Elegantiška moteris',
    description: 'Pilnas kūnas, elegantiškas stilius',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=300&fit=crop',
    promptDescription: 'elegant woman, full body, sophisticated style'
  },
  {
    id: 'casual-woman-full',
    name: 'Kasdienis stilius',
    description: 'Pilnas kūnas, atsipalaidavusi',
    imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=200&h=300&fit=crop',
    promptDescription: 'casual young woman, full body, relaxed pose'
  },
  // Female avatars - Half body (2)
  {
    id: 'professional-woman-half',
    name: 'Profesionali moteris',
    description: 'Pusė kūno, dalykiškas stilius',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=250&fit=crop',
    promptDescription: 'professional woman, waist up, business attire'
  },
  {
    id: 'creative-woman-half',
    name: 'Kūrybinga moteris',
    description: 'Pusė kūno, meninė išraiška',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=250&fit=crop',
    promptDescription: 'creative artistic woman, waist up, unique style'
  },
  // Female avatar - Face (1)
  {
    id: 'portrait-woman-face',
    name: 'Portretas moteris',
    description: 'Veido close-up, natūrali grožybė',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    promptDescription: 'beautiful woman, face close-up, natural beauty'
  },
  // Male avatars - Full body (2)
  {
    id: 'business-man-full',
    name: 'Verslo vyras',
    description: 'Pilnas kūnas, profesionalus',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=300&fit=crop',
    promptDescription: 'business man, full body, professional suit'
  },
  {
    id: 'casual-man-full',
    name: 'Kasdienis vyras',
    description: 'Pilnas kūnas, atsipalaidavęs',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
    promptDescription: 'casual man, full body, relaxed style'
  },
  // Male avatars - Half body (2)
  {
    id: 'athletic-man-half',
    name: 'Sportinis vyras',
    description: 'Pusė kūno, atletiškas',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=250&fit=crop',
    promptDescription: 'athletic man, waist up, fit physique'
  },
  {
    id: 'stylish-man-half',
    name: 'Stilingas vyras',
    description: 'Pusė kūno, madinga išvaizda',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=250&fit=crop',
    promptDescription: 'stylish man, waist up, fashionable look'
  }
];

// Scene options
export const SCENES: Scene[] = [
  {
    id: 'minimal',
    name: 'Minimalistinė',
    description: 'Švarus, paprastas fonas',
    promptDescription: 'minimal clean white background'
  },
  {
    id: 'photo-studio',
    name: 'Foto studija',
    description: 'Profesionali studijos aplinka',
    promptDescription: 'professional photo studio with soft lighting'
  },
  {
    id: 'urban',
    name: 'Miesto aplinka',
    description: 'Gatvės, miesto fonas',
    promptDescription: 'urban city street background'
  },
  {
    id: 'nature',
    name: 'Gamta',
    description: 'Lauko, gamtos aplinka',
    promptDescription: 'natural outdoor setting with greenery'
  }
];

// Mood options
export const MOODS: Mood[] = [
  {
    id: 'serious',
    name: 'Rimtas',
    description: 'Profesionalus, susikaupęs',
    promptDescription: 'serious confident expression'
  },
  {
    id: 'playful',
    name: 'Žaismingas',
    description: 'Linksmas, energingas',
    promptDescription: 'playful happy expression'
  },
  {
    id: 'relaxed',
    name: 'Atsipalaidavęs',
    description: 'Ramus, natūralus',
    promptDescription: 'relaxed natural expression'
  },
  {
    id: 'confident',
    name: 'Pasitikintis',
    description: 'Stiprus, užtikrintas',
    promptDescription: 'confident powerful expression'
  },
  {
    id: 'mysterious',
    name: 'Paslaptingas',
    description: 'Intriguojantis, paslaptingas',
    promptDescription: 'mysterious intriguing expression'
  },
  {
    id: 'energetic',
    name: 'Energingas',
    description: 'Dinamiškas, pilnas energijos',
    promptDescription: 'energetic dynamic expression'
  },
  {
    id: 'dreamy',
    name: 'Svajingas',
    description: 'Romantiškas, svajingas',
    promptDescription: 'dreamy romantic expression'
  },
  {
    id: 'fierce',
    name: 'Ryžtingas',
    description: 'Stiprus, ryžtingas',
    promptDescription: 'fierce determined expression'
  }
];

// Pose options - body position and framing
export const POSES: Pose[] = [
  {
    id: 'full-body',
    name: 'Pilnas kūnas',
    description: 'Viso kūno kadras, stovint',
    promptDescription: 'full body shot, standing pose'
  },
  {
    id: 'half-body',
    name: 'Pusė kūno',
    description: 'Nuo juosmens į viršų',
    promptDescription: 'waist up, upper body shot'
  },
  {
    id: 'portrait',
    name: 'Portretas',
    description: 'Galva ir pečiai',
    promptDescription: 'portrait, head and shoulders'
  },
  {
    id: 'face',
    name: 'Veidas',
    description: 'Veido close-up',
    promptDescription: 'face close-up, detailed facial features'
  },
  {
    id: 'from-behind',
    name: 'Nuo nugaros',
    description: 'Foto iš nugaros pusės',
    promptDescription: 'shot from behind, back view'
  }
];

// Aspect ratio options - common formats for e-commerce and marketing
export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '1:1', name: 'Kvadratas 1:1', description: 'Universalus kvadratinis formatas' },
  { id: '4:5', name: 'Portretas 4:5', description: 'Populiarus portreto formatas' },
  { id: '9:16', name: 'Vertikalus 9:16', description: 'Pilno ekrano vertikalus formatas' },
  { id: '4:3', name: 'Standartinis 4:3', description: 'Klasikinis foto formatas' },
  { id: '2:3', name: 'Produktas 2:3', description: 'E-shop produktų formatas' },
  { id: '3:4', name: 'Portretas 3:4', description: 'Aukštas portreto formatas' },
  { id: '16:9', name: 'Platus 16:9', description: 'Horizontalus plataus ekrano formatas' }
];

// Resolution options
export const RESOLUTIONS: ResolutionOption[] = [
  { id: '1K', name: '1K Standartinė', description: 'Greitesnis generavimas' },
  { id: '2K', name: '2K Aukšta', description: 'Aukščiausia kokybė' }
];

// Image count options
export const IMAGE_COUNTS: ImageCountOption[] = [
  { id: 1, name: '1 nuotrauka', description: 'Greičiau, pigiau' },
  { id: 2, name: '2 nuotraukos', description: 'Daugiau pasirinkimų' },
  { id: 3, name: '3 nuotraukos', description: 'Maksimalus pasirinkimas' }
];

// Prompt placeholder examples - papildomi patikslinimai (be pozų - tos pasirenkamos dropdown)
export const PROMPT_PLACEHOLDERS: string[] = [
  // Rankų padėtis
  'rankos sukryžiuotos',
  'viena ranka ant klubo',
  'rankos kišenėse',
  'rankos už nugaros',
  'ranka ant smakro',

  // Žvilgsnio kryptis
  'žiūri į kamerą',
  'žiūri į šoną',
  'žiūri žemyn',
  'žvilgsnis į tolį',

  // Išraiška
  'lengva šypsena',
  'rimta išraiška',
  'natūrali išraiška',
  'mįslinga šypsena',

  // Papildomi detalės
  'plaukai palaidi',
  'plaukai surišti',
  'su akiniais',
  'su skrybėle'
];

// Get random placeholder
export function getRandomPlaceholder(): string {
  const index = Math.floor(Math.random() * PROMPT_PLACEHOLDERS.length);
  return PROMPT_PLACEHOLDERS[index];
}

// Build the prompt - combine all selections into one prompt
export function buildPrompt(config: {
  avatar: Avatar | null;
  scene: Scene | null;
  mood: Mood | null;
  pose: Pose | null;
  userPrompt: string;
}): string {
  const parts: string[] = [];

  // Modelio aprašymas
  if (config.avatar) {
    parts.push(config.avatar.promptDescription);
  }

  // Pozos aprašymas (kūno padėtis, kadras) - prieš sceną
  if (config.pose) {
    parts.push(config.pose.promptDescription);
  }

  // Aplinkos aprašymas
  if (config.scene) {
    parts.push(config.scene.promptDescription);
  }

  // Nuotaikos aprašymas
  if (config.mood) {
    parts.push(config.mood.promptDescription);
  }

  // Vartotojo papildomi patikslinimai
  if (config.userPrompt.trim()) {
    parts.push(config.userPrompt.trim());
  }

  return parts.join(', ') || 'Professional fashion photo';
}

export const DEFAULT_USER_PROMPT = '';
