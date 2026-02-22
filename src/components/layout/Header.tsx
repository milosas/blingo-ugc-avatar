import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { AuthButton } from '../auth/AuthButton';
import { LanguageSelector } from '../ui/LanguageSelector';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { key: 'tryon', path: '/generator', label: 'Try-on' },
  { key: 'gallery', path: '/gallery', label: 'Galerija/Įrašai' },
  { key: 'models', path: '/modeliai', label: 'Modelių kūrimas' },
  { key: 'posts', path: '/post-creator', label: 'Įrašų kūrėjas' },
  { key: 'settings', path: '/dashboard', label: 'Nustatymai' },
] as const;

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = t.nav as any;

  const activeNavKey = navItems.find(item => location.pathname === item.path)?.key ?? null;

  return (
    <>
      <header className="header-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group shrink-0">
              <span className="text-2xl font-black tracking-tight text-[#1A1A1A] group-hover:text-[#6366F1] transition-colors">
                re<span className="text-[#6366F1]">edit</span>
              </span>
            </Link>

            {/* Center Nav - hidden on mobile */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                    activeNavKey === item.key
                      ? 'text-[#6366F1]'
                      : 'text-[#64748B] hover:text-[#1A1A1A] hover:bg-[#F7F7F5]'
                  }`}
                >
                  {nav?.[item.key] || item.label}
                  {activeNavKey === item.key && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#6366F1] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
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
                className="md:hidden p-2 text-[#64748B] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg transition-colors"
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
