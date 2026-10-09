"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import styles from "./gallery.module.css";
import photos from "./photos.json";

export default function Gallery() {
  const [year, setYear] = useState<"2025" | "2026">("2025");
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const collection = Array.from({ length: 30 }, (_, index) => ({
    ...photos[year][index % photos[year].length],
    shape: index % 7 === 0 || index % 7 === 6 ? "wide" : "square",
  }));
  const move = (direction: number) => setSelected(current => (current + direction + collection.length) % collection.length);

  return <main className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="Woxsen Olympiad home"><Image src="/logo/woxsen-logo.svg" alt="Woxsen University" width={150} height={69} unoptimized /></Link>
      <Link className={styles.back} href="/"><ArrowLeft size={18} /> Back to Olympiad</Link>
    </header>
    <div className={styles.heading}><p>Woxsen National Olympiad</p><h1>GALLERY</h1><span>{collection.length} moments from {year}</span></div>
    <div className={styles.years} role="tablist" aria-label="Olympiad year">{(["2025", "2026"] as const).map(value => <button key={value} id={`year-${value}`} role="tab" aria-selected={year === value} aria-controls="year-photos" onClick={() => { setYear(value); setSelected(0); }}>{value}</button>)}</div>
    <section id="year-photos" role="tabpanel" aria-labelledby={`year-${year}`} className={styles.grid} key={year}>
      {collection.map((photo, index) => <button className={`${styles.photo} ${styles[photo.shape]}`} key={`${photo.src}-${index}`} aria-label={`Open photo ${index + 1}: ${photo.title}`} onClick={() => { setSelected(index); dialog.current?.showModal(); }}>
        <Image src={photo.src} alt={photo.title} fill sizes={photo.shape === "wide" ? "(max-width: 599px) 64vw, 60vw" : "(max-width: 599px) 32vw, 30vw"} />
      </button>)}
    </section>
    <dialog ref={dialog} className={styles.viewer} aria-label="Gallery photo" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); }}>
      <button className={styles.close} aria-label="Close photo" title="Close" onClick={() => dialog.current?.close()}><X /></button>
      <div className={styles.fullPhoto} key={`${year}-${selected}`}><Image src={collection[selected].src} alt={collection[selected].title} fill sizes="90vw" /></div>
      <div className={styles.viewerControls}><button aria-label="Previous photo" title="Previous photo" onClick={() => move(-1)}><ArrowLeft /></button><p aria-live="polite">{selected + 1} / {collection.length}</p><button aria-label="Next photo" title="Next photo" onClick={() => move(1)}><ArrowRight /></button></div>
    </dialog>
  </main>;
}
