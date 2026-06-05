"use client";
import { useState, useEffect, useRef } from "react";
import { mailto } from "@/lib/site";

type Plan = {
  tag: string;
  blurb: string;
  feats: string[];
  from: string;
  price: string;
  cta: string;
  ctaLabel: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    tag: "Full Package",
    blurb: "Everything you need to start your business, test the concept, and approach investors.",
    feats: ["Logo & brand identity", "Investor pitch deck", "Financial model", "One-page landing site"],
    from: "From",
    price: "$5,000",
    cta: mailto("Full Package inquiry"),
    ctaLabel: "Start project",
  },
  {
    tag: "Investor Deck",
    blurb: "We dive deep into your business and build a deck that tells your story the right way.",
    feats: ["Content & narrative", "Research & strategy", "Premium slide design", "Editable source files"],
    from: "From",
    price: "$2,000",
    cta: mailto("Investor Deck inquiry"),
    ctaLabel: "Start project",
    featured: true,
  },
  {
    tag: "Consultation",
    blurb: "Detailed feedback and a second opinion from someone who's seen hundreds of decks.",
    feats: ["Slide-by-slide review", "Narrative gap analysis", "Investor-readiness score", "30-minute live call"],
    from: "From",
    price: "$250",
    cta: mailto("Consultation inquiry"),
    ctaLabel: "Book consult",
  },
];

const N = PLANS.length;

export default function PricingSlider() {
  // Start with the featured (Investor Deck) in the centre
  const [active, setActive] = useState(1);
  const pausedRef = useRef(false);

  // Auto-advance every 3.5s, pause on hover
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % N);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Wrapped offset in range [-1, 0, 1] for a 3-card coverflow
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  return (
    <div
      className="pf"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="pf-stage">
        {PLANS.map((p, i) => {
          const off = offsetOf(i);
          const cls =
            off === 0 ? "pf-card pf-card--active"
            : off === -1 ? "pf-card pf-card--prev"
            : off === 1 ? "pf-card pf-card--next"
            : "pf-card pf-card--hidden";
          return (
            <article
              key={p.tag}
              className={`${cls}${p.featured ? " pf-card--featured" : ""}`}
              onClick={() => off !== 0 && setActive(i)}
              aria-hidden={off !== 0}
            >
              {p.featured && <span className="pf-badge">Most popular</span>}
              <div className="pf-card-inner">
                <header className="pf-head">
                  <span className="pf-tag">{p.tag}</span>
                  <p>{p.blurb}</p>
                </header>
                <ul className="pf-feats">
                  {p.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="pf-foot">
                  <div>
                    <span className="pf-from">{p.from}</span>
                    <span className="pf-price">{p.price}</span>
                  </div>
                  <a
                    href={p.cta}
                    className={`btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block`}
                    tabIndex={off === 0 ? 0 : -1}
                  >
                    {p.ctaLabel}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
