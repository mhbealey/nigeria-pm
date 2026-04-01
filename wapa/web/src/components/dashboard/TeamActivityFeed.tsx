import { motion, AnimatePresence } from 'framer-motion';
import { ActivityItem } from './ActivityItem';

interface ActivityData {
  id: string;
  user: string;
  userAvatar?: string;
  verb: string;
  target: string;
  timestamp: string;
  isNew?: boolean;
}

interface TeamActivityFeedProps {
  activities: ActivityData[];
  maxHeight?: number;
  onViewAll?: () => void;
  className?: string;
}

export function TeamActivityFeed({
  activities,
  maxHeight = 400,
  onViewAll,
  className = '',
}: TeamActivityFeedProps) {
  return (
    <div className={`bg-[var(--surface-primary)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--slate-200)]">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] font-[var(--font-display)]">
          Team Activity
        </h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-medium text-[var(--wapa-green-600)] hover:text-[var(--wapa-green-700)] transition-colors outline-none focus-visible:underline"
          >
            View all
          </button>
        )}
      </div>

      {/* Feed */}
      <div className="relative">
        <div
          className="px-5 divide-y divide-[var(--slate-100)] overflow-y-auto"
          style={{ maxHeight }}
        >
          <AnimatePresence initial={false}>
            {activities.map((a) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ActivityItem activity={a} />
              </motion.div>
            ))}
          </AnimatePresence>

          {activities.length === 0 && (
            <p className="text-sm text-[var(--text-tertiary)] text-center py-8">No recent activity</p>
          )}
        </div>

        {/* Fade gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--surface-primary)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

TeamActivityFeed.displayName = 'TeamActivityFeed';
export default TeamActivityFeed;
