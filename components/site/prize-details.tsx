"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, Clock3, GraduationCap, Info, MapPin, Trophy, X } from "lucide-react";
import { PRIZE_AWARDS, SCHOLARSHIPS } from "@/lib/prizes";
import { REGISTRATION_PLANS, type RegistrationPlanId } from "@/lib/registration";
import { CAMPUS_REGISTRATION, PLAN_NOTE, QUICK_SCHEDULE } from "@/lib/challenge";
import { useRegistration } from "./registration";

const tabs = ["Prizes & scholarships", "Plans & benefits", "Quick schedule"];
const plans = [...REGISTRATION_PLANS].sort((a, b) => a.price - b.price);

export default function PrizeDetails() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const nextPlan = useRef<RegistrationPlanId | null>(null);
  const openRegistration = useRegistration();

  const choosePlan = (plan: RegistrationPlanId) => {
    nextPlan.current = plan;
    setOpen(false);
  };
  const closed = () => {
    setOpen(false);
    const plan = nextPlan.current;
    nextPlan.current = null;
    // Wait for the native close event so this dialog restores scroll/focus first.
    if (plan) openRegistration({ plan, returnFocus: trigger.current });
  };

  useEffect(() => {
    const modal = dialog.current;
    if (!open || !modal) return;
    const opener = trigger.current;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty("overflow", "hidden");
    if (scrollbar > 0) document.body.style.setProperty("padding-right", `${scrollbar}px`);
    modal.showModal();
    modal.scrollTo({ top: 0, behavior: "instant" });
    title.current?.focus({ preventScroll: true });
    return () => {
      modal.close();
      document.body.style.setProperty("overflow", overflow);
      document.body.style.setProperty("padding-right", padding);
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  const select = (index: number) => {
    setActive(index);
    dialog.current?.scrollTo({ top: 0, behavior: "instant" });
  };
  const tabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    select(next);
    dialog.current?.querySelector<HTMLButtonElement>(`#reward-tab-${next}`)?.focus();
  };

  return <>
    <div className="prize-details-action"><button ref={trigger} type="button" className="prize-details-trigger" aria-haspopup="dialog" aria-controls="prize-details-dialog" onClick={() => { setActive(0); setOpen(true); }}>Know more<ArrowUpRight size={15} aria-hidden="true" /></button></div>
    <dialog ref={dialog} id="prize-details-dialog" className="reward-dialog" aria-labelledby="reward-dialog-title" data-lenis-prevent
      onCancel={event => { event.preventDefault(); setOpen(false); }} onClose={closed}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false);
      }}>
      {open && <>
        <div className="reward-dialog-header">
          <div className="reward-dialog-title-row"><div><p className="reward-dialog-eyebrow">Woxsen National Olympiad 2027</p><h2 ref={title} id="reward-dialog-title" tabIndex={-1}>Prizes &amp; plans<span>.</span></h2></div><button type="button" className="icon-button reward-dialog-close" onClick={() => setOpen(false)} aria-label="Close prize details"><X size={20} /></button></div>
          <div className="reward-tabs" role="tablist" aria-label="Explore prizes, registration plans and schedule">{tabs.map((tab, index) => <button key={tab} type="button" id={`reward-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`reward-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => tabKey(event, index)}>{tab}</button>)}</div>
        </div>
        <div className="reward-dialog-content">
          <div id="reward-panel-0" className="reward-panel" role="tabpanel" aria-labelledby="reward-tab-0" hidden={active !== 0} tabIndex={0}>
            <div className="reward-total"><div><p>Prize pool worth</p><h3>₹1 CRORE<span>*</span></h3></div><Trophy size={40} strokeWidth={1.2} aria-hidden="true" /></div>
            <p className="reward-total-note">*Includes cash prizes, scholarships &amp; gifts.</p>
            <div className="reward-awards">{PRIZE_AWARDS.map(award => <article key={award.place} className="reward-award"><p>{award.place}</p><h4>{award.cash}</h4><span>+ {award.gadget}</span></article>)}</div>
            <section className="reward-scholarships" aria-labelledby="scholarships-title"><h3 id="scholarships-title"><GraduationCap size={23} aria-hidden="true" /><span>Woxsen <span>scholarships</span></span></h3><div>{SCHOLARSHIPS.map(scholarship => <article key={scholarship.rank}><p>{scholarship.rank}</p><strong>{scholarship.percentage}</strong><span>Scholarship on Tuition Fees</span></article>)}</div></section>
          </div>
          <div id="reward-panel-1" className="reward-panel" role="tabpanel" aria-labelledby="reward-tab-1" hidden={active !== 1} tabIndex={0}>
            <div className="reward-plans-heading"><h3>Choose your plan</h3><p>Compare what’s included.</p></div>
            <div className="reward-plans">{plans.map(plan => <article key={plan.id} className={`reward-plan${plan.recommended ? " reward-plan-premium" : ""}`} aria-labelledby={`reward-plan-${plan.id}`}>
              <div className="reward-plan-top"><h4 id={`reward-plan-${plan.id}`}>{plan.name}</h4>{plan.recommended && <span className="reward-recommended">Most recommended</span>}</div>
              <p className="reward-plan-price">₹{plan.price}</p>
              <ul>{plan.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              <button type="button" className="reward-plan-select" aria-haspopup="dialog" aria-controls="registration-dialog" onClick={() => choosePlan(plan.id)}>Choose {plan.name} · ₹{plan.price}<ArrowUpRight size={16} aria-hidden="true" /></button>
            </article>)}</div>
            <p className="plan-guest-note"><Info size={18} aria-hidden="true" /><span>{PLAN_NOTE}</span></p>
            <section className="campus-registration" aria-labelledby="campus-registration-title"><h3 id="campus-registration-title"><MapPin size={19} aria-hidden="true" />On-campus registration</h3>
              <div className="campus-registration-dates"><div><p>{CAMPUS_REGISTRATION.opens.date}</p><h4>Registration opens</h4><span><Clock3 size={15} aria-hidden="true" />{CAMPUS_REGISTRATION.opens.time}</span></div><div><p>{CAMPUS_REGISTRATION.closes.date}</p><h4>Registration closes</h4><span><Clock3 size={15} aria-hidden="true" />{CAMPUS_REGISTRATION.closes.time}</span></div></div>
              <p className="campus-registration-notice"><Info size={16} aria-hidden="true" />{CAMPUS_REGISTRATION.notice}</p>
            </section>
          </div>
          <div id="reward-panel-2" className="reward-panel" role="tabpanel" aria-labelledby="reward-tab-2" hidden={active !== 2} tabIndex={0}>
            <div className="reward-plans-heading"><h3>Quick schedule</h3></div>
            <ol className="quick-schedule">{QUICK_SCHEDULE.map(item => <li key={item.event}><p className="schedule-date">{item.date}</p><p className="schedule-event">{item.event}</p></li>)}</ol>
          </div>
        </div>
        <div className="reward-dialog-footer"><button type="button" className="prize-details-trigger" onClick={() => setOpen(false)}>Back to the prize pool<ArrowUpRight size={15} aria-hidden="true" /></button></div>
      </>}
    </dialog>
  </>;
}
