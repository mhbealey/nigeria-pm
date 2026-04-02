export interface ScenarioStep {
  dir: 'in' | 'out';
  text: string;
  senderName?: string;
  quickReplies?: string[];
  delay: number;
  /** If this step triggers a board sync animation */
  syncAction?: {
    type: 'move' | 'create' | 'update';
    cardTitle: string;
    fromColumn?: string;
    toColumn: string;
  };
  /** If set, also update simulation store (e.g. complete a task) */
  storeAction?: {
    type: 'complete' | 'block' | 'unblock';
    taskQuery: string;
    reason?: string;
  };
}

export interface Scenario {
  id: string;
  label: string;
  description: string;
  steps: ScenarioStep[];
}

export const SCENARIOS: Record<string, Scenario> = {
  standup: {
    id: 'standup',
    label: 'Morning Standup',
    description:
      'WAPA kicks off the daily standup with a Trello sprint summary. Maya finishes the hero section and the board syncs live.',
    steps: [
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '☀️ *Morning standup — Sprint 4 from Trello:*\n\n📋 9 cards total\n✅ Done: 4 · 🔨 In Progress: 3 · 📝 Todo: 2\n⏰ Overdue: *Fix payment gateway* (2 days)\n\nWhat\'s the latest, team?',
        delay: 0,
      },
      {
        dir: 'in',
        senderName: 'Maya',
        text: 'Hero section design is done! Just pushed to staging 🎉',
        delay: 2000,
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'Looks amazing, shipping it now 🚀',
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Great job Maya! Want me to move *Hero section design* to Done on Trello?',
        quickReplies: ['✅ Yes', 'Not yet'],
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'Maya',
        text: '✅ Yes',
        delay: 2000,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *Hero section design* → Done on Trello.\nSprint 4: 5/9 complete (56%)',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'Hero section design',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
        storeAction: {
          type: 'complete',
          taskQuery: 'API integration',
        },
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: 'SEO tags almost wrapped up, pushing tonight 🚀',
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '📌 Reminder — *Fix payment gateway* has been blocked for 5 days and is overdue. Waiting on Stripe API keys.\n\nWant me to ping the team?',
        quickReplies: ['Yes, ping them', "No, I'll handle it"],
        delay: 1500,
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: "No, I'll handle it — pinging the client about Stripe keys today.",
        delay: 2000,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Got it, it\'s all yours. 💪 I\'ll check back if it stays blocked another 48h.',
        delay: 1200,
      },
    ],
  },

  sync: {
    id: 'sync',
    label: 'Quick Sync',
    description:
      'Mid-day chat where tasks get completed and WAPA keeps Trello up to date in real time.',
    steps: [
      {
        dir: 'in',
        senderName: 'Sam',
        text: 'SEO tags are done, deploying now 🚀',
        delay: 0,
      },
      {
        dir: 'in',
        senderName: 'Riley',
        text: 'Let\'s gooo 🔥',
        delay: 1100,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Sam, looks like *SEO meta tags* is In Progress on Trello. Want me to move it to Done?',
        quickReplies: ['✅ Move it', 'Not yet'],
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: '✅ Move it',
        delay: 1800,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *SEO meta tags* → Done on Trello.\nSprint 4: 5/9 complete (56%) — over halfway!',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'SEO meta tags',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
        storeAction: {
          type: 'complete',
          taskQuery: 'SEO meta tags',
        },
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'Payment gateway is still blocked. Client hasn\'t responded about the Stripe keys 😩',
        delay: 2500,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '*Fix payment gateway* is already flagged as Blocked on Trello. Want me to add a follow-up note?',
        quickReplies: ['Yes, add note', 'Skip'],
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'Yes, add note',
        delay: 1400,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Updated *Fix payment gateway* on Trello — added note: "Follow-up sent to client re: Stripe keys"',
        delay: 1200,
        syncAction: {
          type: 'update',
          cardTitle: 'Fix payment gateway',
          toColumn: 'Blocked',
        },
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: '@wapa my tasks',
        delay: 2200,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '📋 Alex, here are your tasks from Trello:\n\n🟡 *Logo redesign* — Done ✅\n🟡 *Color palette update* — Done ✅\n\nAll done! You\'re clear. 🎉',
        delay: 1500,
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Thanks WAPA! I\'ll pick up E2E tests next 👍',
        delay: 1800,
      },
    ],
  },

  scope: {
    id: 'scope',
    label: 'Scope Decision',
    description:
      'The team decides to cut analytics from the sprint. WAPA moves it to Backlog on Trello.',
    steps: [
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Team — should we cut analytics setup from this sprint? It\'s a nice-to-have and we\'re running low on time.',
        delay: 0,
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: 'Yeah it\'s not critical. Let\'s push it to next sprint.',
        delay: 2000,
      },
      {
        dir: 'in',
        senderName: 'Maya',
        text: 'Agreed. Better to ship solid than rush it.',
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: '👍 makes sense',
        delay: 1200,
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: '@wapa move analytics setup to backlog',
        delay: 1800,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *Analytics setup* → Backlog on Trello.\nSprint 4 is now 4/8 (50%) — tighter scope, faster ship. 🚢',
        delay: 1500,
        syncAction: {
          type: 'move',
          cardTitle: 'Analytics setup',
          fromColumn: 'Todo',
          toColumn: 'Backlog',
        },
        storeAction: {
          type: 'complete',
          taskQuery: 'Analytics setup',
        },
      },
      {
        dir: 'in',
        senderName: 'Riley',
        text: 'Good call. I\'ll focus on getting E2E tests done this week.',
        delay: 2000,
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: 'SEO meta tags are done btw, forgot to mention 😅',
        delay: 2200,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Sam, want me to move *SEO meta tags* to Done on Trello?',
        quickReplies: ['✅ Yes', 'Not yet'],
        delay: 1400,
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: '✅ Yes',
        delay: 1600,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *SEO meta tags* → Done on Trello.\nSprint 4: 5/8 complete (63%) — strong progress!',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'SEO meta tags',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
        storeAction: {
          type: 'complete',
          taskQuery: 'SEO meta tags',
        },
      },
    ],
  },

  finish: {
    id: 'finish',
    label: 'Sprint Finish',
    description:
      'The sprint wraps up. Last tasks close out and WAPA celebrates with Trello stats.',
    steps: [
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '📊 *Sprint 4 status from Trello:*\n\n✅ Done: 7/9 (78%)\n🔨 In Progress: *Write E2E tests*\n🚫 Blocked: *Fix payment gateway*\n\nAlmost there team — 2 cards left!',
        delay: 0,
      },
      {
        dir: 'in',
        senderName: 'Riley',
        text: 'E2E tests are all passing! ✅ Marking it done.',
        delay: 2000,
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: 'Riley you absolute legend 🙌',
        delay: 1200,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Riley, want me to move *Write E2E tests* to Done on Trello?',
        quickReplies: ['✅ Yes!', 'Hold on'],
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'Riley',
        text: '✅ Yes!',
        delay: 1400,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *Write E2E tests* → Done on Trello.\nSprint 4: 8/9 complete (89%) — ONE card left!',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'Write E2E tests',
          fromColumn: 'Todo',
          toColumn: 'Done',
        },
        storeAction: {
          type: 'complete',
          taskQuery: 'Write E2E tests',
        },
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Client just sent the Stripe keys! Unblocking payment gateway now.',
        delay: 2500,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Move *Fix payment gateway* from Blocked → In Progress on Trello?',
        quickReplies: ['✅ Yes', 'Leave it'],
        delay: 1500,
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: '✅ Yes',
        delay: 1400,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *Fix payment gateway* → In Progress on Trello. Let\'s close this out! 🔥',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'Fix payment gateway',
          fromColumn: 'Blocked',
          toColumn: 'In Progress',
        },
        storeAction: {
          type: 'unblock',
          taskQuery: 'Fix payment gateway',
        },
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Payment gateway is fixed! @wapa mark fix payment gateway as done',
        delay: 3000,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '🎉🎉🎉 That\'s ALL of them! Sprint 4 is DONE!\n\n*9/9 complete on Trello* — 100%\n\n📈 Sprint stats:\n• Velocity: 9 cards in 2 weeks\n• MVP features shipped: 6\n\nIncredible work team. Time to ship it! 🚀',
        delay: 1500,
        syncAction: {
          type: 'move',
          cardTitle: 'Fix payment gateway',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
        storeAction: {
          type: 'complete',
          taskQuery: 'Fix payment gateway',
        },
      },
      {
        dir: 'in',
        senderName: 'Maya',
        text: 'WE DID IT 🥳🥳🥳',
        delay: 1800,
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'Best sprint yet. Drinks on me Friday 🍻',
        delay: 1400,
      },
      {
        dir: 'in',
        senderName: 'Riley',
        text: 'This team is unreal. Let\'s gooo!',
        delay: 1200,
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Proud of everyone. Let\'s plan the retro for Monday 💪',
        delay: 2000,
      },
    ],
  },
};
