import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Pitch Deck",
  description:
    "Pitch Deck is a presentation studio for founders, startups, and executives. We turn raw stories into investor-ready decks that close rounds and command rooms.",
};

export default function AboutPage() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">About the studio</span>
          <h1 className="page-hero-title reveal">
            We design <em>belief.</em>
          </h1>
          <p className="page-hero-sub reveal">
            Pitch Deck is a presentation studio for founders, startups, and executives. We don&rsquo;t write
            your story &mdash; we turn it into a visual experience that makes investors lean in by slide two.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container page-body-grid">
          <div className="page-body-aside">
            <span className="eyebrow">Studio note</span>
          </div>
          <div className="page-body-prose">
            <p>
              Most decks fail not because the business is bad, but because the deck buries the business.
              We exist for the moment a founder has the right answer and the wrong slide. Our job is to make
              the slide as clear, as confident, and as inevitable as the answer already is.
            </p>
            <p>
              Three thousand decks in, the pattern is consistent: clear thinking visible at thumbnail size beats
              clever design every single time. We&rsquo;ve seen seed rounds close on twelve clean slides and Series B
              briefs collapse under the weight of forty cluttered ones. The deck is the product. The product is the bet.
            </p>
            <h2>How we think</h2>
            <p>
              Every project starts with three questions: who is the audience, what do they need to feel by the
              end of the deck, and what is the single most surprising thing we can lead with? The answers become
              the spine of the design. Everything else &mdash; layout, type, color, hierarchy &mdash; follows that spine.
            </p>
            <p>
              We are biased toward fewer slides, fewer words, larger images, and bolder headlines. We resist the urge
              to fill space. We hold the line on whitespace. Confidence reads as quiet, not loud.
            </p>
            <h2>Who we work with</h2>
            <p>
              Founders raising their first round. Operators preparing for a board. Heads of strategy presenting to
              the C-suite. Studios reselling our work to their own clients. We&rsquo;ve designed AGM decks for sport
              clubs and Series B briefs for fintech platforms in the same week. The thread is the same: a real
              audience, a real outcome on the line, no patience for filler.
            </p>
            <h2>The team</h2>
            <p>
              We&rsquo;re a small senior team &mdash; founders, designers, and copy strategists &mdash; who have spent
              the last decade inside venture, growth, and creative shops. No juniors on first drafts. No outsourced
              slide farms. The person who designs your deck is the person who reviews it the night before you send it.
            </p>
          </div>
        </div>
      </section>

      <section className="page-stats">
        <div className="container page-stats-grid">
          <div>
            <span className="page-stat-num">3000+</span>
            <span className="page-stat-lbl">Decks designed for founders, agencies, and Fortune-500 teams</span>
          </div>
          <div>
            <span className="page-stat-num">$50M+</span>
            <span className="page-stat-lbl">Capital raised by clients on the back of our work</span>
          </div>
          <div>
            <span className="page-stat-num">48h</span>
            <span className="page-stat-lbl">First-draft turnaround on most engagements</span>
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="container">
          <h2 className="reveal">Bring us your <em>next deck.</em></h2>
          <p className="section-sub reveal">
            Tell us about the company, the audience, and the moment. We reply within 48 hours.
          </p>
          <div className="page-cta-row reveal">
            <Link href="/pricing" className="btn btn--primary btn--lg">
              See pricing
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="btn btn--ghost btn--lg">Get in touch</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
