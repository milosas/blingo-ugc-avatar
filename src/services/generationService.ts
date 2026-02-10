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
 * Fetch image URL and convert to base64 data URL
 * Used for custom avatars where Edge Function can't access signed URLs
 */
async function urlToBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to data URL'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Send generation request to Supabase Edge Function
 * Uses flux-2/pro-image-to-image model via kie.ai
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
    mood: config.mood,
    pose: config.pose,
    userPrompt: config.userPrompt
  });

  console.log('Generated prompt:', fullPrompt);

  // For custom avatars, convert image URL to base64 (Edge Function can't access signed URLs)
  // For preset avatars, send URL directly (Unsplash URLs are publicly accessible)
  let avatarImageBase64: string | null = null;
  let avatarImageUrl: string | null = null;

  if (config.avatar?.imageUrl) {
    if (config.avatar.isCustom) {
      // Custom avatar: convert to base64 for Edge Function
      // CRITICAL: If this fails, we must throw error - user explicitly selected this avatar
      console.log('Converting custom avatar to base64...');
      try {
        avatarImageBase64 = await urlToBase64(config.avatar.imageUrl);
        console.log('Custom avatar converted to base64, length:', avatarImageBase64.length);
      } catch (err) {
        console.error('CRITICAL: Failed to convert custom avatar to base64:', err);
        // DON'T continue without avatar - throw error so user knows
        throw new Error('AVATAR_LOAD_FAILED');
      }
    } else {
      // Preset avatar: URL is publicly accessible
      avatarImageUrl = config.avatar.imageUrl;
    }
  }

  // Build request body for flux-2/pro-image-to-image model
  const requestBody = {
    // Full constructed prompt
    prompt: fullPrompt,
    // Technical settings
    aspect_ratio: config.aspectRatio,
    resolution: config.resolution,
    imageCount: config.imageCount,
    // Clothing images
    images: base64Images,
    // Avatar info for identity preservation
    avatarId: config.avatar?.id || null,
    avatarImageUrl: avatarImageUrl,
    avatarImageBase64: avatarImageBase64,
    avatarIsCustom: config.avatar?.isCustom || false
  };

  // POST to Supabase Edge Function
  const response = await fetch(API_CONFIG.generateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.supabaseAnonKey}`,
      'apikey': API_CONFIG.supabaseAnonKey
    },
    body: JSON.stringify(requestBody),
    signal
  });

  if (!response.ok) {
    // Try to parse error response for specific error types
    try {
      const errorData = await response.json();
      if (errorData.error?.includes('AVATAR_UPLOAD_FAILED')) {
        throw new Error('AVATAR_LOAD_FAILED');
      }
    } catch (parseErr) {
      // If parsing fails, throw generic error
    }
    throw new Error('API_ERROR');
  }

  const data: GenerationResponse = await response.json();
  return data;
}
