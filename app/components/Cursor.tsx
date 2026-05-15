"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    let cx = 0, cy = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Delegated hover detection so dynamically-rendered links/buttons (admin
    // tables, editors, modals) are also detected without re-binding listeners.
    const isHoverTarget = (el: Element | null) => {
      if (!el) return false;
      return !!el.closest("a, button, .work-card, [data-cursor-link]");
    };
    const onOver = (e: MouseEvent) => {
      if (isHoverTarget(e.target as Element | null)) cursor.classList.add("is-link");
      else cursor.classList.remove("is-link");
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cursor.remove();
    };
  }, []);

  return null;
}
