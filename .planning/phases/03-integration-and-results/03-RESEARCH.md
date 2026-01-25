# Phase 3: Integration & Results - Research

**Researched:** 2026-01-25
**Domain:** React-to-n8n integration, async workflow handling, image display, file downloads
**Confidence:** HIGH

## Summary

This phase connects a React TypeScript frontend to an n8n backend webhook for AI image generation. The core challenge is handling 30-60 second generation workflows with proper loading states, timeouts, error handling, and results presentation. Research focused on six key areas: HTTP request patterns with AbortController for cancellation, n8n webhook configuration for long-running operations, React state management for async operations, lightbox libraries for image viewing, browser file download APIs, and error handling patterns.

The standard approach uses native fetch API with AbortSignal.timeout() for 60-second timeouts, custom React hooks for generation state management, Yet Another React Lightbox for image viewing, and the anchor download pattern for file downloads. User decisions mandate immediate response with loading overlay, progress stages, 60-second timeout, and Lithuanian error messages.

**Primary recommendation:** Use AbortSignal.timeout(60000) for hard timeout enforcement, custom useGeneration hook for state orchestration, Yet Another React Lightbox for image expansion, and anchor download with proper filename sanitization.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| fetch API | Native | HTTP requests to n8n webhook | Built-in browser API, AbortController support, TypeScript types included |
| AbortController | Native | Request cancellation and timeout | Web standard (2019+), works with fetch, proper cleanup |
| Yet Another React Lightbox | ^3.x | Image viewing/expansion | Modern, performant, TypeScript built-in, actively maintained |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React hooks | 18.3.1 | State management | Custom hooks for generation flow, error handling, download orchestration |
| Tailwind CSS | 4.1.18 | Loading overlays, animations | backdrop-blur for overlays, transition utilities for animations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| fetch API | axios | axios adds bundle size (13KB), fetch is native and sufficient |
| Yet Another React Lightbox | react-image-lightbox | react-image-lightbox is less maintained, YARL has better TypeScript support |
| Custom state management | Zustand/Jotai | Overkill for single-flow state; useState + custom hooks are cleaner |

**Installation:**
```bash
npm install yet-another-react-lightbox
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── hooks/
│   ├── useImageUpload.ts     # Existing - image management
│   ├── useGeneration.ts       # NEW - generation orchestration
│   └── useImageDownload.ts    # NEW - download handling
├── components/
│   ├── generation/
│   │   ├── LoadingOverlay.tsx     # NEW - progress display
│   │   ├── ResultsGallery.tsx     # NEW - 3-image grid
│   │   └── ResultsActions.tsx     # NEW - regenerate/new upload
│   └── ui/
│       └── ErrorMessage.tsx       # NEW - Lithuanian error display
├── services/
│   └── n8nService.ts          # NEW - API layer for n8n
├── types/
│   └── generation.ts          # NEW - generation types
└── constants/
    ├── ui.ts                  # Existing - add error messages
    └── api.ts                 # NEW - n8n endpoint config
```

### Pattern 1: Generation State Hook (useGeneration)
**What:** Custom hook managing the complete generation lifecycle: request, loading states, results, errors, and actions.

**When to use:** Primary orchestrator for the generation flow, consumed by App component.

