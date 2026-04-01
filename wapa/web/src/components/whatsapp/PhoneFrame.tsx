import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div
        className="relative overflow-hidden"
        style={{
          width: 375,
          height: 812,
          maxWidth: 375,
          maxHeight: 812,
          borderRadius: 40,
          border: '8px solid #1a1a1a',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          background: '#000',
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute z-50"
          style={{
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 28,
            backgroundColor: '#000',
            borderRadius: 14,
          }}
        />

        {/* Content */}
        <div className="w-full h-full overflow-hidden bg-white relative">
          {children}
        </div>

        {/* Home Indicator */}
        <div
          className="absolute z-50"
          style={{
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 4,
            backgroundColor: '#333',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};

export default PhoneFrame;
