import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDashboard } from '../hooks/useDashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { LoginModal } from '../components/auth/LoginModal';
import { TiltCard } from '../components/animation/TiltCard';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerChildren';

export default function Dashboard() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { stats, loading: dashboardLoading, error, refresh } = useDashboard();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const loading = authLoading || dashboardLoading;
  const dashboard = t.dashboard;

  if (loading) {
    return (
      <div className=" max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6B35] border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className=" max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {dashboard?.title || 'Settings'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-[#FFF0EB] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">
            {dashboard?.guestTitle || 'Sign in to view your settings'}
          </h2>
          <p className="text-[#666666] mb-6">
            {dashboard?.guestDescription || 'Track your generations, manage models, and view your credits'}
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-full hover:bg-[#E55A2B] transition-colors"
          >
            {dashboard?.signIn || 'Sign In'}
          </button>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
    );
  }

  if (error) {
    return (
      <div className=" max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {dashboard?.title || 'Settings'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all"
          >
            {t.actions?.regenerate || 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" max-w-6xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
          {dashboard?.title || 'Settings'}
        </h1>
        <p className="text-[#666666] mt-1">{user.email}</p>
      </div>

      {/* Stats Cards */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" staggerDelay={0.08}>
        <StaggerItem><StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          label={dashboard?.stats?.generations || 'Images Created'}
          value={stats?.generationsCount ?? 0}
          color="orange"
        /></StaggerItem>
        <StaggerItem><StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          label={dashboard?.stats?.avatars || 'Custom Models'}
          value={stats?.avatarsCount ?? 0}
          color="teal"
        /></StaggerItem>
        <StaggerItem><StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label={dashboard?.stats?.credits || 'Credits'}
          value={stats?.credits ?? 0}
          color="purple"
        /></StaggerItem>
        <StaggerItem><StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          }
          label={dashboard?.stats?.plan || 'Plan'}
          value={getPlanLabel(stats?.subscription || 'free', dashboard)}
          color="pink"
        /></StaggerItem>
      </StaggerContainer>

    </div>
  );
}

// Stat card component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: 'orange' | 'teal' | 'purple' | 'pink';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    orange: 'bg-[#FFF0EB] text-[#FF6B35]',
    teal: 'bg-[#E6F7F5] text-[#14B8A6]',
    purple: 'bg-[#F3E8FF] text-[#9333EA]',
    pink: 'bg-[#FCE7F3] text-[#EC4899]'
  };

  return (
    <TiltCard className="relative h-full">
      <div className="bg-white border border-[#E5E5E3] rounded-xl p-4 hover:border-[#D4D4D2] hover:shadow-sm transition-all h-full">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[color]}`}>
          {icon}
        </div>
        <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
        <p className="text-sm text-[#666666]">{label}</p>
      </div>
    </TiltCard>
  );
}

function getPlanLabel(subscription: string, dashboard: any): string {
  const plans: Record<string, string> = {
    free: dashboard?.plans?.free || 'Free',
    pro: dashboard?.plans?.pro || 'Pro',
    enterprise: dashboard?.plans?.enterprise || 'Enterprise'
  };
  return plans[subscription] || 'Free';
}
