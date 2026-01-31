const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const API_CONFIG = {
  generateUrl: `${supabaseUrl}/functions/v1/generate-image`,
  supabaseAnonKey,
  timeout: 180000 // 3 minutes - Edge Function handles polling
} as const;
