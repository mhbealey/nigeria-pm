import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: { value: number; direction: 'up' | 'down' };
  icon?: React.ReactNode;
  className?: string;
}

function useCountUp(target: number, duration = 1200): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return count;
}

export function StatCard({ label, value, suffix = '', prefix = '', trend, icon, className = '' }: StatCardProps) {
  const animatedValue = useCountUp(value);

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
      transition={{ duration: 0.2 }}
      className={`bg-[var(--surface-primary)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] p-5 flex flex-col gap-3 cursor-default ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)] font-medium font-[var(--font-body)]">
          {label}
        </span>
        {icon && (
          <span className="text-[var(--text-tertiary)]">{icon}</span>
        )}
      </div>

      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-[var(--text-primary)] font-[var(--font-display)] tabular-nums leading-none">
          {prefix}{animatedValue}{suffix}
        </span>

        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium mb-1 ${
              trend.direction === 'up' ? 'text-[var(--wapa-green-600)]' : 'text-[var(--color-danger)]'
            }`}
          >
            {trend.direction === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {trend.value}%
          </span>
        )}
      </div>
    </motion.div>
  );
}

StatCard.displayName = 'StatCard';
export default StatCard;
