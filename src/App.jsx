import "./App.css";
import { useEffect, useMemo, useState } from "react";
import logo from "./assets/logo.svg";
import ProjectCard from "./components/ProjectCard";

const projects = [
  {
    slug: "ai-training-avatar",
    title: "AI Training Avatar",
    previewFrames: [
      "/images/drive_dashboard.png",
      "/images/app_drive_module.png",
    ],
    description:
      "A landing page redesign with a sharper visual system, custom motion, and a cleaner conversion flow.",
    fullDescription:
      "A concept page for a product that introduces an AI training avatar with a polished conversion path, dynamic composition, and room for preview media.",
    previewAlt: "Preview for AI Training Avatar",
    tags: ["UI", "Branding", "Motion"],
    highlights: [
      "Responsive landing layout with a stronger visual hierarchy.",
      "Dedicated preview space for screenshots or GIF walkthroughs.",
      "Flexible content sections for benefits, features, and CTA copy.",
    ],
  },
  {
    slug: "chronus",
    title: "ChronUs",
    previewFrames: [
      "/images/CreateMeeting_Month.png",
      "/images/CreateMeeting.png",
    ],
    description:
      "An analytics dashboard with reusable charts, responsive cards, and a preview slot for screen recordings or GIFs.",
    fullDescription:
      "A dashboard-style portfolio entry focused on reusable widgets, compact information density, and a dedicated media panel for product motion.",
    previewAlt: "Preview for ChronUs dashboard",
    tags: ["React", "Dashboard", "Data"],
    highlights: [
      "Card-based dashboard components that scale across breakpoints.",
      "Structured preview area for an animated product demo.",
      "Clear metric blocks for showing the impact of the project.",
    ],
  },
  {
    slug: "muze",
    title: "Muze",
    previewFrames: ["/images/muze-1.svg", "/images/muze-2.svg"],
    description:
      "A compact mobile-first concept where animated previews can be swapped in for the final portfolio presentation.",
    fullDescription:
      "A mobile-first product concept with a focus on concise storytelling, strong spacing, and a media region for animated previews or GIFs.",
    previewAlt: "Preview for Muze mobile concept",
    tags: ["Mobile", "Prototype", "Animation"],
    highlights: [
      "Designed to read well on narrow screens and small devices.",
      "Preview region supports GIFs, screenshots, or short clips.",
      "Simple copy structure for describing the app concept.",
    ],
  },
  {
    slug: "stamp",
    title: "Stamp",
    previewFrames: ["/images/stamp_main.png", "/images/stamp-2.svg"],
    description:
      "A compact mobile-first concept where animated previews can be swapped in for the final portfolio presentation.",
    fullDescription:
      "A visual identity and product concept that can be presented with a live screenshot, looping GIF, or static preview frame.",
    previewAlt: "Preview for Stamp concept",
    tags: ["Mobile", "Prototype", "Animation"],
    highlights: [
      "Built as a clean showcase page for quick project scanning.",
      "Supports media-rich presentation with a single card click.",
      "Works as a template for future case-study style entries.",
    ],
  },
];

function getProjectSlugFromHash() {
  if (typeof window === "undefined") {
    return "";
  }

  const hash = window.location.hash.replace(/^#/, "");

  if (!hash.startsWith("project/")) {
    return "";
  }

  return hash.slice("project/".length);
}

function ProjectDetail({ project }) {
  const previewSrc = project.previewFrames?.[0] || project.previewSrc;

  return (
    <section className="project-detail" aria-labelledby="project-title">
      <a className="project-backlink" href="#">
        Back to projects
      </a>

      <div className="project-detail-grid">
        <div className="project-detail-media">
          {previewSrc ? (
            <img
              className="project-detail-image"
              src={previewSrc}
              alt={project.previewAlt || project.title}
            />
          ) : (
            <div className="project-detail-placeholder">
              <span>Add preview image or animated GIF</span>
            </div>
          )}
        </div>

        <div className="project-detail-body">
          <p className="eyebrow">Project detail</p>
          <h1 id="project-title">{project.title}</h1>
          <p className="section-copy">{project.fullDescription}</p>

          <div className="project-tags" aria-label={`${project.title} tags`}>
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>

          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeSlug, setActiveSlug] = useState(getProjectSlugFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSlug(getProjectSlugFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const activeProject = useMemo(
    () => projects.find((project) => project.slug === activeSlug),
    [activeSlug],
  );

  return (
    <div className="app-shell">
      <header className="top-header">
        <a className="brand" href="#" aria-label="Home">
          <img src={logo} alt="Logo" className="brand-logo" />
        </a>
      </header>

      <main className="app-main">
        {activeProject ? (
          <ProjectDetail project={activeProject} />
        ) : (
          <section
            className="projects-section"
            aria-labelledby="projects-heading"
          >
            <div className="projects-intro">
              <p className="eyebrow">Selected work</p>
              <h1 id="projects-heading">Portfolio projects</h1>
              <p className="section-copy">
                Each card includes a dedicated preview area for an image,
                screenshot, or animated GIF.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  href={`#project/${project.slug}`}
                  {...project}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
