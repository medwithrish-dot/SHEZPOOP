import React, { useEffect, useState } from 'react';
import { playPlop } from '../utils/sound';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playPlop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Ascend to the Throne (Top)"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-gold), #8B4513)',
        border: '2px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(255, 215, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.6rem',
        cursor: 'pointer',
        zIndex: 890,
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      className="wiggle-hover"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.15) translateY(-4px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
      }}
    >
      💩
    </button>
  );
};

