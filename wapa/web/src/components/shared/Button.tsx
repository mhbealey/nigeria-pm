import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--wapa-green-500)] text-white',
    'hover:bg-[var(--wapa-green-400)]',
    'active:bg-[var(--wapa-green-600)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)] focus-visible:ring-offset-2',
    'shadow-[var(--shadow-sm)]',
  ].join(' '),
  secondary: [
    'border border-[var(--wapa-green-500)] text-[var(--wapa-green-600)] bg-transparent',
    'hover:bg-[var(--wapa-green-50)]',
    'active:bg-[var(--wapa-green-100)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)] focus-visible:ring-offset-2',
  ].join(' '),
  ghost: [
    'text-[var(--text-secondary)] bg-transparent',
    'hover:bg-[var(--slate-100)] hover:text-[var(--text-primary)]',
    'active:bg-[var(--slate-200)]',
    'focus-visible:ring-2 focus-visible:ring-[var(--slate-400)] focus-visible:ring-offset-2',
  ].join(' '),
  danger: [
    'bg-[var(--color-danger)] text-white',
    'hover:bg-red-400',
    'active:bg-red-600',
    'focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
    'shadow-[var(--shadow-sm)]',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-md)]',
  md: 'h-9 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
  lg: 'h-11 px-6 text-base gap-2.5 rounded-[var(--radius-lg)]',
};

const iconSizes: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-medium',
          'select-none outline-none transition-colors duration-[var(--duration-fast)]',
          'font-[var(--font-body)]',
          variantClasses[variant],
          sizeClasses[size],
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading ? (
          <Loader2 size={iconSizes[size]} className="animate-spin" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
