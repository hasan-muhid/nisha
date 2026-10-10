import React, { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

interface FallingPetal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface TapParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [petals, setPetals] = useState<FallingPetal[]>([]);
  const [tapParticles, setTapParticles] = useState<TapParticle[]>([]);

  useEffect(() => {
    const symbols = ['💖', '💕', '🌸', '✨', '💗', '🤍', '🌹'];
    const generatedHearts: FloatingHeart[] = [];
    for (let i = 0; i < 20; i++) {
      generatedHearts.push({
        id: i,
        left: Math.random() * 96,
        size: Math.floor(Math.random() * 16) + 14,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.45 + 0.25,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      });
    }
    setHearts(generatedHearts);

    const generatedPetals: FallingPetal[] = [];
    for (let i = 0; i < 16; i++) {
      generatedPetals.push({
        id: i,
        left: Math.random() * 96,
        size: Math.floor(Math.random() * 14) + 12,
        duration: Math.random() * 7 + 7,
        delay: Math.random() * 10,
      });
    }
    setPetals(generatedPetals);

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (clientX === 0 && clientY === 0) return;

      const newParticle: TapParticle = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        symbol: ['💖', '✨', '🌸', '💕', '🌹'][Math.floor(Math.random() * 5)],
      };

      setTapParticles((prev) => [...prev.slice(-12), newParticle]);

      setTimeout(() => {
        setTapParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 900);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient orb glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-pink-200/35 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />

      {/* Falling Rose Petals */}
      {petals.map((petal) => (
        <span
          key={`petal-${petal.id}`}
          className="falling-petal select-none"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          🌸
        </span>
      ))}

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <span
          key={`heart-${heart.id}`}
          className="floating-heart select-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.symbol}
        </span>
      ))}

      {/* Tap particles */}
      {tapParticles.map((particle) => (
        <span
          key={particle.id}
          className="absolute select-none pointer-events-none animate-ping text-xl"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {particle.symbol}
        </span>
      ))}
    </div>
  );
};
