// import { useEffect, useState } from "react";

function ProjectCard({
  href,
  title,
  description,
  previewSrc,
  previewFrames,
  previewAlt,
  tags = [],
}) {
  const CardTag = href ? "a" : "article";

  const previewImage = previewFrames?.[0] || previewSrc;

  return (
    <CardTag className="project-card" href={href}>
      <div className="project-preview">
        {previewImage ? (
          <img
            className="project-media"
            src={previewImage}
            alt={previewAlt || title}
          />
        ) : (
          <div className="project-placeholder">
            <span>Add preview image or GIF</span>
          </div>
        )}
      </div>

      <div className="project-content">
        <div className="project-tags" aria-label={`${title} tags`}>
          {tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <h2 className="project-title">{title}</h2>

        <p className="project-description">{description}</p>
      </div>
    </CardTag>
  );
}

export default ProjectCard;