**Example:**
```typescript
// Source: React custom hooks best practices + n8n async pattern research
interface GenerationState {
  status: 'idle' | 'loading' | 'success' | 'error';
  progress: 'sending' | 'generating-1' | 'generating-2' | 'generating-3' | 'complete';
  results: GeneratedImage[] | null;
  error: string | null;
}

function useGeneration(config: Config, images: UploadedImage[]) {
  const [state, setState] = useState<GenerationState>({
    status: 'idle',
    progress: 'sending',
    results: null,
    error: null
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = async () => {
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    setState({ status: 'loading', progress: 'sending', results: null, error: null });

    try {
      // Use AbortSignal.timeout for hard 60s limit
      const timeoutSignal = AbortSignal.timeout(60000);
      const combinedSignal = AbortSignal.any([
        abortControllerRef.current.signal,
        timeoutSignal
      ]);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, images }),
        signal: combinedSignal
      });

      if (!response.ok) throw new Error('API_ERROR');

      const data = await response.json();
      setState({ status: 'success', progress: 'complete', results: data.images, error: null });
    } catch (err) {
      if (err.name === 'TimeoutError') {
        setState({ status: 'error', progress: 'sending', results: null, error: 'TIMEOUT' });
      } else if (err.name === 'AbortError') {
        setState({ status: 'idle', progress: 'sending', results: null, error: null });
      } else {
        setState({ status: 'error', progress: 'sending', results: null, error: 'NETWORK' });
      }
    }
  };

  const cancel = () => {
    abortControllerRef.current?.abort();
    setState({ status: 'idle', progress: 'sending', results: null, error: null });
  };

  const reset = () => {
    setState({ status: 'idle', progress: 'sending', results: null, error: null });
  };

  return { state, generate, cancel, reset };
}
```

### Pattern 2: Loading Overlay with Progress Stages
**What:** Full-screen overlay that dims background content, shows progress stages, displays tips, and provides cancellation.

**When to use:** During generation (status === 'loading').

**Example:**
```typescript
// Source: Tailwind backdrop-blur + React progress patterns
function LoadingOverlay({ progress, onCancel }: LoadingOverlayProps) {
  const progressMessages = {
    sending: 'Siunčiama...',
    'generating-1': 'Generuojama 1/3...',
    'generating-2': 'Generuojama 2/3...',
    'generating-3': 'Beveik baigta...',
    complete: 'Baigta!'
  };

  const tips = [
    'Patarimas: Geriausi rezultatai su vienspalviais drabužiais',
    'Patarimas: Aiškios nuotraukos duoda geriausius rezultatus',
    'Patarimas: Vengti per daug priedų ar raštų'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Progress indicator */}
        <div className="mb-6">
          <progress value={null} className="w-full h-2 rounded-full" />
        </div>

        {/* Status message */}
        <p className="text-lg font-semibold text-center mb-4">
          {progressMessages[progress]}
        </p>

        {/* Tip rotation */}
        <p className="text-sm text-gray-600 text-center mb-6">
          {tips[Math.floor(Math.random() * tips.length)]}
        </p>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Atšaukti
        </button>
      </div>
    </div>
  );
}
```

### Pattern 3: Results Gallery with Lightbox
**What:** Responsive 3-column grid (desktop) / stacked (mobile) layout with click-to-expand functionality.

**When to use:** When generation succeeds (status === 'success').

**Example:**
```typescript
// Source: Yet Another React Lightbox docs + Tailwind responsive grid
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function ResultsGallery({ images }: ResultsGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const angleLabels = ['Toli', 'Arti', 'Labai arti'];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.url}
              alt={`Rezultatas ${index + 1}`}
              className="w-full h-auto rounded-lg cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleImageClick(index)}
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm">
              {angleLabels[index]}
            </div>
            <button
              onClick={() => downloadImage(image.url, `rezultatas-${index + 1}.jpg`)}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-lg shadow-sm"
            >
              ⬇
            </button>
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={images.map(img => ({ src: img.url }))}
      />
    </>
  );
}
```

### Pattern 4: Error Handling with Auto-Recovery
**What:** Display user-friendly Lithuanian error for 3 seconds, then auto-return to upload screen.

**When to use:** When generation fails (status === 'error').

**Example:**
```typescript
// Source: React error handling best practices
const ERROR_MESSAGES = {
  TIMEOUT: 'Užtruko per ilgai. Bandykite dar kartą.',
  NETWORK: 'Patikrinkite interneto ryšį ir bandykite dar kartą.',
  API_ERROR: 'Nepavyko sugeneruoti. Bandykite vėliau.',
  DEFAULT: 'Įvyko klaida. Bandykite dar kartą.'
};

function ErrorMessage({ errorType, onDismiss }: ErrorMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-red-500 text-2xl">⚠</div>
          <h3 className="text-lg font-semibold text-gray-900">Klaida</h3>
        </div>
        <p className="text-gray-700">
          {ERROR_MESSAGES[errorType] || ERROR_MESSAGES.DEFAULT}
        </p>
      </div>
    </div>
  );
}
```

