import { useEffect } from 'react';

const SITE_NAME = 'reEDITme';

/**
 * Sets document.title for the current page.
 * Format: "Page Title | reEDITme" or just "reEDITme" if no title provided.
 */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [title]);
}
