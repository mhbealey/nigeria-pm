import { cn } from '../../lib/utils';

export function ProgressBar({ percent, size = 'md' }: { percent: number; size?: 'sm' | 'md' | 'lg' }) {
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
  return (
    <div className="w-full">
      <div className={cn('w-full rounded-full bg-gray-200', heights[size])}>
        <div
          className={cn(
            'rounded-full transition-all duration-500',
            heights[size],
            percent >= 75 ? 'bg-green-500' : percent >= 40 ? 'bg-yellow-500' : 'bg-wapa-500',
          )}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}
