import { motion, useReducedMotion } from "framer-motion";
import { education, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";

function EducationSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="education" {...sectionMeta.education}>
      <motion.div
        className="education-grid"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerParent}
      >
        {education.map((item) => (
          <motion.article key={item.school} className="education-card" variants={fadeUp}>
            <div className="education-top">
              <div>
                <h3 className="card-title">{item.degree}</h3>
                <p className="meta-line">
                  {item.school} • {item.location}
                </p>
              </div>
              <span className="pill">{item.period}</span>
            </div>

            <p className="project-overview">{item.description}</p>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}

export default EducationSection;
