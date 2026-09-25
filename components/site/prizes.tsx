"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./shared";
import PrizeDetails from "./prize-details";

const products = [
  { name: "MacBook Air", image: "/prizes/macbook-air.webp", type: "laptop" },
  { name: "MacBook Neo", image: "/prizes/macbook-neo.webp", type: "laptop" },
  { name: "iPad", image: "/prizes/ipad.webp", type: "tablet" },
  { name: "iPhone", image: "/prizes/iphone.webp", type: "phone" },
];

export default function Prizes() {
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shine = useTransform(scrollYProgress, [0, 1], ["100% 50%", "0% 50%"]);
  return <section ref={ref} id="prizes" className="section prizes" aria-labelledby="prize-title">
    <div className="container">
      <SectionLabel>Prize pool</SectionLabel>
      <div className="prize-intro">
        <p className="eyebrow">The ultimate reward</p>
        <h2 id="prize-title" className="prize-amount"><motion.span className="prize-amount-ink" style={{ backgroundPosition: reduced ? "50% 50%" : shine }}>₹1 CRORE</motion.span></h2>
        <p className="lead">Cash prizes, scholarships and premium gadgets<br className="desktop-break" /> for the brightest minds.</p>
      </div>
      <div className="floating-gadgets">
        <div className="gadgets-heading"><p className="reward-kicker"><span />Premium gadgets</p></div>
        <div className="gadget-grid" role="group" aria-label="Explore the premium gadgets">
          {products.map((item, i) => <button type="button" key={item.name} className={`gadget-card gadget-${item.type}`} data-hover aria-label={`Highlight ${item.name}`} aria-pressed={selected === i} onClick={() => setSelected(selected === i ? null : i)}>
            <span className="gadget-air"><span className="gadget-shadow" /><span className="gadget-lift"><span className="gadget-float" style={{ animationDelay: `${i * -1.35}s` }}><Image src={item.image} alt={item.name} fill sizes="(min-width: 900px) 23vw, 42vw" draggable={false} /></span></span></span>
            <span className="gadget-name">{item.name}<ArrowUpRight size={14} aria-hidden="true" /></span>
          </button>)}
        </div>
      </div>
      <PrizeDetails />
      <div className="prize-note"><p>*Includes cash prizes, scholarships &amp; gifts.</p><p>Not just a prize pool.<br /><strong>A reason to go all in.</strong></p></div>
    </div>
  </section>;
}
