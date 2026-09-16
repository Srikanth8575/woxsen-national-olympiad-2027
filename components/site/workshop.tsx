import Image from "next/image";
import { Reveal } from "./motion";
import { SectionLabel, RegisterLink } from "./shared";

export default function Workshop() {
  return <section id="workshop" className="workshop light-section" aria-labelledby="workshop-title"><div className="workshop-photo" data-hover><Image src="/experience/workshop.webp" alt="Students together at a Woxsen University workshop" fill sizes="(min-width: 900px) 55vw, 100vw" /><span className="photo-caption">Woxsen University / The experience</span></div><Reveal className="workshop-copy"><SectionLabel>The workshop</SectionLabel><p className="workshop-date">27<span>JAN / 2027</span></p><h2 id="workshop-title">Career advancement.<br /><span>University life.</span></h2><p className="lead">Workshop for school students on Career Advancement, Options, and Experiencing University Life.</p><RegisterLink label="Be part of it" /></Reveal></section>;
}
