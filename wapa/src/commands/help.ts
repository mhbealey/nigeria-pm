import type { CommandContext, CommandResult } from '../types/command.js';

/** Show help with available commands */
export async function help(_ctx: CommandContext): Promise<CommandResult> {
  const msg = `Hey! Here's what I can do 👋\n
📌 *Tasks*
• "add task: design the landing page"
• "assign landing page to @sarah"
• "done with landing page"
• "my tasks" / "what's on my plate?"

📅 *Dates & Priority*
• "push landing page to next tuesday"
• "landing page is urgent"

📝 *Notes & Blocking*
• "note: client wants blue not green"
• "landing page is blocked by API"
• "unblock landing page"

📊 *Projects & Sprints*
• "new project: Website Redesign"
• "how's the sprint?"

Just text me naturally — I'll figure it out! 💬`;

  return { reply: msg, success: true };
}
