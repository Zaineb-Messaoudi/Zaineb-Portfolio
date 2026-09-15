import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

function SectionShell({ id, eyebrow, title, description, children }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id={id} className={`section section-${id}`} aria-labelledby={`${id}-title`}>
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
