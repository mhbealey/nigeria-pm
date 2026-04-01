import React, { useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type {
  BoardCard,
  BoardColumn,
  ColumnStatus,
  SyncEvent,
} from '../../types/board';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLUMN_HEADER_COLORS: Record<ColumnStatus, string> = {
  todo: '#dfe1e6',
  in_progress: '#0079bf',
  blocked: '#eb5a46',
  done: '#61bd4f',
};

const COLUMN_HEADER_TEXT: Record<ColumnStatus, string> = {
  todo: '#172b4d',
  in_progress: '#fff',
  blocked: '#fff',
  done: '#fff',
};

const PRIORITY_DOT: Record<BoardCard['priority'], string> = {
  urgent: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
};

const RECENT_EVENT_WINDOW_MS = 2000;

// ---------------------------------------------------------------------------
// Card sub-component
// ---------------------------------------------------------------------------

interface CardProps {
  card: BoardCard;
  recentlyMoved: boolean;
}

function Card({ card, recentlyMoved }: CardProps) {
  const borderLeft = card.isOverdue ? '3px solid #ef4444' : undefined;
  const bgTint = card.isBlocked ? 'rgba(235, 90, 70, 0.08)' : undefined;

  return (
    <motion.div
      layout
      layoutId={card.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        layout: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      style={{
        position: 'relative',
        background: bgTint
          ? `linear-gradient(${bgTint}, ${bgTint}), var(--trello-card-bg, #fff)`
          : 'var(--trello-card-bg, #fff)',
        borderRadius: 3,
        padding: '8px 8px 6px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
        borderLeft,
        cursor: 'default',
        minHeight: 48,
        overflow: 'hidden',
      }}
    >
      {/* Priority dot */}
      <span
        style={{
          position: 'absolute',
          top: 6,
          left: 6,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: PRIORITY_DOT[card.priority],
          flexShrink: 0,
        }}
        title={`Priority: ${card.priority}`}
      />

      {/* Title */}
      <div
        style={{
          fontSize: 13,
          lineHeight: '18px',
          fontWeight: 500,
          color: 'var(--wa-text-primary, #172b4d)',
          paddingLeft: 14,
          paddingRight: 28,
          wordBreak: 'break-word',
        }}
      >
        {card.title}
      </div>

      {/* Due date */}
      {card.dueDate && (
        <div
          style={{
            fontSize: 11,
            marginTop: 4,
            paddingLeft: 14,
            color: card.isOverdue
              ? '#ef4444'
              : 'var(--wa-text-secondary, #5e6c84)',
            fontWeight: card.isOverdue ? 600 : 400,
          }}
        >
          {card.isOverdue ? '⚠ ' : ''}
          {card.dueDate}
        </div>
      )}

      {/* Blocked reason */}
      {card.isBlocked && card.blockReason && (
        <div
          style={{
            fontSize: 11,
            marginTop: 3,
            paddingLeft: 14,
            color: '#eb5a46',
            fontWeight: 500,
          }}
        >
          🚫 {card.blockReason}
        </div>
      )}

      {/* Assignee circle */}
      <div
        style={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: card.assigneeColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 700,
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: -0.3,
        }}
        title={card.assigneeInitials}
      >
        {card.assigneeInitials}
      </div>

      {/* Green pulse overlay for recently-moved cards */}
      <AnimatePresence>
        {recentlyMoved && (
          <motion.div
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 3,
              background:
                'linear-gradient(135deg, rgba(97,189,79,0.35), rgba(97,189,79,0.10))',
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 0 2px rgba(97,189,79,0.5)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Column sub-component
// ---------------------------------------------------------------------------

interface ColumnProps {
  column: BoardColumn;
  recentCardIds: Set<string>;
}

function Column({ column, recentCardIds }: ColumnProps) {
  const headerBg = COLUMN_HEADER_COLORS[column.status];
  const headerColor = COLUMN_HEADER_TEXT[column.status];

  return (
    <div
      style={{
        minWidth: 200,
        maxWidth: 260,
        flex: '1 0 200px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 6,
        background: 'var(--trello-col-bg, #ebecf0)',
        overflow: 'hidden',
        alignSelf: 'flex-start',
      }}
    >
      {/* Column header */}
      <div
        style={{
          background: headerBg,
          color: headerColor,
          padding: '8px 10px',
          fontSize: 13,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          letterSpacing: 0.2,
          textTransform: 'uppercase',
        }}
      >
        <span>{column.name}</span>
        <span
          style={{
            background:
              column.status === 'todo'
                ? 'rgba(0,0,0,0.12)'
                : 'rgba(255,255,255,0.25)',
            borderRadius: 10,
            padding: '1px 7px',
            fontSize: 12,
            fontWeight: 600,
            minWidth: 20,
            textAlign: 'center',
          }}
        >
          {column.cards.length}
        </span>
      </div>

      {/* Cards list */}
      <div
        style={{
          padding: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minHeight: 40,
        }}
      >
        <AnimatePresence mode="popLayout">
          {column.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              recentlyMoved={recentCardIds.has(card.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sprint Progress Bar sub-component
// ---------------------------------------------------------------------------

interface SprintProgressProps {
  sprintName: string;
  done: number;
  total: number;
  percent: number;
  daysLeft: number;
}

function SprintProgress({
  sprintName,
  done,
  total,
  percent,
  daysLeft,
}: SprintProgressProps) {
  return (
    <div
      style={{
        padding: '10px 14px',
        borderTop: '1px solid var(--wa-border, #e1e4e8)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 12,
        color: 'var(--wa-text-secondary, #5e6c84)',
      }}
    >
      <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
        {sprintName}:
      </span>

      {/* Bar */}
      <div
        style={{
          flex: 1,
          height: 10,
          borderRadius: 5,
          background: 'var(--trello-bar-empty, #dfe1e6)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percent, 100)}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            height: '100%',
            borderRadius: 5,
            background:
              percent >= 80
                ? 'linear-gradient(90deg, #61bd4f, #4caf50)'
                : percent >= 40
                  ? 'linear-gradient(90deg, #61bd4f, #8bc34a)'
                  : 'linear-gradient(90deg, #f9a825, #61bd4f)',
          }}
        />
      </div>

      <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        {done}/{total}
      </span>

      <span style={{ fontWeight: 700, color: 'var(--wa-text-primary, #172b4d)' }}>
        {percent}%
      </span>

      <span
        style={{
          whiteSpace: 'nowrap',
          color:
            daysLeft <= 2
              ? '#ef4444'
              : 'var(--wa-text-secondary, #5e6c84)',
          fontWeight: daysLeft <= 2 ? 600 : 400,
        }}
      >
        — {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TrelloBoard (main component)
// ---------------------------------------------------------------------------

interface TrelloBoardProps {
  columns: BoardColumn[];
  sprintName: string;
  sprintProgress: { done: number; total: number; percent: number };
  daysLeft: number;
  syncEvents: SyncEvent[];
  tool: 'trello' | 'sheets';
}

export default function TrelloBoard({
  columns,
  sprintName,
  sprintProgress,
  daysLeft,
  syncEvents,
  tool,
}: TrelloBoardProps) {
  // Determine which cards have been recently moved (within last 2s)
  const recentCardIds = useMemo(() => {
    const now = Date.now();
    const ids = new Set<string>();
    for (const event of syncEvents) {
      if (
        event.type === 'move' &&
        now - event.timestamp < RECENT_EVENT_WINDOW_MS
      ) {
        ids.add(event.cardId);
      }
    }
    return ids;
  }, [syncEvents]);

  const toolLabel = tool === 'trello' ? 'Trello' : 'Google Sheets';

  return (
    <div
      className="trello-board"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        background: 'var(--trello-board-bg, var(--board-bg, #f4f5f7))',
        border: '1px solid var(--wa-border, #e1e4e8)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid var(--wa-border, #e1e4e8)',
          background: 'var(--trello-header-bg, #f4f5f7)',
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--wa-text-primary, #172b4d)',
          }}
        >
          📋 {sprintName}
        </span>

        <span
          style={{
            fontSize: 12,
            color: 'var(--wa-text-secondary, #5e6c84)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
          }}
        >
          {toolLabel}
          <ExternalLink size={12} />
        </span>
      </div>

      {/* Columns area */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          padding: 10,
          overflowX: 'auto',
          flex: 1,
          alignItems: 'flex-start',
          // Smooth scroll for programmatic scrolling
          scrollBehavior: 'smooth',
        }}
      >
        <LayoutGroup>
          {columns.map((col) => (
            <Column key={col.id} column={col} recentCardIds={recentCardIds} />
          ))}
        </LayoutGroup>
      </div>

      {/* Sprint progress */}
      <SprintProgress
        sprintName={sprintName}
        done={sprintProgress.done}
        total={sprintProgress.total}
        percent={sprintProgress.percent}
        daysLeft={daysLeft}
      />

      {/* Map CSS tokens to internal vars for dark mode */}
      <style>{`
        [data-theme="dark"] .trello-board {
          --trello-board-bg: var(--board-bg, #1a1a2e);
          --trello-header-bg: var(--board-bg, #1a1a2e);
          --trello-card-bg: var(--board-card-bg, #2a2a4a);
          --trello-col-bg: var(--board-column-bg, #202040);
          --trello-bar-empty: #374850;
        }
      `}</style>
    </div>
  );
}