### Pattern 5: Image Download Function
**What:** Browser-native download using anchor element with download attribute.

**When to use:** Individual image download buttons.

**Example:**
```typescript
// Source: MDN download attribute + filename sanitization research
function downloadImage(url: string, filename: string) {
  // Sanitize filename: remove special chars, limit length
  const sanitized = filename
    .replace(/[^a-z0-9.-]/gi, '_')
    .substring(0, 255);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = sanitized;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
```

### Anti-Patterns to Avoid
- **Polling for results**: n8n webhooks should respond synchronously or use async callback pattern; don't poll a status endpoint
- **Leaving requests hanging**: Always use AbortController, don't rely on Promise.race alone
- **Exposing technical errors**: Never show "500 Internal Server Error" to users, map to Lithuanian messages
- **Multiple AbortControllers**: Reuse single controller per request, don't create multiple instances

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lightbox/modal | Custom overlay with image zoom | Yet Another React Lightbox | Handles touch gestures, keyboard nav, focus management, responsive images, accessibility |
| Request timeout | setTimeout + Promise.race | AbortSignal.timeout() + AbortSignal.any() | Web standard (2023+), properly cancels request, avoids memory leaks |
| File download | fetch blob then create object URL | Anchor with download attribute | Simpler, works for external URLs, no blob cleanup needed |
| Progress indicator animation | Custom CSS animations | Native `<progress>` element + Tailwind | Works before JS loads, accessible, browser-optimized |
| Filename sanitization | Manual regex replacement | sanitize-filename package (if needed) | Handles cross-platform edge cases, reserved names, path traversal |

**Key insight:** Browser APIs (fetch, AbortController, download attribute) have matured significantly; custom solutions introduce more bugs than they solve.

## Common Pitfalls

### Pitfall 1: AbortController Reuse After Abort
**What goes wrong:** Using the same AbortController.signal for multiple requests causes all subsequent requests to fail immediately because "an AbortSignal can only be used once."

**Why it happens:** Developers create AbortController once and reuse it across requests.

**How to avoid:** Create new AbortController for each request. Use useRef to store current controller, replace on each generate() call.

**Warning signs:** Second request fails instantly with AbortError even though you didn't call abort().

### Pitfall 2: Not Differentiating Timeout vs User Abort
**What goes wrong:** User clicks cancel, error message shows "Užtruko per ilgai" instead of silently returning to upload screen.

**Why it happens:** Both timeout and user abort throw AbortError when using AbortSignal.timeout() alone.

**How to avoid:** Use AbortSignal.any() to combine user controller + timeout signal. Check err.name: TimeoutError (from timeout) vs AbortError (from user abort).

**Warning signs:** Cancel button shows error instead of returning to idle state.

### Pitfall 3: n8n Webhook Timeout Mismatch
**What goes wrong:** Frontend times out at 60s but n8n workflow continues running, wasting resources and potentially causing duplicate generations if user retries.

**Why it happens:** n8n's default webhook timeout doesn't match frontend timeout.

**How to avoid:** Configure n8n workflow to timeout at 55 seconds (5s buffer), return error response if generation exceeds limit.

**Warning signs:** Backend logs show completed executions after frontend already timed out.

### Pitfall 4: CORS Errors in Production
**What goes wrong:** Development works (same-origin), production fails with CORS errors because frontend and n8n are on different domains.

**Why it happens:** n8n's CORS settings default to `*` but may be restricted in production, or not configured at all.

**How to avoid:** Set n8n webhook "Allowed Origins (CORS)" to include frontend domain. Test with production URLs before deployment.

**Warning signs:** Works on localhost, fails on deployed version with "blocked by CORS policy" in console.

### Pitfall 5: Large Image Payload Size
**What goes wrong:** Request fails silently or with timeout when sending 3 high-res images in single POST.

**Why it happens:** n8n's default payload size limit is 16MB. Three 1024x1792 images can exceed this.

