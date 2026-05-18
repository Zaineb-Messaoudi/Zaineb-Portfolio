import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";

function ProjectsSection({ onOpenProject }) {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="projects" {...sectionMeta.projects}>
      <motion.div
        className="project-grid"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerParent}
      >
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.slug}
              className="project-card"
              variants={fadeUp}
            >
              <div className="project-media">
                <div className="project-media-copy">
                  <span className="pill">{project.period}</span>
                  <div className="project-shot" aria-hidden="true">
                    <div className="project-shot-top">
                      <span className="project-shot-dot" />
                      <span className="project-shot-dot" />
                      <span className="project-shot-dot" />
                    </div>
                    <div className="project-shot-body">
                      <div className="project-shot-copy">
                        <div className="card-icon">
                          <Icon size={20} />
                        </div>
                        <strong>Platform screenshot area</strong>
                        <span>
                          Horizontal showcase reserved for project visuals.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="meta-line">{project.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="project-top">
                <div>
                  <p className="meta-line">{project.organization}</p>
                  <p className="project-overview">{project.overview}</p>
                </div>
              </div>

              <div className="badge-list">
                {project.emphasis.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>

              <div className="stack-list">
                {project.stack.slice(0, 5).map((tech) => (
                  <span key={tech} className="stack-chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => onOpenProject(project)}
                  aria-label={`Open detailed view for ${project.title}`}
                >
                  View details
                </button>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => onOpenProject(project)}
                >
                  Explore architecture
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}

export default ProjectsSection;
