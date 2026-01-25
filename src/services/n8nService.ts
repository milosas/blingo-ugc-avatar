import { API_CONFIG } from '../constants/api';
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
 */
export async function generateImages(
  config: Config,
  images: UploadedImage[],
  signal: AbortSignal
): Promise<GenerationResponse> {
  // Convert all images to base64
  const base64Images = await Promise.all(
    images.map(img => imageToBase64(img.file))
  );

  // Build request body
  const requestBody = {
    avatar: config.avatar?.id,
    scene: config.scene?.id,
    style: config.style?.id,
    images: base64Images
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
