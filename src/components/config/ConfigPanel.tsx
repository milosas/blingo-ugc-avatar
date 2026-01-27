import { Select } from '../ui/Select';
import { AVATARS, SCENES, STYLES, MOODS, ASPECT_RATIOS, RESOLUTIONS, IMAGE_COUNTS } from '../../constants/fluxOptions';
import type { Avatar, Scene, Style, Mood, AspectRatioOption, ResolutionOption, ImageCountOption, Config } from '../../types';

interface ConfigPanelProps {
  config: Config;
  onConfigChange: (config: Config) => void;
}

export function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const handleAvatarChange = (avatar: Avatar) => {
    onConfigChange({ ...config, avatar });
  };

  const handleSceneChange = (scene: Scene) => {
    onConfigChange({ ...config, scene });
  };

  const handleStyleChange = (style: Style) => {
    onConfigChange({ ...config, style });
  };

  const handleMoodChange = (mood: Mood) => {
    onConfigChange({ ...config, mood });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ ...config, userPrompt: e.target.value });
  };

  const handleAspectRatioChange = (option: AspectRatioOption) => {
    onConfigChange({ ...config, aspectRatio: option.id });
  };

  const handleResolutionChange = (option: ResolutionOption) => {
    onConfigChange({ ...config, resolution: option.id });
  };

  const handleImageCountChange = (option: ImageCountOption) => {
    onConfigChange({ ...config, imageCount: option.id });
  };

  // Find selected options for Select components
  const selectedAspectRatio = ASPECT_RATIOS.find(ar => ar.id === config.aspectRatio) || null;
  const selectedResolution = RESOLUTIONS.find(r => r.id === config.resolution) || null;
  const selectedImageCount = IMAGE_COUNTS.find(ic => ic.id === config.imageCount) || null;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Generation Settings
      </h2>

      {/* Avatar Selection with Image Preview */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Avatar <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => handleAvatarChange(avatar)}
              className={`relative p-2 rounded-lg border-2 transition-all ${
                config.avatar?.id === avatar.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-square bg-gray-100 rounded-md mb-1 flex items-center justify-center text-2xl">
                {avatar.id.includes('woman') ? '👩' : '👨'}
              </div>
              <p className="text-xs font-medium text-gray-700 truncate">{avatar.name}</p>
            </button>
          ))}
        </div>
        {config.avatar && (
          <p className="text-xs text-gray-500">{config.avatar.description}</p>
        )}
      </div>

      {/* Scene Selection */}
      <Select<Scene>
        value={config.scene}
        onChange={handleSceneChange}
        options={SCENES}
        getLabel={(scene) => scene.name}
        label="Scene"
        placeholder="Select scene"
      />
      {config.scene && (
        <p className="text-xs text-gray-500 -mt-3">{config.scene.description}</p>
      )}

      {/* Style Selection */}
      <Select<Style>
        value={config.style}
        onChange={handleStyleChange}
        options={STYLES}
        getLabel={(style) => style.name}
        label="Style"
        placeholder="Select style"
      />
      {config.style && (
        <p className="text-xs text-gray-500 -mt-3">{config.style.description}</p>
      )}

      {/* Mood Selection */}
      <Select<Mood>
        value={config.mood}
        onChange={handleMoodChange}
        options={MOODS}
        getLabel={(mood) => mood.name}
        label="Mood"
        placeholder="Select mood"
      />
      {config.mood && (
        <p className="text-xs text-gray-500 -mt-3">{config.mood.description}</p>
      )}

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* User Prompt Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Your Instructions <span className="text-red-500">*</span>
        </label>
        <textarea
          value={config.userPrompt}
          onChange={handlePromptChange}
          placeholder="e.g., Put these jeans on the model, full body shot"
          rows={3}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
        />
        <p className="text-xs text-gray-500">
          Describe what you want to do with your uploaded clothing image
        </p>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Technical Settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Technical Settings</h3>

        {/* Image Count - Full Width */}
        <Select<ImageCountOption>
          value={selectedImageCount}
          onChange={handleImageCountChange}
          options={IMAGE_COUNTS}
          getLabel={(option) => option.name}
          label="Nuotraukų kiekis"
          placeholder="Pasirinkite"
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Aspect Ratio */}
          <Select<AspectRatioOption>
            value={selectedAspectRatio}
            onChange={handleAspectRatioChange}
            options={ASPECT_RATIOS}
            getLabel={(option) => option.name}
            label="Aspect Ratio"
            placeholder="Ratio"
          />

          {/* Resolution */}
          <Select<ResolutionOption>
            value={selectedResolution}
            onChange={handleResolutionChange}
            options={RESOLUTIONS}
            getLabel={(option) => option.name}
            label="Resolution"
            placeholder="Quality"
          />
        </div>
      </div>
    </div>
  );
}
