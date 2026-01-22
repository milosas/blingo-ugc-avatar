# Phase 1: Frontend Foundation - Research

**Researched:** 2026-01-22
**Domain:** React + TypeScript + Tailwind CSS for image upload and configuration UI
**Confidence:** HIGH

## Summary

Phase 1 requires building a React application with file upload, image preview, and configuration dropdowns. The technical domain is well-established with mature libraries and clear patterns.

The standard approach is:
1. **Vite + React + TypeScript** as the build tool and framework (Tailwind CSS v4 with Vite plugin)
2. **react-dropzone** for file upload with click-to-browse (not drag-and-drop per requirements, but library supports both)
3. **URL.createObjectURL()** for image previews (NOT FileReader - simpler and more performant)
4. **Headless UI Listbox** for accessible dropdown selects with Tailwind styling
5. **useState** for simple form state (no need for React Hook Form in this scope)
6. **Vercel** for deployment (auto-detects Vite, zero config)

**Primary recommendation:** Use react-dropzone for upload handling, Headless UI for dropdowns, and manage all state with useState hooks. Keep it simple - this is a straightforward form with no complex validation needs.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.x | UI Framework | Industry standard, stable |
| TypeScript | 5.x | Type safety | Required per project constraints |
| Tailwind CSS | 4.x | Styling | Specified in project, Vite plugin available |
| Vite | 5.x/6.x | Build tool | Fast, modern, Vercel integration |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-dropzone | 14.x | File upload | Click-to-browse and drag-drop support |
| @headlessui/react | 2.x | Accessible dropdowns | Listbox component for selects |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-dropzone | Native input[type=file] | Less control, no drag-drop if needed later |
| Headless UI | Native select | Less styling control, poor mobile UX |
| useState | React Hook Form | Overkill for simple forms without validation |

**Installation:**
```bash
npm create vite@latest . -- --template react-ts
npm install tailwindcss @tailwindcss/vite
npm install react-dropzone @headlessui/react
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Select.tsx         # Wrapper around Headless UI Listbox
│   │   └── ImagePreview.tsx
│   ├── upload/
│   │   ├── ImageUploader.tsx  # Main upload component
│   │   └── ImagePreviewGrid.tsx
│   └── config/
│       ├── ConfigPanel.tsx    # Avatar, scene, style selection
│       └── AvatarDescription.tsx
├── constants/
│   ├── avatars.ts             # Avatar definitions with descriptions
│   ├── scenes.ts              # Scene options
│   └── styles.ts              # Style options
├── types/
│   └── index.ts               # Shared TypeScript types
├── hooks/
│   └── useImageUpload.ts      # Custom hook for upload logic
├── App.tsx
├── main.tsx
└── index.css                  # Tailwind imports
```

### Pattern 1: Constants with `as const`

**What:** Define configuration options as typed constants
**When to use:** For avatar, scene, and style definitions
**Example:**
```typescript
// src/constants/avatars.ts
export const AVATARS = [
  {
    id: 'modern-city',
    name: 'Modern City',
    description: 'Jauna moteris miesto aplinkoje, modernaus stiliaus',
    skinTone: 'light',
    vibe: 'urban professional'
  },
  // ... more avatars
] as const;

export type Avatar = typeof AVATARS[number];
export type AvatarId = Avatar['id'];
```

### Pattern 2: Custom Hook for Image Upload

**What:** Encapsulate upload state and logic in a custom hook
**When to use:** To separate concerns and enable reuse
**Example:**
```typescript
// src/hooks/useImageUpload.ts
import { useState, useCallback, useEffect, useRef } from 'react';

interface UploadedImage {
  file: File;
  previewUrl: string;
}

export function useImageUpload(maxFiles = 3) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const previewUrlsRef = useRef<string[]>([]);

  // Cleanup on unmount - CRITICAL to prevent memory leaks
  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const addImages = useCallback((files: File[]) => {
    const validFiles = files.filter(f =>
      f.type === 'image/jpeg' || f.type === 'image/png'
    ).slice(0, maxFiles - images.length);

    const newImages = validFiles.map(file => {
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.push(previewUrl);
      return { file, previewUrl };
    });

    setImages(prev => [...prev, ...newImages].slice(0, maxFiles));
  }, [images.length, maxFiles]);

  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const removed = prev[index];
      if (removed) {
        URL.revokeObjectURL(removed.previewUrl);
        previewUrlsRef.current = previewUrlsRef.current.filter(
          url => url !== removed.previewUrl
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  return { images, addImages, removeImage, canAddMore: images.length < maxFiles };
}
```

