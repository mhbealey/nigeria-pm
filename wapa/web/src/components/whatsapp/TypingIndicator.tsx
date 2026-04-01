import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingIndicatorProps {
  visible: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.1 }}
          className="flex items-start mb-1"
        >
          <div
            className="relative px-4 py-3 shadow-sm"
            style={{
              backgroundColor: 'var(--wa-bubble-in, #ffffff)',
              borderRadius: '18px 18px 18px 4px',
            }}
          >
            {/* Tail on bottom-left */}
            <svg
              className="absolute"
              style={{ bottom: 0, left: -6 }}
              width="12"
              height="14"
              viewBox="0 0 12 14"
            >
              <path
                d="M6 14C6 14 0 10 0 6L6 0C6 4 6 9 12 14H6Z"
                fill="var(--wa-bubble-in, #ffffff)"
              />
            </svg>

            <div className="flex items-center gap-[5px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#8696a0',
                  }}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingIndicator;
