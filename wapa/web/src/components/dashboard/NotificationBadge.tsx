import { motion, AnimatePresence } from 'framer-motion';

interface NotificationBadgeProps {
  count: number;
  variant?: 'green' | 'red';
  className?: string;
}

export function NotificationBadge({ count, variant = 'green', className = '' }: NotificationBadgeProps) {
  const bg = variant === 'green' ? 'bg-[var(--wapa-green-500)]' : 'bg-[var(--color-danger)]';

  return (
    <AnimatePresence mode="wait">
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className={`absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white leading-none ${bg} ${className}`}
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

NotificationBadge.displayName = 'NotificationBadge';
export default NotificationBadge;
