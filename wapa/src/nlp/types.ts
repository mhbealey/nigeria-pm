/** All supported intents */
export enum Intent {
  CREATE_TASK = 'create_task',
  ASSIGN_TASK = 'assign_task',
  COMPLETE_TASK = 'complete_task',
  LIST_TASKS = 'list_tasks',
  SPRINT_STATUS = 'sprint_status',
  SET_DUE_DATE = 'set_due_date',
  SET_PRIORITY = 'set_priority',
  ADD_NOTE = 'add_note',
  BLOCK_TASK = 'block_task',
  UNBLOCK_TASK = 'unblock_task',
  CREATE_PROJECT = 'create_project',
  HELP = 'help',
  GREETING = 'greeting',
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
