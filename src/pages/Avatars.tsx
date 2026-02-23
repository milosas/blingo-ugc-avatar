import { useState } from 'react';
import { useAvatarModels } from '../hooks/useAvatarModels';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { LoginModal } from '../components/auth/LoginModal';
import { AvatarCreatorModal } from '../components/avatars/AvatarCreatorModal';

export default function Avatars() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const {
    models,
    loading: modelsLoading,
    createModel,
    addGeneratedPhotoToModel,
    deletePhoto,
    refresh,
  } = useAvatarModels();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  const loading = authLoading || modelsLoading;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full border-2 border-[#10B981] border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {t.avatarsPage?.title || 'Modelių kūrimas'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-[#666666] mb-4">
              {t.avatarsPage?.loginRequired || 'Prisijunkite, kad galėtumėte kurti modelius'}
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-[#10B981] text-white rounded-full hover:bg-[#059669] transition-all"
            >
              {t.auth?.signIn || 'Prisijungti'}
            </button>
          </div>
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
          {t.avatarsPage?.title || 'Modelių kūrimas'}
        </h1>
        <p className="text-[#999999] text-sm mt-2">
          {t.avatarsPage?.subtitle || 'Sukurkite AI modelius nuotraukoms ir įrašams'}
        </p>
      </div>

      {/* Main creation card */}
      <div className="bg-white border border-[#E5E5E3] rounded-2xl p-8 md:p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">
            {t.avatarsPage?.createTitle || 'Kurkite savo AI modelį'}
          </h2>
          <p className="text-[#999999] text-sm mb-8 max-w-md">
            {t.avatarsPage?.createDescription || 'Pasirinkite bruožus, generuokite nuotraukas su AI ir sukurkite unikalų modelį savo turiniui'}
          </p>

          <button
            onClick={() => setShowCreatorModal(true)}
            className="px-10 py-4 bg-[#10B981] text-white rounded-full hover:bg-[#059669] transition-all text-lg font-semibold shadow-lg shadow-emerald-200 flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t.avatarsPage?.createButton || 'Sukurti naują modelį'}
          </button>

          {/* Model count info */}
          {models.length > 0 && (
            <p className="mt-6 text-sm text-[#999999]">
              {(t.avatarsPage?.modelCount || 'Turite {count} {label}.').replace('{count}', String(models.length)).replace('{label}', models.length === 1 ? (t.avatarsPage?.modelCountOne || 'modelį') : models.length < 10 ? (t.avatarsPage?.modelCountFew || 'modelius') : (t.avatarsPage?.modelCountMany || 'modelių'))}{' '}
              <a href="/gallery" className="text-[#10B981] hover:text-[#059669] underline transition-colors">
                {t.avatarsPage?.viewGallery || 'Peržiūrėti galeriją'}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Avatar creator modal */}
      <AvatarCreatorModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
        targetModelId={undefined}
        onSaved={refresh}
        models={models}
        createModel={createModel}
        addGeneratedPhotoToModel={addGeneratedPhotoToModel}
        deletePhoto={deletePhoto}
      />
    </div>
  );
}
