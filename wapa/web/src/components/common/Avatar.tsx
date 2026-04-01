export function Avatar({ emoji, name, size = 'md' }: { emoji: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-7 w-7 text-sm', md: 'h-9 w-9 text-lg', lg: 'h-12 w-12 text-2xl' };
  return (
    <div className={`${sizes[size]} flex items-center justify-center rounded-full bg-gray-100`} title={name}>
      {emoji}
    </div>
  );
}
