import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from './env.js';
import * as schema from '../db/schema/index.js';

/**
 * PostgreSQL connection pool configured with sensible defaults for production use.
 * - max: 20 concurrent connections
 * - idleTimeoutMillis: close idle connections after 30s
 * - connectionTimeoutMillis: fail connection attempts after 5s
 */
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

/** Drizzle ORM database instance with full schema type inference. */
export const db = drizzle(pool, { schema });

/** Raw pg Pool instance for direct access when needed (e.g., health checks). */
export { pool };
