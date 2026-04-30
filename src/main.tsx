import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Look = {
  title: string;
  pin: string;
  image: string;
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
    title: "Blue Fold",
    pin: "Pin 9535",
    image: "https://i.pinimg.com/736x/81/b7/95/81b7955f8a71bf2388414a8b59919d92.jpg",
    note: "A created SenchTV frame with washed denim, sharp contrast, and magazine-cover weight.",
    alt: "SenchTV created Pinterest fashion image with blue denim styling",
  },
  {
    title: "White Signal",
    pin: "Pin 9613",
    image: "https://i.pinimg.com/736x/ee/fe/ed/eefeed26d894b54ad4d74347579296cd.jpg",
    note: "Clean light, hard pose, and a graphic silhouette built for a spread.",
    alt: "SenchTV created Pinterest fashion image with bright styling",
  },
  {
    title: "Red Impact",
    pin: "Pin 9622",
    image: "https://i.pinimg.com/736x/cb/b6/4e/cbb64ed60dc3a31f80b714d65403e4c9.jpg",
    note: "A bold created post with enough color pressure to lead the whole issue.",
    alt: "SenchTV created Pinterest fashion image with red styling",
  },
  {
    title: "Blue Fold Detail",
    pin: "Pin 9535",
    image: "https://i.pinimg.com/736x/81/b7/95/81b7955f8a71bf2388414a8b59919d92.jpg",
    note: "Repeated as an editorial crop so every visible photo still comes from the created pins.",
    alt: "Editorial crop from SenchTV created Pinterest fashion image",
  },
  {
    title: "White Signal Detail",
    pin: "Pin 9613",
    image: "https://i.pinimg.com/736x/ee/fe/ed/eefeed26d894b54ad4d74347579296cd.jpg",
    note: "A second magazine crop from the created source image, keeping the page full.",
    alt: "Editorial crop from SenchTV created bright Pinterest fashion image",
  },
  {
    title: "Red Impact Detail",
    pin: "Pin 9622",
    image: "https://i.pinimg.com/736x/cb/b6/4e/cbb64ed60dc3a31f80b714d65403e4c9.jpg",
    note: "The final crop repeats the created image set instead of pulling from saved pins.",
    alt: "Editorial crop from SenchTV created red Pinterest fashion image",
  },
];

const articles: Article[] = [
  {
    eyebrow: "Cover Story",
    title: "Three created pins become a full fashion issue.",
    dek: "Sench//Index now displays only the images from the SenchTV created pin URLs you provided.",
  },
  {
    eyebrow: "Layout",
    title: "The same image can become cover, crop, and proof.",
    dek: "The issue repeats the three created pictures as editorial crops so no saved-board images sneak in.",
  },
  {
    eyebrow: "Source",
    title: "Every visible photo traces back to the created pins.",
    dek: "Only the three supplied SenchTV created pin pages are used as the image source for this build.",
  },
];

const signals: Signal[] = [
  { label: "Source", value: "created pins only" },
  { label: "Images", value: "3 supplied pins" },
  { label: "Texture", value: "blue / white / red" },
  { label: "Rule", value: "no saved-pin images" },
];

function PinImage({ look }: { look: Look }) {
  return (
    <img src={look.image} alt={look.alt} loading="lazy" referrerPolicy="no-referrer" />
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
              SenchTV.
              <span>Created pins.</span>
              <span>Full issue.</span>
            </h1>
            <p>
              This issue displays only the pictures from the SenchTV created pin
              links you gave me. No saved-board photos, no outside Pinterest images.
            </p>
            <a className="action" href="#contents">Read issue</a>
          </div>

          <div className="coverStack" aria-label="Magazine cover collage">
            {looks.slice(0, 4).map((look, index) => (
              <figure className={`clip clip${index + 1}`} key={`${look.pin}-${index}`}>
                <PinImage look={look} />
                <figcaption>{look.pin}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="crawl" aria-label="Moodboard keywords">
        <div>
          <span>created pins only</span>
          <span>three supplied pictures</span>
          <span>original SenchTV posts</span>
          <span>street uniform</span>
          <span>image-led issue</span>
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
          <li><a href="#features"><span>01</span> Cover story: created-image issue</a></li>
          <li><a href="#lookbook"><span>02</span> Six crops from three created pins</a></li>
          <li><a href="#signals"><span>03</span> Source rules and pin credits</a></li>
          <li><a href="#editor"><span>04</span> Editor note and credits</a></li>
        </ol>
      </section>

      <section className="features" id="features">
        <div className="sectionIntro">
          <p className="kicker">Features</p>
          <h2>Created pictures on page.</h2>
        </div>
        <div className="articleGrid">
          {articles.map((article, index) => (
            <article className="articleCard" key={article.title}>
              <PinImage look={looks[index]} />
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
          <h2>All photos from your created pins.</h2>
        </div>
        <div className="fileGrid">
          {looks.map((look, index) => (
            <article className="file" key={`${look.pin}-${index}`}>
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
        <div className="signalPoster">
          <PinImage look={looks[2]} />
        </div>
        <div className="signalCopy">
          <p className="kicker">Style signals</p>
          <h2>The pictures are live.</h2>
          <p>
            I pulled the actual image URLs from the three SenchTV created pin pages
            you sent and used only those photos across the magazine.
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
          <h2>Only your created pins belong here.</h2>
          <p>
            The magazine now uses the pictures from pins 1020980178040299535,
            1020980178040299613, and 1020980178040299622. Those images are repeated
            as editorial crops to make the page feel like a complete fashion issue.
          </p>
        </div>
        <div className="credits">
          <span>Source rule</span>
          <strong>SenchTV created pins only</strong>
          <span>Current image set</span>
          <strong>3 supplied created pins</strong>
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
