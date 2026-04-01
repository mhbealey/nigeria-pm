import React from 'react';

interface ChatListItemProps {
  name: string;
  avatarText: string;
  avatarColor?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
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
  selected = false,
  onClick,
}) => {
  const hasUnread = unreadCount > 0;

  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-3 py-2 transition-colors duration-150 text-left"
      style={{
        height: 72,
        backgroundColor: selected
          ? 'rgba(0, 168, 132, 0.08)'
          : 'transparent',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}
      onMouseEnter={(e) => {
        if (!selected)
          (e.currentTarget as HTMLElement).style.backgroundColor = '#f5f6f6';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = selected
          ? 'rgba(0, 168, 132, 0.08)'
          : 'transparent';
      }}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: avatarColor }}
      >
        <span className="text-white text-lg font-bold">{avatarText}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 ml-3 min-w-0 border-b border-[#e9edef] pb-2 self-stretch justify-center">
        {/* Row 1: name + timestamp */}
        <div className="flex items-baseline justify-between">
          <span
            className={`text-[16px] truncate ${hasUnread ? 'font-bold text-[#111b21]' : 'font-normal text-[#111b21]'}`}
          >
            {name}
          </span>
          <span
            className={`text-[12px] shrink-0 ml-2 ${hasUnread ? 'text-[#00a884]' : 'text-[#667781]'}`}
          >
            {timestamp}
          </span>
        </div>

        {/* Row 2: preview + badge */}
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[13.5px] text-[#667781] truncate pr-2">
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
  );
};

export default ChatListItem;
