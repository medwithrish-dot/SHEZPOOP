import confetti from 'canvas-confetti';
import { playFart, playGoldenChime, playOverdrive } from './sound';

// Poop shower / explosion
export const triggerPoopBurst = (originX = 0.5, originY = 0.5) => {
  playFart();
  // Standard colorful confetti burst
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { x: originX, y: originY },
    colors: ['#8B4513', '#D2691E', '#39FF14', '#FFD700', '#FF69B4', '#FFF8F0']
  });

  // Custom shaped / text confetti
  const scalar = 2.5;
  const poopEmoji = confetti.shapeFromText({ text: '💩', scalar });
  const toiletPaper = confetti.shapeFromText({ text: '🧻', scalar });
  const sparkles = confetti.shapeFromText({ text: '✨', scalar });
  const crown = confetti.shapeFromText({ text: '👑', scalar });

  confetti({
    shapes: [poopEmoji, toiletPaper, sparkles, crown],
    particleCount: 30,
    scalar,
    spread: 90,
    origin: { x: originX, y: originY },
    ticks: 150,
  });
};

// Golden Poop celebration explosion
export const triggerGoldenCelebration = (originX = 0.5, originY = 0.5) => {
  playGoldenChime();
  const scalar = 2.8;
  const goldenPoop = confetti.shapeFromText({ text: '💩', scalar });
  const star = confetti.shapeFromText({ text: '⭐', scalar });
  const sparkle = confetti.shapeFromText({ text: '✨', scalar });

  confetti({
    shapes: [goldenPoop, star, sparkle],
    particleCount: 45,
    scalar,
    spread: 120,
    origin: { x: originX, y: originY },
    colors: ['#FFD700', '#FFA500', '#FFF8F0'],
    ticks: 200,
  });
};

// Ultimate Poopstorm (multi-stage storm)
export const triggerPoopstorm = () => {
  playOverdrive();
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 20;
    const poopEmoji = confetti.shapeFromText({ text: '💩', scalar: 2.2 });
    const drumstick = confetti.shapeFromText({ text: '🍗', scalar: 2 });
    const cat = confetti.shapeFromText({ text: '🐱', scalar: 2 });

    confetti({
      shapes: [poopEmoji, drumstick, cat],
      particleCount,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
      spread: 360,
      ticks: 120,
      gravity: 0.8,
      scalar: 2.2,
      colors: ['#5C3317', '#8B4513', '#39FF14', '#FFD700', '#FF1493']
    });
  }, 250);
};

// Shake screen effect
export const shakeScreen = (intensity = 'medium') => {
  const root = document.getElementById('root');
  if (!root) return;
  const className = intensity === 'heavy' ? 'shake-screen-heavy' : 'shake-screen';
  root.classList.remove('shake-screen', 'shake-screen-heavy');
  // force reflow
  void root.offsetWidth;
  root.classList.add(className);
  setTimeout(() => {
    root.classList.remove(className);
  }, 600);
};

