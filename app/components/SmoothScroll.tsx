"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,            // a touch of glide, not heavy
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exp out
      smoothWheel: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hash anchor support — let Lenis own the scroll-to instead of native jump
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href || href === "#" || href.length < 2) return;
      const target = document.querySelector(href) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", onAnchor);

    // Drive a CSS variable from the scroll position so any element can read it.
    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      document.documentElement.style.setProperty("--scroll-y", `${scroll}`);
      document.documentElement.style.setProperty(
        "--scroll-progress",
        limit > 0 ? `${(scroll / limit).toFixed(4)}` : "0"
      );
    };
    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  return null;
}
