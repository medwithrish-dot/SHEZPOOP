import React, { useState, useEffect } from 'react';
import { PowerCardData } from '../types';
import { Zap, ShieldAlert, Sparkles } from 'lucide-react';
import { playFart, playPop } from '../utils/sound';

interface PowersSectionProps {
  onPowerClick?: () => void;
}

export const PowersSection: React.FC<PowersSectionProps> = ({ onPowerClick }) => {
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [meterValue, setMeterValue] = useState(0);

  useEffect(() => {
    // Fill meter up to 999% when viewed
    const timer = setTimeout(() => {
      setMeterValue(999);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const powers: PowerCardData[] = [
    {
      id: 'brown-touch',
      name: 'The Brown Touch',
      subhead: 'Passive Transmutation',
      icon: '🟤',
      powerLevel: 880,
      description: 'The uncanny supernatural ability to derail any intellectual, professional, or romantic dialogue into an exhaustive debate about plumbing fixtures within 3 minutes.',
      hiddenJoke: '⚠️ WARNING: High risk of unprovoked plunger mentions in formal settings.',
      tag: 'TRANSMUTATION',
    },
    {
      id: 'mao-mao-energy',
      name: 'Supreme Mao Mao Energy',
      subhead: 'Combat Stance +999 Aura',
      icon: '🥊🐱',
      powerLevel: 999,
      description: 'Adopts the legendary boxing feline stance. Increases intimidation by 10,000%, causes opponents to apologize immediately, and commands total respect in voice chat.',
      hiddenJoke: '💥 Secret: No one has ever won a fist fight against a boxing kitten.',
      tag: 'COMBAT ART',
      image: '/images/mao-mao-stance.png',
    },
    {
      id: 'emergency-summon',
      name: 'Emergency Poop Summoning',
      subhead: 'Tactical Extraction',
      icon: '🚨💩',
      powerLevel: 940,
      description: 'Bypasses all known laws of digestive biology to manifest an immediate, non-negotiable bathroom urgency whenever an awkward conversation or chore arises.',
      hiddenJoke: '🚽 Escaped 14 family reunions and 9 group projects using this technique.',
      tag: 'TACTICAL ESCAPE',
    },
    {
      id: 'side-eye',
      name: 'The Legendary Side-Eye',
      subhead: 'Psychological Warfare',
      icon: '👀',
      powerLevel: 915,
      description: 'A cold, discerning glare inspired by ancient apothecary maidens that pierces through your soul and silently judges your taste in memes and bathroom hygiene.',
      hiddenJoke: '❄️ Has caused temperatures in Discord calls to drop by 12 degrees Celsius.',
      tag: 'DEBUFF',
    },
    {
      id: 'toilet-authority',
      name: 'Royal Toilet Authority',
      subhead: 'Porcelain Monarchy',
      icon: '👑🚽',
      powerLevel: 980,
      description: 'Decrees who may sit upon the ceramic throne and under what stringent conditions. Anyone attempting to flush without authorization faces immediate court-martial.',
      hiddenJoke: '📜 3-ply paper is strictly required under Section 4, Clause 2 of Mayk Law.',
      tag: 'SOVEREIGNTY',
    },
    {
      id: 'mayk-behaviour',
      name: 'Unexplained Mayk Behaviour',
      subhead: 'Pure Unfiltered Chaos',
      icon: '🌀',
      powerLevel: 999,
      description: 'Completely unprompted statements, sudden website developments at 3 AM, and spontaneous declarations to "acc make a website for ur poop". Defies psychiatric classification.',
      hiddenJoke: '🧠 Even top researchers at MIT gave up trying to map Mayk\'s cognitive pathways.',
      tag: 'ANOMALY',
    },
  ];

  const handleCardClick = (id: string) => {
    playFart();
    setClickedCard(clickedCard === id ? null : id);
    if (onPowerClick) onPowerClick();
  };

  return (
    <section id="powers" className="section-wrap" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal-up">
          <span className="section-tag">
            <Zap size={14} />
            ARSENAL OF MAYK
          </span>
          <h2 className="section-title">SHEZPOOP'S SPECIAL POWERS</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Documented abilities recorded by terrified eyewitnesses. Click any card to inspect classified threat diagnostics.
          </p>

          {/* Fictional Power Meter */}
          <div
            className="glass-card"
            style={{
              maxWidth: '650px',
              margin: '0 auto',
              padding: '1.25rem 2rem',
              border: '2px solid var(--color-gold)',
              boxShadow: '0 0 35px rgba(255, 215, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={16} /> TOTAL DESTRUCTIVE MAO MAO OUTPUT
              </span>
              <span style={{ fontFamily: 'var(--font-hero)', fontSize: '1.25rem', color: 'var(--color-lime)' }}>
                {meterValue}%
              </span>
            </div>

            <div style={{ width: '100%', height: '14px', background: 'rgba(0, 0, 0, 0.6)', borderRadius: '999px', overflow: 'hidden', padding: '2px' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, meterValue / 10)}%`,
                  background: 'linear-gradient(90deg, var(--color-lime), var(--color-gold), var(--color-pink))',
                  borderRadius: '999px',
                  boxShadow: '0 0 15px rgba(57, 255, 20, 0.8)',
                  transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--color-cream-muted)', letterSpacing: '0.05em' }}>
              STATUS: DANGER — CRITICAL OVERLOAD. MUNICIPAL SEWERS ADVISED TO BRACE FOR IMPACT.
            </div>
          </div>
        </div>

        {/* Powers Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {powers.map((pow) => (
            <div
              key={pow.id}
              className="glass-card reveal-up stagger-child"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: clickedCard === pow.id ? '2px solid var(--color-lime)' : undefined,
                boxShadow: clickedCard === pow.id ? '0 0 30px rgba(57, 255, 20, 0.3)' : undefined,
              }}
              onClick={() => handleCardClick(pow.id)}
            >
              <div>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    }}
                    className="wiggle-hover"
                  >
                    {pow.icon}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.7rem',
                      color: 'var(--color-lime)',
                      background: 'rgba(57, 255, 20, 0.1)',
                      border: '1px solid rgba(57, 255, 20, 0.25)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {pow.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '4px',
                  }}
                >
                  {pow.name}
                </h3>

                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-gold)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  {pow.subhead}
                </div>

                <p style={{ color: 'var(--color-cream-soft)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {pow.description}
                </p>

                {/* Optional Power Image Thumbnail */}
                {pow.image && (
                  <div
                    style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <img
                      src={pow.image}
                      alt={pow.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0603' }}
                    />
                  </div>
                )}
              </div>

              {/* Secret Clickable Section */}
              <div
                style={{
                  marginTop: '1rem',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: clickedCard === pow.id ? 'rgba(57, 255, 20, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: clickedCard === pow.id ? '1px solid var(--color-lime)' : '1px dashed rgba(255, 255, 255, 0.15)',
                  fontSize: '0.82rem',
                  color: clickedCard === pow.id ? 'var(--color-lime)' : 'var(--color-cream-muted)',
                  transition: 'all 0.25s ease',
                }}
              >
                {clickedCard === pow.id ? (
                  <div>{pow.hiddenJoke}</div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>⚡ Click to reveal secret threat diagnostic</span>
                    <Sparkles size={14} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

