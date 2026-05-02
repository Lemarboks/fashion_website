const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const pagesBuild = path.join(root, "pages-build");

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const sourceTs = fs.readFileSync(path.join(root, "src", "main.tsx"), "utf8");
const lookMatches = [
  ...sourceTs.matchAll(
    /\{\s*title: "([^"]+)",\s*pin: "([^"]+)",\s*image: "([^"]+)",\s*note: "([^"]+)",\s*alt: "([^"]+)",\s*mood: "([^"]+)"/g,
  ),
];
const lookPages = lookMatches.map((match, index) => ({
  title: match[1],
  pin: match[2],
  image: match[3],
  note: match[4],
  alt: match[5],
  mood: match[6],
  slug: slugify(match[1]),
  index,
}));
const lookPageNames = lookPages.map((look) => `look-${look.slug}.html`);
const trendMatches = [
  ...sourceTs.matchAll(
    /\{\s*slug: "([^"]+)",\s*name: "([^"]+)",\s*city: "([^"]+)",\s*role: "([^"]+)",\s*outfit: "([^"]+)",\s*detail: "([^"]+)",\s*source: "([^"]+)",\s*sourceUrl: "([^"]+)",\s*artistImage: "([^"]+)",\s*trendImage: "([^"]+)",\s*imageSearchUrl: "([^"]+)"/g,
  ),
];
const trendPages = trendMatches.map((match) => ({
  slug: match[1],
  name: match[2],
  city: match[3],
  role: match[4],
  outfit: match[5],
  detail: match[6],
  source: match[7],
  sourceUrl: match[8],
  artistImage: match[9],
  trendImage: match[10],
  imageSearchUrl: match[11],
}));
const trendPageNames = trendPages.map((trend) => `trend-${trend.slug}.html`);
const pageNames = [
  "index.html",
  "404.html",
  "view.html",
  "contents.html",
  "cover-story.html",
  "departments.html",
  "trend.html",
  "wall.html",
  "runway.html",
  "motion.html",
  ...trendPageNames,
  "lookbook.html",
  ...lookPageNames,
  "signals.html",
  "editor.html",
];
const stalePageNames = ["features.html"];
const staleGeneratedLookPages = fs.existsSync(root)
  ? fs.readdirSync(root).filter((name) => /^look-(?!book\.html).+\.html$/.test(name) && !lookPageNames.includes(name))
  : [];
const staleGeneratedTrendPages = fs.existsSync(root)
  ? fs.readdirSync(root).filter((name) => /^trend-.+\.html$/.test(name) && !trendPageNames.includes(name))
  : [];
