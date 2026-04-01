import React from 'react';

interface StatusBarProps {
  time?: string;
  batteryPercent?: number;
  light?: boolean;
  hidden?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({
  time = '9:41',
  batteryPercent = 100,
  light = true,
  hidden = false,
}) => {
  if (hidden) return null;

  const color = light ? '#ffffff' : 'var(--wa-statusbar-fg, #0a0a0a)';

  return (
    <div
      className="items-center justify-between hidden md:flex"
      style={{
        height: 44,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: 'transparent',
        fontFamily: "'SF Pro Text', 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Left: Time */}
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: -0.3,
          color,
        }}
      >
        {time}
      </span>

      {/* Right: Signal + WiFi + Battery */}
      <div className="flex items-center" style={{ gap: 6 }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill={color} />
          <rect x="4" y="6" width="3" height="6" rx="0.5" fill={color} />
          <rect x="8" y="3" width="3" height="9" rx="0.5" fill={color} />
          <rect x="12" y="0" width="3" height="12" rx="0.5" fill={color} />
        </svg>

        {/* WiFi icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 10.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
            fill={color}
          />
          <path
            d="M5.17 8.83a4.002 4.002 0 0 1 5.66 0"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M2.34 6a7.07 7.07 0 0 1 11.32 0"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M0 3.17a10.62 10.62 0 0 1 16 0"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Battery */}
        <div className="flex items-center" style={{ gap: 3 }}>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            {/* Battery body */}
            <rect
              x="0.5"
              y="0.5"
              width="22"
              height="12"
              rx="2.5"
              stroke={color}
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
              fill={color}
            />
            {/* Battery tip */}
            <rect x="23.5" y="4" width="2" height="5" rx="1" fill={color} />
          </svg>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color,
              marginLeft: 1,
            }}
          >
            {batteryPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
