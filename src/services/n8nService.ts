import { API_CONFIG } from '../constants/api';
import { buildPrompt } from '../constants/fluxOptions';
import type { Config, UploadedImage } from '../types';
import type { GenerationResponse } from '../types/generation';

/**
 * Convert File to base64 data URL
 */
function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Send generation request to n8n webhook
 * Uses flux-2/pro-image-to-image model
 *
 * Combines user selections (avatar, scene, style, mood) with user's custom prompt
 * to create the full generation prompt
 */
export async function generateImages(
  config: Config,
  images: UploadedImage[],
  signal: AbortSignal
): Promise<GenerationResponse> {
  // Convert uploaded clothing images to base64
  const base64Images = await Promise.all(
    images.map(img => imageToBase64(img.file))
  );

  // Build the full prompt from config
  const fullPrompt = buildPrompt({
    avatar: config.avatar,
    scene: config.scene,
    style: config.style,
    mood: config.mood,
    userPrompt: config.userPrompt
  });

  console.log('Generated prompt:', fullPrompt);

  // Build request body for flux-2/pro-image-to-image model
  const requestBody = {
    // Full constructed prompt
    prompt: fullPrompt,
    // Technical settings
    aspect_ratio: config.aspectRatio,
    resolution: config.resolution,
    // Clothing images
    images: base64Images,
    // Avatar info (for potential avatar image handling)
    avatarId: config.avatar?.id || null
  };

  // POST to n8n webhook
  const response = await fetch(API_CONFIG.webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
    signal
  });

  if (!response.ok) {
    throw new Error('API_ERROR');
  }

  const data: GenerationResponse = await response.json();
  return data;
}
