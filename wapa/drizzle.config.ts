import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle Kit configuration for schema migrations and studio.
 * Reads DATABASE_URL directly from process.env to avoid importing
 * the full env validation (which requires all env vars to be set).
 */
export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
