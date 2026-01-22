# Requirements: Virtual Clothing Model Generator

**Defined:** 2025-01-22
**Core Value:** Viena nuotrauka įkelta → trys profesionalios nuotraukos su modeliu per 60 sekundžių

## v1 Requirements

Requirements for MVP release.

### Upload (UPLD)

- [ ] **UPLD-01**: Vartotojas gali pasirinkti nuotraukas per file browser (click to browse)
- [ ] **UPLD-02**: Vartotojas gali įkelti 1-3 nuotraukas vienu metu
- [ ] **UPLD-03**: Vartotojas mato įkeltų nuotraukų preview prieš generavimą
- [ ] **UPLD-04**: Sistema priima JPG ir PNG formatus

### Configuration (CONF)

- [ ] **CONF-01**: Vartotojas gali pasirinkti avatarą iš 4 moterų variantų
- [ ] **CONF-02**: Vartotojas gali pasirinkti sceną iš 3 variantų (studija, gatvė, minimalizmas)
- [ ] **CONF-03**: Vartotojas gali pasirinkti stilių iš 4 variantų (casual, formali, sportinė, vintage)
- [ ] **CONF-04**: Sistema rodo pasirinkto avataro aprašymą

### Generation (GEN)

- [ ] **GEN-01**: Sistema generuoja 3 nuotraukas skirtingais kampais (toli, arti, labai arti)
- [ ] **GEN-02**: Generuojamos nuotraukos yra 1080×1350px (Instagram portrait)
- [ ] **GEN-03**: Sistema naudoja OpenAI per kie.ai API
- [ ] **GEN-04**: n8n workflow apdoroja užklausas kaip backend

### Results (RES)

- [ ] **RES-01**: Vartotojas mato 3 sugeneruotas nuotraukas galerijoje
- [ ] **RES-02**: Vartotojas gali atsisiųsti kiekvieną nuotrauką atskirai
- [ ] **RES-03**: Vartotojas gali regeneruoti su tais pačiais drabužiais bet kitais nustatymais
- [ ] **RES-04**: Vartotojas gali pradėti iš naujo su naujais drabužiais

### UI/UX (UI)

- [ ] **UI-01**: Visa sąsaja lietuvių kalba
- [ ] **UI-02**: Responsive dizainas (mobile ir desktop)
- [ ] **UI-03**: Loading indikatorius generavimo metu
- [ ] **UI-04**: Aiškūs error pranešimai lietuviškai

## v2 Requirements

Deferred to future release.

### Extended Features

- **UPLD-05**: Drag & drop upload
- **CONF-05**: Vyrų avatarai (4 variantai)
- **RES-05**: Google Drive integracija
- **RES-06**: Batch processing (daug produktų)
- **UI-05**: Dark mode
- **AUTH-01**: User authentication
- **HIST-01**: Generavimo istorija

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts / auth | MVP nereikia, vienas vartotojas |
| Generavimo istorija | Komplikuoja MVP, v2 |
| Social media sharing | Atsisiuntimo pakanka MVP |
| Advanced editing | Per sudėtinga MVP |
| Mobile app | Web-first strategija |
| REST API | MVP tik web app |
| Real-time preview | Per sudėtinga, v2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| UPLD-01 | Phase 1 | Pending |
| UPLD-02 | Phase 1 | Pending |
| UPLD-03 | Phase 1 | Pending |
| UPLD-04 | Phase 1 | Pending |
| CONF-01 | Phase 1 | Pending |
| CONF-02 | Phase 1 | Pending |
| CONF-03 | Phase 1 | Pending |
| CONF-04 | Phase 1 | Pending |
| GEN-01 | Phase 2 | Pending |
| GEN-02 | Phase 2 | Pending |
| GEN-03 | Phase 2 | Pending |
| GEN-04 | Phase 2 | Pending |
| RES-01 | Phase 3 | Pending |
| RES-02 | Phase 3 | Pending |
| RES-03 | Phase 3 | Pending |
| RES-04 | Phase 3 | Pending |
| UI-01 | Phase 1 | Pending |
| UI-02 | Phase 1 | Pending |
| UI-03 | Phase 3 | Pending |
| UI-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0 ✓

---
*Requirements defined: 2025-01-22*
*Last updated: 2025-01-22 after initial definition*
