# Roadmap: Virtual Clothing Model Generator

**Created:** 2025-01-22
**Core Value:** Viena nuotrauka įkelta → trys profesionalios nuotraukos su modeliu per 60 sekundžių

## Overview

| Phase | Name | Goal | Requirements |
|-------|------|------|--------------|
| 1 | Frontend Foundation | Veikiantis upload ir configuration UI | UPLD-*, CONF-*, UI-01, UI-02 |
| 2 | n8n Backend | Workflow generuoja nuotraukas | GEN-* |
| 3 | Integration & Results | Pilnas end-to-end flow | RES-*, UI-03, UI-04 |

**Total:** 3 phases | 16 requirements | Quick MVP

---

## Phase 1: Frontend Foundation

**Goal:** Sukurti React aplikaciją su pilnu upload ir configuration UI, paruoštą siųsti užklausas į backend.

**Requirements:**
- UPLD-01: Click to browse
- UPLD-02: 1-3 nuotraukos
- UPLD-03: Preview
- UPLD-04: JPG/PNG
- CONF-01: 4 moterų avatarai
- CONF-02: 3 scenos
- CONF-03: 4 stiliai
- CONF-04: Avataro aprašymas
- UI-01: Lietuvių kalba
- UI-02: Responsive

**Success Criteria:**
1. Vartotojas gali atidaryti aplikaciją ir matyti lietuvišką UI
2. Vartotojas gali įkelti 1-3 nuotraukas ir matyti jų preview
3. Vartotojas gali pasirinkti avatarą, sceną ir stilių iš dropdown'ų
4. "Generuoti" mygtukas yra aktyvus tik kai įkeltos nuotraukos
5. Aplikacija veikia mobile ir desktop

**Deliverables:**
- React + TypeScript + Tailwind projektas
- Upload komponentas su preview
- Configuration panel su dropdowns
- Responsive layout
- Constants failas su avatarais, scenomis, stiliais

---

## Phase 2: n8n Backend

**Goal:** Sukurti n8n workflow, kuris priima užklausą, generuoja 3 nuotraukas per OpenAI ir grąžina rezultatus.

**Requirements:**
- GEN-01: 3 kampai
- GEN-02: 1080×1350px
- GEN-03: OpenAI per kie.ai
- GEN-04: n8n workflow

**Success Criteria:**
1. n8n webhook priima POST užklausą su nuotrauka ir konfigūracija
2. Workflow generuoja 3 skirtingus prompt'us (toli, arti, labai arti)
3. Workflow iškviečia OpenAI API 3 kartus ir gauna nuotraukas
4. Workflow grąžina 3 nuotraukų URL į frontend
5. Generavimas užtrunka <60 sekundžių

**Deliverables:**
- n8n workflow JSON
- Prompt šablonai 3 kampams
- API integration su kie.ai
- Error handling workflow

---

## Phase 3: Integration & Results

**Goal:** Sujungti frontend ir backend, parodyti rezultatus ir leisti atsisiųsti.

**Requirements:**
- RES-01: Galerija
- RES-02: Atsisiuntimas
- RES-03: Regenerate
- RES-04: Naujas upload
- UI-03: Loading
- UI-04: Errors

**Success Criteria:**
1. Paspaudus "Generuoti", frontend siunčia užklausą į n8n
2. Rodomas loading indikatorius generavimo metu
3. Sugeneruotos 3 nuotraukos rodomos galerijoje
4. Kiekviena nuotrauka turi atsisiuntimo mygtuką
5. "Regeneruoti" mygtukas veikia su tais pačiais drabužiais
6. "Naujas upload" grąžina į pradžią
7. Klaidos rodomos lietuviškai

**Deliverables:**
- API integration frontend → n8n
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

Phase 1 ir Phase 2 gali būti vykdomi lygiagrečiai.
Phase 3 reikalauja abiejų.

---

*Roadmap created: 2025-01-22*
