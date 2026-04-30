import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Feature = {
  title: string;
  label: string;
  image: string;
  alt: string;
};

type Look = Feature & {
  note: string;
};

const gallery: Look[] = [
  {
    title: "Washed Denim",
    label: "01",
    note: "Stacked denim, clean tees, metal details.",
    image: "https://i.pinimg.com/736x/2b/9e/e6/2b9ee65bf6bac9ae7ff918f49d95024c.jpg",
    alt: "Streetwear look with denim and layered menswear styling",
  },
  {
    title: "Silver Mouth",
    label: "02",
    note: "Jewelry as the loudest part of the outfit.",
    image: "https://i.pinimg.com/736x/a8/b7/5c/a8b75c1706c03509a6a30ee99b1ffd58.jpg",
    alt: "Close-up fashion detail with grillz and jewelry",
  },
  {
    title: "Night Utility",
    label: "03",
    note: "Dark layers, practical silhouettes, sharp mood.",
    image: "https://i.pinimg.com/736x/37/ad/87/37ad87af414392f19028af7ffe7dab83.jpg",
    alt: "Dark streetwear outfit inspiration",
  },
  {
    title: "Soft Flash",
    label: "04",
    note: "Muted color, flash texture, relaxed confidence.",
    image: "https://i.pinimg.com/736x/5b/9a/20/5b9a20dd7db72337bb6d18d7f78f7b17.jpg",
    alt: "Editorial fashion inspiration from a Pinterest moodboard",
  },
  {
    title: "Archive Sport",
    label: "05",
    note: "Retro shapes with current street proportions.",
    image: "https://i.pinimg.com/736x/2f/71/b1/2f71b13df8073726652f841bfcec1ac5.jpg",
    alt: "Sport-inspired modern fashion outfit",
  },
  {
    title: "Concrete Fit",
    label: "06",
    note: "A calm fit built for moving through the city.",
    image: "https://i.pinimg.com/736x/ce/1a/d6/ce1ad6cd28c793865073a7b11e9a10b6.jpg",
    alt: "Modern urban outfit from the SenchTV Pinterest profile",
  },
];

const features: Feature[] = [
  {
    title: "Editorial Layering",
    label: "Fits",
    image: "https://i.pinimg.com/736x/9a/65/dd/9a65ddff7c41307e69af3d42e7440a1d.jpg",
    alt: "Layered streetwear fashion reference",
  },
  {
    title: "Texture Notes",
    label: "Mood",
    image: "https://i.pinimg.com/736x/45/c9/fe/45c9feb227ef694bf5fb62d9a44b268f.jpg",
    alt: "Fashion texture inspiration from Pinterest",
  },
  {
    title: "Accessory Signal",
    label: "Jewels",
    image: "https://i.pinimg.com/736x/24/63/f5/2463f556c46aede0c874de646bdec32d.jpg",
    alt: "Jewelry detail fashion inspiration",
  },
];

function App() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a href="#top" className="brand">SenchTV Edit</a>
        <div className="navLinks">
          <a href="#looks">Looks</a>
          <a href="#journal">Journal</a>
          <a href="https://za.pinterest.com/SenchTV/" target="_blank" rel="noreferrer">Pinterest</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="marquee" aria-hidden="true">
          <span>Streetwear / Jewelry / Archive / Texture /</span>
          <span>Streetwear / Jewelry / Archive / Texture /</span>
        </div>
        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Pinterest-sourced fashion direction</p>
            <h1>Modern streetwear with a magazine pulse.</h1>
            <p>
              A moving editorial front page built from the SenchTV moodboard:
              denim, silver, quiet confidence, and late-night utility.
            </p>
            <a className="cta" href="#looks">View the edit</a>
          </div>
          <div className="heroStack" aria-label="Featured Pinterest fashion images">
            {gallery.slice(0, 3).map((look, index) => (
              <img
                key={look.image}
                className={`heroImage heroImage${index + 1}`}
                src={look.image}
                alt={look.alt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Fashion themes">
        {["denim", "chrome", "oversized", "washed black", "layered", "street uniform"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="looks" id="looks">
        <div className="sectionHeading">
          <p className="eyebrow">Selected looks</p>
          <h2>Six frames from the board.</h2>
        </div>
        <div className="lookGrid">
          {gallery.map((look) => (
            <article className="lookCard" key={look.image}>
              <img src={look.image} alt={look.alt} />
              <div>
                <span>{look.label}</span>
                <h3>{look.title}</h3>
                <p>{look.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="journal" id="journal">
        <div className="journalCopy">
          <p className="eyebrow">Style system</p>
          <h2>Build the silhouette first, then let one detail speak.</h2>
          <p>
            The board leans into fits that read clean from far away and reward a
            closer look: stacked fabric, compact accessories, washed palettes,
            and one hard shine.
          </p>
        </div>
        <div className="featureRail">
          {features.map((feature) => (
            <figure key={feature.image}>
              <img src={feature.image} alt={feature.alt} />
              <figcaption>
                <span>{feature.label}</span>
                {feature.title}
              </figcaption>
            </figure>
          ))}
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
