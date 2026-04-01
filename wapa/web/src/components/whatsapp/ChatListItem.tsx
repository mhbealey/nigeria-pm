import React from 'react';

interface ChatListItemProps {
  name: string;
  avatarText: string;
  avatarColor?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isGroup?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  avatarText,
  avatarColor = '#25d366',
  lastMessage,
  timestamp,
  unreadCount = 0,
  isGroup = false,
  selected = false,
  onClick,
}) => {
  const hasUnread = unreadCount > 0;
  const itemId = `cli-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <>
      <style>{`
        .chat-list-item {
          background-color: transparent;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .chat-list-item:hover {
          background-color: #f5f6f6;
        }
        .chat-list-item[data-selected='true'] {
          background-color: var(--wa-chat-list-selected, rgba(0, 168, 132, 0.08));
        }
        .chat-list-item[data-selected='true']:hover {
          background-color: var(--wa-chat-list-selected, rgba(0, 168, 132, 0.08));
        }
        .chat-list-item .cli-divider {
          border-bottom-color: #e9edef;
        }
        .chat-list-item .cli-name {
          color: var(--wa-text-primary, #111b21);
        }
        .chat-list-item .cli-message {
          color: var(--wa-text-secondary, #667781);
        }
        .chat-list-item .cli-time {
          color: var(--wa-text-secondary, #667781);
        }
        .chat-list-item .cli-time[data-unread='true'] {
          color: #00a884;
        }
        @media (prefers-color-scheme: dark) {
          .chat-list-item:hover {
            background-color: #202c33;
          }
          .chat-list-item[data-selected='true'],
          .chat-list-item[data-selected='true']:hover {
            background-color: #2a3942;
          }
          .chat-list-item .cli-divider {
            border-bottom-color: #313d45;
          }
          .chat-list-item .cli-name {
            color: #e9edef;
          }
          .chat-list-item .cli-message {
            color: #8696a0;
          }
          .chat-list-item .cli-time {
            color: #8696a0;
          }
          .chat-list-item .cli-time[data-unread='true'] {
            color: #00a884;
          }
        }
      `}</style>
      <button
        onClick={onClick}
        data-selected={selected}
        className="chat-list-item flex items-center w-full px-3 py-0 transition-colors duration-150 text-left"
        style={{ height: 72 }}
      >
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          <span className="text-white text-lg font-bold">{avatarText}</span>
        </div>

        {/* Content */}
        <div className="cli-divider flex flex-col flex-1 ml-3 min-w-0 border-b pb-2 self-stretch justify-center">
          {/* Row 1: name + timestamp */}
          <div className="flex items-baseline justify-between">
            <span
              className={`cli-name text-[16px] truncate ${hasUnread ? 'font-bold' : 'font-normal'}`}
            >
              {name}
            </span>
            <span
              data-unread={hasUnread}
              className="cli-time text-[12px] shrink-0 ml-2"
            >
              {timestamp}
            </span>
          </div>

          {/* Row 2: preview + badge */}
          <div className="flex items-center justify-between mt-0.5">
            <span className="cli-message text-[13.5px] truncate pr-2">
              {lastMessage}
            </span>
            {hasUnread && (
              <span className="flex items-center justify-center min-w-[20px] h-5 rounded-full bg-[#25d366] text-white text-[11px] font-bold px-1.5 shrink-0">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </button>
    </>
  );
};

export default ChatListItem;
