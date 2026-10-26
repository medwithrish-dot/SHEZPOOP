import React, { useState } from 'react';
import { triggerPoopstorm, shakeScreen } from '../utils/confetti';
import { playFart, playPop, playOverdrive } from '../utils/sound';
import { Sparkles, Zap, Heart } from 'lucide-react';

interface PoopolutionSectionProps {
  onUnleashPoopstorm: () => void;
}

export const PoopolutionSection: React.FC<PoopolutionSectionProps> = ({ onUnleashPoopstorm }) => {
  const [bounces, setBounces] = useState(0);
  const [poopstormTriggered, setPoopstormTriggered] = useState(false);

  const handlePoopClick = () => {
    playFart();
    setBounces(prev => prev + 1);
  };

  const handleStormClick = () => {
    setPoopstormTriggered(true);
    triggerPoopstorm();
    shakeScreen('heavy');
    onUnleashPoopstorm();

    setTimeout(() => {
      setPoopstormTriggered(false);
    }, 4500);
  };

  return (
    <section
      id="finale"
      className="section-wrap"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(18, 11, 6, 0.4) 0%, #0d0703 100%)',
        textAlign: 'center',
        paddingBottom: '4rem',
      }}
    >
      {/* Background glow effects */}
      <div
        className="gradient-blob"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Badge */}
        <div className="reveal-up" style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 24px',
              borderRadius: '999px',
              background: 'rgba(255, 215, 0, 0.15)',
              border: '2px solid var(--color-gold)',
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
            }}
          >
            <Sparkles size={16} />
            THE FINAL ASCENSION
          </span>
        </div>

        {/* Huge Heading */}
        <h2
          className="hero-title reveal-up"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            color: 'var(--color-gold)',
            marginBottom: '1rem',
          }}
        >
          ALL HAIL SHEZPOOP.
        </h2>

        {/* Subheading */}
        <p
          className="reveal-up"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 800,
            color: 'var(--color-lime)',
            letterSpacing: '0.04em',
            maxWidth: '780px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.4,
          }}
        >
          Long live Mayk. Long live Poopboy. Long live the Mao Mao Man.
        </p>

        {/* Giant Interactive Poop Emoji */}
        <div className="reveal-scale" style={{ margin: '0 auto 2.5rem', width: 'fit-content' }}>
          <div
            onClick={handlePoopClick}
            className="wiggle-hover"
            style={{
              fontSize: 'clamp(6rem, 15vw, 11rem)',
              cursor: 'pointer',
              userSelect: 'none',
              filter: 'drop-shadow(0 15px 35px rgba(255, 215, 0, 0.45))',
              transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: bounces % 2 === 0 ? 'scale(1)' : 'scale(1.18) rotate(-4deg)',
              display: 'inline-block',
            }}
            title="Click Shezpoop's ultimate form!"
          >
            💩
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-cream-muted)', marginTop: '8px' }}>
            {bounces > 0 ? `Bounced ${bounces} times! Mayk is watching.` : 'Click the mighty throne for comedic sound'}
          </div>
        </div>

        {/* Button: UNLEASH THE POOPSTORM */}
        <div className="reveal-up" style={{ marginBottom: '4rem' }}>
          <button
            className="btn-gold magnetic-button"
            onClick={handleStormClick}
            disabled={poopstormTriggered}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              padding: '18px 44px',
            }}
          >
            <Zap size={22} />
            <span>UNLEASH THE POOPSTORM</span>
            <span>💩</span>
          </button>
          {poopstormTriggered && (
            <div
              style={{
                marginTop: '1rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: 'var(--color-lime)',
                fontSize: '1rem',
                animation: 'pulseGlow 1s infinite',
              }}
            >
              🌪️ MAXIMUM POOP PARTICLES DEPLOYED! THE SERVERS CANNOT COPE!
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            maxWidth: '850px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
            margin: '0 auto 3rem',
          }}
        />

        {/* Humorous Footer */}
        <footer style={{ color: 'var(--color-cream-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.05rem',
              color: 'var(--color-cream)',
              marginBottom: '0.5rem',
            }}
          >
            © THE SHEZPOOP EMPIRE — ALL RIGHTS RESERVED, MOST DIGNITY LOST.
          </p>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.85rem' }}>
            Built with pure devotion for Mayk and Poopboy (@Xizaterasu). No ceramic was permanently cracked during the production of this website. If your local sewage system is making rhythmic meowing noises, please contact the authorities.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-gold)' }}>
            <span>Made with</span>
            <Heart size={14} style={{ color: 'var(--color-pink)', fill: 'var(--color-pink)' }} />
            <span>and copious amounts of toilet paper.</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

