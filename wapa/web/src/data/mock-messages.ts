import type { ChatMessage } from '../types/message';

/** Initial chat history: 10 messages from "yesterday" showing project setup. */
export const mockMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    content: 'Hey WAPA! We need to set up the Website Redesign project.',
    direction: 'out',
    timestamp: '2026-03-31T09:00:00Z',
    readStatus: 'read',
    senderName: 'Alex Okonkwo',
  },
  {
    id: 'msg-2',
    content:
      "Hey Alex! \uD83D\uDC4B I've created the *Website Redesign* project for you. Want me to set up the first sprint?",
    direction: 'in',
    timestamp: '2026-03-31T09:00:03Z',
    readStatus: 'read',
    senderName: 'WAPA',
    quickReplies: ['Yes, create Sprint 4', 'Not yet'],
  },
  {
    id: 'msg-3',
    content: 'Yes, create Sprint 4',
    direction: 'out',
    timestamp: '2026-03-31T09:01:00Z',
    readStatus: 'read',
    senderName: 'Alex Okonkwo',
  },
  {
    id: 'msg-4',
    content:
      "\u2705 *Sprint 4* is live! Runs Mar 23 \u2013 Apr 5.\n\nLet's add some tasks. You can say things like:\n\u2022 \"add task: Design landing page\"\n\u2022 \"assign [task] to [person]\"",
    direction: 'in',
    timestamp: '2026-03-31T09:01:04Z',
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'msg-5',
    content: 'add task: Design landing page hero section',
    direction: 'out',
    timestamp: '2026-03-31T09:02:00Z',
    readStatus: 'read',
    senderName: 'Alex Okonkwo',
  },
  {
    id: 'msg-6',
    content:
      "\u2705 Task created \u2014 *Design landing page hero section*\nPriority: High | Due: Mar 27\n\nWho should I assign it to?",
    direction: 'in',
    timestamp: '2026-03-31T09:02:03Z',
    readStatus: 'read',
    senderName: 'WAPA',
    quickReplies: ['Maya', 'Me', 'Skip'],
  },
  {
    id: 'msg-7',
    content: 'assign it to Maya',
    direction: 'out',
    timestamp: '2026-03-31T09:02:30Z',
    readStatus: 'read',
    senderName: 'Alex Okonkwo',
  },
  {
    id: 'msg-8',
    content: "Done \u2014 Maya's on it \uD83D\uDC4D\n\nI'll let her know in the group chat.",
    direction: 'in',
    timestamp: '2026-03-31T09:02:33Z',
    readStatus: 'read',
    senderName: 'WAPA',
  },
  {
    id: 'msg-9',
    content: "how's the sprint looking?",
    direction: 'out',
    timestamp: '2026-03-31T14:00:00Z',
    readStatus: 'read',
    senderName: 'Alex Okonkwo',
  },
  {
    id: 'msg-10',
    content:
      "Sprint 4 is looking good! \uD83D\uDD25\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591 33%\n\n\u2705 Done: 4 | \uD83D\uDD04 In progress: 3 | \u2B1C Todo: 3 | \uD83D\uDEAB Blocked: 2\n\n5 days left \u2014 you've got this!",
    direction: 'in',
    timestamp: '2026-03-31T14:00:04Z',
    readStatus: 'read',
    senderName: 'WAPA',
    quickReplies: ['Show blocked tasks', 'My tasks', 'Add a task'],
  },
];

export const mockChats: ChatMessage['id'][] = mockMessages.map((m) => m.id);
