import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { resolveDate } from '../../../src/nlp/resolvers/date-resolver.js';

describe('Date Resolver', () => {
  const fixedDate = new Date('2024-03-15T10:00:00Z'); // Friday

  it('resolves "today"', () => {
    const result = resolveDate('today', { from: fixedDate });
    expect(result).toBe('2024-03-15');
  });

  it('resolves "tomorrow"', () => {
    const result = resolveDate('tomorrow', { from: fixedDate });
    expect(result).toBe('2024-03-16');
  });

  it('resolves "in 3 days"', () => {
    const result = resolveDate('in 3 days', { from: fixedDate });
    expect(result).toBe('2024-03-18');
  });

  it('resolves "in 2 weeks"', () => {
    const result = resolveDate('in 2 weeks', { from: fixedDate });
    expect(result).toBe('2024-03-29');
  });

  it('resolves "next week" to next Monday', () => {
    const result = resolveDate('next week', { from: fixedDate });
    expect(result).toBe('2024-03-18');
  });

  it('resolves "next monday"', () => {
    const result = resolveDate('next monday', { from: fixedDate });
    expect(result).toBe('2024-03-18');
  });

  it('resolves "next tuesday"', () => {
    const result = resolveDate('next tuesday', { from: fixedDate });
    expect(result).toBe('2024-03-19');
  });

  it('resolves "end of sprint" with sprint date', () => {
    const result = resolveDate('end of sprint', { sprintEndDate: '2024-03-28' });
    expect(result).toBe('2024-03-28');
  });

  it('returns null for "end of sprint" without sprint date', () => {
    const result = resolveDate('end of sprint');
    expect(result).toBeNull();
  });

  it('returns null for unrecognized dates', () => {
    const result = resolveDate('sometime later');
    expect(result).toBeNull();
  });

  it('resolves bare day names', () => {
    const result = resolveDate('friday', { from: fixedDate });
    expect(result).toBeTruthy();
  });

  it('resolves "end of week" to Friday', () => {
    const result = resolveDate('end of week', { from: new Date('2024-03-11T10:00:00Z') }); // Monday
    expect(result).toBe('2024-03-15');
  });
});
