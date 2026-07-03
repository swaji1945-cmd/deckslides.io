"use client";
import { useEffect, useRef } from "react";

/* Testimonial boxes scattered at the corners that parallax-move on scroll,
   with a big "WHAT FOUNDERS SAY" reveal in the centre. */
const QUOTES = [
  {
    pos: "tl", speed: -360, initials: "JN", avatar: "avatar--1",
    name: "Jack Nate", role: "Founder · Linework",
    quote: "Since bringing deckslides into our raise, investor reply rates and first-call conviction jumped noticeably.",
  },
  {
    pos: "tr", speed: 300, initials: "NC", avatar: "avatar--2",
    name: "Nancy Chen", role: "COO · Tamara",
    quote: "I've tested several deck studios — this one stands out for its process and grasp of what investors actually look for.",
  },
  {
    pos: "bl", speed: 420, initials: "MR", avatar: "avatar--3",
    name: "Marcus Reed", role: "CEO · Arctica",
    quote: "We walked into our Series A with a deck that did half the talking. Three term sheets in two weeks.",
  },
  {
    pos: "br", speed: -270, initials: "EM", avatar: "avatar--4",
    name: "Elena Marsh", role: "Head of Strategy · Revest",
    quote: "Working with deckslides surpassed our expectations — invaluable narrative and visual support as we scaled.",
  },
];

const TEXT = (
  <>
    WHAT<br />
    FOUNDERS<br />
    SAY.
  </>
);

export default function TestimonialsReveal() {
  const sectionRef  = useRef<HTMLElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const revealedRef = useRef<HTMLDivElement>(null);
  const boxRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const wrap = wrapRef.current;
      const revealed = revealedRef.current;
      if (!section || !wrap || !revealed) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // center text reveal (clip up as the section scrolls through)
      const wRect = wrap.getBoundingClientRect();
      const start = vh;
      const end = -wRect.height;
      const ratio = 1 - Math.min(1, Math.max(0, (wRect.top - end) / (start - end)));
      revealed.style.clipPath = `inset(0 0 ${(1 - ratio) * 100}% 0)`;

      // box parallax
      const progress = (vh - rect.top) / (vh + rect.height);
      boxRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = QUOTES[i].speed * (progress - 0.5);
        el.style.transform = `translateY(${offset.toFixed(1)}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="tr-section" id="testimonials">
      <span className="tr-eyebrow">Testimonials</span>

      {QUOTES.map((q, i) => (
        <div
          key={q.pos}
          ref={(el) => { boxRefs.current[i] = el; }}
          className={`tr-box tr-box--${q.pos}`}
        >
          <div className="tr-box-head">
            <span className={`avatar ${q.avatar}`}>{q.initials}</span>
            <div className="tr-box-id">
              <strong>{q.name}</strong>
              <small>{q.role}</small>
            </div>
          </div>
          <p>{q.quote}</p>
        </div>
      ))}

      <div ref={wrapRef} className="tr-wrap">
        <div className="tr-text tr-text--ghost">{TEXT}</div>
        <div
          ref={revealedRef}
          className="tr-text tr-text--solid"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          {TEXT}
        </div>
      </div>
    </section>
  );
}
