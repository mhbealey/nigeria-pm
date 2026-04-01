import React, { useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import ChatListItem from './ChatListItem';

interface ChatListProps {
  onSelectChat?: (chatId: string) => void;
  selectedChat?: string;
}

const defaultChats = [
  {
    id: 'wapa-dm',
    name: 'WAPA',
    avatarText: 'W',
    avatarColor: '#25d366',
    lastMessage: 'Your sprint is on track! 3 tasks remaining.',
    timestamp: '10:42 AM',
    unreadCount: 2,
  },
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    avatarText: 'WR',
    avatarColor: '#00a884',
    lastMessage: 'Adaeze: Uploaded the new mockups',
    timestamp: '9:15 AM',
    unreadCount: 0,
  },
  {
    id: 'marketing-sprint',
    name: 'Marketing Sprint',
    avatarText: 'MS',
    avatarColor: '#128c7e',
    lastMessage: 'Chidi: The campaign metrics look great',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
];

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, selectedChat }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = defaultChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="flex flex-col h-full border-r border-[#e9edef]"
      style={{
        width: 360,
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 shrink-0"
        style={{ height: 56, backgroundColor: '#008069' }}
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
      <div className="px-2 py-1.5 bg-white shrink-0">
        <div className="flex items-center bg-[#f0f2f5] rounded-lg px-3 py-1.5">
          <Search className="w-4 h-4 text-[#8696a0] shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-[#111b21] placeholder-[#8696a0] ml-3"
            style={{ fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }}
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
            selected={selectedChat === chat.id}
            onClick={() => onSelectChat?.(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
