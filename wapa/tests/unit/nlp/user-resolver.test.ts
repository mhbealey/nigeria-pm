import { describe, it, expect } from 'vitest';
import { resolveUser, formatAmbiguousUsers } from '../../../src/nlp/resolvers/user-resolver.js';

describe('User Resolver', () => {
  const members = [
    { id: '1', name: 'Sarah Khan', phone: '+2348001' },
    { id: '2', name: 'Sarah Miller', phone: '+2348002' },
    { id: '3', name: 'John Doe', phone: '+2348003' },
    { id: '4', name: 'Mike Johnson', phone: '+2348004' },
  ];

  it('resolves exact name match', () => {
    const result = resolveUser('John Doe', members);
    expect(result.resolved?.id).toBe('3');
  });

  it('resolves first name match', () => {
    const result = resolveUser('Mike', members);
    expect(result.resolved?.id).toBe('4');
  });

  it('returns ambiguous for multiple first name matches', () => {
    const result = resolveUser('Sarah', members);
    expect(result.resolved).toBeNull();
    expect(result.ambiguous.length).toBe(2);
  });

  it('handles @ prefix', () => {
    const result = resolveUser('@john doe', members);
    expect(result.resolved?.id).toBe('3');
  });

  it('returns null for no match', () => {
    const result = resolveUser('nobody', members);
    expect(result.resolved).toBeNull();
    expect(result.ambiguous.length).toBe(0);
  });

  it('formats ambiguous message', () => {
    const msg = formatAmbiguousUsers([members[0], members[1]]);
    expect(msg).toContain('Sarah Khan');
    expect(msg).toContain('Sarah Miller');
  });
});
