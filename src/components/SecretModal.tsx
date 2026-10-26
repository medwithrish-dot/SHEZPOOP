import React from 'react';
import { X, Lock, ShieldAlert } from 'lucide-react';
import { playFart, playPop } from '../utils/sound';

interface SecretModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretModal: React.FC<SecretModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        background: 'rgba(10, 6, 3, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={() => {
        playPop();
        onClose();
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '650px',
          width: '100%',
          border: '2px solid var(--color-gold)',
          boxShadow: '0 0 50px rgba(255, 215, 0, 0.3)',
          background: 'linear-gradient(145deg, rgba(42, 22, 8, 0.95), rgba(18, 11, 6, 0.98))',
          padding: '2.5rem',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          <ShieldAlert size={24} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.85rem' }}>
            TOP SECRET CLEARANCE LEVEL 999
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            color: 'var(--color-gold)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          YOU HAVE DISCOVERED MAYK'S FORBIDDEN KNOWLEDGE.
        </h3>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderLeft: '4px solid var(--color-lime)',
            padding: '1rem 1.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            color: 'var(--color-cream-soft)',
            lineHeight: 1.6,
          }}
        >
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>CLASSIFIED TRANSCRIPT EXCERPT:</strong>
          </p>
          <p style={{ fontStyle: 'italic', color: 'var(--color-cream)' }}>
            "How about u code this poop"<br />
            <strong>Shezpoop:</strong> "I'll acc make a website for ur poop"
          </p>
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-lime)' }}>
            Status: Prophecy Fulfilled. Mayk actually built it.
          </p>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--color-cream-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
          Ancient scrolls recovered from the high council confirm that Mayk never intended to be an ordinary citizen. When Poopboy demanded loyalty, Shezpoop responded with unprecedented frontend development prowess. You are now sworn to porcelain secrecy.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            onClick={() => {
              playFart();
              onClose();
            }}
          >
            I SWEAR TO REMAIN SILENT 💩
          </button>
        </div>
      </div>
    </div>
  );
};

