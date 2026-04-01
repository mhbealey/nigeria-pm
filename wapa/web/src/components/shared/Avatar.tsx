import { useMemo, type CSSProperties } from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
}

interface AvatarStackProps {
  avatars: { name: string; src?: string | null }[];
  size?: AvatarSize;
  max?: number;
  className?: string;
}

const sizeMap: Record<AvatarSize, { px: number; text: string; dot: number }> = {
  xs: { px: 24, text: 'text-[10px]', dot: 7 },
  sm: { px: 32, text: 'text-xs', dot: 8 },
  md: { px: 40, text: 'text-sm', dot: 10 },
  lg: { px: 56, text: 'text-base', dot: 12 },
};

const palette = [
  '#10b857', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#06b6d4',
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ name, src, size = 'md', online, className = '' }: AvatarProps) {
  const { px, text, dot } = sizeMap[size];
  const bg = useMemo(() => palette[hashName(name) % palette.length], [name]);
  const initials = useMemo(() => getInitials(name), [name]);

  const style: CSSProperties = {
    width: px,
    height: px,
    minWidth: px,
  };

  return (
    <div className={`relative inline-flex ${className}`} style={style}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full rounded-full object-cover ring-2 ring-white"
          style={style}
        />
      ) : (
        <div
          className={`w-full h-full rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white select-none ${text}`}
          style={{ ...style, backgroundColor: bg }}
          title={name}
        >
          {initials}
        </div>
      )}
      {online && (
        <span
          className="absolute bottom-0 right-0 rounded-full bg-[var(--wapa-green-500)] ring-2 ring-white"
          style={{ width: dot, height: dot, animation: 'pulseGlow 2s ease-in-out infinite' }}
        />
      )}
    </div>
  );
}

export function AvatarStack({ avatars, size = 'sm', max = 4, className = '' }: AvatarStackProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;
  const { px, text } = sizeMap[size];
  const overlap = Math.round(px * 0.3);

  return (
    <div className={`flex items-center ${className}`}>
      {visible.map((a, i) => (
        <div key={a.name + i} style={{ marginLeft: i === 0 ? 0 : -overlap, zIndex: visible.length - i }}>
          <Avatar name={a.name} src={a.src} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`rounded-full bg-[var(--slate-200)] flex items-center justify-center font-medium text-[var(--text-secondary)] ring-2 ring-white ${text}`}
          style={{ width: px, height: px, marginLeft: -overlap, zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

Avatar.displayName = 'Avatar';
export default Avatar;
