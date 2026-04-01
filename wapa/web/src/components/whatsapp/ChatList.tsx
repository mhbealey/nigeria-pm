import React, { useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import ChatListItem from './ChatListItem';

interface ChatListProps {
  selectedChatId: string;
  onSelectChat: (chatId: string) => void;
  chats: Array<{
    id: string;
    name: string;
    avatarText: string;
    avatarColor: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isGroup?: boolean;
  }>;
}

const ChatList: React.FC<ChatListProps> = ({
  onSelectChat,
  selectedChatId,
  chats,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="chat-list flex flex-col h-full"
      style={
        {
          '--_cl-bg': 'var(--wa-chat-list-bg, #ffffff)',
          '--_cl-bg-dark': '#111b21',
          '--_cl-border': '#e9edef',
          '--_cl-border-dark': '#313d45',
          '--_cl-search-bg': 'var(--wa-search-bg, #f0f2f5)',
          '--_cl-search-bg-dark': '#202c33',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        } as React.CSSProperties
      }
    >
      <style>{`
        .chat-list {
          width: 360px;
          background-color: var(--wa-chat-list-bg, #ffffff);
          border-right: 1px solid #e9edef;
        }
        [data-theme="dark"] .chat-list {
          background-color: #111b21;
          border-right-color: #313d45;
        }
        [data-theme="dark"] .chat-list .cl-search-wrap {
          background-color: #111b21;
        }
        [data-theme="dark"] .chat-list .cl-search-bar {
          background-color: #202c33 !important;
        }
        [data-theme="dark"] .chat-list .cl-search-input {
          color: #e9edef !important;
        }
        [data-theme="dark"] .chat-list .cl-search-input::placeholder {
          color: #8696a0;
        }
        @media (max-width: 768px) {
          .chat-list {
            width: 100%;
            border-right: none;
          }
        }
      `}</style>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 shrink-0"
        style={{
          height: 56,
          backgroundColor: 'var(--wa-header, #008069)',
        }}
      >
        <span className="text-white text-[18px] font-bold">WAPA</span>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-8 h-8">
            <Search className="w-5 h-5 text-white" strokeWidth={1.8} />
          </button>
          <button className="flex items-center justify-center w-8 h-8">
            <MoreVertical className="w-5 h-5 text-white" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="cl-search-wrap px-2 py-1.5 shrink-0" style={{ backgroundColor: 'var(--wa-chat-list-bg, #ffffff)' }}>
        <div
          className="cl-search-bar flex items-center rounded-lg px-3 py-1.5"
          style={{ backgroundColor: 'var(--wa-search-bg, #f0f2f5)' }}
        >
          <Search className="w-4 h-4 text-[#8696a0] shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="cl-search-input flex-1 bg-transparent border-none outline-none text-[13.5px] placeholder-[#8696a0] ml-3"
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              color: 'var(--wa-text-primary, #111b21)',
            }}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            name={chat.name}
            avatarText={chat.avatarText}
            avatarColor={chat.avatarColor}
            lastMessage={chat.lastMessage}
            timestamp={chat.timestamp}
            unreadCount={chat.unreadCount}
            isGroup={chat.isGroup}
            selected={selectedChatId === chat.id}
            onClick={() => onSelectChat?.(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
