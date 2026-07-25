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
      "An AI-powered training platform that evaluates employee understanding through natural conversations with a virtual avatar.",
    fullDescription:
      "Built independently during my internship at DriveCX, this application uses ChatGPT to simulate conversations with employees after training sessions. Responses are analyzed automatically and summarized for management, replacing manual evaluations with an engaging, scalable assessment workflow.",
    previewAlt: "AI Training Avatar application",
    tags: ["TypeScript", "React", "Node.js", "OpenAI API"],
    highlights: [
      "Built and deployed the application independently.",
      "Automated employee training evaluations using LLMs.",
      "Generated reports for management through an AI workflow.",
    ],
  },

  {
    slug: "chronus",
    title: "ChronUs",
    previewFrames: [
      "/images/CreateMeeting_Month.png",
      "/images/Chronus_mobile.png",
    ],
    description:
      "A collaborative scheduling platform for organizing meetings with large groups.",
    fullDescription:
      "ChronUs helps groups find the best meeting time through an interactive availability interface. Users can create polls, invite participants, receive deadline reminders, and compare schedules across time zones.",
    previewAlt: "ChronUs scheduling platform",
    tags: ["React", "Express", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Interactive availability grid inspired by When2Meet.",
      "Automated email reminders using Nodemailer.",
      "Responsive interface with timezone-aware scheduling.",
    ],
  },

  {
    slug: "muze",
    title: "Muze",
    previewFrames: ["/images/Muze_login.svg", "/images/Muze_proto.svg"],
    description:
      "A music discovery platform powered by community-driven tags and moods.",
    fullDescription:
      "Muze helps users discover music through descriptive tags rather than genres. The application integrates Spotify metadata, supports community-generated tags, and delivers personalized recommendations based on mood and listening preferences.",
    previewAlt: "Muze music discovery app",
    tags: ["React", "Supabase", "Spotify API", "Python"],
    highlights: [
      "Integrated Spotify metadata into a searchable music database.",
      "Designed a scalable tag-based recommendation system.",
      "Built responsive interfaces for exploring and organizing music.",
    ],
  },

  {
    slug: "stamp",
    title: "Stamp",
    previewFrames: ["/images/stamp_main.png", "/images/stamp-2.svg"],
    description:
      "A social platform that gamifies exploring and sharing places.",
    fullDescription:
      "Stamp transforms places into personal stories by allowing users to create digital stamps for the experiences they discover. Each stamp can include photos, songs, local weather, and personal notes, creating a richer memory of the moment. Users can share their experiences with friends, discover new places through others' stories, and build a visual collection of the places that matter to them.",
    previewAlt: "Stamp application",
    tags: ["Figma", "React", "UI/UX", "Prototyping"],
    highlights: [
      "Designed a mobile-first user experience.",
      "Created interactive high-fidelity prototypes.",
      "Focused on intuitive navigation and visual storytelling.",
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
              <span>Sorry! I haven't added visuals yet..</span>
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
              <p className="eyebrow">Selected Work</p>
              <h1 id="projects-heading">Projects I've loved building.</h1>
              <p className="section-copy">
                Every project has a story. Click a card to explore the problem,
                my approach, and what I built.
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
