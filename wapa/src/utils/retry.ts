/**
 * Retry a function with exponential backoff.
 * On each failed attempt the delay doubles (up to `maxDelay`).
 * After exhausting all retries the last error is re-thrown.
 * @param fn - The async function to retry
 * @param options - Retry configuration
 * @param options.maxRetries - Maximum number of retry attempts (default 3)
 * @param options.baseDelay - Initial delay in milliseconds (default 200)
 * @param options.maxDelay - Maximum delay cap in milliseconds (default 5000)
 * @returns The resolved value from `fn`
 * @throws The last error encountered after all retries are exhausted
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; baseDelay?: number; maxDelay?: number } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 200, maxDelay = 5000 } = options;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Retry failed'); // unreachable but satisfies TS
}
