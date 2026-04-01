import { motion } from 'framer-motion';
import { Avatar } from '../shared/Avatar';

interface ActivityItemData {
  id: string;
  user: string;
  userAvatar?: string;
  verb: string;
  target: string;
  timestamp: string;
  isNew?: boolean;
}

interface ActivityItemProps {
  activity: ActivityItemData;
  className?: string;
}

export function ActivityItem({ activity, className = '' }: ActivityItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-2.5 py-2.5 relative ${className}`}
    >
      {/* New indicator */}
      {activity.isNew && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[var(--wapa-green-500)]"
        />
      )}

      <Avatar name={activity.user} src={activity.userAvatar} size="xs" />

      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text-secondary)] leading-snug">
          <span className="font-medium text-[var(--text-primary)]">{activity.user}</span>{' '}
          <span className="font-semibold">{activity.verb}</span>{' '}
          <span className="italic text-[var(--text-primary)]">{activity.target}</span>
        </p>
        <span className="text-[11px] text-[var(--text-tertiary)] mt-0.5 block">{activity.timestamp}</span>
      </div>
    </motion.div>
  );
}

ActivityItem.displayName = 'ActivityItem';
export default ActivityItem;
