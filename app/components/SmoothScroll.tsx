"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  /* ── Initialise Lenis once on mount ─────────────────────────────────── */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so ScrollTrigger reads the updated scroll
    // position in the same frame that Lenis advances it.
    lenis.on("scroll", ScrollTrigger.update);
    const gsapTickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapTickerFn);
    gsap.ticker.lagSmoothing(0);

    // Hash anchor support — let Lenis own the scroll-to
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

    // Expose scroll progress as CSS vars for any element to read
    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      document.documentElement.style.setProperty("--scroll-y", `${scroll}`);
      document.documentElement.style.setProperty(
        "--scroll-progress",
        limit > 0 ? `${(scroll / limit).toFixed(4)}` : "0"
      );
    };
    lenis.on("scroll", onScroll);

    return () => {
      lenisRef.current = null;
      gsap.ticker.remove(gsapTickerFn);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  /* ── Scroll to top on every client-side navigation ──────────────────── */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback when Lenis isn't running (reduced motion)
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
