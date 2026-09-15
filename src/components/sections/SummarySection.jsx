import { motion, useReducedMotion } from "framer-motion";
import { impactStats, languageItems, processSteps, sectionMeta, summaryPoints } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";

function SummarySection() {
  const reduceMotion = useReducedMotion();
  return (
    <SectionShell id="summary" {...sectionMeta.summary}>
      <motion.div className="summary-grid" initial={reduceMotion ? false : "hidden"} whileInView={reduceMotion ? undefined : "visible"} viewport={{ once: true, amount: 0.2 }} variants={staggerParent}>
        {summaryPoints.map((item) => <motion.article key={item} className="summary-item" variants={fadeUp}>{item}</motion.article>)}
      </motion.div>
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1, duration: 0.55 }} style={{ marginTop: "1.75rem" }}>
        <p className="card-title">Languages</p>
        <div className="language-list">{languageItems.map((item) => <span key={item} className="stack-chip">{item}</span>)}</div>
      </motion.div>
      <div className="impact-strip" aria-label="Selected impact metrics">
        {impactStats.map((stat) => <div className="impact-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </div>
      <div className="process-block">
        <div className="process-heading"><p className="eyebrow">Working style</p><h3 className="section-subtitle">A practical path from idea to delivery</h3></div>
        <div className="process-grid">{processSteps.map((step) => <article className="process-step" key={step.number}><span className="process-number">{step.number}</span><h4>{step.title}</h4><p>{step.text}</p></article>)}</div>
      </div>
    </SectionShell>
  );
}

export default SummarySection;
