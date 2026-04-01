import React, { useRef, useEffect } from 'react';
import StatusBar from './StatusBar';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import DateDivider from './DateDivider';

export interface ChatMessage {
  id: string;
  direction: 'in' | 'out';
  content: string;
  timestamp: string;
  date?: string;
  readStatus?: 'sent' | 'delivered' | 'read';
  senderName?: string;
  quickReplies?: string[];
}

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onQuickReply?: (reply: string) => void;
  isTyping?: boolean;
  chatName?: string;
  chatStatus?: string;
  onBack?: () => void;
}

/**
 * Determines whether a message should show a tail.
 * A message shows a tail unless it's followed by another message
 * from the same sender within 60 seconds (approximation based on timestamp equality).
 */
function shouldShowTail(
  messages: ChatMessage[],
  index: number
): boolean {
  const current = messages[index];
  const prev = index > 0 ? messages[index - 1] : null;

  // Show tail if first message, or different sender, or different timestamp bracket
  if (!prev) return true;
  if (prev.direction !== current.direction) return true;
  if (prev.timestamp !== current.timestamp) return true;

  return false;
}

const doodlePatternCSS = `
  radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px) 0 0 / 20px 20px,
  radial-gradient(circle, rgba(0,0,0,0.015) 1px, transparent 1px) 10px 10px / 20px 20px
`;

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  onQuickReply,
  isTyping = false,
  chatName = 'WAPA',
  chatStatus = 'online',
  onBack,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Group messages by date
  let lastDate: string | undefined;

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden"
      style={{ fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }}
    >
      {/* Status bar */}
      <StatusBar />

      {/* Chat header */}
      <ChatHeader
        name={chatName}
        status={chatStatus}
        onBack={onBack}
      />

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2"
        style={{
          backgroundColor: '#efeae2',
          backgroundImage: doodlePatternCSS,
        }}
      >
        {messages.map((msg, i) => {
          const showDate = msg.date && msg.date !== lastDate;
          if (msg.date) lastDate = msg.date;
          const showTail = shouldShowTail(messages, i);

          return (
            <React.Fragment key={msg.id}>
              {showDate && <DateDivider date={msg.date!} />}
              <MessageBubble
                direction={msg.direction}
                content={msg.content}
                timestamp={msg.timestamp}
                readStatus={msg.readStatus}
                showTail={showTail}
                senderName={msg.senderName}
                quickReplies={msg.quickReplies}
                onQuickReply={onQuickReply}
              />
            </React.Fragment>
          );
        })}

        <TypingIndicator visible={isTyping} />
      </div>

      {/* Chat input */}
      <ChatInput onSend={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
