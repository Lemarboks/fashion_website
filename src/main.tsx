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

type Department = {
  label: string;
  title: string;
  copy: string;
  look: Look;
};

type Trend = {
  name: string;
  detail: string;
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
    note: "Johannesburg outerwear: practical layers for taxis, campus pavements, and late plans.",
    alt: "South African streetwear image with sharp outerwear styling",
    mood: "street",
  },
  {
    title: "Concrete Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/5b/9a/20/5b9a20dd7db72337bb6d18d7f78f7b17.jpg",
    note: "Braamfontein structure, where oversized pieces still read sharp on the sidewalk.",
    alt: "South African streetwear image with concrete city styling",
    mood: "street",
  },
  {
    title: "Archive Flash",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/2f/71/b1/2f71b13df8073726652f841bfcec1ac5.jpg",
    note: "Colour and attitude that echo the speed of a taxi-rank palette.",
    alt: "South African fashion image with bold archive styling",
    mood: "texture",
  },
  {
    title: "Dark Layer",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/ce/1a/d6/ce1ad6cd28c793865073a7b11e9a10b6.jpg",
    note: "Black-on-black styling for Joburg nights, clean enough to carry the whole fit.",
    alt: "South African fashion image with dark layered styling",
    mood: "street",
  },
  {
    title: "Sharp White",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/82/5b/c5/825bc53a0c865f76c69fba0e6860ad94.jpg",
    note: "White space and polished confidence, the quiet side of modern Mzansi streetwear.",
    alt: "South African fashion image with bright clean styling",
    mood: "cover",
  },
  {
    title: "Metal Detail",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/a8/b7/5c/a8b75c1706c03509a6a30ee99b1ffd58.jpg",
    note: "Hardware, jewellery, and texture sharpen the look without needing a logo.",
    alt: "South African fashion texture image with metal detail",
    mood: "texture",
  },
  {
    title: "Night Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/2b/9e/e6/2b9ee65bf6bac9ae7ff918f49d95024c.jpg",
    note: "Amapiano-night contrast: easy movement, strong posture, clean city light.",
    alt: "South African nightlife fashion image",
    mood: "street",
  },
  {
    title: "Soft Static",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/e2/95/c7/e295c751653b9b2b85ee812bab7e8f1e.jpg",
    note: "Soft tones bring the calm between louder streetwear statements.",
    alt: "South African fashion image with soft muted styling",
    mood: "texture",
  },
  {
    title: "Red Frame",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/2d/06/44/2d06449697ebf6e3dafc2f8fa1284dec.jpg",
    note: "Red heat, made for a summer street scene that refuses to fade back.",
    alt: "South African fashion image with red colour styling",
    mood: "cover",
  },
  {
    title: "Bag Shape",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/9a/65/dd/9a65ddff7c41307e69af3d42e7440a1d.jpg",
    note: "Accessory-led styling, where the bag becomes part of the silhouette.",
    alt: "South African fashion accessory image",
    mood: "texture",
  },
  {
    title: "Studio Heat",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/45/c9/fe/45c9feb227ef694bf5fb62d9a44b268f.jpg",
    note: "Durban heat in a studio frame: bright, direct, and built for movement.",
    alt: "South African studio fashion image",
    mood: "cover",
  },
  {
    title: "Mono Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/79/fe/1d/79fe1d487c57ea124faad913e7d232d4.jpg",
    note: "Monochrome streetwear that keeps the fit focused on proportion.",
    alt: "South African monochrome streetwear image",
    mood: "street",
  },
  {
    title: "Warm Crop",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/24/63/f5/2463f556c46aede0c874de646bdec32d.jpg",
    note: "Warm tones with the glow of a late afternoon walk through the city.",
    alt: "South African fashion image with warm styling",
    mood: "cover",
  },
  {
    title: "Pattern Cut",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/8e/ae/0d/8eae0da7d737f788368f9bce5c7fc57b.jpg",
    note: "Pattern and posture nod to shweshwe energy without turning heritage into costume.",
    alt: "South African fashion image with pattern styling",
    mood: "texture",
  },
  {
    title: "Muted Proof",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/a8/85/37/a8853750b622649f7452ed45a6ce3008.jpg",
    note: "Muted tones carry the quieter side of Cape Town thrift culture.",
    alt: "South African fashion image with muted styling",
    mood: "street",
  },
  {
    title: "Editorial Pose",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/7e/66/98/7e6698d55cb321b55e2564a20e88c312.jpg",
    note: "A direct pose with the confidence of a street-style cover.",
    alt: "South African editorial fashion pose",
    mood: "cover",
  },
  {
    title: "Texture Stack",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/75/da/07/75da073b3c225a2a32d04636c4c31d05.jpg",
    note: "Layered texture gives local streetwear its hand-feel and depth.",
    alt: "South African fashion image with layered texture",
    mood: "texture",
  },
  {
    title: "Loose Shape",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/d7/47/96/d7479613d6a610d64e55864d57e03406.jpg",
    note: "Loose proportions built for heat, dance floors, and all-day comfort.",
    alt: "South African fashion image with loose styling",
    mood: "street",
  },
  {
    title: "Flash Detail",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/f9/f2/42/f9f2421f0a098545b46d443aa8ceedb4.jpg",
    note: "A quick detail hit, like jewellery catching light outside a venue.",
    alt: "South African fashion detail image",
    mood: "texture",
  },
  {
    title: "Bright Archive",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/68/bd/46/68bd46c0d3d08a6253a4299231c28390.jpg",
    note: "Bright archive energy that feels at home beside beadwork colour.",
    alt: "South African bright archive fashion image",
    mood: "cover",
  },
  {
    title: "Final Layer",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/f1/b2/8c/f1b28c81a380bfb8af442fad8468dc3e.jpg",
    note: "A dense final layer, equal parts township tailoring and streetwear ease.",
    alt: "South African layered streetwear image",
    mood: "street",
  },
  {
    title: "Silver Crop",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/474x/88/fb/94/88fb94a365cdf7ecca2cd434ae4d4fdf.jpg",
    note: "Silver detail sharpens a simple fit the way Joburg street style often does.",
    alt: "South African fashion image with silver detail",
    mood: "texture",
  },
  {
    title: "Sharp Archive",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/474x/b9/8b/17/b98b175e391022abbb8ae69134db0e70.jpg",
    note: "Archive styling with a vertical read, clean enough for a gallery opening.",
    alt: "South African archive fashion image",
    mood: "street",
  },
  {
    title: "Gallery Proof",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/474x/43/6f/58/436f581dab42dcacce56d17af00f3ffd.jpg",
    note: "A gallery-night frame: clean enough for Cape Town, loud enough for Braam.",
    alt: "South African gallery fashion image",
    mood: "cover",
  },
  {
    title: "Warm Static",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/474x/30/4c/bc/304cbcffa5ec29f8294ce1afb0fb6a4c.jpg",
    note: "Warm colour keeps the visual rhythm close to South African summer light.",
    alt: "South African warm fashion image",
    mood: "texture",
  },
  {
    title: "Micro Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/90/6b/81/906b81134f2cf2c1141876cdf2d2820d.jpg",
    note: "A quick street-style flash, spotted between taxi doors and shopfront glass.",
    alt: "Small South African streetwear thumbnail",
    mood: "street",
  },
  {
    title: "Detail Flash",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/57/1e/6e/571e6eb9aa805aadf11ee141d81be56f.jpg",
    note: "Small accessories do big work in South African streetwear.",
    alt: "Small South African fashion detail thumbnail",
    mood: "texture",
  },
  {
    title: "Board Cut",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/eb/cb/3d/ebcb3d1553b55d6e47542bac139ea7ac.jpg",
    note: "A compact cut of colour and attitude for the fast-moving city wall.",
    alt: "Small South African fashion thumbnail with colour",
    mood: "cover",
  },
  {
    title: "Black Note",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/bd/b3/50/bdb350f0b3ea12f41f3d3c14746436d7.jpg",
    note: "Dark layers for late-night movement after the last plan becomes the real plan.",
    alt: "Small South African dark fashion thumbnail",
    mood: "street",
  },
  {
    title: "Accessory Beat",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/ff/d1/10/ffd1102e2ed150ac06b98a197759f7a5.jpg",
    note: "Accessory energy that turns a simple outfit into a full look.",
    alt: "Small South African accessory fashion thumbnail",
    mood: "texture",
  },
  {
    title: "Color Snap",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/49/4e/0f/494e0f6548c5d977b8ae44af28213558.jpg",
    note: "Colour snap with the brightness of Ndebele-inspired street palettes.",
    alt: "Small South African colourful fashion thumbnail",
    mood: "cover",
  },
  {
    title: "Loose Proof",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/90/b7/a5/90b7a5cbc3dba4574837621ef227fc65.jpg",
    note: "Loose proportions keep the silhouette comfortable without losing attitude.",
    alt: "Small South African loose styling thumbnail",
    mood: "street",
  },
  {
    title: "Texture Proof",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/236x/ed/ea/42/edea42112c56d91c93cf4b84808e4f0a.jpg",
    note: "Small crop, strong texture, and the pace of a city getting dressed.",
    alt: "Small South African texture fashion thumbnail",
    mood: "texture",
  },
  {
    title: "Chrome Walk",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/07/bd/4c/07bd4ce5d88f710b18a803e723cafac1.jpg",
    note: "A sharp metallic mood for jewellery, flash, and the edge of a night-out fit.",
    alt: "South African fashion image with chrome streetwear styling",
    mood: "texture",
  },
  {
    title: "Signal Red",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/0f/77/c2/0f77c2044adfbdadd31800950699e191.jpg",
    note: "Red moves like a headline: loud, clean, and impossible to ignore.",
    alt: "South African fashion image with red streetwear styling",
    mood: "cover",
  },
  {
    title: "Clean Set",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/3d/34/fd/3d34fdf449480f50c3652d7b0be570cb.jpg",
    note: "Minimal styling with the confidence of a polished city uniform.",
    alt: "South African fashion image with clean modern styling",
    mood: "street",
  },
  {
    title: "Heat Line",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/52/a9/73/52a973afe615d9fca0905161ad4e5f22.jpg",
    note: "Warm colour and relaxed structure for Durban heat and late-afternoon light.",
    alt: "South African fashion image with warm summer styling",
    mood: "cover",
  },
  {
    title: "Dust Fit",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/6a/54/fe/6a54fe5fc3c63d3256d7bf929896c679.jpg",
    note: "Earthy tones give the outfit a grounded, everyday streetwear feel.",
    alt: "South African fashion image with earthy streetwear styling",
    mood: "street",
  },
  {
    title: "Green Cut",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/6d/65/f3/6d65f3139b6ad56a52972daec88d6c20.jpg",
    note: "Green brings freshness into the issue, like a new fit before first plans.",
    alt: "South African fashion image with green styling",
    mood: "texture",
  },
  {
    title: "Soft Blue",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/78/53/c2/7853c2f7e6da0eec2b8325936e3b045c.jpg",
    note: "Blue keeps the styling calm while the silhouette carries the attitude.",
    alt: "South African fashion image with soft blue styling",
    mood: "cover",
  },
  {
    title: "Late Flash",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/78/e0/17/78e0179634cd4017d92c7f13415fcd1d.jpg",
    note: "A quick flash of texture for a magazine spread that needs speed.",
    alt: "South African fashion image with fast texture detail",
    mood: "texture",
  },
  {
    title: "Hard White",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/85/9a/c7/859ac76a28e66ae8c37c762dcdc5ed92.jpg",
    note: "Bright white styling gives the page a clean editorial punch.",
    alt: "South African fashion image with white styling",
    mood: "cover",
  },
  {
    title: "City Cream",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/95/dd/e9/95dde9d451d569429c6fe787e534d0c6.jpg",
    note: "Cream and neutral tones bring quiet luxury into the streetwear rhythm.",
    alt: "South African fashion image with neutral city styling",
    mood: "street",
  },
  {
    title: "Gold Detail",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/ae/c2/8d/aec28d3d691cfbf25041827721634e38.jpg",
    note: "Gold detail adds warmth, craft, and the feeling of a finished outfit.",
    alt: "South African fashion image with gold accessory detail",
    mood: "texture",
  },
  {
    title: "Black Heat",
    pin: "Pin.it set",
    image: "https://i.pinimg.com/736x/c3/26/08/c3260803164f302f54861b0ddcad607a.jpg",
    note: "Dark styling with summer pressure, built for streets that stay awake.",
    alt: "South African fashion image with black streetwear styling",
    mood: "street",
  },
];

