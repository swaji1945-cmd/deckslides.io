import Link from "next/link";
import OurWork from "../components/OurWork";
import ReadingRoom from "../components/ReadingRoom";
import { site, mailto } from "@/lib/site";

export default function Home() {
  return (
    <main>
        {/* HERO */}
        <section className="hero">
          <div className="container hero-inner">
            <span className="eyebrow reveal">Premium presentation studio · Est. 2026</span>
            <h1 className="hero-title" data-split>Create presentations that <em>command the room.</em></h1>
            <p className="hero-sub reveal">We design high-impact, investor-ready pitch decks for teams that can’t afford to look average. Built for founders, startups, and executives who already have the story — we turn it into a visual experience that builds trust instantly.</p>
            <div className="hero-cta reveal">
              <a href="#pricing" className="btn btn--primary btn--lg">
                Start your project
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <Link href="/portfolio" className="btn btn--ghost btn--lg">View portfolio</Link>
            </div>
            <div className="hero-meta reveal">
              <div>
                <span className="hero-meta-num">3000+</span>
                <span className="hero-meta-lbl">Decks designed</span>
              </div>
              <div className="hero-meta-divider" aria-hidden="true"></div>
              <div>
                <span className="hero-meta-num">$50M+</span>
                <span className="hero-meta-lbl">Raised by clients</span>
              </div>
              <div className="hero-meta-divider" aria-hidden="true"></div>
              <div>
                <span className="hero-meta-num">48h</span>
                <span className="hero-meta-lbl">First draft turnaround</span>
              </div>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span>Scroll</span>
            <span className="scroll-line"></span>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="trusted">
          <div className="container">
            <p className="trusted-label">Trusted by growing teams worldwide</p>
            <div className="logo-marquee" aria-hidden="true">
              <div className="logo-track">
                <span className="logo-pill">CINEDECK</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">TECHSTARS</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">SPACEMAN</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">MICROSOFT</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">VISA</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">PLAYMOON</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">NOONAN</span>
                <span className="logo-dot">●</span>
                {/* duplicate */}
                <span className="logo-pill">CINEDECK</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">TECHSTARS</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">SPACEMAN</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">MICROSOFT</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">VISA</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">PLAYMOON</span>
                <span className="logo-dot">●</span>
                <span className="logo-pill">NOONAN</span>
                <span className="logo-dot">●</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="what" id="about">
          <div className="container what-grid">
            <div className="what-copy">
              <span className="eyebrow reveal">What we do</span>
              <h2 className="reveal">From raw content to <em>powerful presentations.</em></h2>
              <p className="lead reveal">We don’t write your story.<br />We design it to win.</p>
              <div className="quote-card glass reveal">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>When people are financially invested they want a return. When people are emotionally invested, they want to contribute.</p>
                <span className="quote-author">— Simon Sinek</span>
              </div>
              <a href="#pricing" className="link-arrow reveal">Pricing for content-focused presentations <span aria-hidden="true">→</span></a>
            </div>
            <div className="what-visual reveal">
              <div className="visual-frame">
                <div className="visual-stripes" aria-hidden="true"></div>
                <div className="visual-portrait">
                  <img
                    src="/images/tamara.jpg"
                    alt="Tamara — fintech CX strategy deck"
                    className="visual-portrait-img"
                    data-parallax
                    data-parallax-speed="0.16"
                  />
                  <span className="visual-portrait-glow" aria-hidden="true"></span>
                </div>
                <div className="visual-tag glass">
                  <span className="visual-tag-dot"></span>
                  Tamara · Fintech CX · 2025
                </div>
                <div className="visual-stat glass">
                  <strong>+312%</strong>
                  <small>Investor reply rate</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how" id="services">
          <div className="container how-grid">
            <aside className="how-side glass reveal">
              <span className="eyebrow">Our process</span>
              <h2>How it<br /><em>works?</em></h2>
              <p>A refined process. Built for speed and precision.</p>
              <div className="how-meta">
                <div>
                  <span className="how-meta-num">7d</span>
                  <span className="how-meta-lbl">Average turnaround</span>
                </div>
                <div>
                  <span className="how-meta-num">∞</span>
                  <span className="how-meta-lbl">Iteration rounds</span>
                </div>
              </div>
            </aside>
            <ol className="steps">
              <li className="step reveal">
                <span className="step-num">01</span>
                <div className="step-body">
                  <h3>Discovery</h3>
                  <p>Understanding your goals, audience, and content.</p>
                </div>
                <span className="step-tag">Day 1</span>
              </li>
              <li className="step reveal">
                <span className="step-num">02</span>
                <div className="step-body">
                  <h3>Content review</h3>
                  <p>You bring the narrative — we structure it visually.</p>
                </div>
                <span className="step-tag">Day 1–2</span>
              </li>
              <li className="step reveal">
                <span className="step-num">03</span>
                <div className="step-body">
                  <h3>Design execution</h3>
                  <p>Premium layouts, sharp hierarchy, and refined visuals.</p>
                </div>
                <span className="step-tag">Day 2–5</span>
              </li>
              <li className="step reveal">
                <span className="step-num">04</span>
                <div className="step-body">
                  <h3>Feedback loop</h3>
                  <p>Iterations until everything feels right.</p>
                </div>
                <span className="step-tag">Day 5–6</span>
              </li>
              <li className="step reveal">
                <span className="step-num">05</span>
                <div className="step-body">
                  <h3>Final delivery</h3>
                  <p>Fully editable files + high-resolution exports.</p>
                </div>
                <span className="step-tag">Day 7</span>
              </li>
            </ol>
          </div>
        </section>

        <OurWork />

        {/* RESULTS */}
        <section className="results">
          <div className="container">
            <header className="section-head section-head--center">
              <span className="eyebrow reveal">Results that matter</span>
              <h2 className="reveal">Our decks have helped clients <em>win.</em></h2>
            </header>
            <div className="results-grid">
              <div className="stat-card glass reveal">
                <span className="stat-num" data-counter="3000" data-suffix="+">0+</span>
                <span className="stat-lbl">Decks designed for founders, agencies and Fortune-500 teams.</span>
              </div>
              <div className="stat-card glass reveal">
                <span className="stat-num" data-counter="50" data-prefix="$" data-suffix="M+">$0M+</span>
                <span className="stat-lbl">Capital raised by clients on the back of our decks.</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="pricing" id="pricing">
          <div className="container">
            <header className="section-head section-head--center">
              <span className="eyebrow reveal">Let’s build your pitch</span>
              <h2 className="reveal">Pricing built for <em>every stage.</em></h2>
              <p className="section-sub reveal">Custom quotes available based on scope.</p>
            </header>
            <div className="price-grid">
              <article className="price-card glass reveal">
                <header className="price-head">
                  <span className="price-tag">Full Package</span>
                  <p>Everything you need to start your business, test the concept, and approach investors.</p>
                </header>
                <ul className="price-feats">
                  <li>Logo &amp; brand identity</li>
                  <li>Investor pitch deck</li>
                  <li>Financial model</li>
                  <li>One-page landing site</li>
                </ul>
                <div className="price-foot">
                  <div>
                    <span className="price-from">From</span>
                    <span className="price-num">$5,000</span>
                  </div>
                  <a href={mailto("Full Package inquiry")} className="btn btn--ghost btn--block">Start project</a>
                </div>
              </article>
              <article className="price-card price-card--featured reveal">
                <span className="badge">Most popular</span>
                <div className="price-card-inner glass">
                  <header className="price-head">
                    <span className="price-tag">Investor Deck</span>
                    <p>We dive deep into your business and build a deck that tells your story the right way.</p>
                  </header>
                  <ul className="price-feats">
                    <li>Content &amp; narrative</li>
                    <li>Research &amp; strategy</li>
                    <li>Premium slide design</li>
                    <li>Editable source files</li>
                  </ul>
                  <div className="price-foot">
                    <div>
                      <span className="price-from">From</span>
                      <span className="price-num">$2,000</span>
                    </div>
                    <a href={mailto("Investor Deck inquiry")} className="btn btn--primary btn--block">Start project</a>
                  </div>
                </div>
              </article>
              <article className="price-card glass reveal">
                <header className="price-head">
                  <span className="price-tag">Consultation</span>
                  <p>Detailed feedback and a second opinion from someone who’s seen hundreds of decks.</p>
                </header>
                <ul className="price-feats">
                  <li>Slide-by-slide review</li>
                  <li>Narrative gap analysis</li>
                  <li>Investor-readiness score</li>
                  <li>30-minute live call</li>
                </ul>
                <div className="price-foot">
                  <div>
                    <span className="price-from">From</span>
                    <span className="price-num">$250</span>
                  </div>
                  <a href={mailto("Consultation inquiry")} className="btn btn--ghost btn--block">Book consult</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials" id="testimonials">
          <div className="testi-bg" aria-hidden="true">
            <div className="testi-grid-pattern"></div>
            <div className="testi-glow"></div>
          </div>
          <div className="container">
            <header className="section-head section-head--center">
              <span className="eyebrow reveal">Testimonials</span>
              <h2 className="reveal">What founders <em>say.</em></h2>
              <p className="section-sub reveal">Discover what teams who’ve raised with Pitch Deck say about the process — and the decks that got them there.</p>
            </header>
            <div className="testi-grid">
              <article className="testi-card reveal">
                <div className="testi-head">
                  <span className="avatar avatar--1">JN</span>
                  <div className="testi-id">
                    <strong>Jack Nate</strong>
                    <small>Founder · Linework</small>
                  </div>
                </div>
                <p>Since integrating Pitch Deck into our raise process, we’ve seen a significant lift in investor reply rates and conviction at the first call.</p>
              </article>
              <article className="testi-card testi-card--featured reveal">
                <div className="testi-head">
                  <span className="avatar avatar--2">NC</span>
                  <div className="testi-id">
                    <strong>Nancy Chen</strong>
                    <small>COO · Tamara</small>
                  </div>
                </div>
                <p>I’ve tested several deck studios, but one stands out for its intuitive process and comprehensive understanding of what investors actually look for.</p>
              </article>
              <article className="testi-card reveal">
                <div className="testi-head">
                  <span className="avatar avatar--4">EM</span>
                  <div className="testi-id">
                    <strong>Elena Marsh</strong>
                    <small>Head of Strategy · Revest</small>
                  </div>
                </div>
                <p>Working with Pitch Deck has surpassed our expectations — invaluable narrative and visual support as our business continues to grow.</p>
              </article>
            </div>
          </div>
        </section>

        <ReadingRoom />

        {/* CONTACT */}
        <section className="contact" id="contact">
          <div className="container">
            <nav className="contact-crumb reveal" aria-label="Section">
              <Link href="/">Home</Link>
              <span className="crumb-dot" aria-hidden="true">●</span>
              <span>Contact</span>
            </nav>
            <div className="contact-grid">
              <div className="contact-left">
                <h2 className="contact-title reveal">Let’s work<br /><em>together.</em></h2>
                <form className="contact-form reveal" id="contact-form" noValidate>
                  <div className="contact-row">
                    <div className="field">
                      <label htmlFor="cf-name">Name <span className="req" aria-hidden="true">*</span></label>
                      <input type="text" id="cf-name" name="name" required autoComplete="name" />
                    </div>
                    <div className="field">
                      <label htmlFor="cf-email">Email <span className="req" aria-hidden="true">*</span></label>
                      <input type="email" id="cf-email" name="email" required autoComplete="email" />
                    </div>
                  </div>
                  <div className="field field--full">
                    <label htmlFor="cf-details">Work details</label>
                    <input type="text" id="cf-details" name="details" placeholder="Tell us what kind of deck you need" />
                  </div>
                  <button type="submit" className="btn btn--ghost contact-submit">Submit</button>
                  <p className="contact-status" id="contact-status" aria-live="polite"></p>
                </form>
              </div>
              <div className="contact-right reveal">
                <p className="contact-desc">Tell us about the deck. We reply within 48 hours with a quote, timeline, and a few thoughts on where to start.</p>
                <dl className="contact-meta">
                  <div className="contact-meta-item">
                    <dt>Email</dt>
                    <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
                  </div>
                  <div className="contact-meta-item">
                    <dt>Location</dt>
                    <dd>{site.location}</dd>
                  </div>
                  <div className="contact-meta-item">
                    <dt>Social</dt>
                    <dd className="contact-social">
                      {site.social.instagram && (
                        <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/></svg>
                        </a>
                      )}
                      {site.social.linkedin && (
                        <a href={site.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                      )}
                      {site.social.x && (
                        <a href={site.social.x} aria-label="X" target="_blank" rel="noopener noreferrer">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                      )}
                      <a href={`mailto:${site.email}`} aria-label="Email">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