### Pattern 3: Headless UI Listbox for Selects

**What:** Accessible dropdown with full styling control
**When to use:** For avatar, scene, and style selection
**Example:**
```typescript
// src/components/ui/Select.tsx
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

interface SelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  getLabel: (option: T) => string;
  placeholder?: string;
}

export function Select<T>({ value, onChange, options, getLabel, placeholder }: SelectProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left">
        {value ? getLabel(value) : placeholder}
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="w-[var(--button-width)] rounded-lg border bg-white shadow-lg"
      >
        {options.map((option, index) => (
          <ListboxOption
            key={index}
            value={option}
            className="cursor-pointer px-4 py-2 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50"
          >
            {getLabel(option)}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
```

### Pattern 4: react-dropzone Basic Setup

**What:** File upload with click-to-browse
**When to use:** Main image upload component
**Example:**
```typescript
// src/components/upload/ImageUploader.tsx
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function ImageUploader({ onFilesSelected, disabled }: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 3,
    disabled,
    onDrop: onFilesSelected
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Paspauskite arba vilkite nuotraukas cia
      </p>
      <p className="text-sm text-gray-400 mt-2">
        JPG arba PNG, iki 3 nuotrauku
      </p>
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Creating Object URLs in render:** Always use useEffect or useCallback, never inline in JSX
- **Forgetting URL.revokeObjectURL:** Causes memory leaks, especially with multiple images
- **Using FileReader when createObjectURL works:** FileReader is async and more complex
- **Storing File objects in localStorage:** File objects are not serializable
- **Trusting client-side MIME type validation:** Always validate server-side too (Phase 3)

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File upload UI | Custom input handling | react-dropzone | Handles edge cases, accessibility, drag states |
| Dropdown selects | Custom div/button | Headless UI Listbox | Keyboard navigation, ARIA, focus management |
| Image preview URLs | FileReader async | URL.createObjectURL | Simpler, synchronous, more performant |
| Responsive breakpoints | Custom media queries | Tailwind prefixes | Mobile-first system, consistent breakpoints |
| Form state (simple) | Custom reducer | useState | No complex validation, simple is better |

**Key insight:** This phase has no complex requirements that justify custom solutions. Use established libraries and focus on clean integration.

## Common Pitfalls

### Pitfall 1: Memory Leaks from Object URLs

**What goes wrong:** Images appear but memory usage grows unbounded
**Why it happens:** URL.createObjectURL creates persistent references until revoked
**How to avoid:**
- Store URLs in a ref for cleanup tracking
- Call URL.revokeObjectURL in useEffect cleanup
- Revoke when removing individual images
**Warning signs:** Browser tab memory growing, especially with many uploads

### Pitfall 2: Missing Mobile-First Responsive

**What goes wrong:** Desktop looks fine, mobile is broken
**Why it happens:** Writing `sm:` classes when intending mobile styles
**How to avoid:**
- Write base styles for mobile first
- Add `md:` or `lg:` prefixes for larger screens
- `sm:` means 640px+ NOT "small screens"
**Warning signs:** Styles that only work on desktop

### Pitfall 3: MIME Type Validation Bypass

**What goes wrong:** Users upload non-image files that pass client validation
**Why it happens:** File extension and Content-Type can be spoofed
**How to avoid:**
- Client validation for UX only (quick feedback)
- ALWAYS validate server-side (Phase 3)
- Check actual file bytes/magic numbers on server
**Warning signs:** Backend receiving unexpected file types

### Pitfall 4: Broken Dropdown on Mobile

**What goes wrong:** Native select better UX on touch devices
**Why it happens:** Custom dropdowns need careful touch handling
**How to avoid:**
- Headless UI handles touch/keyboard automatically
- Test on actual mobile devices, not just DevTools
**Warning signs:** Dropdown hard to tap or dismiss on phone

### Pitfall 5: Lost State on HMR

**What goes wrong:** Development uploads disappear on code save
**Why it happens:** Vite HMR re-mounts components, clearing state
**How to avoid:**
- This is expected behavior during development
- Use React DevTools to inspect state
- Consider keeping sample test images handy
**Warning signs:** None - this is normal, don't over-engineer around it

## Code Examples

Verified patterns from official sources:

### Tailwind v4 Vite Configuration
```typescript
// vite.config.ts
// Source: https://tailwindcss.com/docs/guides/vite
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Tailwind CSS Entry Point
```css
/* src/index.css */
/* Source: https://tailwindcss.com/docs/guides/vite */
@import "tailwindcss";
```

