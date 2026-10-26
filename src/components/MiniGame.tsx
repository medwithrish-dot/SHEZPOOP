import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, Timer, Award } from 'lucide-react';
import { playPlop, playGoldenChime, playHurt, playPop } from '../utils/sound';
import { triggerGoldenCelebration, shakeScreen } from '../utils/confetti';

interface MiniGameProps {
  onUnlockGoldenAchievement?: () => void;
  onUnlockScoreAchievement?: () => void;
}

interface DropItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'normal' | 'golden' | 'danger';
  size: number;
  rotation: number;
  rotSpeed: number;
}

interface ScorePopup {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

export const MiniGame: React.FC<MiniGameProps> = ({
  onUnlockGoldenAchievement,
  onUnlockScoreAchievement,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);
  const [goldenCaught, setGoldenCaught] = useState(0);
  const [gameOverMsg, setGameOverMsg] = useState('');

  // Refs for animation loop state to avoid re-renders during loop
  const stateRef = useRef({
    score: 0,
    timeLeft: 30,
    gameState: 'idle' as 'idle' | 'playing' | 'paused' | 'over',
    playerX: 0, // centered on canvas init
    playerWidth: 70,
    playerHeight: 50,
    keys: { left: false, right: false },
    items: [] as DropItem[],
    popups: [] as ScorePopup[],
    lastSpawn: 0,
    goldenCount: 0,
    speedMultiplier: 1,
  });

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('shezpoop_best_score');
    if (saved) {
      setHighScore(parseInt(saved, 10) || 0);
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        stateRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        stateRef.current.keys.right = true;
      }
      if (e.key === ' ' && gameState === 'playing') {
        e.preventDefault();
        // pause toggle
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        stateRef.current.keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        stateRef.current.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Handle touch / drag / mouse move on canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (stateRef.current.gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = (e.clientX - rect.left) * scaleX;
    stateRef.current.playerX = Math.max(30, Math.min(canvas.width - 30, clientX));
  };

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 600;
    stateRef.current = {
      score: 0,
      timeLeft: 30,
      gameState: 'playing',
      playerX: width / 2,
      playerWidth: 70,
      playerHeight: 50,
      keys: { left: false, right: false },
      items: [],
      popups: [],
      lastSpawn: Date.now(),
      goldenCount: 0,
      speedMultiplier: 1,
    };
    setScore(0);
    setTimeLeft(30);
    setGoldenCaught(0);
    setGameState('playing');
    playPop();
  }, []);

  const pauseGame = () => {
    playPop();
    if (gameState === 'playing') {
      stateRef.current.gameState = 'paused';
      setGameState('paused');
    } else if (gameState === 'paused') {
      stateRef.current.gameState = 'playing';
      setGameState('playing');
    }
  };

  // 1-second countdown interval
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      stateRef.current.timeLeft -= 1;
      const currentRemaining = stateRef.current.timeLeft;
      setTimeLeft(currentRemaining);

      // Increase speed gradually every 6 seconds
      if (currentRemaining % 6 === 0) {
        stateRef.current.speedMultiplier += 0.25;
      }

