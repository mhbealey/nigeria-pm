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
  placeholder = 'Type a message',
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
        backgroundColor: 'var(--wa-panel, #f0f2f5)',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Smiley icon */}
      <button className="flex items-center justify-center w-[52px] h-[52px] shrink-0">
        <Smile className="w-6 h-6" style={{ color: '#8696a0' }} strokeWidth={1.5} />
      </button>

      {/* Input field */}
      <div
        className="flex items-end flex-1"
        style={{
          backgroundColor: 'var(--wa-input-field-bg, var(--wa-input-bg, #ffffff))',
          borderRadius: '21px',
          padding: '0 12px',
        }}
      >
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
          className="flex-1 resize-none border-none outline-none bg-transparent max-h-20 scrollbar-none"
          style={{
            fontSize: '15px',
            lineHeight: '20px',
            color: 'var(--wa-primary-text, #111b21)',
            padding: '9px 0 11px',
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
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
            transition={{ duration: 0.15 }}
            onClick={handleSend}
            className="flex items-center justify-center shrink-0"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#00a884',
            }}
          >
            <Send
              className="w-5 h-5 text-white"
              strokeWidth={2}
              style={{ transform: 'rotate(-45deg)', marginLeft: '2px' }}
            />
          </motion.button>
        ) : (
          <motion.button
            key="mic"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center shrink-0"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#00a884',
            }}
          >
            <Mic className="w-5 h-5 text-white" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInput;
