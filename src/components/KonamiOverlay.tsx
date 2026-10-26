import React, { useEffect, useState } from 'react';
import { triggerPoopstorm, shakeScreen } from '../utils/confetti';
import { playOverdrive } from '../utils/sound';

interface KonamiOverlayProps {
  onUnlockKonami: () => void;
}

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const KonamiOverlay: React.FC<KonamiOverlayProps> = ({ onUnlockKonami }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_CODE[index];

      if (key === expected.toLowerCase() || key === expected) {
        const nextIndex = index + 1;
        if (nextIndex === KONAMI_CODE.length) {
          // Trigger Overdrive!
          triggerOverdrive();
          setIndex(0);
        } else {
          setIndex(nextIndex);
        }
      } else {
        setIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  const triggerOverdrive = () => {
    setActive(true);
    document.body.classList.add('overdrive-active');
    playOverdrive();
    triggerPoopstorm();
    shakeScreen('heavy');
    onUnlockKonami();

    setTimeout(() => {
      setActive(false);
      document.body.classList.remove('overdrive-active');
    }, 8000);
  };

  if (!active) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
      onClick={() => {
        setActive(false);
        document.body.classList.remove('overdrive-active');
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          background: 'linear-gradient(135deg, #2a1608, #120b06)',
          border: '4px solid var(--color-lime)',
          borderRadius: '32px',
          padding: '3rem 2rem',
          boxShadow: '0 0 60px var(--color-lime), inset 0 0 30px rgba(57,255,20,0.4)',
          animation: 'pulseGlow 1.5s ease-in-out infinite',
        }}
      >
        <div style={{ fontSize: '4.5rem', marginBottom: '1rem' }} className="wiggle">
          🥊🐱💩
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--color-lime)',
            textShadow: '0 0 20px var(--color-lime)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          MAO MAO OVERDRIVE!
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--color-gold)',
            fontWeight: 800,
            marginBottom: '1.5rem',
          }}
        >
          MAXIMUM CHAOS PROTOCOL ENGAGED. POOPBOY IS ASTOUNDED.
        </p>
        <p style={{ color: 'var(--color-cream-soft)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Mayk's true power has been unleashed upon your browser. All plumbing warranties have been permanently voided.
        </p>
        <button
          className="btn-primary"
          onClick={() => {
            setActive(false);
            document.body.classList.remove('overdrive-active');
          }}
        >
          EMBRACE THE CHAOS (DISMISS)
        </button>
      </div>
    </div>
  );
};

