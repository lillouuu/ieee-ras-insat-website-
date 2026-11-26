import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { PageHero, Block, H2 } from "@/components/site/PageHero";
import { KineticHeadline, ScrollHighlight, SectionTag, ToConfirm } from "@/components/site/motion-bits";
import { RasLink, RasAnchor } from "@/components/site/RasButton";
import { Schematic } from "@/components/site/Schematic";
import { domains, photos } from "@/content/site";
import { extraMedia, history, morePhotos, currentBoard, pastBoard, structure } from "@/content/pages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IEEE RAS INSAT" },
      { name: "description", content: "The story of IEEE RAS INSAT since March 2015: our mission, our place in IEEE, our history, our team and the technical domains we explore." },
      { property: "og:title", content: "About — IEEE RAS INSAT" },
      { property: "og:description", content: "The story of IEEE RAS INSAT since March 2015: mission, history, team and technical domains." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const toneBg = { ieee: "bg-ieee text-paper", amber: "bg-amber text-ink", crimson: "bg-crimson text-paper", purple: "bg-purple text-paper", navy: "bg-navy text-paper" };

function About() {
  return (
    <>
      <PageHero n="01" label="About" title="Builders since March 2015." intro="IEEE Robotics and Automation Society — INSAT Student Branch Chapter. A community of students who learn by building, and build to compete." tone="navy">
        <div className="mt-10 flex flex-wrap gap-2 label-mono">
          {["Who we are", "Mission", "IEEE & RAS", "History", "Team", "Domains"].map((s, i) => (
            <a key={s} href={`#s${i}`} className="border-2 border-paper px-3 py-2 hover:bg-amber hover:text-ink">{s}</a>
          ))}
        </div>
      </PageHero>
      <WhoWeAre />
      <Mission />
      <IeeeRas />
      <History />
      <Team />
      <Domains />
    </>
  );
}

function WhoWeAre() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section id="s0" ref={ref} className="scroll-mt-28 border-b-2 border-ink bg-card">
      <div className="relative h-[60vh] min-h-[22rem] overflow-hidden border-b-2 border-ink">
        <motion.img style={{ y }} src={morePhotos.chapterGroup.src} alt={morePhotos.chapterGroup.alt} className="absolute inset-0 h-[116%] w-full object-cover" />
        <p className="absolute bottom-4 left-4 border-2 border-ink bg-paper px-3 py-1 label-mono">{morePhotos.chapterGroup.caption}</p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12">
        <SectionTag n="A" className="lg:col-span-3">Who we are</SectionTag>
        <div className="lg:col-span-9">
          <ScrollHighlight className="font-display text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-[1.1]" text="We are INSAT students who believe the best way to learn robotics is to build robots — together, from the first blinking LED to a competition-ready machine." />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <p className="text-muted-foreground">Founded in March 2015, IEEE RAS INSAT shares knowledge, builds real projects and organises events that gather the Tunisian robotics community — from National Robotics Week to the country's first Micromouse competition.</p>
            <p className="text-muted-foreground">In the words of members from our earliest years: when we talk about RAS, we talk about success, hard work, dedication, passion, teamwork — and endless love for what we build.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const values = [
    { k: "Learn by doing", d: "Workshops and training that end with something on the bench, not just slides." },
    { k: "Build for real", d: "Projects that face real constraints: competitions, deadlines, hardware that breaks." },
    { k: "Open the door", d: "Beginners welcome. Seniors teach juniors. Knowledge stays in the chapter." },
    { k: "Reach further", d: "Carry Tunisian student robotics to national and international stages." },
  ];
  return (
    <section id="s1" className="scroll-mt-28 border-b-2 border-ink bg-amber px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTag n="B">Mission & vision</SectionTag>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="label-mono">Mission</p>
            <p className="mt-3 font-serif text-[clamp(2rem,4vw,3.4rem)] italic leading-tight">Give every curious student the tools, team and stage to turn ideas into machines.</p>
          </div>
          <div>
            <p className="label-mono">Vision</p>
            <p className="mt-3 font-serif text-[clamp(2rem,4vw,3.4rem)] italic leading-tight">A reference robotics community in Tunisia, recognised worldwide.</p>
          </div>
        </div>
        <ol className="mt-16 grid border-2 border-ink bg-paper md:grid-cols-4">
          {values.map((v, i) => (
            <motion.li key={v.k} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group border-ink p-6 transition-colors hover:bg-ink hover:text-paper max-md:border-b-2 md:border-r-2 md:last:border-r-0">
              <span className="label-mono text-ieee group-hover:text-amber">0{i + 1}</span>
              <h3 className="mt-3 font-display text-2xl font-bold">{v.k}</h3>
              <p className="mt-2 text-sm opacity-80">{v.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function IeeeRas() {
  const rings = [
    { k: "IEEE", d: "The world's largest technical professional organization, dedicated to advancing technology for the benefit of humanity.", href: "https://www.ieee.org/", logo: extraMedia.ieeeLogo },
    { k: "IEEE RAS", d: "The Robotics and Automation Society advances the theory and practice of robotics and automation engineering and science.", href: "https://www.ieee-ras.org/", logo: extraMedia.rasSocietyLogo },
    { k: "IEEE INSAT SB", d: "Our student branch at INSAT, home to the technical chapters of the school.", href: undefined, logo: undefined },
  ];
  return (
    <Block id="s2" className="bg-paper">
      <SectionTag n="C">IEEE & IEEE RAS</SectionTag>
      <H2 className="mt-6 max-w-3xl">A local chapter of a worldwide network.</H2>
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
          {[100, 74, 48].map((s, i) => (
            <motion.div key={s} initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2, type: "spring" }}
              className={cn("absolute rounded-full border-2 border-ink", ["bg-ieee", "bg-purple", "bg-amber"][i])}
              style={{ inset: `${(100 - s) / 2}%` }} />
          ))}
          <p className="absolute inset-x-0 top-[6%] text-center label-mono text-paper">IEEE</p>
          <p className="absolute inset-x-0 top-[19%] text-center label-mono text-paper">IEEE RAS</p>
          <p className="absolute inset-0 flex items-center justify-center text-center font-display text-2xl font-extrabold">RAS<br />INSAT</p>
        </div>
        <ul className="divide-y-2 divide-ink border-y-2 border-ink">
          {rings.map((r) => (
            <li key={r.k} className="flex gap-5 py-6">
              {r.logo ? <img src={r.logo} alt={`${r.k} logo`} loading="lazy" className="h-14 w-14 shrink-0 border-2 border-ink bg-card object-contain p-1" /> : <span className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-amber label-mono">SB</span>}
              <div>
                <h3 className="font-display text-2xl font-bold">{r.k}</h3>
                <p className="mt-1 text-muted-foreground">{r.d}</p>
                {r.href && <a href={r.href} target="_blank" rel="noreferrer" className="mt-2 inline-block label-mono underline decoration-2 underline-offset-4 hover:text-ieee">Visit {r.k} ↗</a>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  );
}

function History() {
  const [active, setActive] = useState(0);
  const h = history[active]!;
  return (
    <section id="s3" className="scroll-mt-28 border-y-2 border-ink bg-navy px-6 py-24 text-paper blueprint-grid">
      <div className="mx-auto max-w-7xl">
        <SectionTag n="D" className="text-amber">Our history</SectionTag>
        <KineticHeadline text="Eleven years, one direction." className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-tight" />
        <div className="mt-12 overflow-x-auto pb-2">
          <ol className="flex min-w-max border-2 border-paper" role="tablist" aria-label="History timeline">
            {history.map((m, i) => (
              <li key={m.title}>
                <button type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                  className={cn("border-r-2 border-paper px-5 py-4 font-display text-xl font-bold transition-colors", active === i ? "bg-amber text-ink" : "hover:bg-paper/10")}>
                  {m.year}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-2 h-1 bg-paper/20"><motion.div className="h-full bg-amber" animate={{ width: `${((active + 1) / history.length) * 100}%` }} /></div>
        <AnimatePresence mode="wait">
          <motion.article key={h.title} initial={{ opacity: 0, y: 30, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}
            className={cn("mt-10 grid gap-6 border-2 border-paper p-8 shadow-[8px_8px_0_0_var(--paper)] md:grid-cols-[auto_1fr] md:p-12", toneBg[h.tone])}>
            <p className="font-display text-[clamp(4rem,10vw,8rem)] font-extrabold leading-none tracking-tighter">{h.year}</p>
            <div className="self-end">
              <h3 className="font-display text-3xl font-bold">{h.title}</h3>
              <p className="mt-3 max-w-2xl text-lg opacity-90">{h.body}</p>
              {h.toConfirm && <ToConfirm className="mt-4" />}
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="mt-6 flex gap-3">
          <button type="button" className="border-2 border-paper px-4 py-2 label-mono hover:bg-paper hover:text-ink disabled:opacity-30" disabled={active === 0} onClick={() => setActive((a) => a - 1)}>← Earlier</button>
          <button type="button" className="border-2 border-paper px-4 py-2 label-mono hover:bg-paper hover:text-ink disabled:opacity-30" disabled={active === history.length - 1} onClick={() => setActive((a) => a + 1)}>Later →</button>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <Block id="s4" className="bg-card">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTag n="E">Team & leadership</SectionTag>
          <H2 className="mt-6">Run by students, renewed every year.</H2>
          <p className="mt-6 text-muted-foreground">An elected executive board leads the chapter each mandate, supported by members in technical teams and organising committees.</p>
          <div className="mt-8 border-2 border-ink bg-paper">
            <div className="flex items-center justify-between border-b-2 border-ink bg-ieee px-4 py-2 label-mono text-paper"><span>Current board</span><span>{currentBoard.mandate}</span></div>
            <ul className="divide-y divide-ink/30">
              {currentBoard.members.map((m) => (
                <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 transition-colors hover:bg-amber">
                  <span className="font-display text-lg font-bold">{m.name}</span>
                  <span className="label-mono text-muted-foreground">{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <img src={photos.teamGroup.src} alt={photos.teamGroup.alt} loading="lazy" className="mt-8 aspect-[4/3] w-full -rotate-1 border-2 border-ink object-cover shadow-offset" />
        </div>
        <div className="lg:col-span-7">
          <p className="label-mono">Organisational structure</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {structure.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={cn("border-2 border-ink px-3 py-2 font-display font-bold", i < 2 ? "bg-ieee text-paper" : "bg-paper")}>{s}</motion.span>
            ))}
          </div>
          <div className="mt-12 border-2 border-ink">
            <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2 label-mono text-paper"><span>Archive</span><span>Board {pastBoard.mandate}</span></div>
            <ul className="divide-y divide-ink/30">
              {pastBoard.members.map((m) => (
                <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 transition-colors hover:bg-amber">
                  <span className="font-display text-lg font-bold">{m.name}</span>
                  <span className="label-mono text-muted-foreground">{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Past board as listed on the previous chapter website — kept as history, not the current team.</p>
        </div>
      </div>
    </Block>
  );
}

function Domains() {
  const [active, setActive] = useState(0);
  const d = domains[active]!;
  return (
    <section id="s5" className="scroll-mt-28 border-t-2 border-ink bg-paper px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTag n="F">Technical domains</SectionTag>
        <H2 className="mt-6">Pick a field. Start building.</H2>
        <div className="mt-12 grid gap-4 sm:grid-cols-5" role="tablist" aria-label="Technical domains">
          {domains.map((dm, i) => (
            <button key={dm.slug} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
              className={cn("group border-2 border-ink p-4 text-left transition-all", active === i ? "-translate-y-2 bg-ieee text-paper shadow-offset" : "bg-card hover:-translate-y-1")}>
              <div className="mx-auto aspect-square max-w-[6rem]"><Schematic shape={dm.shape} /></div>
              <p className="mt-2 label-mono">{dm.code}</p>
              <p className="font-display font-bold leading-tight">{dm.name}</p>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={d.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 grid gap-6 border-2 border-ink bg-card p-8 md:grid-cols-[1fr_2fr]">
            <p className="font-serif text-4xl italic">{d.short}</p>
            <p className="text-lg">{d.body} AI, automation and control systems run through all of it.</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-12 flex flex-wrap gap-4">
          <RasLink to="/impact">See what we've built</RasLink>
          <RasLink to="/join" variant="paper">Join a team</RasLink>
          <RasAnchor href="https://www.ieee-ras.org/" target="_blank" rel="noreferrer" variant="blue">IEEE RAS worldwide</RasAnchor>
        </div>
      </div>
    </section>
  );
}
