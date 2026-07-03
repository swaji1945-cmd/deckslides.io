"use client";
import { useEffect, useRef } from "react";

/* A canvas 2.4x bigger than the hero, scattered with image cards.
   The mouse position pans the whole canvas, so moving the mouse reveals
   fresh images from every edge (left / right / top / bottom) — like clou.ch.
   x / y = position as % of the BIG canvas.  w / h = card size (px).
   hover = uniform-scale behaviour (no stretching). */
type Card = {
  src: string; x: number; y: number; w: number; h: number;
  hover: "grow" | "shrink" | "round";
};

const CARDS: Card[] = [
  // row 1
  { src: "/Arctica-home/1.svg",        x: 8,  y: 10, w: 320, h: 210, hover: "grow"  },
  { src: "/Bahrain-rugby-club/1.svg",  x: 33, y: 6,  w: 330, h: 205, hover: "grow"  },
  { src: "/Sumeria/1.svg",             x: 60, y: 11, w: 270, h: 270, hover: "round" },
  { src: "/Snow-cell/1.svg",           x: 86, y: 8,  w: 235, h: 300, hover: "grow"  },
  // row 2
  { src: "/Dominique-geroulis/1.svg",  x: 6,  y: 36, w: 220, h: 300, hover: "grow"  },
  { src: "/Dubai-culture/1.svg",       x: 31, y: 34, w: 230, h: 300, hover: "shrink"},
  { src: "/Artura/1.svg",              x: 58, y: 37, w: 275, h: 275, hover: "round" },
  { src: "/Skinetix/1.svg",            x: 84, y: 33, w: 345, h: 225, hover: "grow"  },
  // row 3
  { src: "/Black-sheep-foods/1.svg",   x: 9,  y: 61, w: 275, h: 275, hover: "round" },
  { src: "/Gung/1.svg",                x: 34, y: 58, w: 270, h: 270, hover: "grow"  },
  { src: "/Tamara/1.svg",              x: 61, y: 62, w: 235, h: 315, hover: "grow"  },
  { src: "/Govmaven/1.svg",            x: 87, y: 59, w: 335, h: 215, hover: "shrink"},
  // row 4
  { src: "/Barmy-army/1.svg",          x: 7,  y: 85, w: 330, h: 210, hover: "grow"  },
  { src: "/Blank-SIM/1.svg",           x: 33, y: 86, w: 235, h: 315, hover: "grow"  },
  { src: "/Moon-boo-sun/1.svg",        x: 59, y: 83, w: 330, h: 220, hover: "shrink"},
  { src: "/noonan-performance/1.svg",  x: 85, y: 87, w: 340, h: 215, hover: "grow"  },
];

const SCALE = 2.4;        // canvas size relative to the hero
const CARD_W = 300;       // every card the same size (uniform)
const CARD_H = 205;       // ~3:2 landscape, like the reference

export default function HeroCanvas() {
  const hostRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const t = useRef({ nx: 0, ny: 0 });
  const c = useRef({ nx: 0, ny: 0 });

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      t.current.nx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      t.current.ny = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      // fast follow
      c.current.nx = lerp(c.current.nx, t.current.nx, 0.15);
      c.current.ny = lerp(c.current.ny, t.current.ny, 0.15);

      const r = host.getBoundingClientRect();
      const extraX = r.width  * (SCALE - 1); // total horizontal overflow
      const extraY = r.height * (SCALE - 1);
      // map pointer (0..1) across the full canvas so edges reveal new images
      const tx = -(c.current.nx - 0.5) * extraX;
      const ty = -(c.current.ny - 0.5) * extraY;
      canvas.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;

      raf = requestAnimationFrame(tick);
    };

    // start centred
    t.current = { nx: 0.5, ny: 0.5 };
    c.current = { nx: 0.5, ny: 0.5 };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={hostRef} className="hc" aria-hidden="true">
      <div
        ref={canvasRef}
        className="hc-canvas"
        style={{
          width:  `${SCALE * 100}%`,
          height: `${SCALE * 100}%`,
          left:  `${-(SCALE - 1) * 50}%`,
          top:   `${-(SCALE - 1) * 50}%`,
        }}
      >
        {CARDS.map((card) => (
          <div
            key={card.src}
            className="hc-card"
            style={{ left: `${card.x}%`, top: `${card.y}%`, width: CARD_W, height: CARD_H }}
          >
            <div className="hc-media hc-media--grow">
              <img src={card.src} alt="" draggable={false} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
      <div className="hc-veil" />
    </div>
  );
}
