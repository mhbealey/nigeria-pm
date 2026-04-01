/**
 * All supported intents that the NLP layer can classify from user messages.
 * Each intent maps to a dedicated command handler in the router.
 */
export enum Intent {
  /** Triggered by messages like "add a task", "create task: ..." or "new task ..." */
  CREATE_TASK = 'create_task',
  /** Triggered by "assign X to Y" or "give this to ..." */
  ASSIGN_TASK = 'assign_task',
  /** Triggered by "done", "mark X complete", "finished X" */
  COMPLETE_TASK = 'complete_task',
  /** Triggered by "show my tasks", "what's on my plate", "list tasks" */
  LIST_TASKS = 'list_tasks',
  /** Triggered by "sprint status", "how are we doing", "progress" */
  SPRINT_STATUS = 'sprint_status',
  /** Triggered by "set due date", "due by Friday", "deadline ..." */
  SET_DUE_DATE = 'set_due_date',
  /** Triggered by "set priority to high", "make this urgent" */
  SET_PRIORITY = 'set_priority',
  /** Triggered by "add a note", "note: ..." */
  ADD_NOTE = 'add_note',
  /** Triggered by "block X", "X is blocked because ..." */
  BLOCK_TASK = 'block_task',
  /** Triggered by "unblock X", "X is no longer blocked" */
  UNBLOCK_TASK = 'unblock_task',
  /** Triggered by "create project", "new project ..." */
  CREATE_PROJECT = 'create_project',
  /** Triggered by "help", "what can you do", "commands" */
  HELP = 'help',
  /** Triggered by "hi", "hello", "hey" and other casual greetings */
  GREETING = 'greeting',
  /** Fallback when no intent can be confidently classified */
  UNKNOWN = 'unknown',
}

/** Extracted entities from a message */
export interface Entities {
  taskName?: string;
  assigneeName?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  projectName?: string;
  noteContent?: string;
  blockReason?: string;
}

/** Result of parsing a message */
export interface ParseResult {
  intent: Intent;
  entities: Entities;
  confidence: number;
}

/** Context provided to the NLP parser */
export interface NlpContext {
  userName: string;
  projectName?: string;
  sprintName?: string;
  sprintEndDate?: string;
  recentTaskTitles: string[];
  teamMemberNames: string[];
}

/** Confidence thresholds */
export const CONFIDENCE = {
  HIGH: 0.85,
  MEDIUM: 0.60,
  LOW: 0,
} as const;
