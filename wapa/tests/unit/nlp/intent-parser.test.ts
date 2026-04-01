import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fallbackParse } from '../../../src/nlp/fallback-parser.js';
import { Intent } from '../../../src/nlp/types.js';

describe('Fallback Intent Parser', () => {
  describe('create_task', () => {
    it.each([
      'add task: design the landing page',
      'create task: fix login bug',
      'new task: update docs',
    ])('parses "%s" as CREATE_TASK', (input) => {
      const result = fallbackParse(input);
      expect(result.intent).toBe(Intent.CREATE_TASK);
      expect(result.entities.taskName).toBeTruthy();
      expect(result.confidence).toBeGreaterThanOrEqual(0.70);
    });
  });

  describe('complete_task', () => {
    it.each([
      'done with landing page',
      'finished the login bug',
      'completed API documentation',
      'close payment flow',
    ])('parses "%s" as COMPLETE_TASK', (input) => {
      const result = fallbackParse(input);
      expect(result.intent).toBe(Intent.COMPLETE_TASK);
      expect(result.entities.taskName).toBeTruthy();
    });
  });

  describe('list_tasks', () => {
    it.each([
      'my tasks',
      "what's on my plate?",
      'show tasks',
      'list tasks',
    ])('parses "%s" as LIST_TASKS', (input) => {
      const result = fallbackParse(input);
      expect(result.intent).toBe(Intent.LIST_TASKS);
    });
  });

  describe('sprint_status', () => {
    it.each([
      "how's the sprint?",
      'sprint status',
      'sprint progress',
    ])('parses "%s" as SPRINT_STATUS', (input) => {
      const result = fallbackParse(input);
      expect(result.intent).toBe(Intent.SPRINT_STATUS);
    });
  });

  describe('help', () => {
    it.each(['help', 'what can you do?', 'commands'])('parses "%s" as HELP', (input) => {
      const result = fallbackParse(input);
      expect(result.intent).toBe(Intent.HELP);
    });
  });

  describe('greeting', () => {
    it.each(['hey', 'hi', 'hello', 'good morning', 'yo'])('parses "%s" as GREETING', (input) => {
      const result = fallbackParse(input);
      expect(result.intent).toBe(Intent.GREETING);
    });
  });

  describe('add_note', () => {
    it('parses note messages', () => {
      const result = fallbackParse('note: client wants blue not green');
      expect(result.intent).toBe(Intent.ADD_NOTE);
      expect(result.entities.noteContent).toBe('client wants blue not green');
    });
  });

  describe('block_task', () => {
    it('parses blocked messages', () => {
      const result = fallbackParse('landing page is blocked by API');
      expect(result.intent).toBe(Intent.BLOCK_TASK);
    });
  });

  describe('create_project', () => {
    it('parses new project messages', () => {
      const result = fallbackParse('new project: Website Redesign');
      expect(result.intent).toBe(Intent.CREATE_PROJECT);
      expect(result.entities.projectName).toBe('Website Redesign');
    });
  });

  describe('unknown', () => {
    it('returns UNKNOWN for gibberish', () => {
      const result = fallbackParse('asdfghjkl');
      expect(result.intent).toBe(Intent.UNKNOWN);
      expect(result.confidence).toBe(0.0);
    });
  });
});
