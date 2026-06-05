"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const SLIDES = [
  {
    title: "REVEST",
    body: "INVESTOR BRIEF FOR A DUBAI-BASED\nREAL-ESTATE PLATFORM RAISING\nSERIES B — DESIGNED TO TURN\nINSTITUTIONAL SKEPTICS INTO\nFULL-CONVICTION BELIEVERS.",
    img:   "/Revest/10.svg",   // full-width background
    thumb: "/Revest/5.svg",    // panel thumbnail
    href:  "/portfolio/Revest",
  },
  {
    title: "TAMARA",
    body: "FROM TRANSACTIONS TO\nRELATIONSHIPS — ELEVATING\nTAMARA'S CX STRATEGY FOR THE\nMENA REGION'S FASTEST-GROWING\nFINTECH PLATFORM.",
    img:   "/Tamara/5.svg",    // full-width background
    thumb: "/Tamara/2.svg",    // panel thumbnail
    href:  "/portfolio/Tamara",
  },
  {
    title: "ALIVELY",
    body: "SCIENCE-BACKED LONGEVITY\nSTARTUP ENTERING SERIES A —\nA DECK ENGINEERED TO COMMAND\nPREMIUM VALUATIONS AND FULL-\nROOM INVESTOR CONVICTION.",
    img:   "/Alively/2.svg",   // full-width background (lifestyle photos)
    thumb: "/Alively/7.svg",   // panel thumbnail (phone mockup)
    href:  "/portfolio/Alively",
  },
];

const CIRC = 2 * Math.PI * 125;

export default function PortfolioSlider() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const arcRef     = useRef<SVGCircleElement>(null);
  const cCurRef    = useRef<HTMLSpanElement>(null);
  const bgRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const slideRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const plRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const hdotRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // Expose goTo so clicks can trigger it
  const goToRef = useRef<(idx: number) => void>(() => {});

  useEffect(() => {
    let cur = 0;
    let raf = 0;

    function setArc(p: number) {
      if (arcRef.current)
        arcRef.current.style.strokeDashoffset = (CIRC * (1 - Math.max(0, Math.min(1, p)))).toFixed(2);
    }

    function goTo(idx: number) {
      if (idx === cur) return;
      const prev = cur;

      bgRefs.current[prev]?.classList.remove("ps-bg--active");
      slideRefs.current[prev]?.classList.remove("ps-slide--active");
      plRefs.current[prev]?.classList.remove("ps-pl--active");
      hdotRefs.current[prev]?.classList.remove("ps-hdot--active");

      if (idx > prev) {
        plRefs.current[prev]?.classList.add("ps-pl--done");
      } else {
        for (let i = idx + 1; i <= prev; i++) {
          plRefs.current[i]?.classList.remove("ps-pl--done", "ps-pl--active");
          hdotRefs.current[i]?.classList.remove("ps-hdot--active");
        }
      }

      cur = idx;
      bgRefs.current[cur]?.classList.add("ps-bg--active");
      slideRefs.current[cur]?.classList.add("ps-slide--active");
      plRefs.current[cur]?.classList.remove("ps-pl--done");
      plRefs.current[cur]?.classList.add("ps-pl--active");
      hdotRefs.current[cur]?.classList.add("ps-hdot--active");
      if (cCurRef.current) cCurRef.current.textContent = `[0${cur + 1}]`;
    }

    goToRef.current = (idx: number) => {
      if (!outerRef.current) return;
      const vh = window.innerHeight;
      const outerTop = outerRef.current.getBoundingClientRect().top + window.scrollY;
      const targets = [0.2, 0.65, 1.1];
      window.scrollTo({ top: outerTop + targets[idx] * vh, behavior: "smooth" });
    };

    function update() {
      raf = 0;
      if (!outerRef.current) return;
      const progress = -outerRef.current.getBoundingClientRect().top / window.innerHeight;
      setArc(progress / 1.4);
      const idx = progress < 0.4 ? 0 : progress < 0.9 ? 1 : 2;
      goTo(idx);
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    setArc(0);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={outerRef} className="ps-outer">
      <div className="ps-frame">

        {/* Background slides */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            ref={(el) => { bgRefs.current[i] = el; }}
            className={`ps-bg${i === 0 ? " ps-bg--active" : ""}`}
            style={{ backgroundImage: `url('${s.img}')` }}
          />
        ))}

        {/* Film-grain overlay */}
        <div className="ps-grain" />

        {/* SVG circle with arc progress */}
        <div className="ps-circle">
          <svg viewBox="0 0 270 270" xmlns="http://www.w3.org/2000/svg">
            <circle cx="135" cy="135" r="125" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" strokeDasharray="5 14"/>
            <circle cx="135" cy="135" r="125" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth=".6"/>
            <circle
              ref={arcRef}
              cx="135" cy="135" r="125"
              fill="none"
              stroke="var(--e-400)"
              strokeWidth="2"
              strokeLinecap="butt"
              style={{
                strokeDasharray: `${CIRC} ${CIRC}`,
                strokeDashoffset: CIRC,
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                transition: "stroke-dashoffset 0.4s ease",
              }}
            />
            <line x1="135" y1="0"   x2="135" y2="20"  stroke="rgba(255,255,255,.85)" strokeWidth="1.4"/>
            <line x1="135" y1="250" x2="135" y2="270" stroke="rgba(255,255,255,.85)" strokeWidth="1.4"/>
            <line x1="0"   y1="135" x2="20"  y2="135" stroke="rgba(255,255,255,.85)" strokeWidth="1.4"/>
            <line x1="250" y1="135" x2="270" y2="135" stroke="rgba(255,255,255,.85)" strokeWidth="1.4"/>
          </svg>
          <div className="ps-cross-v" />
          <div className="ps-cross-h" />
          <div className="ps-cross-dot" />
          <div className="ps-counter-lbl">
            <span ref={cCurRef} className="ps-cc">[01]</span>
            <span className="ps-cs">/</span>
            <span className="ps-ct">[03]</span>
          </div>
          <div className="ps-scroll-lbl">SCROLL</div>
        </div>

        {/* Bottom section label */}
        <div className="ps-bottom-label">
          <span className="ps-eyebrow">Our work</span>
          <div className="ps-heading">CASE<br />STUDIES</div>
        </div>

        {/* Vertical progress bars */}
        <div className="ps-progs">
          {SLIDES.map((_, i) => (
            <div key={i} ref={(el) => { plRefs.current[i] = el; }} className={`ps-pl${i === 0 ? " ps-pl--active" : ""}`}>
              <div className="ps-pl-fill" />
            </div>
          ))}
        </div>

        {/* Right frosted-glass panel */}
        <div className="ps-panel">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { slideRefs.current[i] = el; }}
              className={`ps-slide${i === 0 ? " ps-slide--active" : ""}`}
              onClick={() => goToRef.current(i)}
            >
              <div className="ps-slide-idx">[0{i + 1}]</div>
              <div className="ps-slide-title">{s.title}</div>
              <div className="ps-slide-body">
                {s.body.split("\n").map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </div>
              <Link
                href={s.href}
                className="ps-slide-img"
                style={{ backgroundImage: `url('${s.thumb}')` }}
                aria-label={`Open ${s.title} case study`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="ps-slide-view">View case study <span aria-hidden="true">→</span></span>
              </Link>
            </div>
          ))}
        </div>

        {/* Small hint dots */}
        <div className="ps-hdots">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { hdotRefs.current[i] = el; }}
              className={`ps-hdot${i === 0 ? " ps-hdot--active" : ""}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
