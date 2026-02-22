import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

interface AvatarDescriptionEditorProps {
  avatarId: string;
  initialDescription: string;
  isPending?: boolean;
  onSave: () => void;
}

export function AvatarDescriptionEditor({
  avatarId,
  initialDescription,
  onSave,
}: AvatarDescriptionEditorProps) {
  const { t } = useLanguage();
  const [description, setDescription] = useState(initialDescription);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxLength = 200;
  const charThreshold = 160; // 80% of maxLength
  const charCount = description.length;
  const showCounter = charCount >= charThreshold;
  const isAtLimit = charCount === maxLength;
  const hasChanges = description !== initialDescription;

  // Reset description when initialDescription changes
  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setError(null);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const currentText = description;
    const selectionStart = (e.target as HTMLTextAreaElement).selectionStart;
    const selectionEnd = (e.target as HTMLTextAreaElement).selectionEnd;

    const beforeSelection = currentText.substring(0, selectionStart);
    const afterSelection = currentText.substring(selectionEnd);
    const newText = beforeSelection + pastedText + afterSelection;

    if (newText.length > maxLength) {
      e.preventDefault();
      setDescription(newText.slice(0, maxLength));
    }
  };

  const handleSave = async () => {
    if (saving || !hasChanges) return;

    setSaving(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('custom_avatars')
        .update({ description: description.trim() || null })
        .eq('id', avatarId);

      if (updateError) throw updateError;

      onSave();
    } catch (err) {
      console.error('Failed to save description:', err);
      setError(t.avatarsPage?.saveFailed || 'Failed to save description');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Textarea */}
      <textarea
        value={description}
        onChange={handleInputChange}
        onPaste={handlePaste}
        maxLength={maxLength}
        disabled={saving}
        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder={t.avatarsPage?.descriptionPlaceholder || 'Describe this model (used for AI generation)...'}
      />

      {/* Character counter */}
      {showCounter && (
        <div className={`text-xs ${isAtLimit ? 'text-red-500' : 'text-gray-500'}`}>
          {charCount}/{maxLength}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving || !hasChanges}
        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {saving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            {t.avatarsPage?.saving || 'Saving...'}
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {t.avatarsPage?.saveDescription || 'Save Description'}
          </>
        )}
      </button>
    </div>
  );
}
