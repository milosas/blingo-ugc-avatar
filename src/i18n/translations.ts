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
      title: 'Re Edit Me',
      subtitle: 'Įkelkite nuotrauką ir sukurkite profesionalias nuotraukas su AI'
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
      poseLabel: 'Poza',
      placeholder: 'Pasirinkite...',
      promptLabel: 'Papildomi patikslinimai',
      promptHint: 'Pridėkite papildomus nurodymus (neprivaloma)',
      promptPlaceholder: 'pvz. rankos sukryžiuotos, žiūri į šoną...',
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
      'Patarimas: Išbandykite skirtingas pozas įvairesniam rezultatui'
    ],
    errors: {
      timeout: 'Užtruko per ilgai. Bandykite dar kartą.',
      network: 'Patikrinkite interneto ryšį ir bandykite dar kartą.',
      api: 'Nepavyko sugeneruoti. Bandykite vėliau.',
      avatarLoad: 'Nepavyko įkelti avatar nuotraukos. Bandykite dar kartą.',
      default: 'Įvyko klaida. Bandykite dar kartą.'
    },
    footer: 'Re Edit Me',
    privacyPolicy: 'Privatumo politika',
    footerSection: {
      tagline: 'AI turinio kūrimo platforma',
      navigation: 'Navigacija'
    },
    // Custom avatars section
    customAvatars: {
      myAvatars: 'Mano avatarai',
      presets: 'Šablonai',
      add: 'Pridėti',
      addTitle: 'Pridėti savo avatarą',
      uploadHint: 'Įkelkite savo nuotraukas ar piešinius kaip avatarus',
      customAvatar: 'Mano avataras',
      tapForOptions: 'Paspauskite meniu',
      selected: 'Pasirinkta',
      selectAvatar: 'Pasirinkti šį avatarą',
      notes: 'Pastabos',
      descriptionPlaceholder: 'Aprašykite šį avatarą...',
      save: 'Išsaugoti',
      cancel: 'Atšaukti',
      addDescription: 'Pridėti aprašymą...',
      deleting: 'Trinama...',
      delete: 'Ištrinti avatarą',
      clickOutsideToClose: 'Paspauskite šalia, kad uždarytumėte'
    },
    avatarCreator: {
      title: 'Sukurti avatarą',
      createAvatar: 'Sukurti avatarą',
      uploadPhoto: 'Įkelti nuotrauką',
      gender: 'Lytis',
      age: 'Amžius',
      ethnicity: 'Tautybė',
      skinTone: 'Odos spalva',
      hairColor: 'Plaukų spalva',
      hairLength: 'Plaukų ilgis',
      specialFeatures: 'Papildomi požymiai',
      specialFeaturesPlaceholder: 'pvz. tatuiruotės, akiniai, barzda...',
      prompt: 'Prompt (redaguojamas)',
      generate: 'Generuoti',
      generating: 'Generuojama...',
      regenerate: 'Pergeneruoti',
      save: 'Išsaugoti',
      saving: 'Saugoma...',
      cancel: 'Atšaukti',
      bodyType: 'Kūno tipas',
      framing: 'Kadravimas',
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
      'minimal': { name: 'Minimalistinė', description: 'Švarus, paprastas fonas' },
      'photo-studio': { name: 'Foto studija', description: 'Profesionali studijos aplinka' },
      'urban': { name: 'Miesto aplinka', description: 'Gatvės, miesto fonas' },
      'nature': { name: 'Gamta', description: 'Lauko, gamtos aplinka' }
    },
    moods: {
      'serious': { name: 'Rimtas', description: 'Profesionalus, susikaupęs' },
      'playful': { name: 'Žaismingas', description: 'Linksmas, energingas' },
      'relaxed': { name: 'Atsipalaidavęs', description: 'Ramus, natūralus' },
      'confident': { name: 'Pasitikintis', description: 'Stiprus, užtikrintas' },
      'mysterious': { name: 'Paslaptingas', description: 'Intriguojantis, paslaptingas' },
      'energetic': { name: 'Energingas', description: 'Dinamiškas, pilnas energijos' },
      'dreamy': { name: 'Svajingas', description: 'Romantiškas, svajingas' },
      'fierce': { name: 'Ryžtingas', description: 'Stiprus, ryžtingas' }
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
      3: { name: '3 nuotraukos', description: 'Maksimalus pasirinkimas' }
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
      title: 'Mano Galerija',
      empty: {
        title: 'Dar nera nuotrauku',
        subtitle: 'Sugeneruokite pirma nuotrauka ir pradekite savo galerija',
        cta: 'Generuoti nuotrauka'
      },
      guest: {
        title: 'Prisijunkite, kad matytumete galerija',
        subtitle: 'Sukurkite paskyra, kad galetumete issaugoti ir valdyti sugeneruotas nuotraukas',
        cta: 'Prisijungti'
      },
      actions: {
        download: 'Atsisiusti',
        delete: 'Istrinti',
        confirm: 'Patvirtinti',
        back: 'Grizti i generatoriu'
      },
      loading: 'Kraunama galerija...',
      error: 'Nepavyko ikelti galerijos'
    },
    nav: {
      home: 'Pradinis',
      gallery: 'Galerija',
      generate: 'Generuoti',
      avatars: 'Avatarai',
      dashboard: 'Tavo kūryba',
      pricing: 'Kainos',
      contact: 'Kontaktai',
      imageGenerator: 'Nuotraukų generatorius',
      imageGeneratorDesc: 'Text to image su AI',
      modelPhotos: 'Nuotraukos su modeliais',
      modelPhotosDesc: 'Produkto nuotraukos ant modelių',
      postCreator: 'Įrašų kūrėjas',
      postCreatorDesc: 'Socialinių tinklų įrašai'
    },
    avatarsPage: {
      title: 'Mano Avatarai',
      backToGenerator: 'Grįžti į generatorių',
      addAvatar: 'Pridėti avatarą',
      avatarCount: 'avataras(-ai)',
      noAvatars: 'Nėra avatarų',
      emptyTitle: 'Dar nėra avatarų',
      emptyHint: 'Įkelkite savo nuotraukas ar piešinius, kad naudotumėte kaip avatarus generavime',
      uploadFirst: 'Įkelti pirmą avatarą',
      loginRequired: 'Prisijunkite, kad valdytumėte savo avatarus',
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
      uploadFailed: 'Nepavyko įkelti avataro',
      descriptionPlaceholder: 'Aprašykite šį avatarą (naudojama AI generavimui)...',
      pendingMessage: 'AI analizuoja šį avatarą. Aprašymą galėsite redaguoti po analizės.',
      saving: 'Išsaugoma...',
      saveDescription: 'Išsaugoti aprašymą',
      saveFailed: 'Nepavyko išsaugoti aprašymo',
      selectForGenerator: 'Naudoti generatoriuje'
    },
    dashboard: {
      title: 'Tavo kūryba',
      backToHome: 'Grįžti į pradžią',
      welcome: 'Sveiki sugrįžę',
      guestTitle: 'Prisijunkite, kad matytumėte savo skydelį',
      guestDescription: 'Sekite savo generacijas, valdykite avatarus ir peržiūrėkite kreditus',
      signIn: 'Prisijungti',
      stats: {
        generations: 'Sukurta nuotraukų',
        avatars: 'Savi avatarai',
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
        avatars: 'Valdyti avatarus',
        avatarsDesc: 'Įkelkite ir valdykite savus avatarus',
        gallery: 'Peržiūrėti galeriją',
        galleryDesc: 'Naršykite visas sugeneruotas nuotraukas'
      },
      recentTitle: 'Naujausi kūriniai',
      viewAll: 'Žiūrėti visus',
      noImages: 'Dar nėra nuotraukų',
      createFirst: 'Sukurti pirmą nuotrauką',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Avatarai',
        creditsAndPlan: 'Kreditai & Planas',
        noGenerations: 'Dar nėra generacijų',
        noAvatars: 'Dar nėra avatarų',
        noPosts: 'Dar nėra įrašų',
        startGenerating: 'Pradėti generuoti',
        addAvatar: 'Pridėti avatarą',
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
        title: 'Viskas, ko reikia jūsų turiniui',
        subtitle: 'Trys galingi AI įrankiai vienoje vietoje — kurkite profesionalų turinį greičiau nei bet kada',
        ctaSignup: 'Registruotis nemokamai',
        ctaTry: 'Išbandyti be paskyros',
        ctaCreate: 'Pradėti kurti',
        ctaDashboard: 'Nustatymai',
        card1: {
          title: 'Nuotraukos su modeliais',
          description: 'Įkelkite produkto nuotrauką — AI uždės ant pasirinkto modelio ir sukurs profesionalų rezultatą'
        },
        card2: {
          title: 'AI nuotraukų generatorius',
          description: 'Sukurkite unikalias produktų nuotraukas nuo nulio — be fotografo ir be studijos'
        },
        card3: {
          title: 'Įrašų kūrėjas',
          description: 'Kurkite socialinių tinklų įrašus su AI — tekstas, nuotraukos arba abu kartu'
        }
      },
      pricing: {
        title: 'Paprastos, skaidrios kainos',
        subtitle: 'Pasirinkite planą, kuris tinka jūsų poreikiams',
        comingSoon: 'Netrukus',
        perMonth: '/mėn',
        getStarted: 'Pradėti',
        getPlan: 'Pasirinkti',
        mostPopular: 'Populiariausias',
        plans: {
          starter: {
            badge: 'Pradinis',
            name: 'Pradinis',
            subtitle: 'Puikus pradžiai',
            price: '€9',
            features: ['30 kreditų/mėn', 'Visi AI modeliai', 'Galerijos saugykla', 'El. pašto palaikymas']
          },
          pro: {
            badge: 'Populiariausias',
            name: 'Pro',
            subtitle: 'Kūrėjams ir influenceriams',
            price: '€19',
            features: ['70 kreditų/mėn', 'Visi AI modeliai', 'Galerijos saugykla', 'El. pašto palaikymas']
          },
          unlimited: {
            badge: 'Neribota',
            name: 'Neribota',
            subtitle: 'Aktyviems naudotojams',
            price: '€49',
            features: ['Neriboti kreditai', 'Visi AI modeliai', 'Galerijos saugykla', 'El. pašto palaikymas']
          }
        },
        credits: {
          title: 'Reikia daugiau kreditų?',
          subtitle: 'Pirkite papildomų kreditų bet kada. Prenumerata nereikalinga.',
          buyNow: 'Pirkti',
          save: 'Sutaupyk',
          packs: [
            { credits: '10', price: '€5' },
            { credits: '30', price: '€12', save: '20%' },
            { credits: '100', price: '€35', save: '30%' }
          ]
        }
      },
      faq: {
        title: 'Dažniausiai užduodami klausimai',
        subtitle: 'Turite klausimų? Mes turime atsakymus',
        items: {
          whatIsTool: {
            question: 'Kas yra Re Edit Me?',
            answer: 'Re Edit Me yra AI įrankis, kuris paverčia jūsų nuotraukas profesionaliais UGC (vartotojų sukurto turinio) marketingo paveikslėliais. Tiesiog įkelkite nuotrauką ir mūsų AI sugeneruos nuostabias variacijas pagal jūsų pasirinktą stilių, sceną ir nuotaiką.'
          },
          howGeneration: {
            question: 'Kaip veikia nuotraukų generavimas?',
            answer: 'Mūsų AI analizuoja jūsų įkeltą nuotrauką ir sujungia ją su jūsų pasirinktais avataro, scenos ir stiliaus nustatymais. Generavimo procesas trunka apie 30-60 sekundžių ir sukuria aukštos kokybės paveikslėlius, tinkamus marketingui ir socialiniams tinklams.'
          },
          whatAreCredits: {
            question: 'Kas yra kreditai ir kaip jie veikia?',
            answer: 'Kreditai naudojami nuotraukoms generuoti. Kiekvienas generavimas naudoja tam tikrą kreditų skaičių, priklausomai nuo pasirinktos kokybės ir raiškos. Kreditus galite įsigyti arba užsidirbti per mūsų prenumeratos planus.'
          },
          howUploadAvatars: {
            question: 'Kaip įkelti savus avatarus?',
            answer: 'Eikite į Avatarų skiltį iš pagrindinio meniu. Galite įkelti savo nuotraukas ar meno kūrinius, kuriuos naudosite kaip referencinius paveikslėlius generavimui. Savi avatarai leidžia išlaikyti nuoseklų prekės ženklo įvaizdį visuose jūsų turiniuose.'
          },
          isDataSafe: {
            question: 'Ar mano duomenys saugūs?',
            answer: 'Absoliučiai. Mes naudojame pramonės standarto šifravimą ir saugumo praktikas. Jūsų įkelti paveikslėliai saugomi saugiai ir prieinami tik jums. Mes niekada nedalinamės jūsų duomenimis su trečiosiomis šalimis. Skaitykite mūsų Privatumo politiką daugiau informacijos.'
          },
          howContact: {
            question: 'Kaip susisiekti su palaikymu?',
            answer: 'Galite susisiekti su mūsų palaikymo komanda el. paštu support@reeditme.com. Paprastai atsakome per 24 valandas darbo dienomis.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Populiariausia',
          title: 'Produkto nuotraukos ant tikrų modelių',
          subtitle: 'Įkelkite drabužio ar produkto nuotrauką — dirbtinis intelektas uždės ją ant pasirinkto modelio ir sukurs profesionalią marketingo nuotrauką vos per kelias minutes.',
          feature1: 'Pasirinkite iš 10+ profesionalių modelių arba įkelkite savo avatarą',
          feature2: 'Keiskite aplinkas, pozas, stilius ir nuotaikas vienu paspaudimu',
          feature3: 'Gaukite studijinės kokybės nuotraukas, paruoštas socialiniams tinklams ir e-parduotuvei',
          cta: 'Išbandyti dabar',
          creditInfo: 'Nuo 1 kredito už nuotrauką'
        },
        imageGenerator: {
          badge: 'Naujiena',
          title: 'AI nuotraukų generatorius',
          subtitle: 'Sukurkite visiškai naujas, unikalias produktų nuotraukas nuo nulio su dirbtinio intelekto pagalba — be fotografo, be studijos, be modelio.',
          feature1: 'Aprašykite norimą nuotrauką ir AI ją sukurs per sekundes',
          feature2: 'Pasirinkite stilių, kompoziciją ir nuotaiką pagal jūsų prekės ženklą',
          feature3: 'Eksportuokite aukštos raiškos formatu, paruoštu spaudai ir internetui',
          cta: 'Pradėti kurti',
          creditInfo: 'Nuo 2 kreditų už nuotrauką'
        },
        postCreator: {
          badge: 'Viskas viename',
          title: 'Socialinių tinklų įrašų kūrėjas',
          subtitle: 'Kurkite profesionalius marketingo įrašus vos keliais paspaudimais — AI sugeneruos patrauklų tekstą, pritaikytą jūsų auditorijai ir platformai.',
          feature1: 'AI rašo tekstą, pritaikytą jūsų prekės ženklo tonui ir auditorijai',
          feature2: 'Kurkite įrašus su nuotraukomis arba tik tekstinius — jūsų pasirinkimas',
          feature3: 'Optimizuota Instagram, Facebook, TikTok ir kitoms platformoms',
          cta: 'Kurti įrašą',
          creditInfo: 'Nuo 1 kredito už įrašą'
        }
      },
      footer: {
        contact: 'Kontaktai'
      },
      platformStats: {
        imagesCreated: 'Sukurta paveikslėlių',
        imagesEdited: 'Redaguota paveikslėlių',
        postsCreated: 'Sukurta įrašų',
      }
    },
    postCreatorPage: {
      title: 'Įrašų kūrėjas',
      subtitle: 'Sukurkite profesionalius socialinių tinklų įrašus su AI',
      industryLabel: 'Sritis',
      industryPlaceholder: 'Pasirinkite sritį...',
      topicLabel: 'Tema',
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
    imageGeneratorPage: {
      title: 'Nuotraukų generatorius',
      subtitle: 'Sukurkite nuotraukas su AI pagal jūsų aprašymą',
      industryLabel: 'Sritis',
      industryPlaceholder: 'Pasirinkite sritį...',
      promptLabel: 'Aprašymas',
      promptHint: 'Aprašykite norimą nuotrauką kuo detaliau',
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
      title: 'Re Edit Me',
      subtitle: 'Augšupielādējiet attēlu un izveidojiet profesionālus attēlus ar AI'
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
      poseLabel: 'Poza',
      placeholder: 'Izvēlieties...',
      promptLabel: 'Papildu norādes',
      promptHint: 'Pievienojiet papildu norādes (nav obligāti)',
      promptPlaceholder: 'piem. rokas sakrustotas, skatās uz sāniem...',
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
      'Padoms: Izmēģiniet dažādas pozas daudzveidīgākiem rezultātiem'
    ],
    errors: {
      timeout: 'Pārāk ilgi. Mēģiniet vēlreiz.',
      network: 'Pārbaudiet interneta savienojumu un mēģiniet vēlreiz.',
      api: 'Neizdevās ģenerēt. Mēģiniet vēlāk.',
      avatarLoad: 'Neizdevās ielādēt avatāra attēlu. Mēģiniet vēlreiz.',
      default: 'Radās kļūda. Mēģiniet vēlreiz.'
    },
    footer: 'Re Edit Me',
    privacyPolicy: 'Privātuma politika',
    footerSection: {
      tagline: 'AI satura veidošanas platforma',
      navigation: 'Navigācija'
    },
    customAvatars: {
      myAvatars: 'Mani avatāri',
      presets: 'Šabloni',
      add: 'Pievienot',
      addTitle: 'Pievienot savu avatāru',
      uploadHint: 'Augšupielādējiet savus attēlus vai zīmējumus kā avatārus',
      customAvatar: 'Mans avatārs',
      tapForOptions: 'Pieskarieties izvēlnei',
      selected: 'Izvēlēts',
      selectAvatar: 'Izvēlēties šo avatāru',
      notes: 'Piezīmes',
      descriptionPlaceholder: 'Aprakstiet šo avatāru...',
      save: 'Saglabāt',
      cancel: 'Atcelt',
      addDescription: 'Pievienot aprakstu...',
      deleting: 'Dzēš...',
      delete: 'Dzēst avatāru',
      clickOutsideToClose: 'Noklikšķiniet ārpusē, lai aizvērtu'
    },
    avatarCreator: {
      title: 'Izveidot avatāru',
      createAvatar: 'Izveidot avatāru',
      uploadPhoto: 'Augšupielādēt fotoattēlu',
      gender: 'Dzimums',
      age: 'Vecums',
      ethnicity: 'Tautība',
      skinTone: 'Ādas tonis',
      hairColor: 'Matu krāsa',
      hairLength: 'Matu garums',
      specialFeatures: 'Papildu iezīmes',
      specialFeaturesPlaceholder: 'piem. tetovējumi, brilles, bārda...',
      prompt: 'Prompt (rediģējams)',
      generate: 'Ģenerēt',
      generating: 'Ģenerē...',
      regenerate: 'Pārģenerēt',
      save: 'Saglabāt',
      saving: 'Saglabā...',
      cancel: 'Atcelt',
      bodyType: 'Ķermeņa tips',
      framing: 'Kadrējums',
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
      'minimal': { name: 'Minimālistisks', description: 'Tīrs, vienkāršs fons' },
      'photo-studio': { name: 'Foto studija', description: 'Profesionāla studijas vide' },
      'urban': { name: 'Pilsētas vide', description: 'Ielas, pilsētas fons' },
      'nature': { name: 'Daba', description: 'Āra, dabas vide' }
    },
    moods: {
      'serious': { name: 'Nopietns', description: 'Profesionāls, koncentrēts' },
      'playful': { name: 'Rotaļīgs', description: 'Jautrs, enerģisks' },
      'relaxed': { name: 'Atslābināts', description: 'Mierīgs, dabisks' },
      'confident': { name: 'Pārliecināts', description: 'Spēcīgs, drošs' },
      'mysterious': { name: 'Noslēpumains', description: 'Intriģējošs, noslēpumains' },
      'energetic': { name: 'Enerģisks', description: 'Dinamisks, pilns enerģijas' },
      'dreamy': { name: 'Sapņains', description: 'Romantisks, sapņains' },
      'fierce': { name: 'Apņēmīgs', description: 'Spēcīgs, apņēmīgs' }
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
      3: { name: '3 attēli', description: 'Maksimāla izvēle' }
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
      title: 'Mana Galerija',
      empty: {
        title: 'Vel nav attelu',
        subtitle: 'Generejiet pirmo attelu, lai sāktu savu galeriju',
        cta: 'Generēt attēlu'
      },
      guest: {
        title: 'Pieslēdzieties, lai redzētu galeriju',
        subtitle: 'Izveidojiet kontu, lai saglabātu un pārvaldītu ģenerētos attēlus',
        cta: 'Pieslēgties'
      },
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
      avatars: 'Avatāri',
      dashboard: 'Tava jaunrade',
      pricing: 'Cenas',
      contact: 'Kontakti',
      imageGenerator: 'Attēlu ģenerators',
      imageGeneratorDesc: 'Text to image ar AI',
      modelPhotos: 'Foto ar modeļiem',
      modelPhotosDesc: 'Produktu foto uz modeļiem',
      postCreator: 'Ierakstu veidotājs',
      postCreatorDesc: 'Sociālo tīklu ieraksti'
    },
    avatarsPage: {
      title: 'Mani Avatāri',
      backToGenerator: 'Atpakaļ uz ģeneratoru',
      addAvatar: 'Pievienot avatāru',
      avatarCount: 'avatārs(-i)',
      noAvatars: 'Nav avatāru',
      emptyTitle: 'Vēl nav avatāru',
      emptyHint: 'Augšupielādējiet savas fotogrāfijas vai mākslu, lai izmantotu kā avatārus ģenerācijā',
      uploadFirst: 'Augšupielādēt pirmo avatāru',
      loginRequired: 'Pieslēdzieties, lai pārvaldītu savus avatārus',
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
      uploadFailed: 'Neizdevās augšupielādēt avatāru',
      descriptionPlaceholder: 'Aprakstiet šo avatāru (izmantots AI ģenerācijā)...',
      pendingMessage: 'AI analizē šo avatāru. Varat rediģēt aprakstu pēc analīzes.',
      saving: 'Saglabā...',
      saveDescription: 'Saglabāt aprakstu',
      saveFailed: 'Neizdevās saglabāt aprakstu',
      selectForGenerator: 'Izmantot ģeneratorā'
    },
    dashboard: {
      title: 'Tava jaunrade',
      backToHome: 'Atpakaļ uz sākumu',
      welcome: 'Laipni lūgti atpakaļ',
      guestTitle: 'Pieslēdzieties, lai redzētu savu paneli',
      guestDescription: 'Sekojiet savām ģenerācijām, pārvaldiet avatārus un skatiet kredītus',
      signIn: 'Pieslēgties',
      stats: {
        generations: 'Izveidoti attēli',
        avatars: 'Pielāgoti avatāri',
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
        avatars: 'Pārvaldīt avatārus',
        avatarsDesc: 'Augšupielādējiet un pārvaldiet pielāgotus avatārus',
        gallery: 'Skatīt galeriju',
        galleryDesc: 'Pārlūkojiet visus ģenerētos attēlus'
      },
      recentTitle: 'Jaunākie darbi',
      viewAll: 'Skatīt visus',
      noImages: 'Vēl nav attēlu',
      createFirst: 'Izveidot pirmo attēlu',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Avatāri',
        creditsAndPlan: 'Kredīti & Plāns',
        noGenerations: 'Vēl nav ģenerāciju',
        noAvatars: 'Vēl nav avatāru',
        noPosts: 'Vēl nav ierakstu',
        startGenerating: 'Sākt ģenerēt',
        addAvatar: 'Pievienot avatāru',
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
        title: 'Viss, kas nepieciešams jūsu saturam',
        subtitle: 'Trīs jaudīgi AI rīki vienuviet — veidojiet profesionālu saturu ātrāk nekā jebkad',
        ctaSignup: 'Reģistrēties bez maksas',
        ctaTry: 'Izmēģināt bez konta',
        ctaCreate: 'Sākt veidot',
        ctaDashboard: 'Iestatījumi',
        card1: {
          title: 'Fotogrāfijas ar modeļiem',
          description: 'Augšupielādējiet produkta foto — AI uzliks uz izvēlētā modeļa un izveidos profesionālu rezultātu'
        },
        card2: {
          title: 'AI attēlu ģenerators',
          description: 'Izveidojiet unikālus produktu attēlus no nulles — bez fotogrāfa un bez studijas'
        },
        card3: {
          title: 'Ierakstu veidotājs',
          description: 'Veidojiet sociālo tīklu ierakstus ar AI — teksts, attēli vai abi kopā'
        }
      },
      pricing: {
        title: 'Vienkāršas, caurspīdīgas cenas',
        subtitle: 'Izvēlieties plānu, kas atbilst jūsu vajadzībām',
        comingSoon: 'Drīzumā',
        perMonth: '/mēn',
        getStarted: 'Sākt',
        getPlan: 'Izvēlēties',
        mostPopular: 'Populārākais',
        plans: {
          starter: {
            badge: 'Sākuma',
            name: 'Sākuma',
            subtitle: 'Lieliski sākumam',
            price: '€9',
            features: ['30 kredīti/mēn', 'Visi AI modeļi', 'Galerijas krātuve', 'E-pasta atbalsts']
          },
          pro: {
            badge: 'Populārākais',
            name: 'Pro',
            subtitle: 'Satura veidotājiem',
            price: '€19',
            features: ['70 kredīti/mēn', 'Visi AI modeļi', 'Galerijas krātuve', 'E-pasta atbalsts']
          },
          unlimited: {
            badge: 'Neierobežots',
            name: 'Neierobežots',
            subtitle: 'Aktīviem lietotājiem',
            price: '€49',
            features: ['Neierobežoti kredīti', 'Visi AI modeļi', 'Galerijas krātuve', 'E-pasta atbalsts']
          }
        },
        credits: {
          title: 'Nepieciešami vairāk kredītu?',
          subtitle: 'Iegādājieties papildu kredītus jebkurā laikā. Abonements nav nepieciešams.',
          buyNow: 'Pirkt',
          save: 'Ietaupiet',
          packs: [
            { credits: '10', price: '€5' },
            { credits: '30', price: '€12', save: '20%' },
            { credits: '100', price: '€35', save: '30%' }
          ]
        }
      },
      faq: {
        title: 'Biežāk uzdotie jautājumi',
        subtitle: 'Ir jautājumi? Mums ir atbildes',
        items: {
          whatIsTool: {
            question: 'Kas ir Re Edit Me?',
            answer: 'Re Edit Me ir AI rīks, kas pārveido jūsu fotogrāfijas profesionālos UGC (lietotāju veidota satura) mārketinga attēlos. Vienkārši augšupielādējiet fotogrāfiju un mūsu AI ģenerēs pārsteidzošas variācijas, pamatojoties uz jūsu izvēlēto stilu, ainu un noskaņojumu.'
          },
          howGeneration: {
            question: 'Kā darbojas attēlu ģenerēšana?',
            answer: 'Mūsu AI analizē jūsu augšupielādēto fotogrāfiju un apvieno to ar jūsu izvēlētajiem avatāra, ainas un stila iestatījumiem. Ģenerēšanas process ilgst aptuveni 30-60 sekundes un rada augstas kvalitātes attēlus, kas piemēroti mārketingam un sociālajiem tīkliem.'
          },
          whatAreCredits: {
            question: 'Kas ir kredīti un kā tie darbojas?',
            answer: 'Kredīti tiek izmantoti attēlu ģenerēšanai. Katra ģenerēšana izmanto noteiktu kredītu skaitu atkarībā no izvēlētās kvalitātes un izšķirtspējas. Kredītus var iegādāties vai nopelnīt ar mūsu abonēšanas plāniem.'
          },
          howUploadAvatars: {
            question: 'Kā augšupielādēt pielāgotus avatārus?',
            answer: 'Dodieties uz Avatāru sadaļu no galvenās izvēlnes. Jūs varat augšupielādēt savas fotogrāfijas vai mākslas darbus, ko izmantot kā atsauces attēlus ģenerēšanai. Pielāgoti avatāri ļauj saglabāt konsekventu zīmola tēlu visos jūsu saturos.'
          },
          isDataSafe: {
            question: 'Vai mani dati ir droši?',
            answer: 'Absolūti. Mēs izmantojam nozares standarta šifrēšanu un drošības praksi. Jūsu augšupielādētie attēli tiek droši glabāti un ir pieejami tikai jums. Mēs nekad nedalāmies ar jūsu datiem ar trešajām pusēm. Lasiet mūsu Privātuma politiku, lai uzzinātu vairāk.'
          },
          howContact: {
            question: 'Kā sazināties ar atbalstu?',
            answer: 'Jūs varat sazināties ar mūsu atbalsta komandu pa e-pastu support@reeditme.com. Mēs parasti atbildam 24 stundu laikā darba dienās.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Populārākais',
          title: 'Produktu fotogrāfijas uz īstiem modeļiem',
          subtitle: 'Augšupielādējiet apģērba vai produkta fotogrāfiju — AI to uzliks uz izvēlētā modeļa un izveidos profesionālu mārketinga attēlu dažu minūšu laikā.',
          feature1: 'Izvēlieties no 10+ profesionāliem modeļiem vai augšupielādējiet savu avatāru',
          feature2: 'Mainiet vidi, pozas, stilus un noskaņojumus ar vienu klikšķi',
          feature3: 'Iegūstiet studijas kvalitātes fotogrāfijas, gatavas sociālajiem tīkliem un e-veikalam',
          cta: 'Izmēģināt tagad',
          creditInfo: 'No 1 kredīta par fotogrāfiju'
        },
        imageGenerator: {
          badge: 'Jaunums',
          title: 'AI attēlu ģenerators',
          subtitle: 'Izveidojiet pilnīgi jaunus, unikālus produktu attēlus no nulles ar AI palīdzību — bez fotogrāfa, bez studijas, bez modeļa.',
          feature1: 'Aprakstiet vēlamo attēlu un AI to izveidos dažu sekunžu laikā',
          feature2: 'Izvēlieties stilu, kompozīciju un noskaņojumu atbilstoši jūsu zīmolam',
          feature3: 'Eksportējiet augstas izšķirtspējas formātā, gatavu drukāšanai un tīmeklim',
          cta: 'Sākt veidot',
          creditInfo: 'No 2 kredītiem par attēlu'
        },
        postCreator: {
          badge: 'Viss vienā',
          title: 'Sociālo tīklu ierakstu veidotājs',
          subtitle: 'Veidojiet profesionālus mārketinga ierakstus dažu klikšķu laikā — AI ģenerēs saistošu tekstu, pielāgotu jūsu auditorijai un platformai.',
          feature1: 'AI raksta tekstu, pielāgotu jūsu zīmola tonim un auditorijai',
          feature2: 'Veidojiet ierakstus ar attēliem vai tikai tekstu — jūsu izvēle',
          feature3: 'Optimizēts Instagram, Facebook, TikTok un citām platformām',
          cta: 'Veidot ierakstu',
          creditInfo: 'No 1 kredīta par ierakstu'
        }
      },
      footer: {
        contact: 'Kontakti'
      },
      platformStats: {
        imagesCreated: 'Izveidoti attēli',
        imagesEdited: 'Rediģēti attēli',
        postsCreated: 'Izveidoti ieraksti',
      }
    },
    postCreatorPage: {
      title: 'Ierakstu veidotājs',
      subtitle: 'Izveidojiet profesionālus sociālo tīklu ierakstus ar AI',
      industryLabel: 'Nozare',
      industryPlaceholder: 'Izvēlieties nozari...',
      topicLabel: 'Tēma',
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
    imageGeneratorPage: {
      title: 'Attēlu ģenerators',
      subtitle: 'Izveidojiet attēlus ar AI pēc jūsu apraksta',
      industryLabel: 'Nozare',
      industryPlaceholder: 'Izvēlieties nozari...',
      promptLabel: 'Apraksts',
      promptHint: 'Aprakstiet vēlamo attēlu pēc iespējas detalizētāk',
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
      title: 'Re Edit Me',
      subtitle: 'Laadige pilt üles ja looge professionaalseid pilte AI-ga'
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
      poseLabel: 'Poos',
      placeholder: 'Valige...',
      promptLabel: 'Lisajuhised',
      promptHint: 'Lisage täiendavaid juhiseid (valikuline)',
      promptPlaceholder: 'nt käed ristatud, vaatab küljele...',
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
      'Nõuanne: Proovige erinevaid poose mitmekesisemate tulemuste saamiseks'
    ],
    errors: {
      timeout: 'Võttis liiga kaua. Proovige uuesti.',
      network: 'Kontrollige internetiühendust ja proovige uuesti.',
      api: 'Genereerimine ebaõnnestus. Proovige hiljem.',
      avatarLoad: 'Avatari pildi laadimine ebaõnnestus. Proovige uuesti.',
      default: 'Tekkis viga. Proovige uuesti.'
    },
    footer: 'Re Edit Me',
    privacyPolicy: 'Privaatsuspoliitika',
    footerSection: {
      tagline: 'AI sisuloome platvorm',
      navigation: 'Navigatsioon'
    },
    customAvatars: {
      myAvatars: 'Minu avataarid',
      presets: 'Šabloonid',
      add: 'Lisa',
      addTitle: 'Lisa oma avataar',
      uploadHint: 'Laadige üles oma fotod või joonistused avataaridena',
      customAvatar: 'Minu avataar',
      tapForOptions: 'Puudutage menüü jaoks',
      selected: 'Valitud',
      selectAvatar: 'Vali see avataar',
      notes: 'Märkmed',
      descriptionPlaceholder: 'Kirjeldage seda avataari...',
      save: 'Salvesta',
      cancel: 'Tühista',
      addDescription: 'Lisa kirjeldus...',
      deleting: 'Kustutamine...',
      delete: 'Kustuta avataar',
      clickOutsideToClose: 'Sulgemiseks klõpsake väljaspool'
    },
    avatarCreator: {
      title: 'Loo avataar',
      createAvatar: 'Loo avataar',
      uploadPhoto: 'Laadi foto üles',
      gender: 'Sugu',
      age: 'Vanus',
      ethnicity: 'Rahvus',
      skinTone: 'Nahatoon',
      hairColor: 'Juuste värv',
      hairLength: 'Juuste pikkus',
      specialFeatures: 'Lisatunnused',
      specialFeaturesPlaceholder: 'nt. tätoveeringud, prillid, habe...',
      prompt: 'Prompt (muudetav)',
      generate: 'Genereeri',
      generating: 'Genereerimine...',
      regenerate: 'Genereeri uuesti',
      save: 'Salvesta',
      saving: 'Salvestamine...',
      cancel: 'Tühista',
      bodyType: 'Kehatüüp',
      framing: 'Kadreerimine',
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
      'minimal': { name: 'Minimalistlik', description: 'Puhas, lihtne taust' },
      'photo-studio': { name: 'Fotostuudio', description: 'Professionaalne stuudiokeskkond' },
      'urban': { name: 'Linnakeskkond', description: 'Tänav, linna taust' },
      'nature': { name: 'Loodus', description: 'Väli, looduskeskkond' }
    },
    moods: {
      'serious': { name: 'Tõsine', description: 'Professionaalne, keskendunud' },
      'playful': { name: 'Mänguline', description: 'Lõbus, energiline' },
      'relaxed': { name: 'Lõõgastunud', description: 'Rahulik, loomulik' },
      'confident': { name: 'Enesekindel', description: 'Tugev, kindel' },
      'mysterious': { name: 'Salapärane', description: 'Intrigeeriv, salapärane' },
      'energetic': { name: 'Energiline', description: 'Dünaamiline, energiat täis' },
      'dreamy': { name: 'Unistav', description: 'Romantiline, unistav' },
      'fierce': { name: 'Kindlameelne', description: 'Tugev, kindlameelne' }
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
      3: { name: '3 pilti', description: 'Maksimaalne valik' }
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
      title: 'Minu Galerii',
      empty: {
        title: 'Pilte pole veel',
        subtitle: 'Genereerige esimene pilt, et alustada oma galeriid',
        cta: 'Genereeri pilt'
      },
      guest: {
        title: 'Logi sisse, et näha galeriid',
        subtitle: 'Loo konto, et salvestada ja hallata genereeritud pilte',
        cta: 'Logi sisse'
      },
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
      avatars: 'Avatarid',
      dashboard: 'Sinu looming',
      pricing: 'Hinnad',
      contact: 'Kontakt',
      imageGenerator: 'Piltide generaator',
      imageGeneratorDesc: 'Text to image AI-ga',
      modelPhotos: 'Fotod modellidega',
      modelPhotosDesc: 'Tootefotod modellidel',
      postCreator: 'Postituste looja',
      postCreatorDesc: 'Sotsiaalmeedia postitused'
    },
    avatarsPage: {
      title: 'Minu Avatarid',
      backToGenerator: 'Tagasi generaatorisse',
      addAvatar: 'Lisa avatar',
      avatarCount: 'avatar(it)',
      noAvatars: 'Avatare pole',
      emptyTitle: 'Avatare pole veel',
      emptyHint: 'Laadige üles oma fotod või kunstiteosed, et kasutada neid avataridena genereerimisel',
      uploadFirst: 'Laadi üles esimene avatar',
      loginRequired: 'Logi sisse, et hallata oma avatare',
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
      uploadFailed: 'Avatari üleslaadimine ebaõnnestus',
      descriptionPlaceholder: 'Kirjeldage seda avatari (kasutatakse AI genereerimisel)...',
      pendingMessage: 'AI analüüsib seda avatari. Saate kirjeldust muuta pärast analüüsi.',
      saving: 'Salvestab...',
      saveDescription: 'Salvesta kirjeldus',
      saveFailed: 'Kirjelduse salvestamine ebaõnnestus',
      selectForGenerator: 'Kasuta generaatoris'
    },
    dashboard: {
      title: 'Sinu looming',
      backToHome: 'Tagasi avalehele',
      welcome: 'Tere tulemast tagasi',
      guestTitle: 'Logi sisse, et näha oma paneeli',
      guestDescription: 'Jälgi oma genereerimisi, halda avatare ja vaata krediite',
      signIn: 'Logi sisse',
      stats: {
        generations: 'Loodud pilte',
        avatars: 'Kohandatud avatarid',
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
        avatars: 'Halda avatare',
        avatarsDesc: 'Laadi üles ja halda kohandatud avatare',
        gallery: 'Vaata galeriid',
        galleryDesc: 'Sirvi kõiki genereeritud pilte'
      },
      recentTitle: 'Viimased tööd',
      viewAll: 'Vaata kõiki',
      noImages: 'Pilte pole veel',
      createFirst: 'Loo esimene pilt',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Avatarid',
        creditsAndPlan: 'Krediidid & Plaan',
        noGenerations: 'Genereerimisi pole veel',
        noAvatars: 'Avatare pole veel',
        noPosts: 'Postitusi pole veel',
        startGenerating: 'Alusta genereerimist',
        addAvatar: 'Lisa avatar',
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
        title: 'Kõik, mida vajate oma sisu jaoks',
        subtitle: 'Kolm võimsat AI tööriista ühes kohas — looge professionaalset sisu kiiremini kui kunagi varem',
        ctaSignup: 'Registreeru tasuta',
        ctaTry: 'Proovi ilma kontota',
        ctaCreate: 'Alusta loomist',
        ctaDashboard: 'Seaded',
        card1: {
          title: 'Fotod modellide peal',
          description: 'Laadige üles toote foto — AI paneb selle valitud modellile ja loob professionaalse tulemuse'
        },
        card2: {
          title: 'AI piltide generaator',
          description: 'Looge unikaalseid tootepilte nullist — ilma fotograafita ja ilma stuudiota'
        },
        card3: {
          title: 'Postituste looja',
          description: 'Looge sotsiaalmeedia postitusi AI-ga — tekst, pildid või mõlemad koos'
        }
      },
      pricing: {
        title: 'Lihtsad, läbipaistvad hinnad',
        subtitle: 'Valige plaan, mis sobib teie vajadustega',
        comingSoon: 'Varsti',
        perMonth: '/kuu',
        getStarted: 'Alusta',
        getPlan: 'Vali',
        mostPopular: 'Populaarseim',
        plans: {
          starter: {
            badge: 'Alustaja',
            name: 'Alustaja',
            subtitle: 'Suurepärane alguseks',
            price: '€9',
            features: ['30 krediiti/kuu', 'Kõik AI mudelid', 'Galerii salvestusruum', 'E-posti tugi']
          },
          pro: {
            badge: 'Populaarseim',
            name: 'Pro',
            subtitle: 'Sisuloojatele',
            price: '€19',
            features: ['70 krediiti/kuu', 'Kõik AI mudelid', 'Galerii salvestusruum', 'E-posti tugi']
          },
          unlimited: {
            badge: 'Piiramatu',
            name: 'Piiramatu',
            subtitle: 'Aktiivsetele kasutajatele',
            price: '€49',
            features: ['Piiramatult krediite', 'Kõik AI mudelid', 'Galerii salvestusruum', 'E-posti tugi']
          }
        },
        credits: {
          title: 'Vajad rohkem krediite?',
          subtitle: 'Osta lisakrediite igal ajal. Tellimust pole vaja.',
          buyNow: 'Osta',
          save: 'Säästa',
          packs: [
            { credits: '10', price: '€5' },
            { credits: '30', price: '€12', save: '20%' },
            { credits: '100', price: '€35', save: '30%' }
          ]
        }
      },
      faq: {
        title: 'Korduma kippuvad küsimused',
        subtitle: 'On küsimusi? Meil on vastused',
        items: {
          whatIsTool: {
            question: 'Mis on Re Edit Me?',
            answer: 'Re Edit Me on AI tööriist, mis muudab teie fotod professionaalseteks UGC (kasutajate loodud sisu) turunduspiltideks. Laadige lihtsalt foto üles ja meie AI genereerib hämmastavaid variatsioone vastavalt teie valitud stiilile, stseenile ja meeleolule.'
          },
          howGeneration: {
            question: 'Kuidas piltide genereerimine töötab?',
            answer: 'Meie AI analüüsib teie üleslaaditud fotot ja ühendab selle teie valitud avatari, stseeni ja stiili sätetega. Genereerimisprotsess võtab umbes 30-60 sekundit ja loob kõrgekvaliteedilisi pilte, mis sobivad turunduseks ja sotsiaalmeediasse.'
          },
          whatAreCredits: {
            question: 'Mis on krediidid ja kuidas need töötavad?',
            answer: 'Krediite kasutatakse piltide genereerimiseks. Iga genereerimine kasutab teatud arvu krediite sõltuvalt valitud kvaliteedist ja resolutsioonist. Krediite saab osta või teenida meie tellimisplaanidega.'
          },
          howUploadAvatars: {
            question: 'Kuidas üles laadida kohandatud avatare?',
            answer: 'Minge Avataride sektsiooni peamenüüst. Saate üles laadida oma fotosid või kunstiteoseid, mida kasutada viitepiltidena genereerimisel. Kohandatud avatarid võimaldavad säilitada järjepideva brändikujundi kogu teie sisus.'
          },
          isDataSafe: {
            question: 'Kas minu andmed on turvalised?',
            answer: 'Absoluutselt. Me kasutame tööstusstandardi krüpteerimist ja turvapraktikaid. Teie üleslaaditud pildid on turvaliselt salvestatud ja ligipääsetavad ainult teile. Me ei jaga kunagi teie andmeid kolmandate osapooltega. Lugege meie Privaatsuspoliitikat lisateabe saamiseks.'
          },
          howContact: {
            question: 'Kuidas võtta ühendust toega?',
            answer: 'Saate võtta ühendust meie tugimeeskonnaga e-posti teel support@reeditme.com. Tavaliselt vastame 24 tunni jooksul tööpäevadel.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Populaarseim',
          title: 'Tootefotod päris modellide peal',
          subtitle: 'Laadige üles rõiva või toote foto — AI paneb selle valitud modellile selga ja loob professionaalse turunduspildi vaid mõne minutiga.',
          feature1: 'Valige 10+ professionaalse mudeli hulgast või laadige üles oma avatar',
          feature2: 'Muutke keskkonda, poose, stiile ja meeleolusid ühe klõpsuga',
          feature3: 'Saage stuudiokvaliteediga fotod, valmis sotsiaalmeediaks ja e-poeks',
          cta: 'Proovi kohe',
          creditInfo: 'Alates 1 krediidist foto kohta'
        },
        imageGenerator: {
          badge: 'Uus',
          title: 'AI piltide generaator',
          subtitle: 'Looge täiesti uusi, unikaalseid tootepilte nullist AI abiga — ilma fotograafita, ilma stuudiota, ilma modellita.',
          feature1: 'Kirjeldage soovitud pilti ja AI loob selle sekunditega',
          feature2: 'Valige stiil, kompositsioon ja meeleolu vastavalt oma brändile',
          feature3: 'Eksportige kõrge eraldusvõimega formaadis, valmis trükiks ja veebi',
          cta: 'Alusta loomist',
          creditInfo: 'Alates 2 krediidist pildi kohta'
        },
        postCreator: {
          badge: 'Kõik ühes',
          title: 'Sotsiaalmeedia postituste looja',
          subtitle: 'Looge professionaalseid turunduspostitusi vaid mõne klõpsuga — AI genereerib kaasahaarava teksti, kohandatud teie publikule ja platvormile.',
          feature1: 'AI kirjutab teksti, kohandatud teie brändi toonile ja publikule',
          feature2: 'Looge postitusi piltidega või ainult tekstiga — teie valik',
          feature3: 'Optimeeritud Instagram, Facebook, TikTok ja teistele platvormidele',
          cta: 'Loo postitus',
          creditInfo: 'Alates 1 krediidist postituse kohta'
        }
      },
      footer: {
        contact: 'Kontakt'
      },
      platformStats: {
        imagesCreated: 'Loodud pilte',
        imagesEdited: 'Redigeeritud pilte',
        postsCreated: 'Loodud postitusi',
      }
    },
    postCreatorPage: {
      title: 'Postituste looja',
      subtitle: 'Looge professionaalseid sotsiaalmeedia postitusi AI-ga',
      industryLabel: 'Valdkond',
      industryPlaceholder: 'Valige valdkond...',
      topicLabel: 'Teema',
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
    imageGeneratorPage: {
      title: 'Piltide generaator',
      subtitle: 'Looge pilte AI-ga oma kirjelduse järgi',
      industryLabel: 'Valdkond',
      industryPlaceholder: 'Valige valdkond...',
      promptLabel: 'Kirjeldus',
      promptHint: 'Kirjeldage soovitud pilti võimalikult detailselt',
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
      title: 'Re Edit Me',
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
      'Tip: Try different poses for more variety'
    ],
    errors: {
      timeout: 'Took too long. Please try again.',
      network: 'Check your internet connection and try again.',
      api: 'Failed to generate. Please try later.',
      avatarLoad: 'Failed to load avatar image. Please try again.',
      default: 'An error occurred. Please try again.'
    },
    footer: 'Re Edit Me',
    privacyPolicy: 'Privacy Policy',
    footerSection: {
      tagline: 'AI-powered content creation platform',
      navigation: 'Navigation'
    },
    customAvatars: {
      myAvatars: 'My Avatars',
      presets: 'Presets',
      add: 'Add',
      addTitle: 'Add custom avatar',
      uploadHint: 'Upload your own photos or art to use as avatars',
      customAvatar: 'Custom Avatar',
      tapForOptions: 'Tap for options',
      selected: 'Selected',
      selectAvatar: 'Select this avatar',
      notes: 'Notes',
      descriptionPlaceholder: 'Describe this avatar...',
      save: 'Save',
      cancel: 'Cancel',
      addDescription: 'Add description...',
      deleting: 'Deleting...',
      delete: 'Delete avatar',
      clickOutsideToClose: 'Click outside to close'
    },
    avatarCreator: {
      title: 'Create Avatar',
      createAvatar: 'Create avatar',
      uploadPhoto: 'Upload photo',
      gender: 'Gender',
      age: 'Age',
      ethnicity: 'Ethnicity',
      skinTone: 'Skin tone',
      hairColor: 'Hair color',
      hairLength: 'Hair length',
      specialFeatures: 'Special features',
      specialFeaturesPlaceholder: 'e.g. tattoos, glasses, beard...',
      prompt: 'Prompt (editable)',
      generate: 'Generate',
      generating: 'Generating...',
      regenerate: 'Regenerate',
      save: 'Save',
      saving: 'Saving...',
      cancel: 'Cancel',
      bodyType: 'Body type',
      framing: 'Framing',
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
      'minimal': { name: 'Minimalist', description: 'Clean, simple background' },
      'photo-studio': { name: 'Photo studio', description: 'Professional studio environment' },
      'urban': { name: 'Urban', description: 'Street, city background' },
      'nature': { name: 'Nature', description: 'Outdoor, natural setting' }
    },
    moods: {
      'serious': { name: 'Serious', description: 'Professional, focused' },
      'playful': { name: 'Playful', description: 'Fun, energetic' },
      'relaxed': { name: 'Relaxed', description: 'Calm, natural' },
      'confident': { name: 'Confident', description: 'Strong, assured' },
      'mysterious': { name: 'Mysterious', description: 'Intriguing, mysterious' },
      'energetic': { name: 'Energetic', description: 'Dynamic, full of energy' },
      'dreamy': { name: 'Dreamy', description: 'Romantic, dreamy' },
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
      3: { name: '3 photos', description: 'Maximum selection' }
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
      avatars: 'Avatars',
      dashboard: 'Your creations',
      pricing: 'Pricing',
      contact: 'Contact',
      imageGenerator: 'Image Generator',
      imageGeneratorDesc: 'Text to image with AI',
      modelPhotos: 'Photos with Models',
      modelPhotosDesc: 'Product photos on models',
      postCreator: 'Post Creator',
      postCreatorDesc: 'Social media posts'
    },
    avatarsPage: {
      title: 'My Avatars',
      backToGenerator: 'Back to Generator',
      addAvatar: 'Add Avatar',
      avatarCount: 'avatar(s)',
      noAvatars: 'No avatars',
      emptyTitle: 'No avatars yet',
      emptyHint: 'Upload your photos or artwork to use as avatars in generation',
      uploadFirst: 'Upload Your First Avatar',
      loginRequired: 'Log in to manage your avatars',
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
      uploadFailed: 'Failed to upload avatar',
      descriptionPlaceholder: 'Describe this avatar (used for AI generation)...',
      pendingMessage: 'AI is analyzing this avatar. You can edit the description after analysis completes.',
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
      guestDescription: 'Track your generations, manage avatars, and view your credits',
      signIn: 'Sign In',
      stats: {
        generations: 'Images Created',
        avatars: 'Custom Avatars',
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
        avatars: 'Manage Avatars',
        avatarsDesc: 'Upload and manage custom avatars',
        gallery: 'View Gallery',
        galleryDesc: 'Browse all your generated images'
      },
      recentTitle: 'Recent Creations',
      viewAll: 'View All',
      noImages: 'No images yet',
      createFirst: 'Create Your First Image',
      sections: {
        textToImage: 'Text to Image',
        avatars: 'Avatars',
        creditsAndPlan: 'Credits & Plan',
        noGenerations: 'No generations yet',
        noAvatars: 'No avatars yet',
        noPosts: 'No posts yet',
        startGenerating: 'Start generating',
        addAvatar: 'Add avatar',
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
        comingSoon: 'Coming soon',
        perMonth: '/month',
        getStarted: 'Get Started',
        getPlan: 'Get Plan',
        mostPopular: 'Most Popular',
        plans: {
          starter: {
            badge: 'Starter',
            name: 'Starter',
            subtitle: 'Perfect for getting started',
            price: '€9',
            features: ['30 credits/month', 'All AI models', 'Gallery storage', 'Email support']
          },
          pro: {
            badge: 'Most Popular',
            name: 'Pro',
            subtitle: 'For creators & influencers',
            price: '€19',
            features: ['70 credits/month', 'All AI models', 'Gallery storage', 'Email support']
          },
          unlimited: {
            badge: 'Unlimited',
            name: 'Unlimited',
            subtitle: 'For power users',
            price: '€49',
            features: ['Unlimited credits', 'All AI models', 'Gallery storage', 'Email support']
          }
        },
        credits: {
          title: 'Need More Credits?',
          subtitle: 'Buy additional credits anytime. No subscription required.',
          buyNow: 'Buy Now',
          save: 'Save',
          packs: [
            { credits: '10', price: '€5' },
            { credits: '30', price: '€12', save: '20%' },
            { credits: '100', price: '€35', save: '30%' }
          ]
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Got questions? We have answers',
        items: {
          whatIsTool: {
            question: 'What is Re Edit Me?',
            answer: 'Re Edit Me is an AI-powered tool that transforms your photos into professional UGC (User Generated Content) marketing images. Simply upload a photo and our AI will generate stunning variations based on your selected style, scene, and mood preferences.'
          },
          howGeneration: {
            question: 'How does image generation work?',
            answer: 'Our AI analyzes your uploaded photo and combines it with the avatar, scene, and style settings you choose. The generation process takes about 30-60 seconds and produces high-quality images suitable for marketing and social media.'
          },
          whatAreCredits: {
            question: 'What are credits and how do they work?',
            answer: 'Credits are used to generate images. Each image generation uses a certain number of credits depending on the quality and resolution you select. You can purchase credits or earn them through our subscription plans.'
          },
          howUploadAvatars: {
            question: 'How do I upload custom avatars?',
            answer: 'Navigate to the Avatars section from the main menu. You can upload your own photos or artwork to use as reference images for generation. Custom avatars let you maintain consistent brand imagery across all your content.'
          },
          isDataSafe: {
            question: 'Is my data safe?',
            answer: 'Absolutely. We use industry-standard encryption and security practices. Your uploaded images are stored securely and are only accessible to you. We never share your data with third parties. Read our Privacy Policy for more details.'
          },
          howContact: {
            question: 'How can I contact support?',
            answer: 'You can reach our support team at support@reeditme.com. We typically respond within 24 hours on business days.'
          }
        }
      },
      features: {
        imageToImage: {
          badge: 'Most Popular',
          title: 'Product Photos on Real Models',
          subtitle: 'Upload a clothing or product photo — AI will place it on a selected model and create a professional marketing image in just minutes.',
          feature1: 'Choose from 10+ professional models or upload your own avatar',
          feature2: 'Change environments, poses, styles, and moods with one click',
          feature3: 'Get studio-quality photos ready for social media and e-commerce',
          cta: 'Try Now',
          creditInfo: 'From 1 credit per photo'
        },
        imageGenerator: {
          badge: 'New',
          title: 'AI Image Generator',
          subtitle: 'Create entirely new, unique product images from scratch with AI — no photographer, no studio, no model needed.',
          feature1: 'Describe your desired image and AI will create it in seconds',
          feature2: 'Choose the style, composition, and mood to match your brand',
          feature3: 'Export in high resolution, ready for print and web',
          cta: 'Start Creating',
          creditInfo: 'From 2 credits per image'
        },
        postCreator: {
          badge: 'All-in-One',
          title: 'Social Media Post Creator',
          subtitle: 'Create professional marketing posts in just a few clicks — AI generates engaging copy tailored to your audience and platform.',
          feature1: 'AI writes copy tailored to your brand voice and audience',
          feature2: 'Create posts with images or text-only — your choice',
          feature3: 'Optimized for Instagram, Facebook, TikTok, and more',
          cta: 'Create Post',
          creditInfo: 'From 1 credit per post'
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
      industryLabel: 'Industry',
      industryPlaceholder: 'Select industry...',
      topicLabel: 'Topic',
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
