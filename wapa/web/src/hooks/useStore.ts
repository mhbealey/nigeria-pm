import { useState, useCallback } from 'react';
import { tasks as initialTasks, chatHistory as initialChat } from '../lib/mock-data';
import type { Task, TaskStatus, ChatMessage } from '../types';

// Simple global state via module-level variables + React state
let globalTasks = [...initialTasks];
let globalChat = [...initialChat];
let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach(fn => fn());
}

export function useStore() {
  const [, forceUpdate] = useState(0);

  useState(() => {
    const listener = () => forceUpdate(n => n + 1);
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  });

  const updateTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    globalTasks = globalTasks.map(t =>
      t.id === taskId
        ? { ...t, status, completedAt: status === 'done' ? new Date().toISOString() : null }
        : t
    );
    notify();
  }, []);

  const addChatMessage = useCallback((content: string, sender: 'user' | 'wapa') => {
    globalChat = [...globalChat, {
      id: `c${Date.now()}`,
      content,
      sender,
      timestamp: new Date().toISOString(),
    }];
    notify();
  }, []);

  return {
    tasks: globalTasks,
    chat: globalChat,
    updateTaskStatus,
    addChatMessage,
  };
}
