const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const files = fs
  .readdirSync(root)
  .filter((file) => /^pin-\d+\.html$/.test(file))
  .sort();

const images = new Map();

for (const file of files) {
  const source = fs
    .readFileSync(path.join(root, file), "utf8")
    .replace(/\\u002F/g, "/")
    .replace(/&amp;/g, "&")
    .replace(/\\\//g, "/");

  const urls = source.match(/https:\/\/i\.pinimg\.com\/(?:originals|736x|564x|474x|236x)\/[^"'\\<>\s]+?\.(?:jpg|jpeg|png|webp)/g) ?? [];

  for (const url of urls) {
    const clean = url.replace(/\\+$/, "");
    if (!images.has(clean)) {
      images.set(clean, []);
    }
    images.get(clean).push(file);
  }
}

for (const [url, sources] of images) {
  console.log(`${url}\n  ${[...new Set(sources)].join(", ")}`);
}

console.error(`Found ${images.size} unique Pinterest images from ${files.length} pin files.`);
