"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

/* clou.ch-style "Cases": the whole section PINS (a sticky stage), and the
   cards are driven entirely by scroll. The front card stays full; as you
   scroll it scales DOWN + fades to transparent (recedes behind) while the
   next card rises full-width from below to take its place.
   Markup uses <div>/<span> (no h3/p/li) so the GSAP word-split reveal in
   HomeAnimations doesn't rebuild the cards and break the Link. */

type Project = {
  folderName: string;
  displayName: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  { folderName: "Sumeria",            displayName: "Sumeria",            tags: ["Deep-tech", "Space", "Investor deck"] },
  { folderName: "Tamara",             displayName: "Tamara",             tags: ["Fintech", "CX strategy"] },
  { folderName: "Skinetix",           displayName: "Skinetix",           tags: ["Sports-science", "Platform"] },
  { folderName: "Snow-cell",          displayName: "Snow Cell",          tags: ["Infrastructure", "GPU compute"] },
  { folderName: "Black-sheep-foods",  displayName: "Black Sheep Foods",  tags: ["Food-tech", "Series A"] },
  { folderName: "Govmaven",           displayName: "Govmaven",           tags: ["GovTech", "Marketplace"] },
  { folderName: "Dubai-culture",      displayName: "Dubai Culture",      tags: ["Government", "Culture"] },
  { folderName: "Artura",             displayName: "Artura",             tags: ["Fintech", "Web3"] },
  { folderName: "Revest",             displayName: "Revest",             tags: ["Real estate", "Series B"] },
  { folderName: "noonan-performance", displayName: "Noonan Performance", tags: ["Motorsport", "Sponsorship"] },
  { folderName: "Bahrain-rugby-club", displayName: "Bahrain Rugby Club", tags: ["Sport", "Annual report"] },
  { folderName: "Barmy-army",         displayName: "Barmy Army",         tags: ["Sport", "Sponsorship"] },
  { folderName: "Gung",               displayName: "Gung",               tags: ["Consumer", "Retail"] },
  { folderName: "Moon-boo-sun",       displayName: "Moon Boo Sun",       tags: ["Beverage", "Branding"] },
  { folderName: "Blank-SIM",          displayName: "Blank SIM",          tags: ["Telecom", "Product"] },
  { folderName: "Arctica-home",       displayName: "Arctica Home",       tags: ["Real estate", "Interior"] },
  { folderName: "Alively",            displayName: "Alively",            tags: ["Health", "Branding"] },
  { folderName: "Impactive",          displayName: "Impactive",          tags: ["Nonprofit", "Strategy"] },
  { folderName: "Outland-creative",   displayName: "Outland Creative",   tags: ["Creative", "Branding"] },
  { folderName: "Dominique-geroulis", displayName: "Dominique Geroulis", tags: ["Personal brand", "Identity"] },
];

// rotating deep, on-brand backgrounds (dark emerald family — not bright)
const THEMES = [
  "linear-gradient(155deg, #0f2c23 0%, #091c17 100%)",
  "linear-gradient(155deg, #0b2730 0%, #08171c 100%)",
  "linear-gradient(155deg, #182216 0%, #0d130b 100%)",
  "linear-gradient(155deg, #131c24 0%, #0b1015 100%)",
  "linear-gradient(155deg, #122a2a 0%, #0a1817 100%)",
];

export default function PortfolioStack() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pstack-card"));
    const n = cards.length;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const total = root.offsetHeight - vh;          // scroll distance while the stage is pinned
      const scrolled = Math.min(Math.max(-root.getBoundingClientRect().top, 0), total);
      const p = total > 0 ? (scrolled / total) * (n - 1) : 0; // 0 .. n-1 (which card is at the front)

      for (let i = 0; i < n; i++) {
        const card = cards[i];
        const d = p - i; // >0 this card has been passed (receding), <0 still below (rising)
        let ty: number, sc: number, op: number;

        if (d >= 0) {
          // receding: stays in place, scales down + fades to transparent behind
          const k = Math.min(d, 1);
          ty = 0;
          sc = 1 - k * 0.22;
          op = d > 1 ? 0 : 1 - k;
        } else {
          // rising from below at full size; cards still far below are hidden
          const k = Math.min(-d, 1);
          ty = k * 105;
          sc = 1;
          op = d <= -1 ? 0 : 1;
        }

        card.style.transform = `translateY(${ty.toFixed(2)}%) scale(${sc.toFixed(3)})`;
        card.style.opacity = op.toFixed(3);
        card.style.zIndex = String(i);
        // only the front-most card is clickable
        card.style.pointerEvents = d > -0.5 && d < 0.5 ? "auto" : "none";
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pstack"
      ref={rootRef}
      style={{ height: `${(PROJECTS.length + 1) * 100}vh` }}
    >
      <div className="pstack-stage">
        <div className="pstack-track">
          {PROJECTS.map((p, idx) => (
            <Link
              href={`/portfolio/${p.folderName}`}
              key={p.folderName}
              className="pstack-card"
              style={{ ["--card-bg" as string]: THEMES[idx % THEMES.length] }}
              aria-label={`${p.displayName} case study`}
            >
              <img
                className="pstack-img"
                src={`/${p.folderName}/1.svg`}
                alt={`${p.displayName} deck cover`}
                loading="lazy"
                draggable={false}
              />
              <span className="pstack-scrim" aria-hidden="true" />

              <div className="pstack-head">
                <div className="pstack-titlewrap">
                  <span className="pstack-index">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="pstack-title">{p.displayName}</span>
                </div>
                <div className="pstack-tags">
                  {p.tags.map((t) => (
                    <span className="pstack-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <span className="pstack-view" aria-hidden="true">
                View case study <span className="pstack-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
