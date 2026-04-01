import type { SideEffect } from './responses';

export interface ScenarioStep {
  id: string;
  trigger: string | 'auto';
  response: string;
  delay?: number;
  quickReplies?: string[];
  sideEffects?: SideEffect[];
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  steps: ScenarioStep[];
}

// --- Scenario 1: Onboarding ---
const onboarding: Scenario = {
  id: 'onboarding',
  name: 'Onboarding',
  description: 'First-time setup: say hi, name your project, get a tour.',
  steps: [
    {
      id: 'onb-1',
      trigger: 'hi',
      response:
        "Hey there! \uD83D\uDC4B Welcome to WAPA \u2014 I'm your WhatsApp-based project manager.\n\nWhat's your name?",
      delay: 800,
    },
    {
      id: 'onb-2',
      trigger: 'Alex',
      response:
        "Nice to meet you, Alex! \uD83D\uDE04\n\nLet me show you around. I can help you:\n\u2022 Create and manage tasks\n\u2022 Track sprint progress\n\u2022 Coordinate with your team\n\nWant to create your first project?",
      delay: 1200,
      quickReplies: ['Yes!', 'Tell me more first'],
    },
    {
      id: 'onb-3',
      trigger: 'Yes!',
      response: "Great! What should we call the project?",
      delay: 600,
    },
    {
      id: 'onb-4',
      trigger: 'Website Redesign',
      response:
        "\u2705 *Website Redesign* project created!\n\nI've set up Sprint 4 for you (Mar 23 \u2013 Apr 5).\n\nNow let's add some tasks. Just say:\n\"add task: [your task title]\"",
      delay: 1000,
      quickReplies: ['Add a task', 'Skip for now'],
      sideEffects: [
        { type: 'add_activity', text: 'Project "Website Redesign" created' },
      ],
    },
    {
      id: 'onb-5',
      trigger: 'add task: Design landing page',
      response:
        "\u2705 Task created \u2014 *Design landing page*\nPriority: Medium | Sprint 4\n\nWho should work on this?",
      delay: 900,
      quickReplies: ['Maya', 'Me', 'Skip'],
      sideEffects: [
        { type: 'create_task', title: 'Design landing page' },
      ],
    },
    {
      id: 'onb-6',
      trigger: 'Maya',
      response:
        "\uD83D\uDC4D Assigned to Maya! She'll get a notification.\n\nYou're all set! Here's what you can do next:",
      delay: 700,
      quickReplies: ['Add another task', 'Sprint status', 'Help'],
      sideEffects: [
        { type: 'assign_task', taskTitle: 'Design landing page', assigneeName: 'Maya' },
        { type: 'add_activity', text: 'Maya was assigned "Design landing page"' },
      ],
    },
    {
      id: 'onb-7',
      trigger: 'Sprint status',
      response:
        "Sprint 4 is just getting started \uD83C\uDF31\n\n\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 8%\n\n\u2705 Done: 0 | \uD83D\uDD04 In progress: 0 | \u2B1C Todo: 1\n\nLet's build momentum!",
      delay: 1000,
      quickReplies: ['Add a task', 'Help'],
    },
    {
      id: 'onb-8',
      trigger: 'auto',
      response:
        "\uD83D\uDCA1 Pro tip: You can talk to me anytime on WhatsApp \u2014 no need to open an app.\n\nJust send a message like \"my tasks\" or \"done with [task name]\"\n\nHappy building! \uD83D\uDE80",
      delay: 1500,
    },
  ],
};

