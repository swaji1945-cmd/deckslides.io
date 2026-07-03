"use client";
import { useEffect, useRef, useState } from "react";

/* Portfolios that aren't featured in the home page's main work sections.
   Left = names · Centre = 3D cube image (auto-cycles, pauses on hover)
   · Right = description (only while hovering a name). */
const ITEMS = [
  { name: "Sumeria",        img: "/Sumeria/1.svg",
    desc: "Deep-tech infrastructure deck that built conviction with institutional space investors." },
  { name: "Skinetix",       img: "/Skinetix/1.svg",
    desc: "Sports-science platform pitch engineered to win elite team and federation partnerships." },
  { name: "Gung",           img: "/Gung/1.svg",
    desc: "Consumer brand launch deck shaped for retail buy-in and early commercial traction." },
  { name: "Dubai Culture",  img: "/Dubai-culture/1.svg",
    desc: "Cultural institution narrative deck for high-stakes government stakeholders." },
  { name: "Black Sheep",    img: "/Black-sheep-foods/1.svg",
    desc: "Food-tech Series A story that turns a bold thesis into real investor appetite." },
  { name: "Snow Cell",      img: "/Snow-cell/1.svg",
    desc: "GPU-compute infrastructure deck framing a complex product for non-technical capital." },
];

const FACES = 4;          // 4-sided cube band for a solid roll
const CYCLE_MS = 2000;    // auto-advance interval

export default function CubeServices() {
  const [active, setActive] = useState(0);   // which image is shown (for the name highlight)
  const [hover, setHover]   = useState<number | null>(null); // which name is hovered (desc visible)

  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef  = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rot      = useRef(0);   // accumulated cube rotation (deg)
  const front    = useRef(0);   // face slot currently at the front
  const cur      = useRef(0);   // current displayed index
  const paused   = useRef(false);

  // roll the cube to a given index. dir: +1 rolls DOWN, -1 rolls UP
  const roll = (idx: number, dir: number) => {
    if (idx === cur.current) return;
    const cube = cubeRef.current;
    if (!cube) return;
    const incoming = dir > 0 ? (front.current - 1 + FACES) % FACES
                             : (front.current + 1) % FACES;
    const face = faceRefs.current[incoming];
    if (face) face.style.backgroundImage = `url('${ITEMS[idx].img}')`;
    rot.current += dir > 0 ? 90 : -90;
    cube.style.transform = `translateZ(calc(var(--d) * -1)) rotateX(${rot.current}deg)`;
    front.current = incoming;
    cur.current = idx;
    setActive(idx);
  };

  // setup: depth var + seed first face + auto-cycle loop
  useEffect(() => {
    const stage = stageRef.current;
    const cube = cubeRef.current;
    if (!stage || !cube) return;

    const setDepth = () => {
      const h = stage.getBoundingClientRect().height;
      cube.style.setProperty("--d", `${(h / 2).toFixed(1)}px`);
    };
    setDepth();
    const ro = new ResizeObserver(setDepth);
    ro.observe(stage);
    if (faceRefs.current[0]) faceRefs.current[0]!.style.backgroundImage = `url('${ITEMS[0].img}')`;

    const id = setInterval(() => {
      if (paused.current) return;
      const next = (cur.current + 1) % ITEMS.length;
      roll(next, +1); // auto-cycle always rolls downward
    }, CYCLE_MS);

    return () => { ro.disconnect(); clearInterval(id); };
  }, []);

  const onEnter = (i: number) => {
    paused.current = true;
    setHover(i);
    roll(i, i > cur.current ? +1 : -1); // lower in the list → roll down, higher → roll up
  };
  const onLeave = () => {
    paused.current = false;
    setHover(null);
  };

  return (
    <section className="cs-section">
      <div className="container">
        <header className="cs-head">
          <span className="cs-kicker">Selected work</span>
          <div className="cs-title">Decks across <em>every stage.</em></div>
        </header>

        <div className="cs-grid">
          {/* left — names */}
          <div className="cs-names" onMouseLeave={onLeave}>
            {ITEMS.map((it, i) => (
              <button
                key={it.name}
                type="button"
                className={`cs-name${i === active ? " cs-name--active" : ""}`}
                onMouseEnter={() => onEnter(i)}
                onFocus={() => onEnter(i)}
                onClick={() => onEnter(i)}
              >
                {it.name}
              </button>
            ))}
          </div>

          {/* centre — 3D cube */}
          <div ref={stageRef} className="cs-stage" aria-hidden="true">
            <div ref={cubeRef} className="cs-cube">
              {Array.from({ length: FACES }).map((_, k) => (
                <div
                  key={k}
                  ref={(el) => { faceRefs.current[k] = el; }}
                  className="cs-face"
                  style={{ transform: `rotateX(${90 * k}deg) translateZ(var(--d))` }}
                />
              ))}
            </div>
          </div>

          {/* right — description (only while hovering a name) */}
          <div className="cs-desc">
            {hover !== null && (
              <div className="cs-desc-text" key={hover}>{ITEMS[hover].desc}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
