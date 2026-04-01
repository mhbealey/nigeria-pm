/**
 * Normalize a phone number to E.164 format.
 * Strips whitespace, dashes, parentheses, and dots, then ensures a leading "+".
 * @param phone - The raw phone number string
 * @returns The phone number in E.164 format (e.g. "+2348012345678")
 */
export function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  if (cleaned.startsWith('00')) cleaned = '+' + cleaned.slice(2);
  if (!cleaned.startsWith('+')) cleaned = '+' + cleaned;
  return cleaned;
}

/**
 * Extract the country code from an E.164 phone number.
 * @param phone - The phone number (will be normalized first)
 * @returns The 1-3 digit country code, or an empty string if extraction fails
 */
export function extractCountryCode(phone: string): string {
  const normalized = normalizePhone(phone);
  // Simple extraction: assume 1-3 digit country codes
  const match = normalized.match(/^\+(\d{1,3})/);
  return match ? match[1] : '';
}

/**
 * Mask a phone number for safe logging (e.g. "+234****78").
 * @param phone - The phone number to mask
 * @returns The masked phone number showing only the first 4 and last 2 characters
 */
export function maskPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  if (normalized.length <= 6) return '***';
  return normalized.slice(0, 4) + '****' + normalized.slice(-2);
}

/**
 * Format a phone number for display.
 * Currently returns the E.164 normalized form.
 * @param phone - The raw phone number string
 * @returns The normalized phone number
 */
export function formatPhone(phone: string): string {
  return normalizePhone(phone);
}
