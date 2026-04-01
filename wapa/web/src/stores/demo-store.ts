import { create } from 'zustand';

type PlaybackSpeed = 0.5 | 1 | 2;

interface DemoState {
  activeScenario: string | null;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  freeformMode: boolean;
  currentStep: number;

  startScenario: (scenarioId: string) => void;
  pauseScenario: () => void;
  resetScenario: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  toggleFreeform: () => void;
  nextStep: () => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  activeScenario: null,
  isPlaying: false,
  speed: 1,
  freeformMode: true,
  currentStep: 0,

  startScenario: (scenarioId) =>
    set({
      activeScenario: scenarioId,
      isPlaying: true,
      freeformMode: false,
      currentStep: 0,
    }),

  pauseScenario: () =>
    set({ isPlaying: false }),

  resetScenario: () =>
    set({
      activeScenario: null,
      isPlaying: false,
      currentStep: 0,
      freeformMode: true,
    }),

  setSpeed: (speed) =>
    set({ speed }),

  toggleFreeform: () =>
    set((state) => ({
      freeformMode: !state.freeformMode,
      activeScenario: state.freeformMode ? state.activeScenario : null,
      isPlaying: false,
      currentStep: 0,
    })),

  nextStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
    })),
}));
