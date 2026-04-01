import { whatsappConfig } from '../src/config/whatsapp.js';

const templates = [
  {
    name: 'wapa_welcome',
    category: 'UTILITY',
    language: 'en',
    components: [
      { type: 'BODY', text: 'Hey {{1}}! 👋 I\'m WAPA, your project management buddy on WhatsApp. Type "help" to get started!' },
    ],
  },
  {
    name: 'wapa_daily_standup',
    category: 'UTILITY',
    language: 'en',
    components: [
      { type: 'BODY', text: 'Good morning, {{1}}! ☀️ Here\'s what\'s on deck today:\n\n{{2}}' },
    ],
  },
  {
    name: 'wapa_task_reminder',
    category: 'UTILITY',
    language: 'en',
    components: [
      { type: 'BODY', text: '📅 Reminder — *{{1}}* is due {{2}}. How\'s it going?' },
    ],
  },
];

async function createTemplates() {
  console.log('Creating WhatsApp message templates...\n');

  for (const template of templates) {
    const response = await fetch(
      `${whatsappConfig.baseUrl}/${whatsappConfig.businessAccountId}/message_templates`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${whatsappConfig.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      },
    );

    if (response.ok) {
      console.log(`✅ Template "${template.name}" created`);
    } else {
      const error = await response.json();
      console.error(`❌ Template "${template.name}" failed:`, error);
    }
  }
}

createTemplates();
