"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { RegisterLink } from "./shared";

const links = [["The legacy", "winners"], ["About", "about"], ["Prizes", "prizes"], ["The challenge", "rounds"], ["Speakers", "speakers"], ["Gallery", "gallery"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("");
  const headerBar = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigateMobile = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    setOpen(false);
    if (id === "gallery") return;
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    toggle.current?.focus({ preventScroll: true });
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    const headerHeight = headerBar.current?.getBoundingClientRect().bottom ?? 68;
    window.scrollTo({
      top: Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerHeight - 12),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };
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
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={id === "gallery" ? "/gallery" : `#${id}`} aria-current={activeSection === id ? "location" : undefined}>
        {activeSection === id && <motion.span className="desktop-nav-glass" layoutId="desktop-navigation-highlight" aria-hidden="true"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ layout: { duration: reducedMotion ? 0 : 0.45, ease: [0.25, 0.8, 0.25, 1] }, opacity: { duration: reducedMotion ? 0 : 0.2 } }} />}
        {label}
      </a>)}</nav>
      <div className="header-actions"><RegisterLink label="Register" /><button ref={toggle} className="menu-toggle icon-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    <motion.div className="mobile-nav-panel" initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{
        height: { duration: reducedMotion ? 0 : open ? 0.5 : 0.3, ease: [0.25, 0.8, 0.25, 1] },
        opacity: { duration: reducedMotion ? 0 : open ? 0.4 : 0.25, ease: "easeInOut" },
      }}
      aria-hidden={!open} inert={!open}>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...links, ["Workshop", "workshop"], ["Happy people", "testimonials"], ["Contact", "contact"]].map(([label, id], index) => <motion.a key={id} href={id === "gallery" ? "/gallery" : `#${id}`} initial={false}
        animate={{ opacity: open ? 1 : 0, x: open || reducedMotion ? 0 : -32 }}
        transition={{ duration: reducedMotion ? 0 : open ? 0.6 : 0.2, delay: open && !reducedMotion ? 0.12 + index * 0.11 : 0, ease: [0.25, 0.8, 0.25, 1] }}
        aria-current={activeSection === id ? "location" : undefined} onClick={event => navigateMobile(event, id)}>{label}</motion.a>)}</nav>
    </motion.div>
  </header>;
}
