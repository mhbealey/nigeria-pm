import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import StatusBar from '../components/whatsapp/StatusBar';
import ChatHeader from '../components/whatsapp/ChatHeader';
import ChatInput from '../components/whatsapp/ChatInput';
import MessageBubble from '../components/whatsapp/MessageBubble';
import TypingIndicator from '../components/whatsapp/TypingIndicator';
import { DemoControls } from '../components/DemoControls';
import { mockMessages } from '../data/mock-messages';
import { calculateResponseDelay } from '../simulation/delay';
import type { ChatMessage } from '../types/message';

/* ---------- freeform responses (simple pattern matching) ---------- */

const freeformResponses: Array<{ pattern: RegExp; reply: string; quickReplies?: string[] }> = [
  { pattern: /add task[:\s]+(.+)/i, reply: 'Done -- *$1* created.\nPriority: Medium | Due: Apr 7', quickReplies: ['Assign it', 'Set priority', 'Add another'] },
  { pattern: /assign\s+(.+)\s+to\s+(.+)/i, reply: "Done -- $2's on it", quickReplies: ['My tasks', 'Sprint status'] },
  { pattern: /(sprint|progress|status)/i, reply: "Sprint 4 is on track!\n\n67% complete\nDone: 4 | In progress: 3 | Todo: 3 | Blocked: 2\n\n5 days left -- you've got this!", quickReplies: ['Show blocked', 'My tasks', 'Add a task'] },
  { pattern: /(my task|my plate|what.*(do|have))/i, reply: "Here's your plate:\n\n1. Build contact form -- due Apr 2\n2. Write E2E tests -- due Apr 6\n\n2 tasks, you're doing great!", quickReplies: ['Mark as done', 'Sprint status'] },
  { pattern: /(block|stuck)/i, reply: "Marked as blocked. I'll flag it for the team.\n\nWant to add a reason?", quickReplies: ['Add reason', 'Skip'] },
  { pattern: /(done|complete|finish)/i, reply: "Marked as done! 6 tasks left this sprint.", quickReplies: ['Sprint status', 'My tasks'] },
  { pattern: /(standup|daily)/i, reply: "Standup Summary for today:\n\nAlex: Completed dark mode\nMaya: Working on hero design\nJordan: Blocked on payment gateway\nSam: SEO tags in progress\nRiley: Starting analytics", quickReplies: ['Details', 'Sprint status'] },
  { pattern: /(hello|hey|hi|yo)/i, reply: "Hey! What can I help you with today?\n\nYou can try:\n- \"add task: [title]\"\n- \"how's the sprint?\"\n- \"my tasks\"", quickReplies: ['My tasks', 'Sprint status', 'Add a task'] },
  { pattern: /(help|what can)/i, reply: "Here's what I can do:\n\n- Create & assign tasks\n- Check sprint progress\n- Run standups\n- Track blockers\n- Show your workload\n\nJust type naturally!", quickReplies: ['Add a task', 'Sprint status'] },
];

function getResponse(text: string): { reply: string; quickReplies?: string[] } {
  for (const entry of freeformResponses) {
    const match = text.match(entry.pattern);
    if (match) {
      let reply = entry.reply;
      match.forEach((m, i) => {
        if (i > 0 && m) reply = reply.replace(`$${i}`, m.trim());
      });
      return { reply, quickReplies: entry.quickReplies };
    }
  }
  return {
    reply: "Got it! I'll keep that in mind.\n\nTry saying something like:\n- \"add task: Design the header\"\n- \"how's the sprint?\"",
    quickReplies: ['Add a task', 'Sprint status', 'My tasks'],
  };
}

/* ---------- scenarios ---------- */

interface ScenarioStep {
  dir: 'in' | 'out';
  text: string;
  quickReplies?: string[];
  delay: number;
}

