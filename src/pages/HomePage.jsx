import { useState } from "react";
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

function HomePage() {
  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="page-shell">
      <Navbar activeSection={activeSection} />
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
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default HomePage;
