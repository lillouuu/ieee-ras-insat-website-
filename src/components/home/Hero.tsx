import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { media } from "@/content/site";
import { KineticHeadline } from "@/components/site/motion-bits";
import { RasLink } from "@/components/site/RasButton";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);
  const videoRotate = useTransform(scrollYProgress, [0, 1], reduce ? [-3, -3] : [-3, 6]);
  const titleX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const [pt, setPt] = useState({ x: 0, y: 0, on: false });
  const sx = useSpring(pt.x, { stiffness: 300, damping: 30 });
  const sy = useSpring(pt.y, { stiffness: 300, damping: 30 });
  sx.set(pt.x); sy.set(pt.y);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setPt({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
      }}
      onPointerLeave={() => setPt((p) => ({ ...p, on: false }))}
      className="relative min-h-[100svh] overflow-hidden bg-paper blueprint-grid pt-28 text-ink"
    >
      {/* Robot-vision target tracker — the unexpected detail */}
      {!reduce && (
        <motion.div aria-hidden style={{ x: sx, y: sy, opacity: pt.on ? 1 : 0 }} className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block">
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div className="relative size-16 border-2 border-crimson">
              <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-crimson" />
            </div>
            <span className="absolute left-10 top-8 whitespace-nowrap bg-crimson px-1.5 py-0.5 label-mono !text-[0.6rem] text-paper">
              TARGET x:{Math.round(pt.x)} y:{Math.round(pt.y)}
            </span>
          </div>
        </motion.div>
      )}

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-24 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="label-mono">
            <span className="mr-2 inline-block size-2 animate-pulse bg-crimson" />IEEE RAS · INSAT Student Branch Chapter · Tunis
          </motion.p>
          <motion.div style={{ x: titleX }}>
            <KineticHeadline
              as="h1"
              text="Engineering Intelligence."
              className="mt-6 font-display text-[clamp(3rem,9vw,8.5rem)] font-extrabold leading-[0.88] tracking-tight"
            />
            <KineticHeadline
              as="h2"
              delay={0.3}
              text="Building what's next."
              className="font-serif text-[clamp(2.6rem,7.5vw,7rem)] italic leading-[0.95] text-ieee"
            />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 max-w-lg text-lg">
            A community of INSAT students who design, code and build robots — and compete with them, nationally and internationally.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-10 flex flex-wrap gap-4">
            <RasLink to="/impact" variant="ink">Explore our impact</RasLink>
            <RasLink to="/join">Join us</RasLink>
          </motion.div>
        </div>

        <motion.div style={{ y: videoY, rotate: videoRotate }} className="relative lg:col-span-5 lg:mt-10">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.7, 0, 0.2, 1] }}
            className="relative border-2 border-ink bg-ink p-2 shadow-offset-lg"
          >
            <video src={media.heroVideo} poster={media.heroPoster} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" aria-label="Arduino board on a workshop table while members work in the background" />
            <div className="flex items-center justify-between px-1 pt-2 label-mono !text-[0.6rem] text-paper">
              <span>Workshop footage · INSAT</span><span className="text-amber">IEEE RAS</span>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 8 }} transition={{ delay: 1.4, type: "spring" }} className="absolute -left-6 -top-6 border-2 border-ink bg-amber px-3 py-2 shadow-offset label-mono font-bold">
            Since day one: build it.
          </motion.div>
        </motion.div>
      </div>

      <a href="#who" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 label-mono" aria-label="Scroll to Who we are">
        Scroll
        <span className="relative h-10 w-5 border-2 border-ink">
          <motion.span animate={{ y: [2, 20, 2] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute left-1/2 top-0 h-2 w-1 -translate-x-1/2 bg-ink" />
        </span>
      </a>
    </section>
  );
}
