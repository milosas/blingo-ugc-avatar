import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { AuthButton } from '../auth/AuthButton';
import { LanguageSelector } from '../ui/LanguageSelector';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [generateDropdownOpen, setGenerateDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;
  const isGenerateActive = ['/image-generator', '/generator', '/post-creator'].includes(location.pathname);

  const handlePricingClick = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('pricing');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = '/#pricing';
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGenerateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setGenerateDropdownOpen(false);
  }, [location.pathname]);

  // Determine which nav item is active for the underline
  const getActiveNavId = () => {
    if (isActive('/')) return 'home';
    if (isGenerateActive) return 'generate';
    if (isActive('/dashboard')) return 'dashboard';
    return null;
  };

  const activeNavId = getActiveNavId();

  const navLinkBase = 'px-4 py-2 text-sm font-medium rounded-lg transition-colors relative';

  const nav = t.nav as any;

  return (
    <>
      <header className="header-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group shrink-0">
              <span className="text-2xl font-black tracking-tight text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors">
                re<span className="text-[#FF6B35]">edit</span>
              </span>
            </Link>

            {/* Center Nav - hidden on mobile */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`${navLinkBase} ${
                  isActive('/') ? 'text-[#FF6B35]' : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5]'
                }`}
              >
                {nav?.home || 'Home'}
                {activeNavId === 'home' && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF6B35] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              {/* Generate Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setGenerateDropdownOpen(!generateDropdownOpen)}
                  className={`${navLinkBase} flex items-center gap-1 ${
                    isGenerateActive
                      ? 'text-[#FF6B35]'
                      : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5]'
                  }`}
                >
                  {nav?.generate || 'Generuoti'}
                  <motion.svg
                    className="w-3.5 h-3.5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ rotate: generateDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                  {activeNavId === 'generate' && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF6B35] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {generateDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#E5E5E3] rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <Link
                        to="/image-generator"
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          isActive('/image-generator')
                            ? 'bg-[#FFF0EB] text-[#FF6B35]'
                            : 'text-[#1A1A1A] hover:bg-[#F7F7F5]'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{nav?.imageGenerator || 'Nuotraukų generatorius'}</p>
                          <p className="text-xs text-[#999]">{nav?.imageGeneratorDesc || 'Text to image su AI'}</p>
                        </div>
                      </Link>
                      <Link
                        to="/generator"
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          isActive('/generator')
                            ? 'bg-[#FFF0EB] text-[#FF6B35]'
                            : 'text-[#1A1A1A] hover:bg-[#F7F7F5]'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{nav?.modelPhotos || 'Nuotraukos su modeliais'}</p>
                          <p className="text-xs text-[#999]">{nav?.modelPhotosDesc || 'Produkto nuotraukos ant modelių'}</p>
                        </div>
                      </Link>
                      <Link
                        to="/post-creator"
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          isActive('/post-creator')
                            ? 'bg-[#FFF0EB] text-[#FF6B35]'
                            : 'text-[#1A1A1A] hover:bg-[#F7F7F5]'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{nav?.postCreator || 'Įrašų kūrėjas'}</p>
                          <p className="text-xs text-[#999]">{nav?.postCreatorDesc || 'Socialinių tinklų įrašai'}</p>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/dashboard"
                className={`${navLinkBase} ${
                  isActive('/dashboard') ? 'text-[#FF6B35]' : 'text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5]'
                }`}
              >
                {nav?.dashboard || 'Settings'}
                {activeNavId === 'dashboard' && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF6B35] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              <button
                onClick={handlePricingClick}
                className="px-4 py-2 text-sm font-medium text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg transition-colors"
              >
                {nav?.pricing || 'Pricing'}
              </button>
              <a
                href="mailto:support@reeditme.com"
                className="px-4 py-2 text-sm font-medium text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg transition-colors"
              >
                {nav?.contact || 'Contact'}
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <AuthButton />
                <LanguageSelector />
              </div>

              {/* Hamburger - mobile only */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-[#666666] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
