"use client";

import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, RotateCcw, X } from "lucide-react";
import { CLASS_LEVELS, REGISTRATION_PLANS, REGISTRATION_PREVIEW_NOTICE } from "@/lib/registration";

const RegistrationContext = createContext<(() => void) | null>(null);

export function RegistrationTrigger({ className = "", label = "Register now" }: { className?: string; label?: string; }) {
  const open = useContext(RegistrationContext);
  return <button type="button" className={`button ${className}`} onClick={() => open?.()} aria-haspopup="dialog" aria-controls="registration-dialog">{label}<ArrowUpRight size={17} aria-hidden="true" /></button>;
}

/** A small, code-native mascot: a graduate with very little chill. */
function HappyGraduate() {
  return <div className="graduate-scene" aria-hidden="true">
    <div className="graduate-halo" />
    <svg viewBox="0 0 340 290" className="happy-graduate" fill="none">
      <g className="graduate-confetti" strokeWidth="5" strokeLinecap="round">
        <path d="m42 85 7 12m248 29 10-4M78 41l-5-11m196 27 8-8" stroke="#ef5269" />
        <path d="m43 165-10 5m266 29 10 8M114 25l-3-10m130 218 6 11" stroke="#f2dcb5" />
        <path d="m92 218-6 9m215-43 10 1" stroke="#878797" />
        <circle cx="53" cy="126" r="3" fill="#f2dcb5" stroke="none" />
        <circle cx="291" cy="80" r="3" fill="#ef5269" stroke="none" />
      </g>
      <ellipse className="graduate-shadow" cx="172" cy="265" rx="77" ry="10" fill="#000" opacity=".35" />
      <g className="graduate-body">
        <path d="M140 225v28l-20 5m83-33v28l20 5" stroke="#f2dcb5" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M92 162c-24 3-34-12-33-27" stroke="#f2dcb5" strokeWidth="8" strokeLinecap="round" />
        <g className="graduate-wave"><path d="M250 155c28-5 27-21 28-37" stroke="#f2dcb5" strokeWidth="8" strokeLinecap="round" /><path d="m277 122-10-15m11 9 2-18m2 20 12-12" stroke="#f2dcb5" strokeWidth="7" strokeLinecap="round" /></g>
        <path d="M116 81c-32 4-43 33-36 57-15 25 1 55 22 62 9 33 46 40 67 28 26 16 59 6 71-18 34-7 40-47 24-69 10-29-13-54-37-59-19-28-46-30-64-18-19-12-36-4-47 17Z" fill="#f18b9b" stroke="#f8b7c1" strokeWidth="2" />
        <path d="M115 87c-10 16-4 29 7 37m-35 20c12-9 24-4 28 7m116-61c8 11 8 23-2 31m25 30c-13-10-26-5-31 5M170 74v35" stroke="#d86378" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="114" cy="171" rx="15" ry="8" fill="#e76a82" />
        <ellipse cx="227" cy="171" rx="15" ry="8" fill="#e76a82" />
        <g className="graduate-eyes" stroke="#24212a" strokeWidth="7" strokeLinecap="round"><path d="M128 149q10-14 20 0m45 0q10-14 20 0" /></g>
        <path d="M148 177q22 32 46 0" fill="#382832" stroke="#382832" strokeWidth="5" strokeLinejoin="round" />
        <path d="M158 192q14-9 26 0" stroke="#f6b2bc" strokeWidth="7" strokeLinecap="round" />
        <g className="graduate-cap"><path d="m118 72 51-26 56 26v25c-28-10-68-10-107 1Z" fill="#25242c" stroke="#44414c" strokeWidth="2" /><path d="m87 56 82-34 89 34-88 35Z" fill="#33313d" stroke="#585261" strokeWidth="2" /><path d="m171 57 66 6v49" stroke="#eed5a1" strokeWidth="3" /><path d="m232 111 5-7 5 7 2 17h-14Z" fill="#eed5a1" /></g>
      </g>
      <g className="graduate-stamp"><circle cx="253" cy="219" r="28" fill="#ef334b" stroke="#18181d" strokeWidth="6" /><path d="m242 219 8 8 15-17" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></g>
    </svg>
  </div>;
}

function Success({ firstName, close }: { firstName: string; close: () => void; }) {
  const title = useRef<HTMLHeadingElement>(null);
  const [replay, setReplay] = useState(0);
  useEffect(() => { title.current?.focus({ preventScroll: true }); }, []);
  return <div className="registration-success">
    <p className="registration-eyebrow"><Check size={14} />Demo complete</p>
    <HappyGraduate key={replay} />
    <h2 id="registration-title" ref={title} tabIndex={-1}>Done. <span>Nailed it.</span></h2>
    <p className="success-message">Nicely done{firstName ? `, ${firstName}` : ""}.<br />Your brain has entered celebration mode.</p>
    <button type="button" className="encore-button" onClick={() => setReplay(replay + 1)}><RotateCcw size={14} />One more happy dance</button>
    <button type="button" className="button success-done" onClick={close}>Back to the Olympiad<ArrowRight size={17} /></button>
    <p className="registration-preview-note" id="registration-description">This was a demo. Your details haven’t been sent or saved, and no payment was taken.</p>
  </div>;
}

