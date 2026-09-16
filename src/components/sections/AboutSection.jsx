import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Braces, Layers3, Rocket } from "lucide-react";
import { useState } from "react";
import { aboutCards, creativeInterests, personalMotto, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";
import { localize, useLanguage } from "../../i18n";

const engineeringLayers = [
  { id: "interface", number: "01", label: "Interface", icon: Braces, title: "Make complexity feel clear", description: "React interfaces, Figma thinking, keyboard-friendly flows, and accessible product decisions.", tools: ["React", "Angular", "Figma", "WCAG 2.1"], color: "#e47aa8" },
  { id: "backend", number: "02", label: "Backend", icon: Layers3, title: "Design systems that hold up", description: "REST APIs, authentication, role-based access, data models, and real-time workflows.", tools: ["NestJS", "FastAPI", "Spring Boot", "MongoDB"], color: "#c487d8" },
  { id: "intelligence", number: "03", label: "Intelligence", icon: BrainCircuit, title: "Turn data into useful decisions", description: "Speech analysis, explainable ML, prediction, NLP, and AI features integrated into real products.", tools: ["Python", "XGBoost", "SHAP", "NLP"], color: "#8e9cde" },
  { id: "delivery", number: "04", label: "Delivery", icon: Rocket, title: "Take ideas to production", description: "Dockerized applications, CI/CD contribution, deployment readiness, and collaborative Agile delivery.", tools: ["Docker", "Jenkins", "GitHub", "Agile"], color: "#68bcb3" },
];

function AboutSection() {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const localizedCards = localize(aboutCards, language);
  const localizedInterests = localize(creativeInterests, language);
  const localizedMeta = localize(sectionMeta.about, language);
  const [activeLayer, setActiveLayer] = useState(engineeringLayers[0]);
  const ActiveIcon = activeLayer.icon;

  return (
    <SectionShell id="about" {...localizedMeta}>
      <motion.div className="cards-grid" initial={reduceMotion ? false : "hidden"} whileInView={reduceMotion ? undefined : "visible"} viewport={{ once: true, amount: 0.15 }} variants={staggerParent}>
        {localizedCards.map((card) => {
          const Icon = card.icon;
          return <motion.article key={card.title} className="glass-card" variants={fadeUp}><div className="card-icon"><Icon size={20} /></div><h3 className="card-title">{card.title}</h3><p className="card-text">{card.text}</p></motion.article>;
        })}
      </motion.div>

      <motion.blockquote
        className="glass-card"
        style={{ margin: "1.75rem 0", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.6 }}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        “{t(personalMotto)}”
      </motion.blockquote>

      <div className="engineering-map">
        <div className="engineering-map-copy">
          <p className="eyebrow">{t("The engineering map")}</p>
          <h3>{t("Where product thinking meets implementation")}</h3>
          <p>{t("Explore the four layers I bring to a project. Each one connects directly to the tools, systems, and outcomes in my experience.")}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              className="engineering-map-detail"
              style={{ "--layer-color": activeLayer.color }}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="engineering-map-detail-icon"><ActiveIcon size={22} /></div>
              <div>
                <span>{activeLayer.number} / {t(activeLayer.label)}</span>
                <strong>{t(activeLayer.title)}</strong>
                <p>{t(activeLayer.description)}</p>
                <div className="engineering-tools">{activeLayer.tools.map((tool) => <em key={tool}>{tool}</em>)}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="engineering-map-visual" aria-label="Engineering layers">
          <div className="engineering-map-line" aria-hidden="true" />
          {engineeringLayers.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer.id === layer.id;
            return <button key={layer.id} type="button" className={`engineering-layer ${isActive ? "is-active" : ""}`} style={{ "--layer-color": layer.color }} onClick={() => setActiveLayer(layer)} aria-pressed={isActive}><span className="engineering-layer-number">{layer.number}</span><span className="engineering-layer-icon"><Icon size={19} /></span><span>{t(layer.label)}</span></button>;
          })}
        </div>
      </div>

      <div className="creative-strip">
        <div className="creative-strip-heading">
          <p className="eyebrow">{t("Beyond the stack")}</p>
          <h3>{t("The creative side of engineering")}</h3>
          <p>{t("Good software is not only correct. It should also feel clear, thoughtful, and memorable.")}</p>
        </div>
        <div className="creative-interest-grid">
          {localizedInterests.map((interest, index) => (
            <motion.article key={interest.label} className="creative-interest" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.08, duration: 0.4 }}>
              <span>{interest.label}</span><h4>{interest.title}</h4><p>{interest.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export default AboutSection;
