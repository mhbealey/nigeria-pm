import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Bell,
  Plug,
  Check,
  MessageCircle,
  Github,
  Calendar,
} from 'lucide-react';
import { cn } from '../utils/cn';

/* ---------- tab config ---------- */

const tabs = [
  { id: 'general' as const, label: 'General', icon: Settings },
  { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  { id: 'integrations' as const, label: 'Integrations', icon: Plug },
];
type SettingsTab = (typeof tabs)[number]['id'];

/* ---------- animated toggle ---------- */

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative w-10 h-[22px] rounded-full transition-colors duration-200',
        checked ? 'bg-[var(--wapa-green-500)]' : 'bg-gray-300',
      )}
    >
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

/* ---------- toast ---------- */

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl"
        >
          <Check className="w-4 h-4 text-[var(--wapa-green-400)]" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- page ---------- */

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {activeTab === 'general' && <GeneralTab onSave={showToast} />}
        {activeTab === 'notifications' && <NotificationsTab onSave={showToast} />}
        {activeTab === 'integrations' && <IntegrationsTab />}
      </motion.div>

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}

/* ---------- General Tab ---------- */

function GeneralTab({ onSave }: { onSave: (msg: string) => void }) {
  const [teamName, setTeamName] = useState('WAPA Dev Team');
  const [timezone, setTimezone] = useState('Africa/Lagos');
  const [sprintDuration, setSprintDuration] = useState('14');

  return (
    <div className="max-w-xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        {/* Team Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--wapa-green-500)] focus:border-transparent"
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--wapa-green-500)] focus:border-transparent"
          >
            <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
            <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
            <option value="America/New_York">America/New York (EST)</option>
            <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
          </select>
        </div>

        {/* Sprint Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Sprint Duration</label>
          <div className="flex items-center gap-3">
            {['7', '14', '21'].map((d) => (
              <button
                key={d}
                onClick={() => setSprintDuration(d)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                  sprintDuration === d
                    ? 'bg-[var(--wapa-green-50)] border-[var(--wapa-green-500)] text-[var(--wapa-green-700)]'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
                )}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onSave('Settings saved successfully')}
            className="bg-[var(--wapa-green-500)] hover:bg-[var(--wapa-green-400)] text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Notifications Tab ---------- */

function NotificationsTab({ onSave }: { onSave: (msg: string) => void }) {
  const [settings, setSettings] = useState({
    standup: true,
    digest: true,
    reminders: true,
    quietHours: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      onSave(`${key.charAt(0).toUpperCase() + key.slice(1)} ${next[key] ? 'enabled' : 'disabled'}`);
      return next;
    });
  };

  const notifications = [
    {
      key: 'standup' as const,
      title: 'Daily Standup',
      desc: 'Automated standup prompt every morning at 9 AM',
    },
    {
      key: 'digest' as const,
      title: 'Daily Digest',
      desc: 'End-of-day summary of completed tasks and blockers',
    },
    {
      key: 'reminders' as const,
      title: 'Due Date Reminders',
      desc: 'Get notified 24 hours before a task is due',
    },
    {
      key: 'quietHours' as const,
      title: 'Quiet Hours',
      desc: 'Pause all notifications from 10 PM to 7 AM',
    },
  ];

  return (
    <div className="max-w-xl">
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {notifications.map((n) => (
          <div key={n.key} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
            </div>
            <Toggle checked={settings[n.key]} onChange={() => toggle(n.key)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Integrations Tab ---------- */

function IntegrationsTab() {
  const integrations = [
    {
      name: 'WhatsApp',
      desc: 'Connected and receiving messages',
      icon: MessageCircle,
      status: 'connected' as const,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-700',
    },
    {
      name: 'GitHub',
      desc: 'Link PRs and commits to tasks',
      icon: Github,
      status: 'coming_soon' as const,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-400',
      badgeColor: 'bg-gray-100 text-gray-500',
    },
    {
      name: 'Slack',
      desc: 'Cross-post updates to Slack channels',
      icon: MessageCircle,
      status: 'coming_soon' as const,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-400',
      badgeColor: 'bg-gray-100 text-gray-500',
    },
    {
      name: 'Google Calendar',
      desc: 'Sync sprint dates and due dates',
      icon: Calendar,
      status: 'coming_soon' as const,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-400',
      badgeColor: 'bg-gray-100 text-gray-500',
    },
  ];

  return (
    <div className="max-w-xl space-y-3">
      {integrations.map((integration) => (
        <div
          key={integration.name}
          className={cn(
            'rounded-xl border p-5 flex items-center gap-4 transition-all',
            integration.color,
            integration.status === 'connected' && 'hover:shadow-md',
          )}
        >
          <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', integration.status === 'connected' ? 'bg-green-100' : 'bg-gray-100')}>
            <integration.icon className={cn('w-5 h-5', integration.iconColor)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900">{integration.name}</h3>
              <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', integration.badgeColor)}>
                {integration.status === 'connected' ? 'Connected' : 'Coming Soon'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{integration.desc}</p>
          </div>
          {integration.status === 'connected' ? (
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          ) : (
            <button className="text-xs font-medium text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 cursor-not-allowed">
              Soon
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
