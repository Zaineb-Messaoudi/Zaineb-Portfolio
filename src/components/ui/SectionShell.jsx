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

function SectionShell({ id, eyebrow, title, description, children, gameActive = false }) {
  const reduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const chapterIndex = CHAPTERS.findIndex((chapter) => chapter.id === id);
  const chapter = CHAPTERS[chapterIndex];
  const chapterNumber = String(chapterIndex + 1).padStart(2, "0");

  return (
    <section
      id={id}
      className={`section section-${id} ${gameActive ? "is-game-active" : ""}`}
      aria-labelledby={`${id}-title`}
      data-world-chapter={chapterNumber}
    >
      <div className="container">
        <div className="section-inner">
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
