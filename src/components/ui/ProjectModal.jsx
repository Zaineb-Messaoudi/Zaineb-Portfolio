import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

function ProjectModal({ project, onClose }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="modal-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={
              reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-top">
              <div>
                <p className="eyebrow">{project.organization}</p>
                <h3 id="project-modal-title" className="section-title">
                  {project.title}
                </h3>
                <p className="section-description">{project.subtitle}</p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={onClose}
                aria-label={`Close details for ${project.title}`}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-content">
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
                        <strong>Platform screenshot area</strong>
                        <span>
                          Add a wide product capture here for the final showcase.
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="project-overview">{project.overview}</p>
                  <div className="badge-list">
                    {project.emphasis.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="card-title">Key features</h4>
                <ul className="bullet-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="card-title">Technology stack</h4>
                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item} className="stack-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ProjectModal;
