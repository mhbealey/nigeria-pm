import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  sidebarCollapsed: boolean;
  activeModal: string | null;
  activeDetailTaskId: string | null;
  soundEnabled: boolean;
  splitView: boolean;

  toggleTheme: () => void;
  toggleSidebar: () => void;
  openTaskDetail: (taskId: string) => void;
  closeTaskDetail: () => void;
  toggleSound: () => void;
  toggleSplitView: () => void;
  setModal: (modal: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  sidebarCollapsed: false,
  activeModal: null,
  activeDetailTaskId: null,
  soundEnabled: true,
  splitView: true,

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  openTaskDetail: (taskId) =>
    set({ activeDetailTaskId: taskId }),

  closeTaskDetail: () =>
    set({ activeDetailTaskId: null }),

  toggleSound: () =>
    set((state) => ({
      soundEnabled: !state.soundEnabled,
    })),

  toggleSplitView: () =>
    set((state) => ({
      splitView: !state.splitView,
    })),

  setModal: (modal) =>
    set({ activeModal: modal }),
}));
