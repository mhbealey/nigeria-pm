import type { WebhookPayload, InboundMessage } from '../../src/whatsapp/types.js';

/** Create a basic text message webhook payload */
export function createTextMessagePayload(options: {
  from?: string;
  text: string;
  messageId?: string;
  name?: string;
}): WebhookPayload {
  return {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'entry-1',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: { display_phone_number: '15550001234', phone_number_id: 'phone-id-1' },
          contacts: [{ profile: { name: options.name ?? 'Test User' }, wa_id: options.from ?? '2348012345678' }],
          messages: [{
            from: options.from ?? '2348012345678',
            id: options.messageId ?? `wamid.test_${Date.now()}`,
            timestamp: String(Math.floor(Date.now() / 1000)),
            type: 'text',
            text: { body: options.text },
          }],
        },
        field: 'messages',
      }],
    }],
  };
}

/** Create a group message payload */
export function createGroupMessagePayload(text: string, groupId: string = 'group-123'): WebhookPayload {
  const payload = createTextMessagePayload({ text });
  return payload;
}

/** Create a reaction payload */
export function createReactionPayload(messageId: string, emoji: string): WebhookPayload {
  return {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'entry-1',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: { display_phone_number: '15550001234', phone_number_id: 'phone-id-1' },
          contacts: [{ profile: { name: 'Test User' }, wa_id: '2348012345678' }],
          messages: [{
            from: '2348012345678',
            id: `wamid.reaction_${Date.now()}`,
            timestamp: String(Math.floor(Date.now() / 1000)),
            type: 'reaction',
            reaction: { message_id: messageId, emoji },
          }],
        },
        field: 'messages',
      }],
    }],
  };
}

/** Create a button reply payload */
export function createButtonReplyPayload(buttonId: string, buttonTitle: string): WebhookPayload {
  return {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'entry-1',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: { display_phone_number: '15550001234', phone_number_id: 'phone-id-1' },
          contacts: [{ profile: { name: 'Test User' }, wa_id: '2348012345678' }],
          messages: [{
            from: '2348012345678',
            id: `wamid.button_${Date.now()}`,
            timestamp: String(Math.floor(Date.now() / 1000)),
            type: 'interactive',
            interactive: { type: 'button_reply', button_reply: { id: buttonId, title: buttonTitle } },
          }],
        },
        field: 'messages',
      }],
    }],
  };
}

/** Create a status update payload (no messages) */
export function createStatusPayload(): WebhookPayload {
  return {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'entry-1',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: { display_phone_number: '15550001234', phone_number_id: 'phone-id-1' },
          statuses: [{
            id: 'wamid.status_1',
            status: 'delivered',
            timestamp: String(Math.floor(Date.now() / 1000)),
            recipient_id: '2348012345678',
          }],
        },
        field: 'messages',
      }],
    }],
  };
}

/** Create image message payload */
export function createImagePayload(caption?: string): WebhookPayload {
  return {
    object: 'whatsapp_business_account',
    entry: [{
      id: 'entry-1',
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: { display_phone_number: '15550001234', phone_number_id: 'phone-id-1' },
          contacts: [{ profile: { name: 'Test User' }, wa_id: '2348012345678' }],
          messages: [{
            from: '2348012345678',
            id: `wamid.img_${Date.now()}`,
            timestamp: String(Math.floor(Date.now() / 1000)),
            type: 'image',
            image: { id: 'media-id-1', mime_type: 'image/jpeg', sha256: 'abc123', caption },
          }],
        },
        field: 'messages',
      }],
    }],
  };
}

// Sample messages for different intents
export const sampleMessages = {
  createTask: [
    'add task: design the landing page',
    'create task: fix login bug',
    'new task: update API documentation',
    'add task: implement payment flow',
    'create task: write unit tests for auth',
  ],
  assignTask: [
    'assign landing page to @sarah',
    'assign login bug to John',
    'give the API docs to @mike',
    'assign payment flow to me',
  ],
  completeTask: [
    'done with landing page',
    'finished the login bug',
    'completed API documentation',
    'close payment flow',
    'mark landing page as done',
  ],
  listTasks: [
    'my tasks',
    "what's on my plate?",
    'show my tasks',
    'list tasks',
    'what do I have to do?',
  ],
  sprintStatus: [
    "how's the sprint?",
    'sprint status',
    'sprint progress',
    "how's the sprint going?",
  ],
  setDueDate: [
    'push landing page to next tuesday',
    'set login bug due tomorrow',
    'move API docs to next week',
    'landing page due in 3 days',
  ],
  setPriority: [
    'landing page is urgent',
    'login bug is high priority',
    'docs are low priority',
    'payment flow is critical',
  ],
  addNote: [
    'note: client wants blue not green',
    'note: meeting moved to 3pm',
    'note on landing page: needs hero image',
  ],
  blockTask: [
    'landing page is blocked by API',
    'login bug is blocked',
    'payment flow blocked by stripe integration',
  ],
  help: ['help', 'what can you do?', 'commands', 'how does this work?'],
  greeting: ['hey', 'hi', 'hello', 'good morning', 'yo'],
};
