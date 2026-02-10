export interface TraitOption {
  id: string;
  promptValue: string;
  labels: {
    lt: string;
    lv: string;
    ee: string;
    en: string;
  };
}

export interface TraitCategory {
  id: string;
  labels: {
    lt: string;
    lv: string;
    ee: string;
    en: string;
  };
  options: TraitOption[];
}

export const GENDER_OPTIONS: TraitOption[] = [
  { id: 'male', promptValue: 'male', labels: { lt: 'Vyras', lv: 'Vīrietis', ee: 'Mees', en: 'Male' } },
  { id: 'female', promptValue: 'female', labels: { lt: 'Moteris', lv: 'Sieviete', ee: 'Naine', en: 'Female' } },
];

export const ETHNICITY_OPTIONS: TraitOption[] = [
  { id: 'european', promptValue: 'European', labels: { lt: 'Europietis', lv: 'Eiropietis', ee: 'Eurooplane', en: 'European' } },
  { id: 'asian', promptValue: 'East Asian', labels: { lt: 'Azijietis', lv: 'Āzijas', ee: 'Aasia', en: 'Asian' } },
  { id: 'african', promptValue: 'African', labels: { lt: 'Afrikietis', lv: 'Āfrikānis', ee: 'Aafrika', en: 'African' } },
  { id: 'latin', promptValue: 'Latin American', labels: { lt: 'Lotynų Amerikos', lv: 'Latīņamerikas', ee: 'Ladina-Ameerika', en: 'Latin American' } },
  { id: 'middle-eastern', promptValue: 'Middle Eastern', labels: { lt: 'Artimųjų Rytų', lv: 'Tuvo Austrumu', ee: 'Lähis-Ida', en: 'Middle Eastern' } },
  { id: 'south-asian', promptValue: 'South Asian', labels: { lt: 'Pietų Azijos', lv: 'Dienvidāzijas', ee: 'Lõuna-Aasia', en: 'South Asian' } },
];

export const SKIN_TONE_OPTIONS: TraitOption[] = [
  { id: 'light', promptValue: 'light', labels: { lt: 'Šviesi', lv: 'Gaišs', ee: 'Hele', en: 'Light' } },
  { id: 'medium', promptValue: 'medium', labels: { lt: 'Vidutinė', lv: 'Vidējs', ee: 'Keskmine', en: 'Medium' } },
  { id: 'olive', promptValue: 'olive', labels: { lt: 'Alyvuogių', lv: 'Olīvu', ee: 'Oliiv', en: 'Olive' } },
  { id: 'tan', promptValue: 'tan', labels: { lt: 'Įdegusi', lv: 'Iedegums', ee: 'Päevitunud', en: 'Tan' } },
  { id: 'brown', promptValue: 'brown', labels: { lt: 'Ruda', lv: 'Brūns', ee: 'Pruun', en: 'Brown' } },
  { id: 'dark', promptValue: 'dark', labels: { lt: 'Tamsi', lv: 'Tumšs', ee: 'Tume', en: 'Dark' } },
];

export const HAIR_COLOR_OPTIONS: TraitOption[] = [
  { id: 'blonde', promptValue: 'blonde', labels: { lt: 'Šviesūs', lv: 'Blondi', ee: 'Blondid', en: 'Blonde' } },
  { id: 'brown', promptValue: 'brown', labels: { lt: 'Rudi', lv: 'Brūni', ee: 'Pruunid', en: 'Brown' } },
  { id: 'black', promptValue: 'black', labels: { lt: 'Juodi', lv: 'Melni', ee: 'Mustad', en: 'Black' } },
  { id: 'red', promptValue: 'red', labels: { lt: 'Raudoni', lv: 'Sarkani', ee: 'Punased', en: 'Red' } },
  { id: 'gray', promptValue: 'gray', labels: { lt: 'Žili', lv: 'Sirmi', ee: 'Hallid', en: 'Gray' } },
];

export const HAIR_LENGTH_OPTIONS: TraitOption[] = [
  { id: 'short', promptValue: 'short', labels: { lt: 'Trumpi', lv: 'Īsi', ee: 'Lühikesed', en: 'Short' } },
  { id: 'medium', promptValue: 'medium-length', labels: { lt: 'Vidutiniai', lv: 'Vidēji', ee: 'Keskmised', en: 'Medium' } },
  { id: 'long', promptValue: 'long', labels: { lt: 'Ilgi', lv: 'Gari', ee: 'Pikad', en: 'Long' } },
  { id: 'bald', promptValue: 'bald', labels: { lt: 'Plikas', lv: 'Pliks', ee: 'Kiilaspäine', en: 'Bald' } },
];

export const AGE_OPTIONS: TraitOption[] = [
  { id: '20s', promptValue: '25 year old', labels: { lt: '20-29', lv: '20-29', ee: '20-29', en: '20s' } },
  { id: '30s', promptValue: '35 year old', labels: { lt: '30-39', lv: '30-39', ee: '30-39', en: '30s' } },
  { id: '40s', promptValue: '45 year old', labels: { lt: '40-49', lv: '40-49', ee: '40-49', en: '40s' } },
  { id: '50s', promptValue: '55 year old', labels: { lt: '50-59', lv: '50-59', ee: '50-59', en: '50s' } },
  { id: '60s', promptValue: '65 year old', labels: { lt: '60+', lv: '60+', ee: '60+', en: '60s' } },
];

