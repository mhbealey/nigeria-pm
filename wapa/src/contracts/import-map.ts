/**
 * WAPA Import Map — Agent Cognition Framework Part 4
 *
 * This file documents the dependency hierarchy to prevent circular dependencies.
 * Each layer can only import from layers below it.
 *
 * Layer 0 (Foundation):  constants, errors, types, utils
 * Layer 1 (Config):      config/*, db/schema
 * Layer 2 (Services):    services/*
 * Layer 3 (NLP):         nlp/*
 * Layer 4 (Commands):    commands/*
 * Layer 5 (Transport):   whatsapp/*, middleware/*
 * Layer 6 (Jobs):        jobs/*
 * Layer 7 (Entry):       index.ts
 *
 * RULES:
 * - Layer N may import from Layer 0..N-1
 * - Layer N must NEVER import from Layer N+1..7
 * - Circular dependencies are a Self-Correction red flag (Part 8)
 *
 * VIOLATION EXAMPLES:
 * ❌ services/ importing from commands/ (Layer 2 → Layer 4)
 * ❌ types/ importing from services/ (Layer 0 → Layer 2)
 * ❌ config/ importing from nlp/ (Layer 1 → Layer 3)
 *
 * VALID EXAMPLES:
 * ✅ commands/ importing from services/ (Layer 4 → Layer 2)
 * ✅ nlp/ importing from types/ (Layer 3 → Layer 0)
 * ✅ jobs/ importing from services/ (Layer 6 → Layer 2)
 */

export const LAYER_HIERARCHY = [
  'constants, errors, types, utils',
  'config, db/schema',
  'services',
  'nlp',
  'commands',
  'whatsapp, middleware',
  'jobs',
  'index',
] as const;
