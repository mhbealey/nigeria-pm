import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

function getColor(percent: number): string {
  if (percent < 25) return 'var(--color-danger)';
  if (percent < 50) return 'var(--color-warning)';
  return 'var(--wapa-green-500)';
}

export function ProgressRing({
  percent,
  size = 120,
  strokeWidth = 4,
  showLabel = true,
  className = '',
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getColor(clamped);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--slate-200)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: mounted ? dashOffset : circumference }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-semibold font-[var(--font-display)]"
            style={{
              fontSize: size * 0.22,
              color,
            }}
          >
            {Math.round(clamped)}%
          </span>
        </div>
      )}
    </div>
  );
}

ProgressRing.displayName = 'ProgressRing';
export default ProgressRing;
