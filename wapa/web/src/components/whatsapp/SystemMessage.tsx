import React from 'react';

interface SystemMessageProps {
  text: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ text }) => {
  return (
    <div className="flex justify-center my-2">
      <div
        className="rounded-lg px-3 py-1 text-[12.5px] leading-tight text-center max-w-[85%] shadow-sm"
        style={{
          backgroundColor: 'rgba(253, 244, 197, 0.8)',
          color: '#54656f',
          fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default SystemMessage;
