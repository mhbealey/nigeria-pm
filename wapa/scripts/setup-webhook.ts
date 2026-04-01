import { whatsappConfig } from '../src/config/whatsapp.js';

async function setupWebhook() {
  const webhookUrl = process.argv[2];
  if (!webhookUrl) {
    console.error('Usage: tsx scripts/setup-webhook.ts <WEBHOOK_URL>');
    process.exit(1);
  }

  console.log(`Registering webhook URL: ${webhookUrl}`);

  const response = await fetch(
    `${whatsappConfig.baseUrl}/${whatsappConfig.businessAccountId}/subscribed_apps`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        callback_url: webhookUrl + '/webhook',
        verify_token: whatsappConfig.verifyToken,
        fields: ['messages'],
      }),
    },
  );

  if (response.ok) {
    console.log('✅ Webhook registered successfully!');
  } else {
    const error = await response.json();
    console.error('❌ Failed to register webhook:', error);
    process.exit(1);
  }
}

setupWebhook();
