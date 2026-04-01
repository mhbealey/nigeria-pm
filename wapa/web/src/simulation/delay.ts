// DECISION: The variance formula uses (Math.random() - 0.5) * 200 to produce a uniform
// distribution in [-100ms, +100ms]. This prevents rhythmic, predictable delays that feel
// mechanical. Uniform (not Gaussian) because the range is small enough that occasional
// extremes still feel natural — and it avoids needing a Box-Muller transform.
// The 2000ms cap prevents long messages from creating awkward pauses.
// The 300ms floor ensures the response never feels instantaneous (which breaks immersion).
export function calculateResponseDelay(responseText: string, speed: number = 1): number {
  const baseDelay = 400;
  const perCharDelay = 15;
  const variance = (Math.random() - 0.5) * 200;
  const rawDelay = baseDelay + (responseText.length * perCharDelay) + variance;
  const capped = Math.min(rawDelay, 2000);
  return Math.max(300, capped / speed);
}
