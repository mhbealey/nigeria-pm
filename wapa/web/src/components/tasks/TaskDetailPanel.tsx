import { X, CalendarDays } from 'lucide-react';
import type { Task } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityIndicator } from '../common/PriorityIndicator';
import { Avatar } from '../common/Avatar';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTimestamp(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-NG', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TaskDetailPanel({ task, onClose }: { task: Task; onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 truncate pr-4">{task.title}</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Status and Priority */}
        <div className="flex items-center gap-3">
          <StatusBadge status={task.status} />
          <PriorityIndicator priority={task.priority} showLabel />
        </div>

        {/* Assignee */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Assignee</p>
          {task.assignee ? (
            <div className="flex items-center gap-2">
              <Avatar name={task.assignee.name} size="sm" />
              <span className="text-sm text-gray-900">{task.assignee.name}</span>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Unassigned</p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Due Date</p>
          {task.dueDate ? (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No due date</p>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Description</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {task.description || 'No description'}
          </p>
        </div>

        {/* Notes */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Notes ({task.notes.length})
          </p>
          {task.notes.length === 0 ? (
            <p className="text-sm text-gray-400">No notes yet</p>
          ) : (
            <div className="space-y-3">
              {task.notes.map((note) => (
                <div key={note.id} className="flex gap-2">
                  <Avatar name={note.author.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-gray-900">{note.author.name}</span>
                      <span className="text-xs text-gray-400">{formatTimestamp(note.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-0.5">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-400">
          Created by {task.creator.name} on {formatDate(task.createdAt)}
        </p>
      </div>
    </div>
  );
}
