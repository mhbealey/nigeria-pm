import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ReadReceipt from './ReadReceipt';

interface MessageBubbleProps {
  direction: 'in' | 'out';
  content: string;
  timestamp: string;
  readStatus?: 'sent' | 'delivered' | 'read';
  showTail?: boolean;
  senderName?: string;
  quickReplies?: string[];
  onQuickReply?: (reply: string) => void;
  isLastInGroup?: boolean;
}

const SENDER_COLORS: Record<string, string> = {
  WAPA: '#00a884',
  Maya: '#ff6b6b',
  Jordan: '#4ecdc4',
  Sam: '#ffd93d',
  Riley: '#6c5ce7',
  Alex: '#25d366',
  'Alex Okonkwo': '#25d366',
};

// DECISION: We parse *bold* and _italic_ inline ourselves rather than using a markdown
// library because (1) WhatsApp uses its own formatting syntax, not standard Markdown,
// (2) a full markdown parser (e.g. react-markdown) adds ~30KB for features we don't need,
// and (3) this regex approach handles the only two formats WAPA responses actually use.
function parseInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*[^*]+\*)|(_[^_]+_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const raw = match[0];
    if (raw.startsWith('*') && raw.endsWith('*')) {
      parts.push(
        <strong key={match.index} style={{ fontWeight: 'bold' }}>
          {raw.slice(1, -1)}
        </strong>
      );
    } else if (raw.startsWith('_') && raw.endsWith('_')) {
      parts.push(
        <em key={match.index} style={{ fontStyle: 'italic' }}>
          {raw.slice(1, -1)}
        </em>
      );
    }
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

/** SVG tail for outgoing (right side) bubble */
const TailOut: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    style={{
      position: 'absolute',
      bottom: 0,
      right: -8,
    }}
  >
    <path
      d="M0 0v11.5C0 5.5 8 1.5 8 0z"
      fill={color}
    />
  </svg>
);

/** SVG tail for incoming (left side) bubble */
const TailIn: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    style={{
      position: 'absolute',
      bottom: 0,
      left: -8,
    }}
  >
    <path
      d="M8 0v11.5C8 5.5 0 1.5 0 0z"
      fill={color}
    />
  </svg>
);

const QuickReplyButton: React.FC<{
  label: string;
  onClick: (label: string) => void;
}> = ({ label, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    onClick(label);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      disabled={clicked}
      style={{
        display: 'block',
        width: '100%',
        padding: '8px 16px',
        borderRadius: '7.5px',
        border: '1px solid #00a884',
        backgroundColor: clicked ? '#00a884' : 'transparent',
        color: clicked ? '#ffffff' : '#00a884',
        fontSize: '14px',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        fontWeight: 500,
        textAlign: 'center',
        cursor: clicked ? 'default' : 'pointer',
        transition: 'background-color 200ms, color 200ms',
      }}
    >
      {label}
    </motion.button>
  );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  direction,
  content,
  timestamp,
  readStatus,
  showTail = true,
  senderName,
  quickReplies,
  onQuickReply,
  isLastInGroup,
}) => {
  const isOut = direction === 'out';

  const bubbleBg = isOut
    ? 'var(--wa-bubble-out, #d9fdd3)'
    : 'var(--wa-bubble-in, #ffffff)';

  const parsed = useMemo(() => parseInlineFormatting(content), [content]);

  const borderRadius = showTail
    ? isOut
      ? '7.5px 7.5px 0 7.5px'
      : '7.5px 7.5px 7.5px 0'
    : '7.5px';

  return (
    <motion.div
      initial={{ scale: 0.95, y: 4, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.25 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOut ? 'flex-end' : 'flex-start',
        marginBottom: showTail ? '8px' : '2px',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Bubble */}
      <div
        style={{
          position: 'relative',
          maxWidth: '85%',
          padding: '6px 7px 8px 9px',
          borderRadius,
          backgroundColor: bubbleBg,
          boxShadow: '0 1px 0.5px rgba(11, 20, 26, 0.13)',
        }}
      >
        {/* SVG tail */}
        {showTail && (
          isOut
            ? <TailOut color={bubbleBg} />
            : <TailIn color={bubbleBg} />
        )}

        {/* Sender name for group chats */}
        {senderName && direction === 'in' && (
          <div
            style={{
              fontSize: '12.5px',
              fontWeight: 'bold',
              color: SENDER_COLORS[senderName] ?? '#00a884',
              marginBottom: '2px',
              lineHeight: 1.2,
            }}
          >
            {senderName}
          </div>
        )}

        {/* Content + inline timestamp/receipt */}
        <div>
          <span
            style={{
              fontSize: '14.2px',
              lineHeight: '19px',
              color: 'var(--wa-text-primary, #111b21)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {parsed}
          </span>
          {/* Timestamp + read receipt floated inline at bottom-right */}
          <span
            style={{
              float: 'right',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              marginTop: '4px',
              marginLeft: '8px',
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: 'var(--wa-text-timestamp, #667781)',
              }}
            >
              {timestamp}
            </span>
            {isOut && readStatus && <ReadReceipt status={readStatus} />}
          </span>
        </div>
      </div>

      {/* Quick reply buttons – full-width rows below the bubble */}
      {quickReplies && quickReplies.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginTop: '6px',
            maxWidth: '85%',
            width: '100%',
          }}
        >
          {quickReplies.map((reply) => (
            <QuickReplyButton
              key={reply}
              label={reply}
              onClick={(r) => onQuickReply?.(r)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
