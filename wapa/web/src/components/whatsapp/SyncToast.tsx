import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SyncEvent } from '../../types/board';

interface SyncToastProps {
  events: SyncEvent[];
  tool: 'trello' | 'sheets';
}

function EventText({ event, tool }: { event: SyncEvent; tool: string }) {
  const toolName = tool === 'trello' ? 'Trello' : 'Sheets';
  switch (event.type) {
    case 'move':
      return <>✓ <strong>{event.cardTitle}</strong> → {event.toColumn} on {toolName}</>;
    case 'create':
      return <>✓ <strong>{event.cardTitle}</strong> added to {toolName}</>;
    case 'update':
      return <>✓ <strong>{event.cardTitle}</strong> updated on {toolName}</>;
  }
}

const DISMISS_MS = 2500;

export default function SyncToast({ events, tool }: SyncToastProps) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<SyncEvent | null>(null);
  const lastTimestamp = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (events.length === 0) return;

    const latest = events[events.length - 1];
    if (latest.timestamp > lastTimestamp.current) {
      lastTimestamp.current = latest.timestamp;
      setCurrent(latest);
      setVisible(true);

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), DISMISS_MS);
    }

    return () => clearTimeout(timerRef.current);
  }, [events]);

  const toolIcon = tool === 'trello' ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <rect width="14" height="14" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="2" y="2" width="4" height="8" rx="1" fill="white" />
      <rect x="8" y="2" width="4" height="5" rx="1" fill="white" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <rect width="14" height="14" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="2" y="3" width="10" height="2" rx="0.5" fill="white" />
      <rect x="2" y="6" width="10" height="2" rx="0.5" fill="white" />
      <rect x="2" y="9" width="10" height="2" rx="0.5" fill="white" />
    </svg>
  );

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 320,
            background: 'rgba(0, 168, 132, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 12,
            padding: '8px 16px',
            color: '#fff',
            fontSize: 13,
            lineHeight: 1.4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {toolIcon}
          <span>
            <EventText event={current} tool={tool} />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
