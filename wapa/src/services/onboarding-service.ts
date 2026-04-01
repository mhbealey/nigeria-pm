import { redis } from '../config/redis.js';
import { sendTextMessage } from '../whatsapp/sender.js';
import { welcomeTemplate } from '../whatsapp/templates.js';
import { logger } from '../utils/logger.js';

const ONBOARD_PREFIX = 'wapa:onboard:';

type OnboardingState = 'new' | 'named' | 'tutorial_done' | 'active';

/** Get onboarding state for a user */
export async function getOnboardingState(userId: string): Promise<OnboardingState> {
  const state = await redis.get(`${ONBOARD_PREFIX}${userId}`);
  return (state as OnboardingState) ?? 'new';
}

/** Update onboarding state */
export async function setOnboardingState(userId: string, state: OnboardingState): Promise<void> {
  await redis.set(`${ONBOARD_PREFIX}${userId}`, state);
}

/** Run the onboarding flow for a new user */
export async function handleOnboarding(phone: string, userId: string, name?: string): Promise<boolean> {
  const state = await getOnboardingState(userId);

  if (state === 'active') return false; // Already onboarded

  if (state === 'new') {
    await sendTextMessage(phone, welcomeTemplate(name ?? 'there'));
    await setOnboardingState(userId, name ? 'named' : 'new');
    logger.info({ userId }, 'Onboarding: welcome sent');
    return true;
  }

  if (state === 'named') {
    await setOnboardingState(userId, 'active');
    return false;
  }

  return false;
}
