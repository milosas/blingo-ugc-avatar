import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export type CreditAction = 'model_photo' | 'tryon_photo' | 'post_image' | 'post_text' | 'text_from_image';

const CREDITS_CHANGED_EVENT = 'credits-changed';

/** Dispatch this after any successful generation to refresh CreditBadge everywhere */
export function notifyCreditChange() {
  window.dispatchEvent(new Event(CREDITS_CHANGED_EVENT));
}

interface CheckCreditsResult {
  hasCredits: boolean;
  required: number;
  balance: number;
}

export function useCredits() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [socialSubscriptionActive, setSocialSubscriptionActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    if (!user) {
      setBalance(0);
      setSocialSubscriptionActive(false);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('credits, social_subscription_active')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      setBalance(data.credits ?? 0);
      setSocialSubscriptionActive(data.social_subscription_active ?? false);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Listen for credit changes from other hooks/components
  useEffect(() => {
    const handler = () => fetchBalance();
    window.addEventListener(CREDITS_CHANGED_EVENT, handler);
    return () => window.removeEventListener(CREDITS_CHANGED_EVENT, handler);
  }, [fetchBalance]);

  const purchaseCredits = async (packageId: '50' | '150' | '500') => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await supabase.functions.invoke('create-checkout', {
      body: { type: 'credits', packageId },
    });

    if (response.error) throw new Error(response.error.message);
    const result = response.data;

    if (result?.url) {
      window.location.href = result.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  };

  const subscribeSocial = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await supabase.functions.invoke('create-checkout', {
      body: { type: 'social_subscription' },
    });

    if (response.error) throw new Error(response.error.message);
    const result = response.data;

    if (result?.url) {
      window.location.href = result.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  };

  const checkCredits = async (action: CreditAction): Promise<CheckCreditsResult> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await supabase.functions.invoke('check-credits', {
      body: { action },
    });

    if (response.error) throw new Error(response.error.message);
    return response.data as CheckCreditsResult;
  };

  const deductCredits = async (action: CreditAction): Promise<CheckCreditsResult> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await supabase.functions.invoke('check-credits', {
      body: { action, deduct: true },
    });

    if (response.error) throw new Error(response.error.message);
    const result = response.data;

    if (result?.deducted) {
      setBalance(result.balance);
    }

    return result as CheckCreditsResult;
  };

  const refresh = () => fetchBalance();

  return {
    balance,
    socialSubscriptionActive,
    loading,
    purchaseCredits,
    subscribeSocial,
    checkCredits,
    deductCredits,
    refresh,
  };
}
