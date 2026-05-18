import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

function SectionShell({ id, eyebrow, title, description, children }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-inner">
          <motion.div
            className="section-head"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="section-title">
              {title}
            </h2>
            <p className="section-description">{description}</p>
          </motion.div>
          {children}
        </div>
      </div>
    </section>
  );
}

export default SectionShell;
