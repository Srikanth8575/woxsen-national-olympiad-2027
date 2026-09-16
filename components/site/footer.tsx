import Image from "next/image";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { contacts } from "@/lib/content";
import { Reveal } from "./motion";
import { SectionLabel, RegisterLink } from "./shared";

export function RegisterCTA() {
  return <section id="register" className="section register-section" aria-labelledby="register-title">
    <div className="container">
      <SectionLabel>Your challenge starts here</SectionLabel>
      <Reveal className="register-layout">
        <div><p className="eyebrow">Woxsen National Olympiad 2027</p><h2 id="register-title">Are you<br /><span>ready?</span></h2></div>
        <div className="register-invitation"><p className="lead">Challenge your thinking. Compete with the best.<br />Make your mark at Woxsen National Olympiad 2027.</p><RegisterLink /><p className="register-date">27–28 January 2027<span>Woxsen University · Hyderabad</span></p></div>
      </Reveal>
      <div className="register-bottom"><p>Challenge. Compete. Conquer.</p><a className="text-link" href="#contact">Talk to the team<ArrowUpRight size={16} /></a></div>
    </div>
  </section>;
}

export default function Footer() {
  return <footer id="contact" className="section site-footer"><div className="container"><SectionLabel>Contact</SectionLabel><div className="split-heading section-heading"><h2>Let&apos;s<br /><span>talk.</span></h2><p className="lead">For registrations, event information, partnerships or general queries, connect with the Olympiad team.</p></div><div className="contact-grid">{contacts.map(contact => <article key={contact.name} data-hover><p className="eyebrow">{contact.role}</p><h3>{contact.name}</h3><p className="contact-designation">{contact.designation}</p><a href={contact.phoneLink}>{contact.phone}<ArrowUpRight size={16} /></a><a href={contact.emailLink}>{contact.email}<ArrowUpRight size={16} /></a></article>)}</div><div className="footer-bottom"><a href="#home" className="brand" aria-label="Woxsen National Olympiad home"><Image src="/logo/olympiad-logo.png" alt="Woxsen National Olympiad" width={567} height={299} /></a><p>© 2027 Woxsen University. All Rights Reserved.<br /><span>Hyderabad · India</span></p><a className="text-link" href="#home">Back to top <ArrowUp size={17} /></a></div></div></footer>;
}
