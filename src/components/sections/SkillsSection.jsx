import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { certifications, sectionMeta, skills } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";
import SkillRadar from "../ui/SkillRadar";
import { localize, useLanguage } from "../../i18n";

function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const localizedSkills = localize(skills, language);
  const localizedCertifications = localize(certifications, language);
  const localizedMeta = localize(sectionMeta.skills, language);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  const handleSelect = (index) => {
    setActiveIndex(index);
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <SectionShell id="skills" {...localizedMeta}>
      <div className="engineering-map-copy" style={{ marginBottom: "1.5rem" }}>
        <p className="eyebrow">{t("Interactive overview")}</p>
        <h3 className="section-subtitle">{t("A quick read on where I'm strongest")}</h3>
        <p>{t("Click any point on the radar to jump to that skill card below.")}</p>
      </div>
      <SkillRadar data={localizedSkills} activeIndex={activeIndex} onSelect={handleSelect} />

      <motion.div
        className="skills-grid"
        style={{ marginTop: "2.5rem" }}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerParent}
      >
        {localizedSkills.map((group, index) => {
          const Icon = group.icon;
          const isActive = index === activeIndex;
          return (
            <motion.article
              key={group.title}
              ref={(node) => (cardRefs.current[index] = node)}
              className="skill-card"
              variants={fadeUp}
              onClick={() => setActiveIndex(index)}
              style={{
                cursor: "pointer",
                outline: isActive ? "2px solid var(--accent-gold, #e2b04a)" : "2px solid transparent",
                outlineOffset: "3px",
                transition: "outline-color 0.2s ease",
              }}
            >
              <div className="card-icon"><Icon size={20} /></div>
              <h3 className="card-title">
                {group.title} <span style={{ opacity: 0.55, fontWeight: 500, fontSize: "0.85em" }}>· {group.proficiency}%</span>
              </h3>
              <div className="stack-list" style={{ marginTop: "1rem" }}>
                {group.items.map((item) => <span key={item} className="stack-chip">{item}</span>)}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <div className="certifications-block">
        <div>
          <p className="eyebrow">{t("Continuous learning")}</p>
          <h3 className="section-subtitle">{t("Certifications & training")}</h3>
        </div>
        <div className="certification-list">
          {localizedCertifications.map((certification) => (
            <article className="certification-item" key={certification.name}>
              <strong>{certification.name}</strong>
              <span>{certification.issuer}</span>
              <time>{certification.date}</time>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export default SkillsSection;
