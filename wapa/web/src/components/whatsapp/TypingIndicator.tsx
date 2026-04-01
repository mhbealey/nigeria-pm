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
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="flex items-start mb-1"
        >
          <div
            className="rounded-[18px_18px_18px_4px] px-4 py-3 shadow-sm relative"
            style={{ backgroundColor: '#ffffff' }}
          >
            {/* Tail */}
            <div
              className="absolute bottom-0 left-[-6px]"
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 8px 10px 0',
                borderColor: 'transparent transparent #ffffff transparent',
              }}
            />
            <div className="flex items-center gap-[5px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#8696a0' }}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
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
