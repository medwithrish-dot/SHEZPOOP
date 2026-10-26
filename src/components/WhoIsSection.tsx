import React from 'react';
import { AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { playFart, playPop } from '../utils/sound';

export const WhoIsSection: React.FC = () => {
  return (
    <section id="who" className="section-wrap" style={{ position: 'relative' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Image with cinematic badges */}
          <div className="reveal-left" style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                border: '2px solid rgba(57, 255, 20, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(57, 255, 20, 0.15)',
                background: '#1b0e05',
              }}
            >
              <img
                src="/images/shezpoop-hero.png"
                alt="Portrait of Shezpoop / Mayk"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              />

              {/* Floating Badge 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '18px',
                  background: 'rgba(255, 51, 75, 0.92)',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(255, 51, 75, 0.5)',
                }}
              >
                <AlertTriangle size={14} />
                <span>PUBLIC HEALTH CONCERN</span>
              </div>

              {/* Floating Badge 2 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  right: '18px',
                  background: 'rgba(57, 255, 20, 0.92)',
                  color: '#120b06',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(57, 255, 20, 0.5)',
                }}
              >
                <ShieldCheck size={16} />
                <span>99.9% SUSPICIOUS</span>
              </div>
            </div>

            {/* Subtle decorative sticker */}
            <div
              className="floating"
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-15px',
                background: 'var(--color-gold)',
                color: 'var(--color-chocolate-dark)',
                padding: '10px 16px',
                borderRadius: '16px',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.85rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                transform: 'rotate(8deg)',
              }}
            >
              👑 MAO MAO AUTHORIZED
            </div>
          </div>

          {/* Right Column: Absurd Historical Documentary Text */}
          <div className="reveal-right">
            <span className="section-tag">
              <Flame size={14} />
              CLASSIFIED DOSSIER // ARCHIVE-001
            </span>

            <h2 className="section-title">
              EVERY LEGEND HAS A NAME.<br />
              <span style={{ color: 'var(--color-lime)' }}>UNFORTUNATELY, THIS ONE IS MAYK.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--color-cream-soft)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              <p className="reveal-up stagger-child">
                She was not sculpted by gods; she was forged in the chaotic crucible of unhinged group chats, unprovoked toilet threats, and unyielding frontend determination. Long before she assumed the legendary title of <strong>SHEZPOOP</strong>, she walked among mortals under the deceptive civilian pseudonym of <strong>Mayk</strong>.
              </p>

              <p className="reveal-up stagger-child">
                The watershed moment arrived during the fateful Discord parley with the sovereign monarch of sewage himself: <strong>Poopboy</strong> (@Xizaterasu). When challenged to code, Mayk did not waver. She declared to the heavens: <em>"I'll acc make a website for ur poop."</em> Thus, the sacred covenant was sealed.
              </p>

              <p className="reveal-up stagger-child">
                Officially, she operates as Poopboy's premier <strong>Right-Hand Mao Mao Man</strong>. Unofficially? She is an airborne hazard to porcelain, a rogue entity equipped with Supreme Mao Mao combat stance, and the chaotic power that keeps the empire from collapsing into a standard flush.
              </p>
            </div>

            {/* Quote Card */}
            <div
              className="glass-card reveal-up stagger-child"
              style={{
                marginTop: '2rem',
                borderLeft: '4px solid var(--color-gold)',
                padding: '1.25rem 1.75rem',
                background: 'rgba(42, 22, 8, 0.65)',
              }}
              onClick={() => playFart()}
            >
              <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem' }}>
                "Some heroes wear capes. Shezpoop brings her own 3-ply ultra-soft quilted toilet paper. Scientists are still investigating. The council has refused to comment."
              </p>
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-cream-muted)', fontWeight: 600 }}>
                — Official Statement, Department of Unexplained Mayk Phenomena
              </div>
            </div>

            {/* Micro Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1.75rem' }}>
              {['🚽 Feared by Toilets', '🥊 Boxing Cat Certified', '🍗 Baloney & Macaroni', '🔥 Arsonist Smirk'].map(tag => (
                <span
                  key={tag}
                  onClick={() => playPop()}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: 'var(--color-cream)',
                    cursor: 'pointer',
                  }}
                  className="wiggle-hover"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

