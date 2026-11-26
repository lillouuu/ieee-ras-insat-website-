import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Photo } from "@/content/site";
import { cn } from "@/lib/utils";

export type CollageItem = Photo & {
  /** position in % of the collage box */
  x: number; y: number; w: number; rotate: number; drift?: number;
};

function CollagePhoto({ item, i, progress, onOpen, reduce }: { item: CollageItem; i: number; progress: MotionValue<number>; onOpen: () => void; reduce: boolean }) {
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [(item.drift ?? 40), -(item.drift ?? 40)]);
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${item.caption}`}
      style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.w}%`, y, zIndex: i + 1 }}
      initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: item.rotate }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 16 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 40 }}
      whileFocus={{ scale: 1.06, rotate: 0, zIndex: 40 }}
      className="absolute cursor-zoom-in border-2 border-ink bg-card p-1.5 pb-7 shadow-offset focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
    >
      <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <span className="absolute bottom-1.5 left-2 label-mono !text-[0.6rem]">{item.caption}</span>
    </motion.button>
  );
}

export function PhotoCollage({ items, className }: { items: CollageItem[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  const current = open === null ? null : items[open];

  return (
    <>
      <div ref={ref} className={cn("relative", className)}>
        {items.map((item, i) => (
          <CollagePhoto key={item.src + i} item={item} i={i} progress={scrollYProgress} reduce={reduce} onOpen={() => setOpen(i)} />
        ))}
      </div>
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={current.src}
              initial={{ scale: 0.9, rotate: -3 }} animate={{ scale: 1, rotate: 0 }}
              className="relative max-w-4xl border-2 border-paper bg-paper p-2 shadow-offset-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.src} alt={current.alt} className="max-h-[75vh] w-auto object-contain" />
              <figcaption className="flex items-center justify-between gap-4 px-1 pt-2">
                <span className="label-mono">{current.caption}</span>
                <span className="flex gap-2">
                  <button type="button" className="border-2 border-ink px-3 py-1 label-mono hover:bg-amber" onClick={() => setOpen((o) => (o! - 1 + items.length) % items.length)} aria-label="Previous photo">←</button>
                  <button type="button" className="border-2 border-ink px-3 py-1 label-mono hover:bg-amber" onClick={() => setOpen((o) => (o! + 1) % items.length)} aria-label="Next photo">→</button>
                  <button type="button" autoFocus className="border-2 border-ink bg-ink px-3 py-1 label-mono text-paper" onClick={() => setOpen(null)}>Close</button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
