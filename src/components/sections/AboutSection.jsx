import { motion, useReducedMotion } from "framer-motion";
import { aboutCards, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";

function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="about" {...sectionMeta.about}>
      <motion.div
        className="cards-grid"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerParent}
      >
        {aboutCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.article key={card.title} className="glass-card" variants={fadeUp}>
              <div className="card-icon">
                <Icon size={20} />
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-text">{card.text}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}

export default AboutSection;
