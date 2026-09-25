"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { RegisterLink } from "./shared";

const links = [["The legacy", "winners"], ["About", "about"], ["Prizes", "prizes"], ["The challenge", "rounds"], ["Speakers", "speakers"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerBar = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id], footer[id]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      // A reading line below the fixed header also works for the tall winner story.
      const readingLine = (headerBar.current?.getBoundingClientRect().bottom ?? 82) + Math.min(120, window.innerHeight * 0.18);
      const current = sections.find(section => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      setActiveSection(current?.id ?? "");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    sections.forEach(section => observer.observe(section));
    if (headerBar.current) observer.observe(headerBar.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    window.addEventListener("pageshow", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("pageshow", schedule);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="site-header">
    <div className="header-inner" ref={headerBar}>
      <a className="brand" href="#home" aria-label="Woxsen National Olympiad home" onClick={() => setOpen(false)}><Image src="/logo/woxsen-logo.svg" width={510.87} height={235.82} alt="Woxsen University" unoptimized preload /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
      <div className="header-actions"><RegisterLink label="Register" /><button ref={toggle} className="menu-toggle icon-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label="Mobile navigation">{[...links, ["Workshop", "workshop"], ["Happy people", "testimonials"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}</nav>
  </header>;
}
