"use client";

import { useEffect } from "react";

/**
 * Adds image-parallax to any element marked with `[data-parallax]`.
 *
 * The element should be an <img> (or any block) inside a positioned card.
 * As the card travels through the viewport, the image translates Y in the
 * opposite direction at a configurable speed.
 *
 * Usage:
 *   <div className="card">
 *     <img data-parallax data-parallax-speed="0.3" src="..." />
 *   </div>
 *
 * Speed: 0 = static, 1 = matches scroll. Typical: 0.15–0.4.
 */
export default function Parallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const collect = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    let elements = collect();

    // Ensure each parallax image's container has overflow hidden + the image
    // can move beyond its natural bounds. We do this by inflating the image's
    // height with scale so translation never reveals empty space at edges.
    const prep = (el: HTMLElement) => {
      el.style.willChange = "transform";
      const speed = parseFloat(el.dataset.parallaxSpeed || "0.25");
      // The image is scaled up so it has slack to translate inside its frame.
      const scale = 1 + Math.abs(speed) * 0.6;
      el.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      el.dataset.parallaxScale = String(scale);
    };
    elements.forEach(prep);

    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of elements) {
        const parent = el.parentElement;
        if (!parent) continue;
        const rect = parent.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;

        const speed = parseFloat(el.dataset.parallaxSpeed || "0.25");
        const scale = parseFloat(el.dataset.parallaxScale || "1");

        // 0 when card centered, -1 at top of viewport, +1 at bottom.
        const center = rect.top + rect.height / 2;
        const progress = (center - vh / 2) / vh;
        const y = -progress * rect.height * speed;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    // Re-collect after dynamic route changes (Next.js client navigation).
    const mo = new MutationObserver(() => {
      const next = collect();
      // Cheap diff: if length changed, re-prep the new ones.
      if (next.length !== elements.length) {
        next.forEach((el) => {
          if (!el.dataset.parallaxScale) prep(el);
        });
        elements = next;
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      elements.forEach((el) => {
        el.style.willChange = "";
        el.style.transform = "";
        delete el.dataset.parallaxScale;
      });
    };
  }, []);

  return null;
}
