import { motion, useReducedMotion } from "framer-motion";
import { experience, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";
import { localize, useLanguage } from "../../i18n";

function ExperienceSection({ gameActive = false, selectedExperienceIndex = null, onClearExperience }) {
  const reduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const localizedExperience = localize(experience, language);
  const localizedMeta = localize(sectionMeta.experience, language);
  const companyMarks = {
    QCMed: "QC",
    "Esprit Tech": "ET",
    "Central Bank of Tunisia (BCT)": "BCT",
    "I-Way": "IW",
  };
  return (
    <SectionShell id="experience" gameActive={gameActive} {...localizedMeta}>
      {selectedExperienceIndex !== null ? (
        <button type="button" className="branch-trail-back" onClick={onClearExperience}>
          {language === "fr" ? "Retour au sentier des stages" : "Back to internship trail"}
        </button>
      ) : null}
      <motion.div className="timeline" initial={reduceMotion ? false : "hidden"} whileInView={reduceMotion ? undefined : "visible"} viewport={{ once: true, amount: 0.12 }} variants={staggerParent}>
        {localizedExperience.map((item, index) => selectedExperienceIndex === null || selectedExperienceIndex === index ? (
          <motion.article
            id={`experience-entry-${index}`}
            key={`${item.company}-${item.role}`}
            className="experience-card"
            tabIndex={selectedExperienceIndex === index ? -1 : undefined}
            variants={fadeUp}
            style={{ "--node-accent": item.accent }}
          >
            <span className="experience-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="experience-head">
              <div className="experience-company">
                <span className="experience-logo" aria-hidden="true">
                  <img
                    className="logo-mark"
                    src={item.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                  />
                  <span>{companyMarks[item.company] || item.company.slice(0, 2).toUpperCase()}</span>
                </span>
                <div><h3 className="experience-title">{item.role}</h3><p className="meta-line">{item.company} • {item.location}</p></div>
              </div>
              <span className="pill">{item.period}</span>
            </div>
            <p className="project-overview">{item.summary}</p>
            <ul className="bullet-list">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <div className="stack-list" style={{ marginTop: "1rem" }}>{item.stack.map((tech) => <span key={tech} className="stack-chip">{tech}</span>)}</div>
          </motion.article>
        ) : null)}
      </motion.div>
    </SectionShell>
  );
}

export default ExperienceSection;
