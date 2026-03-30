import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ── Types ───────────────────────────────────────────────────────────

interface PaystackWebhookEvent {
  event: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    currency: "NGN";
    gateway_response: string;
    paid_at?: string;
    created_at: string;
    channel: string;
    metadata: Record<string, string | number | boolean>;
    fees?: number;
    customer: {
      id: number;
      email: string;
      customer_code: string;
      first_name: string | null;
      last_name: string | null;
      phone: string | null;
    };
    transfer_code?: string;
    recipient?: {
      recipient_code: string;
      name: string;
      details: {
        account_number: string;
        account_name: string;
        bank_code: string;
        bank_name: string;
      };
    };
  };
}

// ── In-memory escrow ledger (mock persistence) ──────────────────────

const escrowBalances: Record<
  string,
  { projectId: string; balance: number; lastUpdated: string }
> = {
  "esc-001": {
    projectId: "esc-001",
    balance: 27_000_000_000,
    lastUpdated: "2026-02-15T10:00:00.000Z",
  },
  "esc-002": {
    projectId: "esc-002",
    balance: 0,
    lastUpdated: "2026-01-20T14:30:00.000Z",
  },
  "esc-003": {
    projectId: "esc-003",
    balance: 49_600_000_000,
    lastUpdated: "2025-12-05T09:00:00.000Z",
  },
};

const webhookLog: Array<{
  event: string;
  reference: string;
  amount: number;
  processedAt: string;
  status: string;
}> = [];

// ── Signature Verification ──────────────────────────────────────────

function verifyPaystackSignature(
  body: string,
  signature: string | null
): boolean {
  if (!signature) return false;

  const secret = process.env.PAYSTACK_SECRET_KEY || "sk_test_mock_buildng_secret_key";
  const hash = crypto
    .createHmac("sha512", secret)
    .update(body)
    .digest("hex");

  return hash === signature;
}

// ── Event Handlers ──────────────────────────────────────────────────

function handleChargeSuccess(data: PaystackWebhookEvent["data"]): {
  action: string;
  details: Record<string, unknown>;
} {
  const projectId =
    (data.metadata?.projectId as string) ||
    (data.metadata?.project_id as string) ||
    null;

  if (projectId && escrowBalances[projectId]) {
    escrowBalances[projectId].balance += data.amount;
    escrowBalances[projectId].lastUpdated = new Date().toISOString();

    console.log(
      `[Paystack Webhook] charge.success: Added ${data.amount} kobo to escrow ${projectId}. New balance: ${escrowBalances[projectId].balance} kobo`
    );

    return {
      action: "escrow_credited",
      details: {
        projectId,
        amountCredited: data.amount,
        newBalance: escrowBalances[projectId].balance,
        reference: data.reference,
        customerEmail: data.customer.email,
        paidAt: data.paid_at,
        channel: data.channel,
      },
    };
  }

  console.log(
    `[Paystack Webhook] charge.success: Payment ${data.reference} for ${data.amount} kobo. No escrow project linked.`
  );

  return {
    action: "payment_recorded",
    details: {
      reference: data.reference,
      amount: data.amount,
      customerEmail: data.customer.email,
      paidAt: data.paid_at,
      channel: data.channel,
      gatewayResponse: data.gateway_response,
    },
  };
}

function handleTransferSuccess(data: PaystackWebhookEvent["data"]): {
  action: string;
  details: Record<string, unknown>;
} {
  const projectId =
    (data.metadata?.projectId as string) ||
    (data.metadata?.project_id as string) ||
    null;

  if (projectId && escrowBalances[projectId]) {
    escrowBalances[projectId].balance = Math.max(
      0,
      escrowBalances[projectId].balance - data.amount
    );
    escrowBalances[projectId].lastUpdated = new Date().toISOString();
  }

  console.log(
    `[Paystack Webhook] transfer.success: ${data.transfer_code} - ${data.amount} kobo to ${data.recipient?.name || "Unknown"}`
  );

  return {
    action: "transfer_completed",
    details: {
      transferCode: data.transfer_code,
      amount: data.amount,
      recipientName: data.recipient?.name || null,
      recipientBank: data.recipient?.details?.bank_name || null,
      recipientAccount: data.recipient?.details?.account_number || null,
      projectId,
      reference: data.reference,
    },
  };
}

function handleTransferFailed(data: PaystackWebhookEvent["data"]): {
  action: string;
  details: Record<string, unknown>;
} {
  console.log(
    `[Paystack Webhook] transfer.failed: ${data.transfer_code} - ${data.amount} kobo. Reason: ${data.gateway_response}`
  );

  return {
    action: "transfer_failed",
    details: {
      transferCode: data.transfer_code,
      amount: data.amount,
      recipientName: data.recipient?.name || null,
      recipientBank: data.recipient?.details?.bank_name || null,
      reason: data.gateway_response,
      reference: data.reference,
      projectId:
        (data.metadata?.projectId as string) ||
        (data.metadata?.project_id as string) ||
        null,
    },
  };
}

// ── POST Handler ────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    // Verify webhook signature
    if (!verifyPaystackSignature(rawBody, signature)) {
      console.warn("[Paystack Webhook] Invalid signature rejected");
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    let event: PaystackWebhookEvent;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    if (!event.event || !event.data) {
      return NextResponse.json(
        { success: false, error: "Missing event or data field" },
        { status: 400 }
      );
    }

    let result: { action: string; details: Record<string, unknown> };

    switch (event.event) {
      case "charge.success":
        result = handleChargeSuccess(event.data);
        break;

      case "transfer.success":
        result = handleTransferSuccess(event.data);
        break;

      case "transfer.failed":
        result = handleTransferFailed(event.data);
        break;

      default:
        console.log(
          `[Paystack Webhook] Unhandled event type: ${event.event}`
        );
        return NextResponse.json({ success: true, message: "Event received but not handled" });
    }

    // Log the processed webhook
    webhookLog.push({
      event: event.event,
      reference: event.data.reference,
      amount: event.data.amount,
      processedAt: new Date().toISOString(),
      status: result.action,
    });

    // Always return 200 to Paystack so they don't retry
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[Paystack Webhook] Processing error:", error);
    // Still return 200 to prevent Paystack retry loops on server errors
    return NextResponse.json({ success: true, message: "Received" });
  }
}
