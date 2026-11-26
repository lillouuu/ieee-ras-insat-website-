import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Photo } from "@/content/site";
import { cn } from "@/lib/utils";

/** Filterable masonry gallery with keyboard-navigable lightbox. */
export function Gallery({ items }: { items: (Photo & { tag: string })[] }) {
  const tags = ["All", ...Array.from(new Set(items.map((i) => i.tag)))];
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? items : items.filter((i) => i.tag === tag);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % shown.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, shown.length]);
  const cur = open === null ? null : shown[open];
  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
        {tags.map((t) => (
          <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(t)} className={cn("border-2 border-ink px-3 py-2 label-mono", tag === t ? "bg-ink text-paper" : "bg-paper hover:bg-amber")}>{t}</button>
        ))}
      </div>
      <motion.div layout className="mt-8 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        <AnimatePresence>
          {shown.map((p, i) => (
            <motion.button layout key={p.src} type="button" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}
              className="group relative block w-full cursor-zoom-in break-inside-avoid overflow-hidden border-2 border-ink bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute bottom-0 left-0 translate-y-full border-r-2 border-t-2 border-ink bg-amber px-2 py-1 label-mono transition-transform group-hover:translate-y-0">{p.caption}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {cur && (
          <motion.div role="dialog" aria-modal="true" aria-label={cur.caption} className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <figure className="max-w-4xl border-2 border-paper bg-paper p-2" onClick={(e) => e.stopPropagation()}>
              <img src={cur.src} alt={cur.alt} className="max-h-[75vh] w-auto object-contain" />
              <figcaption className="flex items-center justify-between gap-4 pt-2">
                <span className="label-mono">{cur.caption}</span>
                <span className="flex gap-2">
                  <button type="button" className="border-2 border-ink px-3 py-1 label-mono hover:bg-amber" onClick={() => setOpen((o) => (o! - 1 + shown.length) % shown.length)} aria-label="Previous photo">←</button>
                  <button type="button" className="border-2 border-ink px-3 py-1 label-mono hover:bg-amber" onClick={() => setOpen((o) => (o! + 1) % shown.length)} aria-label="Next photo">→</button>
                  <button type="button" autoFocus className="border-2 border-ink bg-ink px-3 py-1 label-mono text-paper" onClick={() => setOpen(null)}>Close</button>
                </span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
