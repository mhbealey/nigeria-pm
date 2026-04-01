import React from 'react';

interface DateDividerProps {
  date: string;
}

const DateDivider: React.FC<DateDividerProps> = ({ date }) => {
  return (
    <div className="flex justify-center my-3">
      <div
        className="rounded-full px-3 py-1 text-[12px] leading-tight shadow-sm"
        style={{
          backgroundColor: 'rgba(225, 221, 211, 0.9)',
          color: '#54656f',
          fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        {date}
      </div>
    </div>
  );
};

export default DateDivider;
