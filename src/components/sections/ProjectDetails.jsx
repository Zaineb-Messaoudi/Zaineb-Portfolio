import { ExternalLink, Github, X } from "lucide-react";
import { useLanguage } from "../../i18n";

function ProjectDetails({ project, onBack }) {
  const { language, t } = useLanguage();
  const isFrench = language === "fr";

  return (
    <article className="project-details">
      <div className="project-details-heading">
        <div>
          <p className="eyebrow">{project.organization}</p>
          <h3 className="section-subtitle">{project.title}</h3>
          <p className="meta-line">{project.subtitle} · {project.period}</p>
        </div>
        <button type="button" className="project-details-back" onClick={onBack}>
          <X size={15} aria-hidden="true" />
          {isFrench ? "Retour aux projets" : "Back to projects"}
        </button>
      </div>

      <div className="project-details-media">
        {project.video ? (
          <video src={project.video} poster={project.poster} controls preload="metadata" playsInline aria-label={`${project.title} project video`} />
        ) : project.image ? (
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" />
        ) : (
          <div className="project-media-placeholder" role="img" aria-label={`${project.title} project media preview`}>
            <span>{project.title}</span>
            <span>{project.stack.slice(0, 3).join(" / ")}</span>
          </div>
        )}
      </div>

      <p className="project-overview">{project.overview}</p>
      <p className="project-details-outcome">{project.outcome}</p>
      <div className="badge-list">{project.emphasis.map((item) => <span className="tag" key={item}>{item}</span>)}</div>

      {project.links?.github || project.links?.demo ? (
        <div className="project-actions">
          {project.links.github ? (
            <a className="button button-secondary" href={project.links.github} target="_blank" rel="noreferrer noopener">
              <Github size={16} aria-hidden="true" /> {isFrench ? "Voir le code" : "View source"}
            </a>
          ) : null}
          {project.links.demo ? (
            <a className="button button-secondary" href={project.links.demo} target="_blank" rel="noreferrer noopener">
              <ExternalLink size={16} aria-hidden="true" /> {isFrench ? "Démo en direct" : "Live demo"}
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="project-details-grid">
        {project.problem ? (
          <section>
            <h4 className="card-title">{t("The problem")}</h4>
            <p className="project-overview">{project.problem}</p>
          </section>
        ) : null}
        {project.decisions?.length ? (
          <section>
            <h4 className="card-title">{t("Decisions & trade-offs")}</h4>
            <div className="decision-list">
              {project.decisions.map((decision) => (
                <article className="decision-item" key={decision.title}>
                  <strong>{decision.title}</strong>
                  <p>{decision.text}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        {project.constraint ? (
          <section>
            <h4 className="card-title">{t("Constraints")}</h4>
            <p className="project-overview">{project.constraint}</p>
          </section>
        ) : null}
        <section>
          <h4 className="card-title">{t("Key features")}</h4>
          <ul className="bullet-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </section>
        <section>
          <h4 className="card-title">{t("Technology stack")}</h4>
          <div className="stack-list">{project.stack.map((item) => <span className="stack-chip" key={item}>{item}</span>)}</div>
        </section>
      </div>
    </article>
  );
}

export default ProjectDetails;
