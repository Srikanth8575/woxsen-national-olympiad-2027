"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { speakers } from "@/lib/content";
import { SectionLabel } from "./shared";
import { Reveal } from "./motion";

export default function Speakers() {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [focused, setFocused] = useState(0);
  const updateFocus = () => {
    const el = rail.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    if (!window.matchMedia("(max-width: 599px)").matches) return;
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    Array.from(el.children).forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - center);
      if (delta < distance) { distance = delta; closest = index; }
    });
    setFocused(closest);
  };
  const move = (direction: number) => {
    const el = rail.current;
    if (!el) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (window.matchMedia("(max-width: 599px)").matches) {
      const index = Math.max(0, Math.min(speakers.length - 1, focused + direction));
      const card = el.children[index].getBoundingClientRect();
      el.scrollBy({ left: card.left + card.width / 2 - el.getBoundingClientRect().left - el.clientWidth / 2, behavior });
    } else el.scrollBy({ left: direction * el.clientWidth * 0.72, behavior });
  };
  return <section id="speakers" className="section speakers" aria-labelledby="speakers-title"><div className="container"><SectionLabel>Event speakers</SectionLabel><Reveal className="section-heading split-heading"><h2 id="speakers-title">Cool<br /><span>speakers.</span></h2><p className="lead">Connect with Woxsen University<br />&amp; industry leaders.</p></Reveal><div className="speaker-gallery"><Reveal className="speaker-wide" hover><Image src="/experience/cool-speakers.webp" alt="A panel discussion at the Woxsen Olympiad" fill sizes="(min-width: 900px) 65vw, 100vw" /><span className="photo-caption">Cool speakers / Woxsen Olympiad</span></Reveal><Reveal className="speaker-stage" hover><Image src="/experience/speaker-stage.webp" alt="A guest speaker addressing the Woxsen Olympiad audience" fill sizes="(min-width: 900px) 30vw, 100vw" /></Reveal></div><div className="rail-heading"><p className="eyebrow">The voices. The perspectives.</p><div className="rail-controls"><button className="icon-button" aria-label="Previous speakers" disabled={edge.start} onClick={() => move(-1)}><ArrowLeft size={20} /></button><button className="icon-button" aria-label="Next speakers" disabled={edge.end} onClick={() => move(1)}><ArrowRight size={20} /></button></div></div>
    <div ref={rail} className="speaker-rail" tabIndex={0} aria-label="Five event speakers, scroll to explore" onScroll={updateFocus}>{speakers.map((speaker, index) => <article className={`speaker-card hover-surface${focused === index ? " is-focused" : ""}`} data-hover key={speaker.name}><div className="speaker-portrait"><Image src={speaker.image} alt={speaker.name} fill sizes="(min-width: 900px) 23vw, (max-width: 599px) calc(100vw - 72px), 65vw" /></div><h3>{speaker.name}</h3><p>{speaker.designation}</p></article>)}</div>
  </div></section>;
}
