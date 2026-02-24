import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { BuyCreditsModal } from './BuyCreditsModal';

interface InsufficientCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  required: number;
  balance: number;
}

export function InsufficientCreditsModal({ isOpen, onClose, required, balance }: InsufficientCreditsModalProps) {
  const [showBuyModal, setShowBuyModal] = useState(false);

  const handleBuy = () => {
    onClose();
    setShowBuyModal(true);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm bg-white rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Nepakanka kreditu
              </DialogTitle>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B35] focus:outline-none"
                aria-label="Uzdaryti"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Warning icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FFF4ED] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">{balance}</p>
                  <p className="text-xs text-gray-500 mt-1">Turite</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{required}</p>
                  <p className="text-xs text-gray-500 mt-1">Reikia</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center">
                Jums truksta <span className="font-medium text-gray-900">{required - balance}</span> kreditu siam veiksmui atlikti.
              </p>

              {/* CTA */}
              <button
                onClick={handleBuy}
                className="w-full px-5 py-3 bg-[#FF6B35] text-white font-medium rounded-lg hover:bg-[#E55A2B] transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B35] focus:outline-none"
              >
                Pirkti kreditu
              </button>

              <button
                onClick={onClose}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B35] focus:outline-none"
              >
                Atsaukti
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <BuyCreditsModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
      />
    </>
  );
}
