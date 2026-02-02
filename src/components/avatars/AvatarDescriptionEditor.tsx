import { useState, useEffect, useRef } from 'react';

interface AvatarDescriptionEditorProps {
  initialDescription: string;
  onSave: (description: string) => Promise<void>;
  onClose: () => void;
  isPending: boolean; // Show "Analyzing..." state
}

export function AvatarDescriptionEditor({
  initialDescription,
  onSave,
  onClose,
  isPending,
}: AvatarDescriptionEditorProps) {
  const [text, setText] = useState(initialDescription);
  const [saving, setSaving] = useState(false);

  const maxLength = 200;
  const charThreshold = 160; // 80% of maxLength
  const charCount = text.length;
  const showCounter = charCount >= charThreshold;
  const isAtLimit = charCount === maxLength;
  const hasChanges = text !== initialDescription;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Prevent pasting beyond max length
    const pastedText = e.clipboardData.getData('text');
    const currentText = text;
    const selectionStart = (e.target as HTMLTextAreaElement).selectionStart;
    const selectionEnd = (e.target as HTMLTextAreaElement).selectionEnd;

    const beforeSelection = currentText.substring(0, selectionStart);
    const afterSelection = currentText.substring(selectionEnd);
    const newText = beforeSelection + pastedText + afterSelection;

    if (newText.length > maxLength) {
      e.preventDefault();
      setText(newText.slice(0, maxLength));
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saving || !hasChanges || isPending) return;

    setSaving(true);
    try {
      await onSave(text);
    } catch (error) {
      console.error('Failed to save description:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="w-full bg-white rounded-lg p-3 shadow-lg">
      {/* Textarea */}
      <textarea
        value={text}
        onChange={handleInputChange}
        onPaste={handlePaste}
        maxLength={maxLength}
        disabled={isPending}
        className={`w-full h-20 px-3 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isPending ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'
        }`}
        placeholder={
          isPending
            ? 'AI is analyzing the image...'
            : 'Describe the avatar for generation prompts...'
        }
        autoFocus={!isPending}
      />

      {/* Character counter */}
      {showCounter && !isPending && (
        <div className={`text-xs mt-1 ${isAtLimit ? 'text-red-600' : 'text-gray-500'}`}>
          {charCount}/{maxLength}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2 mt-2">
        {/* Cancel button */}
        <button
          onClick={handleClose}
          disabled={saving}
          className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors disabled:opacity-50"
        >
          Cancel
        </button>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges || isPending}
          className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
