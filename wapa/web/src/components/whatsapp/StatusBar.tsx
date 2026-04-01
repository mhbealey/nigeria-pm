import React from 'react';

interface StatusBarProps {
  time?: string;
  batteryPercent?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
  time = '9:41',
  batteryPercent = 87,
}) => {
  return (
    <div
      className="flex items-center justify-between px-5 bg-white"
      style={{
        height: 44,
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Left: Time */}
      <span className="text-[15px] font-semibold tracking-tight text-black">
        {time}
      </span>

      {/* Right: Signal + WiFi + Battery */}
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="#0a0a0a" />
          <rect x="4" y="6" width="3" height="6" rx="0.5" fill="#0a0a0a" />
          <rect x="8" y="3" width="3" height="9" rx="0.5" fill="#0a0a0a" />
          <rect x="12" y="0" width="3" height="12" rx="0.5" fill="#0a0a0a" />
        </svg>

        {/* WiFi icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 10.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
            fill="#0a0a0a"
          />
          <path
            d="M5.17 8.83a4.002 4.002 0 0 1 5.66 0"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M2.34 6a7.07 7.07 0 0 1 11.32 0"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M0 3.17a10.62 10.62 0 0 1 16 0"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            {/* Battery body */}
            <rect
              x="0.5"
              y="0.5"
              width="22"
              height="12"
              rx="2.5"
              stroke="#0a0a0a"
              strokeWidth="1"
              fill="none"
            />
            {/* Battery fill */}
            <rect
              x="2"
              y="2"
              width={Math.round(19 * (batteryPercent / 100))}
              height="9"
              rx="1"
              fill="#0a0a0a"
            />
            {/* Battery tip */}
            <rect x="23.5" y="4" width="2" height="5" rx="1" fill="#0a0a0a" />
          </svg>
          <span className="text-[12px] font-medium text-black ml-0.5">
            {batteryPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
