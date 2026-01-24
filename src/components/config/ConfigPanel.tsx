import { Select } from '../ui/Select';
import { AvatarDescription } from './AvatarDescription';
import { AVATARS } from '../../constants/avatars';
import { SCENES } from '../../constants/scenes';
import { STYLES } from '../../constants/styles';
import { UI_TEXT } from '../../constants/ui';
import type { Avatar, Scene, Style, Config } from '../../types';

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

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">
        {UI_TEXT.config.title}
      </h2>

      {/* Avatar Selection */}
      <div className="space-y-3">
        <Select<Avatar>
          value={config.avatar}
          onChange={handleAvatarChange}
          options={AVATARS}
          getLabel={(avatar) => avatar.name}
          label={UI_TEXT.config.avatarLabel}
          placeholder={UI_TEXT.config.placeholder}
        />
        <AvatarDescription avatar={config.avatar} />
      </div>

      {/* Scene Selection */}
      <Select<Scene>
        value={config.scene}
        onChange={handleSceneChange}
        options={SCENES}
        getLabel={(scene) => scene.name}
        label={UI_TEXT.config.sceneLabel}
        placeholder={UI_TEXT.config.placeholder}
      />

      {/* Style Selection */}
      <Select<Style>
        value={config.style}
        onChange={handleStyleChange}
        options={STYLES}
        getLabel={(style) => style.name}
        label={UI_TEXT.config.styleLabel}
        placeholder={UI_TEXT.config.placeholder}
      />
    </div>
  );
}
