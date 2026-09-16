"use client";

import { useEffect, useState } from "react";
import { EVENT_START } from "@/lib/constants";

export default function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(EVENT_START).getTime() - Date.now()));
    const first = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => { window.clearTimeout(first); window.clearInterval(interval); };
  }, []);
  const parts = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  return <div className="countdown-wrap"><p className="eyebrow">{remaining === 0 ? "The challenge has begun" : "The challenge begins in"}</p><div className="countdown" role="timer" aria-label="Countdown to 27 January 2027, midnight Indian Standard Time">{parts.map((value, i) => <div key={i}><strong>{value === null ? "—" : String(value).padStart(2, "0")}</strong><span>{["Days", "Hours", "Minutes", "Seconds"][i]}</span></div>)}</div></div>;
}
