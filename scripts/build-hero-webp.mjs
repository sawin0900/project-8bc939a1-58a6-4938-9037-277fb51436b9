import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "heroes");

/** [source under src/, output filename] — thematic picks from existing assets */
const jobs = [
  ["src/assets/images/salvage-crane-operation.jpg", "services.webp"],
  ["src/assets/images/metal-cutting-sparks.jpg", "demontazh.webp"],
  ["src/assets/images/pontoon-salvage.jpg", "etapy.webp"],
  ["src/assets/images/documentation-blueprints.jpg", "documentation.webp"],
  ["src/assets/hero-salvage.jpg", "projects.webp"],
  ["src/assets/images/vladivostok-port.jpg", "news.webp"],
  ["src/assets/images/diver-underwater-inspection.jpg", "articles.webp"],
  ["src/assets/images/pier-inspection-divers.jpg", "contacts.webp"],
  ["src/assets/images/sunken-ship-ecological.jpg", "article.webp"],
  ["src/assets/images/floating-crane-salvage.jpg", "news-detail.webp"],
  ["src/assets/images/emergency-maritime.jpg", "emergency.webp"],
  ["src/assets/images/diving-team-equipment.jpg", "faq.webp"],
];

await mkdir(outDir, { recursive: true });

async function writeWebp(inputRel, outName) {
  const inputPath = path.join(root, inputRel);
  let width = 1680;
  let quality = 82;

  for (let i = 0; i < 8; i++) {
    const buf = await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality, effort: 4 })
      .toBuffer();
    const kb = buf.length / 1024;
    if (kb <= 400 || quality <= 62) {
      const outPath = path.join(outDir, outName);
      await sharp(buf).toFile(outPath);
      console.log(`${outName}: ${Math.round(kb)} KB (w=${width}, q=${quality})`);
      return;
    }
    if (kb > 420 && width > 1280) width -= 120;
    else quality -= 5;
  }
}

for (const [input, output] of jobs) {
  await writeWebp(input, output);
}
