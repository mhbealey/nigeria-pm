# WAPA — Contributing Guide

## The Agent Oath

Every contributor — human or AI — must internalize this pledge:

```
I will THINK before I code.
I will PLAN before I implement.
I will HANDLE every error.
I will TEST every assumption.
I will NAME things clearly.
I will DOCUMENT my decisions.
I will FOLLOW established patterns.
I will ANTICIPATE downstream needs.
I will OPTIMIZE for readability.
I will NEVER leave a TODO.
I will NEVER use `any`.
I will NEVER ship code I don't understand.
```

## The Thinking Protocol

Before writing any code, follow this 4-phase cycle:

### Phase 1: ORIENT
Answer these questions before touching the keyboard:
1. What exactly am I delivering? (file path, export name, type signature)
2. Who depends on my output? (downstream consumers)
3. Who do I depend on? (upstream contracts)
4. What are the failure modes? (network, bad input, missing data)
5. What decisions am I making? (document with `// DECISION:`)

### Phase 2: PLAN
Write the implementation as concrete steps. No code yet — just the sequence.

### Phase 3: BUILD
Write code following these cognitive rules:
- **Naming**: If you can't name it clearly, you don't understand it
- **Function size**: Max 30 lines. If longer, extract a helper
- **Types**: Every function parameter, return value, and variable has a type. No `any`, ever
- **Error handling**: Every `await` has a catch. Every switch has a default. Every error has a user message
- **Test-first thinking**: Write code that is easy to test — pure functions, dependency injection, clear inputs/outputs

### Phase 4: VERIFY
Self-review checklist before committing:
- [ ] Does it compile with `tsc --noEmit`?
- [ ] Are all types explicit (no `any`)?
- [ ] Are all functions under 30 lines?
- [ ] Are error messages user-friendly (Acknowledge → Explain → Guide)?
- [ ] Are magic numbers extracted to constants with `// DECISION:` comments?
- [ ] Are exports documented with JSDoc?
- [ ] Does the naming follow conventions?
- [ ] Are there any TODOs? (remove them — do the work now)
- [ ] Would a new developer understand this code without asking questions?
- [ ] Does it follow the import hierarchy? (see `src/contracts/import-map.ts`)

## Decision-Making Framework

When facing a choice, follow this hierarchy:
1. Does the spec/prompt specify this? → Follow it
2. Is there a convention established in the codebase? → Follow it
3. Does the codebase have a pattern? → Follow it
4. What would the simplest correct solution be? → Do that

When in doubt, optimize for:
- **Readability** over cleverness
- **Explicit** over implicit
- **Boring** over novel

Document non-obvious decisions with `// DECISION:` comments.

## Error Taxonomy

WAPA uses a 4-level error hierarchy (see `src/errors/index.ts`):

| Level | Class | When | User Response |
|-------|-------|------|---------------|
| 1 | `BusinessError` | Expected domain errors (task not found, sprint full) | Friendly message with guidance |
| 2 | `ValidationError` | Input validation failures (missing field, bad format) | Specific correction instructions |
| 3 | `InfrastructureError` | External system failures (DB down, API timeout) | "Try again" or "team notified" |
| 4 | `ProgrammingError` | Bugs (should never reach production) | Generic "something went wrong" |

**Error Response Formula**: Acknowledge → Explain → Guide. Never expose internals or blame the user.

Use factory functions from `Errors.*` for common cases:
```typescript
import { Errors } from '../errors';
throw Errors.taskNotFound(taskId);
throw Errors.missingField('title');
throw Errors.ambiguousUser('Alex', ['Alex Chen', 'Alex Kim']);
```

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Files | kebab-case | `user-service.ts` |
| Functions | camelCase | `createTaskRecord()` |
| Types/Interfaces | PascalCase | `CommandContext` |
| Constants | UPPER_SNAKE | `CACHE_TTL_SECONDS` |
| React Components | PascalCase | `MessageBubble` |
| CSS Custom Props | kebab-case | `--wapa-green-500` |

## Import Hierarchy

Layers can only import from layers below them. See `src/contracts/import-map.ts`.

```
Layer 0: constants, errors, types, utils
Layer 1: config/*, db/schema
Layer 2: services/*
Layer 3: nlp/*
Layer 4: commands/*
Layer 5: whatsapp/*, middleware/*
Layer 6: jobs/*
Layer 7: index.ts
```

**Circular dependencies are a red flag.** If you need to import "up", refactor the shared type into Layer 0.

## Performance Rules

1. **Parallel over sequential** — Use `Promise.all` for independent async operations
2. **Fetch only what you need** — Never `SELECT *`, specify columns
3. **Use indexes** — Every `WHERE` clause column must have an index
4. **Cache strategically** — Cache reads that happen more than once per minute
5. **Fast webhook ack** — Return 200 immediately, process async

Latency budget: 800ms total. See `src/constants/latency-budget.ts` for per-component allocation.

## Self-Correction Red Flags

If you catch yourself doing any of these, stop and redesign:

- Using `any` type
- Writing a function over 30 lines
- Guessing about an upstream module's exports
- Assuming an edge case won't happen
- Skipping code that's hard to test
- Creating a circular dependency
- Copy-pasting code
- Writing code you don't fully understand
