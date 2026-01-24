import type { Avatar } from '../../types';
import { UI_TEXT } from '../../constants/ui';

interface AvatarDescriptionProps {
  avatar: Avatar | null;
}

export function AvatarDescription({ avatar }: AvatarDescriptionProps) {
  if (!avatar) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 italic">
          Pasirinkite avatara, kad pamatytumete aprasyma
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-medium text-blue-900 mb-1">
        {UI_TEXT.config.descriptionLabel}
      </h4>
      <p className="text-sm text-blue-800">
        {avatar.description}
      </p>
      <div className="mt-2 flex gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
          {avatar.vibe}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          {avatar.skinTone}
        </span>
      </div>
    </div>
  );
}
