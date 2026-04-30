import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Mood = "all" | "cover" | "street" | "texture";

type Look = {
  title: string;
  pin: string;
  image: string;
  note: string;
  alt: string;
  mood: Exclude<Mood, "all">;
};

type Article = {
  eyebrow: string;
  title: string;
  dek: string;
};

type Signal = {
  label: string;
  value: string;
};

const looks: Look[] = [
  {
    title: "Blue Fold",
    pin: "Pin 9535",
    image: "https://i.pinimg.com/736x/81/b7/95/81b7955f8a71bf2388414a8b59919d92.jpg",
    note: "Washed denim, high contrast, and cover-weight framing.",
    alt: "SenchTV created Pinterest fashion image with blue denim styling",
    mood: "cover",
  },
  {
    title: "White Signal",
    pin: "Pin 9613",
    image: "https://i.pinimg.com/736x/ee/fe/ed/eefeed26d894b54ad4d74347579296cd.jpg",
    note: "Clean light and a graphic pose for the lead spread.",
    alt: "SenchTV created Pinterest fashion image with bright styling",
    mood: "cover",
  },
  {
    title: "Red Impact",
    pin: "Pin 9622",
    image: "https://i.pinimg.com/736x/cb/b6/4e/cbb64ed60dc3a31f80b714d65403e4c9.jpg",
    note: "A hard color hit that keeps the issue from going quiet.",
    alt: "SenchTV created Pinterest fashion image with red styling",
    mood: "cover",
  },
  {
    title: "Utility Crop",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/37/ad/87/37ad87af414392f19028af7ffe7dab83.jpg",
    note: "Sharp outerwear energy for the first new Pinterest drop.",
    alt: "Pinterest fashion image from supplied short link",
    mood: "street",
  },
  {
    title: "Concrete Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/5b/9a/20/5b9a20dd7db72337bb6d18d7f78f7b17.jpg",
    note: "Street styling with enough structure for a full-page crop.",
    alt: "Streetwear fashion image from supplied Pinterest short link",
    mood: "street",
  },
  {
    title: "Archive Flash",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/2f/71/b1/2f71b13df8073726652f841bfcec1ac5.jpg",
    note: "A reference-board moment made loud enough for print.",
    alt: "Fashion reference image from supplied Pinterest short link",
    mood: "texture",
  },
  {
    title: "Dark Layer",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/ce/1a/d6/ce1ad6cd28c793865073a7b11e9a10b6.jpg",
    note: "Black-on-black styling with a crisp silhouette.",
    alt: "Dark fashion image from supplied Pinterest short link",
    mood: "street",
  },
  {
    title: "Sharp White",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/82/5b/c5/825bc53a0c865f76c69fba0e6860ad94.jpg",
    note: "A bright frame that gives the layout breathing room.",
    alt: "Bright fashion image from supplied Pinterest short link",
    mood: "cover",
  },
  {
    title: "Metal Detail",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/a8/b7/5c/a8b75c1706c03509a6a30ee99b1ffd58.jpg",
    note: "Texture, hardware, and close-range styling cues.",
    alt: "Fashion texture image from supplied Pinterest short link",
    mood: "texture",
  },
  {
    title: "Night Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/2b/9e/e6/2b9ee65bf6bac9ae7ff918f49d95024c.jpg",
    note: "Late-city contrast with a clean editorial crop.",
    alt: "Night fashion image from supplied Pinterest short link",
    mood: "street",
  },
  {
    title: "Soft Static",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/e2/95/c7/e295c751653b9b2b85ee812bab7e8f1e.jpg",
    note: "A quieter image that keeps the spread from shouting.",
    alt: "Soft fashion image from supplied Pinterest short link",
    mood: "texture",
  },
  {
    title: "Red Frame",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/2d/06/44/2d06449697ebf6e3dafc2f8fa1284dec.jpg",
    note: "Color tension for the scroll gallery.",
    alt: "Colorful fashion image from supplied Pinterest short link",
    mood: "cover",
  },
  {
    title: "Bag Shape",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/9a/65/dd/9a65ddff7c41307e69af3d42e7440a1d.jpg",
    note: "Accessory-forward styling with a clean silhouette.",
    alt: "Accessory fashion image from supplied Pinterest short link",
    mood: "texture",
  },
  {
    title: "Studio Heat",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/45/c9/fe/45c9feb227ef694bf5fb62d9a44b268f.jpg",
    note: "A studio image with enough energy to sit beside the hero.",
    alt: "Studio fashion image from supplied Pinterest short link",
    mood: "cover",
  },
  {
    title: "Mono Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/79/fe/1d/79fe1d487c57ea124faad913e7d232d4.jpg",
    note: "A monochrome outfit read for the lookbook grid.",
    alt: "Monochrome fashion image from supplied Pinterest short link",
    mood: "street",
  },
  {
    title: "Warm Crop",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/24/63/f5/2463f556c46aede0c874de646bdec32d.jpg",
    note: "Warm tone, quick impact, strong editorial rhythm.",
    alt: "Warm fashion image from supplied Pinterest short link",
    mood: "cover",
  },
  {
    title: "Pattern Cut",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/8e/ae/0d/8eae0da7d737f788368f9bce5c7fc57b.jpg",
    note: "Pattern and posture for the texture lane.",
    alt: "Pattern fashion image from supplied Pinterest short link",
    mood: "texture",
  },
  {
    title: "Muted Proof",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/a8/85/37/a8853750b622649f7452ed45a6ce3008.jpg",
    note: "Muted styling, clean crop, strong proof-of-source feel.",
    alt: "Muted fashion image from supplied Pinterest short link",
    mood: "street",
  },
  {
    title: "Editorial Pose",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/7e/66/98/7e6698d55cb321b55e2564a20e88c312.jpg",
    note: "A direct magazine pose for the animated rail.",
    alt: "Editorial fashion image from supplied Pinterest short link",
    mood: "cover",
  },
  {
    title: "Texture Stack",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/75/da/07/75da073b3c225a2a32d04636c4c31d05.jpg",
    note: "Layered texture that works best in close crop.",
    alt: "Layered fashion texture image from supplied Pinterest short link",
    mood: "texture",
  },
  {
    title: "Loose Shape",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/d7/47/96/d7479613d6a610d64e55864d57e03406.jpg",
    note: "Volume, ease, and a relaxed silhouette.",
    alt: "Loose fashion styling image from supplied Pinterest short link",
    mood: "street",
  },
  {
    title: "Flash Detail",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/f9/f2/42/f9f2421f0a098545b46d443aa8ceedb4.jpg",
    note: "A small visual shock for the end of the gallery.",
    alt: "Fashion detail image from supplied Pinterest short link",
    mood: "texture",
  },
  {
    title: "Bright Archive",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/68/bd/46/68bd46c0d3d08a6253a4299231c28390.jpg",
    note: "Bright archive energy with a clean vertical frame.",
    alt: "Bright archive fashion image from supplied Pinterest short link",
    mood: "cover",
  },
  {
    title: "Final Layer",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/f1/b2/8c/f1b28c81a380bfb8af442fad8468dc3e.jpg",
    note: "A closing frame with enough density to end the scroll.",
    alt: "Layered final fashion image from supplied Pinterest short link",
    mood: "street",
  },
];

