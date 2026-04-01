import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface InteractiveButtonProps {
  label: string;
  onClick: (label: string) => void;
  disabled?: boolean;
  /** When set, all buttons in the group fade out after any click */
  groupClicked?: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  label,
  onClick,
  disabled = false,
  groupClicked = false,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled || clicked || groupClicked) return;
    setClicked(true);
    onClick(label);
  }, [disabled, clicked, groupClicked, label, onClick]);

  const isDisabled = disabled || clicked || groupClicked;
  const isFilled = clicked;

  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      onClick={handleClick}
      disabled={isDisabled}
      animate={{
        opacity: groupClicked && !clicked ? 0 : 1,
      }}
      transition={{ duration: 0.15 }}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 500,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: '8px 16px',
        borderRadius: '7.5px',
        border: '1px solid #00a884',
        backgroundColor: isFilled ? '#00a884' : 'transparent',
        color: isFilled ? '#ffffff' : '#00a884',
        cursor: isDisabled ? 'default' : 'pointer',
        transition: 'background-color 100ms ease, color 100ms ease',
        outline: 'none',
      }}
    >
      {label}
    </motion.button>
  );
};

export default InteractiveButton;
