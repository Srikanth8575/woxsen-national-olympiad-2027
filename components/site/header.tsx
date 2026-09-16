"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { RegisterLink } from "./shared";

const links = [["The legacy", "winners"], ["About", "about"], ["Prizes", "prizes"], ["The challenge", "rounds"], ["Speakers", "speakers"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="site-header">
    <div className="header-inner">
      <a className="brand" href="#home" aria-label="Woxsen National Olympiad home" onClick={() => setOpen(false)}><Image src="/logo/olympiad-logo.png" width={567} height={299} alt="Woxsen National Olympiad" preload /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="header-actions"><RegisterLink label="Register" /><button ref={toggle} className="menu-toggle icon-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label="Mobile navigation">{[...links, ["Workshop", "workshop"], ["Happy people", "testimonials"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav>
  </header>;
}
