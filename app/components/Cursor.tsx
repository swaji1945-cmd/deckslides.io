"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = document.createElement("div");
    dot.className = "cursor";
    document.body.appendChild(dot);

    let tx = -300, ty = -300;
    let cx = -300, cy = -300;
    let raf = 0;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener("mousemove", onMove);

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      dot.classList.toggle("is-link", !!t?.closest("a, button, [data-cursor-link]"));
    };
    document.addEventListener("mouseover", onOver);

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      dot.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      dot.remove();
    };
  }, []);

  return null;
}
