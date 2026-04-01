import { useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
  className?: string;
}

export function Modal({ open, onClose, title, children, width = '480px', className = '' }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[var(--surface-overlay)]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`relative bg-[var(--surface-primary)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden ${className}`}
            style={{ width, maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 64px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--slate-200)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-display)]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {children}
            </div>

            {/* Close button if no title */}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
              >
                <X size={18} />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

Modal.displayName = 'Modal';
export default Modal;
