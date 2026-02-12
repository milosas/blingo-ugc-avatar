import { useRef, useState, useCallback } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDeg?: number;
  glare?: boolean;
}

export function TiltCard({ children, className = '', tiltDeg = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * tiltDeg;
      const rotateY = (x - 0.5) * tiltDeg;

      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out',
      });

      if (glare) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 180;
        setGlareStyle({
          opacity: 0.15,
          background: `linear-gradient(${angle}deg, rgba(255,255,255,0.4) 0%, transparent 80%)`,
        });
      }
    },
    [isMobile, tiltDeg, glare],
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    });
    setGlareStyle({ opacity: 0 });
  }, []);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{ ...glareStyle, transition: 'opacity 0.3s ease-out' }}
        />
      )}
    </div>
  );
}
