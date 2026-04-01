import { MapPin, Phone } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { users, tasks } from '../lib/mock-data';

function maskPhone(phone: string): string {
  if (phone.length <= 6) return phone;
  return phone.slice(0, 4) + '****' + phone.slice(-4);
}

function getTimezoneLabel(tz: string): string {
  const labels: Record<string, string> = {
    'Africa/Lagos': 'WAT (Lagos)',
    'Asia/Singapore': 'SGT (Singapore)',
    'Europe/London': 'GMT (London)',
  };
  return labels[tz] || tz;
}

export function TeamPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Team</h1>
        <p className="text-sm text-gray-500 mt-1">WAPA Dev Team - {users.length} members</p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => {
          const userTasks = tasks.filter((t) => t.assignee?.id === user.id);
          const assigned = userTasks.length;
          const completed = userTasks.filter((t) => t.status === 'done').length;
          const inProgress = userTasks.filter((t) => t.status === 'in_progress').length;

          return (
            <div
              key={user.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={user.name} size="lg" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{user.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {getTimezoneLabel(user.timezone)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono">{maskPhone(user.phone)}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{assigned}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Assigned</p>
                </div>
                <div className="bg-green-50 rounded-lg px-3 py-2 text-center">
                  <p className="text-lg font-bold text-green-700">{completed}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Done</p>
                </div>
                <div className="bg-blue-50 rounded-lg px-3 py-2 text-center">
                  <p className="text-lg font-bold text-blue-700">{inProgress}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Active</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
