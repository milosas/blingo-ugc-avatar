import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface DashboardStats {
  generationsCount: number;
  avatarsCount: number;
  postsCount: number;
  credits: number;
  subscription: 'free' | 'pro' | 'enterprise';
}

export interface RecentImage {
  id: string;
  image_url: string;
  created_at: string;
}

export interface RecentAvatar {
  id: string;
  image_url: string;
  description: string | null;
  created_at: string;
}

export interface RecentPost {
  id: string;
  text: string | null;
  image_url: string | null;
  created_at: string;
}

interface UseDashboardReturn {
  stats: DashboardStats | null;
  recentImages: RecentImage[];
  recentAvatars: RecentAvatar[];
  recentPosts: RecentPost[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentImages, setRecentImages] = useState<RecentImage[]>([]);
  const [recentAvatars, setRecentAvatars] = useState<RecentAvatar[]>([]);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!user) {
      setStats(null);
      setRecentImages([]);
      setRecentAvatars([]);
      setRecentPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel
      const [profileResult, imagesCountResult, avatarsCountResult, postsCountResult, recentImagesResult, recentAvatarsResult, recentPostsResult] = await Promise.all([
        // Get profile with credits and subscription
        supabase
          .from('profiles')
          .select('credits, subscription')
          .eq('id', user.id)
          .single(),

        // Count generated images
        supabase
          .from('generated_images')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),

        // Count custom avatars
        supabase
          .from('custom_avatars')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),

        // Count generated posts
        supabase
          .from('generated_posts')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),

        // Get 4 most recent images
        supabase
          .from('generated_images')
          .select('id, image_url, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(4),

        // Get 4 most recent avatars
        supabase
          .from('custom_avatars')
          .select('id, image_url, description, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(4),

        // Get 4 most recent posts
        supabase
          .from('generated_posts')
          .select('id, text, image_url, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(4)
      ]);

      // Handle profile not existing (backfill needed)
      let credits = 10;
      let subscription: 'free' | 'pro' | 'enterprise' = 'free';

      if (profileResult.data) {
        credits = profileResult.data.credits ?? 10;
        subscription = profileResult.data.subscription ?? 'free';
      } else if (profileResult.error?.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { error: _insertError } = await supabase
          .from('profiles')
          .insert({ id: user.id, email: user.email, credits: 10, subscription: 'free' });

        // Profile creation failed silently - will retry on next load
      }

      setStats({
        generationsCount: imagesCountResult.count ?? 0,
        avatarsCount: avatarsCountResult.count ?? 0,
        postsCount: postsCountResult.count ?? 0,
        credits,
        subscription
      });

      setRecentImages(recentImagesResult.data || []);
      setRecentAvatars(recentAvatarsResult.data || []);
      setRecentPosts(recentPostsResult.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard';
      setError(errorMessage);
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const refresh = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    recentImages,
    recentAvatars,
    recentPosts,
    loading,
    error,
    refresh
  };
}
