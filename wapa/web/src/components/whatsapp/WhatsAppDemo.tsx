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
import TrelloBoard from './TrelloBoard';
import SyncToast from './SyncToast';
import { DemoControls } from './DemoControls';
import { initialMessages, groupMessages, marketingMessages } from '../../data/mock-messages';
import { SCENARIOS } from '../../data/scenarios';
import { processMessage, setToolName, clearPendingSuggestion } from '../../simulation/engine';
import { useSimulationStore } from '../../stores/simulation-store';
import { useBoardStore } from '../../stores/board-store';
import { playSound, setSoundEnabled } from '../../simulation/sounds';
import { calculateResponseDelay } from '../../simulation/delay';
import type { ChatMessage, ReadStatus } from '../../types/message';
import type { PMTool } from '../../types/board';

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
    id: 'website-redesign',
    name: 'Website Redesign',
    avatarText: 'WR',
    avatarColor: '#00a884',
    isGroup: true,
    messages: [...groupMessages],
    lastMessage: 'Want me to escalate?',
    timestamp: '9:41 AM',
    unreadCount: 2,
  },
  {
    id: 'wapa-dm',
    name: 'WAPA',
    avatarText: 'W',
    avatarColor: '#25d366',
    isGroup: false,
    messages: [...initialMessages],
    lastMessage: "I'll keep this board in sync...",
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
    lastMessage: 'WAPA: ✓ Moved Launch email...',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function createMessage(content: string, direction: 'in' | 'out', senderName?: string, quickReplies?: string[], syncAction?: ChatMessage['syncAction']): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    content,
    direction,
    timestamp: new Date().toISOString(),
    readStatus: direction === 'out' ? 'sent' : 'read',
    senderName: senderName || (direction === 'out' ? 'Alex Okonkwo' : 'WAPA'),
    quickReplies,
    syncAction,
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
  const [activeChatId, setActiveChatId] = useState('website-redesign'); // Group chat is primary
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [phoneFrame, setPhoneFrame] = useState(false); // Off by default for split view
  const [soundEnabled, setSoundEnabledState] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [showBoard, setShowBoard] = useState(true); // Board visible by default

  // Scenario state
  const [activeScenario, setActiveScenario] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Board store
  const boardStore = useBoardStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scenarioTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scenarioStep = useRef(0);

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

  // Auto-play standup scenario on first load
  const hasAutoPlayed = useRef(false);
  useEffect(() => {
    if (!hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      // Small delay to let the UI render first
      const timer = setTimeout(() => {
        playScenario('standup');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sound sync
  useEffect(() => {
    setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // Tool sync
  useEffect(() => {
    setToolName(boardStore.tool === 'trello' ? 'Trello' : 'Google Sheets');
  }, [boardStore.tool]);

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

  // Handle board sync after a response with syncAction
  const handleSyncAction = useCallback((syncAction: ChatMessage['syncAction']) => {
    if (!syncAction) return;
    // Refresh the board from simulation state
    boardStore.refreshBoard();
    // Add sync event for animation
    boardStore.addSyncEvent({
      type: syncAction.type,
      cardId: `card-sync-${Date.now()}`,
      cardTitle: syncAction.cardTitle,
      fromColumn: syncAction.fromColumn,
      toColumn: syncAction.toColumn,
    });
  }, [boardStore]);

  // Handle user send
  const handleSend = useCallback((text: string) => {
    const userMsg = createMessage(text, 'out');
    addMessage(userMsg);
    playSound('sent');

    // Animate read receipts
    setTimeout(() => updateReadStatus(userMsg.id, 'delivered'), 150);

    // Process with engine (for both DM and group — in group, WAPA only responds if relevant)
    if (activeChatId === 'wapa-dm' || activeChatId === 'website-redesign') {
      setIsTyping(true);
      const response = processMessage(text);
      const delay = calculateResponseDelay(response.text, speed);

      setTimeout(() => {
        setIsTyping(false);
        const wapaMsg = createMessage(response.text, 'in', 'WAPA', response.quickReplies, response.syncAction);
        addMessage(wapaMsg);
        playSound('received');

        setTimeout(() => updateReadStatus(userMsg.id, 'read'), 300);

        // Handle board sync
        if (response.syncAction) {
          handleSyncAction(response.syncAction);
        }

        if (response.isTaskComplete) playSound('complete');
        if (response.isSprintComplete) {
          playSound('complete');
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      }, delay);
    }
  }, [addMessage, activeChatId, speed, updateReadStatus, handleSyncAction]);

  // Handle quick reply
  const handleQuickReply = useCallback((reply: string) => {
    handleSend(reply);
  }, [handleSend]);

  // Scenario playback
  const playScenario = useCallback((scenarioId: string) => {
    const scenario = SCENARIOS[scenarioId];
    if (!scenario) return;

    // Switch to group chat for scenarios
    setActiveChatId('website-redesign');
    setActiveScenario(scenarioId);
    setIsPlaying(true);
    scenarioStep.current = 0;

    const executeStoreAction = (step: (typeof scenario.steps)[number]) => {
      if (!step.storeAction) return;
      const store = useSimulationStore.getState();
      const task = store.findTask(step.storeAction.taskQuery);
      if (!task) return;
      switch (step.storeAction.type) {
        case 'complete':
          store.completeTask(task.id);
          break;
        case 'block':
          store.blockTask(task.id, step.storeAction.reason);
          break;
        case 'unblock':
          store.unblockTask(task.id);
          break;
      }
    };

    const playNext = () => {
      const step = scenario.steps[scenarioStep.current];
      if (!step) {
        setIsPlaying(false);
        return;
      }

      const adjustedDelay = step.delay / speed;

      scenarioTimer.current = setTimeout(() => {
        if (step.dir === 'in' && step.senderName === 'WAPA') {
          // WAPA message: show typing first
          setIsTyping(true);
          const typeDelay = calculateResponseDelay(step.text, speed);
          setTimeout(() => {
            setIsTyping(false);
            const msg = createMessage(step.text, 'in', 'WAPA', step.quickReplies, step.syncAction);
            addMessage(msg);
            playSound('received');

            // Update simulation store first, then sync board
            executeStoreAction(step);
            if (step.syncAction) {
              handleSyncAction(step.syncAction);
            }

            // Sprint complete detection
            if (step.text.includes('That\'s ALL of them') || step.text.includes('is DONE!')) {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 3000);
            }

            scenarioStep.current++;
            playNext();
          }, typeDelay);
        } else {
          // Team member message (including user)
          const msg = createMessage(step.text, step.dir, step.senderName || 'Alex Okonkwo', step.quickReplies);
          addMessage(msg);
          if (step.dir === 'out') playSound('sent');
          scenarioStep.current++;
          playNext();
        }
      }, adjustedDelay);
    };

    playNext();
  }, [addMessage, speed, handleSyncAction]);

  const resetDemo = useCallback(() => {
    if (scenarioTimer.current) clearTimeout(scenarioTimer.current);
    setChats(INITIAL_CHATS.map(c => ({ ...c, messages: [...c.messages] })));
    setIsTyping(false);
    setIsPlaying(false);
    setActiveScenario('');
    setShowConfetti(false);
    scenarioStep.current = 0;
    useSimulationStore.getState().resetState();
    boardStore.resetBoard();
    clearPendingSuggestion();
  }, [boardStore]);

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
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
  }, []);

  const handleBack = useCallback(() => {
    setShowChatList(true);
  }, []);

  const handleToolChange = useCallback((tool: PMTool) => {
    boardStore.setTool(tool);
    setToolName(tool === 'trello' ? 'Trello' : 'Google Sheets');
  }, [boardStore]);

  // Responsive
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
            name={activeChat.isGroup ? activeChat.name : 'WAPA — PM Bridge'}
            status={activeChat.isGroup ? '5 members' : `connected to ${boardStore.tool === 'trello' ? 'Trello' : 'Sheets'}`}
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

      <Confetti show={showConfetti} />

      {/* Mobile sync toast */}
      {isMobile && <SyncToast events={boardStore.syncEvents} tool={boardStore.tool} />}
    </div>
  );

  /* ─── Board panel ─────────────────────────────────────────── */

  const boardPanel = showBoard && !isMobile && (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
      style={{ width: isTablet ? '35%' : '40%', flexShrink: 0 }}
    >
      <TrelloBoard
        columns={boardStore.columns}
        sprintName={boardStore.sprintName}
        sprintProgress={boardStore.sprintProgress}
        daysLeft={boardStore.daysLeft}
        syncEvents={boardStore.syncEvents}
        tool={boardStore.tool}
      />
    </motion.div>
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

  const scenarioList = Object.entries(SCENARIOS).map(([id, s]) => ({ id, label: s.label, description: s.description }));

  const outerBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-br from-[#f0f2f5] to-[#dfe3e8]';

  const demoControls = (
    <DemoControls
      scenarios={scenarioList}
      activeScenario={activeScenario}
      isPlaying={isPlaying}
      speed={speed}
      darkMode={darkMode}
      soundEnabled={soundEnabled}
      phoneFrame={phoneFrame}
      showBoard={showBoard}
      tool={boardStore.tool}
      onSelectScenario={(id) => { resetDemo(); playScenario(id); }}
      onTogglePlay={togglePlayPause}
      onReset={resetDemo}
      onSpeedChange={setSpeed}
      onToggleDarkMode={() => setDarkMode(!darkMode)}
      onToggleSound={() => setSoundEnabledState(!soundEnabled)}
      onTogglePhoneFrame={() => setPhoneFrame(!phoneFrame)}
      onToggleBoard={() => setShowBoard(!showBoard)}
      onToolChange={handleToolChange}
      onResetAll={resetDemo}
    />
  );

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
        {demoControls}
      </div>
    );
  }

  // Tablet: chat list + chat + optional board
  if (isTablet) {
    return (
      <div className={`h-screen w-screen flex ${outerBg}`}>
        <div className="w-[280px] shrink-0 h-full">
          <ChatList selectedChatId={activeChatId} onSelectChat={handleSelectChat} chats={chatListData} />
        </div>
        <div className="flex-1 h-full">{chatWindow}</div>
        <AnimatePresence>{boardPanel}</AnimatePresence>
        {demoControls}
      </div>
    );
  }

  // Desktop: phone frame mode OR split view with board
  if (phoneFrame) {
    return (
      <div className={`h-screen w-screen flex items-center justify-center gap-6 ${outerBg}`}>
        <PhoneFrame>{chatWindow}</PhoneFrame>
        <AnimatePresence>
          {showBoard && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{ height: 812, width: 420 }}
            >
              <TrelloBoard
                columns={boardStore.columns}
                sprintName={boardStore.sprintName}
                sprintProgress={boardStore.sprintProgress}
                daysLeft={boardStore.daysLeft}
                syncEvents={boardStore.syncEvents}
                tool={boardStore.tool}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {demoControls}
      </div>
    );
  }

  // Desktop: full split view — 60% WhatsApp / 40% board
  return (
    <div className={`h-screen w-screen flex ${outerBg}`}>
      <div style={{ width: showBoard ? '60%' : '100%', display: 'flex', transition: 'width 0.3s ease' }} className="h-full">
        <div className="w-[320px] shrink-0 h-full">
          <ChatList selectedChatId={activeChatId} onSelectChat={handleSelectChat} chats={chatListData} />
        </div>
        <div className="flex-1 h-full">{chatWindow}</div>
      </div>
      <AnimatePresence>{boardPanel}</AnimatePresence>
      {demoControls}
    </div>
  );
}
