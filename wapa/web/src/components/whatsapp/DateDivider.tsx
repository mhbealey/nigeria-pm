import React from 'react';

interface DateDividerProps {
  date: string;
}

function formatLabel(date: string): string {
  const lower = date.toLowerCase();
  if (lower === 'today' || lower === 'yesterday') {
    return date.toUpperCase();
  }
  return date;
}

const DateDivider: React.FC<DateDividerProps> = ({ date }) => {
  return (
    <div className="flex justify-center my-3">
      <div
        className="shadow-sm"
        style={{
          backgroundColor: 'var(--wa-date-divider-bg, rgba(225, 221, 211, 0.9))',
          color: 'var(--wa-date-divider-text, #54656f)',
          fontSize: '12.5px',
          lineHeight: 1.3,
          padding: '5px 12px',
          borderRadius: '7.5px',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {formatLabel(date)}
      </div>
    </div>
  );
};

export default DateDivider;
