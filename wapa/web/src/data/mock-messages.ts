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
      "Found it! 📋 *Website Redesign*\n4 lists: Todo (2) · In Progress (3) · Blocked (1) · Done (4)\n9 cards total.\n\nI'll keep this board in sync with your WhatsApp group. Add me to the group and I'll start listening! 👂",
    direction: 'in',
    timestamp: new Date(Date.now() - 86400000 + 122000).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
  },
];

// ---------------------------------------------------------------------------
// "Website Redesign" group chat — pre-loaded v4 content
// ---------------------------------------------------------------------------
export const groupMessages: ChatMessage[] = [
  {
    id: 'grp-1',
    content: 'Hero section design is done! Just pushed the final version to staging 🎨',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    readStatus: 'read',
    senderName: 'Maya',
  },
  {
    id: 'grp-2',
    content: 'Looks amazing Maya 🔥 Shipping it to staging now.',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 2.8).toISOString(),
    readStatus: 'read',
    senderName: 'Jordan',
  },
  {
    id: 'grp-3',
    content:
      'Nice work Maya! Want me to mark *Hero section design* as Done on Trello?',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
    quickReplies: ['✅ Mark as Done', 'Not yet'],
  },
  {
    id: 'grp-4',
    content: "I'll ping the client about those Stripe API keys today. Payment gateway has been blocked too long.",
    direction: 'out',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    readStatus: 'read',
    senderName: 'Alex',
  },
  {
    id: 'grp-5',
    content: 'SEO tags are almost done, pushing tonight 🚀',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    readStatus: 'read',
    senderName: 'Sam',
  },
  {
    id: 'grp-6',
    content:
      '📌 Heads up — *Fix payment gateway* has been blocked for 5 days and is now overdue. Want me to escalate?',
    direction: 'in',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    readStatus: 'read',
    senderName: 'WAPA',
    quickReplies: ['Yes, ping them', "No, I'll handle it"],
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
