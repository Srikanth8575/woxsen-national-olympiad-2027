"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sponsors } from "@/lib/content";
import { SectionLabel } from "./shared";

export default function Sponsors() {
  const rail = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; id: number; } | null>(null);
  const interacting = useRef(false);
  const resumeAt = useRef(0);
  const reduced = useReducedMotion();
  const visible = useInView(rail, { margin: "80px" });

  useEffect(() => {
    if (reduced || !visible) return;
    let frame = 0;
    let previous = 0;
    let position = rail.current?.scrollLeft ?? 0;
    const animate = (time: number) => {
      const el = rail.current;
      const width = firstSet.current?.offsetWidth ?? 0;
      if (el && width) {
        if (interacting.current || time < resumeAt.current || document.hidden) {
          position = el.scrollLeft;
        } else if (previous) {
          position += Math.min(time - previous, 50) * 0.048;
          if (position >= width) position -= width;
          el.scrollLeft = position;
        }
      }
      previous = time;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reduced, visible]);

  const rest = () => { resumeAt.current = performance.now() + 2200; };
  const endInteraction = () => {
    interacting.current = false;
    drag.current = null;
    rest();
  };
  const move = (direction: number) => {
    rest();
    const el = rail.current;
    const width = firstSet.current?.offsetWidth ?? 0;
    if (!el || !width) return;
    if (direction < 0 && el.scrollLeft < 2) el.scrollLeft = width;
    if (direction > 0 && el.scrollLeft >= width) el.scrollLeft -= width;
    el.scrollBy({ left: direction * el.clientWidth, behavior: reduced ? "instant" : "smooth" });
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    interacting.current = true;
    rest();
    if (event.pointerType !== "mouse") return;
    drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    const width = firstSet.current?.offsetWidth ?? 0;
    const next = drag.current.left + drag.current.x - event.clientX;
    event.currentTarget.scrollLeft = next < 0 && width ? width + next : next;
  };
  return <section id="sponsors" className="section sponsors light-section" aria-labelledby="sponsors-title">
    <div className="container"><SectionLabel>Previous sponsors</SectionLabel>
      <div className="split-heading section-heading"><h2 id="sponsors-title">Great things<br /><span>grow together.</span></h2><p className="lead">A network of organisations and brands that have supported previous editions of the Woxsen Olympiad.</p></div>
      <div className="sponsors-meta"><span className="eyebrow">Previous partner network</span><div className="sponsor-controls">
        <button type="button" className="icon-button" aria-label="Previous sponsors" onClick={() => move(-1)}><ArrowLeft size={17} /></button><button type="button" className="icon-button" aria-label="Next sponsors" onClick={() => move(1)}><ArrowRight size={17} /></button>
      </div></div>
    </div>
    <div ref={rail} className="sponsor-marquee sponsor-swipe-rail" tabIndex={0} role="region" aria-label="Previous sponsors. Swipe or scroll to explore." data-lenis-prevent
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endInteraction} onPointerCancel={endInteraction} onLostPointerCapture={endInteraction}
      onScroll={() => { if (performance.now() < resumeAt.current) rest(); }}
      onWheel={rest} onFocus={rest} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
      <div className="sponsor-track">{[0, 1].map(copy => <div key={copy} ref={copy === 0 ? firstSet : undefined} className="sponsor-set" aria-hidden={copy === 1 ? true : undefined}>{sponsors.map(sponsor => <div className="sponsor-logo" data-hover key={sponsor.name}><Image src={sponsor.image} alt={copy === 0 ? sponsor.name : ""} width={160} height={88} sizes="(max-width: 599px) 20vw, 160px" draggable={false} /></div>)}</div>)}</div>
    </div>
    <p className="sponsor-swipe-hint container">Swipe or drag to explore our previous partners.</p>
  </section>;
}
