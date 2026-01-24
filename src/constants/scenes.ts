import type { Scene } from '../types';

export const SCENES: readonly Scene[] = [
  {
    id: 'studio',
    name: 'Moderni Studija',
    description: 'Baltas/pilkas fonas su profesionaliu apsvietimu'
  },
  {
    id: 'urban',
    name: 'Gatve (Urban)',
    description: 'Miesto aplinka su naturalia šviesa'
  },
  {
    id: 'minimal',
    name: 'Minimalizmas',
    description: 'Svarus fonas su zen estetika'
  }
] as const;
