// ── Termii SMS Integration ───────────────────────────────────────────
// BuildNG uses Termii (https://termii.com) for SMS notifications and OTP
// verification. Termii is the leading Nigerian SMS API provider.

// ── Phone Number Validation ──────────────────────────────────────────

/**
 * Normalizes a Nigerian phone number to international format (+234XXXXXXXXXX).
 * Accepts: 08012345678, +2348012345678, 2348012345678, 0812345678
 * Returns null if the number is invalid.
 */
export function normalizeNigerianPhone(phone: string): string | null {
  const cleaned = phone.replace(/[\s\-()]/g, "");

  // Already in international format with +
  if (/^\+234[789]\d{9}$/.test(cleaned)) {
    return cleaned;
  }

  // International format without +
  if (/^234[789]\d{9}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  // Local format starting with 0
  if (/^0[789]\d{9}$/.test(cleaned)) {
    return `+234${cleaned.substring(1)}`;
  }

  return null;
}

export function isValidNigerianPhone(phone: string): boolean {
  return normalizeNigerianPhone(phone) !== null;
}

// ── Types ────────────────────────────────────────────────────────────

interface TermiiSmsResponse {
  code: string;
  message_id: string;
  message: string;
  balance: number;
  user: string;
}

interface TermiiOtpResponse {
  pinId: string;
  to: string;
  smsStatus: string;
  status: number;
}

interface TermiiVerifyOtpResponse {
  pinId: string;
  verified: boolean;
  msisdn: string;
  attemptsRemaining: number;
}

interface SmsResult {
  success: boolean;
  data: TermiiSmsResponse | null;
  error: string | null;
}

interface OtpResult {
  success: boolean;
  data: TermiiOtpResponse | null;
  error: string | null;
}

interface VerifyOtpResult {
  success: boolean;
  data: TermiiVerifyOtpResponse | null;
  error: string | null;
}

// ── Send SMS ─────────────────────────────────────────────────────────

export async function sendSMS(to: string, message: string): Promise<SmsResult> {
  const normalized = normalizeNigerianPhone(to);

  if (!normalized) {
    return {
      success: false,
      data: null,
      error: `Invalid Nigerian phone number: ${to}. Expected format: 08012345678 or +2348012345678`,
    };
  }

  if (!message || message.trim().length === 0) {
    return {
      success: false,
      data: null,
      error: "Message body cannot be empty",
    };
  }

  if (message.length > 1600) {
    return {
      success: false,
      data: null,
      error: "Message exceeds maximum length of 1600 characters",
    };
  }

  // Stub: In production, POST to https://api.ng.termii.com/api/sms/send
  // with { to, from: "BuildNG", sms: message, type: "plain", channel: "generic", api_key }
  console.log(`[Termii Stub] sendSMS to=${normalized}: "${message.substring(0, 50)}..."`);

  return {
    success: true,
    data: {
      code: "ok",
      message_id: `msg_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`,
      message: "Successfully Sent",
      balance: 843.50,
      user: "BuildNG Construction Platform",
    },
    error: null,
  };
}

// ── Send OTP ─────────────────────────────────────────────────────────

export async function sendOTP(to: string): Promise<OtpResult> {
  const normalized = normalizeNigerianPhone(to);

  if (!normalized) {
    return {
      success: false,
      data: null,
      error: `Invalid Nigerian phone number: ${to}. Expected format: 08012345678 or +2348012345678`,
    };
  }

  // Stub: In production, POST to https://api.ng.termii.com/api/sms/otp/send
  // with { to, from: "BuildNG", message_type: "NUMERIC", pin_attempts: 3,
  //        pin_time_to_live: 10, pin_length: 6, pin_placeholder: "< 1234 >",
  //        message_text: "Your BuildNG verification code is < 1234 >. Valid for 10 minutes.",
  //        pin_type: "NUMERIC", api_key }
  console.log(`[Termii Stub] sendOTP to=${normalized}`);

  return {
    success: true,
    data: {
      pinId: `pin_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`,
      to: normalized,
      smsStatus: "Message Sent",
      status: 200,
    },
    error: null,
  };
}

// ── Verify OTP ───────────────────────────────────────────────────────

export async function verifyOTP(
  pinId: string,
  pin: string
): Promise<VerifyOtpResult> {
  if (!pinId || pinId.trim().length === 0) {
    return {
      success: false,
      data: null,
      error: "Pin ID is required",
    };
  }

  if (!pin || !/^\d{4,6}$/.test(pin)) {
    return {
      success: false,
      data: null,
      error: "PIN must be 4-6 digits",
    };
  }

  // Stub: In production, POST to https://api.ng.termii.com/api/sms/otp/verify
  // with { pin_id: pinId, pin, api_key }
  console.log(`[Termii Stub] verifyOTP pinId=${pinId}, pin=${pin}`);

  // Stub always verifies successfully
  return {
    success: true,
    data: {
      pinId,
      verified: true,
      msisdn: "+2348012345678",
      attemptsRemaining: 2,
    },
    error: null,
  };
}

// ── Bulk SMS Helper ──────────────────────────────────────────────────

export async function sendBulkSMS(
  recipients: string[],
  message: string
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const errors: string[] = [];
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    const result = await sendSMS(recipient, message);
    if (result.success) {
      sent++;
    } else {
      failed++;
      errors.push(`${recipient}: ${result.error}`);
    }
  }

  return { sent, failed, errors };
}

// ── Predefined Message Templates ─────────────────────────────────────

export const SMS_TEMPLATES = {
  escrowFunded: (projectTitle: string, amount: string) =>
    `BuildNG: Escrow funded for "${projectTitle}" - ${amount}. Login to track milestones.`,

  milestoneCompleted: (milestone: string, projectTitle: string) =>
    `BuildNG: Milestone "${milestone}" completed for ${projectTitle}. Awaiting your approval for fund release.`,

  inspectionScheduled: (date: string, address: string) =>
    `BuildNG: Inspection scheduled for ${date} at ${address}. Ensure site access is available.`,

  paymentReleased: (amount: string, projectTitle: string) =>
    `BuildNG: ${amount} released for "${projectTitle}". Funds will arrive within 24hrs.`,

  defectReported: (projectTitle: string, severity: string) =>
    `BuildNG: ${severity} defect reported on "${projectTitle}". Review details on the platform.`,

  permitUpdate: (permitType: string, status: string) =>
    `BuildNG: Your ${permitType} permit application status: ${status}. Login for details.`,

  artisanMatched: (skill: string, projectTitle: string) =>
    `BuildNG: You've been matched to "${projectTitle}" for ${skill} work. Accept or decline within 48hrs.`,

  warrantyExpiring: (projectTitle: string, daysLeft: number) =>
    `BuildNG: Warranty for "${projectTitle}" expires in ${daysLeft} days. Report any defects before expiry.`,
} as const;
