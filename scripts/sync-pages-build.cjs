const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const pagesBuild = path.join(root, "pages-build");
const pageNames = [
  "index.html",
  "404.html",
  "view.html",
  "contents.html",
  "features.html",
  "cover-story.html",
  "departments.html",
  "trend.html",
  "wall.html",
  "runway.html",
  "motion.html",
  "lookbook.html",
  "signals.html",
  "editor.html",
];
const pageMeta = {
  "index.html": {
    key: "home",
    title: "Sench//Index",
    label: "Sench//Index / South African fashion magazine",
    heading: "Mzansi. Street. Style.",
    summary:
      "A visual issue on Johannesburg layers, Durban ease, Cape Town thrift, township tailoring, beadwork colour, shweshwe pattern, and amapiano nightlife.",
  },
  "404.html": {
    key: "home",
    title: "Sench//Index",
    label: "Sench//Index / South African fashion magazine",
    heading: "Mzansi. Street. Style.",
    summary:
      "A visual issue on Johannesburg layers, Durban ease, Cape Town thrift, township tailoring, beadwork colour, shweshwe pattern, and amapiano nightlife.",
  },
  "view.html": {
    key: "home",
    title: "Sench//Index",
    label: "Sench//Index / South African fashion magazine",
    heading: "Mzansi. Street. Style.",
    summary:
      "A visual issue on Johannesburg layers, Durban ease, Cape Town thrift, township tailoring, beadwork colour, shweshwe pattern, and amapiano nightlife.",
  },
  "contents.html": {
    key: "contents",
    title: "Contents / Sench//Index",
    label: "Contents / Full issue map",
    heading: "Inside the issue.",
    summary: "Open the separate feature, city, trend, image wall, runway, motion, lookbook, and editor pages.",
  },
  "features.html": {
    key: "features",
    title: "Features / Sench//Index",
    label: "Features / Streetwear language",
    heading: "Streetwear with a local accent.",
    summary: "Cover story features on South African streetwear, amapiano silhouettes, and heritage construction.",
  },
  "cover-story.html": {
    key: "cover-story",
    title: "Cover Story / Sench//Index",
    label: "Cover story / Heritage and heat",
    heading: "Fashion between heritage and heat.",
    summary: "A cover-story page about Joburg layers, Durban ease, Cape Town polish, and modern Mzansi style.",
  },
  "departments.html": {
    key: "departments",
    title: "Departments / Sench//Index",
    label: "Departments / Three cities",
    heading: "Joburg. Durban. Cape Town.",
    summary: "Three city departments with different fashion temperatures, silhouettes, and street codes.",
  },
  "trend.html": {
    key: "trend",
    title: "Trend Report / Sench//Index",
    label: "Trend report / Colour and silhouette",
    heading: "What style is saying.",
    summary: "Shweshwe blue, taxi-rank colour, amapiano volume, and heritage detail in one report.",
  },
  "wall.html": {
    key: "wall",
    title: "Image Wall / Sench//Index",
    label: "Image wall / Street-style archive",
    heading: "Frame by frame.",
    summary: "An expanded visual wall of South African fashion images, details, textures, and colour.",
  },
  "runway.html": {
    key: "runway",
    title: "Runway / Sench//Index",
    label: "Runway stream / Pinterest fashion",
    heading: "More looks in motion.",
    summary: "A moving runway stream of warm colour, chrome shine, outfit crops, and streetwear pace.",
  },
  "motion.html": {
    key: "motion",
    title: "Motion / Sench//Index",
    label: "Motion rail / Amapiano energy",
    heading: "Amapiano energy in motion.",
    summary: "A moving rail of fashion frames built around nightlife, movement, and local street style.",
  },
  "lookbook.html": {
    key: "lookbook",
    title: "Lookbook / Sench//Index",
    label: "Lookbook / Filter the mood",
    heading: "Filter the fashion mood.",
    summary: "Browse the issue by cover, street, and texture moods.",
  },
  "signals.html": {
    key: "signals",
    title: "Style Signals / Sench//Index",
    label: "Style signals / Issue codes",
    heading: "The issue speaks South African style.",
    summary: "City codes, climate, nightlife, and heritage details shaping the magazine's visual language.",
  },
  "editor.html": {
    key: "editor",
    title: "Editor Note / Sench//Index",
    label: "Editor note / Mzansi style",
    heading: "Mzansi style is not one thing.",
    summary: "An editor note on streetwear for heat, layering for the city, heritage in the details, and clothes that move.",
  },
};

function pageHtml(template, pageName) {
  const meta = pageMeta[pageName];

  return template
    .replace("<html lang=\"en\">", `<html lang="en" data-page="${meta.key}">`)
    .replace("<title>Sench//Index</title>", `<title>${meta.title}</title>`)
    .replace(/\s*<script type="module" crossorigin src="\.\/assets\/[^"]+"><\/script>/, "")
    .replace(
      /<p>Sench\/\/Index \/ South African fashion magazine<\/p>/,
      `<p>${meta.label}</p>`,
    )
    .replace(/<h1>Mzansi\. Street\. Style\.<\/h1>/, `<h1>${meta.heading}</h1>`)
    .replace(
      /A visual issue on Johannesburg layers, Durban ease, Cape Town thrift, township tailoring, beadwork colour, shweshwe pattern, and amapiano nightlife\./,
      meta.summary,
    );
}

for (const name of [...pageNames, "assets", "pages-build"]) {
  const target = path.join(root, name);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

fs.mkdirSync(pagesBuild, { recursive: true });

const sourceHtml = fs.readFileSync(path.join(dist, "source-index.html"), "utf8");

for (const pageName of pageNames) {
  fs.writeFileSync(path.join(root, pageName), pageHtml(sourceHtml, pageName));
}

fs.cpSync(path.join(dist, "assets"), path.join(root, "assets"), {
  recursive: true,
});

for (const pageName of pageNames) {
  fs.cpSync(path.join(root, pageName), path.join(pagesBuild, pageName));
}

fs.writeFileSync(path.join(pagesBuild, ".nojekyll"), "");
fs.cpSync(path.join(root, "assets"), path.join(pagesBuild, "assets"), {
  recursive: true,
});