const scenarios: Record<string, { label: string; steps: ScenarioStep[] }> = {
  onboarding: {
    label: 'Onboarding',
    steps: [
      { dir: 'out', text: 'Hey WAPA!', delay: 0 },
      { dir: 'in', text: "Hey! I'm WAPA, your project manager bot.\n\nI can help you manage tasks, sprints, and your team -- all right here in WhatsApp.\n\nWant me to set up your first project?", quickReplies: ['Yes, let\'s go!', 'Tell me more'], delay: 1200 },
      { dir: 'out', text: "Yes, let's go!", delay: 2000 },
      { dir: 'in', text: "What's your project called?", delay: 1000 },
      { dir: 'out', text: 'Website Redesign', delay: 1800 },
      { dir: 'in', text: "Done! *Website Redesign* is live.\n\nI've also created Sprint 1 for you (2 weeks).\n\nNow add your first task. Just say:\n\"add task: [what needs doing]\"", quickReplies: ['Add a task', 'Invite team'], delay: 1200 },
    ],
  },
  lifecycle: {
    label: 'Task Lifecycle',
    steps: [
      { dir: 'out', text: 'add task: Build payment integration', delay: 0 },
      { dir: 'in', text: 'Done -- *Build payment integration* created.\nPriority: High | Due: Apr 5\n\nWho should work on this?', quickReplies: ['Jordan', 'Me', 'Skip'], delay: 1000 },
      { dir: 'out', text: 'assign it to Jordan', delay: 2000 },
      { dir: 'in', text: "Done -- Jordan's on it.\nI'll let them know in the group.", delay: 1000 },
      { dir: 'out', text: 'payment integration is blocked by Stripe keys', delay: 2500 },
      { dir: 'in', text: "Marked as blocked.\n\nReason: Waiting for Stripe keys\nI'll flag this in the daily standup.", quickReplies: ['Sprint status', 'My tasks'], delay: 1200 },
      { dir: 'out', text: 'unblock payment -- keys received', delay: 2500 },
      { dir: 'in', text: "Unblocked! Moved back to *In Progress*.\nJordan has been notified.", delay: 1000 },
      { dir: 'out', text: 'done with payment integration', delay: 2000 },
      { dir: 'in', text: "Marked as done! Great work.\n\nSprint 4 is now at 42% -- 5 tasks left.", quickReplies: ['Sprint status', 'Add a task'], delay: 1200 },
    ],
  },
  standup: {
    label: 'Daily Standup',
    steps: [
      { dir: 'in', text: "Good morning team! Time for standup.\n\nWhat did you work on yesterday and what's planned for today?\n\n(Reply in the group or DM me)", delay: 0 },
      { dir: 'out', text: 'Yesterday: finished dark mode. Today: starting contact form', delay: 2000 },
      { dir: 'in', text: "Got it, Alex!\n\nHere's today's standup summary:\n\nAlex: dark mode -> contact form\nMaya: hero design (in progress)\nJordan: blocked on payment gateway\nSam: SEO tags\nRiley: analytics dashboard\n\n1 blocker -- payment gateway needs Stripe keys.", quickReplies: ['Details on blocker', 'Sprint status'], delay: 1500 },
    ],
  },
  sprint: {
    label: 'Sprint Complete',
    steps: [
      { dir: 'out', text: "how's the sprint looking?", delay: 0 },
      { dir: 'in', text: "Sprint 4 wraps up in 2 days!\n\n83% complete\nDone: 10 | In progress: 1 | Blocked: 1\n\nLooking great -- almost there!", quickReplies: ['Close sprint', 'Show remaining'], delay: 1200 },
      { dir: 'out', text: 'close sprint 4', delay: 2000 },
      { dir: 'in', text: "Sprint 4 is complete!\n\nFinal stats:\n- Completed: 10/12 tasks (83%)\n- Velocity: 14 points\n- Avg time: 1.6 days\n- 2 tasks carried over to Sprint 5\n\nSolid sprint, team!", quickReplies: ['Start Sprint 5', 'View report'], delay: 1500 },
    ],
  },
};

/* ---------- page ---------- */

