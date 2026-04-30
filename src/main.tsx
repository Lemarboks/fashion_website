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

type Article = {
  eyebrow: string;
  title: string;
  dek: string;
  image: string;
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

const articles: Article[] = [
  {
    eyebrow: "Cover Story",
    title: "The saved image is the new fashion clipping.",
    dek: "Sench//Index treats the Pinterest board like a street archive: fragments, references, and outfit logic arranged into a living issue.",
    image: "https://i.pinimg.com/736x/9a/65/dd/9a65ddff7c41307e69af3d42e7440a1d.jpg",
  },
  {
    eyebrow: "Accessories",
    title: "Chrome is not decoration. It is punctuation.",
    dek: "A hard shine can change the whole fit. Grillz, chains, rings, and metal hardware do the talking before the clothes do.",
    image: "https://i.pinimg.com/736x/24/63/f5/2463f556c46aede0c874de646bdec32d.jpg",
  },
  {
    eyebrow: "Texture",
    title: "Washed fabric keeps the silhouette human.",
    dek: "The best references here feel worn in, not freshly unboxed. Denim, cotton, and shadow do most of the styling work.",
    image: "https://i.pinimg.com/736x/45/c9/fe/45c9feb227ef694bf5fb62d9a44b268f.jpg",
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
          <a href="#contents">Contents</a>
          <a href="#features">Features</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#editor">Editor</a>
          <a href="https://za.pinterest.com/SenchTV/" target="_blank" rel="noreferrer">Board</a>
        </div>
      </nav>

      <section className="cover" id="top">
        <div className="noise" aria-hidden="true" />
        <div className="coverMasthead">
          <span>Issue 01</span>
          <span>Digital fashion magazine</span>
          <span>Johannesburg / web edition</span>
        </div>
        <div className="coverGrid">
          <div className="coverCopy">
            <p className="kicker">Public board extraction / style report</p>
            <h1>
              Streetwear scraps.
              <span>Chrome teeth.</span>
              <span>Denim evidence.</span>
            </h1>
            <p>
              A full digital magazine built from saved-board references: outfit
              files, accessory notes, editor picks, and a raw cover story.
            </p>
            <a className="action" href="#contents">Read issue</a>
          </div>

          <div className="coverStack" aria-label="Magazine cover collage">
            {looks.slice(0, 4).map((look, index) => (
              <figure className={`clip clip${index + 1}`} key={look.image}>
                <img src={look.image} alt={look.alt} />
                <figcaption>{look.code}</figcaption>
              </figure>
            ))}
          </div>
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
          <span>reference culture</span>
        </div>
      </section>

      <section className="contents" id="contents">
        <div>
          <p className="kicker">Contents</p>
          <h2>Inside the issue.</h2>
        </div>
        <ol className="contentsList">
          <li><a href="#features"><span>01</span> Cover story: the saved image archive</a></li>
          <li><a href="#lookbook"><span>02</span> Six fit files from the board</a></li>
          <li><a href="#signals"><span>03</span> Style signals and outfit rules</a></li>
          <li><a href="#editor"><span>04</span> Editor picks and credits</a></li>
        </ol>
      </section>

      <section className="features" id="features">
        <div className="sectionIntro">
          <p className="kicker">Features</p>
          <h2>Long-form mood, short attention span.</h2>
        </div>
        <div className="articleGrid">
          {articles.map((article) => (
            <article className="articleCard" key={article.title}>
              <img src={article.image} alt="" />
              <div>
                <span>{article.eyebrow}</span>
                <h3>{article.title}</h3>
                <p>{article.dek}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lookbook" id="lookbook">
        <div className="sectionIntro">
          <p className="kicker">Lookbook</p>
          <h2>Looks that feel screen-grabbed, not showroom-styled.</h2>
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
          <img src="https://i.pinimg.com/736x/8e/ae/0d/8eae0da7d737f788368f9bce5c7fc57b.jpg" alt="Streetwear reference image from the Pinterest board" />
        </div>
        <div className="signalCopy">
          <p className="kicker">Style signals</p>
          <h2>The identity is built from friction.</h2>
          <p>
            Every spread pushes against the polished fashion-site formula: raw crops,
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

      <section className="editor" id="editor">
        <div className="editorLetter">
          <p className="kicker">Editor letter</p>
          <h2>Make the reference feel alive.</h2>
          <p>
            This issue is built like a moodboard you can scroll through: cover,
            contents, features, looks, and notes. The goal is not to copy a fashion
            house. The goal is to turn a taste archive into a sharp online magazine.
          </p>
        </div>
        <div className="credits">
          <span>Source board</span>
          <strong>SenchTV on Pinterest</strong>
          <span>Format</span>
          <strong>React / TypeScript / CSS magazine site</strong>
          <span>Motion</span>
          <strong>CSS collage, crawl, hover spreads</strong>
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
