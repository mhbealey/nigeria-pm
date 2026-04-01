import type { CSSProperties } from 'react';

interface SkeletonBaseProps {
  className?: string;
  style?: CSSProperties;
}

interface SkeletonTextProps extends SkeletonBaseProps {
  variant: 'text';
  width?: string | number;
  lines?: number;
}

interface SkeletonCircleProps extends SkeletonBaseProps {
  variant: 'circle';
  size?: number;
}

interface SkeletonRectProps extends SkeletonBaseProps {
  variant: 'rect';
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

type SkeletonProps = SkeletonTextProps | SkeletonCircleProps | SkeletonRectProps;

const shimmerClass =
  'bg-gradient-to-r from-[var(--slate-100)] via-[var(--slate-200)] to-[var(--slate-100)] bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]';

export function Skeleton(props: SkeletonProps) {
  const { variant, className = '', style } = props;

  if (variant === 'text') {
    const { width = '100%', lines = 1 } = props;
    return (
      <div className={`flex flex-col gap-2 ${className}`} style={style}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-3.5 rounded-[var(--radius-sm)] ${shimmerClass}`}
            style={{
              width: i === lines - 1 && lines > 1 ? '70%' : width,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'circle') {
    const { size = 40 } = props;
    return (
      <div
        className={`rounded-full shrink-0 ${shimmerClass} ${className}`}
        style={{ width: size, height: size, ...style }}
      />
    );
  }

  // rect
  const { width = '100%', height = 120, rounded = true } = props;
  return (
    <div
      className={`${rounded ? 'rounded-[var(--radius-lg)]' : ''} ${shimmerClass} ${className}`}
      style={{ width, height, ...style }}
    />
  );
}

/* Convenience components */
export function SkeletonText(props: Omit<SkeletonTextProps, 'variant'>) {
  return <Skeleton variant="text" {...props} />;
}

export function SkeletonCircle(props: Omit<SkeletonCircleProps, 'variant'>) {
  return <Skeleton variant="circle" {...props} />;
}

export function SkeletonRect(props: Omit<SkeletonRectProps, 'variant'>) {
  return <Skeleton variant="rect" {...props} />;
}

Skeleton.displayName = 'Skeleton';
export default Skeleton;
