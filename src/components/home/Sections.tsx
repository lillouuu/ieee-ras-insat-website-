import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { domains, media, milestones, partners, photos, projects, stats } from "@/content/site";
import { Counter, KineticHeadline, ScrollHighlight, SectionTag, ToConfirm } from "@/components/site/motion-bits";
import { RasLink } from "@/components/site/RasButton";
import { PhotoCollage, type CollageItem } from "@/components/site/PhotoCollage";
import { Schematic } from "@/components/site/Schematic";
import { cn } from "@/lib/utils";

/* 02 — WHO WE ARE */
export function WhoWeAre() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <section id="who" className="border-y-2 border-ink bg-card py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <SectionTag n="02">Who we are</SectionTag>
          <ScrollHighlight
            className="mt-8 font-display text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-[1.1]"
            text="We share knowledge, build real projects and leave a footprint in robotics — a cohesive community of INSAT students who turn ideas into machines."
          />
          <p className="mt-8 max-w-md text-muted-foreground">
            As part of the international IEEE Robotics and Automation Society, our members practise their technical skills and bring their ideas to life through projects, training and competitions.
          </p>
          <RasLink to="/about" variant="paper" className="mt-8">More about us</RasLink>
        </div>
        <div
          className="relative [perspective:1000px]"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 10 });
          }}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <motion.div animate={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} className="relative">
            <motion.img
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              whileInView={{ clipPath: "circle(75% at 50% 50%)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              src={photos.teamGroup.src} alt={photos.teamGroup.alt} loading="lazy"
              className="aspect-[4/3] w-full border-2 border-ink object-cover shadow-offset-lg"
            />
            <div className="absolute -bottom-6 -right-4 rotate-3 border-2 border-ink bg-purple px-4 py-3 text-paper shadow-offset">
              <p className="label-mono">Part of</p>
              <p className="font-display text-xl font-bold">IEEE RAS worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* 03 — NUMBERS */
export function Numbers() {
  const tones = ["bg-amber text-ink", "bg-ieee text-paper", "bg-crimson text-paper"];
  return (
    <section className="relative overflow-hidden bg-navy py-28 text-paper blueprint-grid">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTag n="03" className="text-amber">The chapter in numbers</SectionTag>
        <div className="mt-14 grid gap-6 md:grid-cols-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 2 : i === 2 ? -1.5 : 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
              className={cn(
                "relative border-2 border-paper p-8 shadow-[8px_8px_0_0_var(--paper)]",
                tones[i],
                i === 0 && "md:col-span-7 md:row-span-2",
                i === 1 && "md:col-span-5 md:mt-12",
                i === 2 && "md:col-span-5 md:-ml-10",
              )}
            >
              <div className="flex items-start justify-between label-mono"><span>/0{i + 1}</span>{s.toConfirm && <ToConfirm />}</div>
              <Counter to={s.value} prefix={s.prefix} className={cn("mt-4 block font-display font-extrabold leading-none tracking-tighter", i === 0 ? "text-[clamp(6rem,16vw,14rem)]" : "text-[clamp(4rem,9vw,7rem)]")} />
              <p className="mt-2 font-serif text-4xl italic">{s.label}</p>
              <p className="mt-2 max-w-xs text-sm opacity-80">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 04 — TECHNICAL UNIVERSE */
export function TechUniverse() {
  const [active, setActive] = useState(0);
  const d = domains[active]!;
  return (
    <section className="bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTag n="04">Our technical universe</SectionTag>
        <KineticHeadline text="Five fields. One machine." className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-none tracking-tight" />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="border-t-2 border-ink lg:col-span-7" role="tablist" aria-label="Technical domains">
            {domains.map((dm, i) => (
              <li key={dm.slug} className="border-b-2 border-ink">
                <button
                  type="button" role="tab" aria-selected={active === i}
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  className={cn("group flex w-full items-baseline gap-5 px-2 py-5 text-left transition-colors", active === i ? "bg-ink text-paper" : "hover:bg-muted")}
                >
                  <span className={cn("label-mono", active === i && "text-amber")}>{dm.code}</span>
                  <span className="font-display text-[clamp(1.4rem,2.8vw,2.4rem)] font-bold leading-tight transition-transform group-hover:translate-x-2">{dm.name}</span>
                  <span className="ml-auto hidden label-mono opacity-60 md:inline">{dm.short}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5">
            <div className="sticky top-28 border-2 border-ink bg-card shadow-offset-lg">
              <div className="flex items-center justify-between border-b-2 border-ink bg-ieee px-4 py-2 label-mono text-paper">
                <span>DOMAIN_{d.code}</span><span>{d.short}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={d.slug} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-6">
                  <div className="mx-auto aspect-square max-w-[16rem] text-ieee"><Schematic shape={d.shape} /></div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{d.name}</h3>
                  <p className="mt-3 text-muted-foreground">{d.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 05 — PROJECTS: pinned horizontal scroll */
export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);
  const tones = ["bg-amber", "bg-gold", "bg-card"];
  const panels = projects.map((p, i) => (
    <article key={p.name} className={cn("flex w-full shrink-0 flex-col justify-between border-2 border-ink p-8 shadow-offset-lg md:p-12 lg:w-screen lg:max-w-none lg:border-0 lg:shadow-none", tones[i])}>
      <div className="flex flex-wrap items-center justify-between gap-3 label-mono">
        <span>Project 0{i + 1} / 0{projects.length}</span>
        <span className="border-2 border-ink px-2 py-1">{p.domain}</span>
      </div>
      <div className="my-10 grid items-end gap-10 lg:grid-cols-2">
        <div>
          <p className="label-mono">{p.context}</p>
          <h3 className="mt-3 font-display text-[clamp(3.5rem,11vw,10rem)] font-extrabold leading-[0.85] tracking-tighter">{p.name}</h3>
        </div>
        <div>
          <p className="text-lg">{p.body}</p>
          {p.resultsToConfirm && <p className="mt-4 label-mono opacity-70">Chapter results &amp; photos: to be supplied</p>}
          <RasLink to="/impact" variant="ink" className="mt-6">See in Impact</RasLink>
        </div>
      </div>
      <div className="h-2 w-full border-2 border-ink"><div className="h-full bg-ink" style={{ width: `${((i + 1) / projects.length) * 100}%` }} /></div>
    </article>
  ));
  return (
    <section ref={ref} className={cn("relative border-y-2 border-ink", !reduce && "lg:h-[300vh]")}>
      <div className={cn(!reduce && "lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden")}>
        <div className="mx-auto max-w-7xl px-6 pt-20 lg:absolute lg:left-1/2 lg:top-24 lg:z-10 lg:w-full lg:-translate-x-1/2 lg:pt-0">
          <SectionTag n="05">Our work — competitions</SectionTag>
        </div>
        <motion.div style={reduce ? {} : { x }} className="flex flex-col gap-8 px-6 py-10 lg:h-full lg:w-[300vw] lg:flex-row lg:gap-0 lg:p-0 lg:pt-36">
          {panels}
        </motion.div>
      </div>
    </section>
  );
}

/* 06 — TIMELINE */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.5"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="bg-card py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTag n="06">Our journey</SectionTag>
        <KineticHeadline text="Recognised, year after year." className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-tight" />
        <div ref={ref} className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-muted md:left-1/2" />
          <motion.div style={{ height: h }} className="absolute left-4 top-0 w-0.5 bg-crimson md:left-1/2" />
          <ol className="space-y-16">
            {milestones.map((m, i) => (
              <motion.li
                key={m.title}
                initial={{ opacity: 0, x: i % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ type: "spring", stiffness: 70 }}
                className={cn("relative grid gap-6 pl-12 md:grid-cols-2 md:pl-0", i % 2 && "md:[&>*:first-child]:order-2")}
              >
                <span className="absolute left-4 top-3 size-4 -translate-x-1/2 rotate-45 border-2 border-ink bg-amber md:left-1/2" />
                <div className={cn("md:px-10", i % 2 ? "md:text-left" : "md:text-right")}>
                  <p className="font-display text-6xl font-extrabold text-ieee">{m.year}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{m.title}</h3>
                  <p className="mt-2 text-muted-foreground">{m.body}</p>
                  {m.toConfirm && <ToConfirm className="mt-3" />}
                </div>
                <div className="md:px-10">
                  {m.image && (
                    <img src={m.image} alt={`Certificate: ${m.title}`} loading="lazy" className={cn("w-full max-w-sm border-2 border-ink bg-paper shadow-offset transition-transform hover:rotate-0 hover:scale-105", i % 2 ? "rotate-2" : "-rotate-2")} />
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 07 — NATIONAL ROBOTICS WEEK */
export function RoboticsWeek() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  return (
    <section ref={ref} className="overflow-hidden border-y-2 border-ink bg-purple py-28 text-paper">
      <motion.p style={{ x: x1 }} aria-hidden className="whitespace-nowrap font-display text-[clamp(4rem,14vw,12rem)] font-extrabold leading-none tracking-tighter opacity-20">
        NATIONAL ROBOTICS WEEK · NATIONAL ROBOTICS WEEK ·
      </motion.p>
      <div className="mx-auto -mt-10 grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionTag n="07" className="text-gold">Flagship initiative</SectionTag>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-none">National Robotics Week</h2>
          <p className="mt-6 max-w-md text-paper/85">
            Our flagship event: challenges and competitions, workshops, a forum and keynotes — bringing the robotics community together at INSAT.
          </p>
          <p className="mt-3 label-mono text-gold">Edition dates, speakers & photos: to be supplied</p>
          <RasLink to="/events" variant="primary" className="mt-8">Discover our events</RasLink>
        </div>
        <motion.div initial={{ rotate: -8, scale: 0.9, opacity: 0 }} whileInView={{ rotate: -3, scale: 1, opacity: 1 }} viewport={{ once: true }} className="border-2 border-ink bg-paper p-8 shadow-offset-lg">
          <img src={media.nrwLogo} alt="National Robotics Week logo" loading="lazy" className="w-full" />
          <ul className="mt-6 grid grid-cols-2 gap-2 label-mono text-ink">
            {["Challenges", "Workshops", "Forum", "Keynotes"].map((t) => <li key={t} className="border-2 border-ink px-2 py-2 text-center">{t}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* 08 — COMMUNITY */
const collage: CollageItem[] = [
  { ...photos.ss1, x: 2, y: 4, w: 40, rotate: -4, drift: 50 },
  { ...photos.ieeeday, x: 36, y: 0, w: 26, rotate: 5, drift: 80 },
  { ...photos.tb5, x: 60, y: 8, w: 36, rotate: -2, drift: 30 },
  { ...photos.ss2, x: 8, y: 46, w: 34, rotate: 3, drift: 60 },
  { ...photos.tb1, x: 38, y: 40, w: 30, rotate: -6, drift: 90 },
  { ...photos.raspberry, x: 64, y: 50, w: 32, rotate: 4, drift: 40 },
  { ...photos.tb8, x: 26, y: 70, w: 26, rotate: 2, drift: 70 },
];
export function Community() {
  return (
    <section className="bg-amber py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag n="08">Our community</SectionTag>
            <KineticHeadline text="Not just robots. The people who build them." className="mt-6 max-w-4xl font-display text-[clamp(2.3rem,5.5vw,5rem)] font-extrabold leading-none tracking-tight" />
          </div>
          <p className="max-w-xs label-mono">Hover to lift · click to open</p>
        </div>
        <PhotoCollage items={collage} className="mt-16 aspect-[4/5] sm:aspect-[16/12] lg:aspect-[16/10]" />
      </div>
    </section>
  );
}

/* 09 — PARTNERS */
export function Partners() {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTag n="09">Partners & collaborations</SectionTag>
        <div className="mt-10 overflow-hidden border-y-2 border-ink py-8">
          {partners.length > 0 ? (
            <div className="flex w-max marquee gap-16">
              {[...partners, ...partners].map((p, i) => <img key={i} src={p.logo} alt={p.name} className="h-12 w-auto grayscale transition hover:grayscale-0" />)}
            </div>
          ) : (
            <p className="text-center font-serif text-3xl italic text-muted-foreground">Partner logos coming soon — official list being confirmed.</p>
          )}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl text-lg">Support the next generation of Tunisian robotics engineers — through events, competitions, training or equipment.</p>
          <RasLink to="/partners" variant="blue">Partner with us</RasLink>
        </div>
      </div>
    </section>
  );
}

/* 10 — JOIN */
const verbs = ["Learn.", "Build.", "Experiment.", "Compete.", "Collaborate.", "Lead."];
export function JoinCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-paper">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <img src={photos.tb12.src} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTag n="10" className="text-amber">Join us</SectionTag>
        <KineticHeadline text="Your next big idea could start here." className="mt-8 max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.9] tracking-tight" />
        <ul className="mt-10 flex flex-wrap gap-3">
          {verbs.map((v, i) => (
            <motion.li key={v} initial={{ opacity: 0, y: 20, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 3 : -3 }} whileHover={{ rotate: 0, scale: 1.1 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.08 }}
              className="border-2 border-paper bg-paper px-4 py-2 font-serif text-2xl italic text-ink odd:bg-amber"
            >{v}</motion.li>
          ))}
        </ul>
        <div className="mt-14 flex flex-wrap gap-4">
          <RasLink to="/join" className="!px-8 !py-5 !text-base">Join IEEE RAS INSAT</RasLink>
          <RasLink to="/contact" variant="paper">Ask us a question</RasLink>
        </div>
      </div>
    </section>
  );
}
