import { describe, it, expect } from 'vitest';
import { fuzzyMatchTask } from '../../../src/nlp/entity-extractor.js';

describe('Fuzzy Task Matching', () => {
  const taskTitles = [
    'Design the landing page',
    'Fix login bug',
    'Update API documentation',
    'Implement payment flow',
    'Write unit tests',
  ];

  it('matches exact substring', () => {
    expect(fuzzyMatchTask('landing page', taskTitles)).toBe('Design the landing page');
  });

  it('matches partial name', () => {
    expect(fuzzyMatchTask('login', taskTitles)).toBe('Fix login bug');
  });

  it('matches with different casing', () => {
    expect(fuzzyMatchTask('LANDING PAGE', taskTitles)).toBe('Design the landing page');
  });

  it('matches token overlap', () => {
    expect(fuzzyMatchTask('payment', taskTitles)).toBe('Implement payment flow');
  });

  it('returns null for no match', () => {
    expect(fuzzyMatchTask('something completely different', taskTitles)).toBeNull();
  });

  it('handles empty task list', () => {
    expect(fuzzyMatchTask('anything', [])).toBeNull();
  });
});
