import React from 'react';
import { ChevronLeft, Video, Phone, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  name?: string;
  status?: string;
  avatarText?: string;
  avatarColor?: string;
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name = 'WAPA',
  status = 'online',
  avatarText = 'W',
  avatarColor = '#25d366',
  onBack,
}) => {
  return (
    <div
      className="flex items-center shrink-0"
      style={{
        height: 56,
        backgroundColor: 'var(--wa-header, #008069)',
        paddingLeft: 4,
        paddingRight: 8,
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Back arrow */}
      <button
        onClick={onBack}
        className="flex items-center justify-center"
        style={{ width: 32, height: 56 }}
      >
        <ChevronLeft className="text-white" style={{ width: 24, height: 24 }} strokeWidth={1.5} />
      </button>

      {/* Avatar */}
      <div
        className="rounded-full flex items-center justify-center shrink-0"
        style={{
          width: 40,
          height: 40,
          backgroundColor: avatarColor,
          marginLeft: 2,
        }}
      >
        <span className="text-white text-base font-bold leading-none">{avatarText}</span>
      </div>

      {/* Name + Status */}
      <div className="flex flex-col min-w-0 flex-1" style={{ marginLeft: 12 }}>
        <span
          className="truncate"
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: '20px',
          }}
        >
          {name}
        </span>
        {status && (
          <span
            style={{
              color: '#a1c7b9',
              fontSize: 13,
              lineHeight: '16px',
            }}
          >
            {status}
          </span>
        )}
      </div>

      {/* Action icons */}
      <div className="flex items-center" style={{ gap: 20, marginLeft: 'auto' }}>
        <button className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
          <Video className="text-white" style={{ width: 24, height: 24 }} strokeWidth={1.5} />
        </button>
        <button className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
          <Phone className="text-white" style={{ width: 24, height: 24 }} strokeWidth={1.5} />
        </button>
        <button className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
          <MoreVertical className="text-white" style={{ width: 24, height: 24 }} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
