import { useEffect, useState, useCallback, createContext, useContext, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

type ToastVariant = 'success' | 'error';

interface ToastData {
  id: string;
  variant: ToastVariant;
  message: string;
}

interface ToastContextValue {
  toast: (variant: ToastVariant, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((variant: ToastVariant, message: string) => {
    const id = `toast-${++counter}`;
    setToasts((prev) => [...prev, { id, variant, message }]);
    setTimeout(() => dismiss(id), 3000);
  }, [dismiss]);

  const value: ToastContextValue = {
    toast,
    success: (msg) => toast('success', msg),
    error: (msg) => toast('error', msg),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} data={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/* ---------- Single Toast ---------- */

interface ToastItemProps {
  data: ToastData;
  onDismiss: () => void;
}

function ToastItem({ data, onDismiss }: ToastItemProps) {
  const isSuccess = data.variant === 'success';
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] bg-[var(--surface-primary)] border ${
        isSuccess ? 'border-[var(--wapa-green-200)]' : 'border-red-200'
      }`}
      style={{ minWidth: 280, maxWidth: 400 }}
    >
      <Icon
        size={18}
        className={isSuccess ? 'text-[var(--wapa-green-500)] shrink-0' : 'text-[var(--color-danger)] shrink-0'}
      />
      <p className="text-sm text-[var(--text-primary)] flex-1">{data.message}</p>
      <button
        onClick={onDismiss}
        className="p-1 rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-colors shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default ToastProvider;