const pageMeta = {
  "index.html": {
    key: "home",
    title: "Mzansi x LDN / Sench//Index",
    label: "Sench//Index / Mzansi x LDN street style",
    heading: "Mzansi x LDN Street Style.",
    summary:
      "A cross-city fashion issue linking South African colour, township tailoring, amapiano-night silhouettes, and London streetwear codes.",
  },
  "404.html": {
    key: "home",
    title: "Mzansi x LDN / Sench//Index",
    label: "Sench//Index / Mzansi x LDN street style",
    heading: "Mzansi x LDN Street Style.",
    summary:
      "A cross-city fashion issue linking South African colour, township tailoring, amapiano-night silhouettes, and London streetwear codes.",
  },
  "view.html": {
    key: "home",
    title: "Mzansi x LDN / Sench//Index",
    label: "Sench//Index / Mzansi x LDN street style",
    heading: "Mzansi x LDN Street Style.",
    summary:
      "A cross-city fashion issue linking South African colour, township tailoring, amapiano-night silhouettes, and London streetwear codes.",
  },
  "contents.html": {
    key: "contents",
    title: "Contents / Sench//Index",
    label: "Contents / Full issue map",
    heading: "Inside the issue.",
    summary: "Open the separate city, trend, image wall, runway, trend rail, lookbook, and editor pages.",
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
    summary: "An expanded visual wall of street archive fashion images, details, textures, and colour.",
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
    title: "Trend Rail / Sench//Index",
    label: "Trend rail / SA x UK fit checks",
    heading: "SA x UK fit checks in motion.",
    summary: "A moving trend rail of artists, models, and outfit cues from South Africa and London.",
  },
  "lookbook.html": {
    key: "lookbook",
    title: "Lookbook / Sench//Index",
    label: "Lookbook / Filter the mood",
    heading: "Filter the fashion mood.",
    summary: "Browse the issue by cover, street, and texture moods.",
  },
  ...Object.fromEntries(
    trendPages.map((trend) => [
      `trend-${trend.slug}.html`,
      {
        key: "trend-detail",
        trendSlug: trend.slug,
        title: `${trend.name} / Trend Rail / Sench//Index`,
        label: `${trend.city} ${trend.role} / ${trend.source}`,
        heading: trend.name,
        summary: trend.detail,
        images: [trend.artistImage, trend.trendImage],
      },
    ]),
  ),
  ...Object.fromEntries(
    lookPages.map((look) => {
      const related = Array.from({ length: 8 }, (_, index) => lookPages[(look.index + index * 5) % lookPages.length]);

      return [
        `look-${look.slug}.html`,
        {
          key: "look-detail",
          lookSlug: look.slug,
          title: `${look.title} / Lookbook / Sench//Index`,
          label: `Lookbook file / ${look.mood}`,
          heading: look.title,
          summary: look.note,
          images: related.map((item) => item.image),
        },
      ];
    }),
  ),
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

const imageSets = {
  home: [
    "https://i.pinimg.com/736x/81/b7/95/81b7955f8a71bf2388414a8b59919d92.jpg",
    "https://i.pinimg.com/736x/ee/fe/ed/eefeed26d894b54ad4d74347579296cd.jpg",
    "https://i.pinimg.com/736x/cb/b6/4e/cbb64ed60dc3a31f80b714d65403e4c9.jpg",
    "https://i.pinimg.com/736x/37/ad/87/37ad87af414392f19028af7ffe7dab83.jpg",
    "https://i.pinimg.com/736x/5b/9a/20/5b9a20dd7db72337bb6d18d7f78f7b17.jpg",
    "https://i.pinimg.com/736x/2f/71/b1/2f71b13df8073726652f841bfcec1ac5.jpg",
  ],
  contents: [
    "https://i.pinimg.com/736x/07/bd/4c/07bd4ce5d88f710b18a803e723cafac1.jpg",
    "https://i.pinimg.com/736x/0f/77/c2/0f77c2044adfbdadd31800950699e191.jpg",
    "https://i.pinimg.com/736x/3d/34/fd/3d34fdf449480f50c3652d7b0be570cb.jpg",
    "https://i.pinimg.com/736x/52/a9/73/52a973afe615d9fca0905161ad4e5f22.jpg",
    "https://i.pinimg.com/736x/6a/54/fe/6a54fe5fc3c63d3256d7bf929896c679.jpg",
    "https://i.pinimg.com/736x/6d/65/f3/6d65f3139b6ad56a52972daec88d6c20.jpg",
  ],
  "cover-story": [
    "https://i.pinimg.com/736x/24/63/f5/2463f556c46aede0c874de646bdec32d.jpg",
    "https://i.pinimg.com/736x/8e/ae/0d/8eae0da7d737f788368f9bce5c7fc57b.jpg",
    "https://i.pinimg.com/736x/a8/85/37/a8853750b622649f7452ed45a6ce3008.jpg",
    "https://i.pinimg.com/736x/7e/66/98/7e6698d55cb321b55e2564a20e88c312.jpg",
    "https://i.pinimg.com/736x/75/da/07/75da073b3c225a2a32d04636c4c31d05.jpg",
    "https://i.pinimg.com/736x/d7/47/96/d7479613d6a610d64e55864d57e03406.jpg",
  ],
  departments: [
    "https://i.pinimg.com/736x/37/ad/87/37ad87af414392f19028af7ffe7dab83.jpg",
    "https://i.pinimg.com/736x/52/a9/73/52a973afe615d9fca0905161ad4e5f22.jpg",
    "https://i.pinimg.com/736x/a8/b7/5c/a8b75c1706c03509a6a30ee99b1ffd58.jpg",
    "https://i.pinimg.com/736x/5b/9a/20/5b9a20dd7db72337bb6d18d7f78f7b17.jpg",
    "https://i.pinimg.com/736x/45/c9/fe/45c9feb227ef694bf5fb62d9a44b268f.jpg",
    "https://i.pinimg.com/474x/43/6f/58/436f581dab42dcacce56d17af00f3ffd.jpg",
  ],
  trend: [
    "https://i.pinimg.com/736x/2f/71/b1/2f71b13df8073726652f841bfcec1ac5.jpg",
    "https://i.pinimg.com/736x/8e/ae/0d/8eae0da7d737f788368f9bce5c7fc57b.jpg",
    "https://i.pinimg.com/736x/6d/65/f3/6d65f3139b6ad56a52972daec88d6c20.jpg",
    "https://i.pinimg.com/736x/ae/c2/8d/aec28d3d691cfbf25041827721634e38.jpg",
    "https://i.pinimg.com/736x/0f/77/c2/0f77c2044adfbdadd31800950699e191.jpg",
    "https://i.pinimg.com/736x/78/e0/17/78e0179634cd4017d92c7f13415fcd1d.jpg",
  ],
  wall: [
    "https://i.pinimg.com/736x/ce/1a/d6/ce1ad6cd28c793865073a7b11e9a10b6.jpg",
    "https://i.pinimg.com/736x/82/5b/c5/825bc53a0c865f76c69fba0e6860ad94.jpg",
    "https://i.pinimg.com/736x/e2/95/c7/e295c751653b9b2b85ee812bab7e8f1e.jpg",
    "https://i.pinimg.com/736x/9a/65/dd/9a65ddff7c41307e69af3d42e7440a1d.jpg",
    "https://i.pinimg.com/736x/f9/f2/42/f9f2421f0a098545b46d443aa8ceedb4.jpg",
    "https://i.pinimg.com/474x/88/fb/94/88fb94a365cdf7ecca2cd434ae4d4fdf.jpg",
  ],
  runway: [
    "https://i.pinimg.com/236x/90/6b/81/906b81134f2cf2c1141876cdf2d2820d.jpg",
    "https://i.pinimg.com/236x/57/1e/6e/571e6eb9aa805aadf11ee141d81be56f.jpg",
    "https://i.pinimg.com/236x/eb/cb/3d/ebcb3d1553b55d6e47542bac139ea7ac.jpg",
    "https://i.pinimg.com/236x/bd/b3/50/bdb350f0b3ea12f41f3d3c14746436d7.jpg",
    "https://i.pinimg.com/236x/ff/d1/10/ffd1102e2ed150ac06b98a197759f7a5.jpg",
    "https://i.pinimg.com/236x/49/4e/0f/494e0f6548c5d977b8ae44af28213558.jpg",
  ],
  motion: [
    "https://i.pinimg.com/736x/2b/9e/e6/2b9ee65bf6bac9ae7ff918f49d95024c.jpg",
    "https://i.pinimg.com/736x/c3/26/08/c3260803164f302f54861b0ddcad607a.jpg",
    "https://i.pinimg.com/736x/78/e0/17/78e0179634cd4017d92c7f13415fcd1d.jpg",
    "https://i.pinimg.com/736x/0f/77/c2/0f77c2044adfbdadd31800950699e191.jpg",
    "https://i.pinimg.com/736x/52/a9/73/52a973afe615d9fca0905161ad4e5f22.jpg",
    "https://i.pinimg.com/736x/79/fe/1d/79fe1d487c57ea124faad913e7d232d4.jpg",
  ],
  lookbook: [
    "https://i.pinimg.com/736x/81/b7/95/81b7955f8a71bf2388414a8b59919d92.jpg",
    "https://i.pinimg.com/736x/82/5b/c5/825bc53a0c865f76c69fba0e6860ad94.jpg",
    "https://i.pinimg.com/736x/a8/b7/5c/a8b75c1706c03509a6a30ee99b1ffd58.jpg",
    "https://i.pinimg.com/736x/d7/47/96/d7479613d6a610d64e55864d57e03406.jpg",
    "https://i.pinimg.com/736x/95/dd/e9/95dde9d451d569429c6fe787e534d0c6.jpg",
    "https://i.pinimg.com/736x/6a/54/fe/6a54fe5fc3c63d3256d7bf929896c679.jpg",
  ],
  signals: [
    "https://i.pinimg.com/736x/a8/b7/5c/a8b75c1706c03509a6a30ee99b1ffd58.jpg",
    "https://i.pinimg.com/736x/ae/c2/8d/aec28d3d691cfbf25041827721634e38.jpg",
    "https://i.pinimg.com/736x/07/bd/4c/07bd4ce5d88f710b18a803e723cafac1.jpg",
    "https://i.pinimg.com/736x/6d/65/f3/6d65f3139b6ad56a52972daec88d6c20.jpg",
    "https://i.pinimg.com/736x/78/53/c2/7853c2f7e6da0eec2b8325936e3b045c.jpg",
    "https://i.pinimg.com/736x/2f/71/b1/2f71b13df8073726652f841bfcec1ac5.jpg",
  ],
  editor: [
    "https://i.pinimg.com/736x/7e/66/98/7e6698d55cb321b55e2564a20e88c312.jpg",
    "https://i.pinimg.com/736x/24/63/f5/2463f556c46aede0c874de646bdec32d.jpg",
    "https://i.pinimg.com/474x/b9/8b/17/b98b175e391022abbb8ae69134db0e70.jpg",
    "https://i.pinimg.com/474x/30/4c/bc/304cbcffa5ec29f8294ce1afb0fb6a4c.jpg",
    "https://i.pinimg.com/736x/f1/b2/8c/f1b28c81a380bfb8af442fad8468dc3e.jpg",
    "https://i.pinimg.com/736x/75/da/07/75da073b3c225a2a32d04636c4c31d05.jpg",
  ],
};

function fallbackGrid(meta) {
  const images = meta.images || imageSets[meta.key] || imageSets.home;
  const items = images
    .map(
      (image, index) =>
        `            <img src="${image}" alt="${meta.title} fashion image ${index + 1}" referrerpolicy="no-referrer" />`,
    )
    .join("\n");

  return `          <div class="static-fallback__grid" aria-label="${meta.title} image preview">\n${items}\n          </div>`;
}

function pageHtml(template, pageName) {
  const meta = pageMeta[pageName];

  return template
    .replace("<html lang=\"en\">", `<html lang="en" data-page="${meta.key}">`)
    .replace("<html lang=\"en\" data-page=\"trend-detail\">", `<html lang="en" data-page="trend-detail" data-trend="${meta.trendSlug || ""}">`)
    .replace("<html lang=\"en\" data-page=\"look-detail\">", `<html lang="en" data-page="look-detail" data-look="${meta.lookSlug || ""}">`)
    .replace("<title>Sench//Index</title>", `<title>${meta.title}</title>`)
    .replace(
      /<p>Sench\/\/Index \/ Mzansi x LDN street style<\/p>/,
      `<p>${meta.label}</p>`,
    )
    .replace(/<h1>Mzansi x LDN Street Style\.<\/h1>/, `<h1>${meta.heading}</h1>`)
    .replace(
      /A cross-city fashion issue linking South African colour, township tailoring, amapiano-night silhouettes, and London streetwear codes\./,
      meta.summary,
    )
    .replace(
      /          <div class="static-fallback__grid" aria-label="Created pin image preview">[\s\S]*?          <\/div>/,
      fallbackGrid(meta),
    );
}

for (const name of [...pageNames, ...stalePageNames, ...staleGeneratedLookPages, ...staleGeneratedTrendPages, "assets", "pages-build"]) {
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
