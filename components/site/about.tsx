import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion";
import { SectionLabel } from "./shared";

const qualities = [
  ["Think Smarter", "Analytical reasoning, observation and problem-solving."],
  ["Communicate Better", "Leadership, teamwork and real-time decision making."],
  ["Compete Strategically", "Immersive challenges that reward adaptability and strategy."],
];

export default function About() {
  return <section id="about" className="section light-section about" aria-labelledby="about-title"><div className="container">
    <SectionLabel>About the Olympiad</SectionLabel>
    <Reveal className="about-heading"><h2 id="about-title">Think beyond<br />the <span>ordinary.</span></h2><div className="about-copy"><p className="lead">Woxsen National Olympiad is a platform built to challenge young minds through intelligence, innovation, communication and strategic thinking.</p><p>It brings together ambitious students from across the country and pushes them beyond textbook learning through competitive, real-world challenges.</p><a className="text-link" href="#rounds">Explore the challenge <ArrowUpRight size={18} /></a></div></Reveal>
    <div className="stats-row">{[["3", "Challenging Rounds", "Designed to test thinking, communication and strategy."], ["₹1 Crore", "Prize Pool", "Including cash prizes, scholarships and gifts."], ["2", "Event Days", "A high-energy national-level competition experience."]].map(([value, label, text]) => <Reveal key={label} hover><strong>{value}</strong><h3>{label}</h3><p>{text}</p></Reveal>)}</div>
    <Reveal className="experience-heading"><p className="eyebrow">The experience</p><h3>More Than Just A Competition.</h3><p>Every round is built to reveal how students think, adapt, collaborate and perform under pressure.</p></Reveal>
    <div className="qualities">{qualities.map(([title, text]) => <div key={title} data-hover><h4>{title}</h4><p>{text}</p></div>)}</div>
    <p className="about-statement">Built for students who are ready to <span>think differently.</span></p>
  </div></section>;
}
