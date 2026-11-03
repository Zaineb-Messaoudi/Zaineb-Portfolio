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
]

function ChapterVisual({ id }) {
  const regionRgb = id === "about" ? "65 162 119" : id === "summary" ? "80 152 195" : id === "experience" ? "55 153 133" : id === "education" ? "198 155 83" : id === "projects" ? "211 128 82" : id === "skills" ? "119 164 92" : "65 161 168";
  const regionAccent = id === "about" ? "#9fe278" : id === "summary" ? "#88beff" : id === "experience" ? "#84e2cf" : id === "education" ? "#ffd27b" : id === "projects" ? "#ffad79" : id === "skills" ? "#b7dc83" : "#84e2cf";

  return (
    <div className="chapter-visual-wrapper" aria-hidden="true">
      <svg viewBox="0 0 400 240" className="chapter-visual">
        <defs>
          <filter id="chapter-visual-filter">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge> <feMergeNode in="blur"/> <feMergeNode in="SourceGraphic"/> </feMerge>
          </filter>
          <filter id="chapter-visual-bg-filter">
            <feGaussianBlur stdDeviation="4" result="blur2"/>
          </filter>
        </defs>
        <rect width="400" height="240" fill="var(--chapter-visual-bg, #0b1521)" opacity="0.8"/>
        <ellipse cx="202" cy="120" rx="180" ry="90" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.15"/>
        <ellipse cx="202" cy="120" rx="140" ry="70" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.1"/>
        <circle cx="202" cy="120" r="35" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.08"/>
        <circle cx="94" cy="89" r="12" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.4"/>
        <circle cx="330" cy="148" r="12" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.4"/>
        <circle cx="244" cy="46" r="10" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.4"/>
        <path d="M92 90 170 109m62 9 80 25m-96-72-9 27" stroke="var(--chapter-visual-accent, #84e2cf)" stroke-width="1" fill="none" opacity="0.6"/>
        <circle cx="94" cy="89" r="8" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.9"/>
        <circle cx="330" cy="148" r="8" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.9"/>
        <circle cx="244" cy="46" r="6" fill="var(--chapter-visual-accent, #84e2cf)" opacity="0.9"/>
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
          {headerAside ? (
            <div className="section-head-layout">
              {sectionHead}
              <div className="section-head-aside">{headerAside}</div>
            </div>
          ) : (
            <div className="section-head-layout">
              {sectionHead}
              <div className="section-head-visual chapter-visual-wrapper"/>
            </div>
          )}
          <motion-div
            className="section-content-depth"
            initial={reduceMotion ? false : { opacity: 0, y: 46, rotateX: 9, scale: .97 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion-div>
        </div>
      </div>
    </section>
  );
}

export default SectionShell;