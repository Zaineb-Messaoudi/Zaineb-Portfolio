import { motion, useReducedMotion } from "framer-motion";
import { languageItems, sectionMeta, summaryPoints } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";

function SummarySection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="summary" {...sectionMeta.summary}>
      <motion.div
        className="summary-grid"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerParent}
      >
        {summaryPoints.map((item) => (
          <motion.article key={item} className="summary-item" variants={fadeUp}>
            {item}
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.55 }}
        style={{ marginTop: "1.75rem" }}
      >
        <p className="card-title">Languages</p>
        <div className="language-list">
          {languageItems.map((item) => (
            <span key={item} className="stack-chip">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}

export default SummarySection;
