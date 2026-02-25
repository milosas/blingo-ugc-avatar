import { useState } from 'react';
import { useCredits } from '../../hooks/useCredits';
import { LoginModal } from '../auth/LoginModal';

export function GuestCreditBanner() {
  const { isGuest, balance } = useCredits();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  if (!isGuest) return null;

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3 bg-[#FFF4ED] border border-[#FFD4B8] rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* Info icon */}
          <svg className="w-5 h-5 text-[#FF6B35] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-[#1A1A1A]">
            Jums liko <span className="font-bold text-[#FF6B35]">{balance}</span> nemokam{balance === 1 ? 'as bandymas' : balance > 1 && balance < 10 ? 'i bandymai' : 'u bandymu'}.{' '}
            <span className="text-[#666]">Prisijunkite ir gaukite 10 kreditu!</span>
          </p>
        </div>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="flex-shrink-0 px-4 py-1.5 bg-[#FF6B35] text-white text-sm font-medium rounded-full hover:bg-[#E55A2B] transition-colors"
        >
          Prisijungti
        </button>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
