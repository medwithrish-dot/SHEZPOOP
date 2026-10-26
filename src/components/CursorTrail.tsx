import React, { useEffect, useState } from 'react';

interface CursorTrailProps {
  enabled: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
}

export const CursorTrail: React.FC<CursorTrailProps> = ({ enabled }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!enabled) return;

    let particleId = 0;
    let lastTime = 0;
    const chars = ['✨', '💩', '💫', '🧻'];

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 65) return; // Throttle to maintain 60fps smoothness
      lastTime = now;

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        char: chars[Math.floor(Math.random() * chars.length)],
      };

      setParticles(prev => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  // Clean up old particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {particles.map(p => (
        <span
          key={p.id}
          className="cursor-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};

