import React, { useState } from 'react';
import { ArrowDown, Flame, Sparkles } from 'lucide-react';
import { triggerPoopBurst } from '../utils/confetti';
import { playFart, playPop } from '../utils/sound';

interface HeroSectionProps {
  onEnterPoopverse: () => void;
  onSecretPoopClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterPoopverse,
  onSecretPoopClick,
}) => {
  const [secretClicks, setSecretClicks] = useState(0);

  const handleSecretClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPop();
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next >= 5) {
      setSecretClicks(0);
      onSecretPoopClick();
    }
  };

  const handleEnterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerPoopBurst(x, y);
    onEnterPoopverse();

    setTimeout(() => {
      const nextSection = document.getElementById('who');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '6rem 1rem 3rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Background Blobs */}
      <div
        className="gradient-blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #5c3317 0%, transparent 70%)',
          top: '15%',
          left: '10%',
        }}
      />
      <div
        className="gradient-blob"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(57, 255, 20, 0.2) 0%, transparent 70%)',
          bottom: '10%',
          right: '8%',
        }}
      />
      <div
        className="gradient-blob"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 70%)',
          top: '35%',
          right: '35%',
        }}
      />

      {/* Main Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Animated Badge */}
        <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
          <div
            className="glow-pulse"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 22px',
              background: 'rgba(255, 105, 180, 0.15)',
              border: '2px solid var(--color-pink)',
              color: 'var(--color-pink)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: '999px',
            }}
          >
            <Flame size={16} />
            <span>OFFICIALLY UNHINGED</span>
            <span
              onClick={handleSecretClick}
              title="A very suspicious little emoji..."
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                transform: secretClicks > 0 ? `scale(${1 + secretClicks * 0.15})` : 'none',
                transition: 'transform 0.15s ease',
              }}
            >
              💩
            </span>
          </div>
        </div>

        {/* Hero Mascot with Smug Avatar Blend */}
        <div style={{ position: 'relative', margin: '0 auto 1.5rem', width: 'fit-content' }}>
          <div
            className="floating"
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => {
              playFart();
              triggerPoopBurst(0.5, 0.4);
            }}
            title="Click Shezpoop's royal emblem!"
          >
            <div
              style={{
                width: 'clamp(140px, 20vw, 200px)',
                height: 'clamp(140px, 20vw, 200px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffd700, #ff69b4, #39ff14)',
                padding: '5px',
                boxShadow: '0 0 50px rgba(255, 215, 0, 0.45)',
                margin: '0 auto',
                position: 'relative',
              }}
            >
              <img
                src="/images/shezpoop-hero.png"
                alt="Shezpoop / Mayk smugly posing before burning disaster"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  filter: 'contrast(1.08)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  right: '-10px',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))',
                }}
                className="wiggle"
              >
                💩
              </span>
            </div>
          </div>
        </div>

        {/* Massive Headline */}
        <h1
          className="hero-title"
          style={{
            marginBottom: '0.8rem',
            animation: 'floatGentle 6s ease-in-out infinite',
          }}
        >
          SHEZPOOP 💩
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{
            margin: '0 auto 2.5rem',
          }}
        >
          AKA MAYK — POOPBOY'S RIGHT-HAND MAO MAO MAN
        </p>

        {/* Agency-style dramatic tagline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-cream-soft)',
            maxWidth: '680px',
            margin: '0 auto 3rem',
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          "Behind every great Poopboy stands one questionable Mao Mao Man. Born Mayk. Reborn Shezpoop. Feared by porcelain everywhere."
        </p>

        {/* CTA Button Group */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn-primary magnetic-button"
            onClick={handleEnterClick}
          >
            <Sparkles size={20} />
            <span>ENTER THE POOPVERSE</span>
            <span>💩</span>
          </button>

          <a
            href="#game"
            className="btn-secondary"
            onClick={() => playPop()}
          >
            <span>🎮 PLAY CATCH THE POOP</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-cream-muted)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onClick={() => {
          playPop();
          const target = document.getElementById('who');
          target?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>Scroll to uncover the truth</span>
        <ArrowDown size={18} style={{ animation: 'floatGentle 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
};

