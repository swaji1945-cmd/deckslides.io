import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/cream" className="logo" aria-label="pitchdeck home">
              <img src="/images/logo-light.svg" alt="pitchdeck" className="logo-img logo-img--lg" width={200} height={40} />
            </Link>
            <p>Premium presentation design for founders who can’t afford to look average.</p>
            <a href={`mailto:${site.email}`} className="footer-email">{site.email}</a>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Studio</h4>
              <Link href="/light/about">About</Link>
              <Link href="/light/services">Services</Link>
              <Link href="/light/pricing">Pricing</Link>
              <Link href="/light/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <h4>Work</h4>
              <Link href="/light/portfolio">Portfolio</Link>
              <Link href="/light/blog">Reading room</Link>
              <Link href="/cream/#testimonials">Testimonials</Link>
            </div>
            <div className="footer-col">
              <h4>Social</h4>
              {site.social.instagram && (
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              )}
              {site.social.linkedin && (
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              )}
              {site.social.x && (
                <a href={site.social.x} target="_blank" rel="noopener noreferrer">X / Twitter</a>
              )}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Pitch Deck. Crafted for impact.</span>
          <span>Designed by Maham Shahab.</span>
        </div>
      </div>
    </footer>
  );
}
