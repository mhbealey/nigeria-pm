import type { ChatMessage } from '../types/message';

/** Short pre-loaded history — just enough to show context */
export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-sys-1',
    content: 'WAPA was added to the chat',
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    readStatus: 'read',
    isSystem: true,
  },
  {
    id: 'msg-1',
    content: "Hey! \u{1F44B} I'm WAPA \u2014 your project management sidekick, right here in WhatsApp.",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 1000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'msg-2',
    content: "What should I call you?",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 2000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'msg-3',
    content: 'Alex',
    direction: 'out',
    timestamp: new Date(Date.now() - 86400000 + 60000).toISOString(),
    readStatus: 'read',
    senderName: 'Alex Okonkwo',
  },
  {
    id: 'msg-4',
    content: "Nice to meet you, Alex! \u{1F64C}\nWant a quick tour, or just dive in?",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 62000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
    quickReplies: ['Show me around', "Let's go"],
  },
];

/** Group chat messages for Website Redesign */
export const groupMessages: ChatMessage[] = [
  {
    id: 'grp-1',
    content: "I finished the hero section design \u{1F3A8}",
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    readStatus: 'read',
    senderName: 'Maya',
  },
  {
    id: 'grp-2',
    content: "Looks amazing! Shipping to staging now",
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    readStatus: 'read',
    senderName: 'Jordan',
  },
  {
    id: 'grp-3',
    content: "\u{1F6AB} *Fix payment gateway* is blocked \u2014 waiting on Stripe API keys",
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'grp-4',
    content: "I'll ping the client about those keys",
    direction: 'out',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    readStatus: 'read',
    senderName: 'Alex Okonkwo',
  },
  {
    id: 'grp-5',
    content: "SEO tags are almost done, pushing tonight",
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    readStatus: 'read',
    senderName: 'Sam',
  },
];

/** Marketing Sprint group messages */
export const marketingMessages: ChatMessage[] = [
  {
    id: 'mkt-1',
    content: "The campaign metrics look great this week \u{1F4C8}",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    readStatus: 'read',
    senderName: 'Sam',
  },
  {
    id: 'mkt-2',
    content: "Can we push the launch to next Friday?",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    readStatus: 'read',
    senderName: 'Sam',
  },
];