export function DemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [...mockMessages]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [freeformMode, setFreeformMode] = useState(true);
  const [splitView, setSplitView] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scenarioTimer = useRef<ReturnType<typeof setTimeout>>();
  const scenarioStep = useRef(0);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* toggle theme */
  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    return () => document.body.setAttribute('data-theme', 'light');
  }, [darkMode]);

  /* add a message helper */
  const addMessage = useCallback((msg: Omit<ChatMessage, 'id' | 'timestamp' | 'readStatus'>) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      readStatus: msg.direction === 'out' ? 'read' : 'read',
      ...msg,
    };
    setMessages((prev) => [...prev, newMsg]);
  }, []);

  /* handle user send */
  const handleSend = useCallback(
    (text: string) => {
      addMessage({ content: text, direction: 'out', senderName: 'Alex Okonkwo' });

      if (freeformMode) {
        setIsTyping(true);
        const resp = getResponse(text);
        const delay = calculateResponseDelay(resp.reply, speed);
        setTimeout(() => {
          setIsTyping(false);
          addMessage({
            content: resp.reply,
            direction: 'in',
            senderName: 'WAPA',
            quickReplies: resp.quickReplies,
          });
        }, delay);
      }
    },
    [addMessage, freeformMode, speed],
  );

  /* handle quick reply */
  const handleQuickReply = useCallback(
    (reply: string) => {
      handleSend(reply);
    },
    [handleSend],
  );

  /* scenario playback */
  const playScenario = useCallback(
    (scenarioId: string) => {
      const scenario = scenarios[scenarioId];
      if (!scenario) return;

      setActiveScenario(scenarioId);
      setFreeformMode(false);
      setIsPlaying(true);
      scenarioStep.current = 0;

      const playNext = () => {
        const step = scenario.steps[scenarioStep.current];
        if (!step) {
          setIsPlaying(false);
          setFreeformMode(true);
          return;
        }

        const adjustedDelay = step.delay / speed;

        scenarioTimer.current = setTimeout(() => {
          if (step.dir === 'in') {
            setIsTyping(true);
            const typeDelay = calculateResponseDelay(step.text, speed);
            setTimeout(() => {
              setIsTyping(false);
              addMessage({
                content: step.text,
                direction: 'in',
                senderName: 'WAPA',
                quickReplies: step.quickReplies,
              });
              scenarioStep.current++;
              playNext();
            }, typeDelay);
          } else {
            addMessage({ content: step.text, direction: 'out', senderName: 'Alex Okonkwo' });
            scenarioStep.current++;
            playNext();
          }
        }, adjustedDelay);
      };

      playNext();
    },
    [addMessage, speed],
  );

  const resetDemo = useCallback(() => {
    if (scenarioTimer.current) clearTimeout(scenarioTimer.current);
    setMessages([...mockMessages]);
    setIsTyping(false);
    setIsPlaying(false);
    setActiveScenario('');
    setFreeformMode(true);
    scenarioStep.current = 0;
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      if (scenarioTimer.current) clearTimeout(scenarioTimer.current);
      setIsPlaying(false);
    } else if (activeScenario) {
      playScenario(activeScenario);
    }
  }, [isPlaying, activeScenario, playScenario]);

  /* ---------- render ---------- */

  const chatBg = darkMode ? '#0b141a' : '#efeae2';
  const chatPattern = darkMode
    ? 'none'
    : 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20h1v1h-1z\' fill=\'%23d4cfc6\' fill-opacity=\'.15\'/%3E%3C/svg%3E")';

  const chatWindow = (
    <div className="flex flex-col h-full overflow-hidden rounded-none md:rounded-[2rem]">
      <StatusBar />
      <ChatHeader name="WAPA - PM Bot" status="online" avatarText="W" />

      {/* messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5"
        style={{ backgroundColor: chatBg, backgroundImage: chatPattern }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            direction={msg.direction}
            content={msg.content}
            timestamp={new Date(msg.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
            readStatus={msg.readStatus}
            senderName={msg.direction === 'in' ? msg.senderName : undefined}
            quickReplies={msg.quickReplies}
            onQuickReply={handleQuickReply}
          />
        ))}
        <TypingIndicator visible={isTyping} />
      </div>

      <ChatInput onSend={handleSend} placeholder="Type a message..." />
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center relative ${darkMode ? 'bg-[#111b21]' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
      {/* Dashboard link */}
      <Link
        to="/dashboard"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
      >
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>

      {/* Main content */}
      <div className={`flex items-stretch w-full h-screen md:h-auto md:max-h-[90vh] ${splitView ? 'gap-0' : 'justify-center py-4'}`}>
        {/* Phone frame on desktop, full screen on mobile */}
        <div
          className={`flex flex-col ${
            splitView
              ? 'w-[60%] border-r border-gray-300'
              : 'w-full md:w-[390px] md:mx-auto'
          } h-full md:h-[780px] bg-white md:rounded-[2rem] md:shadow-2xl md:border-[6px] md:border-gray-900 overflow-hidden`}
        >
          {chatWindow}
        </div>

        {/* Split view -- dashboard preview */}
        <AnimatePresence>
          {splitView && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '40%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Live Dashboard</h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: 'Done', value: '4', color: 'bg-green-50 text-green-700' },
                    { label: 'In Progress', value: '3', color: 'bg-blue-50 text-blue-700' },
                    { label: 'Todo', value: '3', color: 'bg-gray-50 text-gray-700' },
                    { label: 'Blocked', value: '2', color: 'bg-red-50 text-red-700' },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs font-medium mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-3">Sprint 4 Progress</h3>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-[var(--wapa-green-500)] rounded-full transition-all duration-700" style={{ width: '33%' }} />
                </div>
                <p className="text-xs text-gray-500 mb-6">4 of 12 tasks complete</p>

                <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {[
                    'Alex completed "Dark mode support"',
                    'Jordan blocked on "Fix payment gateway"',
                    'Maya completed "Design landing page"',
                    'Riley started "Integrate analytics"',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--wapa-green-400)] mt-1.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Demo Controls */}
      <DemoControls
        scenarios={Object.entries(scenarios).map(([id, s]) => ({ id, label: s.label }))}
        activeScenario={activeScenario}
        isPlaying={isPlaying}
        speed={speed}
        freeformMode={freeformMode}
        splitView={splitView}
        darkMode={darkMode}
        onSelectScenario={playScenario}
        onTogglePlay={togglePlayPause}
        onReset={resetDemo}
        onSpeedChange={setSpeed}
        onToggleFreeform={() => {
          setFreeformMode(!freeformMode);
          if (isPlaying) {
            if (scenarioTimer.current) clearTimeout(scenarioTimer.current);
            setIsPlaying(false);
          }
        }}
        onToggleSplitView={() => setSplitView(!splitView)}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    </div>
  );
}
