export const UI_TEXT = {
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
    title: 'Nustatymai',
    avatarLabel: 'Pasirinkite modelį',
    sceneLabel: 'Pasirinkite aplinką',
    styleLabel: 'Pasirinkite stilių',
    moodLabel: 'Pasirinkite nuotaiką',
    placeholder: 'Pasirinkite...',
    promptLabel: 'Jūsų instrukcijos',
    promptHint: 'Aprašykite, ką norite matyti nuotraukoje'
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
  }
} as const;
