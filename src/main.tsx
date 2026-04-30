import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Look = {
  title: string;
  code: string;
  note: string;
  alt: string;
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
    title: "Denim Static",
    code: "FIT-01",
    note: "Washed blue, stacked shape, no clean-room polish.",
    alt: "Created-only fashion slot for denim streetwear styling",
  },
  {
    title: "Chrome Bite",
    code: "JWL-02",
    note: "The accessory becomes the headline.",
    alt: "Created-only fashion slot for jewelry styling",
  },
  {
    title: "Late Utility",
    code: "DRP-03",
    note: "Black layers for city movement after dark.",
    alt: "Created-only fashion slot for dark utility styling",
  },
  {
    title: "Flash Archive",
    code: "ARC-04",
    note: "A created post that feels pulled from a folder called proof.",
    alt: "Created-only fashion slot for archive styling",
  },
  {
    title: "Sport Fragment",
    code: "RUN-05",
    note: "Retro sport energy, sharper than nostalgia.",
    alt: "Created-only fashion slot for sport styling",
  },
  {
    title: "Concrete Ease",
    code: "BLK-06",
    note: "Quiet fit, hard pavement, loose posture.",
    alt: "Created-only fashion slot for concrete street styling",
  },
];

const articles: Article[] = [
  {
    eyebrow: "Cover Story",
    title: "The created image is the new fashion clipping.",
    dek: "Sench//Index now runs in created-only mode: the layout is ready for original SenchTV pins and avoids saved images from other creators.",
  },
  {
    eyebrow: "Accessories",
    title: "Chrome is not decoration. It is punctuation.",
    dek: "A hard shine can change the whole fit. Grillz, chains, rings, and metal hardware do the talking before the clothes do.",
  },
  {
    eyebrow: "Texture",
    title: "Washed fabric keeps the silhouette human.",
    dek: "Future visuals should come from created posts only, not saved-board images from other accounts.",
  },
];

const signals: Signal[] = [
  { label: "Source", value: "created pins only" },
  { label: "Status", value: "no public created images returned" },
  { label: "Texture", value: "denim / metal / flash" },
  { label: "Rule", value: "no saved-pin images" },
];

function CreatedVisual({ code, label }: { code: string; label: string }) {
  return (
    <div className="createdVisual" role="img" aria-label={label}>
      <span>{code}</span>
      <strong>Created-only</strong>
      <em>No public created pin image returned</em>
    </div>
  );
}

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
          <a href="https://za.pinterest.com/SenchTV/_created/" target="_blank" rel="noreferrer">Created</a>
        </div>
      </nav>

      <section className="cover" id="top">
        <div className="noise" aria-hidden="true" />
        <div className="coverMasthead">
          <span>Issue 01</span>
          <span>Created-only magazine</span>
          <span>SenchTV / web edition</span>
        </div>
        <div className="coverGrid">
          <div className="coverCopy">
            <p className="kicker">Created pins only / no saved images</p>
            <h1>
              Streetwear scraps.
              <span>Chrome teeth.</span>
              <span>Denim evidence.</span>
            </h1>
            <p>
              This issue only accepts pictures created by the SenchTV Pinterest
              account. The public created feed currently returned no image URLs,
              so saved-pin photos have been removed.
            </p>
            <a className="action" href="#contents">Read issue</a>
          </div>

          <div className="coverStack" aria-label="Magazine cover collage">
            {looks.slice(0, 4).map((look, index) => (
              <figure className={`clip clip${index + 1}`} key={look.code}>
                <CreatedVisual code={look.code} label={look.alt} />
                <figcaption>{look.code}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="crawl" aria-label="Moodboard keywords">
        <div>
          <span>created pins only</span>
          <span>no saved images</span>
          <span>original posts</span>
          <span>street uniform</span>
          <span>washed black</span>
          <span>loose silhouette</span>
          <span>reference culture</span>
        </div>
      </section>

      <section className="contents" id="contents">
        <div>
          <p className="kicker">Contents</p>
          <h2>Inside the issue.</h2>
        </div>
        <ol className="contentsList">
          <li><a href="#features"><span>01</span> Cover story: created-image archive</a></li>
          <li><a href="#lookbook"><span>02</span> Six created-only fit slots</a></li>
          <li><a href="#signals"><span>03</span> Source rules and image status</a></li>
          <li><a href="#editor"><span>04</span> Editor note and credits</a></li>
        </ol>
      </section>

      <section className="features" id="features">
        <div className="sectionIntro">
          <p className="kicker">Features</p>
          <h2>Original images only.</h2>
        </div>
        <div className="articleGrid">
          {articles.map((article) => (
            <article className="articleCard" key={article.title}>
              <CreatedVisual code={article.eyebrow.slice(0, 3).toUpperCase()} label={article.title} />
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
          <h2>Built for SenchTV-created pictures only.</h2>
        </div>
        <div className="fileGrid">
          {looks.map((look, index) => (
            <article className="file" key={look.code}>
              <div className="fileImage">
                <CreatedVisual code={look.code} label={look.alt} />
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
          <CreatedVisual code="SRC" label="Created-only Pinterest source status" />
        </div>
        <div className="signalCopy">
          <p className="kicker">Style signals</p>
          <h2>The source rule is strict.</h2>
          <p>
            The public Pinterest created tab returned no created pin image URLs.
            Until those original URLs are available, the site uses designed image
            slots instead of photos saved from other accounts.
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
          <p className="kicker">Editor note</p>
          <h2>Only created pins belong here.</h2>
          <p>
            I checked the public SenchTV created page and it returned an empty
            created-pin image feed. The magazine is now ready for those original
            images, but it no longer displays saved pins from other Pinterest users.
          </p>
        </div>
        <div className="credits">
          <span>Source rule</span>
          <strong>SenchTV created pins only</strong>
          <span>Current public feed</span>
          <strong>No created images returned</strong>
          <span>Format</span>
          <strong>React / TypeScript / CSS magazine site</strong>
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
