import type { Avatar } from '../types';

export const AVATARS: readonly Avatar[] = [
  {
    id: 'modern-city',
    name: 'Miesto Stilius',
    description: 'Jauna moteris miesto aplinkoje, modernus ir profesionalus stilius, pasitikinti laikysena',
    skinTone: 'light',
    vibe: 'urban professional'
  },
  {
    id: 'elegant',
    name: 'Elegantiska',
    description: 'Elegantiska moteris su subtilia estetika, idealiai tinka formaliems drabužiams',
    skinTone: 'medium',
    vibe: 'sophisticated elegance'
  },
  {
    id: 'sporty',
    name: 'Sportine',
    description: 'Atletiska ir energinga moteris, puikiai tinka sportiniams ir casual drabužiams',
    skinTone: 'light',
    vibe: 'athletic dynamic'
  },
  {
    id: 'vintage-indie',
    name: 'Vintage Indie',
    description: 'Bohemisko stiliaus moteris su retro estetika, idealiai tinka vintage drabužiams',
    skinTone: 'medium',
    vibe: 'bohemian retro'
  }
] as const;
