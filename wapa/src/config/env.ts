import { z } from 'zod';

/**
 * Schema for validating required environment variables.
 * All variables are validated at startup to ensure fail-fast behavior.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WHATSAPP_API_VERSION: z.string().default('v21.0'),
  WHATSAPP_PHONE_NUMBER_ID: z.string(),
  WHATSAPP_BUSINESS_ACCOUNT_ID: z.string(),
  WHATSAPP_ACCESS_TOKEN: z.string(),
  WHATSAPP_VERIFY_TOKEN: z.string(),
  WHATSAPP_APP_SECRET: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  SENTRY_DSN: z.string().optional(),
});

/** Inferred type of the validated environment variables. */
export type Env = z.infer<typeof envSchema>;

/**
 * Parses and validates all environment variables against the schema.
 * Exits the process with a descriptive error if any variable is invalid or missing.
 *
 * @returns The validated environment variables.
 */
export function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }
  return result.data;
}

/** Validated environment variables, available as a singleton. */
export const env = loadEnv();
