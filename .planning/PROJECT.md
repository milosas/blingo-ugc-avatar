# Virtual Clothing Model Generator

## What This Is

AI-powered web aplikacija e-parduotuvėms, kuri leidžia įkelti drabužių nuotraukas ir automatiškai sugeneruoti nuotraukas su virtualiais modeliais. Aplikacija generuoja 3 skirtingus kampus (toli, arti, labai arti) Instagram-ready formatui (1080×1350px). Skirta e-shop administratoriams ir social media marketingininkams.

## Core Value

**Viena nuotrauka įkelta → trys profesionalios nuotraukos su modeliu per 60 sekundžių.**

Jei viskas kita neveiks - šis flow turi veikti: įkelti drabužį, gauti 3 nuotraukas su modeliu.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Vartotojas gali įkelti 1-3 drabužio nuotraukas (drag & drop arba click)
- [ ] Vartotojas gali pasirinkti avatarą iš 8 variantų (4 moterys, 4 vyrai)
- [ ] Vartotojas gali pasirinkti sceną iš 3 variantų (studija, gatvė, minimalizmas)
- [ ] Vartotojas gali pasirinkti stilių iš 4 variantų (casual, formali, sportinė, vintage)
- [ ] Sistema generuoja 3 nuotraukas skirtingais kampais (toli, arti, labai arti)
- [ ] Vartotojas gali atsisiųsti kiekvieną nuotrauką atskirai
- [ ] Vartotojas gali peržiūrėti nuotraukas Google Drive
- [ ] Vartotojas gali regeneruoti su tais pačiais drabužiais bet kitais nustatymais
- [ ] Vartotojas gali įkelti naujus drabužius ir pradėti iš naujo
- [ ] UI pilnai lietuvių kalba

### Out of Scope

- User authentication / prisijungimas — MVP nereikia, vienas vartotojas
- Generavimo istorija / user accounts — komplikuoja MVP
- Batch processing (daug produktų vienu metu) — Phase 2
- Advanced editing tools (šviesumo, pozos koregavimas) — Phase 2
- Social media sharing integracija — Phase 2
- Analytics dashboard — Phase 2
- Mobile app — web-first strategija
- REST API e-shop integracijai — Phase 2

## Context

**Verslo kontekstas:**
- E-parduotuvė parduoda jaunatviškus drabužius 18-35m. moterims
- Dabartinės nuotraukos: drabužiai ant pakabos arba žemės
- Problema: aukštas grąžinimų %, mažas konversijos rodiklis
- Tikslas: +15-20% konversija, -10% grąžinimų

**Techninė aplinka:**
- n8n jau veikia Hostinger serveryje
- kie.ai API key paruoštas (OpenAI access)
- Google Service Account sukurtas
- Frontend bus Vercel

**Avatar sistema (8 variantai):**
- 4 moterys: Modern City, Elegant, Sporty, Vintage Indie
- 4 vyrai: Modern City, Elegant, Sporty, Vintage Indie
- Kiekvienas turi: skin tone, body type, hair, vibe, age range

**Scenos (3 variantai):**
- Moderni Studija — baltas/pilkas fonas, profesionalus apšvietimas
- Gatvė (Urban) — miesto aplinka, natūrali šviesa
- Minimalizmas — švarus fonas, zen estetika

**Stiliai (4 variantai):**
- Casual — kasdieniškas, patogus
- Formali — profesionalus, elegantiškas
- Sportinė — atletiška, dinamiška
- Vintage — retro, bohemiškas

## Constraints

- **Tech stack**: React + TypeScript + Tailwind (frontend), n8n Hostinger (backend), OpenAI per kie.ai (AI)
- **Image size**: 1080×1350px (Instagram portrait format)
- **Generation time**: Target <60 sekundžių visiems 3 kampams
- **Storage**: Google Drive per Service Account
- **Language**: UI lietuvių kalba
- **Hosting**: Vercel (frontend), Hostinger (n8n)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| n8n kaip backend | Jau veikia Hostinger, vizualus workflow, lengva keisti | — Pending |
| OpenAI per kie.ai | Jau turi API key, patikima | — Pending |
| Google Drive storage | Service Account jau sukurtas, nemokama | — Pending |
| Session-based (be auth) | MVP greičiau, vienas vartotojas | — Pending |
| 3 kampai per generavimą | Maksimalus produkto supratimas pirkėjui | — Pending |

---
*Last updated: 2025-01-22 after initialization*
