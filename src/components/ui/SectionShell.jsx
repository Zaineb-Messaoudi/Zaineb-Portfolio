import { motion, useReducedMotion } from "framer-motion";
import { Flag, MapPin } from "lucide-react";
import { fadeUp } from "../../utils/motion";
import { useLanguage } from "../../i18n";

const CHAPTERS = [
  { id: "about", en: "Character profile", fr: "Profil du personnage", region: { en: "The Greenward", fr: "La forêt vive" } },
  { id: "summary", en: "Story archive", fr: "Archives du parcours", region: { en: "Sky Archive", fr: "Archives du ciel" } },
  { id: "experience", en: "Quest log", fr: "Journal des quêtes", region: { en: "Mosslight Valley", fr: "Vallée des mousses" } },
  { id: "education", en: "Training grounds", fr: "Terrain de formation", region: { en: "Sunstone Campus", fr: "Campus de pierre solaire" } },
  { id: "projects", en: "Artifact collection", fr: "Collection d'artefacts", region: { en: "The Foundry", fr: "La forge" } },
  { id: "skills", en: "Ability tree", fr: "Arbre de compétences", region: { en: "Canopy Heights", fr: "Cimes de la canopée" } },
  { id: "contact", en: "Next quest", fr: "Prochaine quête", region: { en: "Harbor Gate", fr: "Porte du port" } },
];

function ChapterVisual({ id }) {
  const projectNodes = [
    { x: 94, y: 58 },
    { x: 202, y: 46 },
    { x: 310, y: 66 },
    { x: 94, y: 172 },
    { x: 202, y: 188 },
    { x: 310, y: 164 },
  ];

  return (
    <div className={`section-chapter-visual chapter-visual-${id}`} aria-hidden="true">
      <svg viewBox="0 0 400 240" focusable="false">
        {id === "summary" ? (
          <>
            <ellipse className="chapter-visual-orbit" cx="202" cy="120" rx="150" ry="76" />
            <ellipse className="chapter-visual-orbit chapter-visual-orbit-tilted" cx="202" cy="120" rx="150" ry="76" />
            <circle className="chapter-visual-core" cx="202" cy="120" r="31" />
            <circle className="chapter-visual-node" cx="74" cy="89" r="8" />
            <circle className="chapter-visual-node" cx="330" cy="148" r="8" />
            <circle className="chapter-visual-node" cx="244" cy="46" r="6" />
            <path className="chapter-visual-route" d="M92 90 170 109m62 9 80 25m-96-72-9 27" />
          </>
        ) : null}
        {id === "experience" ? (
          <>
            <path className="chapter-visual-route chapter-visual-route-dash" d="M48 174c48-6 44-105 105-105s49 96 104 96 49-83 96-91" />
            {[{ x: 48, y: 174 }, { x: 153, y: 69 }, { x: 257, y: 165 }, { x: 353, y: 74 }].map((point, index) => (
              <g className={`chapter-visual-stop chapter-visual-stop-${index + 1}`} key={point.x}>
                <circle cx={point.x} cy={point.y} r="18" />
                <circle className="chapter-visual-stop-core" cx={point.x} cy={point.y} r="5" />
              </g>
            ))}
          </>
        ) : null}
        {id === "education" ? (
          <>
            <path className="chapter-visual-book" d="M74 82c37-14 80-9 122 13v91c-42-21-85-26-122-12zm244 0c-37-14-80-9-122 13v91c42-21 85-26 122-12z" />
            <path className="chapter-visual-route" d="M196 95v91m-97-77c26-7 55-2 79 9m-79 13c26-7 55-2 79 9m79-31c-26-7-55-2-79 9m79 13c-26-7-55-2-79 9" />
            <path className="chapter-visual-cap" d="m122 62 80-28 80 28-80 29zM155 74v31c27 18 65 18 92 0V74m35-12v41" />
            <circle className="chapter-visual-node" cx="282" cy="105" r="5" />
          </>
        ) : null}
        {id === "projects" ? (
          <>
            <path className="chapter-visual-route" d="m94 58 108-12 108 20M94 58l108 62 108-54M94 172l108-52 108 44m-108-64v68m0-156v28" />
            <path className="chapter-visual-core" d="m202 99 23 21-23 21-23-21z" />
            {projectNodes.map((point, index) => (
              <circle className="chapter-visual-node" cx={point.x} cy={point.y} r={index === 1 ? 10 : 8} key={`${point.x}-${point.y}`} />
            ))}
          </>
        ) : null}
        {id === "skills" ? (
          <>
            <path className="chapter-visual-route" d="M202 202V63m0 41-86-45m86 72 88-51m-88 4-77 57m77 17 81-38m-81-33 42-49" />
            <circle className="chapter-visual-core" cx="202" cy="57" r="19" />
            {[
              { x: 116, y: 59 },
              { x: 288, y: 59 },
              { x: 125, y: 135 },
              { x: 283, y: 122 },
              { x: 244, y: 44 },
              { x: 202, y: 202 },
            ].map((point) => <circle className="chapter-visual-node" cx={point.x} cy={point.y} r="8" key={`${point.x}-${point.y}`} />)}
          </>
        ) : null}
        {id === "contact" ? (
          <>
            <path className="chapter-visual-portal" d="M123 203v-74a79 79 0 0 1 158 0v74m-128 0v-69a49 49 0 0 1 98 0v69" />
            <path className="chapter-visual-envelope" d="M151 127h99v65h-99zm2 4 48 36 47-36m-95 56 34-28m61 28-34-28" />
            <circle className="chapter-visual-node" cx="202" cy="38" r="7" />
          </>
        ) : null}
      </svg>
    </div>
  );
}

function SectionShell({ id, eyebrow, title, description, children, headerAside, gameActive = false }) {
  const reduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const chapterIndex = CHAPTERS.findIndex((chapter) => chapter.id === id);
  const chapter = CHAPTERS[chapterIndex];
  const chapterNumber = String(chapterIndex + 1).padStart(2, "0");
  const sectionHead = (
    <motion.div
      className="section-head"
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
    >
      {chapter ? (
        <div className="chapter-banner">
          <span className="chapter-banner-mark"><Flag size={14} aria-hidden="true" />{language === "fr" ? "CHAPITRE" : "CHAPTER"} {chapterNumber}</span>
          <span className="chapter-banner-line" aria-hidden="true" />
          <span className="chapter-banner-location"><MapPin size={13} aria-hidden="true" />{chapter.region[language]}</span>
          <span className="chapter-banner-mode">{chapter[language]}</span>
        </div>
      ) : null}
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`} className="section-title" tabIndex={gameActive ? -1 : undefined}>
        {title}
      </h2>
      <p className="section-description">{description}</p>
    </motion.div>
  );

  return (
    <section
      id={id}
      className={`section section-${id} ${gameActive ? "is-game-active" : ""}`}
      aria-labelledby={`${id}-title`}
      data-world-chapter={chapterNumber}
    >
      <div className="container">
        <div className="section-inner">
          {chapter && (headerAside || id !== "about") ? (
            <div className="section-head-layout">
              {sectionHead}
              <div className="section-head-aside">{headerAside || <ChapterVisual id={id} />}</div>
            </div>
          ) : (
            sectionHead
          )}
          <motion.div
            className="section-content-depth"
            initial={reduceMotion ? false : { opacity: 0, y: 46, rotateX: 9, scale: .97 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SectionShell;