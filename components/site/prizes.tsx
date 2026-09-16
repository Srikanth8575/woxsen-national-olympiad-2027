"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./shared";

const products = [
  { name: "MacBook Air", image: "/prizes/macbook-air.webp", type: "laptop" },
  { name: "MacBook Neo", image: "/prizes/macbook-neo.webp", type: "laptop" },
  { name: "iPad", image: "/prizes/ipad.webp", type: "tablet" },
  { name: "iPhone", image: "/prizes/iphone.webp", type: "phone" },
];

export default function Prizes() {
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shine = useTransform(scrollYProgress, [0, 1], ["100% 50%", "0% 50%"]);
  const rise = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 14]);
  const product = products[selected];
  return <section ref={ref} id="prizes" className="section prizes" aria-labelledby="prize-title">
    <div className="container">
      <SectionLabel>Prize pool</SectionLabel>
      <div className="prize-intro">
        <p className="eyebrow">The ultimate reward</p>
        <h2 id="prize-title" className="prize-amount"><motion.span className="prize-amount-ink" style={{ backgroundPosition: reduced ? "50% 50%" : shine }}>₹1 CRORE</motion.span></h2>
        <p className="lead">Cash prizes, scholarships and premium gadgets<br className="desktop-break" /> for the brightest minds.</p>
      </div>
      <div className="reward-showcase hover-surface" data-hover>
        <div className="reward-stage">
          <div className="reward-copy">
            <span className="reward-kicker"><span />Premium gadgets</span>
            <h3 id="reward-name" aria-live="polite">{product.name}</h3>
            <p>Select a reward.<br />Take a closer look.</p>
            <a href="#register" className="text-link">Your challenge starts here<ArrowUpRight size={16} /></a>
          </div>
          <div className="reward-display" role="group" aria-labelledby="reward-name">
            <motion.div className="reward-orbits" aria-hidden="true" style={{ rotate: reduced ? 0 : rotate }}><i /><i /><i /></motion.div>
            <div className="reward-floor" aria-hidden="true" />
            <motion.div className="reward-float" style={{ y: reduced ? 0 : rise }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div className={`reward-product reward-${product.type}`} key={product.name}
                  initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -12, scale: reduced ? 1 : 0.98 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <Image src={product.image} alt={product.name} fill sizes="(min-width: 900px) 52vw, 88vw" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        <div className="reward-selector" role="group" aria-label="Choose a gadget to explore">
          {products.map((item, i) => <button key={item.name} className="reward-option" data-hover aria-pressed={selected === i} onClick={() => setSelected(i)}>
            <Image src={item.image} alt="" width={80} height={60} sizes="80px" /><span>{item.name}</span><span className="reward-option-dot" aria-hidden="true" />
          </button>)}
        </div>
      </div>
      <div className="prize-note"><p>*Includes cash prizes, scholarships &amp; gifts.</p><p>Not just a prize pool.<br /><strong>A reason to go all in.</strong></p></div>
    </div>
  </section>;
}
