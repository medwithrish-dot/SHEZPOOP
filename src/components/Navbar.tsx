import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, Menu, X } from 'lucide-react';
import { setSoundEnabled, playPop } from '../utils/sound';

interface NavbarProps {
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
  particlesOn: boolean;
  setParticlesOn: (on: boolean) => void;
  unlockedCount: number;
  totalAchievements: number;
  openAchievements: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundOn,
  setSoundOn,
  particlesOn,
  setParticlesOn,
  unlockedCount,
  totalAchievements,
  openAchievements,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playPop();
  };

  const navLinks = [
    { label: 'Origin', href: '#who' },
    { label: 'The Rise', href: '#timeline' },
    { label: 'Powers', href: '#powers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Mini-Game', href: '#game' },
    { label: 'Hall of Fame', href: '#hall-of-fame' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(18, 11, 6, 0.88)' : 'rgba(18, 11, 6, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(57, 255, 20, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Brand */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
          onClick={() => playPop()}
        >
          <span style={{ fontSize: '1.9rem', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))' }}>💩</span>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.25rem',
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              SHEZPOOP<span style={{ color: 'var(--color-lime)' }}>.</span>
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
              }}
            >
              The Legend of Mayk
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--color-cream-soft)',
                transition: 'color 0.2s ease, transform 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-lime)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-cream-soft)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
              onClick={() => playPop()}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute comedic sound effects' : 'Enable comedic sound effects'}
            title={soundOn ? 'Sound On (Click to mute)' : 'Sound Muted (Click to enable audio fx)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: soundOn ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: soundOn ? '1px solid var(--color-lime)' : '1px solid rgba(255, 255, 255, 0.15)',
              color: soundOn ? 'var(--color-lime)' : 'var(--color-cream-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Particle Toggle */}
          <button
            onClick={() => {
              setParticlesOn(!particlesOn);
              playPop();
            }}
            aria-label="Toggle falling poop particles"
            title={particlesOn ? 'Particles Active' : 'Particles Paused'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: particlesOn ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: particlesOn ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.15)',
              color: particlesOn ? 'var(--color-gold)' : 'var(--color-cream-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            <Sparkles size={18} />
          </button>

          {/* Achievements Trigger */}
          <button
            onClick={() => {
              openAchievements();
              playPop();
            }}
            aria-label="View achievements"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 105, 180, 0.15)',
              border: '1px solid rgba(255, 105, 180, 0.4)',
              color: 'var(--color-pink)',
              fontWeight: 800,
              fontSize: '0.8rem',
              transition: 'all 0.2s ease',
            }}
          >
            <Trophy size={16} />
            <span>{unlockedCount}/{totalAchievements}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(18, 11, 6, 0.98)',
            borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setMobileMenuOpen(false);
                playPop();
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-cream)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

