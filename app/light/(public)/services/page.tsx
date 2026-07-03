import Link from "next/link";
import type { Metadata } from "next";
import { mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Pitch Deck",
  description:
    "Investor pitch decks, full brand packages, deck consultations, and bespoke board reports. Premium presentation design for teams that can't afford to look average.",
};

const services = [
  {
    tag: "01",
    title: "Investor pitch decks",
    blurb:
      "End-to-end design for the deck that will close your round. We work from your raw content, sharpen the narrative, and deliver a fully editable deck plus high-resolution exports.",
    bullets: [
      "Slide-by-slide narrative review",
      "Premium layouts, type, and motion",
      "Source files (Keynote, PowerPoint, or Figma)",
      "Two rounds of revisions",
    ],
    cta: "Brief us on a deck",
    href: mailto("Investor Deck inquiry"),
  },
  {
    tag: "02",
    title: "Full brand + deck package",
    blurb:
      "For founders starting from scratch. Logo and identity, investor pitch deck, simple financial model, and a one-page landing site &mdash; everything you need to look credible from day one.",
    bullets: [
      "Logo and brand identity system",
      "Investor pitch deck",
      "Financial model template",
      "One-page landing site",
    ],
    cta: "Discuss the package",
    href: mailto("Full Package inquiry"),
  },
  {
    tag: "03",
    title: "Deck consultation",
    blurb:
      "Already have a deck? We&rsquo;ll review it slide by slide, score its investor-readiness, identify the leaks, and hand you a prioritized fix list in a 30-minute live call.",
    bullets: [
      "Slide-by-slide review",
      "Narrative gap analysis",
      "Investor-readiness score",
      "30-minute live call",
    ],
    cta: "Book a consult",
    href: mailto("Consultation inquiry"),
  },
  {
    tag: "04",
    title: "Board reports + AGM decks",
    blurb:
      "Quarterly board updates, annual general meeting decks, and exec-level operating reviews. Less investor-pitch energy, more institutional clarity.",
    bullets: [
      "Quarterly board update templates",
      "AGM and town hall decks",
      "Operating review presentations",
      "Reusable component libraries",
    ],
    cta: "Talk to us",
    href: mailto("Board / AGM deck inquiry"),
  },
] as const;

const process = [
  { day: "Day 1", title: "Discovery", body: "We unpack your goals, audience, and content in a 45-minute call." },
  { day: "Day 1–2", title: "Content review", body: "You bring the narrative; we structure it visually and flag gaps." },
  { day: "Day 2–5", title: "Design execution", body: "Premium layouts, sharp hierarchy, refined visuals." },
  { day: "Day 5–6", title: "Feedback loop", body: "Two structured revision rounds until everything feels right." },
  { day: "Day 7", title: "Final delivery", body: "Fully editable source files plus high-resolution exports." },
];

export default function ServicesPage() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">Services</span>
          <h1 className="page-hero-title reveal">
            From raw content to <em>powerful presentations.</em>
          </h1>
          <p className="page-hero-sub reveal">
            Four ways we work with founders and operators &mdash; from a 30-minute deck review to a full brand package.
          </p>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container services-grid">
          {services.map((s) => (
            <article key={s.tag} className="services-card glass reveal">
              <header className="services-card-head">
                <span className="services-card-num">{s.tag}</span>
                <h2 className="services-card-title">{s.title}</h2>
              </header>
              <p className="services-card-blurb" dangerouslySetInnerHTML={{ __html: s.blurb }} />
              <ul className="services-card-list">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <a href={s.href} className="link-arrow services-card-cta">
                {s.cta} <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="services-process">
        <div className="container">
          <header className="section-head section-head--center">
            <span className="eyebrow reveal">Our process</span>
            <h2 className="reveal">How it <em>works.</em></h2>
            <p className="section-sub reveal">A refined process. Built for speed and precision.</p>
          </header>
          <ol className="services-process-list">
            {process.map((p, i) => (
              <li key={p.title} className="services-process-step reveal">
                <span className="services-process-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="services-process-body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
                <span className="services-process-day">{p.day}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-cta">
        <div className="container">
          <h2 className="reveal">Pick a starting point.</h2>
          <p className="section-sub reveal">
            See pricing for each service or send us the company and the moment &mdash; we&rsquo;ll come back with a quote.
          </p>
          <div className="page-cta-row reveal">
            <Link href="/light/pricing" className="btn btn--primary btn--lg">
              See pricing
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/light/contact" className="btn btn--ghost btn--lg">Get in touch</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
