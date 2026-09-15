import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import EducationSection from "../components/sections/EducationSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import SummarySection from "../components/sections/SummarySection";
import ProjectModal from "../components/ui/ProjectModal";
import { navItems } from "../data/portfolioData";
import { useActiveSection } from "../hooks/useActiveSection";

function FlowerFall({ activeSection }) {
  const flowers = Array.from({ length: 120 }, (_, index) => index);
  return (
    <div key={activeSection} className="flower-fall" aria-hidden="true">
      {flowers.map((flower) => (
        <span
          key={flower}
          className="falling-flower"
          style={{
            "--flower-x": `${(flower * 37) % 103 - 1}%`,
            "--flower-delay": `${(flower % 24) * 0.11}s`,
            "--flower-duration": `${4.2 + (flower % 8) * 0.38}s`,
            "--flower-size": `${7 + (flower % 8) * 2}px`,
          }}
        >
          ✿
        </span>
      ))}
    </div>
  );
}

function SectionBurst({ activeSection }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        className="section-burst"
        initial={{ opacity: 0, scale: .55, rotate: -12 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [ .55, 1, 1.08, 1.25 ], rotate: [-12, 2, 8, 18] }}
        transition={{ duration: 1.45, times: [0, .18, .55, 1], ease: [0.2, .75, .2, 1] }}
        aria-hidden="true"
      >
        <span className="burst-petal burst-petal-one" />
        <span className="burst-petal burst-petal-two" />
        <span className="burst-petal burst-petal-three" />
        <span className="burst-petal burst-petal-four" />
        <span className="burst-core">✿</span>
      </motion.div>
    </AnimatePresence>
  );
}

function PointerGlow() {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(-300), { stiffness: 80, damping: 28 });
  const y = useSpring(useMotionValue(-300), { stiffness: 80, damping: 28 });

  useEffect(() => {
    if (reduceMotion) return undefined;
    const handlePointerMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, x, y]);

  return <motion.div className="pointer-glow" style={{ x, y }} aria-hidden="true" />;
}

function CursorTrail() {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(-100), { stiffness: 140, damping: 24 });
  const y = useSpring(useMotionValue(-100), { stiffness: 140, damping: 24 });
  const ringX = useSpring(useMotionValue(-100), { stiffness: 70, damping: 18 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (reduceMotion) return undefined;
    const handlePointerMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      ringX.set(event.clientX);
      ringY.set(event.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, ringX, ringY, x, y]);

  if (reduceMotion) return null;
  return <div className="cursor-trail" aria-hidden="true"><motion.span className="cursor-core" style={{ x, y }} /><motion.span className="cursor-ring cursor-ring-one" style={{ x: ringX, y: ringY }} /><motion.span className="cursor-ring cursor-ring-two" style={{ x: ringX, y: ringY }} /></div>;
}

function HomePage() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "light");
  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="page-shell">
      <PointerGlow />
      <CursorTrail />
      <FlowerFall activeSection={activeSection} />
      <SectionBurst activeSection={activeSection} />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={() => setTheme((value) => value === "light" ? "dark" : "light")} />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SummarySection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection onOpenProject={setSelectedProject} />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default HomePage;
