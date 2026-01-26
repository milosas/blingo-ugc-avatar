export const API_CONFIG = {
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || '',
  timeout: 180000 // 3 minutes - n8n does server-side polling
} as const;
