import { useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Link } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoginModal } from './LoginModal';

export function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-10 w-24 bg-[#EFEFED] rounded-full animate-pulse" />
    );
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-[#FF6B35] rounded-full hover:bg-[#E55A2B] hover:shadow-md transition-all"
        >
          {t.auth.signIn}
        </button>
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // User is logged in - show dropdown menu
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#F7F7F5] transition-colors border border-[#E5E5E3]">
        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {user.email?.[0].toUpperCase()}
          </span>
        </div>
        <span className="text-sm text-[#666666] hidden sm:block max-w-32 truncate">
          {user.email}
        </span>
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E5E3] rounded-xl shadow-lg py-1 z-50">
        <div className="px-4 py-2 text-xs text-[#999999] border-b border-[#E5E5E3]">
          {t.auth.signedInAs}
        </div>
        <div className="px-4 py-2 text-sm text-[#666666] border-b border-[#E5E5E3] truncate">
          {user.email}
        </div>
        <MenuItem>
          {({ focus }) => (
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                focus ? 'bg-[#F7F7F5]' : ''
              } text-[#1A1A1A]`}
            >
              <svg className="w-4 h-4 text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.auth.settings}
            </Link>
          )}
        </MenuItem>
        <MenuItem>
          {({ focus }) => (
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                focus ? 'bg-[#F7F7F5]' : ''
              } text-[#1A1A1A]`}
            >
              <svg className="w-4 h-4 text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.auth.credits}
            </Link>
          )}
        </MenuItem>
        <div className="border-t border-[#E5E5E3] mt-1 pt-1">
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={signOut}
                className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  focus ? 'bg-red-50' : ''
                } text-red-500`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t.auth.signOut}
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
