"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BrainCircuit, Crown, MessagesSquare, X } from "lucide-react";
import type { ChallengeRound } from "@/lib/challenge";

const icons = { thinking: BrainCircuit, dialogue: MessagesSquare, strategy: Crown };

export default function RoundDetails({ round }: { round: ChallengeRound; }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const Icon = icons[round.theme];
  const titleId = `round-rules-title-${round.id}`;
  const dialogId = `round-rules-${round.id}`;

  useEffect(() => {
    const modal = dialog.current;
    if (!open || !modal) return;
    const opener = trigger.current;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    modal.showModal();
    modal.scrollTo({ top: 0, behavior: "instant" });
    heading.current?.focus({ preventScroll: true });
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return <>
    <button ref={trigger} type="button" className={`round-know-more round-theme-${round.theme}`} aria-label={`Know more about Round ${round.id}`} aria-haspopup="dialog" aria-controls={dialogId} onClick={() => setOpen(true)}><Icon size={19} aria-hidden="true" /><span>Know more</span><ArrowUpRight size={16} aria-hidden="true" /></button>
    <dialog ref={dialog} id={dialogId} className={`reward-dialog round-rules-dialog round-theme-${round.theme}`} aria-labelledby={titleId} data-lenis-prevent
      onCancel={event => { event.preventDefault(); setOpen(false); }} onClose={() => setOpen(false)}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false);
      }}>
      {open && <>
        <div className="round-rules-toolbar"><p>Round {round.id} <span>/ Rules &amp; guidelines</span></p><button type="button" className="icon-button" aria-label={`Close Round ${round.id} rules`} onClick={() => setOpen(false)}><X size={20} /></button></div>
        <div className="round-rules-hero"><div className="round-rules-symbol" aria-hidden="true"><Icon strokeWidth={1.2} /></div><p>{round.category}</p><h2 id={titleId} ref={heading} tabIndex={-1}>{round.title}<span>.</span></h2></div>
        <dl className="round-rules-list">{round.rules.map(rule => <div key={rule.label} className={rule.label === "Strict Proctoring" ? "round-rule-important" : undefined}><dt>{rule.label}</dt><dd>{rule.value}{rule.note && <strong className="round-rule-note">{rule.note}</strong>}</dd></div>)}</dl>
        <div className="reward-dialog-footer"><button type="button" className="prize-details-trigger" onClick={() => setOpen(false)}>Back to the challenge<ArrowUpRight size={15} aria-hidden="true" /></button></div>
      </>}
    </dialog>
  </>;
}
