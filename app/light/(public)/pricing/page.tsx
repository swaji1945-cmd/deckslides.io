import Link from "next/link";
import type { Metadata } from "next";
import { mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — Pitch Deck",
  description:
    "Transparent pricing for investor pitch decks, full brand packages, and deck consultations. Custom quotes available based on scope.",
};

const tiers = [
  {
    tag: "Consultation",
    blurb: "Detailed feedback and a second opinion from someone who's seen hundreds of decks.",
    price: "$250",
    feats: [
      "Slide-by-slide review",
      "Narrative gap analysis",
      "Investor-readiness score",
      "30-minute live call",
      "Prioritized fix list",
    ],
    cta: "Book consult",
    href: mailto("Consultation inquiry"),
    variant: "ghost" as const,
    featured: false,
  },
  {
    tag: "Investor Deck",
    blurb: "We dive deep into your business and build a deck that tells your story the right way.",
    price: "$2,000",
    feats: [
      "Content & narrative review",
      "Research & strategy",
      "Premium slide design",
      "Two revision rounds",
      "Editable source files",
    ],
    cta: "Start project",
    href: mailto("Investor Deck inquiry"),
    variant: "primary" as const,
    featured: true,
  },
  {
    tag: "Full Package",
    blurb: "Everything you need to start your business, test the concept, and approach investors.",
    price: "$5,000",
    feats: [
      "Logo & brand identity",
      "Investor pitch deck",
      "Financial model template",
      "One-page landing site",
      "Editable source files",
    ],
    cta: "Start project",
    href: mailto("Full Package inquiry"),
    variant: "ghost" as const,
    featured: false,
  },
] as const;

const faqs = [
  {
    q: "How long does a deck typically take?",
    a: "First draft within seven days for the Investor Deck tier. Full Package projects run 10–14 days. Rush turnarounds are available &mdash; ask us when you brief.",
  },
  {
    q: "What software do you deliver in?",
    a: "Keynote, PowerPoint, Google Slides, or Figma. You pick when we kick off. Source files are yours to keep and edit.",
  },
  {
    q: "How many revisions are included?",
    a: "Two structured revision rounds across all tiers. Anything beyond that is billed hourly at our standard rate.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. Send your standard NDA over and we'll counter-sign before kickoff.",
  },
  {
    q: "Can you work with our existing brand?",
    a: "Always. We can pull from a brand book, your existing materials, or design within constraints you set.",
  },
  {
    q: "What if my project doesn't fit any of these tiers?",
    a: "Most projects don't. These are starting points. Brief us on what you need and we'll quote a fixed price within 48 hours.",
  },
];

export default function PricingPage() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">Pricing</span>
          <h1 className="page-hero-title reveal">
            Pricing built for <em>every stage.</em>
          </h1>
          <p className="page-hero-sub reveal">
            Three starting points and a custom quote if none of them fit. Every engagement includes
            two revision rounds, editable source files, and a senior designer end-to-end.
          </p>
        </div>
      </section>

      <section className="pricing-page-grid">
        <div className="container price-grid">
          {tiers.map((t) => {
            const inner = (
              <>
                <header className="price-head">
                  <span className="price-tag">{t.tag}</span>
                  <p>{t.blurb}</p>
                </header>
                <ul className="price-feats">
                  {t.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="price-foot">
                  <div>
                    <span className="price-from">From</span>
                    <span className="price-num">{t.price}</span>
                  </div>
                  <a
                    href={t.href}
                    className={`btn btn--${t.variant === "primary" ? "primary" : "ghost"} btn--block`}
                  >
                    {t.cta}
                  </a>
                </div>
              </>
            );
            return t.featured ? (
              <article key={t.tag} className="price-card price-card--featured reveal">
                <span className="badge">Most popular</span>
                <div className="price-card-inner glass">{inner}</div>
              </article>
            ) : (
              <article key={t.tag} className="price-card glass reveal">
                {inner}
              </article>
            );
          })}
        </div>
      </section>

      <section className="pricing-faq">
        <div className="container">
          <header className="section-head">
            <span className="eyebrow reveal">FAQ</span>
            <h2 className="reveal">Common <em>questions.</em></h2>
          </header>
          <div className="pricing-faq-grid">
            {faqs.map((f) => (
              <div className="pricing-faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="container">
          <h2 className="reveal">Don&rsquo;t see your shape?</h2>
          <p className="section-sub reveal">
            Brief us on the project and we&rsquo;ll come back with a fixed quote and a timeline within 48 hours.
          </p>
          <div className="page-cta-row reveal">
            <Link href="/light/contact" className="btn btn--primary btn--lg">
              Get a custom quote
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/light/portfolio" className="btn btn--ghost btn--lg">See our work</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
