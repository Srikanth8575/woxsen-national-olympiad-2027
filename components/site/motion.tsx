"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function Experience({ children }: { children: ReactNode; }) {
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let lenis: Lenis | undefined;
    const setup = () => {
      lenis?.destroy();
      lenis = media.matches ? new Lenis({ autoRaf: true, lerp: 0.1, anchors: true }) : undefined;
    };
    setup();
    media.addEventListener("change", setup);
    return () => { media.removeEventListener("change", setup); lenis?.destroy(); };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({ children, className = "", hover = false }: { children: ReactNode; className?: string; hover?: boolean; }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} data-hover={hover ? "" : undefined} initial={{ y: 24 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