      if (currentRemaining <= 0) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const endGame = () => {
    const finalScore = stateRef.current.score;
    stateRef.current.gameState = 'over';
    setGameState('over');

    // Update high score
    const best = Math.max(finalScore, highScore);
    setHighScore(best);
    localStorage.setItem('shezpoop_best_score', best.toString());

    // Funny messages
    const msgs = [
      'POOPBOY WOULD BE PROUD.',
      'MAYK HAS SEEN BETTER DAYS.',
      'YOU HAVE MASTERED THE BROWN ARTS.',
      'SHEZPOOP QUESTIONS YOUR ABILITIES.',
      'MUNICIPAL SEWER SYSTEMS BOW BEFORE YOU.',
      'AN EXCELLENT DISPLAY OF MAO MAO AGILITY.'
    ];
    let selectedMsg = msgs[Math.floor(Math.random() * msgs.length)];
    if (finalScore >= 200) {
      selectedMsg = '🌟 POOPBOY PERSONALLY ENDORSES YOUR TOILET AGILITY!';
      if (onUnlockScoreAchievement) onUnlockScoreAchievement();
    }
    setGameOverMsg(selectedMsg);
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const loop = () => {
      const state = stateRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Render subtle background grid / stars
      ctx.fillStyle = '#180e07';
      ctx.fillRect(0, 0, width, height);

      // Background decorative lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      if (state.gameState === 'playing') {
        // 1. Move Player
        const moveSpeed = 8;
        if (state.keys.left) {
          state.playerX = Math.max(state.playerWidth / 2, state.playerX - moveSpeed);
        }
        if (state.keys.right) {
          state.playerX = Math.min(width - state.playerWidth / 2, state.playerX + moveSpeed);
        }

        // 2. Spawn Items
        const now = Date.now();
        const spawnInterval = Math.max(380, 750 - (30 - state.timeLeft) * 12);
        if (now - state.lastSpawn > spawnInterval) {
          state.lastSpawn = now;
          const rand = Math.random();
          let type: 'normal' | 'golden' | 'danger' = 'normal';
          if (rand < 0.18) {
            type = 'golden';
          } else if (rand < 0.42) {
            type = 'danger';
          }

          state.items.push({
            id: Math.random(),
            x: Math.random() * (width - 60) + 30,
            y: -20,
            speed: (Math.random() * 2 + 3) * state.speedMultiplier,
            type,
            size: type === 'golden' ? 36 : 30,
            rotation: 0,
            rotSpeed: (Math.random() - 0.5) * 0.08,
          });
        }

        // 3. Update & Check Collisions
        const playerY = height - 45;
        const catchRadius = state.playerWidth / 2 + 10;

        for (let i = state.items.length - 1; i >= 0; i--) {
          const item = state.items[i];
          item.y += item.speed;
          item.rotation += item.rotSpeed;

          // Check Catch Collision
          if (item.y >= playerY - 20 && item.y <= playerY + 30) {
            const dist = Math.abs(item.x - state.playerX);
            if (dist < catchRadius) {
              // CATCH!
              if (item.type === 'normal') {
                state.score += 10;
                playPlop();
                state.popups.push({
                  id: Math.random(),
                  x: item.x,
                  y: item.y - 10,
                  text: '+10',
                  color: 'var(--color-lime)',
                  life: 1,
                });
              } else if (item.type === 'golden') {
                state.score += 50;
                state.goldenCount += 1;
                setGoldenCaught(state.goldenCount);
                playGoldenChime();
                triggerGoldenCelebration(item.x / width, 0.7);
                state.popups.push({
                  id: Math.random(),
                  x: item.x,
                  y: item.y - 15,
                  text: '+50 GOLDEN!',
                  color: '#ffd700',
                  life: 1.2,
                });

                if (state.goldenCount >= 3 && onUnlockGoldenAchievement) {
                  onUnlockGoldenAchievement();
                }
              } else if (item.type === 'danger') {
                state.score = Math.max(0, state.score - 20);
                playHurt();
                shakeScreen('medium');
                state.popups.push({
                  id: Math.random(),
                  x: item.x,
                  y: item.y - 15,
                  text: '-20 OUCH!',
                  color: '#ff334b',
                  life: 1,
                });
              }

              setScore(state.score);
              state.items.splice(i, 1);
              continue;
            }
          }

          // Off-screen
          if (item.y > height + 40) {
            state.items.splice(i, 1);
          }
        }
      }

      // 4. Draw Falling Items
      for (const item of state.items) {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.font = `${item.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (item.type === 'golden') {
          ctx.shadowColor = '#ffd700';
          ctx.shadowBlur = 15;
          ctx.fillText('💩', 0, 0);
        } else if (item.type === 'danger') {
          ctx.shadowColor = '#ff334b';
          ctx.shadowBlur = 12;
          ctx.fillText('🌶️', 0, 0);
        } else {
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 6;
          ctx.fillText('💩', 0, 0);
        }
        ctx.restore();
      }

      // 5. Draw Player (Porcelain Toilet Commode)
      const px = state.playerX;
      const py = height - 40;
      ctx.save();
      ctx.translate(px, py);

      // Toilet bowl / basket emoji
      ctx.font = '54px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(57, 255, 20, 0.4)';
      ctx.shadowBlur = 18;
      ctx.fillText('🚽', 0, 0);

      // Cute pilot indicator
      ctx.font = '16px sans-serif';
      ctx.fillText('🐱', 0, -28);
      ctx.restore();

      // 6. Draw Score Popups
      for (let i = state.popups.length - 1; i >= 0; i--) {
        const pop = state.popups[i];
        pop.y -= 1.4;
        pop.life -= 0.02;

        ctx.save();
        ctx.globalAlpha = Math.max(0, pop.life);
        ctx.font = 'bold 18px "Space Grotesk", sans-serif';
        ctx.fillStyle = pop.color;
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();

        if (pop.life <= 0) {
          state.popups.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, onUnlockGoldenAchievement]);

  return (
    <section id="game" className="section-wrap" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="reveal-up">
          <span className="section-tag">
            <Award size={14} />
            INTERACTIVE TRAINING SIMULATOR
          </span>
          <h2 className="section-title">💩 CATCH THE GOLDEN POOP</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Prove your worthiness to Poopboy and Mayk. Catch normal and golden poops in your porcelain receptacle. Dodge spicy chilis!
          </p>
        </div>

        {/* Game Console Wrapper */}
        <div
          className="glass-card"
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '1.5rem',
            border: '2px solid rgba(57, 255, 20, 0.4)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(57, 255, 20, 0.15)',
            background: 'linear-gradient(180deg, #24140b 0%, #120b06 100%)',
          }}
        >
          {/* Top Scoreboard HUD */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              background: 'rgba(0, 0, 0, 0.55)',
              borderRadius: '16px',
              marginBottom: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>💩</span>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Score</div>
                <div style={{ fontFamily: 'var(--font-hero)', fontSize: '1.6rem', color: 'var(--color-lime)', lineHeight: 1 }}>{score}</div>
              </div>
            </div>

            {/* Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Timer size={20} style={{ color: timeLeft <= 5 ? '#ff334b' : 'var(--color-gold)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Time Left</div>
                <div style={{ fontFamily: 'var(--font-hero)', fontSize: '1.6rem', color: timeLeft <= 5 ? '#ff334b' : 'var(--color-gold)', lineHeight: 1 }}>
                  {timeLeft}s
                </div>
              </div>
            </div>

            {/* Golden count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Golden Caught</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-gold)', lineHeight: 1 }}>
                  {goldenCaught} / 3
                </div>
              </div>
            </div>

            {/* Best Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} style={{ color: 'var(--color-gold)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Best Score</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{highScore}</div>
              </div>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              lineHeight: 0,
            }}
          >
            <canvas
              ref={canvasRef}
              width={660}
              height={440}
              onPointerMove={handlePointerMove}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                cursor: gameState === 'playing' ? 'ew-resize' : 'default',
                touchAction: 'none',
              }}
            />

            {/* Start Overlay */}
            {gameState === 'idle' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(18, 11, 6, 0.88)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }} className="wiggle">
                  🚽
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
                  READY YOUR PORCELAIN
                </h3>
                <p style={{ color: 'var(--color-cream-soft)', fontSize: '0.95rem', maxWidth: '420px', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Catch 💩 (+10) and ✨ (+50). Avoid 🌶️ (-20). Use Left/Right keys or drag across screen.
                </p>
                <button className="btn-primary" onClick={startGame}>
                  <Play size={18} />
                  <span>START GAME</span>
                </button>
              </div>
            )}

            {/* Paused Overlay */}
            {gameState === 'paused' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(18, 11, 6, 0.85)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '2rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                  PAUSED
                </h3>
                <button className="btn-primary" onClick={pauseGame}>
                  <Play size={18} />
                  <span>RESUME TRAINING</span>
                </button>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState === 'over' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(18, 11, 6, 0.94)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                  👑
                </div>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '2rem', color: 'var(--color-lime)', marginBottom: '0.5rem' }}>
                  SESSION CONCLUDED
                </h3>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
                  FINAL SCORE: {score}
                </div>
                <p style={{ color: 'var(--color-cream-soft)', fontSize: '0.95rem', maxWidth: '460px', marginBottom: '1.75rem', fontStyle: 'italic' }}>
                  "{gameOverMsg}"
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button className="btn-primary" onClick={startGame}>
                    <RotateCcw size={18} />
                    <span>PLAY AGAIN</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Buttons / Controls Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1rem',
              gap: '10px',
            }}
          >
            {/* Mobile Left & Right touch buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onPointerDown={() => { stateRef.current.keys.left = true; }}
                onPointerUp={() => { stateRef.current.keys.left = false; }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  userSelect: 'none',
                  touchAction: 'manipulation',
                }}
              >
                ◀ LEFT
              </button>
              <button
                onPointerDown={() => { stateRef.current.keys.right = true; }}
                onPointerUp={() => { stateRef.current.keys.right = false; }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  userSelect: 'none',
                  touchAction: 'manipulation',
                }}
              >
                RIGHT ▶
              </button>
            </div>

            {/* Pause / Reset actions */}
            {gameState === 'playing' && (
              <button
                onClick={pauseGame}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--color-cream-soft)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <Pause size={16} />
                <span>Pause</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

