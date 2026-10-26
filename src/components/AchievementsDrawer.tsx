import React from 'react';
import { X, Trophy, CheckCircle2, Circle } from 'lucide-react';
import { Achievement } from '../types';
import { playPop } from '../utils/sound';

interface AchievementsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsDrawer: React.FC<AchievementsDrawerProps> = ({
  isOpen,
  onClose,
  achievements,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9950,
        background: 'rgba(10, 6, 3, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={() => {
        playPop();
        onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid rgba(57, 255, 20, 0.25)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy style={{ color: 'var(--color-gold)' }} size={24} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.25rem', color: '#fff' }}>
                HALL OF BADGES
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)' }}>
                {unlockedCount} of {achievements.length} Unlocked
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', overflow: 'hidden', marginBottom: '2rem' }}>
          <div
            style={{
              height: '100%',
              width: `${(unlockedCount / achievements.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-lime))',
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {achievements.map(ach => (
            <div
              key={ach.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px',
                borderRadius: '16px',
                background: ach.unlocked ? 'rgba(57, 255, 20, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                border: ach.unlocked ? '1px solid rgba(57, 255, 20, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                opacity: ach.unlocked ? 1 : 0.65,
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  fontSize: '1.8rem',
                  filter: ach.unlocked ? 'none' : 'grayscale(1)',
                }}
              >
                {ach.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: ach.unlocked ? 'var(--color-cream)' : 'var(--color-cream-muted)',
                    }}
                  >
                    {ach.title}
                  </h4>
                  {ach.unlocked ? (
                    <CheckCircle2 size={16} style={{ color: 'var(--color-lime)' }} />
                  ) : (
                    <Circle size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  )}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-cream-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

