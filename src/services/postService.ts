import { API_CONFIG } from '../constants/api';
import { supabase } from '../lib/supabase';
import type { PostConfig, GeneratedPost } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = API_CONFIG.supabaseAnonKey;

interface GenerateTextParams {
  industry: string;
  prompt: string;
  tone: PostConfig['tone'];
  emoji: PostConfig['emoji'];
  length: PostConfig['length'];
  signal?: AbortSignal;
}

interface GenerateImageParams {
  industry: string;
  prompt: string;
}

/**
 * Generate post text via streaming.
 * Returns the raw Response so the caller can read the SSE stream.
 */
export async function generatePostText(params: GenerateTextParams): Promise<Response> {
  const { signal, ...body } = params;

  const response = await fetch(`${supabaseUrl}/functions/v1/generate-post-text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'apikey': supabaseAnonKey,
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Teksto generavimas nepavyko');
  }

  return response;
}

/**
 * Generate a post image via KIE Seedream.
 */
export async function generatePostImage(params: GenerateImageParams): Promise<{ imageUrl: string }> {
  const response = await fetch(`${supabaseUrl}/functions/v1/generate-post-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'apikey': supabaseAnonKey,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Paveikslėlio generavimas nepavyko');
  }

  const data = await response.json();
  return { imageUrl: data.imageUrl };
}

/**
 * Parse SSE stream from OpenAI-compatible endpoint into text chunks.
 */
export async function* parseSSEStream(response: Response): AsyncGenerator<string> {
  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch {
          // Skip malformed JSON lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Save a generated post to the database.
 */
export async function savePost(params: {
  text: string | null;
  imageUrl: string | null;
  config: PostConfig;
}): Promise<GeneratedPost | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('generated_posts')
    .insert({
      user_id: user.id,
      text: params.text,
      image_url: params.imageUrl,
      config: params.config,
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to save post:', error);
    return null;
  }

  return data;
}

/**
 * Get user's saved posts, paginated.
 */
export async function getUserPosts(limit = 20, offset = 0): Promise<GeneratedPost[]> {
  const { data, error } = await supabase
    .from('generated_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }

  return data || [];
}

/**
 * Delete a post.
 */
export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('generated_posts')
    .delete()
    .eq('id', id);

  return !error;
}

/**
 * Toggle favorite status.
 */
export async function toggleFavorite(id: string, currentValue: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('generated_posts')
    .update({ is_favorite: !currentValue })
    .eq('id', id);

  return !error;
}
