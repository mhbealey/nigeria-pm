import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';

interface UseAutoScrollReturn {
  containerRef: RefObject<HTMLDivElement | null>;
  showNewMessageIndicator: boolean;
  scrollToBottom: () => void;
}

/**
 * Hook that auto-scrolls a container to the bottom when dependencies change.
 * Pauses auto-scroll if the user has scrolled up more than 100px.
 * Shows a "new message" indicator when paused and new content arrives.
 */
export function useAutoScroll(deps: unknown[]): UseAutoScrollReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isUserScrolled, setIsUserScrolled] = useState(false);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      setIsUserScrolled(false);
      setShowNewMessageIndicator(false);
    }
  }, []);

  // Track user scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      const scrolledUp = distanceFromBottom > 100;
      setIsUserScrolled(scrolledUp);
      if (!scrolledUp) {
        setShowNewMessageIndicator(false);
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll or show indicator when deps change
  useEffect(() => {
    if (isUserScrolled) {
      setShowNewMessageIndicator(true);
    } else {
      // Use requestAnimationFrame so the DOM has time to render new content
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { containerRef, showNewMessageIndicator, scrollToBottom };
}
