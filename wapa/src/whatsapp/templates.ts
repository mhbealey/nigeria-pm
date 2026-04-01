/** Template builder for WhatsApp message templates */

export interface TemplateParams {
  [key: string]: string;
}

/** Welcome message template */
export function welcomeTemplate(name: string): string {
  return `👋 Hey ${name}! I'm WAPA, your project management buddy.\n\nI live right here in WhatsApp — no apps to download, no dashboards to learn.\n\nJust text me like a coworker:\n• "add task: design the landing page"\n• "what's on my plate?"\n• "how's the sprint?"\n\nType *help* anytime to see everything I can do!`;
}

/** Daily standup template */
export function dailyStandupTemplate(name: string, tasks: Array<{ title: string; priority: string; dueDate?: string }>): string {
  let msg = `Good morning, ${name}! ☀️ Here's what's on deck today:\n\n`;

  if (tasks.length === 0) {
    msg += "Nothing scheduled — enjoy the breathing room! 🧘";
    return msg;
  }

  const priorityEmoji: Record<string, string> = { urgent: '🔴', high: '🔴', medium: '🟡', low: '🟢' };

  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    const emoji = priorityEmoji[t.priority] ?? '🟡';
    const due = t.dueDate ? ` — due ${t.dueDate}` : '';
    msg += `${i + 1}. ${emoji} *${t.title}*${due}\n`;
  }

  msg += `\nThat's ${tasks.length} task${tasks.length === 1 ? '' : 's'} — you got this 💪`;
  return msg;
}

/** Weekly digest template */
export function weeklyDigestTemplate(data: {
  sprintName: string;
  progress: number;
  done: number;
  inProgress: number;
  todo: number;
  blocked: number;
  velocity: number;
  prevVelocity: number;
  topContributors: Array<{ name: string; completed: number }>;
  upcomingDue: Array<{ title: string; dueDate: string }>;
}): string {
  const bar = progressBarText(data.progress);
  const velocityTrend = data.velocity >= data.prevVelocity ? '📈' : '📉';

  let msg = `📊 *Weekly Digest — ${data.sprintName}*\n\n`;
  msg += `${bar}\n\n`;
  msg += `✅ Done: ${data.done} | 🔄 In Progress: ${data.inProgress} | ⬜ Todo: ${data.todo}`;

  if (data.blocked > 0) msg += ` | 🚫 Blocked: ${data.blocked}`;

  msg += `\n\n${velocityTrend} Velocity: ${data.velocity} tasks/sprint`;

  if (data.topContributors.length > 0) {
    msg += '\n\n🏆 *Top contributors:*\n';
    for (const c of data.topContributors) {
      msg += `• ${c.name}: ${c.completed} tasks\n`;
    }
  }

  if (data.upcomingDue.length > 0) {
    msg += '\n📅 *Due this week:*\n';
    for (const d of data.upcomingDue) {
      msg += `• *${d.title}* — ${d.dueDate}\n`;
    }
  }

  return msg.trim();
}

/** Task reminder template */
export function taskReminderTemplate(taskTitle: string, dueDate: string, isOverdue: boolean): string {
  if (isOverdue) {
    return `⏰ Heads up — *${taskTitle}* was due ${dueDate}. Need more time, or can you wrap it up?`;
  }
  return `📅 Reminder — *${taskTitle}* is due ${dueDate}. How's it going?`;
}

/** Sprint complete celebration */
export function sprintCompleteTemplate(sprintName: string, totalTasks: number, velocity: number): string {
  return `🎉🎉🎉\n\n*${sprintName}* is complete!\n\n${totalTasks} tasks shipped with a velocity of ${velocity}.\n\nGreat work, team! Time to plan the next one 🚀`;
}

function progressBarText(percent: number, width: number = 10): string {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty) + ` ${Math.round(percent)}%`;
}
