import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Look = {
  title: string;
  code: string;
  note: string;
  image: string;
  alt: string;
};

type Signal = {
  label: string;
  value: string;
};

const looks: Look[] = [
  {
    title: "Denim Static",
    code: "FIT-01",
    note: "Washed blue, stacked shape, no clean-room polish.",
    image: "https://i.pinimg.com/736x/2b/9e/e6/2b9ee65bf6bac9ae7ff918f49d95024c.jpg",
    alt: "Streetwear look with denim and layered menswear styling",
  },
  {
    title: "Chrome Bite",
    code: "JWL-02",
    note: "The accessory becomes the headline.",
    image: "https://i.pinimg.com/736x/a8/b7/5c/a8b75c1706c03509a6a30ee99b1ffd58.jpg",
    alt: "Close-up fashion detail with grillz and jewelry",
  },
  {
    title: "Late Utility",
    code: "DRP-03",
    note: "Black layers for city movement after dark.",
    image: "https://i.pinimg.com/736x/37/ad/87/37ad87af414392f19028af7ffe7dab83.jpg",
    alt: "Dark streetwear outfit inspiration",
  },
  {
    title: "Flash Archive",
    code: "ARC-04",
    note: "A saved image that feels pulled from a folder called proof.",
    image: "https://i.pinimg.com/736x/5b/9a/20/5b9a20dd7db72337bb6d18d7f78f7b17.jpg",
    alt: "Fashion inspiration from a Pinterest moodboard",
  },
  {
    title: "Sport Fragment",
    code: "RUN-05",
    note: "Retro sport energy, sharper than nostalgia.",
    image: "https://i.pinimg.com/736x/2f/71/b1/2f71b13df8073726652f841bfcec1ac5.jpg",
    alt: "Sport-inspired modern fashion outfit",
  },
  {
    title: "Concrete Ease",
    code: "BLK-06",
    note: "Quiet fit, hard pavement, loose posture.",
    image: "https://i.pinimg.com/736x/ce/1a/d6/ce1ad6cd28c793865073a7b11e9a10b6.jpg",
    alt: "Modern urban outfit from the SenchTV Pinterest profile",
  },
];

const signals: Signal[] = [
  { label: "Palette", value: "tar / steel / lime" },
  { label: "Shape", value: "wide / stacked / cropped" },
  { label: "Texture", value: "denim / metal / flash" },
  { label: "Rule", value: "one loud detail" },
];

function App() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top">Sench//Index</a>
        <div className="navLinks">
          <a href="#files">Files</a>
          <a href="#signals">Signals</a>
          <a href="https://za.pinterest.com/SenchTV/" target="_blank" rel="noreferrer">Board</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="noise" aria-hidden="true" />
        <div className="heroText">
          <p className="kicker">Public board extraction / fashion signal report</p>
          <h1>
            Streetwear scraps.
            <span> Chrome teeth.</span>
            <span> Denim evidence.</span>
          </h1>
          <div className="heroMeta">
            <p>Not a store page. Not a catalog. A moving fit board built from saved images and late-night taste.</p>
            <a className="action" href="#files">Open files</a>
          </div>
        </div>

        <div className="collage" aria-label="Animated fashion collage">
          {looks.slice(0, 5).map((look, index) => (
            <figure className={`clip clip${index + 1}`} key={look.image}>
              <img src={look.image} alt={look.alt} />
              <figcaption>{look.code}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="crawl" aria-label="Moodboard keywords">
        <div>
          <span>archive denim</span>
          <span>chrome detail</span>
          <span>street uniform</span>
          <span>washed black</span>
          <span>loose silhouette</span>
          <span>saved image energy</span>
        </div>
      </section>

      <section className="files" id="files">
        <div className="sectionIntro">
          <p className="kicker">Fit files</p>
          <h2>Looks that feel screen-grabbed, not styled for a showroom.</h2>
        </div>

        <div className="fileGrid">
          {looks.map((look, index) => (
            <article className="file" key={look.image}>
              <div className="fileImage">
                <img src={look.image} alt={look.alt} />
              </div>
              <div className="fileCopy">
                <span>{look.code}</span>
                <h3>{look.title}</h3>
                <p>{look.note}</p>
              </div>
              <b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="signals" id="signals">
        <div className="signalPoster">
          <img src="https://i.pinimg.com/736x/9a/65/dd/9a65ddff7c41307e69af3d42e7440a1d.jpg" alt="Layered streetwear fashion reference" />
        </div>
        <div className="signalCopy">
          <p className="kicker">Style signals</p>
          <h2>The identity is built from friction.</h2>
          <p>
            Every image pushes against the polished fashion-site formula: raw crops,
            abrupt contrast, saved-board rhythm, and styling that feels found before it feels sold.
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
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