const articles: Article[] = [
  {
    eyebrow: "Cover Story",
    title: "The pinboard becomes a moving magazine.",
    dek: "The new issue blends your original created pins with the new Pinterest short-link set and turns the page into a faster, animated editorial system.",
  },
  {
    eyebrow: "Motion",
    title: "Hover, filter, scroll, and let the images cut through.",
    dek: "The page now uses animated cover cards, reveal effects, a moving image rail, and mood filters for a more modern fashion-site feel.",
  },
  {
    eyebrow: "Source",
    title: "Every visual comes from the Pinterest links you supplied.",
    dek: "The layout keeps the images external, lightweight, and responsive so GitHub Pages can serve the magazine without a backend.",
  },
];

const signals: Signal[] = [
  { label: "Images", value: `${looks.length} active frames` },
  { label: "Motion", value: "cover drift / reveals / rail" },
  { label: "Feature", value: "mood filters" },
  { label: "Format", value: "react / typescript / css" },
];

const moodFilters: { value: Mood; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cover", label: "Cover" },
  { value: "street", label: "Street" },
  { value: "texture", label: "Texture" },
];

function PinImage({ look, eager = false }: { look: Look; eager?: boolean }) {
  return (
    <img
      src={look.image}
      alt={look.alt}
      loading={eager ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
    />
  );
}

function App() {
  const [activeMood, setActiveMood] = useState<Mood>("all");
  const filteredLooks = useMemo(
    () => looks.filter((look) => activeMood === "all" || look.mood === activeMood),
    [activeMood],
  );
  const heroLooks = looks.slice(0, 5);
  const railLooks = [...looks.slice(3, 15), ...looks.slice(3, 15)];

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top">Sench//Index</a>
        <div className="navLinks">
          <a href="#contents">Contents</a>
          <a href="#features">Features</a>
          <a href="#motion">Motion</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#editor">Editor</a>
        </div>
      </nav>

      <section className="cover" id="top">
        <div className="noise" aria-hidden="true" />
        <div className="coverMasthead reveal">
          <span>Issue 02</span>
          <span>Animated pin magazine</span>
          <span>{looks.length} Pinterest frames</span>
        </div>
        <div className="coverGrid">
          <div className="coverCopy reveal">
            <p className="kicker">Pinterest images / motion edition</p>
            <h1>
              Pinboard.
              <span>Runway.</span>
              <span>Magazine.</span>
            </h1>
            <p>
              A modern fashion website built from the pictures in your Pinterest
              links, with animated editorial sections, hover movement, and a
              responsive gallery that works across screens.
            </p>
            <div className="actions">
              <a className="action" href="#lookbook">View gallery</a>
              <a className="ghostAction" href="https://pin.it/5Sk0eJC3d" target="_blank" rel="noreferrer">Source link</a>
            </div>
          </div>

          <div className="coverStack" aria-label="Magazine cover collage">
            {heroLooks.map((look, index) => (
              <figure className={`clip clip${index + 1}`} key={`${look.pin}-${look.title}`}>
                <PinImage look={look} eager={index < 2} />
                <figcaption>{look.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="crawl" aria-label="Moodboard keywords">
        <div>
          <span>animated editorial</span>
          <span>new pin.it image set</span>
          <span>responsive fashion grid</span>
          <span>hover motion</span>
          <span>mood filters</span>
          <span>moving image rail</span>
          <span>streetwear archive</span>
        </div>
      </section>

      <section className="contents" id="contents">
        <div className="reveal">
          <p className="kicker">Contents</p>
          <h2>Inside the issue.</h2>
        </div>
        <ol className="contentsList reveal">
          <li><a href="#features"><span>01</span> Features: animated editorial system</a></li>
          <li><a href="#motion"><span>02</span> Motion rail: moving Pinterest frames</a></li>
          <li><a href="#lookbook"><span>03</span> Lookbook: filter by image mood</a></li>
          <li><a href="#signals"><span>04</span> Signals: features and credits</a></li>
        </ol>
      </section>

      <section className="features" id="features">
        <div className="sectionIntro reveal">
          <p className="kicker">Features</p>
          <h2>Modern motion, image first.</h2>
        </div>
        <div className="articleGrid">
          {articles.map((article, index) => (
            <article className="articleCard reveal" key={article.title}>
              <PinImage look={looks[index + 3]} />
              <div>
                <span>{article.eyebrow}</span>
                <h3>{article.title}</h3>
                <p>{article.dek}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="motionStrip" id="motion" aria-label="Animated image rail">
        <div className="sectionIntro reveal">
          <p className="kicker">Motion rail</p>
          <h2>Scroll energy without the clutter.</h2>
        </div>
        <div className="rail">
          <div className="railTrack">
            {railLooks.map((look, index) => (
              <figure className="railFrame" key={`${look.title}-${index}`}>
                <PinImage look={look} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="lookbook" id="lookbook">
        <div className="sectionIntro reveal">
          <p className="kicker">Lookbook</p>
          <h2>Filter the visual mood.</h2>
          <div className="filterBar" aria-label="Filter lookbook by mood">
            {moodFilters.map((filter) => (
              <button
                className={activeMood === filter.value ? "active" : ""}
                key={filter.value}
                onClick={() => setActiveMood(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="fileGrid">
          {filteredLooks.map((look, index) => (
            <article className="file reveal" key={`${look.pin}-${look.title}`}>
              <div className="fileImage">
                <PinImage look={look} />
              </div>
              <div className="fileCopy">
                <span>{look.pin}</span>
                <h3>{look.title}</h3>
                <p>{look.note}</p>
              </div>
              <b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="signals" id="signals">
        <div className="signalPoster reveal">
          <PinImage look={looks[13]} />
        </div>
        <div className="signalCopy reveal">
          <p className="kicker">Style signals</p>
          <h2>The page moves now.</h2>
          <p>
            The site now has a larger Pinterest image set, animated cover cards,
            reveal transitions, a looping image rail, hover zooms, and filterable
            lookbook categories.
          </p>
          <div className="signalList">
            {signals.map((signal) => (
              <div key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editor" id="editor">
        <div className="editorLetter reveal">
          <p className="kicker">Editor note</p>
          <h2>Built like a digital fashion issue.</h2>
          <p>
            The new Pinterest short link added a much bigger visual pool, so the
            site now feels less like a static page and more like a full magazine:
            cover, contents, features, moving rail, filtered lookbook, and credits.
          </p>
        </div>
        <div className="credits reveal">
          <span>Primary links</span>
          <strong>SenchTV pins + pin.it/5Sk0eJC3d</strong>
          <span>Features</span>
          <strong>Animations, filters, image rail, responsive gallery</strong>
          <span>Format</span>
          <strong>React / TypeScript / CSS</strong>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
