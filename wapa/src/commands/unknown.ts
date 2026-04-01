import type { CommandContext, CommandResult } from '../types/command.js';

/** Handle unrecognized input gracefully */
export async function unknown(ctx: CommandContext): Promise<CommandResult> {
  const suggestions = [
    `Hmm, I didn't catch that. Try something like:\n• *add task: fix the login bug*\n• *my tasks*\n• *help*`,
    `Not sure I got that 🤔 Type *help* to see what I can do!`,
    `I didn't quite understand "${ctx.rawText.slice(0, 30)}${ctx.rawText.length > 30 ? '...' : ''}". Try rephrasing, or type *help* for examples.`,
  ];

  return {
    reply: suggestions[Math.floor(Math.random() * suggestions.length)],
    success: false,
  };
}
