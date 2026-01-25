export const UI_TEXT = {
  header: {
    title: 'Virtualus Drabuziu Modelis',
    subtitle: 'Ikelkite drabuziu nuotraukas ir gaukite profesionalias nuotraukas su modeliu'
  },
  upload: {
    title: 'Ikelti nuotraukas',
    description: 'Paspauskite arba vilkite nuotraukas cia',
    hint: 'JPG arba PNG, iki 3 nuotrauku',
    remove: 'Pasalinti',
    imageOf: 'Nuotrauka'
  },
  config: {
    title: 'Nustatymai',
    avatarLabel: 'Pasirinkite avatara',
    sceneLabel: 'Pasirinkite scena',
    styleLabel: 'Pasirinkite stiliu',
    placeholder: 'Pasirinkite...',
    descriptionLabel: 'Avataro aprasymas'
  },
  actions: {
    generate: 'Generuoti',
    generating: 'Generuojama...',
    cancel: 'At�aukti',
    regenerate: 'Regeneruoti',
    newUpload: 'Naujas upload'
  },
  results: {
    title: 'Sugeneruotos nuotraukos'
  },
  validation: {
    noImages: 'Ikelkite bent viena nuotrauka',
    noAvatar: 'Pasirinkite avatara',
    noScene: 'Pasirinkite scena',
    noStyle: 'Pasirinkite stiliu'
  },
  loading: {
    sending: 'Siunčiama...',
    generating1: 'Generuojama 1/3...',
    generating2: 'Generuojama 2/3...',
    generating3: 'Beveik baigta...',
    complete: 'Baigta!'
  },
  tips: [
    'Patarimas: Geriausi rezultatai su vienspalviais drabužiais',
    'Patarimas: Aiškios nuotraukos duoda geriausius rezultatus',
    'Patarimas: Vengti per daug priedų ar raštų'
  ],
  errors: {
    timeout: 'Užtruko per ilgai. Bandykite dar kartą.',
    network: 'Patikrinkite interneto ryšį ir bandykite dar kartą.',
    api: 'Nepavyko sugeneruoti. Bandykite vėliau.',
    default: 'Įvyko klaida. Bandykite dar kartą.'
  }
} as const;

