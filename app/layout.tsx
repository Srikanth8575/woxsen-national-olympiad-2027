import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./refinements.css";
import "./registration.css";
import "./polish.css";
import "./prize-details.css";
import "./event-guide.css";

const bodyFont = localFont({
  src: [
    { path: "./fonts/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/dm-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ], variable: "--font-body", display: "swap",
});

export const metadata: Metadata = {
  title: "Woxsen National Olympiad 2027 | Challenge. Compete. Conquer.",
  description: "Woxsen National Olympiad 2027. Three challenging rounds, a ₹1 crore prize pool, and an extraordinary experience. 27–28 January at Woxsen University, Hyderabad.",
  openGraph: { title: "Woxsen National Olympiad 2027", description: "Challenge. Compete. Conquer. 27–28 January 2027, Woxsen University.", type: "website", locale: "en_IN" },
  twitter: { card: "summary", title: "Woxsen National Olympiad 2027", description: "India’s Biggest Youth Intelligence & Skills Challenge. 27–28 January 2027." },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return <html lang="en" className={bodyFont.variable}><body>{children}</body></html>;
}
