import React, { useState, useCallback, useEffect } from 'react';
import { Achievement } from './types';
import { useScrollReveal } from './hooks/useScrollReveal';
import { playGoldenChime, playPop } from './utils/sound';

// Components
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FallingPoops } from './components/FallingPoops';
import { CursorTrail } from './components/CursorTrail';
import { BackToTop } from './components/BackToTop';
import { RandomEvents } from './components/RandomEvents';
import { KonamiOverlay } from './components/KonamiOverlay';
import { SecretModal } from './components/SecretModal';
import { AchievementsDrawer } from './components/AchievementsDrawer';

// Sections
import { HeroSection } from './components/HeroSection';
import { WhoIsSection } from './components/WhoIsSection';
import { TimelineSection } from './components/TimelineSection';
import { PowersSection } from './components/PowersSection';
import { GallerySection } from './components/GallerySection';
import { MiniGame } from './components/MiniGame';
import { StatsSection } from './components/StatsSection';
import { PoopolutionSection } from './components/PoopolutionSection';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-flush',
    title: 'First Flush',
    description: 'Bravely clicked Enter the Poopverse on the grand hero throne.',
    icon: '🚽',
    unlocked: false,
  },
  {
    id: 'power-inspector',
    title: 'Power Inspector',
    description: 'Inspected Mayk’s unholy special powers and diagnostics.',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'evidence-analyst',
    title: 'Forensic Analyst',
    description: 'Inspected classified photography in the forensic lightbox.',
    icon: '🔍',
    unlocked: false,
  },
  {
    id: 'golden-alchemist',
    title: 'Golden Alchemist',
    description: 'Caught three golden poops in a single run of Catch the Golden Poop.',
    icon: '✨',
    unlocked: false,
  },
  {
    id: 'game-champion',
    title: 'Master of Porcelain',
    description: 'Achieved a legendary score of 200+ points in the mini-game.',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'dossier-breaker',
    title: 'Dossier Breaker',
    description: 'Decrypted the top secret classified file in the Mao Mao Hall of Fame.',
    icon: '🔓',
    unlocked: false,
  },
  {
    id: 'forbidden-scholar',
    title: 'Forbidden Scholar',
    description: 'Discovered the hidden secret poop and unlocked Mayk’s classified knowledge.',
    icon: '📜',
    unlocked: false,
  },
  {
    id: 'overdrive-master',
    title: 'Mao Mao Overdrive',
    description: 'Input the sacred Konami code to trigger maximum overdrive.',
    icon: '🐱',
    unlocked: false,
  },
  {
    id: 'poopstorm-survivor',
    title: 'Poopstorm Survivor',
    description: 'Unleashed the ultimate poopstorm in the dramatic finale.',
    icon: '🌪️',
    unlocked: false,
  },
];

export const App: React.FC = () => {
  useScrollReveal();

  const [soundOn, setSoundOn] = useState(false);
  const [particlesOn, setParticlesOn] = useState(true);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [secretModalOpen, setSecretModalOpen] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [toast, setToast] = useState<string | null>(null);

  // Load unlocked achievements from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shezpoop_achievements');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        setAchievements(prev =>
          prev.map(a => (ids.includes(a.id) ? { ...a, unlocked: true } : a))
        );
      }
    } catch {
      // ignore
    }
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const target = prev.find(a => a.id === id);
      if (target && !target.unlocked) {
        // Trigger Toast & Sound
        playGoldenChime();
        setToast(`🏆 BADGE UNLOCKED: ${target.title}!`);
        setTimeout(() => setToast(null), 4000);

        const updated = prev.map(a => (a.id === id ? { ...a, unlocked: true } : a));
        try {
          const unlockedIds = updated.filter(a => a.unlocked).map(a => a.id);
          localStorage.setItem('shezpoop_achievements', JSON.stringify(unlockedIds));
        } catch {
          // ignore
        }
        return updated;
      }
      return prev;
    });
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Accessibility Skip Link */}
      <a href="#who" className="skip-link">
        Skip to main content
      </a>

      {/* Ambient & FX */}
      <ScrollProgressBar />
      <FallingPoops enabled={particlesOn} />
      <CursorTrail enabled={particlesOn} />
      <RandomEvents />
      <KonamiOverlay onUnlockKonami={() => unlockAchievement('overdrive-master')} />

      {/* Navigation */}
      <Navbar
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        particlesOn={particlesOn}
        setParticlesOn={setParticlesOn}
        unlockedCount={unlockedCount}
        totalAchievements={achievements.length}
        openAchievements={() => setAchievementsOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          onEnterPoopverse={() => unlockAchievement('first-flush')}
          onSecretPoopClick={() => {
            setSecretModalOpen(true);
            unlockAchievement('forbidden-scholar');
          }}
        />

        <WhoIsSection />

        <TimelineSection />

        <PowersSection
          onPowerClick={() => unlockAchievement('power-inspector')}
        />

        <GallerySection
          onOpenLightbox={() => unlockAchievement('evidence-analyst')}
        />

        <MiniGame
          onUnlockGoldenAchievement={() => unlockAchievement('golden-alchemist')}
          onUnlockScoreAchievement={() => unlockAchievement('game-champion')}
        />

        <StatsSection
          onUnlockDossier={() => unlockAchievement('dossier-breaker')}
        />

        <PoopolutionSection
          onUnleashPoopstorm={() => unlockAchievement('poopstorm-survivor')}
        />
      </main>

      {/* Floating Helpers */}
      <BackToTop />

      {/* Modals & Drawers */}
      <SecretModal
        isOpen={secretModalOpen}
        onClose={() => setSecretModalOpen(false)}
      />

      <AchievementsDrawer
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
        achievements={achievements}
      />

      {/* Achievement Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #2a1608, #1a0f08)',
            border: '2px solid var(--color-gold)',
            color: '#fff',
            padding: '14px 22px',
            borderRadius: '999px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.95rem',
            boxShadow: '0 10px 35px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'floatGentle 2.5s ease-in-out infinite',
            cursor: 'pointer',
          }}
          onClick={() => {
            playPop();
            setToast(null);
            setAchievementsOpen(true);
          }}
        >
          <span>{toast}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', marginLeft: '6px' }}>
            [View Badges]
          </span>
        </div>
      )}
    </div>
  );
};

export default App;

