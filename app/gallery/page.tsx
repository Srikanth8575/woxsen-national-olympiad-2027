"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./gallery.module.css";
import photos from "./photos.json";
import Ambient from "@/components/site/ambient";

export default function Gallery() {
  const [year, setYear] = useState<"2025" | "2026">("2025");
  const [yearDirection, setYearDirection] = useState(1);
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const photoGrid = useRef<HTMLElement>(null);
  const galleryHeader = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = hero.current;
    if (!element) return;
    let frame = 0;
    let heroTop = 0;
    let height = 1;
    let fadeEnd = 1;
    const measure = () => {
      const current = hero.current;
      if (!current) return;
      heroTop = current.getBoundingClientRect().top + window.scrollY;
      height = current.offsetHeight;
      const photosTop = photoGrid.current ? photoGrid.current.getBoundingClientRect().top + window.scrollY : heroTop + height;
      fadeEnd = Math.max(1, photosTop - heroTop - (galleryHeader.current?.offsetHeight ?? 0));
    };
    const update = () => {
      frame = 0;
      const element = hero.current;
      if (!element) return;
      const distance = Math.max(0, window.scrollY - heroTop);
      const progress = Math.min(1, distance / fadeEnd);
      const fade = Math.max(0, Math.min(1, (progress - .25) / .75));
      const opacity = distance >= fadeEnd ? 0 : reducedMotion ? 1 : 1 - fade * fade * (3 - 2 * fade);
      element.style.setProperty("--hero-opacity", String(opacity));
      element.style.setProperty("--hero-offset", `${reducedMotion ? 0 : Math.min(distance, height) * .7}px`);
      element.style.setProperty("--hero-grayscale", String(reducedMotion ? 0 : fade));
      element.style.setProperty("--hero-blur", `${reducedMotion ? 0 : 12 * Math.max(0, Math.min(1, (progress - .08) / .2))}px`);
      element.style.setProperty("--hero-shadow", String(reducedMotion ? 1 : 1 - progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); schedule(); };
    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);
  const collection = Array.from({ length: 30 }, (_, index) => ({
    ...photos[year][index % photos[year].length],
    shape: index % 7 === 0 || index % 7 === 6 ? "wide" : "square",
  }));
  const move = (direction: number) => setSelected(current => (current + direction + collection.length) % collection.length);
  const mobileYears = <div className={styles.mobileYears} role="tablist" aria-label="Olympiad year">{(["2025", "2026"] as const).map(value => <button key={value} role="tab" aria-selected={year === value} aria-controls="year-photos" onClick={() => { if (value === year) return; setYearDirection(value > year ? 1 : -1); setYear(value); setSelected(0); }}>{year === value && <motion.span className={styles.yearGlass} layoutId="gallery-mobile-year-glass" transition={{ duration: reducedMotion ? 0 : .4 }} aria-hidden="true" />}<span className={styles.yearLabel}>{value}</span></button>)}</div>;

  return <main className={styles.page}>
    <header ref={galleryHeader} className={styles.header}>
      <Link href="/" aria-label="Woxsen Olympiad home"><Image src="/logo/woxsen-logo.svg" alt="Woxsen University" width={150} height={69} unoptimized /></Link>
      <div className={styles.years} role="tablist" aria-label="Olympiad year">{(["2025", "2026"] as const).map(value => <button key={value} id={`year-${value}`} role="tab" aria-selected={year === value} aria-controls="year-photos" onClick={() => { if (value === year) return; setYearDirection(value > year ? 1 : -1); setYear(value); setSelected(0); }}>{year === value && <motion.span className={styles.yearGlass} layoutId="gallery-year-glass" transition={{ duration: reducedMotion ? 0 : .4, ease: [.25,.8,.25,1] }} aria-hidden="true" />}<span className={styles.yearLabel}>{value}</span></button>)}</div>
      <Link className={styles.back} href="/"><ArrowLeft size={18} /> Back to Olympiad</Link>
    </header>
    <AnimatePresence initial={false} mode="wait" custom={yearDirection} onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}>
    <motion.div key={year} custom={yearDirection} onAnimationStart={() => window.dispatchEvent(new Event("resize"))} onAnimationComplete={() => window.dispatchEvent(new Event("resize"))} variants={{ enter: (direction: number) => ({ x: reducedMotion ? 0 : direction * 64, opacity: 0 }), visible: { x: 0, opacity: 1 }, exit: (direction: number) => ({ x: reducedMotion ? 0 : -direction * 64, opacity: 0 }) }} initial="enter" animate="visible" exit="exit" transition={{ duration: reducedMotion ? 0 : .38, ease: [.25,.8,.25,1] }}>
    <div ref={hero} className={`${styles.storyBackdrop} ${year === "2026" ? styles.national : ""}`}>
      {mobileYears}
      <div className={styles.heroScrollLayer}>
      <div className={styles.heroAmbient}><Ambient /></div>
      <div className={styles.heroLayer}>
      <Image src={year === "2025" ? "/gallery/backdrops/sunset-2025.jpg" : "/gallery/backdrops/sports-2026.jpg"} alt={year === "2025" ? "Woxsen University campus at sunset" : "Woxsen University sports facilities at night"} fill sizes="100vw" preload />
      <h1 className={styles.heroTitle}><span className={styles.titleBrand}>Woxsen&apos;s</span><span className={styles.titleEvent}>{year === "2025" ? "Olympiad" : "National Olympiad"}</span><span className={styles.titleEdition}>{year} <span>Gallery</span></span></h1>
      </div>
      </div>
    </div>
    <section ref={photoGrid} id="year-photos" role="tabpanel" aria-labelledby={`year-${year}`} className={styles.grid} key={year}>
      {[0, 1, 2].map(group => <div className={styles.mosaic} key={group}>
        {collection.slice(group * 10, group * 10 + 10).map((photo, tile) => {
          const index = group * 10 + tile;
          return <button className={`${styles.photo} ${styles[`tile${tile}`]}`} key={`${photo.src}-${index}`} aria-label={`Open photo ${index + 1}: ${photo.title}`} onClick={() => { setSelected(index); dialog.current?.showModal(); dialog.current?.focus({ preventScroll: true }); }}>
            <Image src={photo.src} alt={photo.title} fill sizes={tile === 2 || tile >= 6 ? "50vw" : "25vw"} />
          </button>;
        })}
      </div>)}
    </section>
    </motion.div>
    </AnimatePresence>
    <dialog ref={dialog} tabIndex={-1} className={styles.viewer} aria-label="Gallery photo" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      event.stopPropagation();
      dialog.current?.focus({ preventScroll: true });
      move(event.key === "ArrowRight" ? 1 : -1);
    }}>
      <button className={styles.close} aria-label="Close photo" title="Close" onClick={() => dialog.current?.close()}><X /></button>
      <div className={`${styles.fullPhoto} ${styles.croppedPhoto}`} style={{ aspectRatio: `${photos["2025"][0].width} / ${photos["2025"][0].height}`, width: `min(100%, ${76 * photos["2025"][0].width / photos["2025"][0].height}svh)` }}>
        <motion.div className={styles.imageStage} key={`${year}-${selected}`} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={reducedMotion ? 0 : .12} dragMomentum={false} dragTransition={{ bounceStiffness: 700, bounceDamping: 55 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : .35 }} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45 || (Math.abs(info.offset.x) > 15 && Math.abs(info.velocity.x) > 400)) move(info.offset.x < 0 ? 1 : -1); }}>
          <Image src={collection[selected].src} alt={collection[selected].title} width={collection[selected].width} height={collection[selected].height} sizes="90vw" draggable={false} />
        </motion.div>
        <button className={`${styles.sideArrow} ${styles.previous}`} aria-label="Previous photo" onClick={() => move(-1)}><ArrowLeft size={28} /></button>
        <button className={`${styles.sideArrow} ${styles.next}`} aria-label="Next photo" onClick={() => move(1)}><ArrowRight size={28} /></button>
      </div>
      <div className={styles.photoDots} role="group" aria-label="Choose gallery photo"><AnimatePresence initial={false} mode="popLayout">{[-3, -2, -1, 0, 1, 2, 3].map(offset => {
        const target = (selected + offset + collection.length) % collection.length;
        return <motion.button layout key={target} initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .5 }} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }} aria-label={`Photo ${target + 1}`} aria-pressed={offset === 0} onClick={() => setSelected(target)}><motion.span animate={{ scale: 1 - Math.abs(offset) * .18, opacity: offset === 0 ? 1 : .7 - Math.abs(offset) * .13 }} transition={{ duration: reducedMotion ? 0 : .35 }} /></motion.button>;
      })}</AnimatePresence></div>
    </dialog>
  </main>;
}
