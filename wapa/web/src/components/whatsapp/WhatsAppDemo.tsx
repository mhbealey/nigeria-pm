import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StatusBar from './StatusBar';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import DateDivider from './DateDivider';
import SystemMessage from './SystemMessage';
import PhoneFrame from './PhoneFrame';
import ChatList from './ChatList';
import Confetti from './Confetti';
import { DemoControls } from './DemoControls';
import { initialMessages, groupMessages, marketingMessages } from '../../data/mock-messages';
import { processMessage } from '../../simulation/engine';
import { useSimulationStore } from '../../stores/simulation-store';
import { playSound, setSoundEnabled, isSoundEnabled } from '../../simulation/sounds';
import { calculateResponseDelay } from '../../simulation/delay';
import type { ChatMessage, ReadStatus } from '../../types/message';

/* ─── Chat data ────────────────────────────────────────────── */

interface ChatData {
  id: string;
  name: string;
  avatarText: string;
  avatarColor: string;
  isGroup: boolean;
  messages: ChatMessage[];
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const INITIAL_CHATS: ChatData[] = [
  {
    id: 'wapa-dm',
    name: 'WAPA',
    avatarText: 'W',
    avatarColor: '#25d366',
    isGroup: false,
    messages: [...initialMessages],
    lastMessage: 'Want a quick tour, or just dive in?',
    timestamp: '9:41 AM',
    unreadCount: 2,
  },
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    avatarText: 'WR',
    avatarColor: '#00a884',
    isGroup: true,
    messages: [...groupMessages],
    lastMessage: 'Sam: SEO tags are almost done',
    timestamp: '9:30 AM',
    unreadCount: 0,
  },
  {
    id: 'marketing-sprint',
    name: 'Marketing Sprint',
    avatarText: 'MS',
    avatarColor: '#128c7e',
    isGroup: true,
    messages: [...marketingMessages],
    lastMessage: 'Sam: can we push the launch?',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
];

/* ─── Scenario data ─────────────────────────────────────────── */

interface ScenarioStep {
  dir: 'in' | 'out';
  text: string;
  quickReplies?: string[];
  delay: number;
}

const SCENARIOS: Record<string, { label: string; steps: ScenarioStep[] }> = {
  tour: {
    label: 'Quick Tour',
    steps: [
      { dir: 'out', text: 'Show me around', delay: 0 },
      { dir: 'in', text: "Here's the deal \u2014 you text me, I manage your projects. No apps. No dashboards. Just chat. \u{1F4AC}", delay: 1200 },
      { dir: 'in', text: "Try it \u2014 type something like:\n*add task: design the homepage*", delay: 800 },
      { dir: 'out', text: 'add task: design the homepage', delay: 2500 },
      { dir: 'in', text: "\u2705 *Design the homepage* \u2014 assigned to you, due in 5 days\nWant to set a priority?", quickReplies: ['Low', 'Medium', 'High', 'Urgent'], delay: 1200 },
      { dir: 'out', text: "how's the sprint", delay: 2000 },
      { dir: 'in', text: "\u{1F4CA} *Sprint 4: Website Redesign*\n\n\u2588\u2588\u2588\u2592\u2591\u2591\u2591\u2591\u2591\u2591 33%\n\n\u2705 4 done \u00B7 \u{1F504} 3 in progress \u00B7 \u{1F6AB} 2 blocked \u00B7 \u{1F4CB} 3 todo\n\n5 days left \u2014 let's push!", delay: 1500 },
      { dir: 'in', text: "That's the basics! Just text me like a teammate.\nType *help* anytime to see everything I can do \u{1F919}", delay: 800 },
    ],
  },
  lifecycle: {
    label: 'Task Lifecycle',
    steps: [
      { dir: 'out', text: 'add task: Build payment integration', delay: 0 },
      { dir: 'in', text: "\u2705 *Build payment integration* \u2014 assigned to you, due in 5 days\nWant to set a priority?", quickReplies: ['Low', 'Medium', 'High', 'Urgent'], delay: 1000 },
      { dir: 'out', text: 'assign it to Jordan', delay: 2000 },
      { dir: 'in', text: "Done \u2014 Jordan's on *Build payment integration* \u{1F44D}\nI'll let them know in the group chat.", delay: 1000 },
      { dir: 'out', text: 'Build payment integration is blocked by Stripe keys', delay: 2500 },
      { dir: 'in', text: "\u{1F6AB} *Build payment integration* is blocked \u2014 Stripe keys\nI'll flag it for the team.", quickReplies: ['Show blockers', 'Sprint status'], delay: 1200 },
      { dir: 'out', text: 'unblock Build payment integration', delay: 2500 },
      { dir: 'in', text: "Back in action \u2705 *Build payment integration* moved to in progress.", delay: 1000 },
      { dir: 'out', text: 'done with Build payment integration', delay: 2000 },
      { dir: 'in', text: "\u{1F389} Nice \u2014 *Build payment integration* is done!\nSprint 4: \u2588\u2588\u2588\u2588\u2592\u2591\u2591\u2591\u2591\u2591 38% \u2014 5 of 13 done\n8 tasks left \u{1F4AA}", quickReplies: ['My tasks', 'Sprint status'], delay: 1200 },
    ],
  },
  standup: {
    label: 'Morning Standup',
    steps: [
      { dir: 'in', text: "Good morning, Alex! \u2600\uFE0F\n\nHere's your day:\n\n\u{1F7E0} *Build contact form with validation* \u{1F504} \u2014 due in 1 days\n\u{1F7E1} *Implement responsive navigation* \u2014 due today\n\nLet's get it \u{1F4AA}", delay: 0 },
      { dir: 'out', text: "Yesterday: finished dark mode. Today: starting contact form", delay: 2000 },
      { dir: 'in', text: "Got it, Alex!\n\nStandup Summary for today:\n\nAlex: Completed Dark mode support \u2192 Working on Build contact form with validation\nMaya: Working on Optimize images and lazy loading \u{1F6AB} Blocked on Optimize images and lazy loading\nJordan: Working on Build contact form with validation\nSam: Working on SEO meta tags and sitemap\nRiley: Working on Integrate analytics dashboard\n\n2 blockers need attention.", quickReplies: ['Show blockers', 'Sprint status'], delay: 1500 },
    ],
  },
  sprint: {
    label: 'Sprint Wrap-Up',
    steps: [
      { dir: 'out', text: "how's the sprint looking?", delay: 0 },
      { dir: 'in', text: "\u{1F4CA} *Sprint 4: Website Redesign*\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2592\u2591 83%\n\n\u2705 10 done \u00B7 \u{1F504} 1 in progress \u00B7 \u{1F6AB} 0 blocked \u00B7 \u{1F4CB} 1 todo\n\n2 days left \u2014 almost there!", quickReplies: ['Show remaining', 'Close sprint'], delay: 1200 },
      { dir: 'out', text: 'done with E2E tests', delay: 2000 },
      { dir: 'in', text: "\u{1F389} Nice \u2014 *Write E2E tests for checkout* is done!\nSprint 4: \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2592 92% \u2014 11 of 12 done\n1 task left!", delay: 1200 },
      { dir: 'out', text: 'done with accessibility', delay: 2000 },
      { dir: 'in', text: "\u{1F389}\u{1F389}\u{1F389} That's ALL of them! Sprint 4 is DONE!\n\n\u2705 12/12 tasks complete\n\u26A1 Velocity: 12 pts\n\u{1F3C6} MVP: Alex \u2014 4 tasks\n\nIncredible work, team \u{1F680}", delay: 1500 },
    ],
  },
};

/* ─── Helpers ───────────────────────────────────────────────── */

function createMessage(content: string, direction: 'in' | 'out', senderName?: string, quickReplies?: string[]): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    content,
    direction,
    timestamp: new Date().toISOString(),
    readStatus: direction === 'out' ? 'sent' : 'read',
    senderName: senderName || (direction === 'out' ? 'Alex Okonkwo' : 'WAPA'),
    quickReplies,
  };
}

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function getDateLabel(ts: string): string | null {
  const d = new Date(ts);
  const now = new Date();
  const today = now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === today) return 'TODAY';
  if (d.toDateString() === yesterday.toDateString()) return 'YESTERDAY';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function shouldShowTail(messages: ChatMessage[], index: number): boolean {
  const next = messages[index + 1];
  if (!next) return true;
  if (next.isSystem) return true;
  return next.direction !== messages[index].direction;
}

