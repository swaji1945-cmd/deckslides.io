import Link from "next/link";
import ReadingRoom from "../components/ReadingRoom";
import VisualCarousel from "../components/VisualCarousel";
import PortfolioSlider from "../components/PortfolioSlider";
import TestimonialsReveal from "../components/TestimonialsReveal";
import CubeServices from "../components/CubeServices";
import PricingSlider from "../components/PricingSlider";
import HeroCanvas from "../components/HeroCanvas";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main>
        {/* HERO */}
        <section className="hero">
          <HeroCanvas />
          <div className="container hero-inner">
            <span className="eyebrow hero-eyebrow reveal">Premium presentation studio · Est. 2026</span>
            <h1 className="hero-title" data-split>Create presentations that <em>command the room.</em></h1>
            <p className="hero-sub reveal">We design high-impact, investor-ready pitch decks for teams that can’t afford to look average. Built for founders, startups, and executives who already have the story — we turn it into a visual experience that builds trust instantly.</p>
            <div className="hero-cta reveal">
              <a href="#pricing" className="btn btn--primary btn--lg">
                Start your project
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <Link href="/light/portfolio" className="btn btn--ghost btn--lg">View portfolio</Link>
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

        {/* STATS BAND */}
        <section className="stat-band">
          <div className="container stat-band-grid">
            <div className="stat-band-item reveal">
              <span className="stat-band-num">3000+</span>
              <span className="stat-band-lbl">Decks designed</span>
            </div>
            <div className="stat-band-divider" aria-hidden="true"></div>
            <div className="stat-band-item reveal">
              <span className="stat-band-num">$50M+</span>
              <span className="stat-band-lbl">Raised by clients</span>
            </div>
            <div className="stat-band-divider" aria-hidden="true"></div>
            <div className="stat-band-item reveal">
              <span className="stat-band-num">48h</span>
              <span className="stat-band-lbl">First draft turnaround</span>
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
              <VisualCarousel />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how" id="services">
          <div className="container">
            <header className="section-head section-head--center reveal">
              <span className="eyebrow">Our process</span>
              <h2>How it <em>works?</em></h2>
              <p className="section-sub">A refined process — built for speed and precision. Hover each step.</p>
            </header>

            <ul className="how-stack">
              <li className="how-item how-item--left">
                <div className="how-title"><span className="how-num">01</span>Discovery</div>
                <div className="how-desc">Understanding your goals, audience, and content.</div>
              </li>
              <li className="how-item how-item--right">
                <div className="how-title"><span className="how-num">02</span>Content review</div>
                <div className="how-desc">You bring the narrative — we structure it visually.</div>
              </li>
              <li className="how-item how-item--center">
                <div className="how-title"><span className="how-num">03</span>Design execution</div>
                <div className="how-desc">Premium layouts, sharp hierarchy, and refined visuals.</div>
              </li>
              <li className="how-item how-item--left">
                <div className="how-title"><span className="how-num">04</span>Feedback loop</div>
                <div className="how-desc">Iterations until everything feels right.</div>
              </li>
              <li className="how-item how-item--right">
                <div className="how-title"><span className="how-num">05</span>Final delivery</div>
                <div className="how-desc">Fully editable files + high-resolution exports.</div>
              </li>
            </ul>
          </div>
        </section>

        <PortfolioSlider />

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
            <PricingSlider />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <TestimonialsReveal />

        <CubeServices />

        <ReadingRoom />

        {/* CONTACT */}
        <section className="contact" id="contact">
          <div className="container">
            <nav className="contact-crumb reveal" aria-label="Section">
              <Link href="/light">Home</Link>
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
