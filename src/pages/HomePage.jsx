import { motion, useScroll } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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
import { useLanguage } from "../i18n";

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

function HomePage() {
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();

  // The flower layer is keyed on the section, so it replays whenever that key
  // changes. Opening the modal locks body scroll, which fires resize/scroll and can
  // flip the active section — freeze the key while the modal is open so the flowers
  // don't re-trigger behind it.
  const [decorSection, setDecorSection] = useState(activeSection);
  const isModalOpen = Boolean(selectedProject);

  useEffect(() => {
    if (!isModalOpen) setDecorSection(activeSection);
  }, [activeSection, isModalOpen]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="page-shell" data-modal-open={isModalOpen ? "true" : undefined}>
      <FlowerFall activeSection={decorSection} />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <Navbar activeSection={activeSection} theme={theme} onToggleTheme={() => setTheme((value) => value === "light" ? "dark" : "light")} language={language} onChangeLanguage={setLanguage} />
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