/* ─── Main Component ────────────────────────────────────────── */

export default function WhatsAppDemo() {
  // State
  const [chats, setChats] = useState<ChatData[]>(() => INITIAL_CHATS.map(c => ({ ...c, messages: [...c.messages] })));
  const [activeChatId, setActiveChatId] = useState('wapa-dm');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [phoneFrame, setPhoneFrame] = useState(true);
  const [soundEnabled, setSoundEnabledState] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showChatList, setShowChatList] = useState(false);

  // Scenario state
  const [activeScenario, setActiveScenario] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scenarioTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scenarioStep = useRef(0);
  const readReceiptTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const activeChat = chats.find(c => c.id === activeChatId)!;

  // Theme sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('wapa-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages.length, isTyping, scrollToBottom]);

  // Sound sync
  useEffect(() => {
    setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // Add message to active chat
  const addMessage = useCallback((msg: ChatMessage) => {
    setChats(prev => prev.map(chat => {
      if (chat.id !== activeChatId) return chat;
      return {
        ...chat,
        messages: [...chat.messages, msg],
        lastMessage: msg.content.slice(0, 50),
        timestamp: formatTime(msg.timestamp),
        unreadCount: 0,
      };
    }));
  }, [activeChatId]);

  // Update read status
  const updateReadStatus = useCallback((msgId: string, status: ReadStatus) => {
    setChats(prev => prev.map(chat => ({
      ...chat,
      messages: chat.messages.map(m => m.id === msgId ? { ...m, readStatus: status } : m),
    })));
  }, []);

  // Handle user send
  const handleSend = useCallback((text: string) => {
    const userMsg = createMessage(text, 'out');
    addMessage(userMsg);
    playSound('sent');

    // Animate read receipts: sent → delivered → read
    setTimeout(() => updateReadStatus(userMsg.id, 'delivered'), 150);

    if (activeChatId === 'wapa-dm') {
      // Process with simulation engine
      setIsTyping(true);
      const response = processMessage(text);
      const delay = calculateResponseDelay(response.text, speed);

      setTimeout(() => {
        setIsTyping(false);
        const wapaMsg = createMessage(response.text, 'in', 'WAPA', response.quickReplies);
        addMessage(wapaMsg);
        playSound('received');

        // Blue read receipt on user's message
        setTimeout(() => updateReadStatus(userMsg.id, 'read'), 300);

        // Task complete sound + effects
        if (response.isTaskComplete) {
          playSound('complete');
        }
        if (response.isSprintComplete) {
          playSound('complete');
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }, delay);
    }
  }, [addMessage, activeChatId, speed, updateReadStatus]);

  // Handle quick reply
  const handleQuickReply = useCallback((reply: string) => {
    handleSend(reply);
  }, [handleSend]);

  // Scenario playback
  const playScenario = useCallback((scenarioId: string) => {
    const scenario = SCENARIOS[scenarioId];
    if (!scenario) return;

    setActiveScenario(scenarioId);
    setIsPlaying(true);
    scenarioStep.current = 0;

    const playNext = () => {
      const step = scenario.steps[scenarioStep.current];
      if (!step) {
        setIsPlaying(false);
        return;
      }

      const adjustedDelay = step.delay / speed;

      scenarioTimer.current = setTimeout(() => {
        if (step.dir === 'in') {
          setIsTyping(true);
          const typeDelay = calculateResponseDelay(step.text, speed);
          setTimeout(() => {
            setIsTyping(false);
            addMessage(createMessage(step.text, 'in', 'WAPA', step.quickReplies));
            playSound('received');
            scenarioStep.current++;
            playNext();
          }, typeDelay);
        } else {
          addMessage(createMessage(step.text, 'out'));
          playSound('sent');
          scenarioStep.current++;
          playNext();
        }
      }, adjustedDelay);
    };

    playNext();
  }, [addMessage, speed]);

  const resetDemo = useCallback(() => {
    if (scenarioTimer.current) clearTimeout(scenarioTimer.current);
    if (readReceiptTimer.current) clearTimeout(readReceiptTimer.current);
    setChats(INITIAL_CHATS.map(c => ({ ...c, messages: [...c.messages] })));
    setIsTyping(false);
    setIsPlaying(false);
    setActiveScenario('');
    setShowConfetti(false);
    scenarioStep.current = 0;
    useSimulationStore.getState().resetState();
  }, []);

  const resetAll = useCallback(() => {
    resetDemo();
    useSimulationStore.getState().resetState();
  }, [resetDemo]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      if (scenarioTimer.current) clearTimeout(scenarioTimer.current);
      setIsPlaying(false);
    } else if (activeScenario) {
      playScenario(activeScenario);
    }
  }, [isPlaying, activeScenario, playScenario]);

  const handleSelectChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
    setShowChatList(false);
    // Clear unread
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
  }, []);

  const handleBack = useCallback(() => {
    setShowChatList(true);
  }, []);

  // Responsive: detect mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ─── Render messages ──────────────────────────────────────── */

  let lastDateLabel: string | null = null;

  const renderedMessages = activeChat.messages.map((msg, i) => {
    const dateLabel = getDateLabel(msg.timestamp);
    const showDate = dateLabel && dateLabel !== lastDateLabel;
    if (dateLabel) lastDateLabel = dateLabel;
    const showTail = shouldShowTail(activeChat.messages, i);

    return (
      <React.Fragment key={msg.id}>
        {showDate && <DateDivider date={dateLabel!} />}
        {msg.isSystem ? (
          <SystemMessage text={msg.content} />
        ) : (
          <MessageBubble
            direction={msg.direction}
            content={msg.content}
            timestamp={formatTime(msg.timestamp)}
            readStatus={msg.readStatus}
            showTail={showTail}
            senderName={activeChat.isGroup && msg.direction === 'in' ? msg.senderName : (msg.direction === 'in' ? msg.senderName : undefined)}
            quickReplies={msg.quickReplies}
            onQuickReply={handleQuickReply}
          />
        )}
      </React.Fragment>
    );
  });

  /* ─── Chat window ──────────────────────────────────────────── */

  const chatWindow = (
    <div className="flex flex-col h-full w-full overflow-hidden relative" style={{ fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif" }}>
      {(!isMobile || !showChatList) && (
        <>
          <StatusBar light />
          <ChatHeader
            name={activeChat.isGroup ? activeChat.name : 'WAPA - PM Bot'}
            status={activeChat.isGroup ? `${activeChat.isGroup ? '5' : ''} members` : 'online'}
            avatarText={activeChat.avatarText}
            avatarColor={activeChat.avatarColor}
            onBack={(isMobile || isTablet) ? handleBack : undefined}
          />
        </>
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 wa-chat-bg"
      >
        {renderedMessages}
        <TypingIndicator visible={isTyping} />
      </div>

      {(!isMobile || !showChatList) && (
        <ChatInput onSend={handleSend} placeholder="Type a message" />
      )}

      {/* Confetti overlay */}
      <Confetti show={showConfetti} />
    </div>
  );

  /* ─── Layout ───────────────────────────────────────────────── */

  const chatListData = chats.map(c => ({
    id: c.id,
    name: c.name,
    avatarText: c.avatarText,
    avatarColor: c.avatarColor,
    lastMessage: c.lastMessage,
    timestamp: c.timestamp,
    unreadCount: c.unreadCount,
    isGroup: c.isGroup,
  }));

  const scenarioList = Object.entries(SCENARIOS).map(([id, s]) => ({ id, label: s.label }));

  const outerBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-br from-[#f0f2f5] to-[#dfe3e8]';

  // Mobile: full screen chat or chat list
  if (isMobile) {
    return (
      <div className={`h-screen w-screen ${outerBg}`}>
        <AnimatePresence mode="wait">
          {showChatList ? (
            <motion.div
              key="chatlist"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <ChatList
                selectedChatId={activeChatId}
                onSelectChat={handleSelectChat}
                chats={chatListData}
              />
            </motion.div>
          ) : (
            <motion.div
              key="chatwindow"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {chatWindow}
            </motion.div>
          )}
        </AnimatePresence>

        <DemoControls
          scenarios={scenarioList}
          activeScenario={activeScenario}
          isPlaying={isPlaying}
          speed={speed}
          darkMode={darkMode}
          soundEnabled={soundEnabled}
          phoneFrame={phoneFrame}
          onSelectScenario={(id) => { resetDemo(); playScenario(id); }}
          onTogglePlay={togglePlayPause}
          onReset={resetDemo}
          onSpeedChange={setSpeed}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onToggleSound={() => setSoundEnabledState(!soundEnabled)}
          onTogglePhoneFrame={() => setPhoneFrame(!phoneFrame)}
          onResetAll={resetAll}
        />
      </div>
    );
  }

  // Tablet: side-by-side chat list + chat
  if (isTablet) {
    return (
      <div className={`h-screen w-screen flex ${outerBg}`}>
        <div className="w-[300px] shrink-0 h-full">
          <ChatList
            selectedChatId={activeChatId}
            onSelectChat={handleSelectChat}
            chats={chatListData}
          />
        </div>
        <div className="flex-1 h-full">
          {chatWindow}
        </div>

        <DemoControls
          scenarios={scenarioList}
          activeScenario={activeScenario}
          isPlaying={isPlaying}
          speed={speed}
          darkMode={darkMode}
          soundEnabled={soundEnabled}
          phoneFrame={phoneFrame}
          onSelectScenario={(id) => { resetDemo(); playScenario(id); }}
          onTogglePlay={togglePlayPause}
          onReset={resetDemo}
          onSpeedChange={setSpeed}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onToggleSound={() => setSoundEnabledState(!soundEnabled)}
          onTogglePhoneFrame={() => setPhoneFrame(!phoneFrame)}
          onResetAll={resetAll}
        />
      </div>
    );
  }

  // Desktop: phone frame or full-width
  return (
    <div className={`h-screen w-screen flex items-center justify-center ${outerBg}`}>
      {phoneFrame ? (
        <PhoneFrame>
          {chatWindow}
        </PhoneFrame>
      ) : (
        <div className="flex h-screen w-screen">
          <div className="w-[360px] shrink-0 h-full">
            <ChatList
              selectedChatId={activeChatId}
              onSelectChat={handleSelectChat}
              chats={chatListData}
            />
          </div>
          <div className="flex-1 h-full">
            {chatWindow}
          </div>
        </div>
      )}

      <DemoControls
        scenarios={scenarioList}
        activeScenario={activeScenario}
        isPlaying={isPlaying}
        speed={speed}
        darkMode={darkMode}
        soundEnabled={soundEnabled}
        phoneFrame={phoneFrame}
        onSelectScenario={(id) => { resetDemo(); playScenario(id); }}
        onTogglePlay={togglePlayPause}
        onReset={resetDemo}
        onSpeedChange={setSpeed}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleSound={() => setSoundEnabledState(!soundEnabled)}
        onTogglePhoneFrame={() => setPhoneFrame(!phoneFrame)}
        onResetAll={resetAll}
      />
    </div>
  );
}
