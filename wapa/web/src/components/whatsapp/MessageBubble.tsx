import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReadReceipt from './ReadReceipt';
import InteractiveButton from './InteractiveButton';

interface MessageBubbleProps {
  direction: 'in' | 'out';
  content: string;
  timestamp: string;
  readStatus?: 'sent' | 'delivered' | 'read';
  showTail?: boolean;
  senderName?: string;
  quickReplies?: string[];
  onQuickReply?: (reply: string) => void;
}

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
        <strong key={match.index} className="font-bold">
          {raw.slice(1, -1)}
        </strong>
      );
    } else if (raw.startsWith('_') && raw.endsWith('_')) {
      parts.push(
        <em key={match.index} className="italic">
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

const MessageBubble: React.FC<MessageBubbleProps> = ({
  direction,
  content,
  timestamp,
  readStatus,
  showTail = true,
  senderName,
  quickReplies,
  onQuickReply,
}) => {
  const isOut = direction === 'out';
  const bubbleBg = isOut ? '#d9fdd3' : '#ffffff';

  const parsed = useMemo(() => parseInlineFormatting(content), [content]);

  const tailStyle: React.CSSProperties = showTail
    ? {
        position: 'relative',
      }
    : {};

  return (
    <motion.div
      initial={{ scale: 0.85, y: 10, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, duration: 0.3 }}
      className={`flex flex-col ${isOut ? 'items-end' : 'items-start'} ${showTail ? 'mb-1' : 'mb-0.5'}`}
      style={{ fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }}
    >
      <div
        className={`relative max-w-[85%] px-2.5 pt-1.5 pb-1 shadow-sm ${
          isOut
            ? showTail
              ? 'rounded-[18px_18px_4px_18px]'
              : 'rounded-[18px]'
            : showTail
              ? 'rounded-[18px_18px_18px_4px]'
              : 'rounded-[18px]'
        }`}
        style={{
          backgroundColor: bubbleBg,
          ...tailStyle,
        }}
      >
        {/* Tail */}
        {showTail && (
          <div
            className="absolute bottom-0"
            style={{
              [isOut ? 'right' : 'left']: -6,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              ...(isOut
                ? {
                    borderWidth: '0 0 10px 8px',
                    borderColor: `transparent transparent ${bubbleBg} transparent`,
                  }
                : {
                    borderWidth: '0 8px 10px 0',
                    borderColor: `transparent transparent ${bubbleBg} transparent`,
                  }),
            }}
          />
        )}

        {/* Sender name for groups */}
        {senderName && direction === 'in' && (
          <div className="text-[12.5px] font-medium text-[#00a884] mb-0.5 leading-tight">
            {senderName}
          </div>
        )}

        {/* Content + metadata in a flex layout */}
        <div>
          <span className="text-[14.2px] leading-[19px] text-[#111b21] whitespace-pre-wrap break-words">
            {parsed}
          </span>
          {/* Inline timestamp + receipt */}
          <span className="float-right mt-1 ml-2 flex items-center gap-0.5 leading-none">
            <span className="text-[11px] text-[#667781]">{timestamp}</span>
            {isOut && readStatus && <ReadReceipt status={readStatus} />}
          </span>
        </div>
      </div>

      {/* Quick replies */}
      {quickReplies && quickReplies.length > 0 && (
        <div className={`flex flex-wrap gap-2 mt-1.5 max-w-[85%] ${isOut ? 'justify-end' : 'justify-start'}`}>
          {quickReplies.map((reply) => (
            <InteractiveButton
              key={reply}
              label={reply}
              onClick={() => onQuickReply?.(reply)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
