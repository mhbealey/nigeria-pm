import React, { useState, useRef, useCallback } from 'react';
import { Smile, Mic, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = 'Message',
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineHeight = 20;
    const maxLines = 4;
    const maxHeight = lineHeight * maxLines;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [text, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const hasText = text.trim().length > 0;

  return (
    <div
      className="flex items-end gap-2 px-2 py-2 shrink-0"
      style={{
        backgroundColor: '#f0f2f5',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Input container */}
      <div className="flex items-end flex-1 bg-white rounded-[24px] px-3 py-1.5">
        <button className="flex items-center justify-center w-8 h-8 shrink-0 mb-0.5">
          <Smile className="w-6 h-6 text-[#8696a0]" strokeWidth={1.5} />
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleInput();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none border-none outline-none bg-transparent text-[15px] leading-5 text-[#111b21] placeholder-[#8696a0] px-2 py-1.5 max-h-20 scrollbar-none"
          style={{ fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }}
        />
      </div>

      {/* Mic / Send button */}
      <AnimatePresence mode="wait">
        {hasText ? (
          <motion.button
            key="send"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onClick={handleSend}
            className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
            style={{ backgroundColor: '#00a884' }}
          >
            <Send className="w-5 h-5 text-white ml-0.5" strokeWidth={2} />
          </motion.button>
        ) : (
          <motion.button
            key="mic"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
            style={{ backgroundColor: '#00a884' }}
          >
            <Mic className="w-5 h-5 text-white" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInput;
