"use client";

import { useEffect } from "react";

export default function HomeAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* 1. NAV SCROLL STATE */
    const nav = document.getElementById("navbar");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* 3. HERO TITLE — per-word reveal (don't break words mid-line) */
    const splitTarget = document.querySelector<HTMLElement>("[data-split]");
    if (splitTarget && !reduceMotion) {
      const wrapWords = (el: Node) => {
        [...el.childNodes].forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            (node.nodeValue || "").split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
              } else {
                const span = document.createElement("span");
                span.className = "char";
                span.textContent = part;
                frag.appendChild(span);
              }
            });
            node.parentNode?.replaceChild(frag, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            wrapWords(node);
          }
        });
      };
      wrapWords(splitTarget);

      const chars = splitTarget.querySelectorAll<HTMLElement>(".char");
      chars.forEach((c, i) => {
        c.style.transitionDelay = `${0.08 * i + 0.15}s`;
      });
      requestAnimationFrame(() => {
        chars.forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "translateY(0)";
        });
      });
    }

    /* 4. REVEAL ON SCROLL — observes elements that exist now AND any added later
       via Next.js client navigation. Without the MutationObserver, .reveal items
       on dynamically-rendered pages (e.g., /pricing CTAs) stay at opacity 0. */
    const observed = new WeakSet<Element>();
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -80px 0px" });
    const observeReveals = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };
    observeReveals();

    /* 5. MOUSE PARALLAX (orbs) */
    let mx = 0, my = 0, rmx = 0, rmy = 0;
    let parallaxRaf = 0;
    const onParallaxMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduceMotion) {
      window.addEventListener("mousemove", onParallaxMove);
      const tickParallax = () => {
        rmx += (mx - rmx) * 0.06;
        rmy += (my - rmy) * 0.06;
        document.documentElement.style.setProperty("--mx", rmx.toFixed(3));
        document.documentElement.style.setProperty("--my", rmy.toFixed(3));
        parallaxRaf = requestAnimationFrame(tickParallax);
      };
      tickParallax();
    }

    /* 6. SMOOTH SCROLL (with nav offset) */
    const anchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const y = (target as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", anchorClick));

    /* 7. STAT COUNTERS */
    const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
    const animateCount = (el: HTMLElement) => {
      const end = parseInt(el.dataset.counter || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const duration = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(end * eased);
        el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const counterObserved = new WeakSet<Element>();
    const counterIO = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    const observeCounters = () => {
      counters.forEach((c) => {
        if (counterObserved.has(c)) return;
        counterObserved.add(c);
        counterIO.observe(c);
      });
    };
    observeCounters();

    /* Re-scan after Next.js client navigation swaps page content. */
    const mo = new MutationObserver(() => {
      observeReveals();
      // Re-query counters since `counters` is a NodeList from the old DOM
      document.querySelectorAll<HTMLElement>("[data-counter]").forEach((c) => {
        if (counterObserved.has(c)) return;
        counterObserved.add(c);
        counterIO.observe(c);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* 8. CONTACT FORM → mailto draft (delegated so it works on every page,
       including when the user navigates client-side to /contact). */
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.id !== "contact-form") return;
      e.preventDefault();
      const fd = new FormData(form);
      const cfStatus = document.getElementById("contact-status");
      const name = (fd.get("name") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const details = (fd.get("details") || "").toString().trim();
      if (!name || !email) {
        if (cfStatus) {
          cfStatus.textContent = "Please fill in your name and email.";
          cfStatus.classList.add("is-error");
        }
        return;
      }
      const subject = `Make me a deck — ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nWork details:\n${details || "(none provided)"}\n`;
      const href = `mailto:hello@pitchdeck.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (cfStatus) {
        cfStatus.textContent = "Opening your email client…";
        cfStatus.classList.remove("is-error");
      }
      window.location.href = href;
    };
    document.addEventListener("submit", onSubmit, true);

    /* CLEANUP — important for React Strict Mode + future re-renders */
    return () => {
      cancelAnimationFrame(parallaxRaf);
      window.removeEventListener("mousemove", onParallaxMove);
      window.removeEventListener("scroll", onScroll);
      anchors.forEach((a) => a.removeEventListener("click", anchorClick));
      document.removeEventListener("submit", onSubmit, true);
      io.disconnect();
      counterIO.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