export function RegistrationProvider({ children }: { children: ReactNode; }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [firstName, setFirstName] = useState("");

  const close = () => { setIsOpen(false); setFirstName(""); };
  const open = () => {
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setComplete(false);
    setFirstName("");
    setIsOpen(true);
  };

  useEffect(() => {
    const modal = dialog.current;
    if (!isOpen || !modal) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    modal.showModal();
    modal.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Deliberately no request, storage or payment: this is the requested UI demo.
    const data = new FormData(event.currentTarget);
    setFirstName(String(data.get("fullName") ?? "").trim().split(/\s+/)[0]);
    setComplete(true);
    dialog.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  return <RegistrationContext.Provider value={open}>{children}
    <dialog ref={dialog} id="registration-dialog" className={`registration-dialog${complete ? " is-complete" : ""}`} aria-labelledby="registration-title" aria-describedby="registration-description" data-lenis-prevent
      onCancel={event => { event.preventDefault(); close(); }} onClose={close}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
      }}>
      {isOpen && <>
        <div className="registration-toolbar"><button type="button" className="registration-close icon-button" onClick={close} aria-label="Close registration"><X size={20} /></button></div>
        {complete ? <Success firstName={firstName} close={close} /> : <div className="registration-layout">
          <aside className="registration-aside">
            <p className="registration-eyebrow"><span />Woxsen National<br />Olympiad 2027</p>
            <div><p className="registration-small">Your next big move.</p><h2>Challenge.<br />Compete.<br /><span>Conquer.</span></h2></div>
            <div className="registration-orbit" aria-hidden="true"><i /><i /><span>’27</span></div>
            <p className="registration-aside-date">27–28 January 2027<span>Woxsen University · Hyderabad</span></p>
          </aside>
          <div className="registration-main">
            <div className="registration-heading"><p className="registration-eyebrow">Woxsen National Olympiad 2027</p><h2 id="registration-title">Registrations<span>.</span></h2><p id="registration-description">Your challenge starts here. All fields are required.</p></div>
            <form className="registration-form" onSubmit={submit}>
              <div className="registration-fields">
                <label className="registration-field">Full Name<input name="fullName" autoComplete="name" placeholder="Full Name" required maxLength={100} pattern=".*\S.*" title="Enter your full name." /></label>
                <label className="registration-field">Email Address<input name="email" type="email" autoComplete="email" placeholder="Email" required maxLength={254} /></label>
                <label className="registration-field">Current Class / Level<select name="level" required defaultValue=""><option value="" disabled>--Select--</option>{CLASS_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}</select></label>
                <label className="registration-field">WhatsApp Number<span className="registration-phone"><span className="registration-country">India +91</span><input name="whatsapp" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="WhatsApp Number" required pattern="[0-9]{10}" minLength={10} maxLength={10} title="Enter a 10-digit WhatsApp number, without +91." /></span></label>
              </div>
              <fieldset className="registration-plans"><legend>Choose Registration Plan</legend><div>{REGISTRATION_PLANS.map(plan => <label className="registration-plan" key={plan.id}>
                <input type="radio" name="plan" value={plan.id} required />
                <span className="plan-card"><span className="plan-line"><strong>₹{plan.price}<span> – {plan.name}</span></strong><span className="plan-check"><Check size={12} /></span></span><span className="plan-description">{plan.description}</span></span>
              </label>)}</div></fieldset>
              <label className="registration-field">Name of School / College<input name="institution" autoComplete="organization" placeholder="Name of the School/College" required maxLength={200} pattern=".*\S.*" title="Enter the name of your school or college." /></label>
              <div className="registration-fields"><label className="registration-field">State<input name="state" autoComplete="address-level1" placeholder="State" required maxLength={100} pattern=".*\S.*" title="Enter your state." /></label><label className="registration-field">City<input name="city" autoComplete="address-level2" placeholder="City" required maxLength={100} pattern=".*\S.*" title="Enter your city." /></label></div>
              <button type="submit" className="button registration-submit">SUBMIT<ArrowRight size={18} /></button>
              <p className="registration-preview-note">{REGISTRATION_PREVIEW_NOTICE}</p>
            </form>
          </div>
        </div>}
      </>}
    </dialog>
  </RegistrationContext.Provider>;
}
