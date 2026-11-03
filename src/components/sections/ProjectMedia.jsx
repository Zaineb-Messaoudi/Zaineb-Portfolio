import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../i18n";

function LegalGraphInfographic({ t }) {
  const nodes = [
    { x: 78, y: 58, label: t("Contracts") },
    { x: 214, y: 42, label: t("Case law") },
    { x: 78, y: 166, label: t("Compliance") },
    { x: 214, y: 184, label: t("Entities") },
  ];

  return (
    <svg className="project-infographic-art legal-graph-art" viewBox="0 0 300 230" aria-hidden="true">
      <path className="infographic-flow-line" d="M92 68 133 102M200 52 165 101M92 155 133 126M200 173 165 128" />
      {nodes.map((node) => (
        <g className="infographic-graph-node" key={node.label} transform={`translate(${node.x} ${node.y})`}>
          <circle r="25" />
          <text y="42" textAnchor="middle">{node.label}</text>
        </g>
      ))}
      <rect className="infographic-core" x="119" y="91" width="62" height="48" rx="12" />
      <text className="infographic-core-label" x="150" y="111" textAnchor="middle">{t("RDF / OWL")}</text>
      <text className="infographic-core-caption" x="150" y="127" textAnchor="middle">{t("Shared ontology")}</text>
    </svg>
  );
}

function LearnwiseInfographic({ t }) {
  return (
    <svg className="project-infographic-art learnwise-art" viewBox="0 0 440 230" aria-hidden="true">
      <rect className="infographic-window" x="15" y="16" width="410" height="198" rx="16" />
      <path className="infographic-window-line" d="M15 54h410" />
      <circle className="infographic-window-dot" cx="37" cy="35" r="4" />
      <circle className="infographic-window-dot" cx="52" cy="35" r="4" />
      <circle className="infographic-window-dot" cx="67" cy="35" r="4" />
      <text className="infographic-eyebrow" x="88" y="39">{t("LEARNING SPACE")}</text>
      <rect className="infographic-course" x="34" y="74" width="158" height="118" rx="11" />
      <rect className="infographic-course-cover" x="47" y="86" width="132" height="39" rx="7" />
      <path className="infographic-course-symbol" d="m105 94 18 11-18 11z" />
      <text className="infographic-label" x="48" y="145">{t("Course materials")}</text>
      <path className="infographic-progress-track" d="M48 162h118" />
      <path className="infographic-progress-fill" d="M48 162h79" />
      <text className="infographic-small-label" x="48" y="181">{t("Study progress")}</text>
      <rect className="infographic-assistant" x="211" y="74" width="195" height="66" rx="11" />
      <circle className="infographic-assistant-orb" cx="234" cy="97" r="10" />
      <text className="infographic-label" x="253" y="96">{t("AI study help")}</text>
      <text className="infographic-small-label" x="253" y="114">{t("Cited course sources")}</text>
      <path className="infographic-wave" d="M227 126h5l4-8 6 15 6-20 6 15 4-6h5m8 4h3l4-7 6 12 5-15 6 13 4-3h7" />
      <rect className="infographic-practice" x="211" y="151" width="195" height="41" rx="9" />
      <text className="infographic-small-label" x="226" y="176">{t("Quizzes")} · {t("Voice tools")} · {t("Analytics")}</text>
    </svg>
  );
}

