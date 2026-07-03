"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Remove CSS transition before GSAP takes ownership ───────────────── */
function noTransition(els: HTMLElement | HTMLElement[]) {
  (Array.isArray(els) ? els : [els]).forEach(el =>
    el.style.setProperty("transition", "none")
  );
}

/* ── Flat word splitter — no overflow clip, just inline spans ───────────
   Used for body text (p, li, etc.) to apply the scroll colour reveal
   without breaking paragraph layout.                                    */
function splitWordsFlat(el: HTMLElement): HTMLElement[] {
  const spans: HTMLElement[] = [];
  const walk = (node: Node, out: DocumentFragment | Element) => {
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        (child.textContent ?? "").split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            out.appendChild(document.createTextNode(part));
          } else {
            const s = document.createElement("span");
            s.className = "word-dim";
            s.textContent = part;
            out.appendChild(s);
            spans.push(s);
          }
        });
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // Keep child elements (em, a, strong…) completely intact
        out.appendChild((child as Element).cloneNode(true));
      }
    });
  };
  const frag = document.createDocumentFragment();
  walk(el, frag);
  el.innerHTML = "";
  el.appendChild(frag);
  return spans;
}

/* ── Split el's text into .line-mask > .line-inner word spans ───────────
   Void elements (<br>, <img>) are kept as-is.
   Inline wrappers (<em>, <strong>, <i>, <b>) have their words split
   individually — each word gets its own .line-mask > .line-inner > <tag>.
   Returns every .line-inner so GSAP can animate them.                   */
const VOID_TAGS = new Set(["BR", "IMG", "HR", "WBR"]);
const INLINE_TAGS = new Set(["EM", "STRONG", "I", "B", "SPAN", "U", "S"]);

function splitWords(el: HTMLElement): HTMLElement[] {
  const inners: HTMLElement[] = [];

  const makeWordMask = (word: string, wrapper?: string): HTMLElement => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    if (wrapper) {
      const tag = document.createElement(wrapper);
      tag.textContent = word;
      inner.appendChild(tag);
    } else {
      inner.textContent = word;
    }
    mask.appendChild(inner);
    inners.push(inner);
    return mask;
  };

  const walk = (node: Node, out: DocumentFragment | Element) => {
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        (child.textContent ?? "").split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            out.appendChild(document.createTextNode(part));
          } else {
            out.appendChild(makeWordMask(part));
          }
        });
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        const tag = el.tagName;

        if (VOID_TAGS.has(tag)) {
          // Keep void elements (e.g. <br>) exactly as they are
          out.appendChild(el.cloneNode(false));
        } else if (INLINE_TAGS.has(tag)) {
          // Split words inside inline wrappers individually,
          // each word wrapped in its own <em>/<strong>/etc.
          (el.textContent ?? "").split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              out.appendChild(document.createTextNode(part));
            } else {
              out.appendChild(makeWordMask(part, tag.toLowerCase()));
            }
          });
        } else {
          // Block-level or unknown elements: recurse into them
          const clone = el.cloneNode(false) as Element;
          walk(el, clone);
          out.appendChild(clone);
        }
      }
    });
  };

  const frag = document.createDocumentFragment();
  walk(el, frag);
  el.innerHTML = "";
  el.appendChild(frag);
  return inners;
}

