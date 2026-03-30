// ── Paystack Integration Stubs ───────────────────────────────────────
// BuildNG uses Paystack for escrow payments, milestone disbursements,
// and vendor/contractor payouts. All amounts are in kobo (1 NGN = 100 kobo).

interface PaystackMeta {
  [key: string]: string | number | boolean;
}

// ── Transaction Initialization ───────────────────────────────────────

interface InitializeTransactionParams {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: PaystackMeta;
  callbackUrl?: string;
  channels?: ("card" | "bank" | "ussd" | "bank_transfer" | "qr")[];
}

interface InitializeTransactionResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function initializeTransaction(
  params: InitializeTransactionParams
): Promise<InitializeTransactionResponse> {
  const {
    email,
    amountKobo,
    reference,
    metadata = {},
    callbackUrl = "https://buildng.com.ng/payments/callback",
    channels = ["card", "bank", "bank_transfer", "ussd"],
  } = params;

  // Stub: In production, this would POST to https://api.paystack.co/transaction/initialize
  console.log(
    `[Paystack Stub] initializeTransaction: ${email}, ${amountKobo} kobo, ref=${reference}, channels=${channels.join(",")}, callback=${callbackUrl}, meta=${JSON.stringify(metadata)}`
  );

  return {
    status: true,
    message: "Authorization URL created",
    data: {
      authorization_url: `https://checkout.paystack.com/mock_${reference}`,
      access_code: `acss_mock_${Date.now().toString(36)}`,
      reference,
    },
  };
}

// ── Transaction Verification ─────────────────────────────────────────

interface VerifyTransactionResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: "success" | "failed" | "abandoned";
    reference: string;
    amount: number;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: "NGN";
    ip_address: string;
    metadata: PaystackMeta;
    fees: number;
    customer: {
      id: number;
      email: string;
      customer_code: string;
      first_name: string | null;
      last_name: string | null;
      phone: string | null;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
  };
}

export async function verifyTransaction(
  reference: string
): Promise<VerifyTransactionResponse> {
  // Stub: In production, this would GET https://api.paystack.co/transaction/verify/:reference
  console.log(`[Paystack Stub] verifyTransaction: ref=${reference}`);

  const now = new Date().toISOString();

  return {
    status: true,
    message: "Verification successful",
    data: {
      id: Math.floor(Math.random() * 900000000) + 100000000,
      domain: "live",
      status: "success",
      reference,
      amount: 1500000000, // 15,000,000 NGN in kobo
      gateway_response: "Successful",
      paid_at: now,
      created_at: now,
      channel: "card",
      currency: "NGN",
      ip_address: "102.89.46.170",
      metadata: {},
      fees: 22500000, // 1.5% capped
      customer: {
        id: 48293012,
        email: "emeka.okafor@buildng.com.ng",
        customer_code: "CUS_mock_buildng_001",
        first_name: "Emeka",
        last_name: "Okafor",
        phone: "+2348034567890",
      },
      authorization: {
        authorization_code: "AUTH_mock_buildng",
        bin: "408408",
        last4: "4081",
        exp_month: "12",
        exp_year: "2027",
        channel: "card",
        card_type: "visa",
        bank: "Guaranty Trust Bank",
        country_code: "NG",
        brand: "visa",
        reusable: true,
        signature: "SIG_mock_buildng_visa",
      },
    },
  };
}

// ── Transfer Recipient ───────────────────────────────────────────────

interface CreateTransferRecipientResponse {
  status: boolean;
  message: string;
  data: {
    active: boolean;
    createdAt: string;
    currency: "NGN";
    domain: string;
    id: number;
    integration: number;
    name: string;
    recipient_code: string;
    type: "nuban";
    details: {
      authorization_code: null;
      account_number: string;
      account_name: string;
      bank_code: string;
      bank_name: string;
    };
  };
}

export async function createTransferRecipient(
  name: string,
  accountNumber: string,
  bankCode: string
): Promise<CreateTransferRecipientResponse> {
  // Stub: In production, POST to https://api.paystack.co/transferrecipient
  console.log(
    `[Paystack Stub] createTransferRecipient: ${name}, acct=${accountNumber}, bank=${bankCode}`
  );

  const bankNames: Record<string, string> = {
    "044": "Access Bank",
    "023": "Citibank Nigeria",
    "063": "Diamond Bank",
    "050": "Ecobank Nigeria",
    "084": "Enterprise Bank",
    "070": "Fidelity Bank",
    "011": "First Bank of Nigeria",
    "214": "First City Monument Bank",
    "058": "Guaranty Trust Bank",
    "030": "Heritage Bank",
    "301": "Jaiz Bank",
    "082": "Keystone Bank",
    "526": "Parallex Bank",
    "076": "Polaris Bank",
    "101": "Providus Bank",
    "221": "Stanbic IBTC Bank",
    "068": "Standard Chartered Bank",
    "232": "Sterling Bank",
    "100": "Suntrust Bank",
    "032": "Union Bank of Nigeria",
    "033": "United Bank For Africa",
    "215": "Unity Bank",
    "035": "Wema Bank",
    "057": "Zenith Bank",
  };

  return {
    status: true,
    message: "Transfer Recipient successfully created",
    data: {
      active: true,
      createdAt: new Date().toISOString(),
      currency: "NGN",
      domain: "live",
      id: Math.floor(Math.random() * 9000000) + 1000000,
      integration: 463433,
      name,
      recipient_code: `RCP_mock_${Date.now().toString(36)}`,
      type: "nuban",
      details: {
        authorization_code: null,
        account_number: accountNumber,
        account_name: name.toUpperCase(),
        bank_code: bankCode,
        bank_name: bankNames[bankCode] || "Unknown Bank",
      },
    },
  };
}

