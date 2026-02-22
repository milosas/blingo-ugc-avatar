import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { AuthButton } from '../auth/AuthButton';
import { LanguageSelector } from '../ui/LanguageSelector';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (diff > 80) onClose();
  };

  const isActive = (path: string) => location.pathname === path;

  const nav = t.nav as any;

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
      isActive(path)
        ? 'bg-[#FFF0EB] text-[#FF6B35]'
        : 'text-[#666666] hover:bg-[#F7F7F5] hover:text-[#1A1A1A]'
    }`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-[#E5E5E3]">
          <span className="text-lg font-bold text-[#1A1A1A]">
            re<span className="text-[#FF6B35]">edit</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100% - 140px)' }}>
          {/* Home */}
          <Link to="/" className={linkClass('/')}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {nav?.home || 'Home'}
          </Link>

          {/* Try-on */}
          <Link to="/generator" className={linkClass('/generator')}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {nav?.tryon || 'Try-on'}
          </Link>

          {/* Galerija (Gallery) */}
          <Link to="/gallery" className={linkClass('/gallery')}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {nav?.gallery || 'Galerija'}
          </Link>

          {/* Modeliai (Models) */}
          <Link to="/modeliai" className={linkClass('/modeliai')}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {nav?.models || 'Modelių kūrimas'}
          </Link>

          {/* Irasai (Posts) */}
          <Link to="/post-creator" className={linkClass('/post-creator')}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {nav?.posts || 'Įrašai'}
          </Link>

          {/* Nustatymai (Settings) */}
          <Link to="/dashboard" className={linkClass('/dashboard')}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {nav?.settings || 'Nustatymai'}
          </Link>

          {/* Contact */}
          <a
            href="mailto:support@reeditme.com"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#666666] hover:bg-[#F7F7F5] hover:text-[#1A1A1A] transition-colors min-h-[44px]"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {nav?.contact || 'Contact'}
          </a>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E5E3] space-y-3">
          <div className="flex items-center gap-2">
            <AuthButton />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </>
  );
}
