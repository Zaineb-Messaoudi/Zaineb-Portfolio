import { motion, useReducedMotion } from "framer-motion";
import { sectionMeta, skills } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";

function SkillsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="skills" {...sectionMeta.skills}>
      <motion.div
        className="skills-grid"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerParent}
      >
        {skills.map((group) => {
          const Icon = group.icon;
          return (
            <motion.article key={group.title} className="skill-card" variants={fadeUp}>
              <div className="card-icon">
                <Icon size={20} />
              </div>
              <h3 className="card-title">{group.title}</h3>
              <div className="stack-list" style={{ marginTop: "1rem" }}>
                {group.items.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}

export default SkillsSection;
