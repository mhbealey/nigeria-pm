import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
}

const COLORS = [
  '#25d366', '#00a884', '#128c7e', '#FFD700', '#FFA500',
  '#008069', '#34D399', '#FBBF24', '#10B981', '#F59E0B',
  '#059669', '#D97706', '#047857', '#B45309', '#065F46', '#92400E',
];

interface Particle {
  id: number;
  color: string;
  x: number;
  delay: number;
  rotation: number;
  size: number;
}

const Confetti: React.FC<ConfettiProps> = ({ show }) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      x: Math.random() * 100,
      delay: Math.random() * 0.3,
      rotation: Math.random() * 720 - 360,
      size: 6 + Math.random() * 6,
    }));
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
          <style>{`
            @keyframes confetti-fall {
              0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
              }
              20% {
                transform: translateY(-120px) rotate(180deg) scale(1);
                opacity: 1;
              }
              100% {
                transform: translateY(100vh) rotate(720deg) scale(0.3);
                opacity: 0;
              }
            }
          `}</style>
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: '50%',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.id % 3 === 0 ? '50%' : p.id % 3 === 1 ? '2px' : '0',
                animation: `confetti-fall 1.5s ease-out ${p.delay}s forwards`,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Confetti;
