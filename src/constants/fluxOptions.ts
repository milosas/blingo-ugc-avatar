import type { AspectRatioOption, ResolutionOption, ImageCountOption, Avatar, Scene, Style, Mood } from '../types';

// Avatar options with reference images
export const AVATARS: Avatar[] = [
  {
    id: 'elegant-woman',
    name: 'Elegantiška moteris',
    description: 'Profesionali, stilinga išvaizda',
    imageUrl: '/avatars/elegant-woman.svg',
    promptDescription: 'elegant professional woman model'
  },
  {
    id: 'casual-woman',
    name: 'Kasdienis stilius',
    description: 'Atsipalaidavusi, kasdienė išvaizda',
    imageUrl: '/avatars/casual-woman.svg',
    promptDescription: 'casual young woman'
  },
  {
    id: 'athletic-woman',
    name: 'Sportinė moteris',
    description: 'Sportiška, aktyvi išvaizda',
    imageUrl: '/avatars/athletic-woman.svg',
    promptDescription: 'athletic fit woman'
  },
  {
    id: 'business-man',
    name: 'Verslo vyras',
    description: 'Profesionalus, dalykiškas',
    imageUrl: '/avatars/business-man.svg',
    promptDescription: 'professional business man'
  },
  {
    id: 'casual-man',
    name: 'Kasdienis vyras',
    description: 'Atsipalaidavęs, paprastas stilius',
    imageUrl: '/avatars/casual-man.svg',
    promptDescription: 'casual young man'
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

// Style options
export const STYLES: Style[] = [
  {
    id: 'casual',
    name: 'Kasdienis',
    description: 'Atsipalaidavęs, kasdieniškas',
    promptDescription: 'casual relaxed style'
  },
  {
    id: 'sport',
    name: 'Sportinis',
    description: 'Atletiškas, sportiškas',
    promptDescription: 'sporty athletic style'
  },
  {
    id: 'elegant',
    name: 'Elegantiškas',
    description: 'Rafinuotas, išskirtinis',
    promptDescription: 'elegant sophisticated style'
  },
  {
    id: 'streetwear',
    name: 'Gatvės mada',
    description: 'Miestietiška mada',
    promptDescription: 'modern streetwear style'
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
  }
];

// Aspect ratio options - common social media & e-shop formats
export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '1:1', name: 'Instagram postas', description: '1:1 kvadratas - idealus Instagram feed' },
  { id: '4:5', name: 'Instagram portretas', description: '4:5 - populiariausias IG formatas' },
  { id: '9:16', name: 'Stories / Reels', description: '9:16 - IG Stories, TikTok, Reels' },
  { id: '4:3', name: 'Facebook postas', description: '4:3 - optimalus Facebook' },
  { id: '2:3', name: 'E-shop produktas', description: '2:3 - standartinis produkto formatas' },
  { id: '3:4', name: 'Pinterest', description: '3:4 - Pinterest rekomenduojamas' },
  { id: '16:9', name: 'YouTube / Cover', description: '16:9 - cover photo, banneriai' }
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

// Prompt placeholder examples - TIK pozos ir formatas (AI pats mato kas įkelta)
export const PROMPT_PLACEHOLDERS: string[] = [
  // Pilnas ūgis
  'pilnas ūgis, stovi tiesiai, žiūri į kamerą',
  'pilnas ūgis, natūraliai stovi, rankos prie šono',
  'pilnas ūgis, viena ranka ant klubo',
  'pilnas ūgis, lengvai pasukta į šoną',
  'pilnas ūgis, žingsnis į priekį',
  'pilnas ūgis, modelio poza',
  'pilnas ūgis, eina, natūralus judesys',

  // Iki pusės (waist up)
  'iki pusės, žiūri į kamerą',
  'iki pusės, pusiau pasukta',
  'iki pusės, rankos sukryžiuotos',
  'iki pusės, ranka ant klubo',
  'iki pusės, sėdi, atsipalaidavusi',
  'iki pusės, lengva šypsena',

  // Tik veidas / portretas
  'portretas, žiūri tiesiai',
  'portretas, lengvai pasukta galva',
  'portretas, šypsosi',
  'close-up veido'
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
  style: Style | null;
  mood: Mood | null;
  userPrompt: string;
}): string {
  const parts: string[] = [];

  // Modelio aprašymas
  if (config.avatar) {
    parts.push(config.avatar.promptDescription);
  }

  // Aplinkos aprašymas
  if (config.scene) {
    parts.push(config.scene.promptDescription);
  }

  // Stiliaus aprašymas
  if (config.style) {
    parts.push(config.style.promptDescription);
  }

  // Nuotaikos aprašymas
  if (config.mood) {
    parts.push(config.mood.promptDescription);
  }

  // Vartotojo instrukcijos (poza, formatas)
  if (config.userPrompt.trim()) {
    parts.push(config.userPrompt.trim());
  }

  return parts.join(', ') || 'Professional fashion photo';
}

export const DEFAULT_USER_PROMPT = '';