**How to avoid:** Send image URLs or base64 with compression, not full files. Alternatively, increase n8n's N8N_PAYLOAD_SIZE_MAX environment variable.

**Warning signs:** Smaller test images work, real photos fail or timeout.

### Pitfall 6: React State Update After Unmount
**What goes wrong:** "Can't perform a React state update on an unmounted component" warning when request completes after component unmounts.

**Why it happens:** Async operation continues after navigation/unmount, tries to call setState.

**How to avoid:** Use AbortController cleanup in useEffect, check if component is mounted before setState.

**Warning signs:** Console warnings about memory leaks after navigating away during loading.

## Code Examples

Verified patterns from official sources:

### AbortSignal.any() for Timeout + User Cancel
```typescript
// Source: MDN AbortSignal documentation
// https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal

const controller = new AbortController();
const timeoutSignal = AbortSignal.timeout(60000); // 60 second timeout

try {
  const response = await fetch(url, {
    signal: AbortSignal.any([controller.signal, timeoutSignal])
  });

  const data = await response.json();
  // Handle success
} catch (err) {
  if (err.name === 'TimeoutError') {
    // Hard timeout reached - show error, reset
    setError('TIMEOUT');
  } else if (err.name === 'AbortError') {
    // User cancelled - silently return to idle
    setState('idle');
  } else {
    // Network or other error
    setError('NETWORK');
  }
}
```

### Yet Another React Lightbox Basic Setup
```typescript
// Source: Yet Another React Lightbox official docs
// https://yet-another-react-lightbox.com/

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = [
    { src: "/image1.jpg" },
    { src: "/image2.jpg" },
    { src: "/image3.jpg" }
  ];

  return (
    <>
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.src}
          onClick={() => { setIndex(i); setOpen(true); }}
        />
      ))}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  );
}
```

### n8n Webhook JSON Response Configuration
```typescript
// Source: n8n Respond to Webhook documentation
// https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/

// In n8n workflow:
// 1. Webhook node: Set "Respond" to "Using 'Respond to Webhook' node"
// 2. Add generation logic nodes
// 3. Respond to Webhook node:
//    - Respond With: "JSON"
//    - Response Body:
{
  "success": true,
  "images": [
    { "url": "https://...", "angle": "far" },
    { "url": "https://...", "angle": "medium" },
    { "url": "https://...", "angle": "close" }
  ]
}

// Frontend expects this structure:
interface GenerationResponse {
  success: boolean;
  images: Array<{
    url: string;
    angle: string;
  }>;
}
```

### Tailwind Loading Overlay with Backdrop Blur
```typescript
// Source: Tailwind CSS backdrop-blur documentation
// https://tailwindcss.com/docs/backdrop-filter-blur

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 animate-fade-in">
        <progress value={null} className="w-full h-2 rounded-full" />
        <p className="mt-4 text-center font-semibold">Generuojama...</p>
      </div>
    </div>
  );
}

// Add to Tailwind config for fade-in animation:
// @theme {
//   --animate-fade-in: fade-in 0.3s ease-in-out;
// }
// @keyframes fade-in {
//   from { opacity: 0; transform: scale(0.95); }
//   to { opacity: 1; transform: scale(1); }
// }
```

