import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

// DECISION: 40px border-radius matches the iPhone 14/15 physical bezel curvature.
// We use pure CSS (border, boxShadow, border-radius) rather than an image or SVG overlay
// because CSS scales to any DPI, avoids an image asset to manage, and lets us easily
// adjust dimensions. The 12px border simulates the phone bezel depth.
const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div
        className="relative bg-black overflow-hidden"
        style={{
          maxWidth: 375,
          maxHeight: 812,
          width: 375,
          height: 812,
          borderRadius: 40,
          border: '12px solid #1a1a1a',
          boxShadow:
            '0 0 0 2px #333, 0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-black z-50"
          style={{
            width: 120,
            height: 28,
            borderRadius: '0 0 18px 18px',
          }}
        />

        {/* Content */}
        <div className="w-full h-full overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
