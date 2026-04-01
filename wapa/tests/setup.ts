import { vi } from 'vitest';

// Mock environment variables for tests
process.env.NODE_ENV = 'development';
process.env.PORT = '3000';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/wapa_test';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.WHATSAPP_API_VERSION = 'v21.0';
process.env.WHATSAPP_PHONE_NUMBER_ID = 'test-phone-id';
process.env.WHATSAPP_BUSINESS_ACCOUNT_ID = 'test-biz-id';
process.env.WHATSAPP_ACCESS_TOKEN = 'test-token';
process.env.WHATSAPP_VERIFY_TOKEN = 'test-verify-token';
process.env.WHATSAPP_APP_SECRET = 'test-app-secret';
process.env.ANTHROPIC_API_KEY = 'test-api-key';
