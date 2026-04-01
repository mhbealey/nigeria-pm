import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { notes } from '../db/schema/notes.js';
import { tasks } from '../db/schema/tasks.js';
import { eq, desc } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

/** Add a note to a task */
export async function addNote(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.entities.noteContent) {
    return { reply: "What's the note? Try: *note: client wants blue not green*", success: false };
  }

  // Find the most recent task for this user if no specific task mentioned
  let taskName = ctx.entities.taskName;
  let task;

  if (taskName) {
    const allTasks = await db.query.tasks.findMany();
    task = allTasks.find((t) => t.title.toLowerCase().includes(taskName!.toLowerCase()));
  } else {
    task = await db.query.tasks.findFirst({
      where: eq(tasks.assigneeId, ctx.userId),
      orderBy: [desc(tasks.createdAt)],
    });
  }

  if (!task) {
    return { reply: "Couldn't figure out which task this note is for. Try: *note on [task]: [your note]*", success: false };
  }

  await db.insert(notes).values({
    id: createId(),
    taskId: task.id,
    authorId: ctx.userId,
    content: ctx.entities.noteContent,
  });

  return {
    reply: `📝 Note added to *${task.title}*`,
    success: true,
  };
}
