import { motion, useReducedMotion } from "framer-motion";
import { experience, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";

function ExperienceSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="experience" {...sectionMeta.experience}>
      <motion.div
        className="timeline"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.12 }}
        variants={staggerParent}
      >
        {experience.map((item) => (
          <motion.article
            key={`${item.company}-${item.role}`}
            className="experience-card"
            variants={fadeUp}
            style={{ "--node-accent": item.accent }}
          >
            <div className="experience-head">
              <div className="experience-company">
                <img
                  className="logo-mark"
                  src={item.logo}
                  alt={`${item.company} logo`}
                />
                <div>
                  <h3 className="experience-title">{item.role}</h3>
                  <p className="meta-line">
                    {item.company} • {item.location}
                  </p>
                </div>
              </div>

              <span className="pill">{item.period}</span>
            </div>

            <p className="project-overview">{item.summary}</p>
            <ul className="bullet-list">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="stack-list" style={{ marginTop: "1rem" }}>
              {item.stack.map((tech) => (
                <span key={tech} className="stack-chip">
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}

export default ExperienceSection;
