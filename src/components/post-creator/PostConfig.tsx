import type { PostConfig as PostConfigType } from '../../types/database';

interface PostConfigProps {
  tone: PostConfigType['tone'];
  emoji: PostConfigType['emoji'];
  length: PostConfigType['length'];
  onToneChange: (v: PostConfigType['tone']) => void;
  onEmojiChange: (v: PostConfigType['emoji']) => void;
  onLengthChange: (v: PostConfigType['length']) => void;
  labels: {
    tone: string;
    emoji: string;
    length: string;
    tones: Record<string, string>;
    emojis: Record<string, string>;
    lengths: Record<string, string>;
  };
}

function OptionButton<T extends string>({
  value,
  current,
  label,
  onClick,
}: {
  value: T;
  current: T;
  label: string;
  onClick: (v: T) => void;
}) {
  const isSelected = value === current;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isSelected
          ? 'bg-[#FF6B35] text-white shadow-sm'
          : 'bg-[#F7F7F5] text-[#666] hover:bg-[#EEEEED] hover:text-[#1A1A1A]'
      }`}
    >
      {label}
    </button>
  );
}

export function PostConfigPanel({ tone, emoji, length, onToneChange, onEmojiChange, onLengthChange, labels }: PostConfigProps) {
  const toneOptions: { value: PostConfigType['tone']; key: string }[] = [
    { value: 'professional', key: 'professional' },
    { value: 'friendly', key: 'friendly' },
    { value: 'motivating', key: 'motivating' },
    { value: 'humorous', key: 'humorous' },
  ];

  const emojiOptions: { value: PostConfigType['emoji']; key: string }[] = [
    { value: 'yes', key: 'yes' },
    { value: 'no', key: 'no' },
    { value: 'minimal', key: 'minimal' },
  ];

  const lengthOptions: { value: PostConfigType['length']; key: string }[] = [
    { value: 'short', key: 'short' },
    { value: 'medium', key: 'medium' },
    { value: 'long', key: 'long' },
  ];

  return (
    <div className="space-y-4">
      {/* Tone */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">{labels.tone}</label>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map(opt => (
            <OptionButton
              key={opt.value}
              value={opt.value}
              current={tone}
              label={labels.tones[opt.key] || opt.key}
              onClick={onToneChange}
            />
          ))}
        </div>
      </div>

      {/* Emoji */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">{labels.emoji}</label>
        <div className="flex flex-wrap gap-2">
          {emojiOptions.map(opt => (
            <OptionButton
              key={opt.value}
              value={opt.value}
              current={emoji}
              label={labels.emojis[opt.key] || opt.key}
              onClick={onEmojiChange}
            />
          ))}
        </div>
      </div>

      {/* Length */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">{labels.length}</label>
        <div className="flex flex-wrap gap-2">
          {lengthOptions.map(opt => (
            <OptionButton
              key={opt.value}
              value={opt.value}
              current={length}
              label={labels.lengths[opt.key] || opt.key}
              onClick={onLengthChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
