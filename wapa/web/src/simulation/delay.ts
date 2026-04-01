export function calculateResponseDelay(responseText: string, speed: number = 1): number {
  const baseDelay = 400;
  const perCharDelay = 15;
  const variance = (Math.random() - 0.5) * 200;
  const rawDelay = baseDelay + (responseText.length * perCharDelay) + variance;
  const capped = Math.min(rawDelay, 2000);
  return Math.max(300, capped / speed);
}
