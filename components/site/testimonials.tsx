"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionLabel } from "./shared";
import { Reveal } from "./motion";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const person = testimonials[index];
  return <section id="testimonials" className="section testimonials light-section" aria-labelledby="testimonials-title">
    <div className="container">
      <SectionLabel>Student testimonials</SectionLabel>
      <div className="people-heading">
        <Reveal><h2 id="testimonials-title">Happy<br /><span>people.</span></h2></Reveal>
        <Reveal className="people-photo" hover><Image src="/experience/happy-people.webp" alt="Students enjoying an Olympiad event at Woxsen" fill sizes="(min-width: 900px) 58vw, 100vw" /><span className="photo-caption">The moments that stay with you.</span></Reveal>
      </div>
      <div className="testimonial-showcase">
        <div aria-live="polite" aria-atomic="true">
          <figure className="testimonial-feature" key={person.name}>
            <div className="testimonial-portrait hover-surface" data-hover>
              <Image src={person.image} alt={person.name} fill sizes="(min-width: 900px) 32vw, 85vw" />
              <div className="portrait-caption"><span>{person.highlight}</span></div>
            </div>
            <div className="testimonial-quote"><span className="quote-mark" aria-hidden="true">“</span><blockquote>{person.quote}</blockquote></div>
            <figcaption className="testimonial-person"><h3>{person.name}</h3><p>{person.achievement}</p></figcaption>
          </figure>
        </div>
        <div className="testimonial-navigation">
          <div className="testimonial-dots" role="group" aria-label="Choose a student testimonial">{testimonials.map((item, i) => <button key={item.name} aria-label={`Read ${item.name}'s testimonial`} aria-pressed={i === index} onClick={() => setIndex(i)}><span /></button>)}</div>
          <div className="rail-controls"><button className="icon-button" onClick={() => setIndex((index + testimonials.length - 1) % testimonials.length)} aria-label="Previous testimonial"><ArrowLeft size={20} /></button><button className="icon-button" onClick={() => setIndex((index + 1) % testimonials.length)} aria-label="Next testimonial"><ArrowRight size={20} /></button></div>
        </div>
      </div>
    </div>
  </section>;
}
