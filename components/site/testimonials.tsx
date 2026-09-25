"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionLabel } from "./shared";
import { Reveal } from "./motion";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const move = (direction: number) => setIndex(current => (current + direction + testimonials.length) % testimonials.length);
  const person = testimonials[index];
  return <section id="testimonials" className="section testimonials light-section" aria-labelledby="testimonials-title">
    <div className="container">
      <SectionLabel>Student testimonials</SectionLabel>
      <div className="people-heading">
        <Reveal><h2 id="testimonials-title">Happy<br /><span>people.</span></h2></Reveal>
        <Reveal className="people-photo" hover><Image src="/experience/happy-people.webp" alt="Students enjoying an Olympiad event at Woxsen" fill sizes="(min-width: 900px) 58vw, 100vw" /><span className="photo-caption">The moments that stay with you.</span></Reveal>
      </div>
      <div className="testimonial-showcase">
        <figure className="testimonial-feature" tabIndex={0} role="group" aria-roledescription="carousel" aria-label="Student testimonials. Swipe left or right, or use the arrow controls."
          onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
          <div className="testimonial-visual">
            <div className="testimonial-portrait hover-surface" data-hover>
              <motion.div className="testimonial-photo-swipe" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={reduced ? 0 : 0.25} dragMomentum={false}
                onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 40 || (Math.abs(info.offset.x) > 16 && Math.abs(info.velocity.x) > 450)) move(info.offset.x < 0 ? 1 : -1); }}>
                <Image key={person.image} className="testimonial-student-image" src={person.image} alt={person.name} fill sizes="(min-width: 900px) 30vw, 260px" draggable={false} />
                <div className="portrait-caption"><span>{person.highlight}</span></div>
              </motion.div>
            </div>
            <div className="testimonial-navigation">
              <button type="button" className="icon-button" onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft size={20} /></button>
              <div className="testimonial-dots" role="group" aria-label="Choose a student testimonial">{testimonials.map((item, i) => <button type="button" key={item.name} aria-label={`Read ${item.name}'s testimonial`} aria-pressed={i === index} onClick={() => setIndex(i)}><span /></button>)}</div>
              <button type="button" className="icon-button" onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight size={20} /></button>
            </div>
            <p className="testimonial-swipe-hint">Swipe the photo to meet the next student</p>
          </div>
          <div className="testimonial-quote" aria-live="polite" aria-atomic="true"><span className="sr-only">{person.name}. </span><span className="quote-mark" aria-hidden="true">“</span><blockquote key={person.name}>{person.quote}</blockquote></div>
          <figcaption className="testimonial-person"><h3>{person.name}</h3><p>{person.achievement}</p></figcaption>
        </figure>
      </div>
    </div>
  </section>;
}
