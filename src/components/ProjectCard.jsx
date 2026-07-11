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
  const frames = previewFrames?.length
    ? previewFrames
    : previewSrc
      ? [previewSrc]
      : [];

  return (
    <CardTag className="project-card" href={href}>
      <div className="project-preview">
        {frames.length > 0 ? (
          frames.map((frame, index) => (
            <img
              key={frame}
              className="project-media project-media-frame"
              src={frame}
              alt={index === 0 ? previewAlt || title : ""}
              aria-hidden={index > 0}
              style={{ "--frame-index": index }}
            />
          ))
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
