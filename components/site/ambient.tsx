"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** A single composited backdrop, driven by scrolling rather than a timer. */
export default function Ambient() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -160]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 20]);
  const x = useTransform(scrollYProgress, [0, 1], [-100, 140]);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let target: HTMLElement | null = null;
    let pointerX = 0;
    let pointerY = 0;
    const update = (event: PointerEvent) => {
      if (!media.matches || !(event.target instanceof Element)) return;
      target = event.target.closest<HTMLElement>("[data-hover]");
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame || !target) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--hover-x", `${pointerX - rect.left}px`);
        target.style.setProperty("--hover-y", `${pointerY - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", update, { passive: true });
    return () => { document.removeEventListener("pointermove", update); window.cancelAnimationFrame(frame); };
  }, []);
  return <div className="ambient-background" aria-hidden="true">
    <div className="ambient-grain" />
    <motion.div className="ambient-light" style={reduced ? { x: 0, y: 0, rotate: 0 } : { x, y, rotate }} />
    <motion.svg className="ambient-contours" viewBox="0 0 1600 1000" fill="none" style={reduced ? { y: 0, rotate: 0 } : { y, rotate }}>
      {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M ${-280 + i * 38} -130 C ${1150 + i * 30} ${10 + i * 20}, ${-420 + i * 55} ${680 + i * 20}, ${1740 + i * 45} ${820 + i * 36}`} />)}
    </motion.svg>
    <div className="ambient-vignette" />
  </div>;
}
