# WAPA API Documentation

## Endpoints

### GET /health
Health check endpoint.

**Response 200:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": true,
    "redis": true
  }
}
```

**Response 503:** One or more services are down.

### GET /webhook
Meta webhook verification endpoint. Used during initial webhook setup.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| hub.mode | string | Must be "subscribe" |
| hub.verify_token | string | Must match WHATSAPP_VERIFY_TOKEN |
| hub.challenge | string | Challenge string to echo back |

**Response 200:** Returns the challenge string.
**Response 403:** Verification failed.

### POST /webhook
Receives incoming WhatsApp messages from Meta's webhook.

**Headers:**
- `X-Hub-Signature-256`: HMAC-SHA256 signature for payload verification

**Response:** Always returns 200 immediately. Processing is async.

## Rate Limits
- 30 messages per minute per phone number
- Friendly "slow down" message when exceeded
