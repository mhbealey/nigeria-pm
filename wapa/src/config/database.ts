import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from './env.js';
import * as schema from '../db/schema/index.js';
import { DB_POOL_MAX, DB_IDLE_TIMEOUT_MS, DB_CONNECT_TIMEOUT_MS } from '../constants/index.js';

/**
 * PostgreSQL connection pool configured with sensible defaults for production use.
 * See constants/index.ts for rationale behind each value.
 */
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: DB_POOL_MAX,
  idleTimeoutMillis: DB_IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: DB_CONNECT_TIMEOUT_MS,
});

// DECISION: We use Drizzle ORM over Prisma or raw SQL. Prisma's generated client adds ~10MB to the
// deployment bundle and its query engine is a Rust binary that complicates container builds. Raw SQL
// loses type safety on query results. Drizzle gives us zero-overhead SQL generation with full
// TypeScript inference from the schema definition, no code generation step, and a tiny runtime.
/** Drizzle ORM database instance with full schema type inference. */
export const db = drizzle(pool, { schema });

/** Raw pg Pool instance for direct access when needed (e.g., health checks). */
export { pool };
