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
      'WAPA kicks off the daily standup with a Trello sprint summary. The team shares updates and WAPA keeps the board in sync.',
    steps: [
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '☀️ *Morning standup — Sprint 4 from Trello:*\n\n📋 12 cards total\n✅ Done: 4 · 🔨 In Progress: 3 · 🚫 Blocked: 2 · 📝 Todo: 3\n⏰ Overdue: *Fix payment gateway* (2 days)\n📌 Due today: *SEO meta tags*, *Landing page design*\n\nWhat\'s the latest, team?',
        delay: 0,
      },
      {
        dir: 'in',
        senderName: 'Maya',
        text: 'Homepage design is done! Just pushed to staging 🎉',
        delay: 1800,
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: 'Nice work Maya 🔥',
        delay: 1200,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Great job Maya! Want me to move *Landing page design* to Done on Trello?',
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
        text: '✓ Moved *Landing page design* → Done on Trello.\nSprint 4: 5/12 complete (42%)',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'Landing page design',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'I\'m still stuck on the payment gateway. Waiting on Stripe API keys from the client 😩',
        delay: 2200,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '*Fix payment gateway* is already flagged as Blocked on Trello. Want me to add a note with the reason — "Waiting on Stripe API keys"?',
        quickReplies: ['Yes, add note', 'Skip'],
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'Yes, add note',
        delay: 1800,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Updated *Fix payment gateway* on Trello — added blocker note: "Waiting on Stripe API keys"',
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
        text: 'I\'ll follow up with the client today on those keys. Let\'s keep pushing 💪',
        delay: 2000,
      },
    ],
  },

  sync: {
    id: 'sync',
    label: 'Quick Sync',
    description:
      'Mid-day group chat where tasks get completed, blockers get flagged, and WAPA keeps Trello up to date in real time.',
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
        text: 'Let\'s gooo',
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
        text: '✓ Moved *SEO meta tags* → Done on Trello.\nSprint 4: 6/12 complete (50%) — halfway there!',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'SEO meta tags',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'I\'m blocked on the payment gateway. Still waiting on Stripe API keys, client hasn\'t responded.',
        delay: 2500,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Want me to move *Fix payment gateway* to Blocked on Trello? I\'ll flag it for the team.',
        quickReplies: ['Yes, block it', 'Leave it'],
        delay: 1500,
      },
      {
        dir: 'in',
        senderName: 'Jordan',
        text: 'Yes, block it',
        delay: 1400,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *Fix payment gateway* → Blocked on Trello. I\'ll remind the group if it stays blocked for 48h.',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'Fix payment gateway',
          fromColumn: 'In Progress',
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
        text: '📋 Alex, here are your tasks from Trello:\n\n🔨 *Mobile responsive layout* — In Progress (due Thu)\n📝 *Write API documentation* — Todo (due Fri)\n📝 *Accessibility audit* — Todo (no due date)\n\n3 cards assigned to you.',
        delay: 1500,
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Thanks, I\'ll knock out the responsive layout today 👍',
        delay: 1800,
      },
    ],
  },

  scope: {
    id: 'scope',
    label: 'Scope Decision',
    description:
      'The team decides to cut a feature from the sprint. WAPA moves it to Backlog on Trello and recalculates scope.',
    steps: [
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Team — should we cut the analytics dashboard from this sprint? It\'s a big lift and we\'re running out of time.',
        delay: 0,
      },
      {
        dir: 'in',
        senderName: 'Sam',
        text: 'Yeah it\'s a nice-to-have honestly. Let\'s push it to next sprint.',
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
        text: '@wapa move analytics dashboard to backlog',
        delay: 1800,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *Analytics dashboard* → Backlog on Trello.\nSprint 4 is now 7/11 (64%) — tighter scope, faster ship. 🚢',
        delay: 1500,
        syncAction: {
          type: 'move',
          cardTitle: 'Analytics dashboard',
          fromColumn: 'Todo',
          toColumn: 'Backlog',
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
        senderName: 'Maya',
        text: 'Contact form styling is done btw, forgot to mention it earlier 😅',
        delay: 2200,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: 'Maya, want me to move *Contact form styling* to Done on Trello?',
        quickReplies: ['✅ Yes', 'Not yet'],
        delay: 1400,
      },
      {
        dir: 'in',
        senderName: 'Maya',
        text: '✅ Yes',
        delay: 1600,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '✓ Moved *Contact form styling* → Done on Trello.\nSprint 4: 8/11 complete (73%) — strong progress!',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'Contact form styling',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
      },
    ],
  },

  finish: {
    id: 'finish',
    label: 'Sprint Finish',
    description:
      'The sprint is nearly complete. The team closes out the last tasks and WAPA celebrates the milestone with Trello stats.',
    steps: [
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '📊 *Sprint 4 status from Trello:*\n\n✅ Done: 10/12 (83%)\n🔨 In Progress: *E2E test suite*, *Accessibility audit*\n\nAlmost there team — 2 cards left!',
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
        text: 'Riley, want me to move *E2E test suite* to Done on Trello?',
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
        text: '✓ Moved *E2E test suite* → Done on Trello.\nSprint 4: 11/12 complete (92%) — ONE card left!',
        delay: 1200,
        syncAction: {
          type: 'move',
          cardTitle: 'E2E test suite',
          fromColumn: 'In Progress',
          toColumn: 'Done',
        },
      },
      {
        dir: 'out',
        senderName: 'Alex',
        text: 'Just wrapped up the a11y fixes. @wapa mark accessibility audit as done',
        delay: 2500,
      },
      {
        dir: 'in',
        senderName: 'WAPA',
        text: '🎉🎉🎉 That\'s ALL of them! Sprint 4 is DONE!\n\n*12/12 complete on Trello* — 100%\n\n📈 Sprint stats:\n• Velocity: 12 cards in 2 weeks\n• Blocked time: 3.2 days avg\n• MVP features shipped: 8\n\nIncredible work team. Time to ship it! 🚀',
        delay: 1500,
        syncAction: {
          type: 'move',
          cardTitle: 'Accessibility audit',
          fromColumn: 'In Progress',
          toColumn: 'Done',
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
