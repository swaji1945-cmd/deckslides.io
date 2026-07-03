import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Pitch Deck",
  description:
    "Selected pitch decks, investor briefs, and presentations designed by Pitch Deck for founders, startups, and executives across sport, real estate, fintech, and motorsport.",
};

const DECK_PROJECTS = [
  { folderName: "Alively", displayName: "Alively" },
  { folderName: "Impactive", displayName: "Impactive" },
  { folderName: "Outland-creative", displayName: "Outland Creative" },
  { folderName: "Revest", displayName: "Revest" },
  { folderName: "Artura", displayName: "Artura" },
  { folderName: "Barmy-army", displayName: "Barmy Army" },
  { folderName: "Black-sheep-foods", displayName: "Black Sheep Foods" },
  { folderName: "Blank-SIM", displayName: "Blank SIM" },
  { folderName: "Dubai-culture", displayName: "Dubai Culture" },
  { folderName: "Govmaven", displayName: "Govmaven" },
  { folderName: "Gung", displayName: "Gung" },
  { folderName: "Moon-boo-sun", displayName: "Moon Boo Sun" },
  { folderName: "Snow-cell", displayName: "Snow Cell" },
  { folderName: "Sumeria", displayName: "Sumeria" },
  { folderName: "Tamara", displayName: "Tamara" },
  { folderName: "Arctica-home", displayName: "Arctica Home" },
  { folderName: "Skinetix", displayName: "Skinetix" },
  { folderName: "Bahrain-rugby-club", displayName: "Bahrain Rugby Club" },
  { folderName: "Dominique-geroulis", displayName: "Dominique Geroulis" },
  { folderName: "noonan-performance", displayName: "Noonan Performance" },
];

export default function PortfolioIndex() {
  return (
    <main className="work-index">
      <section className="work-hero">
        <div className="container">
          <span className="eyebrow reveal">Portfolio</span>
          <h1 className="work-hero-title reveal">
            Decks that <em>moved the needle.</em>
          </h1>
          <p className="work-hero-sub reveal">
            A working archive of investor briefs, board reports, sponsorship pitches, and CX strategy decks
            we&rsquo;ve designed for founders and operators across sport, real estate, fintech, and motorsport.
          </p>
          <div className="work-hero-meta reveal">
            <div>
              <span className="hero-meta-num">{DECK_PROJECTS.length}</span>
              <span className="hero-meta-lbl">Featured projects</span>
            </div>
            <div className="hero-meta-divider" aria-hidden="true"></div>
            <div>
              <span className="hero-meta-num">3000+</span>
              <span className="hero-meta-lbl">Decks designed</span>
            </div>
            <div className="hero-meta-divider" aria-hidden="true"></div>
            <div>
              <span className="hero-meta-num">$50M+</span>
              <span className="hero-meta-lbl">Raised by clients</span>
            </div>
          </div>
        </div>
      </section>

      <section className="work-year">
        <div className="container">
          <div className="work-grid">
            {DECK_PROJECTS.map((project, idx) => {
              const frameClass = `work-frame--${(idx % 4) + 1}`;
              const href = `/portfolio/${project.folderName}`;
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
                        data-parallax-speed="0.28"
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
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="work-cta">
        <div className="container">
          <h2 className="reveal">Bring us your <em>next deck.</em></h2>
          <p className="section-sub reveal">
            Tell us about the company, the audience, and the moment. We&rsquo;ll come back within 48 hours
            with a quote, a timeline, and a starting structure.
          </p>
          <div className="work-cta-row reveal">
            <Link href="/#pricing" className="btn btn--primary btn--lg">
              Start your project
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/#contact" className="btn btn--ghost btn--lg">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
