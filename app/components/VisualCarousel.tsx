"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  { src: "/Tamara/1.svg",             label: "Tamara · Fintech CX" },
  { src: "/Alively/1.svg",            label: "Alively · Health Tech" },
  { src: "/Impactive/1.svg",          label: "Impactive · Social Impact" },
  { src: "/Outland-creative/1.svg",   label: "Outland Creative · Agency" },
  { src: "/Revest/1.svg",             label: "Revest · DeFi" },
  { src: "/Bahrain-rugby-club/1.svg", label: "Bahrain Rugby Club" },
  { src: "/noonan-performance/1.svg", label: "Noonan Performance" },
  { src: "/Gung/1.svg",               label: "Gung" },
  { src: "/Artura/1.svg",             label: "Artura" },
  { src: "/Govmaven/1.svg",           label: "Govmaven" },
  { src: "/Snow-cell/1.svg",          label: "Snow Cell" },
  { src: "/Sumeria/1.svg",            label: "Sumeria" },
  { src: "/Dubai-culture/1.svg",      label: "Dubai Culture" },
  { src: "/Skinetix/1.svg",           label: "Skinetix" },
  { src: "/Black-sheep-foods/1.svg",  label: "Black Sheep Foods" },
  { src: "/Barmy-army/1.svg",         label: "Barmy Army" },
  { src: "/Blank-SIM/1.svg",          label: "Blank SIM" },
  { src: "/Moon-boo-sun/1.svg",       label: "Moon Boo Sun" },
  { src: "/Dominique-geroulis/1.svg", label: "Dominique Geroulis" },
  { src: "/Arctica-home/1.svg",       label: "Arctica Home" },
];

const INTERVAL = 2600;

export default function VisualCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="visual-frame">
      <div className="visual-stripes" aria-hidden="true"></div>
      <div className="visual-portrait">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.label}
            className={"visual-carousel-img" + (i === idx ? " is-active" : "")}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <span className="visual-portrait-glow" aria-hidden="true"></span>
      </div>
      <div className="visual-tag glass">
        <span className="visual-tag-dot"></span>
        <span key={idx} className="visual-tag-label">{SLIDES[idx].label}</span>
      </div>
      <div className="visual-stat glass">
        <strong>+312%</strong>
        <small>Investor reply rate</small>
      </div>
    </div>
  );
}