### Responsive Layout Pattern
```tsx
// Source: https://tailwindcss.com/docs/responsive-design
// Mobile: stacked, Medium+: side-by-side
<div className="flex flex-col md:flex-row gap-6">
  <div className="w-full md:w-1/2">
    {/* Upload section */}
  </div>
  <div className="w-full md:w-1/2">
    {/* Config section */}
  </div>
</div>
```

### Form State Pattern
```typescript
// Simple state for config panel
interface Config {
  avatar: Avatar | null;
  scene: Scene | null;
  style: Style | null;
}

function ConfigPanel() {
  const [config, setConfig] = useState<Config>({
    avatar: null,
    scene: null,
    style: null
  });

  const isComplete = config.avatar && config.scene && config.style;

  return (/* ... */);
}
```

### Lithuanian UI Text Constants
```typescript
// src/constants/ui.ts
export const UI_TEXT = {
  upload: {
    title: 'Ikelti nuotraukas',
    description: 'Paspauskite arba vilkite nuotraukas cia',
    hint: 'JPG arba PNG, iki 3 nuotrauku',
    remove: 'Pasalinti'
  },
  config: {
    avatarLabel: 'Pasirinkite avatara',
    sceneLabel: 'Pasirinkite scena',
    styleLabel: 'Pasirinkite stilu',
    placeholder: 'Pasirinkite...'
  },
  actions: {
    generate: 'Generuoti',
    generating: 'Generuojama...'
  }
} as const;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CRA (Create React App) | Vite | 2023+ | CRA deprecated, Vite is standard |
| Tailwind v3 directives | Tailwind v4 @import | Late 2024 | Different CSS syntax |
| @tailwindcss/postcss | @tailwindcss/vite | Tailwind v4 | Direct Vite plugin, simpler setup |
| Formik | React Hook Form / useState | 2022+ | Formik less maintained |
| Class components | Functional + hooks | 2019+ | Hooks are the standard |

**Deprecated/outdated:**
- **Create React App (CRA):** Officially deprecated, use Vite
- **Tailwind @tailwind directives:** v4 uses @import "tailwindcss"
- **Formik:** Consider React Hook Form for complex forms, useState for simple
- **postcss.config.js for Tailwind:** v4 with Vite uses @tailwindcss/vite plugin

## Open Questions

Things that couldn't be fully resolved:

1. **Avatar Image Assets**
   - What we know: Need 4 women avatar options with descriptions
   - What's unclear: Are actual avatar images needed for Phase 1, or just text/placeholders?
   - Recommendation: Use placeholder descriptions for Phase 1, actual images can be added

2. **n8n Webhook URL**
   - What we know: Will call n8n webhook in Phase 3
   - What's unclear: Exact URL/endpoint format
   - Recommendation: Design frontend to accept configurable API endpoint

3. **Image Size Limits**
   - What we know: Final output is 1080x1350px
   - What's unclear: Max upload file size for inputs
   - Recommendation: Start with 10MB limit per image, adjust based on n8n requirements

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS Official Docs - Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Tailwind CSS Official Docs - Vite Installation](https://tailwindcss.com/docs/guides/vite)
- [Headless UI Official Docs - Listbox](https://headlessui.com/react/listbox)
- [react-dropzone GitHub](https://github.com/react-dropzone/react-dropzone)
- [MDN URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static)
- [Vercel Vite Deployment](https://vercel.com/docs/frameworks/frontend/vite)

### Secondary (MEDIUM confidence)
- [Robin Wieruch - React Folder Structure 2025](https://www.robinwieruch.de/react-folder-structure/)
- [LogRocket - FileReader API in React](https://blog.logrocket.com/using-filereader-api-preview-images-react/)
- [TypeScript Enums vs as const patterns](https://2ality.com/2025/01/typescript-enum-patterns.html)

### Tertiary (LOW confidence)
- Community patterns from web search (multiple sources cross-referenced)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries are well-documented, official sources available
- Architecture: HIGH - Patterns are common in React ecosystem
- Pitfalls: HIGH - Memory leak and responsive issues are well-documented
- File validation security: MEDIUM - Verified with OWASP, but server-side is Phase 3

**Research date:** 2026-01-22
**Valid until:** 30 days (stable technologies, no fast-moving concerns)
