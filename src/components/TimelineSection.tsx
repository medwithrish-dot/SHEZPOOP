import React, { useState } from 'react';
import { TimelineEvent } from '../types';
import { playFart, playPop } from '../utils/sound';

export const TimelineSection: React.FC = () => {
  const [activeJoke, setActiveJoke] = useState<string | null>(null);

  const events: TimelineEvent[] = [
    {
      id: 'birth',
      date: '420 BC (Before Commode)',
      title: 'The Birth of Mayk',
      description: 'Mayk enters our mortal plane without remorse, clean towels, or respect for modern drainage engineering. Within 48 hours, local septic systems detect an unprecedented disturbance in the force.',
      joke: '💡 Fun Fact: Her first recorded word was not "mama", it was a loud squelching sound.',
      badge: 'ORIGIN PROTOCOL',
      icon: '👶',
    },
    {
      id: 'incident',
      date: 'Year of the Clogged Drain',
      title: 'The First Suspicious Incident',
      description: 'A municipal disaster strikes downtown. Investigators find 42 rolls of 3-ply tissue, a smug grin, and a handwritten note signed "M". The town council refuses to comment and orders 80 industrial plungers.',
      joke: '💡 Fun Fact: The plumbers were given witness protection.',
      badge: 'CRITICAL EVENT',
      icon: '🪠',
    },
    {
      id: 'awakening',
      date: 'Era of the Chat Prophecy',
      title: 'The Great Poop Awakening',
      description: 'A fateful dare echoes across the digital void: "How about u code this poop." Without hesitating, Mayk speaks the legendary words that would alter history: "I\'ll acc make a website for ur poop."',
      joke: '💡 Fun Fact: Frontend developers everywhere trembled at the impending commit.',
      badge: 'PROPHECY FULFILLED',
      image: '/images/mayk-origin.png',
      icon: '💻',
    },
    {
      id: 'meeting',
      date: 'The Robloxian Summit',
      title: 'The Meeting with Poopboy',
      description: 'Mayk crosses paths with the supreme lord of Roblox, Poopboy (@Xizaterasu) — creator of the sacred hymn "chicken wing chicken wing hot dog and baloney". A shared love of culinary disaster binds them.',
      joke: '💡 Fun Fact: Poopboy approved Mayk after she recited the entire chicken wing chant backwards.',
      badge: 'SUPREME ALLIANCE',
      image: '/images/poopboy-and-shezpoop.png',
      icon: '🍗',
    },
    {
      id: 'appointment',
      date: 'The Mao Mao Consecration',
      title: 'Appointment as Right-Hand Mao Mao Man',
      description: 'The sacred covenant is sealed. Poopboy orders: "EAT MY POOP MAO MAO." Shezpoop sighs deeply: "gash darn it.. f-f-fine I guess I\'ll consume poop." The title is bestowed forever.',
      joke: '💡 Fun Fact: "Mao Mao Man" is an ancient honorary martial rank reserved for boxing kittens and anime pharmacists.',
      badge: 'OFFICIAL CORONATION',
      image: '/images/the-sacred-pact.png',
      icon: '📜',
    },
    {
      id: 'present',
      date: 'Present Day (Forever Flushed)',
      title: 'The Beginning of the Shezpoop Era',
      description: 'Shezpoop commands the empire with iron fists and soft toilet paper. Her powers are officially cataloged at 999%. The internet will never be the same again.',
      joke: '💡 Fun Fact: If you stare at the toilet long enough, Shezpoop stares back.',
      badge: 'CURRENT STATUS',
      image: '/images/mao-mao-stance.png',
      icon: '👑',
    },
  ];

  return (
    <section id="timeline" className="section-wrap" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal-up">
          <span className="section-tag">
            <span>📜</span>
            CHRONICLES OF ABSURDITY
          </span>
          <h2 className="section-title">THE RISE OF MAYK</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A rigorous historical timeline verified by absolutely no accredited academic institution. Click entries to uncover hidden historical trivia.
          </p>
        </div>

        {/* Timeline container */}
        <div
          style={{
            position: 'relative',
            maxWidth: '850px',
            margin: '0 auto',
            padding: '2rem 0',
          }}
        >
          {/* Central Vertical Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '32px',
              width: '4px',
              background: 'linear-gradient(180deg, var(--color-lime), var(--color-gold), var(--color-pink), var(--color-chocolate-light))',
              borderRadius: '999px',
              boxShadow: '0 0 15px rgba(57, 255, 20, 0.4)',
            }}
          />

          {/* Events List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {events.map((ev) => (
              <div
                key={ev.id}
                className="reveal-up stagger-child"
                style={{
                  position: 'relative',
                  paddingLeft: '72px',
                }}
              >
                {/* Node icon */}
                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '16px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: '3px solid var(--color-lime)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                  className="wiggle-hover"
                  onClick={() => {
                    playFart();
                    setActiveJoke(activeJoke === ev.id ? null : ev.id);
                  }}
                >
                  {ev.icon}
                </div>

                {/* Event Card */}
                <div
                  className="glass-card"
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease, border-color 0.25s ease',
                  }}
                  onClick={() => {
                    playPop();
                    setActiveJoke(activeJoke === ev.id ? null : ev.id);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        color: 'var(--color-gold)',
                        letterSpacing: '0.08em',
                        background: 'rgba(255, 215, 0, 0.1)',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                      }}
                    >
                      {ev.date}
                    </span>

                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        color: 'var(--color-lime)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {ev.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
                      fontWeight: 900,
                      color: '#fff',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {ev.title}
                  </h3>

                  <p style={{ color: 'var(--color-cream-soft)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {ev.description}
                  </p>

                  {/* Optional Historic Evidence Image snippet */}
                  {ev.image && (
                    <div
                      style={{
                        margin: '1rem 0',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        maxHeight: '190px',
                        background: '#0e0804',
                      }}
                    >
                      <img
                        src={ev.image}
                        alt={ev.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}

                  {/* Micro Joke Reveal */}
                  <div
                    style={{
                      background: 'rgba(57, 255, 20, 0.08)',
                      border: '1px dashed rgba(57, 255, 20, 0.35)',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      color: 'var(--color-lime)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.75rem',
                    }}
                  >
                    <span>{activeJoke === ev.id ? ev.joke : '🔍 Click card to reveal secret footnote'}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{activeJoke === ev.id ? '▲ Hide' : '▼ View'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

