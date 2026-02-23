import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: string;
  platform_username: string | null;
  late_account_id: string;
  connected_at: string;
}

export interface PublishResult {
  success: boolean;
  results?: unknown;
  error?: string;
}

export function useSocialAccounts() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishingPlatforms, setPublishingPlatforms] = useState<Set<string>>(new Set());
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);

  // Fetch connected accounts from DB
  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .order('connected_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (err) {
      console.error('Error fetching social accounts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Also fetch from LATE API and sync to DB
  const syncAccounts = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('connect-social-account', {
        body: { action: 'list-accounts' },
      });

      if (error) throw error;

      if (data?.success && Array.isArray(data.accounts)) {
        // Sync LATE accounts to local DB
        for (const acc of data.accounts) {
          const platform = acc.platform || acc.type;
          const accountId = acc.id || acc.accountId;
          const username = acc.username || acc.name || null;

          // Upsert: insert if not exists
          await supabase
            .from('social_accounts')
            .upsert({
              user_id: session.user.id,
              platform,
              platform_username: username,
              late_account_id: accountId,
            }, {
              onConflict: 'user_id,late_account_id',
              ignoreDuplicates: true,
            });
        }

        // Refresh local state
        await fetchAccounts();
      }
    } catch (err) {
      console.error('Error syncing social accounts:', err);
    }
  }, [fetchAccounts]);

  // Connect a new account via LATE OAuth
  const connectAccount = useCallback(async (platform: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('connect-social-account', {
        body: { action: 'get-auth-url', platform },
      });

      if (error) throw error;

      if (data?.success && data.authUrl) {
        // Open OAuth flow in new window
        window.open(data.authUrl, '_blank', 'width=600,height=700');
      } else {
        throw new Error('Nepavyko gauti prisijungimo nuorodos');
      }
    } catch (err) {
      console.error('Error connecting account:', err);
      throw err;
    }
  }, []);

  // Publish post to selected platforms
  const publishPost = useCallback(async (
    text: string,
    imageUrl: string | null | undefined,
    platforms: { platform: string; accountId: string }[]
  ): Promise<PublishResult> => {
    setIsPublishing(true);
    setPublishingPlatforms(new Set(platforms.map(p => p.accountId)));
    setPublishResult(null);

    try {
      const payload: Record<string, unknown> = {
        text,
        platforms,
      };

      if (imageUrl) {
        payload.imageUrl = imageUrl;
      }

      const { data, error } = await supabase.functions.invoke('publish-social', {
        body: payload,
      });

      if (error) throw error;

      const result: PublishResult = data?.success
        ? { success: true, results: data.results }
        : { success: false, error: data?.error || 'Nežinoma klaida' };

      setPublishResult(result);
      return result;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Skelbimo klaida';
      const result: PublishResult = { success: false, error: errorMsg };
      setPublishResult(result);
      return result;
    } finally {
      setIsPublishing(false);
      setPublishingPlatforms(new Set());
    }
  }, []);

  // Load accounts on mount
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return {
    accounts,
    isLoading,
    isPublishing,
    publishingPlatforms,
    publishResult,
    fetchAccounts,
    syncAccounts,
    connectAccount,
    publishPost,
    setPublishResult,
  };
}
