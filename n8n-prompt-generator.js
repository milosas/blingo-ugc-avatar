/**
 * n8n Code Node: Prompt Generator
 *
 * This code generates 3 different prompts for 3 camera angles
 * based on the avatar, scene, and style configuration.
 *
 * Input (from webhook):
 * {
 *   "image": "base64-encoded-string",
 *   "config": {
 *     "avatar": "modern-city",
 *     "scene": "studio",
 *     "style": "casual"
 *   }
 * }
 *
 * Output: Array of 3 prompt objects
 */

// Avatar definitions (from src/constants/avatars.ts)
const AVATARS = {
  'modern-city': {
    description: 'Jauna moteris miesto aplinkoje, modernus ir profesionalus stilius, pasitikinti laikysena',
    skinTone: 'light',
    vibe: 'urban professional'
  },
  'elegant': {
    description: 'Elegantiska moteris su subtilia estetika, idealiai tinka formaliems drabužiams',
    skinTone: 'medium',
    vibe: 'sophisticated elegance'
  },
  'sporty': {
    description: 'Atletiska ir energinga moteris, puikiai tinka sportiniams ir casual drabužiams',
    skinTone: 'light',
    vibe: 'athletic dynamic'
  },
  'vintage-indie': {
    description: 'Bohemisko stiliaus moteris su retro estetika, idealiai tinka vintage drabužiams',
    skinTone: 'medium',
    vibe: 'bohemian retro'
  }
};

// Scene definitions (from src/constants/scenes.ts)
const SCENES = {
  'studio': {
    description: 'Baltas/pilkas fonas su profesionaliu apsvietimu'
  },
  'urban': {
    description: 'Miesto aplinka su naturalia šviesa'
  },
  'minimal': {
    description: 'Svarus fonas su zen estetika'
  }
};

// Style definitions (from src/constants/styles.ts)
const STYLES = {
  'casual': {
    description: 'Kasdieniskas, patogus stilius'
  },
  'formal': {
    description: 'Profesionalus, elegantiskas stilius'
  },
  'sporty': {
    description: 'Atletiska, dinamiska estetika'
  },
  'vintage': {
    description: 'Retro, bohemiska estetika'
  }
};

// Get input from webhook
const input = $input.first().json;
const config = input.config;

// Get selected avatar, scene, and style
const avatar = AVATARS[config.avatar];
const scene = SCENES[config.scene];
const style = STYLES[config.style];

// Validate input
if (!avatar || !scene || !style) {
  throw new Error('Invalid configuration: avatar, scene, or style not found');
}

// Generate prompts for 3 camera angles
const prompts = [
  {
    angle: 'far',
    prompt: `Full body shot of a ${avatar.description} wearing the clothing item.
Setting: ${scene.description}.
Style: ${style.description}.
Vibe: ${avatar.vibe}.
Camera angle: Wide shot from distance, showing full outfit from head to toe and surrounding environment.
Professional fashion photography, 1024x1792 portrait format, Instagram-ready, high quality, natural lighting, sharp focus on clothing details.
Model pose: Standing confidently, full body visible.`
  },
  {
    angle: 'close',
    prompt: `Medium shot of a ${avatar.description} wearing the clothing item.
Setting: ${scene.description}.
Style: ${style.description}.
Vibe: ${avatar.vibe}.
Camera angle: Waist-up shot, focusing on upper body, torso, and clothing fit.
Professional fashion photography, 1024x1792 portrait format, Instagram-ready, high quality, natural lighting, sharp focus on fabric texture and clothing details.
Model pose: Relaxed upper body pose, showing how the clothing fits.`
  },
  {
    angle: 'veryClose',
    prompt: `Close-up shot of a ${avatar.description} wearing the clothing item.
Setting: ${scene.description}.
Style: ${style.description}.
Vibe: ${avatar.vibe}.
Camera angle: Chest and face close-up, emphasizing fabric texture, clothing fit, and style details.
Professional fashion photography, 1024x1792 portrait format, Instagram-ready, high quality, natural lighting, sharp focus on clothing material and how it drapes.
Model pose: Natural expression, showing clothing detail and fit on upper body.`
  }
];

// Return array of prompts
return prompts.map(p => ({ json: p }));
