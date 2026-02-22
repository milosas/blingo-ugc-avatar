import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { composeDescription } from '../../hooks/useCustomAvatars';
import type { AvatarMetadata } from '../../hooks/useCustomAvatars';
import type { CustomAvatar } from '../../types/database';

interface AvatarMetadataEditorProps {
  avatar: CustomAvatar;
  onSave: (metadata: AvatarMetadata) => Promise<void>;
}

export function AvatarMetadataEditor({ avatar, onSave }: AvatarMetadataEditorProps) {
  const { t } = useLanguage();
  const meta = t.avatarMetadata;

  const [avatarType, setAvatarType] = useState<'photo' | 'stylized'>(avatar.avatar_type || 'photo');
  const [gender, setGender] = useState<AvatarMetadata['gender']>(avatar.gender || null);
  const [ageRange, setAgeRange] = useState<AvatarMetadata['age_range']>(avatar.age_range || null);
  const [hairColor, setHairColor] = useState<AvatarMetadata['hair_color']>(avatar.hair_color || null);
  const [hairLength, setHairLength] = useState<AvatarMetadata['hair_length']>(avatar.hair_length || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset when avatar changes
  useEffect(() => {
    setAvatarType(avatar.avatar_type || 'photo');
    setGender(avatar.gender || null);
    setAgeRange(avatar.age_range || null);
    setHairColor(avatar.hair_color || null);
    setHairLength(avatar.hair_length || null);
  }, [avatar]);

  const currentMetadata: AvatarMetadata = {
    avatar_type: avatarType,
    gender,
    age_range: ageRange,
    hair_color: hairColor,
    hair_length: hairLength,
  };

  const preview = composeDescription(currentMetadata);

  const hasChanges =
    avatarType !== (avatar.avatar_type || 'photo') ||
    gender !== (avatar.gender || null) ||
    ageRange !== (avatar.age_range || null) ||
    hairColor !== (avatar.hair_color || null) ||
    hairLength !== (avatar.hair_length || null);

  const handleSave = async () => {
    if (saving || !hasChanges) return;
    setSaving(true);
    setError(null);
    try {
      await onSave(currentMetadata);
    } catch (err) {
      console.error('Failed to save metadata:', err);
      setError(meta?.saveFailed || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const selectClass =
    'w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] text-[#1A1A1A] text-sm';
  const labelClass = 'block text-xs font-medium text-[#666666] mb-1';

  return (
    <div className="space-y-3">
      {/* Avatar Type */}
      <div>
        <label className={labelClass}>{meta?.avatarType || 'Model Type'}</label>
        <select
          value={avatarType}
          onChange={(e) => setAvatarType(e.target.value as 'photo' | 'stylized')}
          className={selectClass}
          disabled={saving}
        >
          <option value="photo">{meta?.typePhoto || 'Photo'}</option>
          <option value="stylized">{meta?.typeStylized || 'Stylized'}</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className={labelClass}>{meta?.gender || 'Gender'}</label>
        <select
          value={gender || ''}
          onChange={(e) => setGender((e.target.value || null) as AvatarMetadata['gender'])}
          className={selectClass}
          disabled={saving}
        >
          <option value="">{meta?.selectPlaceholder || 'Select...'}</option>
          <option value="male">{meta?.genderMale || 'Male'}</option>
          <option value="female">{meta?.genderFemale || 'Female'}</option>
          <option value="other">{meta?.genderOther || 'Other'}</option>
        </select>
      </div>

      {/* Age Range */}
      <div>
        <label className={labelClass}>{meta?.ageRange || 'Age Range'}</label>
        <select
          value={ageRange || ''}
          onChange={(e) => setAgeRange((e.target.value || null) as AvatarMetadata['age_range'])}
          className={selectClass}
          disabled={saving}
        >
          <option value="">{meta?.selectPlaceholder || 'Select...'}</option>
          <option value="child">{meta?.ageChild || 'Child'}</option>
          <option value="teen">{meta?.ageTeen || 'Teen'}</option>
          <option value="young_adult">{meta?.ageYoungAdult || 'Young Adult'}</option>
          <option value="adult">{meta?.ageAdult || 'Adult'}</option>
          <option value="senior">{meta?.ageSenior || 'Senior'}</option>
        </select>
      </div>

      {/* Hair Color */}
      <div>
        <label className={labelClass}>{meta?.hairColor || 'Hair Color'}</label>
        <select
          value={hairColor || ''}
          onChange={(e) => setHairColor((e.target.value || null) as AvatarMetadata['hair_color'])}
          className={selectClass}
          disabled={saving}
        >
          <option value="">{meta?.selectPlaceholder || 'Select...'}</option>
          <option value="black">{meta?.hairBlack || 'Black'}</option>
          <option value="brown">{meta?.hairBrown || 'Brown'}</option>
          <option value="blonde">{meta?.hairBlonde || 'Blonde'}</option>
          <option value="red">{meta?.hairRed || 'Red'}</option>
          <option value="gray">{meta?.hairGray || 'Gray'}</option>
          <option value="white">{meta?.hairWhite || 'White'}</option>
          <option value="other">{meta?.hairOther || 'Other'}</option>
        </select>
      </div>

      {/* Hair Length */}
      <div>
        <label className={labelClass}>{meta?.hairLength || 'Hair Length'}</label>
        <select
          value={hairLength || ''}
          onChange={(e) => setHairLength((e.target.value || null) as AvatarMetadata['hair_length'])}
          className={selectClass}
          disabled={saving}
        >
          <option value="">{meta?.selectPlaceholder || 'Select...'}</option>
          <option value="short">{meta?.lengthShort || 'Short'}</option>
          <option value="medium">{meta?.lengthMedium || 'Medium'}</option>
          <option value="long">{meta?.lengthLong || 'Long'}</option>
          <option value="bald">{meta?.lengthBald || 'Bald'}</option>
        </select>
      </div>

      {/* Auto-composed description preview */}
      {preview && (
        <div className="bg-[#F7F7F5] rounded-lg px-3 py-2">
          <p className="text-xs font-medium text-[#666666] mb-1">
            {meta?.autoDescription || 'Auto-generated description'}
          </p>
          <p className="text-sm text-[#1A1A1A] italic">{preview}</p>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving || !hasChanges}
        className="w-full px-4 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
      >
        {saving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            {meta?.saving || 'Saving...'}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {meta?.save || 'Save'}
          </>
        )}
      </button>
    </div>
  );
}
