import Link from "next/link";

const DECK_PROJECTS = [
  { folderName: "Alively",         displayName: "Alively"          },
  { folderName: "Impactive",       displayName: "Impactive"        },
  { folderName: "Outland-creative",displayName: "Outland Creative" },
  { folderName: "Revest",          displayName: "Revest"           },
];

export default function OurWork() {
  return (
    <section className="work" id="work">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow reveal">Our work</span>
          <h2>Decks that <em>moved the needle.</em></h2>
          <p className="section-sub reveal">A small selection from the past twelve months.</p>
        </header>

        <div className="work-grid">
          {DECK_PROJECTS.map((project, idx) => {
            const frameClass = `work-frame--${(idx % 4) + 1}`;
            const href       = `/portfolio/${project.folderName}`;
            return (
              <article className="work-card reveal" key={project.folderName}>
                <Link
                  href={href}
                  className={`work-frame ${frameClass}`}
                  aria-label={`${project.displayName} case study`}
                >
                  <div className="work-image">
                    <img
                      src={`/${project.folderName}/1.svg`}
                      alt={`${project.displayName} cover`}
                      loading="lazy"
                      data-parallax
                      data-parallax-speed="0.25"
                    />
                  </div>
                  <span className="work-cover-tag">View case</span>
                </Link>
                <div className="work-meta-row">
                  <div className="work-meta-text">
                    <h3>{project.displayName}</h3>
                  </div>
                  <Link
                    href={href}
                    className="work-arrow"
                    aria-label={`Open ${project.displayName} case study`}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="work-actions reveal">
          <a href="#pricing" className="btn btn--primary">
            Start your project <span aria-hidden="true">→</span>
          </a>
          <Link href="/portfolio" className="btn btn--ghost">View full portfolio</Link>
        </div>
      </div>
    </section>
  );
}
