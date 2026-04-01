# WhatsApp Business API Setup Guide

## Prerequisites
- Meta Developer account
- Facebook Business Manager account

## Steps

### 1. Create a Meta App
1. Go to Meta for Developers (developers.facebook.com)
2. Click "Create App" → "Business" type
3. Name it "WAPA" and connect your Business Manager

### 2. Add WhatsApp Product
1. In your app dashboard, click "Add Product"
2. Select "WhatsApp" → "Set Up"
3. Note your **Phone Number ID** and **Business Account ID**

### 3. Generate Access Token
1. Go to WhatsApp > API Setup
2. Generate a temporary access token (for development)
3. For production: create a System User and generate a permanent token

### 4. Configure Webhook
1. Run: `tsx scripts/setup-webhook.ts https://your-domain.com`
2. Or manually: WhatsApp > Configuration > Webhook
3. Set callback URL: `https://your-domain.com/webhook`
4. Set verify token: must match `WHATSAPP_VERIFY_TOKEN` env var
5. Subscribe to: `messages`

### 5. Register Phone Number
1. In WhatsApp > API Setup, add a phone number
2. Verify via SMS or voice call
3. Update `WHATSAPP_PHONE_NUMBER_ID` in your env

### 6. Production Access
1. Complete Meta's business verification
2. Submit your app for review
3. Request "Advanced Access" for WhatsApp Business Management

## Environment Variables
```
WHATSAPP_API_VERSION=v21.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token
WHATSAPP_APP_SECRET=your_app_secret
```
