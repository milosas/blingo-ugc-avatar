import { lazy, Suspense } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const HeroScene = lazy(() => import('./HeroScene'));

export function HeroBackground() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isMobile ? (
        <div className="animated-gradient-bg w-full h-full opacity-60" />
      ) : (
        <Suspense fallback={<div className="animated-gradient-bg w-full h-full opacity-60" />}>
          <div className="w-full h-full opacity-50">
            <HeroScene />
          </div>
        </Suspense>
      )}
    </div>
  );
}
