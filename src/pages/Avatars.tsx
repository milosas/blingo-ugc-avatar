import { useState, useRef } from 'react';
import { useAvatarModels } from '../hooks/useAvatarModels';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { LoginModal } from '../components/auth/LoginModal';
import { AvatarCreatorModal } from '../components/avatars/AvatarCreatorModal';
import { ModelManagementCard } from '../components/avatars/ModelManagementCard';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerChildren';

export default function Avatars() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const {
    models,
    loading: modelsLoading,
    createModel,
    addGeneratedPhotoToModel,
    deleteModel,
    deletePhoto,
    setCover,
    renameModel,
    refresh,
  } = useAvatarModels();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [creatorTargetModelId, setCreatorTargetModelId] = useState<string | undefined>();
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [creatingModel, setCreatingModel] = useState(false);

  const newModelFileInputRef = useRef<HTMLInputElement>(null);

  const loading = authLoading || modelsLoading;

  const handleCreateModel = async () => {
    if (!newModelName.trim()) return;
    setCreatingModel(true);
    try {
      const model = await createModel(newModelName.trim());
      if (model) setExpandedModelId(model.id);
      setNewModelName('');
      setShowCreateModel(false);
    } catch (error) {
      console.error('Failed to create model:', error);
      alert(error instanceof Error ? error.message : 'Failed to create model');
    } finally {
      setCreatingModel(false);
    }
  };

  const handleCreateModelWithFile = () => {
    newModelFileInputRef.current?.click();
  };

  const handleNewModelFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert(t.avatarsPage?.invalidFileType || 'Only JPEG and PNG files are allowed');
      return;
    }

    const name = newModelName.trim() || 'Model';
    setCreatingModel(true);
    try {
      const model = await createModel(name, file);
      if (model) setExpandedModelId(model.id);
      setNewModelName('');
      setShowCreateModel(false);
    } catch (error) {
      console.error('Failed to create model:', error);
      alert(error instanceof Error ? error.message : 'Failed to create model');
    } finally {
      setCreatingModel(false);
    }
    e.target.value = '';
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6B35] border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {t.avatarsPage?.title || 'My Avatars'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF0EB] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-[#666666] mb-4">
              {t.avatarsPage?.loginRequired || 'Log in to manage your custom avatars'}
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all"
            >
              {t.auth?.signIn || 'Sign In'}
            </button>
          </div>
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
        {t.avatarsPage?.title || 'My Avatars'}
      </h1>
      <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#999999] text-sm">
              {models.length > 0
                ? `${models.length}/10 ${t.avatarModels?.modelsCount || 'modeliai'}`
                : t.avatarsPage?.noAvatars || 'No models yet'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateModel(!showCreateModel)}
              className="px-4 py-2 bg-[#F7F7F5] text-[#1A1A1A] border border-[#E5E5E3] rounded-full hover:bg-[#EFEFED] transition-all flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t.avatarModels?.createModel || 'Create model'}
            </button>
            <button
              onClick={() => { setCreatorTargetModelId(undefined); setShowCreatorModal(true); }}
              className="px-4 py-2 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI {t.avatarCreator?.createAvatar || 'Create avatar'}
            </button>
          </div>
        </div>

        {/* Inline create model form */}
        {showCreateModel && (
          <div className="flex gap-2 items-center mb-4">
            <input
              value={newModelName}
              onChange={(e) => setNewModelName(e.target.value)}
              placeholder={t.avatarModels?.modelName || 'Model name'}
              className="flex-1 px-4 py-2.5 text-sm border border-[#E5E5E3] rounded-xl focus:outline-none focus:border-[#FF6B35]"
              onKeyDown={(e) => { if (e.key === 'Enter') handleCreateModel(); }}
              autoFocus
            />
            <button
              onClick={handleCreateModel}
              disabled={creatingModel || !newModelName.trim()}
              className="px-4 py-2.5 text-sm bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2B] disabled:opacity-50 transition-colors"
            >
              {creatingModel ? '...' : (t.avatarModels?.createModel || 'Create')}
            </button>
            <button
              onClick={handleCreateModelWithFile}
              disabled={creatingModel}
              className="px-4 py-2.5 text-sm border border-[#E5E5E3] rounded-xl hover:bg-[#F7F7F5] transition-colors flex items-center gap-2"
              title={t.avatarModels?.addPhoto || 'With photo'}
            >
              <svg className="w-4 h-4 text-[#999999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t.avatarModels?.addPhoto || 'With photo'}
            </button>
            <button
              onClick={() => { setShowCreateModel(false); setNewModelName(''); }}
              className="px-3 py-2.5 text-sm text-[#999999] hover:text-[#1A1A1A] transition-colors"
            >
              {t.customAvatars?.cancel || 'Cancel'}
            </button>
          </div>
        )}

        {/* Empty state */}
        {models.length === 0 && !showCreateModel && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF0EB] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-[#1A1A1A] mb-2">
              {t.avatarsPage?.emptyTitle || 'No models yet'}
            </p>
            <p className="text-[#999999] text-sm mb-4">
              {t.avatarsPage?.emptyHint || 'Create a model and add photos to use in generation'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModel(true)}
                className="px-4 py-2 bg-[#F7F7F5] text-[#1A1A1A] border border-[#E5E5E3] rounded-full hover:bg-[#EFEFED] transition-all text-sm"
              >
                {t.avatarModels?.createModel || 'Create model'}
              </button>
              <button
                onClick={() => { setCreatorTargetModelId(undefined); setShowCreatorModal(true); }}
                className="px-4 py-2 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all text-sm"
              >
                AI {t.avatarCreator?.createAvatar || 'Create avatar'}
              </button>
            </div>
          </div>
        )}

        {/* Models grid */}
        {models.length > 0 && (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.06}>
            {models.map((model) => (
              <StaggerItem key={model.id}>
                <ModelManagementCard
                  model={model}
                  isExpanded={expandedModelId === model.id}
                  onToggleExpand={() => setExpandedModelId(expandedModelId === model.id ? null : model.id)}
                  onRename={renameModel}
                  onDeleteModel={deleteModel}
                  onDeletePhoto={deletePhoto}
                  onSetCover={setCover}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </div>

      {/* Hidden file input for new model creation */}
      <input
        ref={newModelFileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleNewModelFileChange}
        className="hidden"
      />

      {/* Avatar creator modal */}
      <AvatarCreatorModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
        targetModelId={creatorTargetModelId}
        onSaved={refresh}
        models={models}
        createModel={createModel}
        addGeneratedPhotoToModel={addGeneratedPhotoToModel}
        deletePhoto={deletePhoto}
      />
    </div>
  );
}
