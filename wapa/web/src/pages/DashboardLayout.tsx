import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Columns3,
  Zap,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  MessageCircle,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/board', label: 'Board', icon: Columns3 },
  { to: '/dashboard/sprint', label: 'Sprint', icon: Zap },
  { to: '/dashboard/team', label: 'Team', icon: Users },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const pageTitles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/board': 'Project Board',
  '/dashboard/sprint': 'Sprint',
  '/dashboard/team': 'Team',
  '/dashboard/settings': 'Settings',
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex h-screen bg-[var(--surface-secondary)] overflow-hidden">
      {/* ---- SIDEBAR (desktop/tablet) ---- */}
      {!isMobile && (
        <aside
          className={`flex flex-col border-r border-gray-200 bg-white shrink-0 transition-all duration-300 ${
            collapsed ? 'w-[68px]' : 'w-60'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100 min-h-[68px]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--wapa-green-500)] text-white font-bold text-sm shrink-0">
              W
            </div>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
                <h1 className="font-bold text-base text-gray-900 leading-tight">WAPA</h1>
                <p className="text-[10px] text-gray-400">Project Manager</p>
              </motion.div>
            )}
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-2 py-3 space-y-0.5">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group ${
                    isActive
                      ? 'bg-[var(--wapa-green-50)] text-[var(--wapa-green-700)]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : ''}`
                }
                title={collapsed ? label : undefined}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Demo link */}
          <div className="px-2 pb-2">
            <NavLink
              to="/demo"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              title={collapsed ? 'WhatsApp Demo' : undefined}
            >
              <MessageCircle className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>WhatsApp Demo</span>}
            </NavLink>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center border-t border-gray-100 py-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* User */}
          {!collapsed && (
            <div className="border-t border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[var(--wapa-green-500)] flex items-center justify-center text-white text-xs font-bold">
                  AO
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Alex Okonkwo</p>
                  <p className="text-[10px] text-gray-400">Admin</p>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* ---- MAIN ---- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3.5 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-56 bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--wapa-green-500)] focus:border-transparent"
              />
            </div>
            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[var(--wapa-green-500)] flex items-center justify-center text-white text-xs font-bold">
              AO
            </div>
          </div>
        </header>

        {/* Content outlet */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* ---- MOBILE BOTTOM NAV ---- */}
      {isMobile && (
        <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 flex items-center justify-around py-2 px-1">
          {navItems.slice(0, 4).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1 px-3 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-[var(--wapa-green-600)]' : 'text-gray-400'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/demo"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-[var(--wapa-green-600)]' : 'text-gray-400'
              }`
            }
          >
            <MessageCircle className="w-5 h-5" />
            Demo
          </NavLink>
        </nav>
      )}
    </div>
  );
}
