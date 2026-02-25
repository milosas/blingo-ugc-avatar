import { renderHook } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { usePageTitle } from './usePageTitle';

describe('usePageTitle', () => {
  afterEach(() => {
    document.title = '';
  });

  it('sets document.title with page name and site name', () => {
    renderHook(() => usePageTitle('Gallery'));
    expect(document.title).toBe('Gallery | reEDITme');
  });

  it('sets document.title to just site name when no title provided', () => {
    renderHook(() => usePageTitle());
    expect(document.title).toBe('reEDITme');
  });

  it('resets document.title on unmount', () => {
    const { unmount } = renderHook(() => usePageTitle('Gallery'));
    expect(document.title).toBe('Gallery | reEDITme');
    unmount();
    expect(document.title).toBe('reEDITme');
  });

  it('updates document.title when title changes', () => {
    const { rerender } = renderHook(
      ({ title }) => usePageTitle(title),
      { initialProps: { title: 'Gallery' as string | undefined } }
    );
    expect(document.title).toBe('Gallery | reEDITme');

    rerender({ title: 'Dashboard' });
    expect(document.title).toBe('Dashboard | reEDITme');
  });
});
