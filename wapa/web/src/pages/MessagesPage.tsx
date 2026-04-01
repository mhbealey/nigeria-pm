import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { recentMessages, users } from '../lib/mock-data';

interface ChatBubble {
  id: string;
  content: string;
  direction: 'inbound' | 'outbound';
  timestamp: string;
  userName: string;
}

const mockResponses = [
  "Got it! I'll update that for you right away.",
  "Task created and assigned. Due date set for next Friday.",
  "Sprint 4 progress:\n\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591 42%\n\nYou're making great progress!",
  "Done! I've marked that task as complete.",
  "Here's your summary:\n\n1. 3 tasks in progress\n2. 2 blocked items need attention\n3. Sprint ends in 5 days",
  "I've notified the team. They'll get a WhatsApp ping shortly.",
  "Noted! I've added that as a blocker on the task.",
];

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
}

function seedMessages(): ChatBubble[] {
  return recentMessages.map((m) => ({
    id: m.id,
    content: m.content,
    direction: m.direction,
    timestamp: m.timestamp,
    userName: m.user.name,
  }));
}

export function MessagesPage() {
  const [messages, setMessages] = useState<ChatBubble[]>(seedMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const now = new Date().toISOString();
    const userMsg: ChatBubble = {
      id: `user-${Date.now()}`,
      content: text,
      direction: 'inbound',
      timestamp: now,
      userName: users[0].name,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const botMsg: ChatBubble = {
        id: `bot-${Date.now()}`,
        content: response,
        direction: 'outbound',
        timestamp: new Date().toISOString(),
        userName: 'WAPA',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);

    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* WhatsApp-style Header */}
      <div className="bg-[#075e54] px-6 py-4 flex items-center gap-3 shadow-md">
        <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-white font-bold text-base">WAPA Bot</h2>
          <p className="text-green-200 text-xs">Online - WhatsApp Project Manager</p>
        </div>
      </div>

      {/* Chat Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ backgroundColor: '#ece5dd', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4cfc4\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      >
        {/* Date stamp */}
        <div className="flex justify-center mb-2">
          <span className="bg-white/80 text-xs text-gray-600 px-3 py-1 rounded-full shadow-sm">
            Today
          </span>
        </div>

        {messages.map((msg) => {
          const isOutbound = msg.direction === 'outbound';
          return (
            <div
              key={msg.id}
              className={`flex ${isOutbound ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 shadow-sm ${
                  isOutbound
                    ? 'bg-white rounded-tl-none'
                    : 'bg-[#dcf8c6] rounded-tr-none'
                }`}
              >
                {isOutbound && (
                  <p className="text-xs font-semibold text-[#075e54] mb-0.5">WAPA</p>
                )}
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-[10px] mt-1 text-right ${isOutbound ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="bg-[#f0f0f0] px-4 py-3 flex items-center gap-3 border-t border-gray-300">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm border border-gray-300 focus:outline-none focus:border-[#075e54] focus:ring-1 focus:ring-[#075e54] transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-[#075e54] flex items-center justify-center text-white hover:bg-[#064e46] disabled:opacity-40 transition-colors"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
