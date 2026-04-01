import React from 'react';

interface SystemMessageProps {
  text: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ text }) => {
  return (
    <div className="flex justify-center my-2">
      <div
        className="shadow-sm"
        style={{
          maxWidth: '85%',
          textAlign: 'center',
          fontSize: '12.5px',
          lineHeight: 1.4,
          padding: '6px 12px',
          borderRadius: '7.5px',
          backgroundColor: 'var(--wa-system-bg, rgba(253, 244, 197, 0.8))',
          color: 'var(--wa-system-text, #54656f)',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default SystemMessage;
