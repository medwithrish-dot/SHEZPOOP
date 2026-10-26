import React, { useMemo } from 'react';
import { playPlop } from '../utils/sound';

interface FallingPoopsProps {
  enabled: boolean;
}

export const FallingPoops: React.FC<FallingPoopsProps> = ({ enabled }) => {
  const poops = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + '%',
      duration: Math.random() * 8 + 8 + 's',
      delay: Math.random() * 10 + 's',
      size: Math.random() * 1.4 + 1.1 + 'rem',
      opacity: Math.random() * 0.4 + 0.25,
      symbol: i % 4 === 0 ? '✨' : i % 5 === 0 ? '🧻' : '💩',
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      {poops.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: '-60px',
            fontSize: p.size,
            opacity: p.opacity,
            animation: `poopFallMotion ${p.duration} linear infinite`,
            animationDelay: p.delay,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
            pointerEvents: 'auto',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            playPlop();
            const el = e.currentTarget;
            el.style.transform = 'scale(2.2) rotate(180deg)';
            el.style.opacity = '0';
            setTimeout(() => {
              el.style.transform = '';
              el.style.opacity = String(p.opacity);
            }, 1000);
          }}
          title="Poke the floating poop!"
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

