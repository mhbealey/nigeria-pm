import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Kanban, Zap, Users, Settings, ChevronLeft } from 'lucide-react';
import { Avatar } from '../shared/Avatar';
import { Tooltip } from '../shared/Tooltip';

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'board', label: 'Board', icon: Kanban },
  { id: 'sprint', label: 'Sprint', icon: Zap },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (id: string) => void;
  userName?: string;
  userAvatar?: string;
  className?: string;
}

export function Sidebar({
  activeItem = 'overview',
  onNavigate,
  userName = 'Alex',
  userAvatar,
  className = '',
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const width = collapsed ? 64 : 240;

  return (
    <motion.aside
      animate={{ width }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`h-screen flex flex-col bg-[var(--surface-primary)] border-r border-[var(--slate-200)] select-none overflow-hidden shrink-0 ${className}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 shrink-0">
        <div className="w-8 h-8 rounded-full bg-[var(--wapa-green-500)] flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">W</span>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)]"
          >
            WAPA
          </motion.span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mb-2 p-1.5 rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-colors self-end outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronLeft size={16} />
        </motion.div>
      </button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const isActive = item.id === activeItem;
          const Icon = item.icon;

          const button = (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={`relative flex items-center gap-3 w-full rounded-[var(--radius-md)] transition-colors duration-150 outline-none
                ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'}
                ${isActive
                  ? 'bg-[var(--wapa-green-50)] text-[var(--wapa-green-700)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--slate-100)] hover:text-[var(--text-primary)]'}
                focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-[var(--wapa-green-500)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={18} className="shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </button>
          );

          return collapsed ? (
            <Tooltip key={item.id} content={item.label} position="right" delay={0}>
              {button}
            </Tooltip>
          ) : (
            button
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-[var(--slate-200)] px-3 py-3 flex items-center gap-3">
        <Avatar name={userName} src={userAvatar} size="sm" online />
        {!collapsed && (
          <>
            <span className="text-sm font-medium text-[var(--text-primary)] truncate flex-1">
              {userName}
            </span>
            <button
              className="p-1.5 rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
              aria-label="Settings"
            >
              <Settings size={16} />
            </button>
          </>
        )}
      </div>
    </motion.aside>
  );
}

Sidebar.displayName = 'Sidebar';
export default Sidebar;
