import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { focusAreas, heroStats, personal } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import { localize, useLanguage } from "../../i18n";

function HeroArtwork({ reduceMotion }) {
  return (
    <div className="hero-artwork" aria-hidden="true">
      <span className="hero-art-ring hero-art-ring-one" />
      <span className="hero-art-ring hero-art-ring-two" />
      <span className="hero-art-sphere hero-art-sphere-one" />
      <span className="hero-art-sphere hero-art-sphere-two" />
      <svg className="hero-art-ribbon" viewBox="0 0 420 280" role="presentation">
        <path d="M8 188C88 34 118 260 201 108S332 76 412 10" />
        <path d="M10 230C102 90 139 286 227 145S334 126 410 65" />
      </svg>
      <span className={`hero-art-flower hero-art-flower-one ${reduceMotion ? "is-still" : ""}`}>✿</span>
      <span className={`hero-art-flower hero-art-flower-two ${reduceMotion ? "is-still" : ""}`}>✿</span>
    </div>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const localizedPersonal = localize(personal, language);
  const localizedFocusAreas = localize(focusAreas, language);
  const localizedHeroStats = localize(heroStats, language);
  const cvPath = language === "fr" ? "/assets/cv/cv-fr.pdf" : "/assets/cv/cv-en.pdf";

  return (
    <section id="hero" className="section hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-panel">
          <motion.div
            className="hero-grid"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerParent}
          >
            <motion.p className="hero-kicker" variants={fadeUp}>
              {t("SOFTWARE ENGINEERING · FULL STACK & AI")}
            </motion.p>
            <motion.h1 id="hero-title" className="hero-title" variants={fadeUp}>
              {personal.name}
            </motion.h1>
            <motion.div className="hero-copy" variants={fadeUp}>
              <strong>{localizedPersonal.title}</strong>
              <span>{localizedPersonal.focus}</span>
            </motion.div>
            <motion.p className="availability-line availability-primary" variants={fadeUp}>
              <span className="availability-label">{t("CURRENT MISSION")}</span>
              <strong>{localizedPersonal.availability}</strong>
              <strong>{localizedPersonal.availabilitySecondary}</strong>
            </motion.p>

            <motion.div className="hero-tagline" variants={fadeUp}>
              {localizedFocusAreas.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return <span key={item.label} className="pill"><Icon size={16} />{item.label}</span>;
              })}
            </motion.div>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#projects">{t("Explore projects")} <ArrowRight size={18} /></a>
              <a className="button button-secondary" href="#contact">{t("Contact me")}</a>
              <a className="button button-ghost" href={cvPath} target="_blank" rel="noreferrer">
                {t("View my CV")} <ExternalLink size={17} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <HeroArtwork reduceMotion={reduceMotion} />
            <motion.div
              className="profile-frame"
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <img className="profile-image" src={localizedPersonal.profileImage} alt={language === "fr" ? "Portrait de Zaineb Messaoudi" : "Portrait of Zaineb Messaoudi"} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="stat-grid"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
        >
          {localizedHeroStats.map((stat) => <motion.div key={stat.label} className="stat-card" variants={fadeUp}><span className="meta-line">{stat.label}</span><strong>{stat.value}</strong></motion.div>)}
        </motion.div>

        <div className="creative-ticker" aria-label={language === "fr" ? "Thèmes du portfolio" : "Portfolio themes"}>
          <div className="creative-ticker-track">
            {["BUILD", "DESIGN", "EXPLAIN", "SHIP", "ACCESSIBLE BY DEFAULT", "BUILD", "DESIGN", "EXPLAIN", "SHIP", "ACCESSIBLE BY DEFAULT"].map((item, index) => (
              <span key={`${item}-${index}`}>{t(item)}<i aria-hidden="true">✦</i></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
