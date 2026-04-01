export function ProgressBar({ percent, size = 'md', showLabel = true }: { percent: number; size?: 'sm' | 'md' | 'lg'; showLabel?: boolean }) {
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const color = clampedPercent >= 75 ? 'bg-green-500' : clampedPercent >= 40 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${heights[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <div className={`${heights[size]} ${color} rounded-full transition-all duration-500`} style={{ width: `${clampedPercent}%` }} />
      </div>
      {showLabel && <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-right">{clampedPercent}%</span>}
    </div>
  );
}
