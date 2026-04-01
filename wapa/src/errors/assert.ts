/**
 * Assertion utilities for the Self-Correction Protocol (Part 8).
 * Use these to fail fast on programming errors that should never happen.
 */
import { ProgrammingError, ErrorCode } from './index.js';

/** Assert a condition is truthy — throws ProgrammingError if not */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new ProgrammingError(ErrorCode.INVARIANT_VIOLATION, `Assertion failed: ${message}`);
  }
}

/** Assert a value is not null or undefined — returns the narrowed type */
export function assertDefined<T>(value: T | null | undefined, name: string): T {
  if (value === null || value === undefined) {
    throw new ProgrammingError(ErrorCode.INVARIANT_VIOLATION, `Expected ${name} to be defined, got ${value}`);
  }
  return value;
}

/** Assert exhaustive switch — ensures all union cases are handled */
export function assertNever(value: never, message?: string): never {
  throw new ProgrammingError(ErrorCode.INVALID_STATE, message ?? `Unexpected value: ${JSON.stringify(value)}`);
}
