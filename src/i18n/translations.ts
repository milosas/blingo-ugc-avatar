export type Language = 'lt' | 'lv' | 'ee' | 'en';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  country: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹', country: 'Lietuva' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻', country: 'Latvija' },
  { code: 'ee', name: 'Eesti', flag: '🇪🇪', country: 'Eesti' }
];

export const translations = {
  lt: {
    header: {
      title: 'UGC Nuotraukų Generatorius',
      subtitle: 'Įkelkite nuotrauką ir sukurkite profesionalias UGC nuotraukas su AI'
    },
    upload: {
      title: 'Įkelti nuotrauką',
      description: 'Paspauskite arba vilkite nuotrauką čia',
      hint: 'JPG arba PNG formatas',
      remove: 'Pašalinti',
      imageOf: 'Nuotrauka'
    },
    config: {
      title: 'Generavimo nustatymai',
      modelLabel: 'Modelis',
      sceneLabel: 'Aplinka',
      styleLabel: 'Stilius',
      moodLabel: 'Nuotaika',
      placeholder: 'Pasirinkite...',
      promptLabel: 'Jūsų instrukcijos',
      promptHint: 'Aprašykite pozą ir formatą (pilnas ūgis, iki pusės, portretas). Spauskite „Improvizuoti" idėjoms.',
      promptPlaceholder: 'pvz. stovi tiesiai, pilnas ūgis, žiūri į kamerą...',
      improvise: 'Improvizuoti',
      technicalSettings: 'Techniniai nustatymai',
      imageCount: 'Nuotraukų kiekis',
      format: 'Formatas',
      quality: 'Kokybė'
    },
    actions: {
      generate: 'Generuoti',
      generating: 'Generuojama...',
      cancel: 'Atšaukti',
      regenerate: 'Generuoti dar kartą',
      newUpload: 'Nauja nuotrauka'
    },
    results: {
      title: 'Sugeneruotos nuotraukos'
    },
    validation: {
      noImages: 'Įkelkite nuotrauką',
      noAvatar: 'Pasirinkite modelį',
      noPrompt: 'Įrašykite instrukcijas (min. 3 simboliai)'
    },
    loading: {
      sending: 'Siunčiama...',
      generating: 'Generuojama...',
      almostDone: 'Beveik baigta...',
      complete: 'Baigta!'
    },
    tips: [
      'Patarimas: Aiškios nuotraukos duoda geriausius rezultatus',
      'Patarimas: Geras apšvietimas labai pagerina kokybę',
      'Patarimas: Detalizuotos instrukcijos = geresni rezultatai',
      'Patarimas: Naudokite aukštą raišką originalui',
      'Patarimas: Išvenkite susiliečusių nuotraukų',
      'Patarimas: Galite generuoti kelias nuotraukas iš karto'
    ],
    errors: {
      timeout: 'Užtruko per ilgai. Bandykite dar kartą.',
      network: 'Patikrinkite interneto ryšį ir bandykite dar kartą.',
      api: 'Nepavyko sugeneruoti. Bandykite vėliau.',
      default: 'Įvyko klaida. Bandykite dar kartą.'
    },
    footer: 'UGC Nuotraukų Generatorius',
    // Options
    avatars: {
      'elegant-woman': { name: 'Elegantiška moteris', description: 'Profesionali, stilinga išvaizda' },
      'casual-woman': { name: 'Kasdienis stilius', description: 'Atsipalaidavusi, kasdienė išvaizda' },
      'athletic-woman': { name: 'Sportinė moteris', description: 'Sportiška, aktyvi išvaizda' },
      'business-man': { name: 'Verslo vyras', description: 'Profesionalus, dalykiškas' },
      'casual-man': { name: 'Kasdienis vyras', description: 'Atsipalaidavęs, paprastas stilius' }
    },
    scenes: {
      'minimal': { name: 'Minimalistinė', description: 'Švarus, paprastas fonas' },
      'photo-studio': { name: 'Foto studija', description: 'Profesionali studijos aplinka' },
      'urban': { name: 'Miesto aplinka', description: 'Gatvės, miesto fonas' },
      'nature': { name: 'Gamta', description: 'Lauko, gamtos aplinka' }
    },
    styles: {
      'casual': { name: 'Kasdienis', description: 'Atsipalaidavęs, kasdieniškas' },
      'sport': { name: 'Sportinis', description: 'Atletiškas, sportiškas' },
      'elegant': { name: 'Elegantiškas', description: 'Rafinuotas, išskirtinis' },
      'streetwear': { name: 'Gatvės mada', description: 'Miestietiška mada' }
    },
    moods: {
      'serious': { name: 'Rimtas', description: 'Profesionalus, susikaupęs' },
      'playful': { name: 'Žaismingas', description: 'Linksmas, energingas' },
      'relaxed': { name: 'Atsipalaidavęs', description: 'Ramus, natūralus' },
      'confident': { name: 'Pasitikintis', description: 'Stiprus, užtikrintas' }
    },
    resolutions: {
      '1K': { name: '1K Standartinė', description: 'Greitesnis generavimas' },
      '2K': { name: '2K Aukšta', description: 'Aukščiausia kokybė' }
    },
    imageCounts: {
      1: { name: '1 nuotrauka', description: 'Greičiau, pigiau' },
      2: { name: '2 nuotraukos', description: 'Daugiau pasirinkimų' },
      3: { name: '3 nuotraukos', description: 'Maksimalus pasirinkimas' }
    }
  },
  lv: {
    header: {
      title: 'UGC Attēlu Ģenerators',
      subtitle: 'Augšupielādējiet attēlu un izveidojiet profesionālus UGC attēlus ar AI'
    },
    upload: {
      title: 'Augšupielādēt attēlu',
      description: 'Noklikšķiniet vai velciet attēlu šeit',
      hint: 'JPG vai PNG formāts',
      remove: 'Noņemt',
      imageOf: 'Attēls'
    },
    config: {
      title: 'Ģenerēšanas iestatījumi',
      modelLabel: 'Modelis',
      sceneLabel: 'Vide',
      styleLabel: 'Stils',
      moodLabel: 'Noskaņojums',
      placeholder: 'Izvēlieties...',
      promptLabel: 'Jūsu instrukcijas',
      promptHint: 'Aprakstiet pozu un formātu (pilns augums, līdz vidum, portrets). Spiediet „Improvizēt" idejām.',
      promptPlaceholder: 'piem. stāv taisni, pilns augums, skatās kamerā...',
      improvise: 'Improvizēt',
      technicalSettings: 'Tehniskie iestatījumi',
      imageCount: 'Attēlu skaits',
      format: 'Formāts',
      quality: 'Kvalitāte'
    },
    actions: {
      generate: 'Ģenerēt',
      generating: 'Ģenerē...',
      cancel: 'Atcelt',
      regenerate: 'Ģenerēt vēlreiz',
      newUpload: 'Jauns attēls'
    },
    results: {
      title: 'Ģenerētie attēli'
    },
    validation: {
      noImages: 'Augšupielādējiet attēlu',
      noAvatar: 'Izvēlieties modeli',
      noPrompt: 'Ievadiet instrukcijas (min. 3 simboli)'
    },
    loading: {
      sending: 'Sūta...',
      generating: 'Ģenerē...',
      almostDone: 'Gandrīz gatavs...',
      complete: 'Pabeigts!'
    },
    tips: [
      'Padoms: Skaidri attēli dod labākos rezultātus',
      'Padoms: Labs apgaismojums ļoti uzlabo kvalitāti',
      'Padoms: Detalizētas instrukcijas = labāki rezultāti',
      'Padoms: Izmantojiet augstu izšķirtspēju oriģinālam',
      'Padoms: Izvairieties no izplūdušiem attēliem',
      'Padoms: Varat ģenerēt vairākus attēlus vienlaicīgi'
    ],
    errors: {
      timeout: 'Pārāk ilgi. Mēģiniet vēlreiz.',
      network: 'Pārbaudiet interneta savienojumu un mēģiniet vēlreiz.',
      api: 'Neizdevās ģenerēt. Mēģiniet vēlāk.',
      default: 'Radās kļūda. Mēģiniet vēlreiz.'
    },
    footer: 'UGC Attēlu Ģenerators',
    avatars: {
      'elegant-woman': { name: 'Eleganta sieviete', description: 'Profesionāls, stilīgs izskats' },
      'casual-woman': { name: 'Ikdienas stils', description: 'Atslābināts, ikdienas izskats' },
      'athletic-woman': { name: 'Sportiska sieviete', description: 'Sportisks, aktīvs izskats' },
      'business-man': { name: 'Biznesa vīrietis', description: 'Profesionāls, lietišķs' },
      'casual-man': { name: 'Ikdienas vīrietis', description: 'Atslābināts, vienkāršs stils' }
    },
    scenes: {
      'minimal': { name: 'Minimālistisks', description: 'Tīrs, vienkāršs fons' },
      'photo-studio': { name: 'Foto studija', description: 'Profesionāla studijas vide' },
      'urban': { name: 'Pilsētas vide', description: 'Ielas, pilsētas fons' },
      'nature': { name: 'Daba', description: 'Āra, dabas vide' }
    },
    styles: {
      'casual': { name: 'Ikdienas', description: 'Atslābināts, ikdienišķs' },
      'sport': { name: 'Sportisks', description: 'Atlētisks, sportisks' },
      'elegant': { name: 'Elegants', description: 'Rafinēts, izsmalcināts' },
      'streetwear': { name: 'Ielas mode', description: 'Pilsētas mode' }
    },
    moods: {
      'serious': { name: 'Nopietns', description: 'Profesionāls, koncentrēts' },
      'playful': { name: 'Rotaļīgs', description: 'Jautrs, enerģisks' },
      'relaxed': { name: 'Atslābināts', description: 'Mierīgs, dabisks' },
      'confident': { name: 'Pārliecināts', description: 'Spēcīgs, drošs' }
    },
    resolutions: {
      '1K': { name: '1K Standarta', description: 'Ātrāka ģenerēšana' },
      '2K': { name: '2K Augsta', description: 'Augstākā kvalitāte' }
    },
    imageCounts: {
      1: { name: '1 attēls', description: 'Ātrāk, lētāk' },
      2: { name: '2 attēli', description: 'Vairāk izvēļu' },
      3: { name: '3 attēli', description: 'Maksimāla izvēle' }
    }
  },
  ee: {
    header: {
      title: 'UGC Piltide Generaator',
      subtitle: 'Laadige pilt üles ja looge professionaalseid UGC pilte AI-ga'
    },
    upload: {
      title: 'Laadi pilt üles',
      description: 'Klõpsake või lohistage pilt siia',
      hint: 'JPG või PNG formaat',
      remove: 'Eemalda',
      imageOf: 'Pilt'
    },
    config: {
      title: 'Genereerimise seaded',
      modelLabel: 'Mudel',
      sceneLabel: 'Keskkond',
      styleLabel: 'Stiil',
      moodLabel: 'Meeleolu',
      placeholder: 'Valige...',
      promptLabel: 'Teie juhised',
      promptHint: 'Kirjeldage poosi ja formaati (täispikkus, poolpikkus, portree). Vajutage „Improviseeri" ideedeks.',
      promptPlaceholder: 'nt seisab otse, täispikkus, vaatab kaamerasse...',
      improvise: 'Improviseeri',
      technicalSettings: 'Tehnilised seaded',
      imageCount: 'Piltide arv',
      format: 'Formaat',
      quality: 'Kvaliteet'
    },
    actions: {
      generate: 'Genereeri',
      generating: 'Genereerin...',
      cancel: 'Tühista',
      regenerate: 'Genereeri uuesti',
      newUpload: 'Uus pilt'
    },
    results: {
      title: 'Genereeritud pildid'
    },
    validation: {
      noImages: 'Laadige pilt üles',
      noAvatar: 'Valige mudel',
      noPrompt: 'Sisestage juhised (min. 3 sümbolit)'
    },
    loading: {
      sending: 'Saadan...',
      generating: 'Genereerin...',
      almostDone: 'Peaaegu valmis...',
      complete: 'Valmis!'
    },
    tips: [
      'Nõuanne: Selged pildid annavad parimaid tulemusi',
      'Nõuanne: Hea valgustus parandab kvaliteeti oluliselt',
      'Nõuanne: Üksikasjalikud juhised = paremad tulemused',
      'Nõuanne: Kasutage originaali jaoks kõrget eraldusvõimet',
      'Nõuanne: Vältige uduseid pilte',
      'Nõuanne: Saate genereerida mitu pilti korraga'
    ],
    errors: {
      timeout: 'Võttis liiga kaua. Proovige uuesti.',
      network: 'Kontrollige internetiühendust ja proovige uuesti.',
      api: 'Genereerimine ebaõnnestus. Proovige hiljem.',
      default: 'Tekkis viga. Proovige uuesti.'
    },
    footer: 'UGC Piltide Generaator',
    avatars: {
      'elegant-woman': { name: 'Elegantne naine', description: 'Professionaalne, stiilne välimus' },
      'casual-woman': { name: 'Vabaaeg stiil', description: 'Lõõgastunud, igapäevane välimus' },
      'athletic-woman': { name: 'Sportlik naine', description: 'Sportlik, aktiivne välimus' },
      'business-man': { name: 'Ärimees', description: 'Professionaalne, asjalik' },
      'casual-man': { name: 'Vabaaeg mees', description: 'Lõõgastunud, lihtne stiil' }
    },
    scenes: {
      'minimal': { name: 'Minimalistlik', description: 'Puhas, lihtne taust' },
      'photo-studio': { name: 'Fotostuudio', description: 'Professionaalne stuudiokeskkond' },
      'urban': { name: 'Linnakeskkond', description: 'Tänav, linna taust' },
      'nature': { name: 'Loodus', description: 'Väli, looduskeskkond' }
    },
    styles: {
      'casual': { name: 'Vabaaeg', description: 'Lõõgastunud, igapäevane' },
      'sport': { name: 'Sportlik', description: 'Atleetiline, sportlik' },
      'elegant': { name: 'Elegantne', description: 'Rafineeritud, eriline' },
      'streetwear': { name: 'Tänavamood', description: 'Linnamood' }
    },
    moods: {
      'serious': { name: 'Tõsine', description: 'Professionaalne, keskendunud' },
      'playful': { name: 'Mänguline', description: 'Lõbus, energiline' },
      'relaxed': { name: 'Lõõgastunud', description: 'Rahulik, loomulik' },
      'confident': { name: 'Enesekindel', description: 'Tugev, kindel' }
    },
    resolutions: {
      '1K': { name: '1K Standard', description: 'Kiirem genereerimine' },
      '2K': { name: '2K Kõrge', description: 'Kõrgeim kvaliteet' }
    },
    imageCounts: {
      1: { name: '1 pilt', description: 'Kiirem, odavam' },
      2: { name: '2 pilti', description: 'Rohkem valikuid' },
      3: { name: '3 pilti', description: 'Maksimaalne valik' }
    }
  },
  en: {
    header: {
      title: 'UGC Photo Generator',
      subtitle: 'Upload a photo and create professional UGC images with AI'
    },
    upload: {
      title: 'Upload photo',
      description: 'Click or drag a photo here',
      hint: 'JPG or PNG format',
      remove: 'Remove',
      imageOf: 'Photo'
    },
    config: {
      title: 'Generation settings',
      modelLabel: 'Model',
      sceneLabel: 'Scene',
      styleLabel: 'Style',
      moodLabel: 'Mood',
      placeholder: 'Select...',
      promptLabel: 'Your instructions',
      promptHint: 'Describe the pose and format (full body, waist up, portrait). Click "Improvise" for ideas.',
      promptPlaceholder: 'e.g. standing straight, full body, looking at camera...',
      improvise: 'Improvise',
      technicalSettings: 'Technical settings',
      imageCount: 'Number of photos',
      format: 'Format',
      quality: 'Quality'
    },
    actions: {
      generate: 'Generate',
      generating: 'Generating...',
      cancel: 'Cancel',
      regenerate: 'Generate again',
      newUpload: 'New photo'
    },
    results: {
      title: 'Generated photos'
    },
    validation: {
      noImages: 'Upload a photo',
      noAvatar: 'Select a model',
      noPrompt: 'Enter instructions (min. 3 characters)'
    },
    loading: {
      sending: 'Sending...',
      generating: 'Generating...',
      almostDone: 'Almost done...',
      complete: 'Complete!'
    },
    tips: [
      'Tip: Clear photos give the best results',
      'Tip: Good lighting greatly improves quality',
      'Tip: Detailed instructions = better results',
      'Tip: Use high resolution for the original',
      'Tip: Avoid blurry photos',
      'Tip: You can generate multiple photos at once'
    ],
    errors: {
      timeout: 'Took too long. Please try again.',
      network: 'Check your internet connection and try again.',
      api: 'Failed to generate. Please try later.',
      default: 'An error occurred. Please try again.'
    },
    footer: 'UGC Photo Generator',
    avatars: {
      'elegant-woman': { name: 'Elegant woman', description: 'Professional, stylish look' },
      'casual-woman': { name: 'Casual style', description: 'Relaxed, everyday look' },
      'athletic-woman': { name: 'Athletic woman', description: 'Sporty, active look' },
      'business-man': { name: 'Business man', description: 'Professional, business-like' },
      'casual-man': { name: 'Casual man', description: 'Relaxed, simple style' }
    },
    scenes: {
      'minimal': { name: 'Minimalist', description: 'Clean, simple background' },
      'photo-studio': { name: 'Photo studio', description: 'Professional studio environment' },
      'urban': { name: 'Urban', description: 'Street, city background' },
      'nature': { name: 'Nature', description: 'Outdoor, natural setting' }
    },
    styles: {
      'casual': { name: 'Casual', description: 'Relaxed, everyday' },
      'sport': { name: 'Sporty', description: 'Athletic, sporty' },
      'elegant': { name: 'Elegant', description: 'Refined, distinguished' },
      'streetwear': { name: 'Streetwear', description: 'Urban fashion' }
    },
    moods: {
      'serious': { name: 'Serious', description: 'Professional, focused' },
      'playful': { name: 'Playful', description: 'Fun, energetic' },
      'relaxed': { name: 'Relaxed', description: 'Calm, natural' },
      'confident': { name: 'Confident', description: 'Strong, assured' }
    },
    resolutions: {
      '1K': { name: '1K Standard', description: 'Faster generation' },
      '2K': { name: '2K High', description: 'Highest quality' }
    },
    imageCounts: {
      1: { name: '1 photo', description: 'Faster, cheaper' },
      2: { name: '2 photos', description: 'More choices' },
      3: { name: '3 photos', description: 'Maximum selection' }
    }
  }
} as const;

// Use a deep writable type to allow any language's translations
type DeepString<T> = T extends string ? string : { [K in keyof T]: DeepString<T[K]> };
export type Translations = DeepString<typeof translations.lt>;
