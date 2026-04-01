import { logger } from '../../utils/logger.js';

interface TeamMember {
  id: string;
  name: string | null;
  phone: string;
}

/** Resolve a name or @mention to a team member */
export function resolveUser(input: string, teamMembers: TeamMember[]): { resolved: TeamMember | null; ambiguous: TeamMember[] } {
  if (teamMembers.length === 0) return { resolved: null, ambiguous: [] };

  const cleaned = input.replace(/^@/, '').toLowerCase().trim();

  // Exact match
  const exact = teamMembers.find((m) => m.name?.toLowerCase() === cleaned);
  if (exact) return { resolved: exact, ambiguous: [] };

  // First name match
  const firstNameMatches = teamMembers.filter((m) => {
    const firstName = m.name?.split(' ')[0]?.toLowerCase();
    return firstName === cleaned;
  });

  if (firstNameMatches.length === 1) return { resolved: firstNameMatches[0], ambiguous: [] };
  if (firstNameMatches.length > 1) return { resolved: null, ambiguous: firstNameMatches };

  // Partial match
  const partialMatches = teamMembers.filter((m) =>
    m.name?.toLowerCase().includes(cleaned),
  );

  if (partialMatches.length === 1) return { resolved: partialMatches[0], ambiguous: [] };
  if (partialMatches.length > 1) return { resolved: null, ambiguous: partialMatches };

  logger.debug({ input: cleaned }, 'Could not resolve user');
  return { resolved: null, ambiguous: [] };
}

/** Format ambiguous user matches for a clarification message */
export function formatAmbiguousUsers(users: TeamMember[]): string {
  const names = users.map((u) => u.name ?? u.phone).join(' or ');
  return `Did you mean ${names}?`;
}
