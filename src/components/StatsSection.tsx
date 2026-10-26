import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, Unlock, Award } from 'lucide-react';
import { playFart, playPop } from '../utils/sound';

interface StatsSectionProps {
  onUnlockDossier?: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ onUnlockDossier }) => {
  const [dossierOpen, setDossierOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    toilets: 0,
    energy: 0,
    questioned: 0,
    lawsuits: 0,
  });

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        toilets: Math.floor(ease * 9999),
        energy: Math.floor(ease * 100),
        questioned: Math.floor(ease * 47),
        lawsuits: Math.floor(ease * 1337),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleToggleDossier = () => {
    playFart();
    setDossierOpen(!dossierOpen);
    if (!dossierOpen && onUnlockDossier) {
      onUnlockDossier();
    }
  };

  return (
    <section id="hall-of-fame" className="section-wrap" style={{ position: 'relative' }} ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal-up">
          <span className="section-tag">
            <Award size={14} />
            VERIFIED HISTORICAL AUDIT
          </span>
          <h2 className="section-title">THE MAO MAO HALL OF FAME</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Empirically recorded metrics from the Imperial Department of Sewage & Shenanigans.
          </p>
        </div>

        {/* Ridiculous Stat Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Stat 1 */}
          <div className="glass-card reveal-up stagger-child" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🚽</div>
            <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-lime)', lineHeight: 1 }}>
              {counts.toilets.toLocaleString()}+
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginTop: '8px' }}>
              Toilets Conquered
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)', marginTop: '4px' }}>
              None survived intact
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glass-card reveal-up stagger-child" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-gold)', lineHeight: 1 }}>
              {counts.energy}%
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginTop: '8px' }}>
              Mao Mao Energy
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)', marginTop: '4px' }}>
              Supreme fighting kitten aura
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass-card reveal-up stagger-child" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>❓</div>
            <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-pink)', lineHeight: 1 }}>
              {counts.questioned}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginTop: '8px' }}>
              Times Questioned
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)', marginTop: '4px' }}>
              Zero answers provided
            </div>
          </div>

          {/* Stat 4 */}
          <div className="glass-card reveal-up stagger-child" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🍗</div>
            <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff', lineHeight: 1.2 }}>
              CLASSIFIED
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-gold)', marginTop: '8px' }}>
              Poopboy Approval
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)', marginTop: '4px' }}>
              Chicken wing status: PENDING
            </div>
          </div>

          {/* Stat 5 */}
          <div className="glass-card reveal-up stagger-child" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⚖️</div>
            <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-lime)', lineHeight: 1 }}>
              {counts.lawsuits.toLocaleString()}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginTop: '8px' }}>
              Plumbing Lawsuits Evaded
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)', marginTop: '4px' }}>
              All charges mysteriously flushed
            </div>
          </div>

          {/* Stat 6 */}
          <div className="glass-card reveal-up stagger-child" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>👑</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-gold)', lineHeight: 1.3 }}>
              RIGHT-HAND MAO MAO MAN
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginTop: '8px' }}>
              Official Title
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)', marginTop: '4px' }}>
              Signed by Poopboy himself
            </div>
          </div>
        </div>

        {/* TOP SECRET CARD */}
        <div
          className="glass-card reveal-scale"
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            border: dossierOpen ? '2px solid var(--color-gold)' : '2px dashed rgba(255, 215, 0, 0.4)',
            cursor: 'pointer',
            padding: '2rem',
            background: dossierOpen ? 'linear-gradient(135deg, rgba(42, 22, 8, 0.95), #120b06)' : 'rgba(25, 14, 7, 0.65)',
            transition: 'all 0.3s ease',
          }}
          onClick={handleToggleDossier}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: dossierOpen ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                }}
              >
                {dossierOpen ? <Unlock size={22} /> : <Lock size={22} />}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', color: '#fff' }}>
                  {dossierOpen ? 'TOP SECRET DOSSIER: UNLOCKED' : 'TOP SECRET: TAP TO DECRYPT DOSSIER'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                  Clearance Level: Mao Mao Man Eyes Only
                </div>
              </div>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.8rem',
                padding: '6px 14px',
                borderRadius: '999px',
                background: dossierOpen ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.1)',
                color: dossierOpen ? 'var(--color-chocolate-dark)' : 'var(--color-cream)',
              }}
            >
              {dossierOpen ? 'DECRYPTED' : 'CLICK TO REVEAL 🔓'}
            </span>
          </div>

          {/* Revealed Secret Content */}
          {dossierOpen && (
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 215, 0, 0.2)',
                color: 'var(--color-cream-soft)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '1rem',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  color: 'var(--color-lime)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                }}
              >
                &gt; DECRYPTING RECORD #992-MM...<br />
                &gt; PASSPHRASE: "chicken wing chicken wing hot dog and baloney"<br />
                &gt; ACCESS GRANTED.
              </div>
              <p style={{ marginBottom: '1rem' }}>
                <strong>INTERCEPTED TRANSCRIPT FINDING:</strong>
              </p>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "Poopboy's absolute weakness is lukewarm bath water and unexpected requests to simplify fractions. Whenever confronted with authority, Mayk deploys the boxing kitten stance while reciting the sacred baloney chant."
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-gold)' }}>
                ⭐ Congratulations! You have broken the classified seal. Poopboy is actively tracking your IP address in Roblox.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

