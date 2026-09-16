"use client";

import { useState } from "react";
import { Plus, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./shared";
import { Reveal } from "./motion";

const syllabus = ["Pattern Recognition", "Logical Puzzles", "Visual & Non-Verbal Reasoning", "Analytical Reasoning", "Coding-Decoding & Rule Discovery", "Critical Thinking / Situation-Based Reasoning"];
const rounds = [
  { title: "Analytical & Reasoning Quest", format: "Online Proctored Assessment", date: "December 2026", caption: "Think.", focus: syllabus },
  { title: "Team Decision Dynamics", format: "On-Campus Group Discussion", date: "28 January 2027", caption: "Speak.", focus: ["Communication Skills", "Teamwork", "Logical Expression of Ideas", "Leadership & Collaboration"] },
  { title: "Advanced Puzzle Marathon", format: "Logical Gaming", date: "28 January 2027", caption: "Strategize.", focus: ["Strategic Thinking", "Fast Decision-Making", "Pattern-Based Problem-Solving", "Performance Under Pressure"] },
];

function Round({ round, index }: { round: typeof rounds[number]; index: number; }) {
  const [open, setOpen] = useState(false);
  return <article className="round" data-hover data-open={open}>
    <h3><button className="round-trigger" id={`round-trigger-${index}`} aria-controls={`round-content-${index}`} aria-expanded={open} onClick={() => setOpen(!open)}><span className="round-number">0{index + 1}</span><span className="round-summary"><span className="eyebrow">{round.format}</span><span className="round-name">{round.title}</span><span className="round-date">{round.date}</span></span><span className="round-plus"><Plus size={22} /></span></button></h3>
    <div className="round-content" id={`round-content-${index}`} role="region" aria-labelledby={`round-trigger-${index}`} hidden={!open}>
      {index === 0 ? <><div className="round-phases"><div><p className="eyebrow">Phase 01 / School</p><h4>Phase 1 — School</h4><p><strong>Online Proctor Format:</strong> 60-minute aptitude and logic assessment.</p><p><strong>Eligibility:</strong> School students up to 12th class.</p><p>Tentative exam schedule: December 2026</p></div><div><p className="eyebrow">Phase 02 / College</p><h4>Phase 2 — College</h4><p><strong>Eligibility:</strong> College students — UG / PG.</p><p>Tentative exam schedule: December 2026</p></div></div><h4 className="focus-heading">Syllabus</h4></> : <><h4>{index === 1 ? "Group Discussion" : "Logical Gaming Round"}</h4><p className="round-description">{index === 1 ? "Participants take part in an on-campus discussion where communication, collaboration and decision-making are tested in real time." : "Participants enter an immersive logical gaming environment where strategic thinking, speed and decision-making are challenged under pressure."}</p><p><strong>Date:</strong> 28 January 2027</p><p><strong>Format:</strong> {index === 1 ? "On-campus group discussion" : "On-campus logical gaming round"}</p><h4 className="focus-heading">Focus Areas</h4></>}
      <ul className="focus-list">{round.focus.map(item => <li key={item}>{item}</li>)}</ul>
      <a href="#workshop" className="round-workshop"><span><strong>Workshop · 27 JAN 2027</strong>Workshop for school students on Career Advancement, Options, and Experiencing University Life.</span><ArrowUpRight size={22} /></a>
    </div>
  </article>;
}

export default function Rounds() {
  return <section id="rounds" className="section rounds" aria-labelledby="rounds-title"><div className="container"><SectionLabel>The challenge</SectionLabel><Reveal className="section-heading split-heading"><h2 id="rounds-title">Think. Speak.<br /><span>Strategize.</span></h2><p className="lead">Each stage is designed differently — from online analytical assessment to group discussion and immersive logical gaming.</p></Reveal><div className="round-list">{rounds.map((round, index) => <Round key={round.title} round={round} index={index} />)}</div><p className="section-endnote">Three challenges. <span>Three different ways to prove yourself.</span></p></div></section>;
}