### React Custom Hook with AbortController Cleanup
```typescript
// Source: React hooks best practices + AbortController patterns
// https://react.dev/learn/reusing-logic-with-custom-hooks

function useGeneration() {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const generate = async () => {
    // Create new controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal
      });
      // ... handle response
    } catch (err) {
      if (err.name !== 'AbortError') {
        // Handle real errors, ignore abort
      }
    }
  };

  const cancel = () => {
    abortControllerRef.current?.abort();
  };

  return { generate, cancel };
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| axios for HTTP | Native fetch API | 2020+ | fetch is now standard, well-supported, built-in TypeScript types |
| Promise.race for timeout | AbortSignal.timeout() | Aug 2023 (Chrome 116) | Properly cancels requests, no hanging connections |
| react-image-lightbox | Yet Another React Lightbox | 2022+ | Better TypeScript support, active maintenance, smaller bundle |
| useReducer for async state | useState + custom hooks | 2023+ | Simpler patterns for single-flow async operations |
| Manual CORS proxy | n8n built-in CORS | Always available | Configure directly in webhook node settings |

**Deprecated/outdated:**
- **Simple React Lightbox**: Deprecated, recommend YARL instead
- **Promise.race for timeout without AbortController**: Leaves requests hanging, wastes resources
- **Manual blob cleanup for downloads**: Anchor download attribute is simpler and sufficient

## Open Questions

Things that couldn't be fully resolved:

1. **n8n workflow execution timeout configuration**
   - What we know: Default webhook timeouts exist, can be configured with environment variables
   - What's unclear: Exact default timeout value for n8n cloud vs self-hosted, how to configure per-workflow timeout
   - Recommendation: Test actual timeout behavior, set conservative 55s timeout in workflow, document findings in implementation

2. **Image URL format from n8n**
   - What we know: n8n can return URLs in webhook response, images likely hosted temporarily
   - What's unclear: URL expiration time, whether URLs are publicly accessible, CORS headers on image URLs
   - Recommendation: Verify in Phase 2 implementation, ensure images are served with proper CORS headers for download

3. **Progress stage updates during generation**
   - What we know: n8n webhooks respond once at the end, no mid-process updates
   - What's unclear: Whether to fake progress stages (timer-based) or keep single "Generuojama..." message
   - Recommendation: Use timer-based fake progress (20s per stage) to improve perceived performance, document as UX enhancement not real progress

## Sources

### Primary (HIGH confidence)
- [n8n Webhook node documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) - Webhook setup, CORS, response formats
- [n8n Respond to Webhook documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/) - JSON response structure, async handling
- [MDN AbortController.abort()](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort) - Cancellation API, browser support
- [MDN AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) - timeout() and any() methods, error types
- [Yet Another React Lightbox](https://yet-another-react-lightbox.com/) - Installation, usage, TypeScript support
- [React progress element](https://react.dev/reference/react-dom/components/progress) - Native progress indicator

### Secondary (MEDIUM confidence)
- [Tailwind CSS backdrop-blur](https://tailwindcss.com/docs/backdrop-filter-blur) - Official docs for overlay effects
- [React Hooks best practices](https://react.dev/learn/reusing-logic-with-custom-hooks) - Official React documentation
- [n8n async webhook community pattern](https://community.n8n.io/t/async-webhooks-around-a-long-running-workflow/134237) - Verified dual-webhook pattern
- [LogRocket React Lightbox comparison](https://blog.logrocket.com/comparing-the-top-3-react-lightbox-libraries/) - Library comparison with maintenance status

### Tertiary (LOW confidence)
- WebSearch: "React TypeScript fetch API n8n webhook best practices 2026" - General patterns, needs verification
- WebSearch: "React loading states progress indicator patterns 2026" - Community patterns, Material UI examples
- WebSearch: "JavaScript fetch timeout pattern Promise.race AbortController 2026" - Implementation examples
- WebSearch: "browser download file from URL JavaScript 2026" - Download patterns and CORS considerations

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All recommendations based on official docs, web standards, and current libraries
- Architecture: HIGH - Patterns verified with official React/n8n documentation and established best practices
- Pitfalls: HIGH - AbortController pitfalls from MDN, CORS from n8n docs, state management from React docs
- n8n timeout specifics: MEDIUM - General timeout concepts clear, exact configuration needs verification
- Progress updates: LOW - Fake progress pattern is UX decision, no technical source

**Research date:** 2026-01-25
**Valid until:** 2026-02-25 (30 days - stable web standards, React patterns, established libraries)

---

**Notes for Planner:**
- User decisions mandate specific UX patterns (progress stages, 60s timeout, Lithuanian errors) - implement as specified
- AbortSignal.timeout() and AbortSignal.any() are modern standards (2023+), use them over Promise.race
- Yet Another React Lightbox is the clear winner for image viewing, no alternatives needed
- Create separate service layer (n8nService.ts) to isolate API logic from components
- n8n webhook CORS and timeout need verification in actual deployment, add to verification checklist
