// Updated round rules and event dates transcribed from the supplied information images.
export type RoundRule = { label: string; value: string; note?: string; };
export type ChallengeRound = {
  id: number;
  title: string;
  category: string;
  date: string;
  focus: string;
  format: string;
  theme: "thinking" | "dialogue" | "strategy";
  rules: RoundRule[];
};

export const CHALLENGE_ROUNDS: ChallengeRound[] = [
  {
    id: 1, title: "General Thinking Assessment", category: "Online Proctored Assessment", date: "Last Week of December 2026", theme: "thinking",
    format: "45-minute timed online assessment", focus: "Analytical reasoning & problem-solving",
    rules: [
      { label: "Timeline", value: "Last Week of December 2026" },
      { label: "Mode", value: "Proctor through Career Readiness Intelligent System (CRIS), a Woxsen University product" },
      { label: "Format", value: "45-minute timed online assessment" },
      { label: "Syllabus", value: "Prediction · Observation · Pattern-Based Questions", note: "No formulas needed" },
      { label: "Focus", value: "Analytical reasoning & problem-solving" },
      { label: "Mandatory Device", value: "Laptop, Desktop or Tablet only", note: "No Mobile Phones Allowed" },
      { label: "Strict Proctoring", value: "Audio & video recording enabled. Suspicious movements trigger warnings. The exam will automatically disconnect after 3 warnings." },
    ],
  },
  {
    id: 2, title: "Innovation Dialogue", category: "On-Campus Group Discussion", date: "28 January 2027", theme: "dialogue",
    format: "Dynamic group discussion", focus: "Teamwork, leadership & communication through real-world problem-solving scenarios.",
    rules: [
      { label: "Timeline", value: "28 January 2027" },
      { label: "Mode", value: "Offline" },
      { label: "Venue", value: "On Campus (Woxsen University)" },
      { label: "Format", value: "Dynamic group discussion" },
      { label: "Focus", value: "Teamwork, leadership & communication through real-world problem-solving scenarios." },
    ],
  },
  {
    id: 3, title: "Strategy Arena", category: "Interactive Gaming Challenges", date: "28 January 2027", theme: "strategy",
    format: "Interactive gaming challenges", focus: "Strategic thinking, adaptability & decision-making in an immersive competitive experience.",
    rules: [
      { label: "Timeline", value: "28 January 2027" },
      { label: "Mode", value: "Offline" },
      { label: "Venue", value: "On Campus (Woxsen University)" },
      { label: "Format", value: "Interactive gaming challenges" },
      { label: "Focus", value: "Strategic thinking, adaptability & decision-making in an immersive competitive experience." },
    ],
  },
];

export const QUICK_SCHEDULE = [
  { date: "Last Week of December 2026", event: "Round 1: General Thinking Assessment (Online)" },
  { date: "26 January 2027, Evening", event: "On-Campus Registration Opens" },
  { date: "27 January 2027, 11:00 AM", event: "Registration Closes" },
  { date: "27 January 2027, 9:00 AM–8:00 PM", event: "Workshop Day" },
  { date: "28 January 2027", event: "Round 2: Innovation Dialogue" },
  { date: "28 January 2027", event: "Round 3: Strategy Arena" },
] as const;

export const CAMPUS_REGISTRATION = {
  opens: { date: "26 January 2027", time: "Evening" },
  closes: { date: "27 January 2027", time: "11:00 AM Sharp" },
  notice: "No registrations entertained after this time.",
} as const;

export const PLAN_NOTE = "Parents and School Mentors may drop off students at the campus. Kindly note that accommodation or campus stay is not available for accompanying persons during the event.";
