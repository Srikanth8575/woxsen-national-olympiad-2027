"use client";

import Image from "next/image";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { sponsors } from "@/lib/content";
import { SectionLabel } from "./shared";

export default function Sponsors() {
  const [paused, setPaused] = useState(false);
  return <section id="sponsors" className="section sponsors light-section" aria-labelledby="sponsors-title"><div className="container"><SectionLabel>Previous sponsors</SectionLabel><div className="split-heading section-heading"><h2 id="sponsors-title">Great things<br /><span>grow together.</span></h2><p className="lead">A network of organisations and brands that have supported previous editions of the Woxsen Olympiad.</p></div><div className="sponsors-meta"><span className="eyebrow">Previous partner network</span><button className="text-link pause-button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? "Resume rotation" : "Pause rotation"}</button></div></div><div className="sponsor-marquee" data-paused={paused}><div className="sponsor-track">{[0, 1].map(copy => <div key={copy} className="sponsor-set" aria-hidden={copy === 1 ? true : undefined}>{sponsors.map(sponsor => <div className="sponsor-logo" data-hover key={sponsor.name}><Image src={sponsor.image} alt={copy === 0 ? sponsor.name : ""} width={160} height={88} /></div>)}</div>)}</div></div></section>;
}
