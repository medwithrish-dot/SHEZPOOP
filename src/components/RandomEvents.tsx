import React, { useEffect, useState } from 'react';
import { playFart, playPop } from '../utils/sound';

interface RandomEventsProps {
  onDiscoverSecret?: () => void;
}

export const RandomEvents: React.FC<RandomEventsProps> = () => {
  const [showRunner, setShowRunner] = useState(false);
  const [runnerQuote, setRunnerQuote] = useState('MAYK WAS HERE');
  const [bannerText, setBannerText] = useState<string | null>(null);

  useEffect(() => {
    // Runner micro-event every 25-45 seconds
    const runnerInterval = setInterval(() => {
      const quotes = [
        '🏃‍♂️💨 MAYK WAS HERE!',
        '💩 EVACUATE THE BOWL!',
        '🍗 DID SOMEONE SAY CHICKEN WING?',
        '👑 POOPBOY SENDS HIS REGARDS',
        '⚡ MAO MAO ENERGY ACTIVATED'
      ];
      setRunnerQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setShowRunner(true);

      setTimeout(() => {
        setShowRunner(false);
      }, 14000);
    }, 32000);

    // Occasional subtle alert message
    const bannerInterval = setInterval(() => {
      const banners = [
        '👁️ POOPBOY IS WATCHING FROM ROBLOX',
        '📢 PUBLIC HEALTH ADVISORY: Shezpoop spotted near local plumbing',
        '⚠️ THE COUNCIL HAS REFUSED TO COMMENT',
        '📜 REMINDER: Mayk brings her own toilet paper'
      ];
      setBannerText(banners[Math.floor(Math.random() * banners.length)]);

      setTimeout(() => {
        setBannerText(null);
      }, 4500);
    }, 45000);

    return () => {
      clearInterval(runnerInterval);
      clearInterval(bannerInterval);
    };
  }, []);

  return (
    <>
      {/* Tiny Runner */}
      {showRunner && (
        <div
          className="tiny-runner"
          onClick={() => {
            playFart();
            alert(`💬 Shezpoop whispers: "You caught me! Never tell Poopboy."`);
          }}
          title="Click the runner!"
        >
          <span style={{ display: 'inline-block' }}>💩</span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              background: 'var(--color-lime)',
              color: 'var(--color-charcoal)',
              padding: '2px 8px',
              borderRadius: '999px',
              marginLeft: '6px',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {runnerQuote}
          </span>
        </div>
      )}

      {/* Ephemeral Stealth Banner */}
      {bannerText && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '24px',
            zIndex: 850,
            background: 'rgba(26, 15, 8, 0.95)',
            border: '1px solid var(--color-gold)',
            color: 'var(--color-cream)',
            padding: '10px 18px',
            borderRadius: '999px',
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 800,
            boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 15px rgba(255,215,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'floatGentle 3s ease-in-out infinite',
            cursor: 'pointer',
          }}
          onClick={() => {
            playPop();
            setBannerText(null);
          }}
        >
          <span>{bannerText}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>✕</span>
        </div>
      )}
    </>
  );
};

