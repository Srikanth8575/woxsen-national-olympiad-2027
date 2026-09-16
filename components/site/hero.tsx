"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Countdown from "./countdown";
import { RegisterLink } from "./shared";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  return <section id="home" className="hero" ref={ref} aria-labelledby="hero-title">
    <motion.div className="hero-image" style={reduced ? undefined : { scale, y }}><Image src="/hero/hero-bg.webp" alt="Woxsen University campus" fill sizes="100vw" preload /></motion.div>
    <div className="hero-shade" />
    <div className="hero-content container">
      <p className="hero-date"><span className="status-dot" />27—28 January 2027 <span className="date-divider">/</span> Woxsen University</p>
      <h1 id="hero-title"><span className="hero-kicker">Woxsen National</span><span className="hero-title-word">OLYMPIAD<span className="hero-edition">’27</span></span></h1>
      <p className="hero-tagline">India&apos;s Biggest Youth Intelligence &amp; Skills Challenge</p>
      <div className="hero-cta"><RegisterLink /><a className="text-link" href="#winners">The legacy continues <ArrowDown size={17} aria-hidden="true" /></a></div>
      <div className="hero-bottom"><p className="hero-motto">Challenge.<br />Compete. <span>Conquer.</span></p><Countdown /><a href="#winners" className="scroll-cue" aria-label="Scroll to the winners"><ArrowDown size={20} /><span>Scroll to discover</span></a></div>
    </div>
  </section>;
}
