import type { ChatMessage } from '../types/message';

// ---------------------------------------------------------------------------
// WAPA DM — Onboarding / Trello connection flow
// ---------------------------------------------------------------------------
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
    content:
      "Hey! 👋 I'm WAPA — I bridge your WhatsApp group chats with your project management tools. No more switching between apps to update the board.",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 1000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'msg-2',
    content: 'What tool does your team use?',
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 2000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
    quickReplies: ['Trello', 'Google Sheets', 'Asana', 'Something else'],
  },
  {
    id: 'msg-3',
    content: 'Trello',
    direction: 'out',
    timestamp: new Date(Date.now() - 86400000 + 60000).toISOString(),
    readStatus: 'read',
  },
  {
    id: 'msg-4',
    content:
      "Great! Paste your Trello board URL and I'll connect it.",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 62000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'msg-5',
    content: 'trello.com/b/abc123/website-redesign',
    direction: 'out',
    timestamp: new Date(Date.now() - 86400000 + 120000).toISOString(),
    readStatus: 'read',
  },
  {
    id: 'msg-6',
    content:
      "Found it! 📋 *Website Redesign*\n4 lists: Todo (3) · In Progress (3) · Blocked (2) · Done (4)\n12 cards total.\n\nI'll keep this board in sync with your WhatsApp group. Add me to the group and I'll start listening! 👂",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 122000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
];

// ---------------------------------------------------------------------------
// "Website Redesign" group chat — recent history
// ---------------------------------------------------------------------------
export const groupMessages: ChatMessage[] = [
  {
    id: 'grp-1',
    content: 'I finished the hero section design 🎨',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    readStatus: 'read',
    senderName: 'Maya',
  },
  {
    id: 'grp-2',
    content: 'Looks great Maya! Shipping to staging now.',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 4.5).toISOString(),
    readStatus: 'read',
    senderName: 'Jordan',
  },
  {
    id: 'grp-3',
    content:
      '📌 Heads up from Trello — *Fix payment gateway* has been In Progress for 5 days and is now overdue.',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'grp-4',
    content: "I'll ping the client about those Stripe keys today.",
    direction: 'out',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    readStatus: 'read',
    senderName: 'Alex',
  },
  {
    id: 'grp-5',
    content: 'SEO tags are almost done, pushing tonight 🚀',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    readStatus: 'read',
    senderName: 'Sam',
  },
  {
    id: 'grp-6',
    content:
      '✓ Sam moved *Image optimization* → Done on Trello.\nSprint 4: 4/12 complete (33%)',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
    syncAction: {
      type: 'move',
      cardTitle: 'Image optimization',
      fromColumn: 'In Progress',
      toColumn: 'Done',
    },
  },
  {
    id: 'grp-7',
    content: 'Nice one Sam 👏 sprint is picking up speed',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    readStatus: 'read',
    senderName: 'Riley',
  },
];

// ---------------------------------------------------------------------------
// "Marketing Sprint" group chat
// ---------------------------------------------------------------------------
export const marketingMessages: ChatMessage[] = [
  {
    id: 'mkt-1',
    content:
      '📊 Sprint status from Trello — *Marketing Sprint 2*:\n✅ Done: 5/8 · 🔨 In Progress: 2 · 📝 Todo: 1',
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'mkt-2',
    content: 'Campaign metrics look great this week 📈 can we push the launch to next Friday?',
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    readStatus: 'read',
    senderName: 'Sam',
  },
  {
    id: 'mkt-3',
    content:
      '✓ Moved *Launch email campaign* → In Progress on Trello. Due date set to next Friday.',
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 60000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
    syncAction: {
      type: 'move',
      cardTitle: 'Launch email campaign',
      fromColumn: 'Todo',
      toColumn: 'In Progress',
    },
  },
];
