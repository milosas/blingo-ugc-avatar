export interface TraitOption {
  id: string;
  promptValue: string;
  /** Localized prompt-level descriptions (longer, for AI prompt) */
  promptI18n?: {
    lt: string;
    lv: string;
    ee: string;
    en: string;
  };
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

type Lang = 'lt' | 'lv' | 'ee' | 'en';

function getPrompt(option: TraitOption | undefined, lang: Lang): string {
  if (!option) return '';
  return option.promptI18n?.[lang] || option.promptValue;
}

function getLabel(option: TraitOption | undefined, lang: Lang): string {
  if (!option) return '';
  return option.labels[lang] || option.promptValue;
}

// === IDENTITY TRAITS (fixed per model) ===

export const GENDER_OPTIONS: TraitOption[] = [
  { id: 'female', promptValue: 'woman', labels: { lt: 'Moteris', lv: 'Sieviete', ee: 'Naine', en: 'Female' } },
  { id: 'male', promptValue: 'man', labels: { lt: 'Vyras', lv: 'Vīrietis', ee: 'Mees', en: 'Male' } },
];

export const AGE_OPTIONS: TraitOption[] = [
  { id: '20s', promptValue: '25 year old', labels: { lt: '20-29', lv: '20-29', ee: '20-29', en: '20s' } },
  { id: '30s', promptValue: '35 year old', labels: { lt: '30-39', lv: '30-39', ee: '30-39', en: '30s' } },
  { id: '40s', promptValue: '45 year old', labels: { lt: '40-49', lv: '40-49', ee: '40-49', en: '40s' } },
  { id: '50s', promptValue: '55 year old', labels: { lt: '50-59', lv: '50-59', ee: '50-59', en: '50s' } },
  { id: '60s', promptValue: '65 year old', labels: { lt: '60+', lv: '60+', ee: '60+', en: '60+' } },
];

export const ETHNICITY_OPTIONS: TraitOption[] = [
  { id: 'european', promptValue: 'Caucasian European', labels: { lt: 'Europietis', lv: 'Eiropietis', ee: 'Eurooplane', en: 'European' } },
  { id: 'asian', promptValue: 'East Asian', labels: { lt: 'Azijietis', lv: 'Āzijas', ee: 'Aasia', en: 'Asian' } },
  { id: 'african', promptValue: 'Black African', labels: { lt: 'Afrikietis', lv: 'Āfrikānis', ee: 'Aafrika', en: 'African' } },
  { id: 'latin', promptValue: 'Hispanic Latino', labels: { lt: 'Lotynų Amerikos', lv: 'Latīņamerikas', ee: 'Ladina-Ameerika', en: 'Latin American' } },
  { id: 'middle-eastern', promptValue: 'Middle Eastern', labels: { lt: 'Artimųjų Rytų', lv: 'Tuvo Austrumu', ee: 'Lähis-Ida', en: 'Middle Eastern' } },
  { id: 'south-asian', promptValue: 'South Asian Indian', labels: { lt: 'Pietų Azijos', lv: 'Dienvidāzijas', ee: 'Lõuna-Aasia', en: 'South Asian' } },
];

export const HAIR_LENGTH_OPTIONS: TraitOption[] = [
  { id: 'short', promptValue: 'short', labels: { lt: 'Trumpi', lv: 'Īsi', ee: 'Lühikesed', en: 'Short' } },
  { id: 'medium', promptValue: 'medium-length', labels: { lt: 'Vidutiniai', lv: 'Vidēji', ee: 'Keskmised', en: 'Medium' } },
  { id: 'long', promptValue: 'long', labels: { lt: 'Ilgi', lv: 'Gari', ee: 'Pikad', en: 'Long' } },
  { id: 'bald', promptValue: 'bald', labels: { lt: 'Plikas', lv: 'Pliks', ee: 'Kiilaspäine', en: 'Bald' } },
];

export const HAIR_COLOR_OPTIONS: TraitOption[] = [
  { id: 'black', promptValue: 'black', labels: { lt: 'Juodi', lv: 'Melni', ee: 'Mustad', en: 'Black' } },
  { id: 'brown', promptValue: 'brown', labels: { lt: 'Rudi', lv: 'Brūni', ee: 'Pruunid', en: 'Brown' } },
  { id: 'blonde', promptValue: 'blonde', labels: { lt: 'Šviesūs', lv: 'Blondi', ee: 'Blondid', en: 'Blonde' } },
  { id: 'red', promptValue: 'red', labels: { lt: 'Raudoni', lv: 'Sarkani', ee: 'Punased', en: 'Red' } },
];

// === VARIABLE TRAITS (change per photo) ===

export const FRAMING_OPTIONS: TraitOption[] = [
  { id: 'headshot', promptValue: 'close-up headshot photo', labels: { lt: 'Portretas', lv: 'Portrets', ee: 'Portree', en: 'Headshot' } },
  { id: 'half-body', promptValue: 'medium shot photo from waist up', labels: { lt: 'Pusė kūno', lv: 'Puse ķermeņa', ee: 'Pool keha', en: 'Half body' } },
  { id: 'full-body', promptValue: 'wide full-body shot showing head to feet', labels: { lt: 'Pilnas kūnas', lv: 'Pilns ķermenis', ee: 'Täiskasvus', en: 'Full body' } },
];

export const POSE_OPTIONS: TraitOption[] = [
  { id: 'standing-front', promptValue: 'standing facing camera',
    promptI18n: { lt: 'stovi priešais kamerą', lv: 'stāv pret kameru', ee: 'seisab kaamera poole', en: 'standing facing camera' },
    labels: { lt: 'Stovi iš priekio', lv: 'Stāv priekšā', ee: 'Seisab eestvaates', en: 'Standing front' } },
  { id: 'standing-side', promptValue: 'standing three-quarter angle',
    promptI18n: { lt: 'stovi pusiau pasukęs', lv: 'stāv trīs ceturtdaļu skatā', ee: 'seisab kolmveerand vaates', en: 'standing three-quarter angle' },
    labels: { lt: 'Stovi iš šono', lv: 'Stāv sānskatā', ee: 'Seisab küljelt', en: 'Side angle' } },
  { id: 'sitting', promptValue: 'sitting on a chair looking at camera',
    promptI18n: { lt: 'sėdi ant kėdės, žiūri į kamerą', lv: 'sēž uz krēsla, skatās kamerā', ee: 'istub toolil, vaatab kaamerasse', en: 'sitting on a chair looking at camera' },
    labels: { lt: 'Sėdi', lv: 'Sēž', ee: 'Istub', en: 'Sitting' } },
  { id: 'walking', promptValue: 'walking towards camera',
    promptI18n: { lt: 'eina link kameros', lv: 'iet pret kameru', ee: 'kõnnib kaamera poole', en: 'walking towards camera' },
    labels: { lt: 'Eina', lv: 'Iet', ee: 'Kõnnib', en: 'Walking' } },
  { id: 'arms-crossed', promptValue: 'standing with arms crossed',
    promptI18n: { lt: 'stovi sukryžiavęs rankas', lv: 'stāv ar sakrustotām rokām', ee: 'seisab käed risti', en: 'standing with arms crossed' },
    labels: { lt: 'Sukryžiuotos rankos', lv: 'Sakrustotas rokas', ee: 'Käed risti', en: 'Arms crossed' } },
  { id: 'hand-on-hip', promptValue: 'standing with hand on hip',
    promptI18n: { lt: 'stovi ranka ant klubo', lv: 'stāv ar roku uz gūžas', ee: 'seisab käega puusal', en: 'standing with hand on hip' },
    labels: { lt: 'Ranka ant klubo', lv: 'Roka uz gūžas', ee: 'Käsi puusal', en: 'Hand on hip' } },
];

export const MOOD_OPTIONS: TraitOption[] = [
  { id: 'neutral', promptValue: 'neutral expression',
    promptI18n: { lt: 'neutrali išraiška', lv: 'neitrāla izteiksme', ee: 'neutraalne ilme', en: 'neutral expression' },
    labels: { lt: 'Neutrali', lv: 'Neitrāla', ee: 'Neutraalne', en: 'Neutral' } },
  { id: 'smiling', promptValue: 'genuine smile',
    promptI18n: { lt: 'nuoširdi šypsena', lv: 'patiess smaids', ee: 'siiras naeratus', en: 'genuine smile' },
    labels: { lt: 'Šypsosi', lv: 'Smaida', ee: 'Naeratab', en: 'Smiling' } },
  { id: 'serious', promptValue: 'serious confident look',
    promptI18n: { lt: 'rimtas pasitikintis žvilgsnis', lv: 'nopietns pārliecināts skatiens', ee: 'tõsine enesekindel pilk', en: 'serious confident look' },
    labels: { lt: 'Rimta', lv: 'Nopietna', ee: 'Tõsine', en: 'Serious' } },
  { id: 'elegant', promptValue: 'elegant poised expression',
    promptI18n: { lt: 'elegantiška santūri išraiška', lv: 'eleganta savaldīga izteiksme', ee: 'elegantne tasakaalukas ilme', en: 'elegant poised expression' },
    labels: { lt: 'Elegantiška', lv: 'Eleganta', ee: 'Elegantne', en: 'Elegant' } },
];

// === TRAITS TYPE ===

export interface AvatarTraits {
  gender: string;
  ethnicity: string;
  hairLength: string;
  hairColor: string;
  age: string;
  framing: string;
  pose: string;
  mood: string;
}

export const DEFAULT_TRAITS: AvatarTraits = {
  gender: 'female',
  ethnicity: 'european',
  hairLength: 'long',
  hairColor: 'brown',
  age: '30s',
  framing: 'full-body',
  pose: 'standing-front',
  mood: 'neutral',
};

/**
 * Build avatar prompt — FLUX.2 best practices:
 * - Subject first (FLUX weights early words most)
 * - 30-50 words max (longer = ignored)
 * - No "portrait" with "full body" (conflicts)
 * - Technical camera terms trigger photorealism training data
 * - No negative prompts (describe what you WANT)
 */
export function buildAvatarPrompt(traits: AvatarTraits, specialFeatures: string, lang: Lang = 'en'): string {
  const age = getPrompt(AGE_OPTIONS.find(o => o.id === traits.age), lang);
  const ethnicity = getPrompt(ETHNICITY_OPTIONS.find(o => o.id === traits.ethnicity), lang);
  const gender = getPrompt(GENDER_OPTIONS.find(o => o.id === traits.gender), lang);
  const hairLength = getPrompt(HAIR_LENGTH_OPTIONS.find(o => o.id === traits.hairLength), lang);
  const hairColor = getPrompt(HAIR_COLOR_OPTIONS.find(o => o.id === traits.hairColor), lang);
  const framing = getPrompt(FRAMING_OPTIONS.find(o => o.id === traits.framing), lang);
  const pose = getPrompt(POSE_OPTIONS.find(o => o.id === traits.pose), lang);
  const mood = getPrompt(MOOD_OPTIONS.find(o => o.id === traits.mood), lang);

  // "bald" doesn't need color
  const hair = traits.hairLength === 'bald' ? 'bald head' : `${hairLength} ${hairColor} hair`;

  // Structure: Subject → Action → Style
  const parts = [
    `${framing} of a ${age} ${ethnicity} ${gender} with ${hair}`,
    `${pose}, ${mood}`,
  ];

  if (specialFeatures.trim()) {
    parts.push(specialFeatures.trim());
  }

  // Technical suffix — EN uses camera terms, others use generic
  if (lang === 'en') {
    parts.push('shot on 85mm lens, soft studio lighting, neutral background');
  } else {
    const suffixes: Record<string, string> = {
      lt: 'studijinis apšvietimas, neutralus fonas',
      lv: 'studijas apgaismojums, neitrāls fons',
      ee: 'stuudiovalgus, neutraalne taust',
    };
    parts.push(suffixes[lang] || suffixes.lt);
  }

  return parts.join(', ');
}

/**
 * Build prompt for additional photo of existing model.
 * Identity comes from InstantID face reference.
 */
export function buildPosePrompt(
  _baseDescription: string,
  pose: string,
  mood: string,
  framing: string,
  specialFeatures: string,
  lang: Lang = 'en',
): string {
  const framingVal = getPrompt(FRAMING_OPTIONS.find(o => o.id === framing), lang);
  const poseVal = getPrompt(POSE_OPTIONS.find(o => o.id === pose), lang);
  const moodVal = getPrompt(MOOD_OPTIONS.find(o => o.id === mood), lang);

  const parts = [
    `same person, ${framingVal}, ${poseVal}, ${moodVal}`,
  ];

  if (specialFeatures.trim()) {
    parts.push(specialFeatures.trim());
  }

  if (lang === 'en') {
    parts.push('shot on 85mm lens, soft studio lighting, neutral background');
  } else {
    const suffixes: Record<string, string> = {
      lt: 'studijinis apšvietimas, neutralus fonas',
      lv: 'studijas apgaismojums, neitrāls fons',
      ee: 'stuudiovalgus, neutraalne taust',
    };
    parts.push(suffixes[lang] || suffixes.lt);
  }

  return parts.join(', ');
}

export function buildTraitDescription(traits: AvatarTraits, lang: Lang): string {
  const gender = getLabel(GENDER_OPTIONS.find(o => o.id === traits.gender), lang);
  const ethnicity = getLabel(ETHNICITY_OPTIONS.find(o => o.id === traits.ethnicity), lang);
  const hairLength = getLabel(HAIR_LENGTH_OPTIONS.find(o => o.id === traits.hairLength), lang);
  const hairColor = getLabel(HAIR_COLOR_OPTIONS.find(o => o.id === traits.hairColor), lang);
  const age = getLabel(AGE_OPTIONS.find(o => o.id === traits.age), lang);
  const hair = traits.hairLength === 'bald' ? hairLength : `${hairLength} ${hairColor}`;

  return `${gender}, ${ethnicity}, ${age}, ${hair}`;
}
