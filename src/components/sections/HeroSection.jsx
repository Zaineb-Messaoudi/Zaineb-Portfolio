import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { focusAreas, heroStats, personal } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";

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
              SOFTWARE ENGINEERING · FULL STACK & AI
            </motion.p>
            <motion.h1 id="hero-title" className="hero-title" variants={fadeUp}>
              {personal.name}
            </motion.h1>
            <motion.div className="hero-copy" variants={fadeUp}>
              <strong>{personal.title}</strong>
              <span>{personal.focus}</span>
            </motion.div>
            <motion.p className="availability-line availability-primary" variants={fadeUp}>
              <span className="availability-label">CURRENT MISSION</span>
              {personal.availability}
            </motion.p>

            <motion.div className="hero-tagline" variants={fadeUp}>
              {focusAreas.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return <span key={item.label} className="pill"><Icon size={16} />{item.label}</span>;
              })}
            </motion.div>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#projects">Explore projects <ArrowRight size={18} /></a>
              <a className="button button-secondary" href="#contact">Start a conversation</a>
              <a className="button button-ghost" href="https://jobby.tn/cv/zaineb-messaoudi-22d-182?lang=en" target="_blank" rel="noreferrer">
                View my CV <ExternalLink size={17} />
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
              <img className="profile-image" src={personal.profileImage} alt="Portrait of Zaineb Messaoudi" />
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
          {heroStats.map((stat) => <motion.div key={stat.label} className="stat-card" variants={fadeUp}><span className="meta-line">{stat.label}</span><strong>{stat.value}</strong></motion.div>)}
        </motion.div>

        <div className="creative-ticker" aria-label="Portfolio themes">
          <div className="creative-ticker-track">
            {["BUILD", "DESIGN", "EXPLAIN", "SHIP", "ACCESSIBLE BY DEFAULT", "BUILD", "DESIGN", "EXPLAIN", "SHIP", "ACCESSIBLE BY DEFAULT"].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i aria-hidden="true">✦</i></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