export const BODY_TYPE_OPTIONS: TraitOption[] = [
  { id: 'slim', promptValue: 'slim', labels: { lt: 'Liekna', lv: 'Slaida', ee: 'Sale', en: 'Slim' } },
  { id: 'average', promptValue: 'average', labels: { lt: 'Vidutinio sudėjimo', lv: 'Vidēja auguma', ee: 'Keskmise', en: 'Average' } },
  { id: 'athletic', promptValue: 'athletic', labels: { lt: 'Atletiška', lv: 'Atlētiska', ee: 'Atleetlik', en: 'Athletic' } },
  { id: 'curvy', promptValue: 'curvy', labels: { lt: 'Apvali', lv: 'Apaļīga', ee: 'Kurvikas', en: 'Curvy' } },
  { id: 'plus-size', promptValue: 'plus size', labels: { lt: 'Prigludusi', lv: 'Pilnīga', ee: 'Plussuurus', en: 'Plus size' } },
];

export const FRAMING_OPTIONS: TraitOption[] = [
  { id: 'headshot', promptValue: 'headshot', labels: { lt: 'Portretas', lv: 'Portrets', ee: 'Portree', en: 'Headshot' } },
  { id: 'half-body', promptValue: 'half body', labels: { lt: 'Pusė kūno', lv: 'Puse ķermeņa', ee: 'Pool keha', en: 'Half body' } },
  { id: 'full-body', promptValue: 'full body', labels: { lt: 'Pilnas kūnas', lv: 'Pilns ķermenis', ee: 'Täiskasvus', en: 'Full body' } },
];

export interface AvatarTraits {
  gender: string;
  ethnicity: string;
  skinTone: string;
  hairColor: string;
  hairLength: string;
  age: string;
  bodyType: string;
  framing: string;
}

export const DEFAULT_TRAITS: AvatarTraits = {
  gender: 'female',
  ethnicity: 'european',
  skinTone: 'light',
  hairColor: 'brown',
  hairLength: 'long',
  age: '30s',
  bodyType: 'average',
  framing: 'full-body',
};

export function buildAvatarPrompt(traits: AvatarTraits, specialFeatures: string): string {
  const gender = GENDER_OPTIONS.find(o => o.id === traits.gender)?.promptValue || traits.gender;
  const ethnicity = ETHNICITY_OPTIONS.find(o => o.id === traits.ethnicity)?.promptValue || traits.ethnicity;
  const skin = SKIN_TONE_OPTIONS.find(o => o.id === traits.skinTone)?.promptValue || traits.skinTone;
  const hairColor = HAIR_COLOR_OPTIONS.find(o => o.id === traits.hairColor)?.promptValue || traits.hairColor;
  const hairLength = HAIR_LENGTH_OPTIONS.find(o => o.id === traits.hairLength)?.promptValue || traits.hairLength;
  const age = AGE_OPTIONS.find(o => o.id === traits.age)?.promptValue || traits.age;
  const bodyType = BODY_TYPE_OPTIONS.find(o => o.id === traits.bodyType)?.promptValue || traits.bodyType;
  const framing = FRAMING_OPTIONS.find(o => o.id === traits.framing)?.promptValue || traits.framing;

  const hairPart = traits.hairLength === 'bald'
    ? 'bald head'
    : `${hairColor} ${hairLength} hair`;

  let prompt = `Professional ${framing} photograph of a ${age} ${ethnicity} ${gender} with ${skin} skin, ${bodyType} build, and ${hairPart}, studio lighting, clean white background, high quality, photorealistic`;

  if (specialFeatures.trim()) {
    prompt = `Professional ${framing} photograph of a ${age} ${ethnicity} ${gender} with ${skin} skin, ${bodyType} build, and ${hairPart}, ${specialFeatures.trim()}, studio lighting, clean white background, high quality, photorealistic`;
  }

  return prompt;
}

export function buildTraitDescription(traits: AvatarTraits, lang: 'lt' | 'lv' | 'ee' | 'en'): string {
  const gender = GENDER_OPTIONS.find(o => o.id === traits.gender)?.labels[lang] || traits.gender;
  const ethnicity = ETHNICITY_OPTIONS.find(o => o.id === traits.ethnicity)?.labels[lang] || traits.ethnicity;
  const hairColor = HAIR_COLOR_OPTIONS.find(o => o.id === traits.hairColor)?.labels[lang] || traits.hairColor;
  const hairLength = HAIR_LENGTH_OPTIONS.find(o => o.id === traits.hairLength)?.labels[lang] || traits.hairLength;
  const age = AGE_OPTIONS.find(o => o.id === traits.age)?.labels[lang] || traits.age;
  const bodyType = BODY_TYPE_OPTIONS.find(o => o.id === traits.bodyType)?.labels[lang] || traits.bodyType;

  return `${gender}, ${ethnicity}, ${age}, ${bodyType}, ${hairColor} ${hairLength}`;
}