// --- Scenario 2: Task lifecycle ---
const taskLifecycle: Scenario = {
  id: 'task-lifecycle',
  name: 'Task Lifecycle',
  description: 'Full lifecycle: create, assign, note, block, unblock, complete.',
  steps: [
    {
      id: 'tl-1',
      trigger: 'add task: Build payment integration',
      response:
        "\u2705 Task created \u2014 *Build payment integration*\nPriority: Medium | Sprint 4",
      delay: 800,
      quickReplies: ['Assign it', 'Set priority'],
      sideEffects: [
        { type: 'create_task', title: 'Build payment integration' },
      ],
    },
    {
      id: 'tl-2',
      trigger: 'Build payment integration is urgent priority',
      response: "\uD83D\uDD34 Updated \u2014 *Build payment integration* is now urgent priority.",
      delay: 600,
      sideEffects: [
        { type: 'set_priority', taskTitle: 'Build payment integration', priority: 'urgent' },
      ],
    },
    {
      id: 'tl-3',
      trigger: 'assign Build payment integration to Jordan',
      response: "\uD83D\uDC4D Done \u2014 *Build payment integration* is now assigned to Jordan.\n\nI'll let them know!",
      delay: 700,
      sideEffects: [
        { type: 'assign_task', taskTitle: 'Build payment integration', assigneeName: 'Jordan' },
        { type: 'add_activity', text: 'Jordan was assigned "Build payment integration"' },
      ],
    },
    {
      id: 'tl-4',
      trigger: 'auto',
      response: "\uD83D\uDCE9 Jordan says: \"On it! Starting now.\"",
      delay: 2000,
    },
    {
      id: 'tl-5',
      trigger: 'note on Build payment integration: Use Stripe for Nigerian market',
      response: "\uD83D\uDCDD Note added to *Build payment integration*:\n\"Use Stripe for Nigerian market\"",
      delay: 700,
      sideEffects: [
        { type: 'add_note', taskTitle: 'Build payment integration', note: 'Use Stripe for Nigerian market' },
      ],
    },
    {
      id: 'tl-6',
      trigger: 'Build payment integration is blocked by missing API keys',
      response:
        "\uD83D\uDEAB Marked *Build payment integration* as blocked.\nReason: missing API keys\n\nI'll flag this for the team.",
      delay: 800,
      sideEffects: [
        { type: 'block_task', taskTitle: 'Build payment integration', reason: 'missing API keys' },
        { type: 'add_activity', text: '"Build payment integration" blocked: missing API keys' },
      ],
    },
    {
      id: 'tl-7',
      trigger: 'auto',
      response: "\u26A0\uFE0F Heads up: *Build payment integration* has been blocked for a while. Want me to ping Jordan?",
      delay: 3000,
      quickReplies: ['Yes, ping them', 'Not yet'],
    },
    {
      id: 'tl-8',
      trigger: 'Yes, ping them',
      response: "\uD83D\uDCE8 Sent Jordan a reminder about the blocker.",
      delay: 600,
    },
    {
      id: 'tl-9',
      trigger: 'auto',
      response: "\uD83D\uDCE9 Jordan says: \"Got the API keys from the client! Unblocking now.\"",
      delay: 2000,
    },
    {
      id: 'tl-10',
      trigger: 'note on Build payment integration: API keys received, resuming work',
      response: "\uD83D\uDCDD Note added. Task is back in progress!",
      delay: 600,
      sideEffects: [
        { type: 'add_note', taskTitle: 'Build payment integration', note: 'API keys received, resuming work' },
        { type: 'add_activity', text: '"Build payment integration" unblocked' },
      ],
    },
    {
      id: 'tl-11',
      trigger: 'done Build payment integration',
      response: "\uD83C\uDF89 Amazing! *Build payment integration* is complete!\n\nSprint 4 just got a boost \u2014 you're crushing it!",
      delay: 900,
      sideEffects: [
        { type: 'complete_task', title: 'Build payment integration' },
        { type: 'add_activity', text: 'Task completed: "Build payment integration"' },
        { type: 'update_progress' },
        { type: 'confetti' },
      ],
    },
    {
      id: 'tl-12',
      trigger: 'Sprint status',
      response:
        "Sprint 4 is moving! \uD83D\uDD25\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591 42%\n\n\u2705 Done: 5 | \uD83D\uDD04 In progress: 3 | \u2B1C Todo: 3 | \uD83D\uDEAB Blocked: 1\n\nGreat progress today!",
      delay: 1000,
      quickReplies: ['My tasks', 'Add a task'],
    },
  ],
};

// --- Scenario 3: Standup ---
const standup: Scenario = {
  id: 'standup',
  name: 'Daily Standup',
  description: 'Automated daily standup check-in via WhatsApp.',
  steps: [
    {
      id: 'su-1',
      trigger: 'auto',
      response:
        "\uD83C\uDF05 Good morning! Time for your daily standup.\n\nWhat did you work on yesterday?",
      delay: 1000,
      quickReplies: ['Contact form', 'SEO tags', 'Skip'],
    },
    {
      id: 'su-2',
      trigger: 'I worked on the contact form validation',
      response:
        "Got it \u2014 contact form validation. \uD83D\uDCDD\n\nWhat are you working on today?",
      delay: 800,
      quickReplies: ['Same task', 'E2E tests', 'Analytics'],
    },
    {
      id: 'su-3',
      trigger: "I'll finish the contact form and start E2E tests",
      response:
        "\uD83D\uDC4D Noted!\n\nAny blockers?",
      delay: 700,
      quickReplies: ['No blockers', 'Yes, payment gateway'],
    },
    {
      id: 'su-4',
      trigger: 'No blockers',
      response:
        "\u2705 Standup complete! Here's the team summary:\n\n\uD83D\uDC64 *Alex* \u2014 Contact form, E2E tests\n\uD83D\uDC64 *Maya* \u2014 Image optimization (blocked)\n\uD83D\uDC64 *Jordan* \u2014 Payment gateway\n\uD83D\uDC64 *Sam* \u2014 SEO meta tags\n\uD83D\uDC64 *Riley* \u2014 Analytics dashboard\n\nHave a productive day! \uD83D\uDE80",
      delay: 1200,
      sideEffects: [
        { type: 'add_activity', text: 'Daily standup completed' },
      ],
    },
  ],
};

