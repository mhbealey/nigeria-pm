/** WhatsApp webhook payload from Meta */
export interface WebhookPayload {
  object: 'whatsapp_business_account';
  entry: WebhookEntry[];
}

export interface WebhookEntry {
  id: string;
  changes: WebhookChange[];
}

export interface WebhookChange {
  value: WebhookValue;
  field: 'messages';
}

export interface WebhookValue {
  messaging_product: 'whatsapp';
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: WebhookContact[];
  messages?: InboundMessage[];
  statuses?: MessageStatus[];
}

export interface WebhookContact {
  profile: { name: string };
  wa_id: string;
}

export interface InboundMessage {
  from: string;
  id: string;
  timestamp: string;
  type: MessageType;
  text?: { body: string };
  image?: MediaObject;
  document?: MediaObject;
  audio?: MediaObject;
  video?: MediaObject;
  reaction?: { message_id: string; emoji: string };
  interactive?: {
    type: 'button_reply' | 'list_reply';
    button_reply?: { id: string; title: string };
    list_reply?: { id: string; title: string; description: string };
  };
  context?: { message_id: string; from: string };
}

export type MessageType = 'text' | 'image' | 'document' | 'audio' | 'video' | 'reaction' | 'interactive' | 'location' | 'contacts' | 'sticker';

export interface MediaObject {
  id: string;
  mime_type: string;
  sha256: string;
  caption?: string;
}

export interface MessageStatus {
  id: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipient_id: string;
  errors?: Array<{ code: number; title: string }>;
}

// Outbound types
export interface SendTextMessage {
  messaging_product: 'whatsapp';
  to: string;
  type: 'text';
  text: { body: string };
}

export interface SendTemplateMessage {
  messaging_product: 'whatsapp';
  to: string;
  type: 'template';
  template: {
    name: string;
    language: { code: string };
    components?: TemplateComponent[];
  };
}

export interface TemplateComponent {
  type: 'header' | 'body' | 'button';
  parameters: Array<{ type: 'text'; text: string }>;
}

export interface SendInteractiveMessage {
  messaging_product: 'whatsapp';
  to: string;
  type: 'interactive';
  interactive: {
    type: 'button' | 'list';
    body: { text: string };
    action: {
      buttons?: Array<{ type: 'reply'; reply: { id: string; title: string } }>;
      button?: string;
      sections?: Array<{ title: string; rows: Array<{ id: string; title: string; description?: string }> }>;
    };
  };
}

export interface SendReaction {
  messaging_product: 'whatsapp';
  to: string;
  type: 'reaction';
  reaction: { message_id: string; emoji: string };
}

export interface ApiResponse {
  messaging_product: 'whatsapp';
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string }>;
}
