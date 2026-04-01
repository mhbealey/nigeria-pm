import { motion } from 'framer-motion';
import { Button } from '../shared/Button';

type EmptyContext = 'no_tasks' | 'no_projects' | 'no_team';

interface EmptyStateProps {
  context: EmptyContext;
  onAction?: () => void;
  className?: string;
}

const content: Record<EmptyContext, { title: string; description: string; cta: string }> = {
  no_tasks: {
    title: 'No tasks yet',
    description: 'Create your first task or ask WAPA on WhatsApp to add one. Your board is ready and waiting!',
    cta: 'Create a task',
  },
  no_projects: {
    title: 'No projects here',
    description: 'Start a new project and let WAPA help you plan sprints, track progress, and stay on top of things.',
    cta: 'New project',
  },
  no_team: {
    title: 'Your team awaits',
    description: 'Invite team members to collaborate. WAPA makes it easy to keep everyone in sync via WhatsApp.',
    cta: 'Invite members',
  },
};

function Illustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="mb-4">
      {/* Abstract shapes */}
      <motion.circle
        cx="80" cy="56" r="40"
        fill="var(--wapa-green-50)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.rect
        x="50" y="30" width="60" height="50" rx="12"
        fill="var(--wapa-green-100)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.circle
        cx="80" cy="55" r="16"
        fill="var(--wapa-green-500)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.35 }}
      />
      {/* Checkmark */}
      <motion.path
        d="M73 55 L78 60 L88 50"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
      {/* Decorative dots */}
      <motion.circle cx="35" cy="30" r="4" fill="var(--wapa-green-200)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
      <motion.circle cx="125" cy="70" r="3" fill="var(--wapa-green-300)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
      <motion.circle cx="130" cy="30" r="5" fill="var(--wapa-green-100)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} />
    </svg>
  );
}

export function EmptyState({ context, onAction, className = '' }: EmptyStateProps) {
  const { title, description, cta } = content[context];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <Illustration />
      <h3 className="text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {cta}
        </Button>
      )}
    </motion.div>
  );
}

EmptyState.displayName = 'EmptyState';
export default EmptyState;
