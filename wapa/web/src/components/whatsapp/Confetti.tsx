import React, { useEffect, useMemo, useState } from 'react';

interface ConfettiProps {
  show: boolean;
}

const COLORS = ['#10b857', '#fbbf24', '#00a884', '#ffffff'];

interface Particle {
  id: number;
  color: string;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  rotation: number;
  size: number;
  delay: number;
  shape: 'circle' | 'square';
}

const Confetti: React.FC<ConfettiProps> = ({ show }) => {
  const [visible, setVisible] = useState(false);

  const particles = useMemo<Particle[]>(() => {
    const count = 16 + Math.floor(Math.random() * 9); // 16-24
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      startX: 50, // center
      startY: 50, // center
      dx: (Math.random() - 0.5) * 200, // spread horizontally
      dy: -(Math.random() * 120 + 40), // burst upward
      rotation: Math.random() * 720 - 360,
      size: 5 + Math.random() * 5,
      delay: Math.random() * 0.3,
      shape: i % 2 === 0 ? 'circle' : 'square',
    }));
  }, []);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  if (!visible) return null;

  // Generate unique keyframes per particle
  const keyframes = particles
    .map(
      (p) => `
    @keyframes confetti-${p.id} {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 1;
      }
      15% {
        transform: translate(${p.dx * 0.4}px, ${p.dy}px) rotate(${p.rotation * 0.3}deg) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(${p.dx}px, ${p.dy + 300}px) rotate(${p.rotation}deg) scale(0.2);
        opacity: 0;
      }
    }
  `
    )
    .join('\n');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      <style>{keyframes}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '1px',
            animation: `confetti-${p.id} 2s ease-out ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
