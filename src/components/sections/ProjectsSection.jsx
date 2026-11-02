import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Gem, Github } from "lucide-react";
import { projects, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";
import ProjectDetails from "./ProjectDetails";
import { localize, useLanguage } from "../../i18n";

function ProjectsSection({ onOpenProject, gameActive = false, onSelectProjectStop, selectedProject, onBackToProjects }) {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const localizedProjects = localize(projects, language);
  const localizedMeta = localize(sectionMeta.projects, language);

  return (
    <SectionShell id="projects" gameActive={gameActive} {...localizedMeta}>
      {selectedProject ? (
        <ProjectDetails project={selectedProject} onBack={onBackToProjects} />
      ) : (
        <motion.div
          className="project-grid"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerParent}
        >
        {localizedProjects.map((project, index) => (
          <motion.article key={project.slug} className="project-card" variants={fadeUp}>
            <div className="project-artifact-label" aria-hidden="true">
              <span><Gem size={14} /></span>
              <span>{language === "fr" ? "ARTEFACT DE PROJET" : "BUILD ARTIFACT"}</span>
              <span>{String(index + 1).padStart(2, "0")} / {String(localizedProjects.length).padStart(2, "0")}</span>
            </div>
            <div className="project-media">
              <div className="project-media-copy">
                <span className="pill">{project.period}</span>
                <div className="project-shot">
                  <div className="project-shot-top" aria-hidden="true">
                    <span className="project-shot-dot" />
                    <span className="project-shot-dot" />
                    <span className="project-shot-dot" />
                  </div>
                  <div className="project-shot-body">
                  {project.video ? (
                    <video className="project-preview-image" src={project.video} poster={project.poster} controls preload="metadata" playsInline aria-label={`${project.title} project video`} />
                  ) : project.image ? (
                    <img className="project-preview-image" src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" />
                  ) : (
                    <div className="project-media-placeholder" role="img" aria-label={`${project.title} project media preview`}>
                      <span>{project.title}</span>
                      <span>{project.stack.slice(0, 3).join(" / ")}</span>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
            <div className="project-top">
              <div>
                <h3 className="project-title">{project.title}</h3>
                <p className="meta-line">{project.subtitle}</p>
                <p className="meta-line">{project.organization}</p>
                <p className="project-overview">{project.overview}</p>
              </div>
            </div>
            <div className="badge-list">
              {project.emphasis.map((item) => <span key={item} className="tag">{item}</span>)}
            </div>
            <div className="stack-list">
              {project.stack.slice(0, 5).map((tech) => <span key={tech} className="stack-chip">{tech}</span>)}
            </div>
            <div className="project-actions">
              <button type="button" className="button button-secondary" onClick={() => onOpenProject(project)} aria-label={`${t("View details")} : ${project.title}`}>{t("View details")}</button>
              <div className="project-links">
                {project.links?.github ? (
                  <a
                    className="icon-link"
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={`${project.title} source code on GitHub`}
                    aria-label={`${project.title} source code on GitHub`}
                  >
                    <Github size={18} />
                  </a>
                ) : null}
                {project.links?.demo ? (
                  <a
                    className="icon-link"
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={`${project.title} live demo`}
                    aria-label={`${project.title} live demo`}
                  >
                    <ExternalLink size={18} />
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
        </motion.div>
      )}
    </SectionShell>
  );
}

export default ProjectsSection;
