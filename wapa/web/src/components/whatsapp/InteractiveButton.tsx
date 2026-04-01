import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveButtonProps {
  label: string;
  onClick: (label: string) => void;
  disabled?: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled || clicked) return;
    setClicked(true);
    onClick(label);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={handleClick}
      disabled={disabled || clicked}
      className="px-4 py-2 rounded-full text-[14px] font-medium transition-colors duration-200 border"
      style={{
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        borderColor: '#00a884',
        backgroundColor: clicked ? '#00a884' : 'transparent',
        color: clicked ? '#ffffff' : '#00a884',
        cursor: disabled || clicked ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </motion.button>
  );
};

export default InteractiveButton;
