export const API_CONFIG = {
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || '',
  timeout: 120000 // 2 minutes for kie.ai generation
} as const;
