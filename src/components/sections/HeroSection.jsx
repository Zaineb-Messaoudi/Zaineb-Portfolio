import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Facebook, Github, Linkedin, Mail } from "lucide-react";
import {
  focusAreas,
  heroStats,
  personal,
} from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";

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
            <motion.h1 id="hero-title" className="hero-title" variants={fadeUp}>
              {personal.name}
            </motion.h1>
            <motion.div className="hero-copy" variants={fadeUp}>
              <strong>{personal.title}</strong>
              <span>{personal.focus}</span>
            </motion.div>
            <motion.p className="lead" variants={fadeUp}>
              {personal.intro} {personal.availability}
            </motion.p>

            <motion.div className="hero-tagline" variants={fadeUp}>
              {focusAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <span key={item.label} className="pill">
                    <Icon size={16} />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#projects">
                Explore projects
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#contact">
                Start a conversation
              </a>
            </motion.div>

            <motion.div className="social-links" variants={fadeUp}>
              <a
                className="social-link"
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Zaineb Messaoudi on LinkedIn"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                className="social-link"
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Zaineb Messaoudi on GitHub"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                className="social-link"
                href={personal.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Zaineb Messaoudi on Facebook"
              >
                <Facebook size={18} />
                Facebook
              </a>
              <a
                className="social-link"
                href={`mailto:${personal.email}`}
                aria-label="Send an email to Zaineb Messaoudi"
              >
                <Mail size={18} />
                Email
              </a>
            </motion.div>

            <motion.div className="hero-meta" variants={fadeUp}>
              <div className="meta-card">
                <span className="meta-line">Current base</span>
                <strong>{personal.location}</strong>
              </div>
              <div className="meta-card">
                <span className="meta-line">Primary intent</span>
                <strong>Summer 2026 internship</strong>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <div className="profile-frame">
              <img
                className="profile-image"
                src={personal.profileImage}
                alt="Portrait of Zaineb Messaoudi"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="stat-grid"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
        >
          {heroStats.map((stat) => (
            <motion.div key={stat.label} className="stat-card" variants={fadeUp}>
              <span className="meta-line">{stat.label}</span>
              <strong>{stat.value}</strong>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
