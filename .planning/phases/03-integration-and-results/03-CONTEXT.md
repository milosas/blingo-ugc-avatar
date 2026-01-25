# Phase 3: Integration & Results - Context

**Gathered:** 2025-01-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Connect the React frontend to the n8n backend, handle the complete generation flow (request → loading → results), and provide download/regenerate/new upload actions. This phase delivers the full user journey from clicking "Generuoti" to viewing and downloading the 3 generated images.

Does NOT include: editing generated images, saving to cloud storage, sharing features, or additional generation workflows.

</domain>

<decisions>
## Implementation Decisions

### Loading Experience (30-60 seconds)
- Progress stages shown: 'Siunčiama...', 'Generuojama 1/3...', 'Beveik baigta...' — gives sense of progress during wait
- Users can cancel immediately: 'Atšaukti' button stops generation and returns to start (no confirmation dialog)
- Keep uploaded images and configuration visible but dimmed during generation — user sees their choices in background with loading overlay
- Show tips during wait: 'Patarimas: Geriausi rezultatai su vienspalviais drabužiais' — educate users during the wait time

### Results Presentation
- 3-column grid layout: All 3 images side by side on desktop, stacked on mobile — see everything at once
- All images transition in together: Loading disappears, all 3 images fade in at once — instant reveal when complete
- Each image shows: Camera angle label ('Toli', 'Arti', 'Labai arti') + individual download button
- Click to expand: Click any image opens full-screen lightbox overlay with close button — view details

### Error Scenarios
- Show error for 3 seconds, then auto-return to upload screen — start fresh after failure
- User-friendly messages only: 'Nepavyko sugeneruoti. Bandykite vėliau.' — no technical details or error codes
- Different messages for different failures:
  - Network errors: 'Patikrinkite interneto ryšį'
  - Timeout: 'Užtruko per ilgai'
  - API errors: 'Bandykite vėliau'
- Hard timeout at 60 seconds: Enforce speed promise, show timeout error and return to start

### Action Flows
- Individual downloads only: Each image has own download button — user picks which images they want (no ZIP download)
- 'Regeneruoti': Uses same drabužiai/avatar/scena/stilius, generates 3 new variations — try different angles without reconfiguring
- 'Naujas upload': Clears everything immediately, returns to empty upload screen — fresh start (no confirmation dialog)
- Action buttons placed below results: Users see the 3 images first, then encounter 'Regeneruoti' and 'Naujas upload' buttons

### Claude's Discretion
- Exact progress animation style
- Loading overlay opacity and blur effect
- Lightbox implementation details
- Image fade-in animation duration
- Error message icon/styling
- Download file naming convention

</decisions>

<specifics>
## Specific Ideas

- Loading should feel like you're watching it work, not just waiting
- The 3 images should feel like a reveal moment when they appear
- Errors should get users back to working state quickly, not leave them stuck
- Regenerate is about "try again with same clothes" not "edit and try again"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-integration-and-results*
*Context gathered: 2025-01-25*
