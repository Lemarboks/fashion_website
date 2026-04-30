const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const pagesBuild = path.join(root, "pages-build");

for (const name of ["index.html", "assets", "pages-build"]) {
  const target = path.join(root, name);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

fs.mkdirSync(pagesBuild, { recursive: true });

fs.cpSync(path.join(dist, "source-index.html"), path.join(root, "index.html"));
fs.cpSync(path.join(dist, "source-index.html"), path.join(root, "404.html"));
fs.cpSync(path.join(dist, "assets"), path.join(root, "assets"), {
  recursive: true,
});

fs.cpSync(path.join(root, "index.html"), path.join(pagesBuild, "index.html"));
fs.cpSync(path.join(root, "404.html"), path.join(pagesBuild, "404.html"));
fs.cpSync(path.join(root, "assets"), path.join(pagesBuild, "assets"), {
  recursive: true,
});
