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
      title: 'reEDITme',
      subtitle: 'Produktų nuotraukos ir turinys su AI — be fotografo, be studijos'
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
      sceneLabel: 'Scena / Fonas',
      styleLabel: 'Stilius',
      moodLabel: 'Nuotaika / Išraiška',
      poseLabel: 'Poza',
      placeholder: 'Pasirinkite...',
      promptLabel: 'Papildomi patikslinimai',
      promptHint: 'Pridėkite papildomus nurodymus (neprivaloma)',
      promptPlaceholder: 'pvz. rankos sukryžiuotos, žiūri į šoną...',
      improvise: 'Improvizuoti',
      technicalSettings: 'Techniniai nustatymai',
      imageCount: 'Nuotraukų kiekis',
      format: 'Formatas',
      quality: 'Kokybė',
      clothingTypeLabel: 'Drabužio tipas',
      customPromptLabel: 'Papildomi nurodymai',
      customPromptPlaceholder: 'Pvz.: pakelta ranka, sėdi ant suoliuko, žiūri į šoną...'
    },
    actions: {
      generate: 'Generuoti',
      generating: 'Generuojama...',
      cancel: 'Atšaukti',
      regenerate: 'Generuoti dar kartą',
      newUpload: 'Nauja nuotrauka'
    },
    results: {
      title: 'Sugeneruotos nuotraukos',
      savedNotice: 'Nuotraukos automatiškai išsaugotos jūsų galerijoje.',
      downloadHint: 'Spauskite atsisiuntimo mygtuką ant nuotraukos, kad parsisiųstumėte.',
      selectToEdit: 'Pasirinkite nuotrauką, kurią norite redaguoti toliau.'
    },
    validation: {
      noImages: 'Įkelkite nuotrauką',
      noAvatar: 'Pasirinkite modelį',
      noPrompt: 'Įrašykite instrukcijas (min. 3 simboliai)',
      noClothingType: 'Pasirinkite drabužio tipą'
    },
    loading: {
      sending: 'Siunčiama...',
      generating: 'Generuojama...',
      almostDone: 'Beveik baigta...',
      complete: 'Baigta!'
    },
    tips: [
      'Aiški, ryški nuotrauka — geresnis rezultatas',
      'Kuo geresnis apšvietimas — tuo tikroviškesnė nuotrauka',
      'Pasirinkite foną, atitinkantį drabužio stilių',
      'Naudokite aukštos raiškos originalą',
      'Išbandykite skirtingus modelius — rezultatai stebina',
      'Pasirinkite nuotaiką, kad nuotrauka atrodytų gyvai'
    ],
    errors: {
      timeout: 'Užtruko per ilgai. Bandykite dar kartą.',
      network: 'Patikrinkite interneto ryšį ir bandykite dar kartą.',
      api: 'Nepavyko sugeneruoti. Bandykite vėliau.',
      avatarLoad: 'Nepavyko įkelti modelio nuotraukos. Bandykite dar kartą.',
      insufficientCredits: 'Nepakanka kreditų. Papildykite kreditų balansą.',
      default: 'Įvyko klaida. Bandykite dar kartą.'
    },
    footer: 'reEDITme',
    privacyPolicy: 'Privatumo politika',
    footerSection: {
      tagline: 'Produktų nuotraukos ir turinys su AI',
      navigation: 'Navigacija'
    },
    // Custom avatars section
    customAvatars: {
      myAvatars: 'Mano modeliai',
      presets: 'Šablonai',
      add: 'Pridėti',
      addTitle: 'Pridėti savo modelį',
      uploadHint: 'Įkelkite savo nuotraukas ar piešinius kaip modelius',
      customAvatar: 'Mano modelis',
      tapForOptions: 'Paspauskite meniu',
      selected: 'Pasirinkta',
      selectAvatar: 'Pasirinkti šį modelį',
      notes: 'Pastabos',
      descriptionPlaceholder: 'Aprašykite šį modelį...',
      save: 'Išsaugoti',
      cancel: 'Atšaukti',
      addDescription: 'Pridėti aprašymą...',
      deleting: 'Trinama...',
      delete: 'Ištrinti modelį',
      clickOutsideToClose: 'Paspauskite šalia, kad uždarytumėte',
      editMetadata: 'Redaguoti modelio duomenis...'
    },
    avatarMetadata: {
      avatarType: 'Modelio tipas',
      typePhoto: 'Nuotrauka',
      typeStylized: 'Stilizuotas',
      gender: 'Lytis',
      genderMale: 'Vyras',
      genderFemale: 'Moteris',
      genderOther: 'Kita',
      ageRange: 'Amžiaus grupė',
      ageChild: 'Vaikas',
      ageTeen: 'Paauglys',
      ageYoungAdult: 'Jaunas suaugęs',
      ageAdult: 'Suaugęs',
      ageSenior: 'Vyresnio amžiaus',
      hairColor: 'Plaukų spalva',
      hairBlack: 'Juodi',
      hairBrown: 'Rudi',
      hairBlonde: 'Šviesūs',
      hairRed: 'Raudoni',
      hairGray: 'Žili',
      hairWhite: 'Balti',
      hairOther: 'Kita',
      hairLength: 'Plaukų ilgis',
      lengthShort: 'Trumpi',
      lengthMedium: 'Vidutiniai',
      lengthLong: 'Ilgi',
      lengthBald: 'Plikė',
      autoDescription: 'Automatinis aprašymas',
      save: 'Išsaugoti',
      saving: 'Saugoma...',
      saveFailed: 'Nepavyko išsaugoti',
      selectPlaceholder: 'Pasirinkite...'
    },
    avatarCreator: {
      title: 'Sukurti modelį',
      createAvatar: 'Sukurti modelį',
      uploadPhoto: 'Įkelti nuotrauką',
      gender: 'Lytis',
      age: 'Amžius',
      ethnicity: 'Tautybė',
      hairLength: 'Plaukų ilgis',
      hairColor: 'Plaukų spalva',
      specialFeatures: 'Papildomi požymiai',
      specialFeaturesPlaceholder: 'pvz. tatuiruotės, akiniai, barzda...',
      prompt: 'Prompt (redaguojamas)',
      generate: 'Generuoti',
      generating: 'Generuojama...',
      regenerate: 'Pergeneruoti',
      save: 'Išsaugoti',
      saving: 'Saugoma...',
      cancel: 'Atšaukti',
      framing: 'Kadravimas',
    },
    avatarModels: {
      myModels: 'Mano modeliai',
      createModel: 'Sukurti modelį',
      modelName: 'Modelio pavadinimas',
      addPhoto: 'Pridėti nuotrauką',
      movePhoto: 'Perkelti į...',
      setCover: 'Nustatyti kaip viršelį',
      deleteModel: 'Ištrinti modelį',
      renameModel: 'Pervadinti',
      photosCount: 'nuotraukos',
      modelsCount: 'modeliai',
      modelLimit: 'Maksimalus modelių skaičius: 10',
      photoLimit: 'Maksimalus nuotraukų skaičius: 5',
      dragToMove: 'Vilkite nuotraukas tarp modelių',
      generateAnother: 'Kita poza',
      selectModel: 'Išsaugoti į modelį',
      createNewModel: '+ Naujas modelis',
      pose: 'Poza',
      savedPhotos: 'Modelio nuotraukos',
      editTraits: 'Keisti bruožus',
      saveAndNext: 'Išsaugoti ir kita poza',
      done: 'Baigti',
      mood: 'Nuotaika',
      addPose: 'Pridėti pozą',
      deletePhoto: 'Ištrinti',
      batchCount: 'Kiekis',
    },
    // Options
    avatars: {
      'fashion-woman-full': { name: 'Mados modelis', description: 'Pilnas kūnas, stilinga poza' },
      'elegant-woman-full': { name: 'Elegantiška moteris', description: 'Pilnas kūnas, elegantiškas stilius' },
      'casual-woman-full': { name: 'Kasdienis stilius', description: 'Pilnas kūnas, atsipalaidavusi' },
      'professional-woman-half': { name: 'Profesionali moteris', description: 'Pusė kūno, dalykiškas stilius' },
      'creative-woman-half': { name: 'Kūrybinga moteris', description: 'Pusė kūno, meninė išraiška' },
      'portrait-woman-face': { name: 'Portretas moteris', description: 'Veido close-up, natūrali grožybė' },
      'business-man-full': { name: 'Verslo vyras', description: 'Pilnas kūnas, profesionalus' },
      'casual-man-full': { name: 'Kasdienis vyras', description: 'Pilnas kūnas, atsipalaidavęs' },
      'athletic-man-half': { name: 'Sportinis vyras', description: 'Pusė kūno, atletiškas' },
      'stylish-man-half': { name: 'Stilingas vyras', description: 'Pusė kūno, madinga išvaizda' }
    },
    scenes: {
      'studio': { name: 'Studija', description: 'Profesionali foto studija' },
      'street': { name: 'Gatvė', description: 'Miesto gatvė, šiuolaikinė architektūra' },
      'nature': { name: 'Gamta', description: 'Gamtos aplinka, parkas ar sodas' },
      'beach': { name: 'Paplūdimys', description: 'Tropinis paplūdimys, smėlis ir vandenynas' },
      'cafe': { name: 'Kavinė', description: 'Jauki, stilinga kavinė' },
      'office': { name: 'Biuras', description: 'Modernus biuro interjeras' },
      'event': { name: 'Renginys', description: 'Elegantiškas renginio vieta' },
      'autumn': { name: 'Ruduo', description: 'Rudeninis parkas, auksiniai lapai' }
    },
    clothingTypes: {
      'dress': { name: 'Suknelė', description: 'Suknelės, sarafanai' },
      'top': { name: 'Marškinėliai / Palaidinė', description: 'Marškinėliai, palaidinės, megztiniai' },
      'jacket': { name: 'Striukė / Švarkas', description: 'Striukės, švarkai, paltai' },
      'pants': { name: 'Kelnės / Sijonas', description: 'Kelnės, džinsai, sijonai' },
      'suit': { name: 'Kostiumas', description: 'Dalykinis kostiumas, komplektas' },
      'sportswear': { name: 'Sportinė apranga', description: 'Sportiniai drabužiai, athleisure' },
      'accessory': { name: 'Aksesuaras', description: 'Kepurės, šalikai, akiniai, rankinės' }
    },
    moods: {
      'natural': { name: 'Natūrali', description: 'Rami, natūrali išraiška' },
      'confident': { name: 'Pasitikėjusi', description: 'Stipri, užtikrinta' },
      'happy': { name: 'Laiminga', description: 'Linksma, šypsanti' },
      'serious': { name: 'Rimta', description: 'Profesionali, susikaupusi' },
      'mysterious': { name: 'Paslaptinga', description: 'Intriguojanti, paslaptinga' },
      'playful': { name: 'Žaisminga', description: 'Linksma, energinga' },
      'elegant': { name: 'Elegantiška', description: 'Subtili, rafinuota' },
      'fierce': { name: 'Ryžtinga', description: 'Stipri, drąsi' }
    },
    poses: {
      'full-body': { name: 'Pilnas kūnas', description: 'Viso kūno kadras, stovint' },
      'half-body': { name: 'Pusė kūno', description: 'Nuo juosmens į viršų' },
      'portrait': { name: 'Portretas', description: 'Galva ir pečiai' },
      'face': { name: 'Veidas', description: 'Veido close-up' },
      'from-behind': { name: 'Nuo nugaros', description: 'Foto iš nugaros pusės' }
    },
    resolutions: {
      '1K': { name: '1K Standartinė', description: 'Greitesnis generavimas' },
      '2K': { name: '2K Aukšta', description: 'Aukščiausia kokybė' }
    },
    imageCounts: {
      1: { name: '1 nuotrauka', description: 'Greičiau, pigiau' },
      2: { name: '2 nuotraukos', description: 'Daugiau pasirinkimų' },
      3: { name: '3 nuotraukos', description: 'Dar daugiau variantų' },
      4: { name: '4 nuotraukos', description: 'Maksimalus pasirinkimas' }
    },
    garmentPhotoTypeLabel: 'Nuotraukos tipas',
    garmentPhotoTypeHint: 'Kaip buvo nufotografuotas drabužis',
    garmentPhotoTypes: {
      auto: { name: 'Automatinis', description: 'AI atpažins automatiškai' },
      'flat-lay': { name: 'Plokščia nuotrauka', description: 'Drabužis nufotografuotas plokščiai' },
      model: { name: 'Ant modelio', description: 'Drabužis nufotografuotas ant žmogaus' }
    },
    qualityModeLabel: 'Kokybės režimas',
    qualityModes: {
      performance: { name: 'Greita', description: 'Greičiausias rezultatas' },
      balanced: { name: 'Subalansuota', description: 'Optimalus greičio ir kokybės balansas' },
      quality: { name: 'Aukšta kokybė', description: 'Geriausia kokybė, ilgiau trunka' }
    },
    postProcess: {
      title: 'Redaguoti nuotrauką',
      subtitle: 'Pasirinkite vieną iš sugeneruotų nuotraukų aukščiau ir pritaikykite papildomus pakeitimus.',
      background: 'Pakeisti foną',
      backgroundDesc: 'AI pakeis nuotraukos foną į pasirinktą sceną, išlaikant žmogų.',
      pose: 'Pakeisti pozą',
      poseDesc: 'AI pakeis modelio pozą nuotraukoje.',
      additionalInstructions: 'Laisvas redagavimas',
      additionalInstructionsDesc: 'Aprašykite ką norite pakeisti — AI redaguos nuotrauką pagal jūsų tekstą.',
      editPlaceholder: 'Pvz.: rankos sukryžiuotos, sėdi ant kėdės, žiūri į šoną...',
      apply: 'Taikyti',
      processing: 'Apdorojama...',
      result: 'Redaguota nuotrauka'
    },
    posePresets: {
      arms_crossed: { name: 'Sukryžiuotos rankos' },
      hands_in_pockets: { name: 'Rankos kišenėse' },
      sitting: { name: 'Sėdi' },
      leaning: { name: 'Atsiremiantis' },
      walking: { name: 'Eina' },
      looking_away: { name: 'Žiūri į šoną' },
      hand_on_chin: { name: 'Ranka prie smakro' },
      waving: { name: 'Mojuoja' },
      thumbs_up: { name: 'Nykštys aukštyn' },
      pointing: { name: 'Rodo pirštu' },
    },
    auth: {
      // Login/Signup modal
      signIn: 'Prisijungti',
      signUp: 'Registruotis',
      signOut: 'Atsijungti',
      orContinueWith: 'arba tęsti su',
      continueWithGoogle: 'Tęsti su Google',

      // Form fields
      email: 'El. paštas',
      password: 'Slaptažodis',
      confirmPassword: 'Pakartokite slaptažodį',

      // Buttons
      signInButton: 'Prisijungti',
      signUpButton: 'Registruotis',
      createAccount: 'Sukurti paskyrą',
      alreadyHaveAccount: 'Jau turite paskyrą?',
      dontHaveAccount: 'Neturite paskyros?',

      // Guest mode
      continueAsGuest: 'Tęsti kaip svečias',
      guestMode: 'Svečio režimas',

      // Status messages
      signingIn: 'Jungiamasi...',
      signingUp: 'Registruojama...',
      signingOut: 'Atsijungiama...',
      checkEmail: 'Patikrinkite el. paštą patvirtinimui',

      // Error messages
      invalidCredentials: 'Neteisingas el. paštas arba slaptažodis',
      emailNotConfirmed: 'Patvirtinkite el. paštą prieš prisijungiant',
      emailAlreadyExists: 'Šis el. paštas jau užregistruotas',
      weakPassword: 'Slaptažodis per silpnas (min. 6 simboliai)',
      rateLimitExceeded: 'Per daug bandymų. Pabandykite vėliau',
      genericError: 'Įvyko klaida. Bandykite dar kartą',

      // User menu
      signedInAs: 'Prisijungęs kaip',
      myAccount: 'Mano paskyra',
      settings: 'Nustatymai',
      credits: 'Kreditai'
    },
    gallery: {
      title: 'Mano galerija',
      empty: {
        title: 'Galerija tuščia',
        subtitle: 'Sukurkite pirmą nuotrauką ir ji atsiras čia',
        cta: 'Kurti nuotrauką'
      },
      guest: {
        title: 'Prisijunkite, kad matytumėte galeriją',
        subtitle: 'Sukurkite paskyrą ir visos jūsų sugeneruotos nuotraukos bus išsaugotos čia',
        cta: 'Prisijungti'
      },
      selectedPhoto: 'Pasirinkta nuotrauka',
      selectAction: 'Ką norite daryti?',
      viewFull: 'Peržiūrėti',
      backToActions: 'Grįžti',
      actions: {
        download: 'Atsisiųsti',
        delete: 'Ištrinti',
        confirm: 'Patvirtinti',
        back: 'Grįžti į generatorių'
      },
      loading: 'Kraunama galerija...',
      error: 'Nepavyko įkelti galerijos'
    },
    nav: {
      home: 'Pradinis',
      gallery: 'Galerija/Įrašai',
      generate: 'Generuoti',
      avatars: 'Modeliai',
      dashboard: 'Tavo kūryba',
      pricing: 'Kainos',
      contact: 'Kontaktai',
      imageGenerator: 'Paveikslėlių generatorius',
      imageGeneratorDesc: 'Marketingo vizualai pagal aprašymą',
      modelPhotos: 'Nuotraukos su modeliais',
      modelPhotosDesc: 'Produkto nuotraukos ant modelių',
      postCreator: 'Įrašų kūrėjas',
      postCreatorDesc: 'Socialinių tinklų įrašai',
      tryOn: 'Try-on',
      posts: 'Įrašų kūrėjas',
      models: 'Modelių kūrimas',
      settings: 'Nustatymai',
      privacy: 'Privatumas'
    },
    avatarsPage: {
      title: 'Modelių kūrimas',
      subtitle: 'Sukurkite AI modelius nuotraukoms ir įrašams',
      createTitle: 'Kurkite savo AI modelį',
      createDescription: 'Pasirinkite bruožus, generuokite nuotraukas su AI ir sukurkite unikalų modelį savo turiniui',
      createButton: 'Sukurti naują modelį',
      modelCount: 'Turite {count} {label}.',
      modelCountOne: 'modelį',
      modelCountFew: 'modelius',
      modelCountMany: 'modelių',
      viewGallery: 'Peržiūrėti galeriją',
      backToGenerator: 'Grįžti į generatorių',
      addAvatar: 'Pridėti modelį',
      avatarCount: 'modelis(-iai)',
      noAvatars: 'Nėra modelių',
      emptyTitle: 'Dar nėra modelių',
      emptyHint: 'Įkelkite savo nuotraukas ar piešinius, kad naudotumėte kaip modelius generavime',
      uploadFirst: 'Įkelti pirmą modelį',
      loginRequired: 'Prisijunkite, kad valdytumėte savo modelius',
      editDescription: 'Redaguoti aprašymą',
      edit: 'Redaguoti',
      delete: 'Ištrinti',
      confirmDelete: 'Paspauskite dar kartą',
      analyzing: 'Analizuojama...',
      typePhoto: 'Nuotrauka',
      typeStylized: 'Menas',
      typePending: 'Apdorojama',
      invalidFileType: 'Tik JPEG ir PNG failai leidžiami',
      fileTooLarge: 'Failo dydis turi būti mažesnis nei 10MB',
      uploadFailed: 'Nepavyko įkelti modelio',
      descriptionPlaceholder: 'Aprašykite šį modelį (naudojama AI generavimui)...',
      pendingMessage: 'AI analizuoja šį modelį. Aprašymą galėsite redaguoti po analizės.',
      saving: 'Išsaugoma...',
      saveDescription: 'Išsaugoti aprašymą',
      saveFailed: 'Nepavyko išsaugoti aprašymo',
      selectForGenerator: 'Naudoti generatoriuje'
    },
    dashboard: {
      title: 'Mano kūryba',
      backToHome: 'Grįžti į pradžią',
      welcome: 'Sveiki sugrįžę',
      guestTitle: 'Prisijunkite, kad matytumėte savo kūrybą',
      guestDescription: 'Visos jūsų nuotraukos ir modeliai — vienoje vietoje',
      signIn: 'Prisijungti',
      personalInfo: {
        title: 'Asmeniniai duomenys',
        name: 'Vardas',
        namePlaceholder: 'Jūsų vardas',
        email: 'El. paštas',
        phone: 'Telefonas',
        phonePlaceholder: '+370...',
        company: 'Įmonė',
        companyPlaceholder: 'Įmonės pavadinimas',
        save: 'Išsaugoti',
        saving: 'Saugoma...',
        saved: 'Išsaugota!',
        error: 'Klaida',
        saveFailed: 'Nepavyko išsaugoti',
      },
      stats: {
        generations: 'Sukurta nuotraukų',
        avatars: 'Savi modeliai',
        credits: 'Kreditai',
        plan: 'Planas'
      },
      plans: {
        free: 'Nemokamas',
        pro: 'Pro',
        enterprise: 'Verslas'
      },
      actions: {
        create: 'Kurti naują nuotrauką',
        createDesc: 'Sugeneruokite produkto nuotrauką su AI',
        avatars: 'Valdyti modelius',
        avatarsDesc: 'Įkelkite ir valdykite savus modelius',
        gallery: 'Peržiūrėti galeriją',
        galleryDesc: 'Naršykite visas sugeneruotas nuotraukas'
      },
      recentTitle: 'Naujausi kūriniai',
      viewAll: 'Žiūrėti visus',
      noImages: 'Dar nėra nuotraukų',
      createFirst: 'Sukurti pirmą nuotrauką',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Modeliai',
        creditsAndPlan: 'Kreditai & Planas',
        noGenerations: 'Dar nėra generacijų',
        noAvatars: 'Dar nėra modelių',
        noPosts: 'Dar nėra įrašų',
        startGenerating: 'Pradėti generuoti',
        addAvatar: 'Pridėti modelį',
        viewPricing: 'Peržiūrėti kainas',
        currentPlan: 'Dabartinis planas',
        creditsRemaining: 'Liko kreditų',
        socialPosts: 'Socialinių tinklų įrašai',
        postCount: 'įrašas(-ai)',
        createPost: 'Kurti įrašą'
      }
    },
    landing: {
      hero: {
        title: 'Jūsų produktas — ant modelio per 60 sekundžių',
        subtitle: 'Įkelkite drabužio nuotrauką, pasirinkite modelį ir gaukite paruoštą marketingo nuotrauką. Be fotografo, be studijos.',
        ctaSignup: 'Pradėti nemokamai',
        ctaTry: 'Pabandyti be registracijos',
        ctaCreate: 'Kurti nuotrauką',
        ctaDashboard: 'Mano kūryba',
        card1: {
          title: 'Nuotraukos su modeliais',
          description: 'Užmaukite savo drabužį ant modelio — AI sukurs tikrovišką rezultatą per minutę'
        },
        card2: {
          title: 'Paveikslėlių generatorius',
          description: 'Pasirinkite sritį, aprašykite norimą paveikslėlį — AI sukurs jį per kelias sekundes'
        },
        card3: {
          title: 'Įrašų kūrėjas',
          description: 'AI parašys tekstą ir sukurs paveikslėlį socialiniams tinklams. Jums tereikia paspausti „Generuoti"'
        }
      },
      pricing: {
        title: 'Paprastos ir skaidrios kainos',
        subtitle: 'Pasirinkite planą, kuris tinka jūsų poreikiams',
        mostPopular: 'Populiariausias',
        perMonth: '/mėn.',
        getPlan: 'Pasirinkti planą',
        plans: {
          starter: {
            badge: 'Pradinis',
            name: 'Starter',
            subtitle: 'Pradėkite kurti su AI',
            price: '€9.99',
            features: [
              '50 kreditų per mėnesį',
              'Nuotraukos su modeliais',
              'Paveikslėlių generatorius',
              'Standartinė kokybė'
            ]
          },
          pro: {
            badge: 'Pro',
            name: 'Pro',
            subtitle: 'Daugiau galimybių augančiam verslui',
            price: '€24.99',
            features: [
              '200 kreditų per mėnesį',
              'Visi generavimo įrankiai',
              'Aukšta kokybė',
              'Prioritetinis generavimas',
              'Įrašų kūrėjas'
            ]
          },
          unlimited: {
            badge: 'Verslas',
            name: 'Unlimited',
            subtitle: 'Neribotam turiniui kurti',
            price: '€49.99',
            features: [
              '500 kreditų per mėnesį',
              'Visi įrankiai ir funkcijos',
              'Aukščiausia kokybė',
              'Prioritetinis palaikymas',
              'Socialinių tinklų publikavimas'
            ]
          }
        },
        credits: {
          title: 'Reikia daugiau kreditų?',
          subtitle: 'Pirkite papildomus kreditus bet kada. Prenumerata nebūtina.',
          save: 'Sutaupykite',
          buyNow: 'Pirkti',
          packs: [
            { price: '€9.99', credits: '50' },
            { price: '€24.99', credits: '150', save: '17%' },
            { price: '€79.99', credits: '500', save: '20%' }
          ]
        }
      },
      faq: {
        title: 'Klausimai ir atsakymai',
        subtitle: 'Dažniausiai klausiama prieš pradedant',
        items: {
          whatIsTool: {
            question: 'Kas yra reEDITme?',
            answer: 'reEDITme — tai AI platforma, kuri padeda kurti profesionalias produktų nuotraukas ir socialinių tinklų turinį. Įkeliate drabužio ar produkto nuotrauką, pasirenkate modelį, foną ir nuotaiką — AI sugeneruoja paruoštą marketingo paveikslėlį per 30–60 sekundžių.'
          },
          howGeneration: {
            question: 'Kaip veikia nuotraukų generavimas?',
            answer: 'Procesas paprastas: 1) įkeliate drabužio nuotrauką, 2) pasirenkate modelį ir nustatymus, 3) AI sugeneruoja rezultatą per 30–60 sekundžių. Gautas paveikslėlis atrodo kaip tikra fotosesijos nuotrauka — tinkama e-parduotuvei ir socialiniams tinklams.'
          },
          whatAreCredits: {
            question: 'Kas yra kreditai?',
            answer: 'Vienas kreditas = vienas generavimas. Pasirinkite mėnesinį planą arba nusipirkite kreditų paketus be prenumeratos. Nepanaudoti kreditai perkeliami į kitą mėnesį.'
          },
          howUploadAvatars: {
            question: 'Ar galiu naudoti savo modelio nuotrauką?',
            answer: 'Taip. Atidarykite Modelių skiltį ir įkelkite savo nuotrauką. AI naudos ją kaip modelį visiems tolimesniems generavimams — taip galite išlaikyti nuoseklų prekės ženklo veidą visose nuotraukose.'
          },
          isDataSafe: {
            question: 'Ar mano nuotraukos saugios?',
            answer: 'Taip. Visos nuotraukos saugomos šifruotai ir prieinamos tik jums. Mes niekada nedalinamės jūsų duomenimis su trečiosiomis šalimis. Daugiau informacijos rasite mūsų Privatumo politikoje.'
          },
          howContact: {
            question: 'Kaip susisiekti su palaikymu?',
            answer: 'Rašykite mums info@reEDITme.com — atsakome per 24 valandas darbo dienomis.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Populiariausia',
          title: 'Jūsų drabužis — ant modelio per minutę',
          subtitle: 'Įkelkite drabužio nuotrauką, pasirinkite modelį — AI sukurs realistišką rezultatą, kurį galite iškart naudoti e-parduotuvėje ar socialiniuose tinkluose.',
          feature1: '10+ modelių šablonų arba įkelkite savo nuotrauką',
          feature2: 'Keiskite foną, nuotaiką ir aplinką vienu paspaudimu',
          feature3: 'Rezultatas paruoštas socialiniams tinklams ir e-parduotuvei',
          cta: 'Išbandyti dabar'
        },
        imageGenerator: {
          badge: 'Naujiena',
          title: 'Paveikslėlis jūsų verslui — per kelias sekundes',
          subtitle: 'Pasirinkite savo veiklos sritį, aprašykite norimą paveikslėlį — AI sugeneruos profesionalų marketingo vizualą, pritaikytą socialiniams tinklams ir reklamai.',
          feature1: '20+ verslo sričių: grožis, medicina, nekilnojamasis turtas, HoReCa ir kt.',
          feature2: 'Aprašykite savo žodžiais — AI sugeneruos pagal jūsų sritį ir temą',
          feature3: 'Atsisiųskite aukštos kokybės paveikslėlį, paruoštą socialiniams tinklams',
          cta: 'Sukurti paveikslėlį'
        },
        modelCreator: {
          badge: 'Modeliai',
          title: 'Modelių kūrimas su AI',
          subtitle: 'Sukurkite AI modelius iš savo nuotraukų arba leiskite AI sugeneruoti naujus — naudokite juos nuotraukų generavimui ir socialinių tinklų įrašams.',
          feature1: 'Įkelkite savo nuotraukas arba sukurkite modelį su AI vienu paspaudimu',
          feature2: 'Iki 5 nuotraukų kiekvienam modeliui — skirtingos pozos ir kampai',
          feature3: 'Naudokite modelius nuotraukų generavimui ir socialinių tinklų įrašams',
          cta: 'Kurti modelį'
        },
        postCreator: {
          badge: 'Viskas viename',
          title: 'Įrašas socialiniams tinklams — per 30 sekundžių',
          subtitle: 'Pasirinkite temą — AI parašys tekstą ir sukurs paveikslėlį. Jums tereikia nukopijuoti ir paskelbti.',
          feature1: 'AI rašo tekstą jūsų prekės ženklo tonu',
          feature2: 'Tekstas su paveikslėliu arba tik tekstas — kaip norite',
          feature3: 'Pritaikyta Instagram, Facebook ir TikTok formatams',
          cta: 'Kurti įrašą'
        }
      },
      footer: {
        contact: 'Kontaktai'
      },
      platformStats: {
        imagesCreated: 'Sugeneruota nuotraukų',
        imagesEdited: 'Redaguota nuotraukų',
        postsCreated: 'Sukurta įrašų',
      }
    },
    postCreatorPage: {
      title: 'Įrašų kūrėjas',
      subtitle: 'Pasirinkite temą — AI sukurs tekstą ir paveikslėlį',
      loginRequired: 'Prisijunkite, kad galėtumėte kurti įrašus',
      topicLabel: 'Apie ką bus įrašas, trumpai apibūdinkite',
      topicPlaceholder: 'Pvz.: Nauja kolekcija, vasaros nuolaidos, produkto pristatymas...',
      industryLabel: 'Sritis',
      industryPlaceholder: 'Pasirinkite sritį...',
      generateTextFromImage: 'Sugeneruoti tekstą pagal nuotrauką',
      generatingTextFromImage: 'Generuojamas tekstas...',
      publishLabel: 'Skelbti:',
      imageLabel: 'Paveikslėlis',
      imageUpload: 'Įkelti',
      imageAi: 'AI generuoti',
      imageUploadHint: 'JPG, PNG',
      imageAiHint: 'AI sugeneruos paveikslėlį pagal temą',
      imageRemove: 'Pašalinti',
      imageDragDrop: 'Paspauskite arba vilkite paveikslėlį',
      settingsLabel: 'Nustatymai',
      toneLabel: 'Tonas',
      emojiLabel: 'Emoji',
      lengthLabel: 'Ilgis',
      toneProfessional: 'Profesionalus',
      toneFriendly: 'Draugiškas',
      toneMotivating: 'Motyvuojantis',
      toneHumorous: 'Humoristinis',
      emojiYes: 'Taip',
      emojiNo: 'Ne',
      emojiMinimal: 'Minimaliai',
      lengthShort: 'Trumpas',
      lengthMedium: 'Vidutinis',
      lengthLong: 'Ilgas',
      generate: 'Generuoti įrašą',
      generating: 'Generuojama...',
      resultLabel: 'Sugeneruotas tekstas',
      resultPlaceholder: 'Sugeneruotas tekstas bus rodomas čia...',
      previewLabel: 'Peržiūra',
      previewFacebook: 'Facebook',
      previewInstagram: 'Instagram',
      previewMobile: 'Mobilus',
      previewDesktop: 'Kompiuteris',
      copy: 'Kopijuoti',
      copied: 'Nukopijuota!',
      regenerateText: 'Naujas tekstas',
      regenerateImage: 'Naujas paveikslėlis',
      saving: 'Saugoma...',
      saved: 'Išsaugota',
      errorGeneration: 'Generavimo klaida. Bandykite dar kartą.',
      errorTimeout: 'Užtruko per ilgai. Bandykite dar kartą.'
    },
    generatorPage: {
      loginRequired: 'Prisijunkite, kad galėtumėte generuoti nuotraukas',
    },
    imageGeneratorPage: {
      title: 'Paveikslėlių generatorius',
      subtitle: 'Pasirinkite sritį, aprašykite norimą paveikslėlį — AI sugeneruos per kelias sekundes',
      industryLabel: 'Veiklos sritis',
      industryPlaceholder: 'Pasirinkite sritį...',
      promptLabel: 'Paveikslėlio aprašymas',
      promptHint: 'Aprašykite, ką norite matyti paveikslėlyje',
      generate: 'Generuoti nuotrauką',
      generating: 'Generuojama...',
      resultLabel: 'Sugeneruota nuotrauka',
      download: 'Atsisiųsti',
      regenerate: 'Generuoti dar kartą',
      saving: 'Saugoma...',
      saved: 'Išsaugota'
    }
  },
  lv: {
    header: {
      title: 'reEDITme',
      subtitle: 'Produktu fotogrāfijas un saturs ar AI — bez fotogrāfa, bez studijas'
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
      sceneLabel: 'Aina / Fons',
      styleLabel: 'Stils',
      moodLabel: 'Noskaņojums / Izteiksme',
      poseLabel: 'Poza',
      placeholder: 'Izvēlieties...',
      promptLabel: 'Papildu norādes',
      promptHint: 'Pievienojiet papildu norādes (nav obligāti)',
      promptPlaceholder: 'piem. rokas sakrustotas, skatās uz sāniem...',
      improvise: 'Improvizēt',
      technicalSettings: 'Tehniskie iestatījumi',
      imageCount: 'Attēlu skaits',
      format: 'Formāts',
      quality: 'Kvalitāte',
      clothingTypeLabel: 'Apģērba veids',
      customPromptLabel: 'Papildu norādes',
      customPromptPlaceholder: 'Piem.: pacelta roka, sēž uz soliņa, skatās uz sāniem...'
    },
    actions: {
      generate: 'Ģenerēt',
      generating: 'Ģenerē...',
      cancel: 'Atcelt',
      regenerate: 'Ģenerēt vēlreiz',
      newUpload: 'Jauns attēls'
    },
    results: {
      title: 'Ģenerētie attēli',
      savedNotice: 'Fotogrāfijas automātiski saglabātas jūsu galerijā.',
      downloadHint: 'Nospiediet lejupielādes pogu uz fotogrāfijas, lai to saglabātu.',
      selectToEdit: 'Izvēlieties fotogrāfiju, kuru vēlaties rediģēt tālāk.'
    },
    validation: {
      noImages: 'Augšupielādējiet attēlu',
      noAvatar: 'Izvēlieties modeli',
      noPrompt: 'Ievadiet instrukcijas (min. 3 simboli)',
      noClothingType: 'Izvēlieties apģērba veidu'
    },
    loading: {
      sending: 'Sūta...',
      generating: 'Ģenerē...',
      almostDone: 'Gandrīz gatavs...',
      complete: 'Pabeigts!'
    },
    tips: [
      'Skaidrs, spilgts attēls — labāks rezultāts',
      'Jo labāks apgaismojums — jo reālistiskāka fotogrāfija',
      'Izvēlieties fonu, kas atbilst apģērba stilam',
      'Izmantojiet augstas izšķirtspējas oriģinālu',
      'Izmēģiniet dažādus modeļus — rezultāti pārsteidz',
      'Izvēlieties noskaņojumu, lai fotogrāfija izskatītos dzīva'
    ],
    errors: {
      timeout: 'Pārāk ilgi. Mēģiniet vēlreiz.',
      network: 'Pārbaudiet interneta savienojumu un mēģiniet vēlreiz.',
      api: 'Neizdevās ģenerēt. Mēģiniet vēlāk.',
      avatarLoad: 'Neizdevās ielādēt modeļa attēlu. Mēģiniet vēlreiz.',
      insufficientCredits: 'Nepietiek kredītu. Papildiniet kredītu atlikumu.',
      default: 'Radās kļūda. Mēģiniet vēlreiz.'
    },
    footer: 'reEDITme',
    privacyPolicy: 'Privātuma politika',
    footerSection: {
      tagline: 'Produktu fotogrāfijas un saturs ar AI',
      navigation: 'Navigācija'
    },
    customAvatars: {
      myAvatars: 'Mani modeļi',
      presets: 'Šabloni',
      add: 'Pievienot',
      addTitle: 'Pievienot savu modeli',
      uploadHint: 'Augšupielādējiet savus attēlus vai zīmējumus kā modeļus',
      customAvatar: 'Mans modelis',
      tapForOptions: 'Pieskarieties izvēlnei',
      selected: 'Izvēlēts',
      selectAvatar: 'Izvēlēties šo modeli',
      notes: 'Piezīmes',
      descriptionPlaceholder: 'Aprakstiet šo avatāru...',
      save: 'Saglabāt',
      cancel: 'Atcelt',
      addDescription: 'Pievienot aprakstu...',
      deleting: 'Dzēš...',
      delete: 'Dzēst avatāru',
      clickOutsideToClose: 'Noklikšķiniet ārpusē, lai aizvērtu',
      editMetadata: 'Rediģēt avatāra datus...'
    },
    avatarMetadata: {
      avatarType: 'Modeļa tips',
      typePhoto: 'Foto',
      typeStylized: 'Stilizēts',
      gender: 'Dzimums',
      genderMale: 'Vīrietis',
      genderFemale: 'Sieviete',
      genderOther: 'Cits',
      ageRange: 'Vecuma grupa',
      ageChild: 'Bērns',
      ageTeen: 'Pusaudzis',
      ageYoungAdult: 'Jauns pieaugušais',
      ageAdult: 'Pieaugušais',
      ageSenior: 'Seniors',
      hairColor: 'Matu krāsa',
      hairBlack: 'Melni',
      hairBrown: 'Brūni',
      hairBlonde: 'Blondi',
      hairRed: 'Sarkani',
      hairGray: 'Sirmi',
      hairWhite: 'Balti',
      hairOther: 'Cita',
      hairLength: 'Matu garums',
      lengthShort: 'Īsi',
      lengthMedium: 'Vidēji',
      lengthLong: 'Gari',
      lengthBald: 'Pliks',
      autoDescription: 'Automātisks apraksts',
      save: 'Saglabāt',
      saving: 'Saglabā...',
      saveFailed: 'Neizdevās saglabāt',
      selectPlaceholder: 'Izvēlieties...'
    },
    avatarCreator: {
      title: 'Izveidot modeli',
      createAvatar: 'Izveidot modeli',
      uploadPhoto: 'Augšupielādēt fotoattēlu',
      gender: 'Dzimums',
      age: 'Vecums',
      ethnicity: 'Tautība',
      hairLength: 'Matu garums',
      hairColor: 'Matu krāsa',
      specialFeatures: 'Papildu iezīmes',
      specialFeaturesPlaceholder: 'piem. tetovējumi, brilles, bārda...',
      prompt: 'Prompt (rediģējams)',
      generate: 'Ģenerēt',
      generating: 'Ģenerē...',
      regenerate: 'Pārģenerēt',
      save: 'Saglabāt',
      saving: 'Saglabā...',
      cancel: 'Atcelt',
      framing: 'Kadrējums',
    },
    avatarModels: {
      myModels: 'Mani modeļi',
      createModel: 'Izveidot modeli',
      modelName: 'Modeļa nosaukums',
      addPhoto: 'Pievienot foto',
      movePhoto: 'Pārvietot uz...',
      setCover: 'Iestatīt kā vāku',
      deleteModel: 'Dzēst modeli',
      renameModel: 'Pārdēvēt',
      photosCount: 'fotogrāfijas',
      modelsCount: 'modeļi',
      modelLimit: 'Maksimālais modeļu skaits: 10',
      photoLimit: 'Maksimālais foto skaits: 5',
      dragToMove: 'Velciet fotogrāfijas starp modeļiem',
      generateAnother: 'Cita poza',
      selectModel: 'Saglabāt modelī',
      createNewModel: '+ Jauns modelis',
      pose: 'Poza',
      savedPhotos: 'Modeļa fotogrāfijas',
      editTraits: 'Mainīt iezīmes',
      saveAndNext: 'Saglabāt un nākamā poza',
      done: 'Gatavs',
      mood: 'Noskaņojums',
      addPose: 'Pievienot pozu',
      deletePhoto: 'Dzēst',
      batchCount: 'Daudzums',
    },
    avatars: {
      'fashion-woman-full': { name: 'Modes modelis', description: 'Pilna auguma, stilīga poza' },
      'elegant-woman-full': { name: 'Eleganta sieviete', description: 'Pilna auguma, elegants stils' },
      'casual-woman-full': { name: 'Ikdienas stils', description: 'Pilna auguma, atslābināta' },
      'professional-woman-half': { name: 'Profesionāla sieviete', description: 'Puse ķermeņa, lietišķs stils' },
      'creative-woman-half': { name: 'Radoša sieviete', description: 'Puse ķermeņa, mākslinieciska izteiksme' },
      'portrait-woman-face': { name: 'Portrets sieviete', description: 'Sejas tuvplāns, dabiska skaistums' },
      'business-man-full': { name: 'Biznesa vīrietis', description: 'Pilna auguma, profesionāls' },
      'casual-man-full': { name: 'Ikdienas vīrietis', description: 'Pilna auguma, atslābināts' },
      'athletic-man-half': { name: 'Sportisks vīrietis', description: 'Puse ķermeņa, atlētisks' },
      'stylish-man-half': { name: 'Stilīgs vīrietis', description: 'Puse ķermeņa, moderns izskats' }
    },
    scenes: {
      'studio': { name: 'Studija', description: 'Profesionāla foto studija' },
      'street': { name: 'Iela', description: 'Pilsētas iela, moderna arhitektūra' },
      'nature': { name: 'Daba', description: 'Dabas vide, parks vai dārzs' },
      'beach': { name: 'Pludmale', description: 'Tropiskā pludmale, smiltis un okeāns' },
      'cafe': { name: 'Kafejnīca', description: 'Mājīga, stilīga kafejnīca' },
      'office': { name: 'Birojs', description: 'Moderns biroja interjers' },
      'event': { name: 'Pasākums', description: 'Elegants pasākuma vieta' },
      'autumn': { name: 'Rudens', description: 'Rudens parks, zelta lapas' }
    },
    clothingTypes: {
      'dress': { name: 'Kleita', description: 'Kleitas, sarafāni' },
      'top': { name: 'Tops / Blūze', description: 'T-krekli, blūzes, džemperi' },
      'jacket': { name: 'Jaka / Žakete', description: 'Jakas, žaketes, mēteļi' },
      'pants': { name: 'Bikses / Svārki', description: 'Bikses, džinsi, svārki' },
      'suit': { name: 'Uzvalks', description: 'Lietišķs uzvalks, komplekts' },
      'sportswear': { name: 'Sporta apģērbs', description: 'Sporta apģērbs, athleisure' },
      'accessory': { name: 'Aksesuārs', description: 'Cepures, šalles, saulesbrilles, somas' }
    },
    moods: {
      'natural': { name: 'Dabiska', description: 'Mierīga, dabiska izteiksme' },
      'confident': { name: 'Pārliecināta', description: 'Spēcīga, droša' },
      'happy': { name: 'Laimīga', description: 'Priecīga, smaidoša' },
      'serious': { name: 'Nopietna', description: 'Profesionāla, koncentrēta' },
      'mysterious': { name: 'Noslēpumaina', description: 'Intriģējoša, noslēpumaina' },
      'playful': { name: 'Rotaļīga', description: 'Jautra, enerģiska' },
      'elegant': { name: 'Eleganta', description: 'Smalka, izsmalcināta' },
      'fierce': { name: 'Apņēmīga', description: 'Spēcīga, drosmīga' }
    },
    poses: {
      'full-body': { name: 'Pilna auguma', description: 'Visa ķermeņa kadrs, stāvot' },
      'half-body': { name: 'Puse ķermeņa', description: 'No vidukļa uz augšu' },
      'portrait': { name: 'Portrets', description: 'Galva un pleci' },
      'face': { name: 'Seja', description: 'Sejas tuvplāns' },
      'from-behind': { name: 'No muguras', description: 'Foto no muguras puses' }
    },
    resolutions: {
      '1K': { name: '1K Standarta', description: 'Ātrāka ģenerēšana' },
      '2K': { name: '2K Augsta', description: 'Augstākā kvalitāte' }
    },
    imageCounts: {
      1: { name: '1 attēls', description: 'Ātrāk, lētāk' },
      2: { name: '2 attēli', description: 'Vairāk izvēļu' },
      3: { name: '3 attēli', description: 'Vēl vairāk variantu' },
      4: { name: '4 attēli', description: 'Maksimāla izvēle' }
    },
    garmentPhotoTypeLabel: 'Fotoattēla tips',
    garmentPhotoTypeHint: 'Kā apģērbs tika fotografēts',
    garmentPhotoTypes: {
      auto: { name: 'Automātisks', description: 'AI noteiks automātiski' },
      'flat-lay': { name: 'Plakans foto', description: 'Apģērbs fotografēts plakaniski' },
      model: { name: 'Uz modeļa', description: 'Apģērbs fotografēts uz cilvēka' }
    },
    qualityModeLabel: 'Kvalitātes režīms',
    qualityModes: {
      performance: { name: 'Ātra', description: 'Ātrākais rezultāts' },
      balanced: { name: 'Līdzsvarota', description: 'Optimāls ātruma un kvalitātes līdzsvars' },
      quality: { name: 'Augsta kvalitāte', description: 'Labākā kvalitāte, ilgāk' }
    },
    postProcess: {
      title: 'Rediģēt fotogrāfiju',
      subtitle: 'Izvēlieties vienu no augstāk ģenerētajām fotogrāfijām un piemērojiet papildu izmaiņas.',
      background: 'Mainīt fonu',
      backgroundDesc: 'AI nomainīs fotogrāfijas fonu uz izvēlēto ainu, saglabājot cilvēku.',
      pose: 'Mainīt pozu',
      poseDesc: 'AI mainīs modeļa pozu fotogrāfijā.',
      additionalInstructions: 'Brīva rediģēšana',
      additionalInstructionsDesc: 'Aprakstiet, ko vēlaties mainīt — AI rediģēs fotogrāfiju pēc jūsu teksta.',
      editPlaceholder: 'Piem.: rokas sakrustotas, sēž uz krēsla, skatās uz sāniem...',
      apply: 'Piemērot',
      processing: 'Apstrādā...',
      result: 'Rediģēta fotogrāfija'
    },
    posePresets: {
      arms_crossed: { name: 'Sakrustotas rokas' },
      hands_in_pockets: { name: 'Rokas kabatās' },
      sitting: { name: 'Sēž' },
      leaning: { name: 'Atspiedies' },
      walking: { name: 'Iet' },
      looking_away: { name: 'Skatās uz sāniem' },
      hand_on_chin: { name: 'Roka pie zoda' },
      waving: { name: 'Māj ar roku' },
      thumbs_up: { name: 'Īkšķis uz augšu' },
      pointing: { name: 'Rāda ar pirkstu' },
    },
    auth: {
      // Login/Signup modal
      signIn: 'Pieslēgties',
      signUp: 'Reģistrēties',
      signOut: 'Iziet',
      orContinueWith: 'vai turpināt ar',
      continueWithGoogle: 'Turpināt ar Google',

      // Form fields
      email: 'E-pasts',
      password: 'Parole',
      confirmPassword: 'Atkārtojiet paroli',

      // Buttons
      signInButton: 'Pieslēgties',
      signUpButton: 'Reģistrēties',
      createAccount: 'Izveidot kontu',
      alreadyHaveAccount: 'Jau ir konts?',
      dontHaveAccount: 'Nav konta?',

      // Guest mode
      continueAsGuest: 'Turpināt kā viesis',
      guestMode: 'Viesa režīms',

      // Status messages
      signingIn: 'Pieslēdzas...',
      signingUp: 'Reģistrējas...',
      signingOut: 'Iziet...',
      checkEmail: 'Pārbaudiet e-pastu apstiprināšanai',

      // Error messages
      invalidCredentials: 'Nepareizs e-pasts vai parole',
      emailNotConfirmed: 'Lūdzu apstipriniet e-pastu pirms pieslēgšanās',
      emailAlreadyExists: 'Šis e-pasts jau ir reģistrēts',
      weakPassword: 'Parole pārāk vāja (min. 6 simboli)',
      rateLimitExceeded: 'Pārāk daudz mēģinājumu. Mēģiniet vēlāk',
      genericError: 'Radās kļūda. Mēģiniet vēlreiz',

      // User menu
      signedInAs: 'Pieslēdzies kā',
      myAccount: 'Mans konts',
      settings: 'Iestatījumi',
      credits: 'Kredīti'
    },
    gallery: {
      title: 'Mana galerija',
      empty: {
        title: 'Galerija ir tukša',
        subtitle: 'Izveidojiet pirmo fotogrāfiju un tā parādīsies šeit',
        cta: 'Izveidot fotogrāfiju'
      },
      guest: {
        title: 'Pieslēdzieties, lai redzētu galeriju',
        subtitle: 'Izveidojiet kontu un visi jūsu ģenerētie attēli tiks saglabāti šeit',
        cta: 'Pieslēgties'
      },
      selectedPhoto: 'Izvēlēta fotogrāfija',
      selectAction: 'Ko vēlaties darīt?',
      viewFull: 'Apskatīt',
      backToActions: 'Atpakaļ',
      actions: {
        download: 'Lejupielādēt',
        delete: 'Dzēst',
        confirm: 'Apstiprināt',
        back: 'Atpakaļ uz ģeneratoru'
      },
      loading: 'Ielādē galeriju...',
      error: 'Neizdevās ielādēt galeriju'
    },
    nav: {
      home: 'Sākums',
      gallery: 'Galerija',
      generate: 'Ģenerēt',
      avatars: 'Modeļi',
      dashboard: 'Tava jaunrade',
      pricing: 'Cenas',
      contact: 'Kontakti',
      imageGenerator: 'Attēlu ģenerators',
      imageGeneratorDesc: 'Mārketinga vizuāli pēc apraksta',
      modelPhotos: 'Foto ar modeļiem',
      modelPhotosDesc: 'Produktu foto uz modeļiem',
      postCreator: 'Ierakstu veidotājs',
      postCreatorDesc: 'Sociālo tīklu ieraksti',
      tryOn: 'Try-on',
      posts: 'Ieraksti',
      settings: 'Iestatījumi',
      privacy: 'Privātums'
    },
    avatarsPage: {
      title: 'Modeļu izveide',
      subtitle: 'Izveidojiet AI modeļus fotogrāfijām un ierakstiem',
      createTitle: 'Izveidojiet savu AI modeli',
      createDescription: 'Izvēlieties iezīmes, ģenerējiet fotogrāfijas ar AI un izveidojiet unikālu modeli savam saturam',
      createButton: 'Izveidot jaunu modeli',
      modelCount: 'Jums ir {count} {label}.',
      modelCountOne: 'modelis',
      modelCountFew: 'modeļi',
      modelCountMany: 'modeļu',
      viewGallery: 'Skatīt galeriju',
      backToGenerator: 'Atpakaļ uz ģeneratoru',
      addAvatar: 'Pievienot modeli',
      avatarCount: 'modelis(-ļi)',
      noAvatars: 'Nav modeļu',
      emptyTitle: 'Vēl nav modeļu',
      emptyHint: 'Augšupielādējiet savas fotogrāfijas vai mākslu, lai izmantotu kā modeļus ģenerācijā',
      uploadFirst: 'Augšupielādēt pirmo modeli',
      loginRequired: 'Pieslēdzieties, lai pārvaldītu savus modeļus',
      editDescription: 'Rediģēt aprakstu',
      edit: 'Rediģēt',
      delete: 'Dzēst',
      confirmDelete: 'Noklikšķiniet vēlreiz',
      analyzing: 'Analizē...',
      typePhoto: 'Foto',
      typeStylized: 'Māksla',
      typePending: 'Apstrādā',
      invalidFileType: 'Atļauti tikai JPEG un PNG faili',
      fileTooLarge: 'Faila izmēram jābūt mazākam par 10MB',
      uploadFailed: 'Neizdevās augšupielādēt modeli',
      descriptionPlaceholder: 'Aprakstiet šo modeli (izmantots AI ģenerācijā)...',
      pendingMessage: 'AI analizē šo modeli. Varat rediģēt aprakstu pēc analīzes.',
      saving: 'Saglabā...',
      saveDescription: 'Saglabāt aprakstu',
      saveFailed: 'Neizdevās saglabāt aprakstu',
      selectForGenerator: 'Izmantot ģeneratorā'
    },
    dashboard: {
      title: 'Mana jaunrade',
      backToHome: 'Atpakaļ uz sākumu',
      welcome: 'Laipni lūgti atpakaļ',
      guestTitle: 'Pieslēdzieties, lai redzētu savu jaunradi',
      guestDescription: 'Visas jūsu fotogrāfijas un modeļi — vienuviet',
      signIn: 'Pieslēgties',
      personalInfo: {
        title: 'Personīgā informācija',
        name: 'Vārds',
        namePlaceholder: 'Jūsu vārds',
        email: 'E-pasts',
        phone: 'Tālrunis',
        phonePlaceholder: '+371...',
        company: 'Uzņēmums',
        companyPlaceholder: 'Uzņēmuma nosaukums',
        save: 'Saglabāt',
        saving: 'Saglabā...',
        saved: 'Saglabāts!',
        error: 'Kļūda',
        saveFailed: 'Neizdevās saglabāt',
      },
      stats: {
        generations: 'Izveidoti attēli',
        avatars: 'Pielāgoti modeļi',
        credits: 'Kredīti',
        plan: 'Plāns'
      },
      plans: {
        free: 'Bezmaksas',
        pro: 'Pro',
        enterprise: 'Uzņēmums'
      },
      actions: {
        create: 'Izveidot jaunu attēlu',
        createDesc: 'Ģenerējiet produkta attēlu ar AI',
        avatars: 'Pārvaldīt modeļus',
        avatarsDesc: 'Augšupielādējiet un pārvaldiet pielāgotus modeļus',
        gallery: 'Skatīt galeriju',
        galleryDesc: 'Pārlūkojiet visus ģenerētos attēlus'
      },
      recentTitle: 'Jaunākie darbi',
      viewAll: 'Skatīt visus',
      noImages: 'Vēl nav attēlu',
      createFirst: 'Izveidot pirmo attēlu',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Modeļi',
        creditsAndPlan: 'Kredīti & Plāns',
        noGenerations: 'Vēl nav ģenerāciju',
        noAvatars: 'Vēl nav modeļu',
        noPosts: 'Vēl nav ierakstu',
        startGenerating: 'Sākt ģenerēt',
        addAvatar: 'Pievienot modeli',
        viewPricing: 'Skatīt cenas',
        currentPlan: 'Pašreizējais plāns',
        creditsRemaining: 'Atlikuši kredīti',
        socialPosts: 'Sociālo tīklu ieraksti',
        postCount: 'ieraksts(-i)',
        createPost: 'Izveidot ierakstu'
      }
    },
    landing: {
      hero: {
        title: 'Jūsu produkts — uz modeļa 60 sekundēs',
        subtitle: 'Augšupielādējiet apģērba fotogrāfiju, izvēlieties modeli un saņemiet gatavu mārketinga attēlu. Bez fotogrāfa, bez studijas.',
        ctaSignup: 'Sākt bez maksas',
        ctaTry: 'Izmēģināt bez reģistrācijas',
        ctaCreate: 'Izveidot fotogrāfiju',
        ctaDashboard: 'Mana jaunrade',
        card1: {
          title: 'Fotogrāfijas ar modeļiem',
          description: 'Uzvelciet savu apģērbu modelim — AI izveidos reālistisku rezultātu minūtes laikā'
        },
        card2: {
          title: 'Attēlu ģenerators',
          description: 'Izvēlieties nozari, aprakstiet vēlamo attēlu — AI to izveidos dažu sekunžu laikā'
        },
        card3: {
          title: 'Ierakstu veidotājs',
          description: 'AI uzrakstīs tekstu un izveidos attēlu sociālajiem tīkliem. Jums tikai jānospiež „Ģenerēt"'
        }
      },
      pricing: {
        title: 'Vienkāršas un caurspīdīgas cenas',
        subtitle: 'Izvēlieties plānu, kas atbilst jūsu vajadzībām',
        mostPopular: 'Populārākais',
        perMonth: '/mēn.',
        getPlan: 'Izvēlēties plānu',
        plans: {
          starter: {
            badge: 'Sākuma',
            name: 'Starter',
            subtitle: 'Sāciet veidot ar AI',
            price: '€9.99',
            features: [
              '50 kredīti mēnesī',
              'Fotogrāfijas ar modeļiem',
              'Attēlu ģenerators',
              'Standarta kvalitāte'
            ]
          },
          pro: {
            badge: 'Pro',
            name: 'Pro',
            subtitle: 'Vairāk iespēju augošam biznesam',
            price: '€24.99',
            features: [
              '200 kredīti mēnesī',
              'Visi ģenerēšanas rīki',
              'Augsta kvalitāte',
              'Prioritāra ģenerēšana',
              'Ierakstu veidotājs'
            ]
          },
          unlimited: {
            badge: 'Bizness',
            name: 'Unlimited',
            subtitle: 'Neierobežotai satura veidošanai',
            price: '€49.99',
            features: [
              '500 kredīti mēnesī',
              'Visi rīki un funkcijas',
              'Augstākā kvalitāte',
              'Prioritārs atbalsts',
              'Sociālo tīklu publicēšana'
            ]
          }
        },
        credits: {
          title: 'Nepieciešams vairāk kredītu?',
          subtitle: 'Iegādājieties papildu kredītus jebkurā laikā. Abonements nav nepieciešams.',
          save: 'Ietaupiet',
          buyNow: 'Pirkt',
          packs: [
            { price: '€9.99', credits: '50' },
            { price: '€24.99', credits: '150', save: '17%' },
            { price: '€79.99', credits: '500', save: '20%' }
          ]
        }
      },
      faq: {
        title: 'Jautājumi un atbildes',
        subtitle: 'Biežāk uzdotie jautājumi pirms sākšanas',
        items: {
          whatIsTool: {
            question: 'Kas ir reEDITme?',
            answer: 'reEDITme — AI platforma, kas palīdz veidot profesionālas produktu fotogrāfijas un sociālo tīklu saturu. Augšupielādējiet apģērba fotogrāfiju, izvēlieties modeli, fonu un noskaņojumu — AI izveidos gatavu mārketinga attēlu 30–60 sekundēs.'
          },
          howGeneration: {
            question: 'Kā darbojas attēlu ģenerēšana?',
            answer: 'Process ir vienkāršs: 1) augšupielādējiet apģērba fotogrāfiju, 2) izvēlieties modeli un iestatījumus, 3) AI izveidos rezultātu 30–60 sekundēs. Rezultāts izskatās kā īsta fotosesijas fotogrāfija — piemērota e-veikalam un sociālajiem tīkliem.'
          },
          whatAreCredits: {
            question: 'Kas ir kredīti?',
            answer: 'Viens kredīts = viena ģenerēšana. Izvēlieties mēneša plānu vai iegādājieties kredītu paketes bez abonementa. Neizmantotie kredīti tiek pārcelti uz nākamo mēnesi.'
          },
          howUploadAvatars: {
            question: 'Vai varu izmantot savu modeļa fotogrāfiju?',
            answer: 'Jā. Atveriet Modeļu sadaļu un augšupielādējiet savu fotogrāfiju. AI to izmantos kā modeli visām turpmākajām ģenerēšanām — tā varat saglabāt konsekventu zīmola seju visās fotogrāfijās.'
          },
          isDataSafe: {
            question: 'Vai manas fotogrāfijas ir drošībā?',
            answer: 'Jā. Visas fotogrāfijas tiek glabātas šifrēti un ir pieejamas tikai jums. Mēs nekad nedalāmies ar jūsu datiem ar trešajām pusēm. Vairāk informācijas mūsu Privātuma politikā.'
          },
          howContact: {
            question: 'Kā sazināties ar atbalstu?',
            answer: 'Rakstiet mums info@reEDITme.com — atbildam 24 stundu laikā darba dienās.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Populārākais',
          title: 'Jūsu apģērbs — uz modeļa minūtes laikā',
          subtitle: 'Augšupielādējiet apģērba fotogrāfiju, izvēlieties modeli — AI izveidos reālistisku rezultātu, ko uzreiz var izmantot e-veikalā vai sociālajos tīklos.',
          feature1: '10+ modeļu šablonu vai augšupielādējiet savu fotogrāfiju',
          feature2: 'Mainiet fonu, noskaņojumu un vidi ar vienu klikšķi',
          feature3: 'Rezultāts gatavs sociālajiem tīkliem un e-veikalam',
          cta: 'Izmēģināt tagad'
        },
        imageGenerator: {
          badge: 'Jaunums',
          title: 'Attēls jūsu biznesam — dažu sekunžu laikā',
          subtitle: 'Izvēlieties savu darbības nozari, aprakstiet vēlamo attēlu — AI ģenerēs profesionālu mārketinga vizuālu, piemērotu sociālajiem tīkliem un reklāmai.',
          feature1: '20+ biznesa nozares: skaistumkopšana, medicīna, nekustamais īpašums, HoReCa u.c.',
          feature2: 'Aprakstiet saviem vārdiem — AI ģenerēs atbilstoši jūsu nozarei un tēmai',
          feature3: 'Lejupielādējiet augstas kvalitātes attēlu, gatavu sociālajiem tīkliem',
          cta: 'Izveidot attēlu'
        },
        modelCreator: {
          badge: 'Modeļi',
          title: 'Modeļu izveide ar AI',
          subtitle: 'Izveidojiet AI modeļus no savām fotogrāfijām vai ļaujiet AI ģenerēt jaunus — izmantojiet tos fotogrāfiju ģenerēšanai un sociālo tīklu ierakstiem.',
          feature1: 'Augšupielādējiet savas fotogrāfijas vai izveidojiet modeli ar AI ar vienu klikšķi',
          feature2: 'Līdz 5 fotogrāfijām katram modelim — dažādas pozas un leņķi',
          feature3: 'Izmantojiet modeļus fotogrāfiju ģenerēšanai un sociālo tīklu ierakstiem',
          cta: 'Izveidot modeli'
        },
        postCreator: {
          badge: 'Viss vienā',
          title: 'Ieraksts sociālajiem tīkliem — 30 sekundēs',
          subtitle: 'Izvēlieties tēmu — AI uzrakstīs tekstu un izveidos attēlu. Jums tikai jākopē un jāpublicē.',
          feature1: 'AI raksta tekstu jūsu zīmola tonī',
          feature2: 'Teksts ar attēlu vai tikai teksts — kā vēlaties',
          feature3: 'Pielāgots Instagram, Facebook un TikTok formātiem',
          cta: 'Veidot ierakstu'
        }
      },
      footer: {
        contact: 'Kontakti'
      },
      platformStats: {
        imagesCreated: 'Ģenerētas fotogrāfijas',
        imagesEdited: 'Rediģēti attēli',
        postsCreated: 'Izveidoti ieraksti',
      }
    },
    postCreatorPage: {
      title: 'Ierakstu veidotājs',
      subtitle: 'Izvēlieties tēmu — AI izveidos tekstu un attēlu',
      loginRequired: 'Pieslēdzieties, lai izveidotu ierakstus',
      topicLabel: 'Par ko būs ieraksts, īsi aprakstiet',
      topicPlaceholder: 'Piem.: Jauna kolekcija, vasaras atlaides, produkta prezentācija...',
      generateTextFromImage: 'Ģenerēt tekstu pēc attēla',
      generatingTextFromImage: 'Ģenerē tekstu...',
      publishLabel: 'Publicēt:',
      industryLabel: 'Nozare',
      industryPlaceholder: 'Izvēlieties nozari...',
      imageLabel: 'Attēls',
      imageUpload: 'Augšupielādēt',
      imageAi: 'AI ģenerēt',
      imageUploadHint: 'JPG, PNG',
      imageAiHint: 'AI ģenerēs attēlu pēc tēmas',
      imageRemove: 'Noņemt',
      imageDragDrop: 'Noklikšķiniet vai velciet attēlu',
      settingsLabel: 'Iestatījumi',
      toneLabel: 'Tonis',
      emojiLabel: 'Emoji',
      lengthLabel: 'Garums',
      toneProfessional: 'Profesionāls',
      toneFriendly: 'Draudzīgs',
      toneMotivating: 'Motivējošs',
      toneHumorous: 'Humoristisks',
      emojiYes: 'Jā',
      emojiNo: 'Nē',
      emojiMinimal: 'Minimāli',
      lengthShort: 'Īss',
      lengthMedium: 'Vidējs',
      lengthLong: 'Garš',
      generate: 'Ģenerēt ierakstu',
      generating: 'Ģenerē...',
      resultLabel: 'Ģenerētais teksts',
      resultPlaceholder: 'Ģenerētais teksts tiks parādīts šeit...',
      previewLabel: 'Priekšskatījums',
      previewFacebook: 'Facebook',
      previewInstagram: 'Instagram',
      previewMobile: 'Mobilais',
      previewDesktop: 'Dators',
      copy: 'Kopēt',
      copied: 'Nokopēts!',
      regenerateText: 'Jauns teksts',
      regenerateImage: 'Jauns attēls',
      saving: 'Saglabā...',
      saved: 'Saglabāts',
      errorGeneration: 'Ģenerēšanas kļūda. Mēģiniet vēlreiz.',
      errorTimeout: 'Pārāk ilgi. Mēģiniet vēlreiz.'
    },
    generatorPage: {
      loginRequired: 'Pieslēdzieties, lai ģenerētu fotogrāfijas',
    },
    imageGeneratorPage: {
      title: 'Attēlu ģenerators',
      subtitle: 'Izvēlieties nozari, aprakstiet vēlamo attēlu — AI ģenerēs dažu sekunžu laikā',
      industryLabel: 'Darbības nozare',
      industryPlaceholder: 'Izvēlieties nozari...',
      promptLabel: 'Attēla apraksts',
      promptHint: 'Aprakstiet, kādu attēlu vēlaties — AI ģenerēs atbilstoši jūsu nozarei',
      generate: 'Ģenerēt attēlu',
      generating: 'Ģenerē...',
      resultLabel: 'Ģenerētais attēls',
      download: 'Lejupielādēt',
      regenerate: 'Ģenerēt vēlreiz',
      saving: 'Saglabā...',
      saved: 'Saglabāts'
    }
  },
  ee: {
    header: {
      title: 'reEDITme',
      subtitle: 'Tootefotod ja sisu AI-ga — ilma fotograafita, ilma stuudiota'
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
      sceneLabel: 'Stseen / Taust',
      styleLabel: 'Stiil',
      moodLabel: 'Meeleolu / Ilme',
      poseLabel: 'Poos',
      placeholder: 'Valige...',
      promptLabel: 'Lisajuhised',
      promptHint: 'Lisage täiendavaid juhiseid (valikuline)',
      promptPlaceholder: 'nt käed ristatud, vaatab küljele...',
      improvise: 'Improviseeri',
      technicalSettings: 'Tehnilised seaded',
      imageCount: 'Piltide arv',
      format: 'Formaat',
      quality: 'Kvaliteet',
      clothingTypeLabel: 'Rõivatüüp',
      customPromptLabel: 'Lisajuhised',
      customPromptPlaceholder: 'Nt.: tõstetud käsi, istub pingil, vaatab kõrvale...'
    },
    actions: {
      generate: 'Genereeri',
      generating: 'Genereerin...',
      cancel: 'Tühista',
      regenerate: 'Genereeri uuesti',
      newUpload: 'Uus pilt'
    },
    results: {
      title: 'Genereeritud pildid',
      savedNotice: 'Fotod salvestati automaatselt teie galeriisse.',
      downloadHint: 'Klõpsake foto allalaadimise nuppu, et see oma seadmesse salvestada.',
      selectToEdit: 'Valige foto, mida soovite edasi redigeerida.'
    },
    validation: {
      noImages: 'Laadige pilt üles',
      noAvatar: 'Valige mudel',
      noPrompt: 'Sisestage juhised (min. 3 sümbolit)',
      noClothingType: 'Valige rõivatüüp'
    },
    loading: {
      sending: 'Saadan...',
      generating: 'Genereerin...',
      almostDone: 'Peaaegu valmis...',
      complete: 'Valmis!'
    },
    tips: [
      'Selge, ere pilt — parem tulemus',
      'Mida parem valgustus — seda realistlikum foto',
      'Valige taust, mis sobib rõiva stiiliga',
      'Kasutage kõrge eraldusvõimega originaali',
      'Proovige erinevaid mudeleid — tulemused üllatavad',
      'Valige meeleolu, et foto näeks elav välja'
    ],
    errors: {
      timeout: 'Võttis liiga kaua. Proovige uuesti.',
      network: 'Kontrollige internetiühendust ja proovige uuesti.',
      api: 'Genereerimine ebaõnnestus. Proovige hiljem.',
      avatarLoad: 'Mudeli pildi laadimine ebaõnnestus. Proovige uuesti.',
      insufficientCredits: 'Krediiti pole piisavalt. Täiendage oma krediidijääki.',
      default: 'Tekkis viga. Proovige uuesti.'
    },
    footer: 'reEDITme',
    privacyPolicy: 'Privaatsuspoliitika',
    footerSection: {
      tagline: 'Tootefotod ja sisu AI-ga',
      navigation: 'Navigatsioon'
    },
    customAvatars: {
      myAvatars: 'Minu mudelid',
      presets: 'Šabloonid',
      add: 'Lisa',
      addTitle: 'Lisa oma avataar',
      uploadHint: 'Laadige üles oma fotod või joonistused avataaridena',
      customAvatar: 'Minu mudel',
      tapForOptions: 'Puudutage menüü jaoks',
      selected: 'Valitud',
      selectAvatar: 'Vali see mudel',
      notes: 'Märkmed',
      descriptionPlaceholder: 'Kirjeldage seda avataari...',
      save: 'Salvesta',
      cancel: 'Tühista',
      addDescription: 'Lisa kirjeldus...',
      deleting: 'Kustutamine...',
      delete: 'Kustuta avataar',
      clickOutsideToClose: 'Sulgemiseks klõpsake väljaspool',
      editMetadata: 'Muuda avataari andmeid...'
    },
    avatarMetadata: {
      avatarType: 'Mudeli tüüp',
      typePhoto: 'Foto',
      typeStylized: 'Stiliseeritud',
      gender: 'Sugu',
      genderMale: 'Mees',
      genderFemale: 'Naine',
      genderOther: 'Muu',
      ageRange: 'Vanusegrupp',
      ageChild: 'Laps',
      ageTeen: 'Teismeline',
      ageYoungAdult: 'Noor täiskasvanu',
      ageAdult: 'Täiskasvanu',
      ageSenior: 'Eakas',
      hairColor: 'Juuste värv',
      hairBlack: 'Must',
      hairBrown: 'Pruun',
      hairBlonde: 'Blond',
      hairRed: 'Punane',
      hairGray: 'Hall',
      hairWhite: 'Valge',
      hairOther: 'Muu',
      hairLength: 'Juuste pikkus',
      lengthShort: 'Lühike',
      lengthMedium: 'Keskmine',
      lengthLong: 'Pikk',
      lengthBald: 'Kiilaspäine',
      autoDescription: 'Automaatne kirjeldus',
      save: 'Salvesta',
      saving: 'Salvestamine...',
      saveFailed: 'Salvestamine ebaõnnestus',
      selectPlaceholder: 'Valige...'
    },
    avatarCreator: {
      title: 'Loo mudel',
      createAvatar: 'Loo mudel',
      uploadPhoto: 'Laadi foto üles',
      gender: 'Sugu',
      age: 'Vanus',
      ethnicity: 'Rahvus',
      hairLength: 'Juuste pikkus',
      hairColor: 'Juuste värv',
      specialFeatures: 'Lisatunnused',
      specialFeaturesPlaceholder: 'nt. tätoveeringud, prillid, habe...',
      prompt: 'Prompt (muudetav)',
      generate: 'Genereeri',
      generating: 'Genereerimine...',
      regenerate: 'Genereeri uuesti',
      save: 'Salvesta',
      saving: 'Salvestamine...',
      cancel: 'Tühista',
      framing: 'Kadreerimine',
    },
    avatarModels: {
      myModels: 'Minu mudelid',
      createModel: 'Loo mudel',
      modelName: 'Mudeli nimi',
      addPhoto: 'Lisa foto',
      movePhoto: 'Teisalda...',
      setCover: 'Määra kaaneks',
      deleteModel: 'Kustuta mudel',
      renameModel: 'Nimeta ümber',
      photosCount: 'fotod',
      modelsCount: 'mudelid',
      modelLimit: 'Maksimaalne mudelite arv: 10',
      photoLimit: 'Maksimaalne fotode arv: 5',
      dragToMove: 'Lohistage fotosid mudelite vahel',
      generateAnother: 'Teine poos',
      selectModel: 'Salvesta mudelisse',
      createNewModel: '+ Uus mudel',
      pose: 'Poos',
      savedPhotos: 'Mudeli fotod',
      editTraits: 'Muuda tunnuseid',
      saveAndNext: 'Salvesta ja järgmine poos',
      done: 'Valmis',
      mood: 'Meeleolu',
      addPose: 'Lisa poos',
      deletePhoto: 'Kustuta',
      batchCount: 'Kogus',
    },
    avatars: {
      'fashion-woman-full': { name: 'Moemodell', description: 'Täispikkus, stiilne poos' },
      'elegant-woman-full': { name: 'Elegantne naine', description: 'Täispikkus, elegantne stiil' },
      'casual-woman-full': { name: 'Vabaaeg stiil', description: 'Täispikkus, lõõgastunud' },
      'professional-woman-half': { name: 'Professionaalne naine', description: 'Poolpikkus, asjalik stiil' },
      'creative-woman-half': { name: 'Loov naine', description: 'Poolpikkus, kunstiline väljendus' },
      'portrait-woman-face': { name: 'Portree naine', description: 'Näo lähivõte, loomulik ilu' },
      'business-man-full': { name: 'Ärimees', description: 'Täispikkus, professionaalne' },
      'casual-man-full': { name: 'Vabaaeg mees', description: 'Täispikkus, lõõgastunud' },
      'athletic-man-half': { name: 'Sportlik mees', description: 'Poolpikkus, atleetiline' },
      'stylish-man-half': { name: 'Stiilne mees', description: 'Poolpikkus, moodne välimus' }
    },
    scenes: {
      'studio': { name: 'Stuudio', description: 'Professionaalne fotostuudio' },
      'street': { name: 'Tänav', description: 'Linnatänav, kaasaegne arhitektuur' },
      'nature': { name: 'Loodus', description: 'Looduskeskkond, park või aed' },
      'beach': { name: 'Rand', description: 'Troopiline rand, liiv ja ookean' },
      'cafe': { name: 'Kohvik', description: 'Hubane, stiilne kohvik' },
      'office': { name: 'Kontor', description: 'Kaasaegne kontori interjöör' },
      'event': { name: 'Üritus', description: 'Elegantne ürituse koht' },
      'autumn': { name: 'Sügis', description: 'Sügispark, kuldsed lehed' }
    },
    clothingTypes: {
      'dress': { name: 'Kleit', description: 'Kleidid, sundressid' },
      'top': { name: 'Pluus / Särk', description: 'T-särgid, pluusid, kampsunid' },
      'jacket': { name: 'Jakk / Mantel', description: 'Jakid, mantlid, üleriided' },
      'pants': { name: 'Püksid / Seelik', description: 'Püksid, teksad, seelikud' },
      'suit': { name: 'Ülikond', description: 'Ametlik ülikond, komplekt' },
      'sportswear': { name: 'Spordirõivad', description: 'Spordiriided, athleisure' },
      'accessory': { name: 'Aksessuaar', description: 'Mütsid, sallid, päikeseprillid, kotid' }
    },
    moods: {
      'natural': { name: 'Loomulik', description: 'Rahulik, loomulik ilme' },
      'confident': { name: 'Enesekindel', description: 'Tugev, kindel' },
      'happy': { name: 'Õnnelik', description: 'Rõõmus, naeratav' },
      'serious': { name: 'Tõsine', description: 'Professionaalne, keskendunud' },
      'mysterious': { name: 'Salapärane', description: 'Intrigeeriv, salapärane' },
      'playful': { name: 'Mänguline', description: 'Lõbus, energiline' },
      'elegant': { name: 'Elegantne', description: 'Peen, rafineeritud' },
      'fierce': { name: 'Otsustav', description: 'Tugev, julge' }
    },
    poses: {
      'full-body': { name: 'Täispikkus', description: 'Kogu keha kaader, seistes' },
      'half-body': { name: 'Poolpikkus', description: 'Vööst ülespoole' },
      'portrait': { name: 'Portree', description: 'Pea ja õlad' },
      'face': { name: 'Nägu', description: 'Näo lähivõte' },
      'from-behind': { name: 'Tagant', description: 'Foto selja tagant' }
    },
    resolutions: {
      '1K': { name: '1K Standard', description: 'Kiirem genereerimine' },
      '2K': { name: '2K Kõrge', description: 'Kõrgeim kvaliteet' }
    },
    imageCounts: {
      1: { name: '1 pilt', description: 'Kiirem, odavam' },
      2: { name: '2 pilti', description: 'Rohkem valikuid' },
      3: { name: '3 pilti', description: 'Veelgi rohkem variante' },
      4: { name: '4 pilti', description: 'Maksimaalne valik' }
    },
    garmentPhotoTypeLabel: 'Foto tüüp',
    garmentPhotoTypeHint: 'Kuidas rõivas oli pildistatud',
    garmentPhotoTypes: {
      auto: { name: 'Automaatne', description: 'AI tuvastab automaatselt' },
      'flat-lay': { name: 'Lame foto', description: 'Rõivas pildistatud lamedalt' },
      model: { name: 'Modellil', description: 'Rõivas pildistatud inimesel' }
    },
    qualityModeLabel: 'Kvaliteedirežiim',
    qualityModes: {
      performance: { name: 'Kiire', description: 'Kiireim tulemus' },
      balanced: { name: 'Tasakaalustatud', description: 'Optimaalne kiiruse ja kvaliteedi tasakaal' },
      quality: { name: 'Kõrge kvaliteet', description: 'Parim kvaliteet, kauem aega' }
    },
    postProcess: {
      title: 'Redigeeri fotot',
      subtitle: 'Valige üks ülal genereeritud fotodest ja rakendage lisamuudatusi.',
      background: 'Muuda tausta',
      backgroundDesc: 'AI asendab foto tausta valitud stseeniga, säilitades inimese.',
      pose: 'Muuda poosi',
      poseDesc: 'AI muudab modelli poosi fotol.',
      additionalInstructions: 'Vaba redigeerimine',
      additionalInstructionsDesc: 'Kirjeldage, mida soovite muuta — AI redigeerib fotot teie teksti põhjal.',
      editPlaceholder: 'Nt.: käed risti, istub toolil, vaatab kõrvale...',
      apply: 'Rakenda',
      processing: 'Töötleb...',
      result: 'Redigeeritud foto'
    },
    posePresets: {
      arms_crossed: { name: 'Ristatud käed' },
      hands_in_pockets: { name: 'Käed taskutes' },
      sitting: { name: 'Istub' },
      leaning: { name: 'Toetub' },
      walking: { name: 'Kõnnib' },
      looking_away: { name: 'Vaatab kõrvale' },
      hand_on_chin: { name: 'Käsi lõual' },
      waving: { name: 'Lehvitab' },
      thumbs_up: { name: 'Pöial üles' },
      pointing: { name: 'Osutab sõrmega' },
    },
    auth: {
      // Login/Signup modal
      signIn: 'Logi sisse',
      signUp: 'Registreeru',
      signOut: 'Logi välja',
      orContinueWith: 'või jätka',
      continueWithGoogle: 'Jätka Google\'iga',

      // Form fields
      email: 'E-post',
      password: 'Parool',
      confirmPassword: 'Korda parooli',

      // Buttons
      signInButton: 'Logi sisse',
      signUpButton: 'Registreeru',
      createAccount: 'Loo konto',
      alreadyHaveAccount: 'On juba konto?',
      dontHaveAccount: 'Pole kontot?',

      // Guest mode
      continueAsGuest: 'Jätka külalisena',
      guestMode: 'Külalise režiim',

      // Status messages
      signingIn: 'Sisselogimine...',
      signingUp: 'Registreerimine...',
      signingOut: 'Väljalogimine...',
      checkEmail: 'Kontrolli e-posti kinnitamiseks',

      // Error messages
      invalidCredentials: 'Vale e-post või parool',
      emailNotConfirmed: 'Palun kinnita e-post enne sisselogimist',
      emailAlreadyExists: 'See e-post on juba registreeritud',
      weakPassword: 'Parool liiga nõrk (min. 6 tähemärki)',
      rateLimitExceeded: 'Liiga palju katseid. Proovi hiljem',
      genericError: 'Tekkis viga. Proovi uuesti',

      // User menu
      signedInAs: 'Sisse logitud kui',
      myAccount: 'Minu konto',
      settings: 'Seaded',
      credits: 'Krediidid'
    },
    gallery: {
      title: 'Minu galerii',
      empty: {
        title: 'Galerii on tühi',
        subtitle: 'Looge esimene foto ja see ilmub siia',
        cta: 'Loo foto'
      },
      guest: {
        title: 'Logi sisse, et näha galeriid',
        subtitle: 'Loo konto ja kõik sinu genereeritud pildid salvestatakse siia',
        cta: 'Logi sisse'
      },
      selectedPhoto: 'Valitud foto',
      selectAction: 'Mida soovite teha?',
      viewFull: 'Vaata',
      backToActions: 'Tagasi',
      actions: {
        download: 'Laadi alla',
        delete: 'Kustuta',
        confirm: 'Kinnita',
        back: 'Tagasi generaatorisse'
      },
      loading: 'Laadin galeriid...',
      error: 'Galerii laadimine ebaõnnestus'
    },
    nav: {
      home: 'Avaleht',
      gallery: 'Galerii',
      generate: 'Genereeri',
      avatars: 'Mudelid',
      dashboard: 'Sinu looming',
      pricing: 'Hinnad',
      contact: 'Kontakt',
      imageGenerator: 'Piltide generaator',
      imageGeneratorDesc: 'Turundusvisuaalid kirjelduse järgi',
      modelPhotos: 'Fotod modellidega',
      modelPhotosDesc: 'Tootefotod modellidel',
      postCreator: 'Postituste looja',
      postCreatorDesc: 'Sotsiaalmeedia postitused',
      tryOn: 'Try-on',
      posts: 'Postitused',
      settings: 'Seaded',
      privacy: 'Privaatsus'
    },
    avatarsPage: {
      title: 'Mudelite loomine',
      subtitle: 'Looge AI mudeleid fotodele ja postitustele',
      createTitle: 'Looge oma AI mudel',
      createDescription: 'Valige tunnused, genereerige fotod AI-ga ja looge unikaalne mudel oma sisule',
      createButton: 'Loo uus mudel',
      modelCount: 'Teil on {count} {label}.',
      modelCountOne: 'mudel',
      modelCountFew: 'mudelit',
      modelCountMany: 'mudelit',
      viewGallery: 'Vaata galeriid',
      backToGenerator: 'Tagasi generaatorisse',
      addAvatar: 'Lisa mudel',
      avatarCount: 'mudel(it)',
      noAvatars: 'Mudeleid pole',
      emptyTitle: 'Mudeleid pole veel',
      emptyHint: 'Laadige üles oma fotod või kunstiteosed, et kasutada neid mudelitena genereerimisel',
      uploadFirst: 'Laadi üles esimene mudel',
      loginRequired: 'Logi sisse, et hallata oma mudeleid',
      editDescription: 'Muuda kirjeldust',
      edit: 'Muuda',
      delete: 'Kustuta',
      confirmDelete: 'Klõpsa uuesti',
      analyzing: 'Analüüsib...',
      typePhoto: 'Foto',
      typeStylized: 'Kunst',
      typePending: 'Töötleb',
      invalidFileType: 'Lubatud on ainult JPEG ja PNG failid',
      fileTooLarge: 'Faili suurus peab olema alla 10MB',
      uploadFailed: 'Mudeli üleslaadimine ebaõnnestus',
      descriptionPlaceholder: 'Kirjeldage seda mudelit (kasutatakse AI genereerimisel)...',
      pendingMessage: 'AI analüüsib seda mudelit. Saate kirjeldust muuta pärast analüüsi.',
      saving: 'Salvestab...',
      saveDescription: 'Salvesta kirjeldus',
      saveFailed: 'Kirjelduse salvestamine ebaõnnestus',
      selectForGenerator: 'Kasuta generaatoris'
    },
    dashboard: {
      title: 'Minu looming',
      backToHome: 'Tagasi avalehele',
      welcome: 'Tere tulemast tagasi',
      guestTitle: 'Logi sisse, et näha oma loomingut',
      guestDescription: 'Kõik sinu fotod ja mudelid — ühes kohas',
      signIn: 'Logi sisse',
      personalInfo: {
        title: 'Isikuandmed',
        name: 'Nimi',
        namePlaceholder: 'Teie nimi',
        email: 'E-post',
        phone: 'Telefon',
        phonePlaceholder: '+372...',
        company: 'Ettevõte',
        companyPlaceholder: 'Ettevõtte nimi',
        save: 'Salvesta',
        saving: 'Salvestab...',
        saved: 'Salvestatud!',
        error: 'Viga',
        saveFailed: 'Salvestamine ebaõnnestus',
      },
      stats: {
        generations: 'Loodud pilte',
        avatars: 'Kohandatud mudelid',
        credits: 'Krediidid',
        plan: 'Plaan'
      },
      plans: {
        free: 'Tasuta',
        pro: 'Pro',
        enterprise: 'Ettevõte'
      },
      actions: {
        create: 'Loo uus pilt',
        createDesc: 'Genereeri tootepilt AI-ga',
        avatars: 'Halda mudeleid',
        avatarsDesc: 'Laadi üles ja halda kohandatud mudeleid',
        gallery: 'Vaata galeriid',
        galleryDesc: 'Sirvi kõiki genereeritud pilte'
      },
      recentTitle: 'Viimased tööd',
      viewAll: 'Vaata kõiki',
      noImages: 'Pilte pole veel',
      createFirst: 'Loo esimene pilt',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Mudelid',
        creditsAndPlan: 'Krediidid & Plaan',
        noGenerations: 'Genereerimisi pole veel',
        noAvatars: 'Mudeleid pole veel',
        noPosts: 'Postitusi pole veel',
        startGenerating: 'Alusta genereerimist',
        addAvatar: 'Lisa mudel',
        viewPricing: 'Vaata hindu',
        currentPlan: 'Praegune plaan',
        creditsRemaining: 'Krediite jäänud',
        socialPosts: 'Sotsiaalmeedia postitused',
        postCount: 'postitus(ed)',
        createPost: 'Loo postitus'
      }
    },
    landing: {
      hero: {
        title: 'Teie toode — modelli seljas 60 sekundiga',
        subtitle: 'Laadige üles rõivafoto, valige mudel ja saage valmis turundusfoto. Ilma fotograafita, ilma stuudiota.',
        ctaSignup: 'Alusta tasuta',
        ctaTry: 'Proovi ilma registreerimata',
        ctaCreate: 'Loo foto',
        ctaDashboard: 'Minu looming',
        card1: {
          title: 'Fotod modellide peal',
          description: 'Tõmmake oma rõivas modellile selga — AI loob realistliku tulemuse minutiga'
        },
        card2: {
          title: 'Piltide generaator',
          description: 'Valige valdkond, kirjeldage soovitud pilti — AI loob selle mõne sekundiga'
        },
        card3: {
          title: 'Postituste looja',
          description: 'AI kirjutab teksti ja loob pildi sotsiaalmeedia jaoks. Teil tuleb vaid vajutada „Genereeri"'
        }
      },
      pricing: {
        title: 'Lihtsad ja läbipaistvad hinnad',
        subtitle: 'Valige plaan, mis sobib teie vajadustega',
        mostPopular: 'Populaarseim',
        perMonth: '/kuus',
        getPlan: 'Vali plaan',
        plans: {
          starter: {
            badge: 'Algaja',
            name: 'Starter',
            subtitle: 'Alustage AI-ga loomist',
            price: '€9.99',
            features: [
              '50 krediiti kuus',
              'Fotod mudelite peal',
              'Piltide generaator',
              'Standardne kvaliteet'
            ]
          },
          pro: {
            badge: 'Pro',
            name: 'Pro',
            subtitle: 'Rohkem võimalusi kasvavale ärile',
            price: '€24.99',
            features: [
              '200 krediiti kuus',
              'Kõik genereerimise tööriistad',
              'Kõrge kvaliteet',
              'Prioriteetne genereerimine',
              'Postituste looja'
            ]
          },
          unlimited: {
            badge: 'Äri',
            name: 'Unlimited',
            subtitle: 'Piiramatu sisu loomiseks',
            price: '€49.99',
            features: [
              '500 krediiti kuus',
              'Kõik tööriistad ja funktsioonid',
              'Kõrgeim kvaliteet',
              'Prioriteetne tugi',
              'Sotsiaalmeedia avaldamine'
            ]
          }
        },
        credits: {
          title: 'Vaja rohkem krediite?',
          subtitle: 'Ostke lisakrediite igal ajal. Tellimus pole vajalik.',
          save: 'Säästate',
          buyNow: 'Osta',
          packs: [
            { price: '€9.99', credits: '50' },
            { price: '€24.99', credits: '150', save: '17%' },
            { price: '€79.99', credits: '500', save: '20%' }
          ]
        }
      },
      faq: {
        title: 'Küsimused ja vastused',
        subtitle: 'Kõige sagedamini küsitav enne alustamist',
        items: {
          whatIsTool: {
            question: 'Mis on reEDITme?',
            answer: 'reEDITme — AI platvorm, mis aitab luua professionaalseid tootefotosid ja sotsiaalmeedia sisu. Laadige üles rõivafoto, valige mudel, taust ja meeleolu — AI loob valmis turundusfoto 30–60 sekundiga.'
          },
          howGeneration: {
            question: 'Kuidas piltide genereerimine töötab?',
            answer: 'Protsess on lihtne: 1) laadige üles rõivafoto, 2) valige mudel ja sätted, 3) AI loob tulemuse 30–60 sekundiga. Tulemus näeb välja nagu päris fotosessiooni foto — sobib e-poele ja sotsiaalmeediasse.'
          },
          whatAreCredits: {
            question: 'Mis on krediidid?',
            answer: 'Üks krediit = üks genereerimine. Valige kuuplaan või ostke krediidipakette ilma tellimuseta. Kasutamata krediidid kantakse üle järgmisesse kuusse.'
          },
          howUploadAvatars: {
            question: 'Kas saan kasutada oma mudeli fotot?',
            answer: 'Jah. Avage Mudelite sektsioon ja laadige üles oma foto. AI kasutab seda mudelina kõigi edasiste genereerimiste jaoks — nii saate hoida järjepidevat brändikujundit kõigil fotodel.'
          },
          isDataSafe: {
            question: 'Kas minu fotod on kaitstud?',
            answer: 'Jah. Kõik fotod on krüpteeritult salvestatud ja ligipääsetavad ainult teile. Me ei jaga kunagi teie andmeid kolmandate osapooltega. Lisateavet leiate meie Privaatsuspoliitikast.'
          },
          howContact: {
            question: 'Kuidas võtta ühendust toega?',
            answer: 'Kirjutage meile info@reEDITme.com — vastame 24 tunni jooksul tööpäevadel.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Populaarseim',
          title: 'Teie rõivas — modelli seljas minutiga',
          subtitle: 'Laadige üles rõivafoto, valige mudel — AI loob realistliku tulemuse, mida saate kohe kasutada e-poes või sotsiaalmeedias.',
          feature1: '10+ mudeli malli või laadige üles oma foto',
          feature2: 'Muutke tausta, meeleolu ja keskkonda ühe klõpsuga',
          feature3: 'Tulemus valmis sotsiaalmeediaks ja e-poeks',
          cta: 'Proovi kohe'
        },
        imageGenerator: {
          badge: 'Uus',
          title: 'Pilt teie ärile — mõne sekundiga',
          subtitle: 'Valige oma tegevusvaldkond, kirjeldage soovitud pilti — AI genereerib professionaalse turundusvisuaali, sobiva sotsiaalmeediaks ja reklaamiks.',
          feature1: '20+ ärivaldkonda: iluteenused, meditsiin, kinnisvara, HoReCa jne.',
          feature2: 'Kirjeldage oma sõnadega — AI genereerib vastavalt teie valdkonnale ja teemale',
          feature3: 'Laadige alla kõrge kvaliteediga pilt, valmis sotsiaalmeediaks',
          cta: 'Loo pilt'
        },
        modelCreator: {
          badge: 'Mudelid',
          title: 'Mudelite loomine AI-ga',
          subtitle: 'Looge AI mudeleid oma fotodest või laske AI-l genereerida uusi — kasutage neid fotode genereerimiseks ja sotsiaalmeedia postitusteks.',
          feature1: 'Laadige üles oma fotod või looge mudel AI-ga ühe klõpsuga',
          feature2: 'Kuni 5 fotot iga mudeli kohta — erinevad poosid ja nurgad',
          feature3: 'Kasutage mudeleid fotode genereerimiseks ja sotsiaalmeedia postitusteks',
          cta: 'Loo mudel'
        },
        postCreator: {
          badge: 'Kõik ühes',
          title: 'Postitus sotsiaalmeediasse — 30 sekundiga',
          subtitle: 'Valige teema — AI kirjutab teksti ja loob pildi. Teil tuleb vaid kopeerida ja avaldada.',
          feature1: 'AI kirjutab teksti teie brändi toonis',
          feature2: 'Tekst pildiga või ainult tekst — kuidas soovite',
          feature3: 'Kohandatud Instagram, Facebook ja TikTok formaatidele',
          cta: 'Loo postitus'
        }
      },
      footer: {
        contact: 'Kontakt'
      },
      platformStats: {
        imagesCreated: 'Genereeritud fotosid',
        imagesEdited: 'Redigeeritud pilte',
        postsCreated: 'Loodud postitusi',
      }
    },
    postCreatorPage: {
      title: 'Postituste looja',
      subtitle: 'Valige teema — AI loob teksti ja pildi',
      loginRequired: 'Logi sisse, et luua postitusi',
      topicLabel: 'Millest postitus räägib, kirjeldage lühidalt',
      topicPlaceholder: 'Nt: Uus kollektsioon, suvised allahindlused, toote esitlus...',
      generateTextFromImage: 'Genereeri tekst pildi põhjal',
      generatingTextFromImage: 'Teksti genereerimine...',
      publishLabel: 'Avalda:',
      industryLabel: 'Valdkond',
      industryPlaceholder: 'Valige valdkond...',
      imageLabel: 'Pilt',
      imageUpload: 'Laadi üles',
      imageAi: 'AI genereeri',
      imageUploadHint: 'JPG, PNG',
      imageAiHint: 'AI genereerib pildi teema järgi',
      imageRemove: 'Eemalda',
      imageDragDrop: 'Klõpsake või lohistage pilt',
      settingsLabel: 'Seaded',
      toneLabel: 'Toon',
      emojiLabel: 'Emoji',
      lengthLabel: 'Pikkus',
      toneProfessional: 'Professionaalne',
      toneFriendly: 'Sõbralik',
      toneMotivating: 'Motiveeriv',
      toneHumorous: 'Humoorikas',
      emojiYes: 'Jah',
      emojiNo: 'Ei',
      emojiMinimal: 'Minimaalselt',
      lengthShort: 'Lühike',
      lengthMedium: 'Keskmine',
      lengthLong: 'Pikk',
      generate: 'Genereeri postitus',
      generating: 'Genereerimine...',
      resultLabel: 'Genereeritud tekst',
      resultPlaceholder: 'Genereeritud tekst kuvatakse siin...',
      previewLabel: 'Eelvaade',
      previewFacebook: 'Facebook',
      previewInstagram: 'Instagram',
      previewMobile: 'Mobiil',
      previewDesktop: 'Arvuti',
      copy: 'Kopeeri',
      copied: 'Kopeeritud!',
      regenerateText: 'Uus tekst',
      regenerateImage: 'Uus pilt',
      saving: 'Salvestamine...',
      saved: 'Salvestatud',
      errorGeneration: 'Genereerimise viga. Proovige uuesti.',
      errorTimeout: 'Liiga kaua. Proovige uuesti.'
    },
    generatorPage: {
      loginRequired: 'Logi sisse, et genereerida fotosid',
    },
    imageGeneratorPage: {
      title: 'Piltide generaator',
      subtitle: 'Valige valdkond, kirjeldage soovitud pilti — AI genereerib mõne sekundiga',
      industryLabel: 'Tegevusvaldkond',
      industryPlaceholder: 'Valige valdkond...',
      promptLabel: 'Pildi kirjeldus',
      promptHint: 'Kirjeldage, millist pilti soovite — AI genereerib vastavalt teie valdkonnale',
      generate: 'Genereeri pilt',
      generating: 'Genereerimine...',
      resultLabel: 'Genereeritud pilt',
      download: 'Laadi alla',
      regenerate: 'Genereeri uuesti',
      saving: 'Salvestamine...',
      saved: 'Salvestatud'
    }
  },
  en: {
    header: {
      title: 'reEDITme',
      subtitle: 'Upload a photo and create professional images with AI'
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
      poseLabel: 'Pose',
      placeholder: 'Select...',
      promptLabel: 'Additional refinements',
      promptHint: 'Add extra instructions (optional)',
      promptPlaceholder: 'e.g. arms crossed, looking to the side...',
      improvise: 'Improvise',
      technicalSettings: 'Technical settings',
      imageCount: 'Number of photos',
      format: 'Format',
      quality: 'Quality',
      clothingTypeLabel: 'Clothing type',
      customPromptLabel: 'Additional instructions',
      customPromptPlaceholder: 'E.g.: raised hand, sitting on a bench, looking to the side...'
    },
    actions: {
      generate: 'Generate',
      generating: 'Generating...',
      cancel: 'Cancel',
      regenerate: 'Generate again',
      newUpload: 'New photo'
    },
    results: {
      title: 'Generated photos',
      savedNotice: 'Photos are automatically saved to your gallery.',
      downloadHint: 'Click the download button on a photo to save it to your device.',
      selectToEdit: 'Select a photo to edit it further.'
    },
    validation: {
      noImages: 'Upload a photo',
      noAvatar: 'Select a model',
      noPrompt: 'Enter instructions (min. 3 characters)',
      noClothingType: 'Select a clothing type'
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
      'Tip: Try different poses for more variety'
    ],
    errors: {
      timeout: 'Took too long. Please try again.',
      network: 'Check your internet connection and try again.',
      api: 'Failed to generate. Please try later.',
      avatarLoad: 'Failed to load model image. Please try again.',
      insufficientCredits: 'Insufficient credits. Please top up your credit balance.',
      default: 'An error occurred. Please try again.'
    },
    footer: 'reEDITme',
    privacyPolicy: 'Privacy Policy',
    footerSection: {
      tagline: 'AI-powered content creation platform',
      navigation: 'Navigation'
    },
    customAvatars: {
      myAvatars: 'My Models',
      presets: 'Presets',
      add: 'Add',
      addTitle: 'Add custom model',
      uploadHint: 'Upload your own photos or art to use as models',
      customAvatar: 'Custom Model',
      tapForOptions: 'Tap for options',
      selected: 'Selected',
      selectAvatar: 'Select this model',
      notes: 'Notes',
      descriptionPlaceholder: 'Describe this model...',
      save: 'Save',
      cancel: 'Cancel',
      addDescription: 'Add description...',
      deleting: 'Deleting...',
      delete: 'Delete model',
      clickOutsideToClose: 'Click outside to close',
      editMetadata: 'Edit model details...'
    },
    avatarMetadata: {
      avatarType: 'Model Type',
      typePhoto: 'Photo',
      typeStylized: 'Stylized',
      gender: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      genderOther: 'Other',
      ageRange: 'Age Range',
      ageChild: 'Child',
      ageTeen: 'Teen',
      ageYoungAdult: 'Young Adult',
      ageAdult: 'Adult',
      ageSenior: 'Senior',
      hairColor: 'Hair Color',
      hairBlack: 'Black',
      hairBrown: 'Brown',
      hairBlonde: 'Blonde',
      hairRed: 'Red',
      hairGray: 'Gray',
      hairWhite: 'White',
      hairOther: 'Other',
      hairLength: 'Hair Length',
      lengthShort: 'Short',
      lengthMedium: 'Medium',
      lengthLong: 'Long',
      lengthBald: 'Bald',
      autoDescription: 'Auto-generated description',
      save: 'Save',
      saving: 'Saving...',
      saveFailed: 'Failed to save',
      selectPlaceholder: 'Select...'
    },
    avatarCreator: {
      title: 'Create Model',
      createAvatar: 'Create model',
      uploadPhoto: 'Upload photo',
      gender: 'Gender',
      age: 'Age',
      ethnicity: 'Ethnicity',
      hairLength: 'Hair length',
      hairColor: 'Hair color',
      specialFeatures: 'Special features',
      specialFeaturesPlaceholder: 'e.g. tattoos, glasses, beard...',
      prompt: 'Prompt (editable)',
      generate: 'Generate',
      generating: 'Generating...',
      regenerate: 'Regenerate',
      save: 'Save',
      saving: 'Saving...',
      cancel: 'Cancel',
      framing: 'Framing',
    },
    avatarModels: {
      myModels: 'My models',
      createModel: 'Create model',
      modelName: 'Model name',
      addPhoto: 'Add photo',
      movePhoto: 'Move to...',
      setCover: 'Set as cover',
      deleteModel: 'Delete model',
      renameModel: 'Rename',
      photosCount: 'photos',
      modelsCount: 'models',
      modelLimit: 'Maximum models: 10',
      photoLimit: 'Maximum photos: 5',
      dragToMove: 'Drag photos between models to reorganize',
      generateAnother: 'Another pose',
      selectModel: 'Save to model',
      createNewModel: '+ New model',
      pose: 'Pose',
      savedPhotos: 'Model photos',
      editTraits: 'Edit traits',
      saveAndNext: 'Save & next pose',
      done: 'Done',
      mood: 'Mood',
      addPose: 'Add pose',
      deletePhoto: 'Delete',
      batchCount: 'Count',
    },
    avatars: {
      'fashion-woman-full': { name: 'Fashion model', description: 'Full body, stylish pose' },
      'elegant-woman-full': { name: 'Elegant woman', description: 'Full body, elegant style' },
      'casual-woman-full': { name: 'Casual style', description: 'Full body, relaxed' },
      'professional-woman-half': { name: 'Professional woman', description: 'Half body, business style' },
      'creative-woman-half': { name: 'Creative woman', description: 'Half body, artistic expression' },
      'portrait-woman-face': { name: 'Portrait woman', description: 'Face close-up, natural beauty' },
      'business-man-full': { name: 'Business man', description: 'Full body, professional' },
      'casual-man-full': { name: 'Casual man', description: 'Full body, relaxed' },
      'athletic-man-half': { name: 'Athletic man', description: 'Half body, athletic' },
      'stylish-man-half': { name: 'Stylish man', description: 'Half body, fashionable look' }
    },
    scenes: {
      'studio': { name: 'Studio', description: 'Professional photo studio' },
      'street': { name: 'Street', description: 'Urban city street, modern architecture' },
      'nature': { name: 'Nature', description: 'Natural outdoor setting, park or garden' },
      'beach': { name: 'Beach', description: 'Tropical beach, sand and ocean' },
      'cafe': { name: 'Café', description: 'Cozy, stylish café' },
      'office': { name: 'Office', description: 'Modern office interior' },
      'event': { name: 'Event', description: 'Elegant event venue' },
      'autumn': { name: 'Autumn', description: 'Autumn park, golden leaves' }
    },
    clothingTypes: {
      'dress': { name: 'Dress', description: 'Dresses, sundresses' },
      'top': { name: 'Top / Blouse', description: 'T-shirts, blouses, sweaters' },
      'jacket': { name: 'Jacket / Blazer', description: 'Jackets, blazers, coats' },
      'pants': { name: 'Pants / Skirt', description: 'Pants, jeans, skirts' },
      'suit': { name: 'Suit', description: 'Business suit, set' },
      'sportswear': { name: 'Sportswear', description: 'Athletic clothing, athleisure' },
      'accessory': { name: 'Accessory', description: 'Hats, scarves, glasses, bags' }
    },
    moods: {
      'natural': { name: 'Natural', description: 'Calm, natural expression' },
      'confident': { name: 'Confident', description: 'Strong, assured' },
      'happy': { name: 'Happy', description: 'Cheerful, smiling' },
      'serious': { name: 'Serious', description: 'Professional, focused' },
      'mysterious': { name: 'Mysterious', description: 'Intriguing, mysterious' },
      'playful': { name: 'Playful', description: 'Fun, energetic' },
      'elegant': { name: 'Elegant', description: 'Subtle, refined' },
      'fierce': { name: 'Fierce', description: 'Strong, determined' }
    },
    poses: {
      'full-body': { name: 'Full body', description: 'Full body shot, standing' },
      'half-body': { name: 'Half body', description: 'Waist up' },
      'portrait': { name: 'Portrait', description: 'Head and shoulders' },
      'face': { name: 'Face', description: 'Face close-up' },
      'from-behind': { name: 'From behind', description: 'Shot from behind' }
    },
    resolutions: {
      '1K': { name: '1K Standard', description: 'Faster generation' },
      '2K': { name: '2K High', description: 'Highest quality' }
    },
    imageCounts: {
      1: { name: '1 photo', description: 'Faster, cheaper' },
      2: { name: '2 photos', description: 'More choices' },
      3: { name: '3 photos', description: 'Even more options' },
      4: { name: '4 photos', description: 'Maximum selection' }
    },
    garmentPhotoTypeLabel: 'Photo type',
    garmentPhotoTypeHint: 'How the garment was photographed',
    garmentPhotoTypes: {
      auto: { name: 'Automatic', description: 'AI will detect automatically' },
      'flat-lay': { name: 'Flat lay', description: 'Garment photographed flat' },
      model: { name: 'On model', description: 'Garment photographed on a person' }
    },
    qualityModeLabel: 'Quality mode',
    qualityModes: {
      performance: { name: 'Fast', description: 'Fastest result' },
      balanced: { name: 'Balanced', description: 'Optimal speed and quality balance' },
      quality: { name: 'High quality', description: 'Best quality, takes longer' }
    },
    postProcess: {
      title: 'Edit photo',
      subtitle: 'Select one of the generated photos above and apply additional changes.',
      background: 'Change background',
      backgroundDesc: 'AI will replace the photo background with the selected scene, keeping the person.',
      pose: 'Change pose',
      poseDesc: 'AI will change the model pose in the photo.',
      additionalInstructions: 'Free editing',
      additionalInstructionsDesc: 'Describe what you want to change — AI will edit the photo based on your text.',
      editPlaceholder: 'E.g.: arms crossed, sitting on a chair, looking sideways...',
      apply: 'Apply',
      processing: 'Processing...',
      result: 'Edited photo'
    },
    posePresets: {
      arms_crossed: { name: 'Arms crossed' },
      hands_in_pockets: { name: 'Hands in pockets' },
      sitting: { name: 'Sitting' },
      leaning: { name: 'Leaning' },
      walking: { name: 'Walking' },
      looking_away: { name: 'Looking away' },
      hand_on_chin: { name: 'Hand on chin' },
      waving: { name: 'Waving' },
      thumbs_up: { name: 'Thumbs up' },
      pointing: { name: 'Pointing' },
    },
    auth: {
      // Login/Signup modal
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      orContinueWith: 'or continue with',
      continueWithGoogle: 'Continue with Google',

      // Form fields
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',

      // Buttons
      signInButton: 'Sign In',
      signUpButton: 'Sign Up',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",

      // Guest mode
      continueAsGuest: 'Continue as Guest',
      guestMode: 'Guest Mode',

      // Status messages
      signingIn: 'Signing in...',
      signingUp: 'Signing up...',
      signingOut: 'Signing out...',
      checkEmail: 'Check your email for confirmation',

      // Error messages
      invalidCredentials: 'Invalid email or password',
      emailNotConfirmed: 'Please verify your email before signing in',
      emailAlreadyExists: 'This email is already registered',
      weakPassword: 'Password too weak (min. 6 characters)',
      rateLimitExceeded: 'Too many attempts. Please try again later',
      genericError: 'An error occurred. Please try again',

      // User menu
      signedInAs: 'Signed in as',
      myAccount: 'My Account',
      settings: 'Settings',
      credits: 'Credits'
    },
    gallery: {
      title: 'My Gallery',
      empty: {
        title: 'No images yet',
        subtitle: 'Generate your first image to start your gallery',
        cta: 'Generate Image'
      },
      guest: {
        title: 'Sign in to see your gallery',
        subtitle: 'Create an account to save and manage your generated images',
        cta: 'Sign In'
      },
      selectedPhoto: 'Selected photo',
      selectAction: 'What would you like to do?',
      viewFull: 'View',
      backToActions: 'Back',
      actions: {
        download: 'Download',
        delete: 'Delete',
        confirm: 'Confirm',
        back: 'Back to Generator'
      },
      loading: 'Loading gallery...',
      error: 'Failed to load gallery'
    },
    nav: {
      home: 'Home',
      gallery: 'Gallery',
      generate: 'Generate',
      avatars: 'Models',
      dashboard: 'Your creations',
      pricing: 'Pricing',
      contact: 'Contact',
      imageGenerator: 'Image Generator',
      imageGeneratorDesc: 'Text to image with AI',
      modelPhotos: 'Photos with Models',
      modelPhotosDesc: 'Product photos on models',
      postCreator: 'Post Creator',
      postCreatorDesc: 'Social media posts',
      tryOn: 'Try-on',
      posts: 'Posts',
      settings: 'Settings',
      privacy: 'Privacy'
    },
    avatarsPage: {
      title: 'Model Creation',
      subtitle: 'Create AI models for photos and posts',
      createTitle: 'Create your AI model',
      createDescription: 'Choose traits, generate photos with AI and create a unique model for your content',
      createButton: 'Create new model',
      modelCount: 'You have {count} {label}.',
      modelCountOne: 'model',
      modelCountFew: 'models',
      modelCountMany: 'models',
      viewGallery: 'View gallery',
      backToGenerator: 'Back to Generator',
      addAvatar: 'Add Model',
      avatarCount: 'model(s)',
      noAvatars: 'No models',
      emptyTitle: 'No models yet',
      emptyHint: 'Upload your photos or artwork to use as models in generation',
      uploadFirst: 'Upload Your First Model',
      loginRequired: 'Log in to manage your models',
      editDescription: 'Edit Description',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Click to confirm',
      analyzing: 'Analyzing...',
      typePhoto: 'Photo',
      typeStylized: 'Art',
      typePending: 'Processing',
      invalidFileType: 'Only JPEG and PNG files are allowed',
      fileTooLarge: 'File size must be less than 10MB',
      uploadFailed: 'Failed to upload model',
      descriptionPlaceholder: 'Describe this model (used for AI generation)...',
      pendingMessage: 'AI is analyzing this model. You can edit the description after analysis completes.',
      saving: 'Saving...',
      saveDescription: 'Save Description',
      saveFailed: 'Failed to save description',
      selectForGenerator: 'Use in generator'
    },
    dashboard: {
      title: 'Your creations',
      backToHome: 'Back to Home',
      welcome: 'Welcome back',
      guestTitle: 'Sign in to view your dashboard',
      guestDescription: 'Track your generations and manage models',
      signIn: 'Sign In',
      personalInfo: {
        title: 'Personal Information',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        phone: 'Phone',
        phonePlaceholder: '+1...',
        company: 'Company',
        companyPlaceholder: 'Company name',
        save: 'Save',
        saving: 'Saving...',
        saved: 'Saved!',
        error: 'Error',
        saveFailed: 'Failed to save',
      },
      stats: {
        generations: 'Images Created',
        avatars: 'Custom Models',
        credits: 'Credits',
        plan: 'Plan'
      },
      plans: {
        free: 'Free',
        pro: 'Pro',
        enterprise: 'Enterprise'
      },
      actions: {
        create: 'Create New Image',
        createDesc: 'Generate a product photo with AI',
        avatars: 'Manage Models',
        avatarsDesc: 'Upload and manage custom models',
        gallery: 'View Gallery',
        galleryDesc: 'Browse all your generated images'
      },
      recentTitle: 'Recent Creations',
      viewAll: 'View All',
      noImages: 'No images yet',
      createFirst: 'Create Your First Image',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Models',
        creditsAndPlan: 'Credits & Plan',
        noGenerations: 'No generations yet',
        noAvatars: 'No models yet',
        noPosts: 'No posts yet',
        startGenerating: 'Start generating',
        addAvatar: 'Add model',
        viewPricing: 'View pricing',
        currentPlan: 'Current plan',
        creditsRemaining: 'Credits remaining',
        socialPosts: 'Social Media Posts',
        postCount: 'post(s)',
        createPost: 'Create Post'
      }
    },
    landing: {
      hero: {
        title: 'Everything you need for your content',
        subtitle: 'Three powerful AI tools in one place — create professional content faster than ever',
        ctaSignup: 'Sign Up Free',
        ctaTry: 'Try Without Account',
        ctaCreate: 'Start Creating',
        ctaDashboard: 'Settings',
        card1: {
          title: 'Photos on Real Models',
          description: 'Upload a product photo — AI places it on a selected model and creates a professional result'
        },
        card2: {
          title: 'AI Image Generator',
          description: 'Create unique product images from scratch — no photographer and no studio needed'
        },
        card3: {
          title: 'Post Creator',
          description: 'Create social media posts with AI — text, images, or both together'
        }
      },
      pricing: {
        title: 'Simple, Transparent Pricing',
        subtitle: 'Choose the plan that fits your needs',
        mostPopular: 'Most Popular',
        perMonth: '/month',
        getPlan: 'Get Plan',
        plans: {
          starter: {
            badge: 'Starter',
            name: 'Starter',
            subtitle: 'Start creating with AI',
            price: '€9.99',
            features: [
              '50 credits per month',
              'Photos on models',
              'Image generator',
              'Standard quality'
            ]
          },
          pro: {
            badge: 'Pro',
            name: 'Pro',
            subtitle: 'More power for growing businesses',
            price: '€24.99',
            features: [
              '200 credits per month',
              'All generation tools',
              'High quality',
              'Priority generation',
              'Post creator'
            ]
          },
          unlimited: {
            badge: 'Business',
            name: 'Unlimited',
            subtitle: 'For unlimited content creation',
            price: '€49.99',
            features: [
              '500 credits per month',
              'All tools and features',
              'Highest quality',
              'Priority support',
              'Social media publishing'
            ]
          }
        },
        credits: {
          title: 'Need More Credits?',
          subtitle: 'Buy additional credits anytime. No subscription required.',
          save: 'Save',
          buyNow: 'Buy Now',
          packs: [
            { price: '€9.99', credits: '50' },
            { price: '€24.99', credits: '150', save: '17%' },
            { price: '€79.99', credits: '500', save: '20%' }
          ]
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Got questions? We have answers',
        items: {
          whatIsTool: {
            question: 'What is reEDITme?',
            answer: 'reEDITme is an AI-powered tool that transforms your photos into professional UGC (User Generated Content) marketing images. Simply upload a photo and our AI will generate stunning variations based on your selected style, scene, and mood preferences.'
          },
          howGeneration: {
            question: 'How does image generation work?',
            answer: 'Our AI analyzes your uploaded photo and combines it with the model, scene, and style settings you choose. The generation process takes about 30-60 seconds and produces high-quality images suitable for marketing and social media.'
          },
          whatAreCredits: {
            question: 'What are credits and how do they work?',
            answer: 'Credits are used to generate images. Each image generation uses a certain number of credits depending on the quality and resolution you select. You can purchase credits or earn them through our subscription plans.'
          },
          howUploadAvatars: {
            question: 'How do I upload custom models?',
            answer: 'Navigate to the Models section from the main menu. You can upload your own photos or artwork to use as reference images for generation. Custom models let you maintain consistent brand imagery across all your content.'
          },
          isDataSafe: {
            question: 'Is my data safe?',
            answer: 'Absolutely. We use industry-standard encryption and security practices. Your uploaded images are stored securely and are only accessible to you. We never share your data with third parties. Read our Privacy Policy for more details.'
          },
          howContact: {
            question: 'How can I contact support?',
            answer: 'You can reach our support team at info@reEDITme.com. We typically respond within 24 hours on business days.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Most Popular',
          title: 'Product Photos on Real Models',
          subtitle: 'Upload a clothing or product photo — AI will place it on a selected model and create a professional marketing image in just minutes.',
          feature1: 'Choose from 10+ professional models or upload your own model',
          feature2: 'Change environments, poses, styles, and moods with one click',
          feature3: 'Get studio-quality photos ready for social media and e-commerce',
          cta: 'Try Now'
        },
        imageGenerator: {
          badge: 'New',
          title: 'AI Image Generator',
          subtitle: 'Create entirely new, unique product images from scratch with AI — no photographer, no studio, no model needed.',
          feature1: 'Describe your desired image and AI will create it in seconds',
          feature2: 'Choose the style, composition, and mood to match your brand',
          feature3: 'Export in high resolution, ready for print and web',
          cta: 'Start Creating'
        },
        modelCreator: {
          badge: 'Models',
          title: 'AI Model Creator',
          subtitle: 'Create AI models from your own photos or let AI generate new ones — use them for photo generation and social media posts.',
          feature1: 'Upload your photos or create a model with AI in one click',
          feature2: 'Up to 5 photos per model — different poses and angles',
          feature3: 'Use models for photo generation and social media posts',
          cta: 'Create Model'
        },
        postCreator: {
          badge: 'All-in-One',
          title: 'Social Media Post Creator',
          subtitle: 'Create professional marketing posts in just a few clicks — AI generates engaging copy tailored to your audience and platform.',
          feature1: 'AI writes copy tailored to your brand voice and audience',
          feature2: 'Create posts with images or text-only — your choice',
          feature3: 'Optimized for Instagram, Facebook, TikTok, and more',
          cta: 'Create Post'
        }
      },
      footer: {
        contact: 'Contact'
      },
      platformStats: {
        imagesCreated: 'Images created',
        imagesEdited: 'Images edited',
        postsCreated: 'Posts created',
      }
    },
    postCreatorPage: {
      title: 'Post Creator',
      subtitle: 'Create professional social media posts with AI',
      loginRequired: 'Sign in to create posts',
      topicLabel: 'What will the post be about, briefly describe',
      topicPlaceholder: 'E.g.: New collection, summer sales, product launch...',
      generateTextFromImage: 'Generate text from image',
      generatingTextFromImage: 'Generating text...',
      publishLabel: 'Publish:',
      industryLabel: 'Industry',
      industryPlaceholder: 'Select industry...',
      imageLabel: 'Image',
      imageUpload: 'Upload',
      imageAi: 'AI Generate',
      imageUploadHint: 'JPG, PNG',
      imageAiHint: 'AI will generate an image based on topic',
      imageRemove: 'Remove',
      imageDragDrop: 'Click or drag an image',
      settingsLabel: 'Settings',
      toneLabel: 'Tone',
      emojiLabel: 'Emoji',
      lengthLabel: 'Length',
      toneProfessional: 'Professional',
      toneFriendly: 'Friendly',
      toneMotivating: 'Motivating',
      toneHumorous: 'Humorous',
      emojiYes: 'Yes',
      emojiNo: 'No',
      emojiMinimal: 'Minimal',
      lengthShort: 'Short',
      lengthMedium: 'Medium',
      lengthLong: 'Long',
      generate: 'Generate Post',
      generating: 'Generating...',
      resultLabel: 'Generated Text',
      resultPlaceholder: 'Generated text will appear here...',
      previewLabel: 'Preview',
      previewFacebook: 'Facebook',
      previewInstagram: 'Instagram',
      previewMobile: 'Mobile',
      previewDesktop: 'Desktop',
      copy: 'Copy',
      copied: 'Copied!',
      regenerateText: 'New Text',
      regenerateImage: 'New Image',
      saving: 'Saving...',
      saved: 'Saved',
      errorGeneration: 'Generation error. Try again.',
      errorTimeout: 'Took too long. Try again.'
    },
    generatorPage: {
      loginRequired: 'Sign in to generate photos',
    },
    imageGeneratorPage: {
      title: 'Image Generator',
      subtitle: 'Create images with AI from your description',
      industryLabel: 'Industry',
      industryPlaceholder: 'Select industry...',
      promptLabel: 'Description',
      promptHint: 'Describe the desired image in as much detail as possible',
      generate: 'Generate Image',
      generating: 'Generating...',
      resultLabel: 'Generated Image',
      download: 'Download',
      regenerate: 'Generate Again',
      saving: 'Saving...',
      saved: 'Saved'
    }
  }
} as const;

// Use a deep writable type to allow any language's translations
type DeepString<T> = T extends string ? string : { [K in keyof T]: DeepString<T[K]> };
export type Translations = DeepString<typeof translations.lt>;
