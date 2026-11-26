import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PageHero, Block, H2 } from "@/components/site/PageHero";
import { Counter, KineticHeadline, SectionTag, ToConfirm } from "@/components/site/motion-bits";
import { RasLink } from "@/components/site/RasButton";
import { stats } from "@/content/site";
import { awards, competitions, extraMedia, projectsPortfolio } from "@/content/pages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — IEEE RAS INSAT" },
      { name: "description", content: "Awards, competitions (NXP Cup, EUROBOT, Micromouse), projects and contributions of IEEE RAS INSAT since 2015." },
      { property: "og:title", content: "Impact — IEEE RAS INSAT" },
      { property: "og:description", content: "Awards, competitions, projects and contributions of IEEE RAS INSAT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Impact,
});

const awardYears = new Set(awards.filter((a) => !a.toConfirm).map((a) => a.year)).size;

function Impact() {
  return (
    <>
      <PageHero n="03" label="Impact" title="What we've built, won and started." intro="Recognitions, competitions and projects — with every figure traced back to its source." tone="paper" />
      <Numbers />
      <Portfolio />
      <Awards />
      <Competitions />
      <Research />
      <Beyond />
    </>
  );
}

function Numbers() {
  const verified = [
    { v: 2015, label: "Founded", note: "March 2015", plain: true },
    { v: awards.filter((a) => !a.toConfirm).length, label: "Recorded awards", note: `Cumulative, 2017–2025, across ${awardYears} years` },
    { v: 2, label: "NXP Cup qualifications organised", note: "Two consecutive years" },
    { v: 1, label: "First Micromouse in Tunisia", note: "2026" },
  ];
  return (
    <section className="border-b-2 border-ink bg-navy px-6 py-24 text-paper blueprint-grid">
      <div className="mx-auto max-w-7xl">
        <SectionTag n="A" className="text-amber">Our impact</SectionTag>
        <div className="mt-12 grid gap-px border-2 border-paper bg-paper md:grid-cols-4">
          {verified.map((s) => (
            <div key={s.label} className="bg-navy p-6">
              {s.plain ? <span className="block font-display text-6xl font-extrabold text-amber">{s.v}</span> : <Counter to={s.v} className="block font-display text-6xl font-extrabold text-amber" />}
              <p className="mt-3 font-display text-xl font-bold">{s.label}</p>
              <p className="mt-1 label-mono text-paper/60">{s.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 label-mono text-paper/60">Figures from the current site — cumulative totals, awaiting confirmation</p>
        <div className="mt-4 flex flex-wrap gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3 border-b-2 border-dashed border-paper/40 pb-2">
              <Counter to={s.value} prefix={s.prefix} className="font-display text-4xl font-extrabold" />
              <span className="font-serif text-2xl italic">{s.label}</span>
              {s.toConfirm && <ToConfirm />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const kinds = ["All", "Chapter", "Event", "Project"] as const;
function Awards() {
  const [k, setK] = useState<(typeof kinds)[number]>("All");
  const list = awards.filter((a) => k === "All" || a.kind === k);
  return (
    <Block className="bg-gold">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionTag n="C">Achievements & awards</SectionTag>
          <KineticHeadline text="The trophy shelf." className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-none" />
          <motion.img src={extraMedia.trophy} alt="IEEE RAS INSAT trophy" loading="lazy" initial={{ rotate: -12, y: 40, opacity: 0 }} whileInView={{ rotate: -4, y: 0, opacity: 1 }} viewport={{ once: true }}
            className="mt-10 w-48 border-2 border-ink bg-ink p-2 shadow-offset-lg" />
          <div className="mt-10 flex flex-wrap gap-2">
            {kinds.map((x) => <button key={x} type="button" aria-pressed={k === x} onClick={() => setK(x)} className={cn("border-2 border-ink px-3 py-2 label-mono", k === x ? "bg-ink text-paper" : "bg-paper hover:bg-amber")}>{x}</button>)}
          </div>
        </div>
        <ol className="border-t-2 border-ink lg:col-span-8">
          <AnimatePresence initial={false}>
            {list.map((a) => (
              <motion.li layout key={a.year + a.title} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                className="group grid grid-cols-[5rem_1fr] items-baseline gap-4 border-b-2 border-ink py-5 transition-colors hover:bg-ink hover:text-paper md:grid-cols-[7rem_1fr_auto]">
                <span className="pl-2 font-display text-3xl font-extrabold">{a.year}</span>
                <div>
                  <p className="font-display text-xl font-bold">{a.title}</p>
                  <p className="text-sm opacity-70">{a.by}</p>
                  {a.toConfirm && <ToConfirm className="mt-2" />}
                </div>
                <span className="hidden pr-2 label-mono md:inline">{a.kind}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </Block>
  );
}

function Competitions() {
  return (
    <section className="border-y-2 border-ink">
      <div className="mx-auto max-w-7xl px-6 pt-24"><SectionTag n="D">Competitions</SectionTag></div>
      <div className="mt-10 border-t-2 border-ink">
        {competitions.map((c, i) => (
          <motion.article key={c.name} initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: i * 0.1 }}
            className={cn("group border-b-2 border-ink px-6 py-12", c.tone)}>
            <div className="mx-auto grid max-w-7xl items-end gap-6 lg:grid-cols-12">
              <h3 className="font-display text-[clamp(3.5rem,10vw,9rem)] font-extrabold leading-[0.85] tracking-tighter transition-transform duration-500 group-hover:translate-x-4 lg:col-span-7">{c.name}</h3>
              <div className="lg:col-span-5">
                <p className="label-mono">{c.years}{c.toConfirm && " · to confirm"}</p>
                <p className="mt-2 font-display text-xl font-bold">{c.role}</p>
                <p className="mt-2 opacity-85">{c.detail}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <Block className="bg-paper">
      <SectionTag n="B">Projects portfolio</SectionTag>
      <H2 className="mt-6">Built by members.</H2>
      <div className="mt-12 grid gap-6 md:grid-cols-6">
        {projectsPortfolio.map((p, i) => (
          <motion.article key={p.name} whileHover={{ y: -6 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={cn("flex flex-col border-2 border-ink bg-card shadow-offset", i === 0 ? "md:col-span-4 md:row-span-2" : i === 3 ? "md:col-span-6" : "md:col-span-2")}>
            {p.image && <img src={p.image} alt={`${p.name} logo`} loading="lazy" className="aspect-[16/9] w-full border-b-2 border-ink object-cover" />}
            <div className="flex flex-1 flex-col p-6">
              <span className="self-start border border-ink px-2 py-0.5 label-mono !text-[0.6rem]">{p.kind}</span>
              <h3 className={cn("mt-3 font-display font-bold", i === 0 ? "text-4xl" : "text-xl")}>{p.name}</h3>
              <p className="mt-2 text-muted-foreground">{p.body}</p>
              {p.toConfirm && <ToConfirm className="mt-auto self-start" />}
            </div>
          </motion.article>
        ))}
      </div>
    </Block>
  );
}

function Research() {
  const loop = ["Idea", "Prototype", "Test", "Break", "Fix", "Compete"];
  return (
    <section className="border-y-2 border-ink bg-ink px-6 py-24 text-paper">
      <div className="mx-auto max-w-7xl">
        <SectionTag n="E" className="text-amber">Research & innovation</SectionTag>
        <H2 className="mt-6 max-w-3xl">Every robot is an experiment.</H2>
        <p className="mt-6 max-w-2xl text-paper/80">Our innovation happens on the workbench: prototypes for competitions, hackathon builds and IoT projects like NEGHLBOUH. Research collaborations will be listed here once confirmed.</p>
        <ol className="mt-12 flex flex-wrap items-center gap-3">
          {loop.map((s, i) => (
            <motion.li key={s} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="flex items-center gap-3">
              <span className={cn("border-2 border-paper px-4 py-3 font-display text-xl font-bold", i === loop.length - 1 && "bg-amber text-ink")}>{s}</span>
              {i < loop.length - 1 && <span aria-hidden className="font-mono text-amber">→</span>}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Beyond() {
  const items = [
    { k: "National", d: "Organising the Tunisian NXP Cup qualification and the country's first Micromouse competition; NRW gathers students from across Tunisia." },
    { k: "Region 8", d: "Student Branch Chapter of the Year (2019) and Runner-Up in Region 8 Educational Activities (2018)." },
    { k: "International", d: "EUROBOT qualifications every year since 2022; recognition at ICRA 2026 in Vienna (wording to confirm)." },
  ];
  return (
    <Block className="bg-card">
      <SectionTag n="F">Beyond INSAT</SectionTag>
      <div className="mt-10 grid gap-0 border-2 border-ink md:grid-cols-3">
        {items.map((it, i) => (
          <div key={it.k} className="border-ink p-8 max-md:border-b-2 md:border-r-2 md:last:border-r-0">
            <p className="font-serif text-5xl italic text-ieee">{it.k}</p>
            <p className="mt-4">{it.d}</p>
            <div className="mt-6 h-1 bg-muted"><motion.div className="h-full bg-crimson" initial={{ width: 0 }} whileInView={{ width: `${(i + 1) * 33.3}%` }} viewport={{ once: true }} transition={{ duration: 1 }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        <RasLink to="/partners" variant="blue">Back our next season</RasLink>
        <RasLink to="/join" variant="paper">Build with us</RasLink>
      </div>
    </Block>
  );
}
