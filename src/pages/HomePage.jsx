import { ArrowRight, ExternalLink, Gamepad2 } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import EducationSection from "../components/sections/EducationSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import SummarySection from "../components/sections/SummarySection";
import GameWorld, { STOPS } from "../components/game/GameWorld";
import JourneyHUD from "../components/game/JourneyHUD";
import SEOHead from "../components/SEOHead";
import { experience, personal, projects } from "../data/portfolioData";
import { localize, useLanguage } from "../i18n";

const BRANCH_COUNTS = { experience: experience.length, projects: projects.length };

const localizedStopNames = {
  about: { en: "About me", fr: "À propos" },
  summary: { en: "My story", fr: "Mon parcours" },
  experience: { en: "Internships", fr: "Stages" },
  education: { en: "Education", fr: "Formation" },
  projects: { en: "Projects", fr: "Projets" },
  skills: { en: "Skills", fr: "Compétences" },
  contact: { en: "Contact", fr: "Contact" },
};

function HomePage() {
  const { language, setLanguage } = useLanguage();
  const [activeStop, setActiveStop] = useState("hero");
  const [isReading, setIsReading] = useState(false);
  const [chapterOpen, setChapterOpen] = useState(false);
  const [isTraveling, setIsTraveling] = useState(false);
  const [branchReturning, setBranchReturning] = useState(false);
  const [branchCategory, setBranchCategory] = useState(null);
  const [branchTarget, setBranchTarget] = useState(null);
  const [branchRevealIntent, setBranchRevealIntent] = useState(false);
  const [focusedBranchIndex, setFocusedBranchIndex] = useState(null);
  const [journeyMapOpen, setJourneyMapOpen] = useState(false);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [arrivalReveal, setArrivalReveal] = useState(null);
  const directNavigationTarget = useRef(null);
  const selectionStartedAt = useRef(0);
  const localizedProjects = localize(projects, language);
  const localizedExperience = localize(experience, language);
  const branchLabels = {
    experience: localizedExperience.map((item) => item.company),
    projects: localizedProjects.map((item) => item.title),
  };
  const currentStop = Math.max(0, STOPS.findIndex((stop) => stop.id === activeStop));
  const copy = language === "fr"
    ? {
        role: "Étudiante en ingénierie logicielle · Full-stack & IA appliquée",
        location: "Tunis, Tunisie · ESPRIT",
        pfe: "Ma prochaine quête : un stage PFE à partir de janvier 2027.",
        resume: "VOIR MON CV",
        gameHint: "Cliquez sur un repère ou placez le focus sur la carte : ← / → pour marcher, ↓ pour entrer.",
        active: "ÉTAPE ACTIVE",
        progress: "PROGRESSION DU PARCOURS",
        return: "Retour au monde 3D",
      }
    : {
        role: "Software engineering student · Full-stack & applied AI",
        location: "Tunis, Tunisia · ESPRIT",
        pfe: "My next quest: a PFE internship starting January 2027.",
        resume: "VIEW MY RESUME",
        gameHint: "Click a landmark or focus the map: ← / → to walk, ↓ to enter.",
        active: "CURRENT STOP",
        progress: "JOURNEY PROGRESS",
        return: "Back to the 3D world",
      };

  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
  }, []);

  useEffect(() => {
    let reading = false;
    const updateReadingState = () => {
      const nextReading = window.scrollY > 180;
      if (reading === nextReading) return;
      reading = nextReading;
      setIsReading(nextReading);
    };
    updateReadingState();
    window.addEventListener("scroll", updateReadingState, { passive: true });
    return () => window.removeEventListener("scroll", updateReadingState);
  }, []);

  useEffect(() => {
    if (!arrivalReveal) return undefined;
    const delay = Math.max(0, 1000 - (performance.now() - arrivalReveal.requestedAt));
    const reveal = window.setTimeout(() => {
      if (arrivalReveal.stop !== activeStop) return;
      const destination = document.getElementById(arrivalReveal.destination);
      destination?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto",
        block: "start",
      });
      if (destination?.matches(".experience-card, .project-details")) {
        destination.focus({ preventScroll: true });
      } else {
        document.getElementById(`${activeStop}-title`)?.focus({ preventScroll: true });
      }
      setArrivalReveal(null);
    }, delay);
    return () => window.clearTimeout(reveal);
  }, [activeStop, arrivalReveal, chapterOpen, isTraveling]);

  useEffect(() => {
    if (!selectedProject || branchCategory === "projects") return undefined;
    const frame = window.requestAnimationFrame(() => {
    const details = document.getElementById(`project-details-${selectedProject.slug}`);
    details?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto",
      block: "start",
    });
    details?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [branchCategory, selectedProject]);

  const visitStop = (id) => {
    setJourneyMapOpen(false);
    setArrivalReveal(null);
    directNavigationTarget.current = null;
    if (id === activeStop) {
      setChapterOpen(id !== "hero");
      document.getElementById(id === "hero" || id === "projects" || id === "experience" ? "hero" : id)
        ?.scrollIntoView({ block: "start" });
      return;
    }

    setSelectedExperienceIndex(null);
    setSelectedProject(null);
    setBranchTarget(null);
    setBranchRevealIntent(false);
    setFocusedBranchIndex(null);
    setBranchCategory(null);
    setBranchReturning(false);
    setChapterOpen(false);
    setIsTraveling(true);
    selectionStartedAt.current = performance.now();
    setActiveStop(id);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto",
    });
  };

  const arriveAtStop = (id) => {
    if (id !== activeStop) return;
    if (directNavigationTarget.current === id) {
      directNavigationTarget.current = null;
      setIsTraveling(false);
      return;
    }
    setIsTraveling(false);
    setChapterOpen(id !== "hero");
    const hasBranchRoads = id === "experience" || id === "projects";
    setBranchCategory(hasBranchRoads ? id : null);
    setBranchTarget(null);
    setBranchReturning(false);
    setBranchRevealIntent(false);
    setFocusedBranchIndex(null);
    setSelectedExperienceIndex(null);
    setArrivalReveal(id !== "hero" && !hasBranchRoads
      ? { stop: id, destination: id, requestedAt: selectionStartedAt.current }
      : null);
    if (hasBranchRoads) document.querySelector(".game-world")?.focus({ preventScroll: true });
  };

  const selectBranch = (id, revealOnArrival = true) => {
    if (isTraveling || branchReturning) return;
    const [category, index] = id.split(":");
    if (category !== branchCategory || !Number.isInteger(Number(index))) return;
    setFocusedBranchIndex(Number(index));
    setSelectedExperienceIndex(null);
    setSelectedProject(null);
    setBranchTarget(id);
    setBranchRevealIntent(revealOnArrival);
    setIsTraveling(true);
    selectionStartedAt.current = performance.now();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto",
    });
  };

  const arriveAtBranch = (id, reveal = branchRevealIntent) => {
    if (id !== branchTarget) return;
    if (branchReturning) return;
    const [category, index] = id.split(":");
    setIsTraveling(false);
    if (!reveal) return;
    setChapterOpen(true);
    if (category === "experience") setSelectedExperienceIndex(Number(index));
    if (category === "projects") setSelectedProject(localizedProjects[Number(index)]);
    setArrivalReveal(reveal
      ? {
          stop: category,
          destination: category === "experience" ? `experience-entry-${index}` : `project-details-${localizedProjects[Number(index)].slug}`,
          requestedAt: selectionStartedAt.current,
        }
      : null);
  };

  const returnToMainRoad = () => {
    if (!branchCategory || isTraveling) return;
    setJourneyMapOpen(false);
    setArrivalReveal(null);
    setSelectedExperienceIndex(null);
    setSelectedProject(null);
    if (!branchTarget) {
      setBranchCategory(null);
      setBranchRevealIntent(false);
      setFocusedBranchIndex(null);
      setChapterOpen(false);
      setJourneyMapOpen(true);
      return;
    }
    setBranchReturning(true);
    setChapterOpen(false);
    setIsTraveling(true);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto",
    });
  };

  const arriveAtMainRoad = () => {
    setBranchCategory(null);
    setBranchTarget(null);
    setBranchReturning(false);
    setBranchRevealIntent(false);
    setFocusedBranchIndex(null);
    setIsTraveling(false);
    setChapterOpen(false);
    setJourneyMapOpen(true);
    document.querySelector(".game-world")?.focus({ preventScroll: true });
  };

  const navigateDirectly = (id) => {
    const isSameStop = id === activeStop;
    setJourneyMapOpen(false);
    setArrivalReveal(null);
    setSelectedExperienceIndex(null);
    setSelectedProject(null);
    setBranchCategory(null);
    setBranchTarget(null);
    setBranchReturning(false);
    setBranchRevealIntent(false);
    setFocusedBranchIndex(null);
    setChapterOpen(id !== "hero");
    setActiveStop(id);
    directNavigationTarget.current = isSameStop ? null : id;
    setIsTraveling(!isSameStop);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto",
      block: "start",
    });
    document.getElementById(id === "hero" ? "game-hero-title" : `${id}-title`)?.focus({ preventScroll: true });
  };

  const revealSelectedBranch = () => {
    if (!branchCategory || !branchTarget) return;
    if (isTraveling) {
      setBranchRevealIntent(true);
      return;
    }
    arriveAtBranch(branchTarget, true);
  };

  const handleDirection = (direction) => {
    if (isTraveling && direction !== "down") return;
    if (branchCategory && branchCategory === activeStop) {
      const count = BRANCH_COUNTS[branchCategory];
      if (direction === "down") {
        if (branchTarget) revealSelectedBranch();
        else selectBranch(`${branchCategory}:0`, true);
        return;
      }
      if (direction !== "left" && direction !== "right") return;
      const selectedIndex = focusedBranchIndex ?? -1;
      const offset = direction === "right" ? 1 : -1;
      const baseIndex = focusedBranchIndex === null && direction === "left" ? 0 : selectedIndex;
      selectBranch(`${branchCategory}:${(baseIndex + offset + count) % count}`, false);
      return;
    }

    if (direction === "down") {
      if (activeStop !== "hero" && !chapterOpen) setChapterOpen(true);
      return;
    }
    if (direction !== "left" && direction !== "right") return;
    const offset = direction === "right" ? 1 : -1;
    const nextIndex = (currentStop + offset + STOPS.length) % STOPS.length;
    visitStop(STOPS[nextIndex].id);
  };

  useLayoutEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && (
        target.isContentEditable
        || target.matches("input, textarea, select, video, [role='dialog']")
        || target.closest("[role='dialog']")
        || target.closest(".navbar")
      )) return;
      if (!["ArrowLeft", "ArrowRight", "ArrowDown"].includes(event.key)) return;
      if (isTraveling && event.key !== "ArrowDown") {
        event.preventDefault();
        return;
      }
      if (event.key === "ArrowDown" && (
        !(branchCategory && branchCategory === activeStop)
        || !(target instanceof HTMLElement)
        || !target.closest(".game-world, .journey-hud")
      )) return;
      event.preventDefault();
      handleDirection(event.key === "ArrowLeft" ? "left" : event.key === "ArrowRight" ? "right" : "down");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeStop, branchCategory, branchTarget, chapterOpen, currentStop, focusedBranchIndex, isTraveling]);

  const closeChapter = () => {
    setChapterOpen(false);
    document.getElementById("hero")?.scrollIntoView({ block: "start" });
  };

  const selectProject = (project) => {
    const index = projects.findIndex((item) => item.slug === project.slug);
    if (index < 0) return;
    if (branchCategory === "projects" && activeStop === "projects") {
      selectBranch(`projects:${index}`);
      return;
    }
    setSelectedProject(localizedProjects[index]);
  };

  return (
    <div
      className={`game-portfolio is-game-mode ${chapterOpen ? "is-chapter-open" : ""} ${isReading ? "is-reading" : ""} ${isTraveling ? "is-traveling" : ""} ${branchCategory ? "has-branch-roads" : ""}`}
      data-game-current={activeStop}
      data-game-branch={branchCategory || ""}
      data-game-traveling={String(isTraveling)}
    >
      <SEOHead />
      <Navbar
        activeSection={activeStop}
        language={language}
        onChangeLanguage={setLanguage}
        onNavigate={navigateDirectly}
      />
      <main id="main-content">
        <section className="game-hero" id="hero" aria-labelledby="game-hero-title">
          <div className="game-hero-backdrop" aria-hidden="true" />
          <div className="game-hero-copy">
            <div className="player-card">
              <img className="profile-image" src={personal.profileImage} alt="" width="90" height="112" />
              <div>
                <span className="player-rank">{language === "fr" ? "INGÉNIEURE EN DEVENIR" : "ENGINEER IN PROGRESS"}</span>
                <h1 id="game-hero-title">{personal.name}</h1>
                <p>{copy.role}</p>
                <span className="player-location">{copy.location}</span>
              </div>
            </div>
            <div className="player-quest">
              <span className="quest-pip" aria-hidden="true" />
              <p>{copy.pfe}</p>
              <div className="hero-quest-actions">
                <button type="button" onClick={() => visitStop("contact")}>
                  {language === "fr" ? "VOIR LA QUÊTE" : "VIEW QUEST"} <ArrowRight size={15} aria-hidden="true" />
                </button>
                <a href="/assets/cv/zaineb-messaoudi-resume-en.pdf" target="_blank" rel="noreferrer noopener">
                  {copy.resume} <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <GameWorld
            activeSection={activeStop}
            branchCategory={branchCategory}
            branchTarget={branchTarget}
            branchReturning={branchReturning}
            branchLabels={branchLabels}
            branchCounts={BRANCH_COUNTS}
            onArriveBranch={arriveAtBranch}
            onArriveMainRoad={arriveAtMainRoad}
            onArriveStop={arriveAtStop}
            onSelectBranch={selectBranch}
            onSelectStop={visitStop}
            language={language}
          />
          <div className="world-bottom-fade" aria-hidden="true" />
          <div className="world-caption" aria-hidden="true">
            <span>36° 48′ N · TUNIS</span>
            <span>{language === "fr" ? "CARTE D'EXPLORATION 3D" : "3D EXPLORATION MAP"}</span>
          </div>
        </section>

        <section className="journey-map-section" id="journey-map" aria-labelledby="journey-map-title">
          <div className="journey-map-inner">
            <div className="journey-heading">
              <div>
                <p>{language === "fr" ? "CHOISISSEZ VOTRE PROCHAINE DESTINATION" : "CHOOSE YOUR NEXT DESTINATION"}</p>
                <h2 id="journey-map-title">{language === "fr" ? "La route est à vous." : "The route is yours."}</h2>
              </div>
              <span className="journey-current">
                <i aria-hidden="true" />
                {copy.active}: {localizedStopNames[STOPS[currentStop].id]?.[language] || (language === "fr" ? "Départ" : "Start")}
              </span>
            </div>
            <div className="journey-route">
              <div className="journey-route-line" aria-hidden="true">
                <span style={{ "--journey-scale": currentStop / (STOPS.length - 1) }} />
              </div>
              {STOPS.map((stop, index) => {
                const isActive = currentStop === index;
                const stopName = localizedStopNames[stop.id]?.[language] || (language === "fr" ? "Départ" : "Start");
                return (
                  <button
                    className={`journey-stop ${isActive ? "is-active" : ""} ${index < currentStop ? "is-visited" : ""}`}
                    type="button"
                    key={stop.id}
                    onClick={() => visitStop(stop.id)}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${String(index).padStart(2, "0")} ${stopName}`}
                  >
                    <span className="journey-stop-marker"><span /></span>
                    <span className="journey-stop-number">{String(index).padStart(2, "0")}</span>
                    <strong>{stopName}</strong>
                  </button>
                );
              })}
            </div>
            <p className="journey-hint"><Gamepad2 size={15} aria-hidden="true" />{copy.gameHint}</p>
            <div
              className="journey-progress"
              role="progressbar"
              aria-label={copy.progress}
              style={{ height: "24px", padding: "0 8px" }}
              aria-valuemin={0}
              aria-valuemax={STOPS.length - 1}
              aria-valuenow={currentStop}
            >
              <span>{copy.progress}</span>
              <div style={{ "--progress-scale": currentStop / (STOPS.length - 1), height: "100%" }} />
              <strong style={{ fontSize: "0.65rem" }}>{String(currentStop).padStart(2, "0")} / {String(STOPS.length - 1).padStart(2, "0")}</strong>
              <span style={{ marginLeft: "8px" }}>/{String(STOPS.length - 1).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <div className="journey-chapters">
          <span aria-hidden="true" />
          <span>{String(currentStop).padStart(2, "0")} / {String(STOPS.length - 1).padStart(2, "0")}</span>
        </div>
        <AboutSection gameActive={chapterOpen && activeStop === "about"} />
        <SummarySection gameActive={chapterOpen && activeStop === "summary"} />
        <ExperienceSection
          gameActive={chapterOpen && activeStop === "experience"}
          selectedExperienceIndex={selectedExperienceIndex}
          onClearExperience={() => setSelectedExperienceIndex(null)}
        />
        <EducationSection gameActive={chapterOpen && activeStop === "education"} />
        <ProjectsSection
          onOpenProject={selectProject}
          selectedProject={selectedProject}
          onBackToProjects={() => setSelectedProject(null)}
          gameActive={chapterOpen && activeStop === "projects"}
        />
        <SkillsSection gameActive={chapterOpen && activeStop === "skills"} />
        <ContactSection gameActive={chapterOpen && activeStop === "contact"} />
      </main>
      <Footer />
      <JourneyHUD
        activeSection={activeStop}
        language={language}
        mapOpen={journeyMapOpen}
        onMapOpenChange={setJourneyMapOpen}
        branchCategory={branchCategory}
        onReturnToMainRoad={returnToMainRoad}
        isTraveling={isTraveling}
        travelTargetLabel={branchTarget
          ? branchLabels[branchTarget.split(":")[0]]?.[Number(branchTarget.split(":")[1])]
          : null}
        onSelectStop={visitStop}
        onDirection={handleDirection}
      />
      {isReading ? (
        <button type="button" className="game-chapter-close" onClick={closeChapter}>
          <Gamepad2 size={15} aria-hidden="true" />
          {copy.return}
        </button>
      ) : null}
    </div>
  );
}

export default HomePage;
