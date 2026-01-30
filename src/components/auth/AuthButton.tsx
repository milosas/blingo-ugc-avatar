import { useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoginModal } from './LoginModal';

export function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
    );
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
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
      <MenuButton className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-indigo-600">
            {user.email?.[0].toUpperCase()}
          </span>
        </div>
        <span className="text-sm text-gray-700 hidden sm:block max-w-32 truncate">
          {user.email}
        </span>
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
        <div className="px-4 py-2 text-xs text-gray-500 border-b">
          {t.auth.signedInAs}
        </div>
        <div className="px-4 py-2 text-sm text-gray-700 border-b truncate">
          {user.email}
        </div>
        <MenuItem>
          {({ focus }) => (
            <button
              onClick={signOut}
              className={`w-full text-left px-4 py-2 text-sm ${
                focus ? 'bg-gray-100' : ''
              } text-red-600`}
            >
              {t.auth.signOut}
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