function SolarShareInfographic({ t }) {
  return (
    <svg className="project-infographic-art solarshare-art" viewBox="0 0 440 230" aria-hidden="true">
      <rect className="infographic-window" x="15" y="16" width="410" height="198" rx="16" />
      <path className="infographic-window-line" d="M15 54h410" />
      <circle className="infographic-window-dot" cx="37" cy="35" r="4" />
      <circle className="infographic-window-dot" cx="52" cy="35" r="4" />
      <circle className="infographic-window-dot" cx="67" cy="35" r="4" />
      <text className="infographic-eyebrow" x="88" y="39">{t("RENTAL MARKETPLACE")}</text>
      <rect className="infographic-search" x="34" y="70" width="372" height="35" rx="10" />
      <circle className="infographic-search-icon" cx="52" cy="87" r="6" />
      <path className="infographic-search-handle" d="m57 92 5 5" />
      <text className="infographic-small-label" x="73" y="91">{t("Describe the equipment you need")}</text>
      <g className="infographic-equipment-card" transform="translate(34 119)">
        <rect width="112" height="72" rx="9" />
        <path className="infographic-solar-panel" d="m24 144 15-9 24 6-15 10zM39 135v20m12-17v20m-23-8 24 5" transform="translate(0 -112)" />
        <text className="infographic-equipment-label" x="11" y="58">{t("Solar panel")}</text>
      </g>
      <g className="infographic-equipment-card" transform="translate(164 119)">
        <rect width="112" height="72" rx="9" />
        <path className="infographic-equipment-icon" d="M49 134v18m-9-9h18m-15-5h12l3 14H40z" transform="translate(0 -112)" />
        <text className="infographic-equipment-label" x="11" y="58">{t("Equipment")}</text>
      </g>
      <g className="infographic-equipment-card" transform="translate(294 119)">
        <rect width="112" height="72" rx="9" />
        <path className="infographic-assistant-mark" d="M350 143a9 9 0 1 0 18 0 9 9 0 1 0-18 0M347 153h24" transform="translate(-306 -112)" />
        <text className="infographic-equipment-label" x="11" y="58">{t("AI assistance")}</text>
      </g>
      <path className="infographic-flow-line" d="M90 204h260" />
      <circle className="infographic-flow-dot" cx="90" cy="204" r="3" />
      <circle className="infographic-flow-dot" cx="220" cy="204" r="3" />
      <circle className="infographic-flow-dot" cx="350" cy="204" r="3" />
    </svg>
  );
}

function ProjectInfographic({ project }) {
  const { t } = useLanguage();
  const stageRef = useRef(null);
  const isInView = useInView(stageRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const visualByProject = {
    legalgraph: <LegalGraphInfographic t={t} />,
    learnwise: <LearnwiseInfographic t={t} />,
    solarshare: <SolarShareInfographic t={t} />,
  };

  return (
    <div
      className="project-media-placeholder project-infographic"
      data-project-slug={project.slug}
      role="img"
      aria-label={`${project.title} — ${t("illustrative project infographic")}`}
    >
      <div
        ref={stageRef}
        className="project-infographic-stage"
        data-motion-active={String(isInView && !reduceMotion)}
        aria-hidden="true"
      >
        {visualByProject[project.slug] || (
          <div className="project-infographic-stack">
            {project.stack.slice(0, 4).map((technology, index) => (
              <span className={`infographic-stack-node infographic-stack-node-${index + 1}`} key={technology}>{technology}</span>
            ))}
          </div>
        )}
      </div>
      <div className="project-infographic-copy" aria-hidden="true">
        <span className="infographic-copy-kicker">{t("PROJECT INFOGRAPHIC")}</span>
        <strong>{project.title}</strong>
        <span>{project.impact || project.subtitle}</span>
      </div>
    </div>
  );
}

function ProjectMedia({ project, imageClassName }) {
  const [unavailableImage, setUnavailableImage] = useState(null);
  const hasAvailableImage = project.image && unavailableImage !== project.image;

  if (project.video) {
    return (
      <video
        className={imageClassName || "project-preview-image"}
        src={project.video}
        poster={project.poster}
        controls
        preload="metadata"
        playsInline
        aria-label={`${project.title} project video`}
      />
    );
  }

  if (hasAvailableImage) {
    return (
      <img
        className={imageClassName}
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        onError={() => setUnavailableImage(project.image)}
      />
    );
  }

  return <ProjectInfographic project={project} />;
}

export default ProjectMedia;
