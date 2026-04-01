import React from 'react';
import { ChevronLeft, Video, Phone, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  name?: string;
  status?: string;
  avatarText?: string;
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name = 'WAPA',
  status = 'online',
  avatarText = 'W',
  onBack,
}) => {
  return (
    <div
      className="flex items-center px-2 shrink-0"
      style={{
        height: 56,
        backgroundColor: '#008069',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Back arrow */}
      <button
        onClick={onBack}
        className="flex items-center justify-center w-8 h-8 -ml-1"
      >
        <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2} />
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center ml-0.5 shrink-0">
        <span className="text-white text-base font-bold">{avatarText}</span>
      </div>

      {/* Name + Status */}
      <div className="flex flex-col ml-3 min-w-0 flex-1">
        <span className="text-white text-[16.5px] font-medium leading-tight truncate">
          {name}
        </span>
        {status && (
          <span className="text-[12.5px] leading-tight text-green-100">
            {status}
          </span>
        )}
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="flex items-center justify-center w-8 h-8">
          <Video className="w-[22px] h-[22px] text-white" strokeWidth={1.8} />
        </button>
        <button className="flex items-center justify-center w-8 h-8">
          <Phone className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
        </button>
        <button className="flex items-center justify-center w-8 h-8">
          <MoreVertical
            className="w-[20px] h-[20px] text-white"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