const articles: Article[] = [
  {
    eyebrow: "Cover Story",
    title: "South African streetwear is a city language.",
    dek: "From Braamfontein layers to Durban heat and Cape Town thrift rails, the look is practical, expressive, and impossible to separate from movement.",
  },
  {
    eyebrow: "Motion",
    title: "Amapiano nights changed the silhouette.",
    dek: "Wide denim, cropped jackets, polished sneakers, jewellery, and easy shirts carry dance-floor confidence into everyday street style.",
  },
  {
    eyebrow: "Heritage",
    title: "Heritage is not costume. It is construction.",
    dek: "Shweshwe pattern, beadwork colour, Basotho blanket references, and township tailoring sit beside global streetwear without losing their local weight.",
  },
];

const signals: Signal[] = [
  { label: "Images", value: `${looks.length} editorial frames` },
  { label: "Cities", value: "Joburg / Durban / Cape Town" },
  { label: "Mood", value: "street / heritage / nightlife" },
  { label: "Issue", value: "South African fashion report" },
];

const moodFilters: { value: Mood; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cover", label: "Cover" },
  { value: "street", label: "Street" },
  { value: "texture", label: "Texture" },
];

const departments: Department[] = [
  {
    label: "01 / Johannesburg",
    title: "Braamfontein knows how to layer a look.",
    copy: "Campus pavements, thrift rails, utility jackets, wide denim, and polished sneakers meet in a style language that is fast, practical, and fearless.",
    look: looks[13],
  },
  {
    label: "02 / Durban",
    title: "Heat changes the cut.",
    copy: "Durban style loosens the shirt, brightens the colour, and keeps the outfit ready for sea air, street corners, and night movement.",
    look: looks[20],
  },
  {
    label: "03 / Cape Town",
    title: "Vintage rails meet sharp tailoring.",
    copy: "Second-hand finds, wool coats, crisp sneakers, and gallery-night polish give Cape Town fashion its mix of restraint and surprise.",
    look: looks[8],
  },
];

