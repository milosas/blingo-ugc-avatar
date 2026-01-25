export const API_CONFIG = {
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || '',
  timeout: 60000
} as const;
