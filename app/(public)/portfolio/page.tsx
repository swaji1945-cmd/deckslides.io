import Link from "next/link";
import type { Metadata } from "next";
import PortfolioStack from "../../components/PortfolioStack";

export const metadata: Metadata = {
  title: "Portfolio — Pitch Deck",
  description:
    "Selected pitch decks, investor briefs, and presentations designed by Pitch Deck for founders, startups, and executives across sport, real estate, fintech, and motorsport.",
};

const PROJECT_COUNT = 20;

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
              <span className="hero-meta-num">{PROJECT_COUNT}</span>
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

      <section className="work-cases">
        <div className="container">
          <header className="work-cases-head">
            <span className="eyebrow reveal">Cases</span>
            <h2 className="reveal">Projects we&rsquo;re <em>proud of.</em></h2>
            <p className="section-sub reveal">
              Substantial engagements — designed and communicated with intent. Scroll to move through each case.
            </p>
          </header>
          <PortfolioStack />
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
