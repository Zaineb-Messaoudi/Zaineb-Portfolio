import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

function ProjectModal({ project, onClose }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    previousFocus.current = document.activeElement;
    closeButtonRef.current?.focus();

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
      previousFocus.current?.focus?.();
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div className="modal-backdrop" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="modal-card" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: 0.25 }} onClick={(event) => event.stopPropagation()}>
            <div className="modal-top">
              <div><p className="eyebrow">{project.organization}</p><h3 id="project-modal-title" className="section-title">{project.title}</h3><p className="section-description">{project.subtitle}</p></div>
              <button type="button" className="close-button" ref={closeButtonRef} onClick={onClose} aria-label={`Close details for ${project.title}`}><X size={18} /></button>
            </div>
            <div className="modal-content">
              <div className="project-media">
                <div className="project-media-copy">
                  <span className="pill">{project.period}</span>
                  <div className="project-shot"><div className="project-shot-top" aria-hidden="true"><span className="project-shot-dot" /><span className="project-shot-dot" /><span className="project-shot-dot" /></div><div className="project-shot-body"><img className="project-preview-image" src={project.image} alt={`${project.title} preview`} /></div></div>
                  <div><h4 className="project-title">{project.title}</h4><p className="meta-line">{project.subtitle}</p></div>
                  <p className="project-overview">{project.overview}</p>
                  <div className="badge-list">{project.emphasis.map((item) => <span key={item} className="tag">{item}</span>)}</div>
                </div>
              </div>
              <div><h4 className="card-title">Key features</h4><ul className="bullet-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
              <div><h4 className="card-title">Technology stack</h4><div className="stack-list">{project.stack.map((item) => <span key={item} className="stack-chip">{item}</span>)}</div></div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ProjectModal;
