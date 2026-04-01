import { env } from './env.js';

/**
 * WhatsApp Cloud API configuration object.
 * Provides base URLs and credentials needed to interact with the Meta Graph API.
 */
export const whatsappConfig = {
  /** Graph API version (e.g., "v21.0"). */
  apiVersion: env.WHATSAPP_API_VERSION,
  /** WhatsApp phone number ID registered in the Meta dashboard. */
  phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
  /** WhatsApp Business Account ID. */
  businessAccountId: env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  /** Permanent or temporary access token for the Graph API. */
  accessToken: env.WHATSAPP_ACCESS_TOKEN,
  /** Token used to verify webhook subscription requests from Meta. */
  verifyToken: env.WHATSAPP_VERIFY_TOKEN,
  /** App secret used to validate webhook payload signatures. */
  appSecret: env.WHATSAPP_APP_SECRET,
  /** Base URL for all Graph API calls. */
  baseUrl: `https://graph.facebook.com/${env.WHATSAPP_API_VERSION}`,
  /** Full URL for sending messages via the Cloud API. */
  get messagesUrl() {
    return `${this.baseUrl}/${this.phoneNumberId}/messages`;
  },
};
