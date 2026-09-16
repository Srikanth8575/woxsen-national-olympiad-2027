"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SectionLabel, RegisterLink } from "./shared";

const winners = [
  { year: "2025", label: "Olympiad Brainiac 2025", name: "Latha Indrani Busireddy", image: "/winners/winner-2025.webp", detail: "Internship at Jamboree and winner of a GMAT course." },
  { year: "2026", label: "Olympiad Brainiac 2026", name: "Shrika Rana", image: "/winners/winner-2026.webp", detail: "Winner 2026 with an internship opportunity at Innomatics." },
  { year: "2027", label: "The legacy continues", name: "Are you the one?", image: "/winners/whos-next.webp", detail: "The next Olympiad champion has not been crowned yet. That name could be yours." },
];
const query = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
const subscribe = (callback: () => void) => { const media = window.matchMedia(query); media.addEventListener("change", callback); return () => media.removeEventListener("change", callback); };
const getSnapshot = () => window.matchMedia(query).matches;

function WinnerPanel({ winner, index, progress, active, cinematic }: { winner: typeof winners[number]; index: number; progress: MotionValue<number>; active: number; cinematic: boolean; }) {
  const input = index === 0 ? [0, 0.24, 0.34, 1] : index === 1 ? [0.24, 0.34, 0.62, 0.72] : [0, 0.62, 0.72, 1];
  const opacity = useTransform(progress, input, index === 0 ? [1, 1, 0, 0] : index === 1 ? [0, 1, 1, 0] : [0, 0, 1, 1]);
  const y = useTransform(progress, input, index === 0 ? [0, 0, -30, -30] : index === 1 ? [35, 0, 0, -30] : [35, 35, 0, 0]);
  return <motion.article className={`winner-panel winner-${winner.year}`} aria-hidden={cinematic && index !== active ? true : undefined} style={cinematic ? { opacity, y, pointerEvents: index === active ? "auto" : "none" } : { opacity: 1, y: 0, pointerEvents: "auto" }}>
    <span className="winner-year" aria-hidden="true">{winner.year}</span>
    <div className="winner-photo"><Image src={winner.image} alt={index === 2 ? "A mysterious future champion in an Olympiad hat" : `${winner.name}, holding the Olympiad trophy`} fill sizes="(min-width: 900px) 48vw, 90vw" /></div>
    <div className="winner-caption"><p className="eyebrow">{winner.label}</p><h3>{winner.name}</h3><p>{winner.detail}</p>{index === 2 && <div inert={cinematic && index !== active ? true : undefined}><RegisterLink label="Make your mark" /></div>}</div>
  </motion.article>;
}

export default function Winners() {
  const section = useRef<HTMLElement>(null);
  const panels = useRef<HTMLDivElement>(null);
  const cinematic = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [desktopActive, setDesktopActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const active = cinematic ? desktopActive : mobileActive;
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => { if (cinematic) setDesktopActive(p < 0.29 ? 0 : p < 0.67 ? 1 : 2); });
  const select = (index: number) => {
    if (cinematic && section.current) {
      const top = section.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (section.current.offsetHeight - window.innerHeight) * [0.05, 0.48, 0.92][index], behavior: "smooth" });
    } else if (panels.current) {
      panels.current.scrollTo({ left: panels.current.clientWidth * index, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      setMobileActive(index);
    }
  };
  return <section id="winners" className="winner-story" data-cinematic={cinematic} ref={section} aria-labelledby="winners-title">
    <div className="winner-sticky container">
      <div className="winner-intro"><SectionLabel>The legacy</SectionLabel><h2 id="winners-title">The legacy<br /><span>continues.</span></h2><p>Challenge. Compete. Conquer.</p>
        <div className="winner-navigation" role="group" aria-label="Explore the Olympiad winners">{winners.map((winner, i) => <button key={winner.year} onClick={() => select(i)} aria-pressed={active === i}><span>{winner.year}</span><span className="winner-nav-line" /></button>)}</div>
        <p className="winner-hint"><ArrowDown size={15} /><span>Scroll through the story</span><ArrowRight size={15} /></p>
      </div>
      <div className="winner-panels" ref={panels} tabIndex={0} aria-label="2025, 2026 and the next Olympiad winner" onScroll={() => { if (!cinematic && panels.current) setMobileActive(Math.round(panels.current.scrollLeft / panels.current.clientWidth)); }}>{winners.map((winner, i) => <WinnerPanel key={winner.year} winner={winner} index={i} progress={scrollYProgress} active={active} cinematic={cinematic} />)}</div>
    </div>
  </section>;
}
