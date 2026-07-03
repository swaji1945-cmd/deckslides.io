import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Pitch Deck",
  description:
    "Tell us about the deck. We reply within 48 hours with a quote, a timeline, and a few thoughts on where to start.",
};

export default function ContactPage() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">Contact</span>
          <h1 className="page-hero-title reveal">
            Let&rsquo;s work <em>together.</em>
          </h1>
          <p className="page-hero-sub reveal">
            Tell us about the company, the audience, and the moment. We reply within 48 hours with a
            quote, a timeline, and a few thoughts on where to start.
          </p>
        </div>
      </section>

      <section className="contact" id="contact" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
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
                <button type="submit" className="btn btn--primary contact-submit">Submit</button>
                <p className="contact-status" id="contact-status" aria-live="polite"></p>
              </form>
            </div>
            <div className="contact-right reveal">
              <p className="contact-desc">
                Prefer email? Drop us a line directly &mdash; we read every message.
              </p>
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
                  <dt>Response time</dt>
                  <dd>Within 48 hours, including weekends</dd>
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
