import fs from "fs";
import path from "path";

const IMAGES_DIR = "images";
const OUT_FILE = "deck.json";
const DECK_NAME = "My Deck";

// Supported image types
const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function isImage(file) {
  return exts.has(path.extname(file).toLowerCase());
}

function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Missing folder: ${IMAGES_DIR}/`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter(isImage)
    // natural sort: img2 before img10
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  const images = files.map((file) => {
    const base = path.basename(file, path.extname(file));
    return { id: base, src: `${IMAGES_DIR}/${file}` };
  });

  const deck = { name: DECK_NAME, images };

  fs.writeFileSync(OUT_FILE, JSON.stringify(deck, null, 2) + "\n", "utf8");
  console.log(`Wrote ${OUT_FILE} with ${images.length} images.`);
}

main();
