import type { Style } from '../types';

export const STYLES: readonly Style[] = [
  {
    id: 'casual',
    name: 'Casual',
    description: 'Kasdieniskas, patogus stilius'
  },
  {
    id: 'formal',
    name: 'Formali',
    description: 'Profesionalus, elegantiskas stilius'
  },
  {
    id: 'sporty',
    name: 'Sportine',
    description: 'Atletiska, dinamiska estetika'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Retro, bohemiska estetika'
  }
] as const;
