import { whatsappConfig } from '../config/whatsapp.js';
import { logger } from '../utils/logger.js';

interface MediaInfo {
  url: string;
  mime_type: string;
  sha256: string;
  file_size: number;
  id: string;
}

/** Retrieve media URL from WhatsApp CDN by media ID */
export async function getMediaUrl(mediaId: string): Promise<string | null> {
  try {
    const response = await fetch(`${whatsappConfig.baseUrl}/${mediaId}`, {
      headers: { 'Authorization': `Bearer ${whatsappConfig.accessToken}` },
    });

    if (!response.ok) return null;
    const data = await response.json() as MediaInfo;
    return data.url;
  } catch (err) {
    logger.error({ err, mediaId }, 'Failed to get media URL');
    return null;
  }
}

/** Download media content from WhatsApp CDN */
export async function downloadMedia(mediaUrl: string): Promise<Buffer | null> {
  try {
    const response = await fetch(mediaUrl, {
      headers: { 'Authorization': `Bearer ${whatsappConfig.accessToken}` },
    });

    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    logger.error({ err }, 'Failed to download media');
    return null;
  }
}
