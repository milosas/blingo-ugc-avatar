import { lazy, Suspense, useEffect, useState } from 'react';

const Particles = lazy(() =>
  import('@tsparticles/react').then((mod) => ({ default: mod.default }))
);

interface ParticleBackgroundProps {
  className?: string;
}

export function ParticleBackground({ className = '' }: ParticleBackgroundProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { initParticlesEngine } = await import('@tsparticles/react');
      const { loadSlim } = await import('@tsparticles/slim');
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      if (!cancelled) setReady(true);
    })();
    return () => { cancelled = true; };
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Particles
        className={className}
        options={{
          fullScreen: false,
          fpsLimit: 60,
          particles: {
            color: { value: '#FF6B35' },
            number: { value: 30, density: { enable: true } },
            opacity: { value: { min: 0.1, max: 0.3 } },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 0.5,
              direction: 'none' as const,
              outModes: { default: 'out' as const },
            },
            links: {
              enable: true,
              color: '#FF6B35',
              opacity: 0.1,
              distance: 150,
            },
          },
          detectRetina: true,
        }}
      />
    </Suspense>
  );
}
