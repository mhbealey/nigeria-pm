import { describe, it, expect } from 'vitest';
import { progressBar, formatTaskItem, priorityEmoji, truncate } from '../../../src/utils/format.js';

describe('Format Utils', () => {
  describe('progressBar', () => {
    it('shows empty bar at 0%', () => {
      expect(progressBar(0)).toContain('0%');
      expect(progressBar(0)).toContain('░');
    });
    it('shows full bar at 100%', () => {
      expect(progressBar(100)).toContain('100%');
      expect(progressBar(100)).toContain('█');
    });
    it('shows partial bar at 50%', () => {
      const bar = progressBar(50);
      expect(bar).toContain('50%');
    });
  });
  describe('formatTaskItem', () => {
    it('formats a todo task', () => {
      const result = formatTaskItem(1, 'Test Task', 'todo');
      expect(result).toContain('⬜');
      expect(result).toContain('*Test Task*');
    });
    it('formats a done task', () => {
      expect(formatTaskItem(1, 'Done Task', 'done')).toContain('✅');
    });
    it('includes due date', () => {
      expect(formatTaskItem(1, 'Task', 'todo', 'Mar 15')).toContain('Mar 15');
    });
  });
  describe('priorityEmoji', () => {
    it('returns correct emoji', () => {
      expect(priorityEmoji('low')).toBe('🟢');
      expect(priorityEmoji('medium')).toBe('🟡');
      expect(priorityEmoji('high')).toBe('🔴');
      expect(priorityEmoji('urgent')).toBe('🔴🔴');
    });
  });
  describe('truncate', () => {
    it('does not truncate short text', () => {
      expect(truncate('hello')).toBe('hello');
    });
    it('truncates long text', () => {
      const result = truncate('a'.repeat(300));
      expect(result.length).toBeLessThanOrEqual(280);
    });
  });
});