/* ═══════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════ */
export default function HomeAnimations() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // FOUC guard: CSS `html:not(.animations-init) .reveal { opacity:1 }`
    // keeps content visible if this effect never fires (e.g. JS error).
    document.documentElement.classList.add("animations-init");

    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const handled = new WeakSet<Element>();
    const observedByGsap = new WeakSet<Element>();
    const colorHandled = new WeakSet<Element>();
    const noiseHandled = new WeakSet<Element>();
    const sectionAnimated = new WeakSet<Element>();
    const tiltHandled = new WeakSet<Element>();

    /* Will be assigned below and reused by MutationObserver */
    let bindGenericReveal = () => {};
    let bindHeadingReveals = () => {};
    let bindColorReveal = () => {};
    let bindBodyColorReveal = () => {};
    let bindNoiseHover = () => {};
    let bindSectionReveal = () => {};
    let bindHoverTilt = () => {};
    const cardCleanups: (() => void)[] = [];

    /* ── 1. NAV SCROLL STATE ────────────────────────────────────────── */
    const nav = document.getElementById("navbar");
    const onNavScroll = () =>
      nav?.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();

    if (!reduceMotion) {

      /* ── 1b. SCROLL PROGRESS LINE ──────────────────────────────────
         Thin emerald bar fixed at the top of the page that fills
         from 0 → 100% as the user scrolls to the bottom.           */
      const progressBar = document.createElement("div");
      progressBar.className = "scroll-progress-bar";
      document.body.appendChild(progressBar);
      gsap.set(progressBar, { scaleX: 0 });
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0 },
      });
      cardCleanups.push(() => progressBar.remove());

      /* ── 1c. SECTION ENTRANCE ──────────────────────────────────────
         Each non-hero section slides up from opacity-0 as it first
         enters the viewport. `once:true` so scrolling back doesn't
         re-hide large sections — that would look broken.            */
      bindSectionReveal = () => {
        document
          .querySelectorAll<HTMLElement>("main > section:not(.hero)")
          .forEach(sec => {
            if (sectionAnimated.has(sec)) return;
            sectionAnimated.add(sec);
            gsap.set(sec, { opacity: 0, y: 20 });
            ScrollTrigger.create({
              trigger: sec,
              start: "top 92%",
              once: true,
              onEnter: () =>
                gsap.to(sec, {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power3.out",
                  overwrite: true,
                }),
            });
          });
      };
      bindSectionReveal();

      /* ── 2. MASKED TEXT REVEALS (headings + eyebrows) ───────────────
         Each word slides up out of an overflow:hidden clip.
         Hero heading fires immediately; all others on scroll entry.    */
      bindHeadingReveals = () => {
        document
          .querySelectorAll<HTMLElement>(
            "main > section h1," +
            "main > section h2," +
            "main > section h3," +
            "main > section .eyebrow"
          )
          .forEach(el => {
            // Skip already-split or already-handled elements
            if (handled.has(el) || el.querySelector(".line-inner")) return;
            handled.add(el);

            // The container must be fully visible; .line-mask clips the words
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.transition = "none";

            splitWords(el);
            // Query after DOM update so GSAP gets live, rendered references
            const inners = Array.from(
              el.querySelectorAll<HTMLElement>(".line-inner")
            );
            if (!inners.length) return;

            const isHero = !!el.closest(".hero");

            gsap.fromTo(
              inners,
              { y: 120, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power4.out",
                stagger: 0.02,
                delay: isHero ? 0.2 : 0,
                scrollTrigger: isHero
                  ? undefined
                  : { trigger: el, start: "top 88%", once: true },
              }
            );
          });
      };
      bindHeadingReveals();

      /* ── 2b. SCROLL COLOR REVEAL ────────────────────────────────────
         Non-hero heading words start very dim; each word gets its full
         color back as you scroll it through the viewport.             */
      bindColorReveal = () => {
        document
          .querySelectorAll<HTMLElement>(
            "main > section h1," +
            "main > section h2," +
            "main > section h3," +
            "main > section .eyebrow"
          )
          .forEach(heading => {
            if (observedByGsap.has(heading)) return;

            const inners = Array.from(
              heading.querySelectorAll<HTMLElement>(".line-inner")
            );
            if (!inners.length) return;
            observedByGsap.add(heading);

            const isHero = !!heading.closest(".hero");

            // Pre-revealed (~45%) + fast. White words reveal via colour;
            // gradient <em> words reveal via opacity so they animate too.
            const trigger = isHero
              ? (heading.closest<HTMLElement>("section") ?? heading)
              : heading;
            const start = isHero ? "top top"   : "top 96%";
            const end   = isHero ? "bottom 40%" : "top 72%";

            const tl = gsap.timeline({
              scrollTrigger: { trigger, start, end, scrub: 0.4 },
            });
            inners.forEach((inner, i) => {
              const em = inner.querySelector<HTMLElement>("em, i");
              if (em) {
                gsap.set(em, { opacity: 0.4 });
                tl.to(em, { opacity: 1, duration: 0.3, ease: "none" }, i * 0.025);
              } else {
                gsap.set(inner, { color: "rgba(26,26,26,0.4)" });
                tl.to(inner, { color: "#1A1A1A", duration: 0.3, ease: "none" }, i * 0.025);
              }
            });
          });
      };

      /* ── 2c. BODY TEXT COLOUR REVEAL ────────────────────────────────
         Paragraphs and list items: words start dim, scroll-scrub to
         full colour. Replaces the generic opacity slide-up for these. */
      bindBodyColorReveal = () => {
        document
          .querySelectorAll<HTMLElement>(
            "main > section p," +
            "main > section li," +
            "main > section .section-sub," +
            "main > section .work-meta-text h3," +
            "main > section .testi-card blockquote," +
            "main > section .testi-card .testi-name," +
            "main > section .services-card-blurb," +
            "main > section .services-card-list li," +
            "main > section .step-body p," +
            "main > section .price-card p," +
            "main > section .page-hero-sub"
          )
          .forEach(el => {
            if (el.closest(".hero")) return;
            if (colorHandled.has(el)) return;
            if (el.querySelector(".word-dim, .line-inner")) return; // already split
            colorHandled.add(el);
            handled.add(el); // prevent bindGenericReveal from also animating it

            const spans = splitWordsFlat(el);
            if (!spans.length) return;

            // Reset any opacity the generic reveal would have set
            el.style.opacity = "1";
            el.style.transform = "none";

            // Pre-revealed (~42%) + fast; opacity so any gradient reveals too.
            gsap.set(spans, { opacity: 0.42 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top 97%",
                end: "top 72%",
                scrub: 0.4,
              },
            });
            spans.forEach((span, i) => {
              tl.to(span, { opacity: 1, duration: 0.3, ease: "none" }, i * 0.02);
            });
          });
      };

      // Run heading colour reveal after headings are split (needs .line-inner)
      requestAnimationFrame(() => {
        bindColorReveal();
        bindBodyColorReveal();
      });

      /* ── 2d. HERO BODY TEXT COLOUR REVEAL ───────────────────────────
         Runs synchronously — BEFORE section 3 — so those elements are
         added to `handled` and the opacity slide-up is skipped for them.
         Words start very dim and brighten as the hero scrolls away.    */
      document
        .querySelectorAll<HTMLElement>(".hero p, .hero .hero-sub")
        .forEach(el => {
          if (colorHandled.has(el)) return;
          colorHandled.add(el);
          handled.add(el); // section 3 checks this and will skip it

          el.style.opacity = "1";
          el.style.transform = "none";
          noTransition(el);

          const spans = splitWordsFlat(el);
          if (!spans.length) return;

          // Pre-revealed (~45%) + faster so the hero copy reads almost at once.
          gsap.set(spans, { opacity: 0.45 });

          const section = el.closest<HTMLElement>("section");
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section ?? el,
              start: "top top",
              end: "bottom 55%",
              scrub: 0.5,
            },
          });
          spans.forEach((span, i) => {
            tl.to(span, { opacity: 1, duration: 0.3, ease: "none" }, i * 0.02);
          });
        });

      /* ── 3. HERO non-heading reveals ─────────────────────────────── */
      Array.from(
        document.querySelectorAll<HTMLElement>(".hero .reveal")
      ).forEach((el, i) => {
        if (handled.has(el)) return;
        handled.add(el);
        noTransition(el);
        gsap.set(el, { opacity: 0, y: 30 });
        let firstVisit = true;
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            const delay = firstVisit ? 0.65 + i * 0.12 : 0;
            firstVisit = false;
            gsap.fromTo(el,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay, overwrite: true }
            );
          },
          onEnterBack: () => gsap.fromTo(el,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", overwrite: true }
          ),
          onLeave:     () => gsap.set(el, { opacity: 0 }),
          onLeaveBack: () => gsap.set(el, { opacity: 0 }),
        });
      });

      /* ── 4. STAGGER GROUPS ──────────────────────────────────────────
         Cards, steps, stats.
         Every element gets its own ScrollTrigger so the animation
         replays whenever the element re-enters the viewport (from
         either direction).  onLeave/onLeaveBack reset instantly while
         the element is off-screen so the user never sees the snap.   */
      const bindStagger = (
        selector: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        _start = "top 88%"   // kept for API compat, not used below
      ) => {
        const els = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(el => !handled.has(el));
        if (!els.length) return;
        els.forEach(el => { handled.add(el); noTransition(el); });

        const staggerAmt = typeof to.stagger === "number" ? (to.stagger as number) : 0.1;
        const toBase = Object.assign({}, to) as Record<string, unknown>;
        delete toBase.stagger;

        const fy = typeof from.y === "number" ? (from.y as number) : 0;
        const fx = typeof from.x === "number" ? (from.x as number) : 0;

        // Always land at y:0 x:0 so elements with only x or only y in `from`
        // still return to their natural position on both enter directions.
        const toFinal = { ...toBase, opacity: 1, y: 0, x: 0 } as gsap.TweenVars;

        gsap.set(els, { opacity: 0, y: fy, x: fx });

        els.forEach((el, i) => {
          const d = i * staggerAmt;
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            end:   "bottom top",
            // Scroll DOWN — slide in from original direction, staggered by index
            onEnter: () => gsap.fromTo(el,
              { opacity: 0, y: fy, x: fx },
              { ...toFinal, delay: d, overwrite: true }
            ),
            // Scroll UP — slide in from opposite direction, no stagger
            onEnterBack: () => gsap.fromTo(el,
              { opacity: 0, y: -(Math.abs(fy) || 40), x: Math.abs(fx) },
              { ...toFinal, delay: 0, overwrite: true }
            ),
            // Off-screen resets — instant, user never sees the snap
            onLeave:     () => gsap.set(el, { opacity: 0 }),
            onLeaveBack: () => gsap.set(el, { opacity: 0 }),
          });
        });
      };

      const slideUp: [gsap.TweenVars, gsap.TweenVars] = [
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
      ];

      bindStagger(".price-grid .price-card", ...slideUp);
      bindStagger(".testi-grid .testi-card", ...slideUp);
      bindStagger(
        ".steps .step",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 },
        "top 90%"
      );
      bindStagger(".results-grid .stat-card", ...slideUp);
      // NOTE: .services-grid .services-card are position:sticky — handled separately
      // below with opacity-only animation so CSS transforms don't break pinning.
      bindStagger(
        ".services-process-list .services-process-step",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.07 }
      );
      bindStagger(".page-stats-grid > div", ...slideUp);
      bindStagger(
        ".pricing-faq-grid .pricing-faq-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }
      );

      /* ── 4b. STICKY SERVICES CARDS ────────────────────────────────────
         These cards use position:sticky for the stacking effect.
         GSAP transforms break sticky pinning, so we only animate opacity.
         The section trigger covers all 4 cards as one coordinated group.  */
      (() => {
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>(".services-grid .services-card")
        ).filter(el => !handled.has(el));
        if (!cards.length) return;
        cards.forEach(el => { handled.add(el); noTransition(el); });
        gsap.set(cards, { opacity: 0 });

        const grid = document.querySelector<HTMLElement>(".services-grid");
        if (!grid) return;

        const enterCards = (fast = false) => cards.forEach((el, i) =>
          gsap.to(el, {
            opacity: 1,
            duration: fast ? 0.5 : 0.7,
            delay:    fast ? 0   : i * 0.12,
            ease: "power2.out",
            overwrite: true,
          })
        );
        const resetCards = () => gsap.set(cards, { opacity: 0 });

        ScrollTrigger.create({
          trigger: grid,
          start: "top 88%",
          end:   "bottom top",
          onEnter:      () => enterCards(false),
          onEnterBack:  () => enterCards(true),
          onLeaveBack:  resetCards,
        });
      })();

      /* ── 5. VISUAL FRAME — subtle scale entrance ─────────────────── */
      const visualFrame = document.querySelector<HTMLElement>(".visual-frame");
      if (visualFrame) {
        handled.add(visualFrame);
        gsap.set(visualFrame, { scale: 0.96, opacity: 0 });
        const animateFrame = () => gsap.fromTo(visualFrame,
          { scale: 0.96, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", overwrite: true }
        );
        ScrollTrigger.create({
          trigger: visualFrame,
          start: "top bottom",
          end:   "bottom top",
          onEnter:      animateFrame,
          onEnterBack:  animateFrame,
          onLeave:      () => gsap.set(visualFrame, { opacity: 0, scale: 0.96 }),
          onLeaveBack:  () => gsap.set(visualFrame, { opacity: 0, scale: 0.96 }),
        });
      }

      /* ── 5b. IMAGE PARALLAX ─────────────────────────────────────────
         Images with [data-parallax] shift vertically as you scroll.    */
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach(img => {
        const speed = parseFloat(img.dataset.parallaxSpeed ?? "0.2");
        const anchor =
          img.closest<HTMLElement>(".work-card, .visual-frame, .work-frame") ??
          (img.parentElement as HTMLElement);
        gsap.fromTo(
          img,
          { y: -60 * speed },
          {
            y: 60 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: anchor,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      /* ── 5c. WORK CARD HOVER TILT ────────────────────────────────────
         Subtle 3D perspective tilt on mouse-over; springs back on leave.
         Runs on all pages (home + portfolio) via MutationObserver.      */
      bindHoverTilt = () => {
        document.querySelectorAll<HTMLElement>(".work-card").forEach(card => {
          if (tiltHandled.has(card)) return;
          tiltHandled.add(card);
          const frame = card.querySelector<HTMLElement>(".work-frame");
          if (!frame) return;
          frame.style.transformStyle = "preserve-3d";
          const onMove = (e: MouseEvent) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
            const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
            gsap.to(frame, {
              rotateX: -y * 5,
              rotateY:  x * 8,
              transformPerspective: 900,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          const onLeave = () => {
            gsap.to(frame, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.9,
              ease: "expo.out",
              overwrite: "auto",
            });
          };
          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          cardCleanups.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
          });
        });
      };
      bindHoverTilt();

      /* ── 5d. HEADING NOISE HOVER ────────────────────────────────────
         SVG feTurbulence/feDisplacementMap gives headings a rough,
         displaced look on hover — like blackswanmedia.me.            */
      const SVG_NS = "http://www.w3.org/2000/svg";
      const noiseSvg = document.createElementNS(SVG_NS, "svg");
      noiseSvg.setAttribute("xmlns", SVG_NS);
      noiseSvg.setAttribute("width", "0");
      noiseSvg.setAttribute("height", "0");
      noiseSvg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
      const defs = document.createElementNS(SVG_NS, "defs");
      const filter = document.createElementNS(SVG_NS, "filter");
      filter.setAttribute("id", "noise-displace");
      filter.setAttribute("x", "-5%");
      filter.setAttribute("y", "-5%");
      filter.setAttribute("width", "110%");
      filter.setAttribute("height", "110%");
      const turb = document.createElementNS(SVG_NS, "feTurbulence");
      turb.setAttribute("type", "fractalNoise");
      turb.setAttribute("baseFrequency", "0.55");
      turb.setAttribute("numOctaves", "4");
      turb.setAttribute("seed", "2");
      turb.setAttribute("result", "noise");
      const dm = document.createElementNS(SVG_NS, "feDisplacementMap");
      dm.setAttribute("in", "SourceGraphic");
      dm.setAttribute("in2", "noise");
      dm.setAttribute("scale", "0");
      dm.setAttribute("xChannelSelector", "R");
      dm.setAttribute("yChannelSelector", "G");
      filter.appendChild(turb);
      filter.appendChild(dm);
      defs.appendChild(filter);
      noiseSvg.appendChild(defs);
      document.body.appendChild(noiseSvg);
      cardCleanups.push(() => noiseSvg.remove());

      // Re-bindable so it runs after every client-side navigation
      bindNoiseHover = () => {
        document
          .querySelectorAll<HTMLElement>("main > section h1, main > section h2")
          .forEach(h => {
            if (noiseHandled.has(h)) return;
            noiseHandled.add(h);

            const onEnter = () => {
              h.style.filter = "url(#noise-displace)";
              gsap.fromTo(
                dm,
                { attr: { scale: 0 } },
                { attr: { scale: 14 }, duration: 0.25, ease: "power2.out" }
              );
              gsap.fromTo(
                turb,
                { attr: { baseFrequency: "0.55" } },
                { attr: { baseFrequency: "0.75" }, duration: 0.25, ease: "none" }
              );
            };
            const onLeave = () => {
              gsap.to(dm, {
                attr: { scale: 0 },
                duration: 0.4,
                ease: "power3.out",
                onComplete: () => { h.style.filter = ""; },
              });
              gsap.to(turb, {
                attr: { baseFrequency: "0.55" },
                duration: 0.4,
                ease: "none",
              });
            };
            h.addEventListener("mouseenter", onEnter);
            h.addEventListener("mouseleave", onLeave);
            cardCleanups.push(() => {
              h.removeEventListener("mouseenter", onEnter);
              h.removeEventListener("mouseleave", onLeave);
            });
          });
      };
      bindNoiseHover();

      /* ── 5e. SERVICES CARD BLUR ──────────────────────────────────────
         As the next sticky card scrolls over the previous one, the
         previous card blurs out and dims.                             */
      const serviceCards = Array.from(
        document.querySelectorAll<HTMLElement>(".services-card")
      );
      serviceCards.forEach((card, i) => {
        if (i === serviceCards.length - 1) return; // last card never blurs
        const nextCard = serviceCards[i + 1];
        if (!nextCard) return;
        ScrollTrigger.create({
          trigger: nextCard,
          start: "top 80%",
          end: "top top",
          scrub: true,
          onUpdate: self => {
            const p = self.progress;
            gsap.set(card, {
              filter: `blur(${p * 6}px) brightness(${1 - p * 0.35})`,
              scale: 1 - p * 0.015,
            });
          },
        });
      });

      /* ── 6. GENERIC .reveal ─────────────────────────────────────────
         Catches every remaining .reveal not claimed by a group above.
         Direction is auto-detected from the element's horizontal centre:
           left third  → slide in from the left
           right third → slide in from the right
           centre      → scale + rise up
         Re-called by MutationObserver after client-side navigation.   */
      bindGenericReveal = () => {
        document.querySelectorAll<HTMLElement>(".reveal").forEach(el => {
          if (handled.has(el) || observedByGsap.has(el)) return;
          observedByGsap.add(el);
          noTransition(el);

          const rect = el.getBoundingClientRect();
          const cx   = rect.left + rect.width / 2;
          const vw   = window.innerWidth;
          const isLeft  = cx < vw * 0.35;
          const isRight = cx > vw * 0.65;

          const fromEnter: gsap.TweenVars = isLeft
            ? { opacity: 0, x: -52, y: 0 }
            : isRight
            ? { opacity: 0, x: 52,  y: 0 }
            : { opacity: 0, scale: 0.88, y: 22 };

          const fromBack: gsap.TweenVars = isLeft
            ? { opacity: 0, x: 40,  y: 0 }
            : isRight
            ? { opacity: 0, x: -40, y: 0 }
            : { opacity: 0, scale: 0.88, y: -14 };

          const toVars: gsap.TweenVars = {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 0.9, ease: "power3.out",
          };

          gsap.set(el, fromEnter);

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end:   "bottom top",
            onEnter:     () => gsap.fromTo(el, fromEnter, { ...toVars, overwrite: true }),
            onEnterBack: () => gsap.fromTo(el, fromBack,  { ...toVars, duration: 0.75, overwrite: true }),
            onLeave:     () => gsap.set(el, { opacity: 0 }),
            onLeaveBack: () => gsap.set(el, { opacity: 0 }),
          });
        });
      };
      bindGenericReveal();

    } else {
      // Reduced motion: skip all animations, surface everything immediately
      document.querySelectorAll<HTMLElement>(".reveal").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }

    /* ── 7. SCROLL TRIGGER REFRESH ON LOAD ──────────────────────────
       Images/fonts affect heights; refreshing after load fixes
       trigger start/end positions.                                    */
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      window.addEventListener("load", onLoad);
    }

    /* ── 8. MOUSE PARALLAX (ambient orbs) ────────────────────────── */
    let mx = 0, my = 0, rmx = 0, rmy = 0, parallaxRaf = 0;
    const onParallaxMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduceMotion) {
      window.addEventListener("mousemove", onParallaxMove);
      const tick = () => {
        rmx += (mx - rmx) * 0.06;
        rmy += (my - rmy) * 0.06;
        document.documentElement.style.setProperty("--mx", rmx.toFixed(3));
        document.documentElement.style.setProperty("--my", rmy.toFixed(3));
        parallaxRaf = requestAnimationFrame(tick);
      };
      tick();
    }

    /* ── 9. SMOOTH SCROLL ANCHORS ───────────────────────────────────── */
    const anchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const y =
        (target as HTMLElement).getBoundingClientRect().top +
        window.pageYOffset -
        80;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach(a => a.addEventListener("click", anchorClick));

    /* ── 10. STAT COUNTERS ──────────────────────────────────────────── */
    const counterRafs = new Map<HTMLElement, number>();
    const animateCount = (el: HTMLElement) => {
      const existing = counterRafs.get(el);
      if (existing) cancelAnimationFrame(existing);
      const end = parseInt(el.dataset.counter ?? "0", 10);
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      const dur = 1800;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        el.textContent = `${prefix}${Math.round(
          end * (1 - Math.pow(1 - t, 3))
        ).toLocaleString()}${suffix}`;
        if (t < 1) {
          counterRafs.set(el, requestAnimationFrame(tick));
        } else {
          counterRafs.delete(el);
        }
      };
      counterRafs.set(el, requestAnimationFrame(tick));
    };
    const counterObserved = new WeakSet<Element>();
    const counterIO = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            animateCount(el);
          } else {
            const raf = counterRafs.get(el);
            if (raf) cancelAnimationFrame(raf);
            counterRafs.delete(el);
            const prefix = el.dataset.prefix ?? "";
            const suffix = el.dataset.suffix ?? "";
            el.textContent = `${prefix}0${suffix}`;
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll<HTMLElement>("[data-counter]").forEach(c => {
      counterObserved.add(c);
      counterIO.observe(c);
    });

    /* ── 11. MUTATION OBSERVER (debounced) ──────────────────────────
       Re-runs heading split and generic reveal after Next.js client
       navigations inject new page content.                           */
    let moTimer: ReturnType<typeof setTimeout> | null = null;
    const mo = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-counter]").forEach(c => {
        if (counterObserved.has(c)) return;
        counterObserved.add(c);
        counterIO.observe(c);
      });
      if (moTimer !== null) clearTimeout(moTimer);
      moTimer = setTimeout(() => {
        moTimer = null;
        if (!reduceMotion) {
          bindSectionReveal();
          bindHeadingReveals();
          bindGenericReveal();
          bindHoverTilt();
          requestAnimationFrame(() => {
            bindColorReveal();
            bindBodyColorReveal();
            bindNoiseHover();
          });
          ScrollTrigger.refresh();
        }
      }, 150);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* ── 12. CONTACT FORM → mailto draft ───────────────────────────── */
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.id !== "contact-form") return;
      e.preventDefault();
      const fd = new FormData(form);
      const cfStatus = document.getElementById("contact-status");
      const name = (fd.get("name") ?? "").toString().trim();
      const email = (fd.get("email") ?? "").toString().trim();
      const details = (fd.get("details") ?? "").toString().trim();
      if (!name || !email) {
        if (cfStatus) {
          cfStatus.textContent = "Please fill in your name and email.";
          cfStatus.classList.add("is-error");
        }
        return;
      }
      const subject = `Make me a deck — ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nWork details:\n${
        details || "(none provided)"
      }\n`;
      const href = `mailto:hello@pitchdeck.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      if (cfStatus) {
        cfStatus.textContent = "Opening your email client…";
        cfStatus.classList.remove("is-error");
      }
      window.location.href = href;
    };
    document.addEventListener("submit", onSubmit, true);

    /* ── CLEANUP ─────────────────────────────────────────────────────── */
    return () => {
      document.documentElement.classList.remove("animations-init");
      if (moTimer !== null) clearTimeout(moTimer);
      cancelAnimationFrame(parallaxRaf);
      window.removeEventListener("mousemove", onParallaxMove);
      window.removeEventListener("scroll", onNavScroll);
      window.removeEventListener("load", onLoad);
      anchors.forEach(a => a.removeEventListener("click", anchorClick));
      document.removeEventListener("submit", onSubmit, true);
      counterIO.disconnect();
      counterRafs.forEach(raf => cancelAnimationFrame(raf));
      mo.disconnect();
      cardCleanups.forEach(fn => fn());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
}
