import { useState, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  children: ReactNode;
  className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--slate-800)] border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--slate-800)] border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--slate-800)] border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--slate-800)] border-y-transparent border-l-transparent',
};

const originMap: Record<TooltipPosition, string> = {
  top: 'bottom center',
  bottom: 'top center',
  left: 'right center',
  right: 'left center',
};

export function Tooltip({ content, position = 'top', delay = 200, children, className = '' }: TooltipProps) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleEnter = () => {
    timer.current = setTimeout(() => setShow(true), delay);
  };

  const handleLeave = () => {
    clearTimeout(timer.current);
    setShow(false);
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            style={{ transformOrigin: originMap[position] }}
            className={`absolute z-50 pointer-events-none ${positionClasses[position]}`}
          >
            <div className="bg-[var(--slate-800)] text-white text-xs px-2.5 py-1.5 rounded-[var(--radius-md)] whitespace-nowrap shadow-[var(--shadow-lg)] font-[var(--font-body)]">
              {content}
            </div>
            <span
              className={`absolute w-0 h-0 border-[4px] ${arrowClasses[position]}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Tooltip.displayName = 'Tooltip';
export default Tooltip;
