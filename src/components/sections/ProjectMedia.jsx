import { useState } from "react";

function ProjectMedia({ project, imageClassName }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);

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

  if (project.image && !imageUnavailable) {
    return (
      <img
        className={imageClassName}
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        onError={() => setImageUnavailable(true)}
      />
    );
  }

  return (
    <div className="project-media-placeholder" role="img" aria-label={`${project.title} project media preview`}>
      <span>{project.title}</span>
      <span>{project.stack.slice(0, 3).join(" / ")}</span>
    </div>
  );
}

export default ProjectMedia;
