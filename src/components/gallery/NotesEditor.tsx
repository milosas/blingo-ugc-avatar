import { useState, useEffect, useRef } from 'react';

interface NotesEditorProps {
  initialNote: string;
  onSave: (text: string) => Promise<void>;
  onDelete: () => Promise<void>;
  onClose: () => void;
  hasExistingNote: boolean;
}

export function NotesEditor({
  initialNote,
  onSave,
  onDelete,
  onClose,
  hasExistingNote,
}: NotesEditorProps) {
  const [noteText, setNoteText] = useState(initialNote);
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const deleteTimeoutRef = useRef<number | null>(null);

  const maxLength = 100;
  const charThreshold = 80; // 80% of maxLength
  const charCount = noteText.length;
  const showCounter = charCount >= charThreshold;
  const isAtLimit = charCount === maxLength;
  const hasChanges = noteText !== initialNote;

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Prevent pasting beyond max length
    const pastedText = e.clipboardData.getData('text');
    const currentText = noteText;
    const selectionStart = (e.target as HTMLTextAreaElement).selectionStart;
    const selectionEnd = (e.target as HTMLTextAreaElement).selectionEnd;

    const beforeSelection = currentText.substring(0, selectionStart);
    const afterSelection = currentText.substring(selectionEnd);
    const newText = beforeSelection + pastedText + afterSelection;

    if (newText.length > maxLength) {
      e.preventDefault();
      setNoteText(newText.slice(0, maxLength));
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saving || !hasChanges) return;

    setSaving(true);
    try {
      await onSave(noteText);
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirmingDelete) {
      // First click - start confirmation
      setConfirmingDelete(true);
      deleteTimeoutRef.current = window.setTimeout(() => {
        setConfirmingDelete(false);
      }, 3000);
      return;
    }

    // Second click - perform delete
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current);
    }

    setSaving(true);
    try {
      await onDelete();
    } catch (error) {
      console.error('Failed to delete note:', error);
      setSaving(false);
      setConfirmingDelete(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg p-4 text-white shadow-lg">
      {/* Textarea */}
      <textarea
        value={noteText}
        onChange={handleInputChange}
        onPaste={handlePaste}
        maxLength={maxLength}
        className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a note..."
        autoFocus
      />

      {/* Character counter */}
      {showCounter && (
        <div className={`text-xs mt-1 ${isAtLimit ? 'text-red-400' : 'text-gray-400'}`}>
          {charCount}/{maxLength}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2 mt-3">
        {/* Delete button - only show if note exists */}
        {hasExistingNote && (
          <button
            onClick={handleDeleteClick}
            disabled={saving}
            className={`p-2 rounded transition-colors ${
              confirmingDelete
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title={confirmingDelete ? 'Click again to confirm' : 'Delete note'}
          >
            {confirmingDelete ? (
              <span className="text-white text-xs font-medium px-1">Confirm</span>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        )}

        {/* Cancel button */}
        <button
          onClick={handleClose}
          disabled={saving}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
        >
          Cancel
        </button>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
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
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
