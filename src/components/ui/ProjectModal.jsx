import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function ProjectModal({ project, onClose }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    previousFocus.current = document.activeElement;
    closeButtonRef.current?.focus();
    contentRef.current?.scrollTo?.({ top: 0 });

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll("button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previousFocus.current?.focus?.();
    };
  }, [onClose, project]);

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="modal-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-top">
              <div>
                <p className="eyebrow">{project.organization}</p>
                <h3 id="project-modal-title" className="section-title">{project.title}</h3>
                <p className="section-description">{project.subtitle}</p>
              </div>
              <button type="button" className="close-button" ref={closeButtonRef} onClick={onClose} aria-label={`Close details for ${project.title}`}><X size={18} /></button>
            </div>

            <div className="modal-content" ref={contentRef}>
              <div className="project-media">
                <div className="project-media-copy">
                  <span className="pill">{project.period}</span>
                  <div className="project-shot">
                    <div className="project-shot-top" aria-hidden="true">
                      <span className="project-shot-dot" /><span className="project-shot-dot" /><span className="project-shot-dot" />
                    </div>
                    <div className="project-shot-body">
                      <img className="project-preview-image" src={project.image} alt={`${project.title} preview`} />
                    </div>
                  </div>
                  <div>
                    <h4 className="project-title">{project.title}</h4>
                    <p className="meta-line">{project.subtitle}</p>
                  </div>
                  <p className="project-overview">{project.overview}</p>
                  <div className="badge-list">{project.emphasis.map((item) => <span key={item} className="tag">{item}</span>)}</div>
                </div>
              </div>

              {project.links?.github || project.links?.demo ? (
                <div className="project-actions">
                  {project.links?.github ? (
                    <a className="button button-secondary" href={project.links.github} target="_blank" rel="noreferrer noopener">
                      <Github size={16} /> View source
                    </a>
                  ) : null}
                  {project.links?.demo ? (
                    <a className="button button-secondary" href={project.links.demo} target="_blank" rel="noreferrer noopener">
                      <ExternalLink size={16} /> Live demo
                    </a>
                  ) : null}
                </div>
              ) : null}

              {project.problem ? (
                <div>
                  <h4 className="card-title">The problem</h4>
                  <p className="project-overview">{project.problem}</p>
                </div>
              ) : null}

              {project.decisions?.length ? (
                <div>
                  <h4 className="card-title">Decisions & trade-offs</h4>
                  <div className="decision-list">
                    {project.decisions.map((decision) => (
                      <article className="decision-item" key={decision.title}>
                        <strong>{decision.title}</strong>
                        <p>{decision.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.constraint ? (
                <div>
                  <h4 className="card-title">Constraints</h4>
                  <p className="project-overview">{project.constraint}</p>
                </div>
              ) : null}

              <div>
                <h4 className="card-title">Key features</h4>
                <ul className="bullet-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </div>

              <div>
                <h4 className="card-title">Technology stack</h4>
                <div className="stack-list">{project.stack.map((item) => <span key={item} className="stack-chip">{item}</span>)}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

export default ProjectModal;
