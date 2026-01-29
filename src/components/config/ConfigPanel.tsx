import { Select } from '../ui/Select';
import { useLanguage } from '../../contexts/LanguageContext';
import { AVATARS, SCENES, STYLES, MOODS, ASPECT_RATIOS, RESOLUTIONS, IMAGE_COUNTS, getRandomPlaceholder } from '../../constants/fluxOptions';
import type { Avatar, Scene, Style, Mood, AspectRatioOption, ResolutionOption, ImageCountOption, Config } from '../../types';

interface ConfigPanelProps {
  config: Config;
  onConfigChange: (config: Config) => void;
}

export function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const { t } = useLanguage();

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

  const handleImprovise = () => {
    const randomPrompt = getRandomPlaceholder();
    onConfigChange({ ...config, userPrompt: randomPrompt });
  };

  // Find selected options for Select components
  const selectedAspectRatio = ASPECT_RATIOS.find(ar => ar.id === config.aspectRatio) || null;
  const selectedResolution = RESOLUTIONS.find(r => r.id === config.resolution) || null;
  const selectedImageCount = IMAGE_COUNTS.find(ic => ic.id === config.imageCount) || null;

  // Get translated name for avatar
  const getAvatarName = (avatar: Avatar) => {
    const translated = t.avatars[avatar.id as keyof typeof t.avatars];
    return translated?.name || avatar.name;
  };

  const getAvatarDescription = (avatar: Avatar) => {
    const translated = t.avatars[avatar.id as keyof typeof t.avatars];
    return translated?.description || avatar.description;
  };

  // Get translated name for scene
  const getSceneName = (scene: Scene) => {
    const translated = t.scenes[scene.id as keyof typeof t.scenes];
    return translated?.name || scene.name;
  };

  // Get translated name for style
  const getStyleName = (style: Style) => {
    const translated = t.styles[style.id as keyof typeof t.styles];
    return translated?.name || style.name;
  };

  // Get translated name for mood
  const getMoodName = (mood: Mood) => {
    const translated = t.moods[mood.id as keyof typeof t.moods];
    return translated?.name || mood.name;
  };

  // Get translated name for resolution
  const getResolutionName = (res: ResolutionOption) => {
    const translated = t.resolutions[res.id as keyof typeof t.resolutions];
    return translated?.name || res.name;
  };

  // Get translated name for image count
  const getImageCountName = (ic: ImageCountOption) => {
    const translated = t.imageCounts[ic.id as keyof typeof t.imageCounts];
    return translated?.name || ic.name;
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">
        {t.config.title}
      </h2>

      {/* Avatar Selection with Image Preview */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {t.config.modelLabel} <span className="text-red-500">*</span>
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
              <div className="aspect-square bg-gray-100 rounded-md mb-1 overflow-hidden">
                <img
                  src={avatar.imageUrl}
                  alt={getAvatarName(avatar)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<div class="flex items-center justify-center text-2xl w-full h-full">${avatar.id.includes('woman') ? '👩' : '👨'}</div>`;
                    }
                  }}
                />
              </div>
              <p className="text-xs font-medium text-gray-700 truncate">{getAvatarName(avatar)}</p>
            </button>
          ))}
        </div>
        {config.avatar && (
          <p className="text-xs text-gray-500">{getAvatarDescription(config.avatar)}</p>
        )}
      </div>

      {/* Scene Selection */}
      <Select<Scene>
        value={config.scene}
        onChange={handleSceneChange}
        options={SCENES}
        getLabel={getSceneName}
        label={t.config.sceneLabel}
        placeholder={t.config.placeholder}
      />
      {config.scene && (
        <p className="text-xs text-gray-500 -mt-3">
          {t.scenes[config.scene.id as keyof typeof t.scenes]?.description || config.scene.description}
        </p>
      )}

      {/* Style Selection */}
      <Select<Style>
        value={config.style}
        onChange={handleStyleChange}
        options={STYLES}
        getLabel={getStyleName}
        label={t.config.styleLabel}
        placeholder={t.config.placeholder}
      />
      {config.style && (
        <p className="text-xs text-gray-500 -mt-3">
          {t.styles[config.style.id as keyof typeof t.styles]?.description || config.style.description}
        </p>
      )}

      {/* Mood Selection */}
      <Select<Mood>
        value={config.mood}
        onChange={handleMoodChange}
        options={MOODS}
        getLabel={getMoodName}
        label={t.config.moodLabel}
        placeholder={t.config.placeholder}
      />
      {config.mood && (
        <p className="text-xs text-gray-500 -mt-3">
          {t.moods[config.mood.id as keyof typeof t.moods]?.description || config.mood.description}
        </p>
      )}

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* User Prompt Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {t.config.promptLabel} <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleImprovise}
            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md hover:bg-indigo-200 transition-colors flex items-center gap-1"
          >
            <span>✨</span> {t.config.improvise}
          </button>
        </div>
        <textarea
          value={config.userPrompt}
          onChange={handlePromptChange}
          placeholder={t.config.promptPlaceholder}
          rows={3}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
        />
        <p className="text-xs text-gray-500">
          {t.config.promptHint}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Technical Settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">{t.config.technicalSettings}</h3>

        {/* Image Count - Full Width */}
        <Select<ImageCountOption>
          value={selectedImageCount}
          onChange={handleImageCountChange}
          options={IMAGE_COUNTS}
          getLabel={getImageCountName}
          label={t.config.imageCount}
          placeholder={t.config.placeholder}
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Aspect Ratio */}
          <Select<AspectRatioOption>
            value={selectedAspectRatio}
            onChange={handleAspectRatioChange}
            options={ASPECT_RATIOS}
            getLabel={(option) => option.name}
            label={t.config.format}
            placeholder={t.config.placeholder}
          />

          {/* Resolution */}
          <Select<ResolutionOption>
            value={selectedResolution}
            onChange={handleResolutionChange}
            options={RESOLUTIONS}
            getLabel={getResolutionName}
            label={t.config.quality}
            placeholder={t.config.placeholder}
          />
        </div>
        {selectedAspectRatio && (
          <p className="text-xs text-gray-500">{selectedAspectRatio.description}</p>
        )}
      </div>
    </div>
  );
}