// --- Scenario 4: Sprint complete ---
const sprintComplete: Scenario = {
  id: 'sprint-complete',
  name: 'Sprint Complete',
  description: 'Wrap up the sprint: complete final tasks and celebrate.',
  steps: [
    {
      id: 'sc-1',
      trigger: 'done SEO meta tags',
      response:
        "\u2705 *SEO meta tags and sitemap* is done!\n\nOnly 2 tasks left in Sprint 4. You're almost there!",
      delay: 800,
      sideEffects: [
        { type: 'complete_task', title: 'SEO meta tags' },
        { type: 'add_activity', text: 'Task completed: "SEO meta tags and sitemap"' },
        { type: 'update_progress' },
      ],
    },
    {
      id: 'sc-2',
      trigger: 'done contact form',
      response:
        "\uD83C\uDF89 *Build contact form with validation* is complete!\n\n1 task left \u2014 the finish line is in sight!",
      delay: 800,
      sideEffects: [
        { type: 'complete_task', title: 'contact form' },
        { type: 'add_activity', text: 'Task completed: "Build contact form with validation"' },
        { type: 'update_progress' },
      ],
    },
    {
      id: 'sc-3',
      trigger: 'done analytics dashboard',
      response:
        "\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89 ALL TASKS COMPLETE!\n\n*Sprint 4 is done!*\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 100%\n\nIncredible work, team!",
      delay: 1000,
      sideEffects: [
        { type: 'complete_task', title: 'analytics dashboard' },
        { type: 'update_progress' },
        { type: 'confetti' },
      ],
    },
    {
      id: 'sc-4',
      trigger: 'auto',
      response:
        "\uD83D\uDCCA *Sprint 4 Recap:*\n\n\u2022 12 tasks completed\n\u2022 Velocity: 12 pts (up from 11 last sprint!)\n\u2022 2 blockers resolved\n\u2022 Avg completion time: 3.2 days\n\nBest performer: Alex (4 tasks) \uD83C\uDFC6",
      delay: 2000,
      quickReplies: ['Start Sprint 5', 'Team stats'],
      sideEffects: [
        { type: 'add_activity', text: 'Sprint 4 completed \u2014 12/12 tasks done' },
      ],
    },
    {
      id: 'sc-5',
      trigger: 'Team stats',
      response:
        "\uD83D\uDCCA *Team Velocity (last 4 sprints):*\n\n\uD83D\uDC64 Alex: 6 \u2192 8 \u2192 7 \u2192 9 \u2191\n\uD83D\uDC64 Maya: 5 \u2192 4 \u2192 6 \u2192 5\n\uD83D\uDC64 Jordan: 7 \u2192 6 \u2192 5 \u2192 7 \u2191\n\uD83D\uDC64 Sam: 4 \u2192 5 \u2192 4 \u2192 3 \u2193\n\uD83D\uDC64 Riley: 5 \u2192 6 \u2192 5 \u2192 6 \u2191\n\nOverall trend: \u2191 Improving!",
      delay: 1200,
      quickReplies: ['Start Sprint 5', 'Thanks!'],
    },
    {
      id: 'sc-6',
      trigger: 'Thanks!',
      response:
        "You're welcome! \uD83D\uDE04\n\nGreat sprint, team. Rest up and let's come back strong for Sprint 5! \uD83D\uDCAA",
      delay: 800,
      sideEffects: [
        { type: 'confetti' },
      ],
    },
  ],
};

export const scenarios: Record<string, Scenario> = {
  onboarding,
  'task-lifecycle': taskLifecycle,
  standup,
  'sprint-complete': sprintComplete,
};

export function getScenario(id: string): Scenario | undefined {
  return scenarios[id];
}

export function getScenarioList(): Array<{ id: string; name: string; description: string; stepCount: number }> {
  return Object.values(scenarios).map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    stepCount: s.steps.length,
  }));
}
