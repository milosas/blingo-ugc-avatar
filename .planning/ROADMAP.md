# Roadmap: Virtual Clothing Model Generator

**Created:** 2025-01-22
**Core Value:** Viena nuotrauka ikelta -> trys profesionalios nuotraukos su modeliu per 60 sekundziu

## Overview

| Phase | Name | Goal | Requirements |
|-------|------|------|--------------|
| 1 | Frontend Foundation | Veikiantis upload ir configuration UI | UPLD-*, CONF-*, UI-01, UI-02 |
| 2 | n8n Backend | Workflow generuoja nuotraukas | GEN-* |
| 3 | Integration & Results | Pilnas end-to-end flow | RES-*, UI-03, UI-04 |

**Total:** 3 phases | 16 requirements | Quick MVP

---

## Phase 1: Frontend Foundation

**Goal:** Sukurti React aplikacija su pilnu upload ir configuration UI, paruosta siusti uzklausas i backend.

**Requirements:**
- UPLD-01: Click to browse
- UPLD-02: 1-3 nuotraukos
- UPLD-03: Preview
- UPLD-04: JPG/PNG
- CONF-01: 4 moteru avatarai
- CONF-02: 3 scenos
- CONF-03: 4 stiliai
- CONF-04: Avataro aprasymas
- UI-01: Lietuviu kalba
- UI-02: Responsive

**Success Criteria:**
1. Vartotojas gali atidaryti aplikacija ir matyti lietuviska UI
2. Vartotojas gali ikelti 1-3 nuotraukas ir matyti ju preview
3. Vartotojas gali pasirinkti avatara, scena ir stiliu is dropdown'u
4. "Generuoti" mygtukas yra aktyvus tik kai ikeltos nuotraukos
5. Aplikacija veikia mobile ir desktop

**Plans:** 4 plans

Plans:
- [x] 01-01-PLAN.md — Project setup + types/constants
- [x] 01-02-PLAN.md — UI primitives + upload system
- [x] 01-03-PLAN.md — Configuration panel
- [x] 01-04-PLAN.md — App integration + visual verification

**Deliverables:**
- React + TypeScript + Tailwind projektas
- Upload komponentas su preview
- Configuration panel su dropdowns
- Responsive layout
- Constants failas su avatarais, scenomis, stiliais

---

## Phase 2: n8n Backend

**Goal:** Sukurti n8n workflow, kuris priima uzklausa, generuoja 3 nuotraukas per OpenAI ir grazina rezultatus.

**Requirements:**
- GEN-01: 3 kampai
- GEN-02: 1080x1350px
- GEN-03: OpenAI per kie.ai
- GEN-04: n8n workflow

**Success Criteria:**
1. n8n webhook priima POST uzklausa su nuotrauka ir konfiguracija
2. Workflow generuoja 3 skirtingus prompt'us (toli, arti, labai arti)
3. Workflow iskvieicia OpenAI API 3 kartus ir gauna nuotraukas
4. Workflow grazina 3 nuotrauku URL i frontend
5. Generavimas uzttrunka <60 sekundziu

**Deliverables:**
- n8n workflow JSON
- Prompt sablonai 3 kampams
- API integration su kie.ai
- Error handling workflow

---

## Phase 3: Integration & Results

**Goal:** Sujungti frontend ir backend, parodyti rezultatus ir leisti atsisiusti.

**Requirements:**
- RES-01: Galerija
- RES-02: Atsisiuntimas
- RES-03: Regenerate
- RES-04: Naujas upload
- UI-03: Loading
- UI-04: Errors

**Success Criteria:**
1. Paspaudus "Generuoti", frontend siuncia uzklausa i n8n
2. Rodomas loading indikatorius generavimo metu
3. Sugeneruotos 3 nuotraukos rodomos galerijoje
4. Kiekviena nuotrauka turi atsisiuntimo mygtuka
5. "Regeneruoti" mygtukas veikia su tais paciais drabuziais
6. "Naujas upload" grazina i pradzia
7. Klaidos rodomos lietuviskai

**Plans:** 4 plans

Plans:
- [ ] 03-01-PLAN.md — Generation hook & loading UI
- [ ] 03-02-PLAN.md — Results gallery & actions
- [ ] 03-03-PLAN.md — App integration & error handling
- [ ] 03-04-PLAN.md — Human verification of full flow

**Deliverables:**
- API integration frontend -> n8n
- Gallery komponentas
- Loading state
- Error handling
- Download funkcionalumas

---

## Dependency Graph

```
Phase 1 (Frontend) ──┐
                     ├──► Phase 3 (Integration)
Phase 2 (n8n)  ──────┘
```

Phase 1 ir Phase 2 gali buti vykdomi lygiagreiciai.
Phase 3 reikalauja abieju.

---

*Roadmap created: 2025-01-22*
*Phase 1 planned: 2025-01-22*
*Phase 3 planned: 2025-01-25*
