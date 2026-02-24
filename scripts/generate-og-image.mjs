import sharp from 'sharp';
import { writeFileSync } from 'fs';

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e1b4b"/>
      <stop offset="50%" style="stop-color:#312e81"/>
      <stop offset="100%" style="stop-color:#1e1b4b"/>
    </linearGradient>
    <radialGradient id="glow1" cx="20%" cy="25%" r="25%">
      <stop offset="0%" style="stop-color:rgba(79,70,229,0.2)"/>
      <stop offset="100%" style="stop-color:rgba(79,70,229,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="75%" r="30%">
      <stop offset="0%" style="stop-color:rgba(99,102,241,0.15)"/>
      <stop offset="100%" style="stop-color:rgba(99,102,241,0)"/>
    </radialGradient>
    <radialGradient id="glow3" cx="50%" cy="50%" r="35%">
      <stop offset="0%" style="stop-color:rgba(129,140,248,0.08)"/>
      <stop offset="100%" style="stop-color:rgba(129,140,248,0)"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Glowing orbs -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow1)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow2)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow3)"/>

  <!-- Subtle grid -->
  <g stroke="rgba(99,102,241,0.06)" stroke-width="1">
    ${Array.from({length: 31}, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${HEIGHT}"/>`).join('')}
    ${Array.from({length: 16}, (_, i) => `<line x1="0" y1="${i * 40}" x2="${WIDTH}" y2="${i * 40}"/>`).join('')}
  </g>

  <!-- Logo: reEDITme -->
  <text x="600" y="230" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="800" font-size="108">
    <tspan fill="#c7d2fe">re</tspan><tspan fill="#FF6B35">EDIT</tspan><tspan fill="#c7d2fe">me</tspan>
  </text>

  <!-- Orange accent line under EDIT -->
  <rect x="458" y="258" width="285" height="4" rx="2" fill="#FF6B35"/>

  <!-- Tagline -->
  <text x="600" y="330" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="600" font-size="34" fill="#c7d2fe" opacity="0.9">
    AI UGC turinio kurimo platforma
  </text>

  <!-- Feature pills -->
  <g font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="500" font-size="20">
    <!-- Pill 1 -->
    <rect x="190" y="390" width="200" height="44" rx="22" fill="rgba(99,102,241,0.2)" stroke="rgba(165,180,252,0.25)" stroke-width="1"/>
    <text x="290" y="418" text-anchor="middle" fill="#e0e7ff">AI Avatarai</text>

    <!-- Pill 2 -->
    <rect x="415" y="390" width="370" height="44" rx="22" fill="rgba(99,102,241,0.2)" stroke="rgba(165,180,252,0.25)" stroke-width="1"/>
    <text x="600" y="418" text-anchor="middle" fill="#e0e7ff">Nuotrauku generavimas</text>

    <!-- Pill 3 -->
    <rect x="810" y="390" width="200" height="44" rx="22" fill="rgba(99,102,241,0.2)" stroke="rgba(165,180,252,0.25)" stroke-width="1"/>
    <text x="910" y="418" text-anchor="middle" fill="#e0e7ff">Social turinys</text>
  </g>

  <!-- Bottom URL -->
  <text x="600" y="580" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="500" font-size="22" fill="rgba(165,180,252,0.4)">
    reeditme.vercel.app
  </text>
</svg>`;

const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync('public/og-image.png', buffer);
console.log('OG image created: public/og-image.png (1200x630)');
