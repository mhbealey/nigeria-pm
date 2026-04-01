import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { Avatar } from '../shared/Avatar';
import { CountBadge } from '../shared/Badge';

interface TopBarProps {
  title: string;
  notificationCount?: number;
  userName?: string;
  userAvatar?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function TopBar({
  title,
  notificationCount = 0,
  userName = 'Alex',
  userAvatar,
  onSearch,
  className = '',
}: TopBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <header
      className={`h-14 flex items-center justify-between px-6 border-b border-[var(--slate-200)] bg-[var(--surface-primary)] shrink-0 ${className}`}
    >
      {/* Left: Title */}
      <div className="flex items-center min-w-0">
        <AnimatePresence mode="wait">
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-display)] truncate"
          >
            {title}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onSearch?.(e.target.value);
            }}
            className="w-full h-9 pl-9 pr-16 rounded-[var(--radius-lg)] bg-[var(--slate-100)] text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none border border-transparent focus:border-[var(--wapa-green-500)] focus:bg-[var(--surface-primary)] focus:shadow-[var(--shadow-sm)] transition-all duration-150 font-[var(--font-body)]"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-tertiary)] bg-[var(--surface-primary)] border border-[var(--slate-200)] rounded px-1.5 py-0.5 font-[var(--font-mono)] pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-3">
        {/* Bell */}
        <button
          className="relative p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5">
              <CountBadge count={notificationCount} variant="red" />
            </span>
          )}
        </button>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            className="flex items-center gap-2 p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--slate-100)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
          >
            <Avatar name={userName} src={userAvatar} size="xs" />
            <ChevronDown size={14} className="text-[var(--text-tertiary)]" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full mt-1 w-48 bg-[var(--surface-primary)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--slate-200)] py-1 z-50"
              >
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--slate-100)] hover:text-[var(--text-primary)] transition-colors outline-none">
                  <User size={15} />
                  Profile
                </button>
                <div className="h-px bg-[var(--slate-200)] mx-2 my-1" />
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors outline-none">
                  <LogOut size={15} />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

TopBar.displayName = 'TopBar';
export default TopBar;
