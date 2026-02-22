import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useDashboard } from '../hooks/useDashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { LoginModal } from '../components/auth/LoginModal';
import { TiltCard } from '../components/animation/TiltCard';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerChildren';

export default function Dashboard() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { stats, recentImages, recentAvatars, recentPosts, loading: dashboardLoading, error, refresh } = useDashboard();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('textToImage');

  const loading = authLoading || dashboardLoading;
  const dashboard = t.dashboard;
  const sections = dashboard?.sections;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

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

      {/* Accordion Sections */}
      <div className="space-y-4">
        {/* Text to Image Section */}
        <AccordionSection
          title={sections?.textToImage || 'Text to Image'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          count={stats?.generationsCount ?? 0}
          isOpen={openSection === 'textToImage'}
          onToggle={() => toggleSection('textToImage')}
        >
          {recentImages.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentImages.map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square rounded-xl overflow-hidden bg-[#F7F7F5] cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/gallery')}
                  >
                    <img
                      src={image.image_url}
                      alt="Generated image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link
                  to="/gallery"
                  className="text-[#FF6B35] hover:text-[#E55A2B] text-sm font-medium"
                >
                  {dashboard?.viewAll || 'View All'} →
                </Link>
              </div>
            </div>
          ) : (
            <EmptyAccordion
              message={sections?.noGenerations || 'No generations yet'}
              cta={sections?.startGenerating || 'Start generating'}
              onClick={() => navigate('/generator')}
            />
          )}
        </AccordionSection>

        {/* Avatars Section */}
        <AccordionSection
          title={sections?.avatars || 'Models'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          count={stats?.avatarsCount ?? 0}
          isOpen={openSection === 'avatars'}
          onToggle={() => toggleSection('avatars')}
        >
          {recentAvatars.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentAvatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className="aspect-square rounded-xl overflow-hidden bg-[#F7F7F5] cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/modeliai')}
                  >
                    <img
                      src={avatar.image_url}
                      alt={avatar.description || 'Model'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link
                  to="/modeliai"
                  className="text-[#FF6B35] hover:text-[#E55A2B] text-sm font-medium"
                >
                  {dashboard?.viewAll || 'View All'} →
                </Link>
              </div>
            </div>
          ) : (
            <EmptyAccordion
              message={sections?.noAvatars || 'No models yet'}
              cta={sections?.addAvatar || 'Add model'}
              onClick={() => navigate('/modeliai')}
            />
          )}
        </AccordionSection>

        {/* Social Posts Section */}
        <AccordionSection
          title={sections?.socialPosts || 'Socialinių tinklų įrašai'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
          count={stats?.postsCount ?? 0}
          isOpen={openSection === 'socialPosts'}
          onToggle={() => toggleSection('socialPosts')}
        >
          {recentPosts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex gap-3 p-3 bg-[#F7F7F5] rounded-xl cursor-pointer hover:bg-[#EFEFED] transition-colors"
                    onClick={() => navigate('/post-creator')}
                  >
                    {post.image_url && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={post.image_url}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-sm text-[#1A1A1A] line-clamp-3 flex-1">
                      {post.text || '—'}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link
                  to="/post-creator"
                  className="text-[#FF6B35] hover:text-[#E55A2B] text-sm font-medium"
                >
                  {dashboard?.viewAll || 'View All'} →
                </Link>
              </div>
            </div>
          ) : (
            <EmptyAccordion
              message={sections?.noPosts || 'No posts yet'}
              cta={sections?.createPost || 'Create post'}
              onClick={() => navigate('/post-creator')}
            />
          )}
        </AccordionSection>

        {/* Credits & Plan Section */}
        <AccordionSection
          title={sections?.creditsAndPlan || 'Credits & Plan'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          count={stats?.credits ?? 0}
          isOpen={openSection === 'credits'}
          onToggle={() => toggleSection('credits')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F7F7F5] rounded-xl p-4">
              <p className="text-sm text-[#666666] mb-1">
                {sections?.currentPlan || 'Current plan'}
              </p>
              <p className="text-xl font-bold text-[#1A1A1A]">
                {getPlanLabel(stats?.subscription || 'free', dashboard)}
              </p>
            </div>
            <div className="bg-[#F7F7F5] rounded-xl p-4">
              <p className="text-sm text-[#666666] mb-1">
                {sections?.creditsRemaining || 'Credits remaining'}
              </p>
              <p className="text-xl font-bold text-[#FF6B35]">
                {stats?.credits ?? 0}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/#pricing"
              className="inline-flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A2B] text-sm font-medium"
            >
              {sections?.viewPricing || 'View pricing'} →
            </Link>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}

// Accordion section component
interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({ title, icon, count, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="bg-white border border-[#E5E5E3] rounded-2xl overflow-hidden transition-all hover:border-[#D4D4D2]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left min-h-[60px]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF6B35] flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-[#1A1A1A]">{title}</h3>
            <p className="text-sm text-[#999999]">{count}</p>
          </div>
        </div>
        <motion.svg
          className="w-5 h-5 text-[#999999]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Empty accordion content
function EmptyAccordion({ message, cta, onClick }: { message: string; cta: string; onClick: () => void }) {
  return (
    <div className="text-center py-6">
      <p className="text-[#666666] mb-3">{message}</p>
      <button
        onClick={onClick}
        className="px-5 py-2.5 bg-[#FF6B35] text-white text-sm font-medium rounded-full hover:bg-[#E55A2B] transition-colors"
      >
        {cta}
      </button>
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
