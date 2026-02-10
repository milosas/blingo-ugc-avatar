import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoginModal } from '../auth/LoginModal';

const CARDS = [
  {
    key: 'card1' as const,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: 'bg-[#FF6B35]',
    iconBg: 'bg-[#FFF0EB]',
    iconColor: 'text-[#FF6B35]',
    link: '/generator',
  },
  {
    key: 'card2' as const,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: 'bg-[#4A6CF7]',
    iconBg: 'bg-[#EBF0FF]',
    iconColor: 'text-[#4A6CF7]',
    link: '/generator',
  },
  {
    key: 'card3' as const,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'bg-[#9B6CF7]',
    iconBg: 'bg-[#F0EBFF]',
    iconColor: 'text-[#9B6CF7]',
    link: '/post-creator',
  },
];

export function HeroSection() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const hero = t.landing?.hero;

  return (
    <>
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
              {hero?.title || 'Everything you need for your content'}
            </h1>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              {hero?.subtitle || 'Three powerful AI tools in one place'}
            </p>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {CARDS.map((card) => {
              const cardData = hero?.[card.key];
              return (
                <Link
                  key={card.key}
                  to={card.link}
                  className="group bg-white border border-[#E5E5E3] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <span className={card.iconColor}>{card.icon}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors">
                    {cardData?.title || card.key}
                  </h2>

                  {/* Description */}
                  <p className="text-[#666666] text-sm leading-relaxed mb-4">
                    {cardData?.description || ''}
                  </p>

                  {/* Arrow */}
                  <div className={`flex items-center text-sm font-medium ${card.iconColor}`}>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link
                  to="/generator"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF6B35] text-white font-semibold rounded-full hover:bg-[#E55A2B] transition-colors shadow-md"
                >
                  {hero?.ctaCreate || 'Start Creating'}
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-[#E5E5E3] text-[#1A1A1A] font-semibold rounded-full hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                >
                  {hero?.ctaDashboard || 'Dashboard'}
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF6B35] text-white font-semibold rounded-full hover:bg-[#E55A2B] transition-colors shadow-md"
                >
                  {hero?.ctaSignup || 'Sign Up Free'}
                </button>
                <Link
                  to="/generator"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-[#E5E5E3] text-[#1A1A1A] font-semibold rounded-full hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                >
                  {hero?.ctaTry || 'Try Without Account'}
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
