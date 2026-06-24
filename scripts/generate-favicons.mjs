import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const faviconSvg = readFileSync(join(root, 'public/favicon.svg'));
const ogSvg = readFileSync(join(root, 'public/og-image.svg'));

const sizes = [
  { name: 'favicon-16x16.png',        w: 16,   h: 16 },
  { name: 'favicon-32x32.png',        w: 32,   h: 32 },
  { name: 'apple-touch-icon.png',     w: 180,  h: 180 },
  { name: 'android-chrome-192x192.png', w: 192, h: 192 },
  { name: 'android-chrome-512x512.png', w: 512, h: 512 },
];

for (const { name, w, h } of sizes) {
  await sharp(faviconSvg).resize(w, h).png().toFile(join(root, 'public', name));
  console.log(`  generated public/${name}`);
}

await sharp(ogSvg).resize(1200, 630).png().toFile(join(root, 'public/og-image.png'));
console.log('  generated public/og-image.png');

console.log('Favicons done.');