const trendReport: Trend[] = [
  { name: "Shweshwe blue", detail: "Indigo pattern language keeps heritage visible in a modern streetwear frame." },
  { name: "Taxi-rank colour", detail: "Bright reds, yellows, whites, and blacks give everyday outfits public energy." },
  { name: "Amapiano volume", detail: "Loose denim, cropped jackets, and clean sneakers leave room for movement." },
  { name: "Heritage detail", detail: "Beadwork, blanket references, and crafted accessories add meaning to the fit." },
];

const navItems = [
  { href: "#contents", label: "Contents" },
  { href: "#features", label: "Features" },
  { href: "#departments", label: "Departments" },
  { href: "#wall", label: "Image wall" },
  { href: "#runway", label: "Runway" },
  { href: "#motion", label: "Motion" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "#editor", label: "Editor" },
];

const whatsappMessage = encodeURIComponent(
  "Hi, I am interested in the Sench//Index South African fashion magazine.",
);

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
  const [navOpen, setNavOpen] = useState(false);
  const filteredLooks = useMemo(
    () => looks.filter((look) => activeMood === "all" || look.mood === activeMood),
    [activeMood],
  );
  const heroLooks = looks.slice(0, 5);
  const railLooks = [...looks.slice(3, 15), ...looks.slice(3, 15)];
  const coverStory = looks[13];
  const editorPicks = [looks[0], looks[7], looks[12], looks[19]];
  const wallLooks = [...looks.slice(6), ...looks.slice(24, 30)];

  return (
    <main>
      <nav className={`nav${navOpen ? " navOpen" : ""}`} aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={() => setNavOpen(false)}>Sench//Index</a>
        <button
          aria-controls="primary-menu"
          aria-expanded={navOpen}
          aria-label="Toggle navigation menu"
          className="navToggle"
          onClick={() => setNavOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="navLinks" id="primary-menu">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setNavOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="cover" id="top">
        <div className="noise" aria-hidden="true" />
        <div className="coverMasthead reveal">
          <span>Issue 04</span>
          <span>South African fashion magazine</span>
          <span>{looks.length} streetwear frames</span>
        </div>
        <div className="coverGrid">
          <div className="coverCopy reveal">
            <p className="kicker">South African fashion / streetwear report</p>
            <h1>
              Mzansi.
              <span>Street.</span>
              <span>Style.</span>
            </h1>
            <p>
              A visual issue on South African fashion: Johannesburg layers,
              Durban ease, Cape Town thrift, township tailoring, beadwork colour,
              and the streetwear confidence around amapiano nightlife.
            </p>
            <div className="actions">
              <a className="action" href="#contents">Open issue</a>
              <a className="ghostAction" href="#lookbook">View lookbook</a>
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

      <section className="issueDeck" aria-label="Issue highlights">
        <div className="issueDeckItem">
          <span>Cover</span>
          <strong>Mzansi streetwear</strong>
        </div>
        <div className="issueDeckItem">
          <span>Departments</span>
          <strong>Joburg / Durban / Cape Town</strong>
        </div>
        <div className="issueDeckItem">
          <span>Gallery</span>
          <strong>{looks.length} fashion frames</strong>
        </div>
        <div className="issueDeckItem">
          <span>Interaction</span>
          <strong>Lookbook, motion, image wall</strong>
        </div>
      </section>

      <section className="crawl" aria-label="Moodboard keywords">
        <div>
          <span>full magazine issue</span>
          <span>South African streetwear</span>
          <span>Braamfontein layers</span>
          <span>Durban summer cuts</span>
          <span>Cape Town thrift</span>
          <span>amapiano nightlife</span>
          <span>shweshwe blue</span>
          <span>beadwork colour</span>
          <span>township tailoring</span>
          <span>taxi-rank palette</span>
        </div>
      </section>

      <section className="contents" id="contents">
        <div className="reveal">
          <p className="kicker">Contents</p>
          <h2>Inside the South African fashion issue.</h2>
        </div>
        <ol className="contentsList reveal">
          <li><a href="#features"><span>01</span> Features: South African streetwear language</a></li>
          <li><a href="#departments"><span>02</span> Departments: Johannesburg, Durban, Cape Town</a></li>
          <li><a href="#trend"><span>03</span> Trend report: colour, heritage, silhouette</a></li>
          <li><a href="#wall"><span>04</span> Image wall: visual street-style archive</a></li>
          <li><a href="#runway"><span>05</span> Runway: animated Pinterest fashion stream</a></li>
          <li><a href="#lookbook"><span>06</span> Lookbook: filter by fashion mood</a></li>
          <li><a href="#editor"><span>07</span> Editor: South African fashion note</a></li>
        </ol>
      </section>

      <section className="features" id="features">
        <div className="sectionIntro reveal">
          <p className="kicker">Features</p>
          <h2>Streetwear with a local accent.</h2>
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

      <section className="coverStory" id="cover-story">
        <div className="coverStoryImage reveal">
          <PinImage look={coverStory} />
        </div>
        <article className="coverStoryCopy reveal">
          <p className="kicker">Cover story</p>
          <h2>South African fashion moves between heritage and heat.</h2>
          <p>
            It is not one uniform. It shifts from Joburg's layered streetwear to
            Durban's warm ease and Cape Town's thrifted polish, carrying beadwork,
            pattern, tailoring, and music culture into everyday dressing.
          </p>
          <a className="textLink" href="#departments">Read departments</a>
        </article>
      </section>

      <section className="departments" id="departments">
        <div className="sectionIntro reveal">
          <p className="kicker">Departments</p>
          <h2>Three cities, three fashion temperatures.</h2>
        </div>
        <div className="departmentGrid">
          {departments.map((department) => (
            <article className="departmentCard reveal" key={department.title}>
              <PinImage look={department.look} />
              <div>
                <span>{department.label}</span>
                <h3>{department.title}</h3>
                <p>{department.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trendReport" id="trend">
        <div className="trendCopy reveal">
          <p className="kicker">Trend report</p>
          <h2>What South African style is saying.</h2>
        </div>
        <div className="trendList reveal">
          {trendReport.map((trend, index) => (
            <article key={trend.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{trend.name}</h3>
              <p>{trend.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="motionStrip" id="motion" aria-label="Animated image rail">
        <div className="sectionIntro reveal">
          <p className="kicker">Motion rail</p>
          <h2>Amapiano energy in motion.</h2>
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

      <section className="imageWall" id="wall">
        <div className="sectionIntro reveal">
          <p className="kicker">Image wall</p>
          <h2>Street-style rhythm, frame by frame.</h2>
        </div>
        <div className="wallGrid" aria-label="Expanded South African fashion image wall">
          {wallLooks.map((look, index) => (
            <figure className="wallTile reveal" key={`${look.title}-${index}`}>
              <PinImage look={look} />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {look.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="runwayBoard" id="runway">
        <div className="runwayCopy reveal">
          <p className="kicker">Runway stream</p>
          <h2>More Pinterest looks, more movement.</h2>
          <p>
            The added frames move like a digital fashion wall: quick details,
            tall outfit crops, warm colour, chrome shine, and the visual pace of
            South African streetwear in motion.
          </p>
        </div>
        <div className="runwayStage" aria-label="Animated Pinterest fashion runway">
          <div className="runwayTrack runwayTrackA">
            {[...looks.slice(30), ...looks.slice(30)].map((look, index) => (
              <figure className="runwayCard" key={`runway-a-${look.title}-${index}`}>
                <PinImage look={look} />
                <figcaption>{look.title}</figcaption>
              </figure>
            ))}
          </div>
          <div className="runwayTrack runwayTrackB">
            {[...looks.slice(6, 24), ...looks.slice(6, 24)].map((look, index) => (
              <figure className="runwayCard" key={`runway-b-${look.title}-${index}`}>
                <PinImage look={look} />
                <figcaption>{look.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="editorsPicks" aria-label="Editor's picks">
        <div className="sectionIntro reveal">
          <p className="kicker">Editor's picks</p>
          <h2>Four frames with local attitude.</h2>
        </div>
        <div className="pickGrid">
          {editorPicks.map((look, index) => (
            <article className="pickCard reveal" key={look.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <PinImage look={look} />
              <h3>{look.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="lookbook" id="lookbook">
        <div className="sectionIntro reveal">
          <p className="kicker">Lookbook</p>
          <h2>Filter the fashion mood.</h2>
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
          <h2>The issue speaks South African style.</h2>
          <p>
            City codes, climate, nightlife, and heritage all shape the look.
            These pages move between polished sneakers, loose denim, sharp
            accessories, crafted detail, and the confidence of the street.
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
          <h2>Mzansi style is not one thing.</h2>
          <p>
            South African fashion changes with the province, the pavement, the
            season, and the hour. This issue follows that movement: streetwear
            for heat, layering for the city, heritage in the details, and clothes
            that know how to dance.
          </p>
        </div>
        <div className="credits reveal">
          <span>Editorial focus</span>
          <strong>South African streetwear and modern fashion</strong>
          <span>Features</span>
          <strong>City departments, trend report, lookbook</strong>
          <span>Format</span>
          <strong>Digital magazine issue</strong>
        </div>
      </section>

      <footer className="footerIssue">
        <div>
          <p className="kicker">Sench//Index / South African fashion</p>
          <h2>End of issue.</h2>
        </div>
        <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="email">Get the next fashion issue</label>
          <div>
            <input id="email" type="email" placeholder="email@example.com" />
            <button type="submit">Join</button>
          </div>
        </form>
      </footer>

      <a
        aria-label="Open WhatsApp"
        className="whatsappButton"
        href={`https://wa.me/?text=${whatsappMessage}`}
        rel="noreferrer"
        target="_blank"
      >
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <path d="M16.04 3.2c-7.02 0-12.72 5.6-12.72 12.5 0 2.36.68 4.66 1.96 6.64l-1.3 6.28 6.48-1.52a12.96 12.96 0 0 0 5.58 1.26c7.02 0 12.72-5.6 12.72-12.5S23.06 3.2 16.04 3.2Zm0 22.98c-1.76 0-3.48-.44-5.02-1.28l-.36-.2-3.84.9.78-3.72-.24-.38a10.18 10.18 0 0 1-1.68-5.62c0-5.68 4.66-10.3 10.38-10.3s10.38 4.62 10.38 10.3-4.66 10.3-10.4 10.3Zm5.68-7.68c-.3-.16-1.82-.88-2.1-.98-.28-.1-.48-.16-.68.16-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.08-.3-.16-1.28-.46-2.44-1.48-.9-.8-1.52-1.8-1.7-2.1-.18-.3-.02-.48.14-.62.14-.14.3-.36.46-.54.16-.18.2-.3.3-.5.1-.2.06-.38-.02-.54-.08-.16-.68-1.62-.94-2.22-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.52.08-.8.38-.28.3-1.04 1-1.04 2.44s1.06 2.84 1.2 3.04c.16.2 2.1 3.16 5.08 4.42.72.3 1.26.48 1.7.62.72.22 1.36.18 1.88.12.58-.08 1.82-.74 2.08-1.44.26-.72.26-1.32.18-1.44-.08-.14-.28-.22-.6-.38Z" />
        </svg>
      </a>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
