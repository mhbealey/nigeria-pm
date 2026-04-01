import { useCallback, useRef } from 'react';
import { useChatStore } from '../stores/chat-store';
import { calculateResponseDelay } from '../simulation/delay';

interface UseTypingSimulationReturn {
  startTyping: (responseText: string, speed?: number) => Promise<void>;
  cancelTyping: () => void;
}

/**
 * Hook that manages the typing indicator lifecycle.
 * Shows typing, waits a calculated delay, then hides typing.
 */
export function useTypingSimulation(): UseTypingSimulationReturn {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setTyping = useChatStore((s: { setTyping: (typing: boolean) => void }) => s.setTyping);

  const cancelTyping = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setTyping(false);
  }, [setTyping]);

  const startTyping = useCallback(
    (responseText: string, speed: number = 1): Promise<void> => {
      // Cancel any existing timer
      cancelTyping();

      return new Promise((resolve) => {
        setTyping(true);
        const delay = calculateResponseDelay(responseText, speed);
        timerRef.current = setTimeout(() => {
          setTyping(false);
          timerRef.current = null;
          resolve();
        }, delay);
      });
    },
    [setTyping, cancelTyping]
  );

  return { startTyping, cancelTyping };
}