// ── Transfer Initiation ──────────────────────────────────────────────

interface InitiateTransferResponse {
  status: boolean;
  message: string;
  data: {
    integration: number;
    domain: string;
    amount: number;
    currency: "NGN";
    source: "balance";
    reason: string;
    recipient: number;
    status: "success" | "pending" | "failed";
    transfer_code: string;
    id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export async function initiateTransfer(
  amountKobo: number,
  recipientCode: string,
  reason: string
): Promise<InitiateTransferResponse> {
  // Stub: In production, POST to https://api.paystack.co/transfer
  console.log(
    `[Paystack Stub] initiateTransfer: ${amountKobo} kobo to ${recipientCode} - ${reason}`
  );

  const now = new Date().toISOString();

  return {
    status: true,
    message: "Transfer has been queued",
    data: {
      integration: 463433,
      domain: "live",
      amount: amountKobo,
      currency: "NGN",
      source: "balance",
      reason,
      recipient: Math.floor(Math.random() * 9000000) + 1000000,
      status: "success",
      transfer_code: `TRF_mock_${Date.now().toString(36)}`,
      id: Math.floor(Math.random() * 90000000) + 10000000,
      createdAt: now,
      updatedAt: now,
    },
  };
}

// ── List Banks ───────────────────────────────────────────────────────

interface NigerianBank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  active: boolean;
  country: "Nigeria";
  currency: "NGN";
  type: "nuban";
}

interface ListBanksResponse {
  status: boolean;
  message: string;
  data: NigerianBank[];
}

export async function listBanks(): Promise<ListBanksResponse> {
  // Stub: In production, GET https://api.paystack.co/bank?country=nigeria
  console.log("[Paystack Stub] listBanks");

  return {
    status: true,
    message: "Banks retrieved",
    data: [
      { id: 1, name: "Access Bank", slug: "access-bank", code: "044", longcode: "044150149", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 2, name: "Citibank Nigeria", slug: "citibank-nigeria", code: "023", longcode: "023150005", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 3, name: "Ecobank Nigeria", slug: "ecobank-nigeria", code: "050", longcode: "050150010", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 4, name: "Fidelity Bank", slug: "fidelity-bank", code: "070", longcode: "070150003", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 5, name: "First Bank of Nigeria", slug: "first-bank-of-nigeria", code: "011", longcode: "011150303", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 6, name: "First City Monument Bank", slug: "first-city-monument-bank", code: "214", longcode: "214150018", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 7, name: "Guaranty Trust Bank", slug: "guaranty-trust-bank", code: "058", longcode: "058152036", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 8, name: "Heritage Bank", slug: "heritage-bank", code: "030", longcode: "030159992", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 9, name: "Jaiz Bank", slug: "jaiz-bank", code: "301", longcode: "301080020", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 10, name: "Keystone Bank", slug: "keystone-bank", code: "082", longcode: "082150017", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 11, name: "Kuda Microfinance Bank", slug: "kuda-microfinance-bank", code: "50211", longcode: "", gateway: "digitalbankmandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 12, name: "OPay", slug: "opay", code: "999992", longcode: "", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 13, name: "PalmPay", slug: "palmpay", code: "999991", longcode: "", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 14, name: "Polaris Bank", slug: "polaris-bank", code: "076", longcode: "076151006", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 15, name: "Providus Bank", slug: "providus-bank", code: "101", longcode: "101000000", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 16, name: "Stanbic IBTC Bank", slug: "stanbic-ibtc-bank", code: "221", longcode: "221159522", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 17, name: "Standard Chartered Bank", slug: "standard-chartered-bank", code: "068", longcode: "068150015", gateway: "", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 18, name: "Sterling Bank", slug: "sterling-bank", code: "232", longcode: "232150016", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 19, name: "Union Bank of Nigeria", slug: "union-bank-of-nigeria", code: "032", longcode: "032080474", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 20, name: "United Bank For Africa", slug: "united-bank-for-africa", code: "033", longcode: "033153513", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 21, name: "Unity Bank", slug: "unity-bank", code: "215", longcode: "215154097", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 22, name: "Wema Bank", slug: "wema-bank", code: "035", longcode: "035150103", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
      { id: 23, name: "Zenith Bank", slug: "zenith-bank", code: "057", longcode: "057150013", gateway: "emandate", active: true, country: "Nigeria", currency: "NGN", type: "nuban" },
    ],
  };
}

// ── Paystack Reference Generator ─────────────────────────────────────

export function generatePaystackReference(prefix: string = "BLDNG"): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`.toUpperCase();
}

// ── Amount Helpers ───────────────────────────────────────────────────

export function nairaToKobo(naira: number): number {
  return Math.round(naira * 100);
}

export function koboToNaira(kobo: number): number {
  return kobo / 100;
}
