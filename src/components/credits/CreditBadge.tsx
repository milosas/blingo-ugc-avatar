import { useState } from 'react';
import { useCredits } from '../../hooks/useCredits';
import { useAuth } from '../../contexts/AuthContext';
import { BuyCreditsModal } from './BuyCreditsModal';

export function CreditBadge() {
  const { user } = useAuth();
  const { balance, loading, isGuest } = useCredits();
  const [showBuyModal, setShowBuyModal] = useState(false);

  // Show for both authenticated users and guests with credits
  if (!user && !isGuest) return null;
  if (isGuest && balance <= 0) return null;

  if (loading) {
    return (
      <div className="h-8 w-16 bg-[#EFEFED] rounded-full animate-pulse" />
    );
  }

  return (
    <>
      <button
        onClick={() => !isGuest && setShowBuyModal(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF4ED] border border-[#FFD4B8] hover:bg-[#FFE8D6] transition-colors text-sm font-medium text-[#FF6B35]"
        title={isGuest ? 'Nemokami kreditai' : 'Kreditai'}
      >
        {/* Coin icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M14.5 9a3.5 3.5 0 0 0-5 0M9.5 15a3.5 3.5 0 0 0 5 0" />
          <line x1="12" y1="3" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="21" />
        </svg>
        <span>{balance}</span>
      </button>

      <BuyCreditsModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
      />
    </>
  );
}
