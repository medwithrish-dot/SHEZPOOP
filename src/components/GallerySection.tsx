import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { X, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { playFart, playPop } from '../utils/sound';

interface GallerySectionProps {
  onOpenLightbox?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'item-1',
      title: 'Smug Before the Blaze',
      caption: 'Mayk observing the collapse of municipal sanitation standards with calm, unbothered poise.',
      category: 'PRIMARY IDENTIFICATION',
      imageSrc: '/images/shezpoop-hero.png',
      secretNote: 'Forensic analysts noted an 84% probability that Mayk started the blaze just to test the fire sprinklers.',
      date: 'Incident Ref: #001-MAYK',
    },
    {
      id: 'item-2',
      title: 'The Sacred Vow',
      caption: 'The historical chat timestamp where Shezpoop promised: "I\'ll acc make a website for ur poop".',
      category: 'HISTORIC EVIDENCE',
      imageSrc: '/images/mayk-origin.png',
      secretNote: 'The recipient assumed it was an empty bluff. The recipient was severely mistaken.',
      date: 'Timestamp: 11:37 PM',
    },
    {
      id: 'item-3',
      title: 'Poopboy in Full Regalia',
      caption: 'The supreme ruler @Xizaterasu, master of chicken wings, hot dogs, baloney, and macaroni.',
      category: 'THE EMPEROR',
      imageSrc: '/images/poopboy-and-shezpoop.png',
      secretNote: '105 Friends, 14 Followers, 100% pure unfiltered Roblox royalty.',
      date: 'Roblox Archives',
    },
    {
      id: 'item-4',
      title: 'The Consumption Decree',
      caption: 'The moment Shezpoop agreed to consume poop and assumed her title as the Right-Hand Mao Mao Man.',
      category: 'ROYAL DECREE',
      imageSrc: '/images/the-sacred-pact.png',
      secretNote: 'Red circle added by the National Council for Bathroom Safety for emphasis.',
      date: 'Discord Protocol 404',
    },
    {
      id: 'item-5',
      title: 'Supreme Combat Stance',
      caption: 'The physical embodiment of Mao Mao energy. Throwing hands at all opponents of the poopverse.',
      category: 'MARTIAL ARTS',
      imageSrc: '/images/mao-mao-stance.png',
      secretNote: 'Opponents report hearing tiny meows right before complete defeat.',
      date: 'Dojo of the Ceramic',
    },
  ];

  const handleOpenItem = (item: GalleryItem) => {
    playPop();
    setSelectedItem(item);
    if (onOpenLightbox) onOpenLightbox();
  };

  return (
    <section id="gallery" className="section-wrap" style={{ position: 'relative', background: 'rgba(20, 10, 5, 0.5)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal-up">
          <span className="section-tag">
            <Eye size={14} />
            PHOTOGRAPHIC EVIDENCE
          </span>
          <h2 className="section-title">THE SHEZPOOP PHOTO GALLERY</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Declassified archival photographs recovered from burned group chats, Roblox servers, and underground pipes. Click any image to examine full forensics.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="glass-card reveal-up stagger-child"
              style={{
                padding: '0',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => handleOpenItem(item)}
            >
              {/* Image Container with zoom on hover */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  overflow: 'hidden',
                  background: '#0d0704',
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(18, 11, 6, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--color-lime)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                  }}
                >
                  {item.category}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  <ZoomIn size={16} />
                </div>
              </div>

              {/* Caption Content */}
              <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: '#fff',
                      marginBottom: '6px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-cream-soft)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {item.caption}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span>{item.date}</span>
                  <span style={{ color: 'var(--color-cream-muted)' }}>Click to inspect 🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9995,
            background: 'rgba(8, 4, 2, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => {
            playPop();
            setSelectedItem(null);
          }}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(35, 18, 9, 0.98), rgba(18, 10, 5, 0.99))',
              border: '2px solid var(--color-lime)',
              boxShadow: '0 0 60px rgba(57, 255, 20, 0.3)',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => {
                playPop();
                setSelectedItem(null);
              }}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div
              style={{
                width: '100%',
                maxHeight: '380px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#090503',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={selectedItem.imageSrc}
                alt={selectedItem.title}
                style={{
                  maxHeight: '380px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Exhibit info */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-lime)', letterSpacing: '0.1em' }}>
                {selectedItem.category} // {selectedItem.date}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.6rem',
                color: '#fff',
                marginBottom: '0.75rem',
              }}
            >
              {selectedItem.title}
            </h3>

            <p style={{ color: 'var(--color-cream-soft)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {selectedItem.caption}
            </p>

            {/* Secret Forensics Box */}
            <div
              style={{
                background: 'rgba(255, 215, 0, 0.08)',
                borderLeft: '4px solid var(--color-gold)',
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '4px' }}>
                <Sparkles size={16} /> FORENSIC FOOTNOTE:
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-cream)' }}>
                {selectedItem.secretNote}
              </p>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                playFart();
                setSelectedItem(null);
              }}
            >
              CONFIRM EVIDENCE & DISMISS 💩
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

