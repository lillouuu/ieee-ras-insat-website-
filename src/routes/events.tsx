import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { PageHero, Block, H2 } from "@/components/site/PageHero";
import { SectionTag, ToConfirm } from "@/components/site/motion-bits";
import { RasLink } from "@/components/site/RasButton";
import { Gallery } from "@/components/site/Gallery";
import { events, media } from "@/content/site";
import { allPhotos, flagships } from "@/content/pages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — IEEE RAS INSAT" },
      { name: "description", content: "National Robotics Week, RAS Odyssey, RoboCraft, InnoWeek, workshops and the archive of IEEE RAS INSAT events." },
      { property: "og:title", content: "Events — IEEE RAS INSAT" },
      { property: "og:description", content: "Flagship events, workshops, archive and galleries from IEEE RAS INSAT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <>
      <PageHero n="02" label="Events" title="Where the community meets the machines." intro="Congresses, competitions, workshops and the moments in between. Here is what we organise — and what's coming next." tone="purple" />
      <Nrw />
      <OtherFlagships />
      <Upcoming />
      <Archive />
      <Workshops />
      <Block className="bg-paper">
        <SectionTag n="E">Event galleries</SectionTag>
        <H2 className="mt-6 mb-10">Proof it happened.</H2>
        <Gallery items={allPhotos} />
      </Block>
    </>
  );
}

function Nrw() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-10, 6]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const nrw = flagships[0]!;
  return (
    <section ref={ref} className="overflow-hidden border-b-2 border-ink bg-ink py-24 text-paper">
      <motion.p style={{ x }} aria-hidden className="whitespace-nowrap font-display text-[clamp(4rem,12vw,10rem)] font-extrabold leading-none tracking-tighter text-purple">NRW · NRW · NRW · NRW · NRW · NRW ·</motion.p>
      <div className="mx-auto mt-8 grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionTag n="A" className="text-gold">{`Flagship · ${nrw.tagline}`}</SectionTag>
          <h2 className="mt-6 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold leading-[0.9]">{nrw.name}</h2>
          <p className="mt-6 max-w-xl text-lg text-paper/85">{nrw.body}</p>
          <div className="mt-8 grid max-w-xl grid-cols-2 border-2 border-paper sm:grid-cols-4">
            {nrw.facts.map((f, i) => <div key={f} className={cn("border-paper p-3 text-center label-mono", i < 3 && "sm:border-r-2", i % 2 === 0 && "max-sm:border-r-2", i < 2 && "max-sm:border-b-2")}>{f}</div>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 label-mono">
            {[["3.1", "“Robots beyond the limits”"], ["4.0", "Bronze Darrel Chong · 2023"], ["5.0", "Silver Darrel Chong · 2024"]].map(([e, d]) => (
              <span key={e} className="border-2 border-gold px-3 py-2"><b className="text-gold">NRW {e}</b> — {d}</span>
            ))}
          </div>
        </div>
        <motion.div style={{ rotate: rot }} className="border-2 border-paper bg-paper p-8 shadow-[10px_10px_0_0_var(--purple)] lg:col-span-5">
          <img src={media.nrwLogo} alt="National Robotics Week logo" loading="lazy" className="w-full" />
        </motion.div>
      </div>
    </section>
  );
}

function OtherFlagships() {
  return (
    <section className="grid border-b-2 border-ink md:grid-cols-3">
      {flagships.slice(1).map((f, i) => (
        <motion.article key={f.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
          className={cn("group relative flex min-h-[22rem] flex-col justify-between overflow-hidden border-ink p-8 max-md:border-b-2 md:border-r-2 md:last:border-r-0", f.tone)}>
          <span aria-hidden className="pointer-events-none absolute -right-6 -top-10 font-display text-[10rem] font-extrabold leading-none opacity-15 transition-transform duration-500 group-hover:-translate-x-6">{f.name[0]}</span>
          <p className="label-mono">Flagship 0{i + 2}</p>
          <div>
            <h3 className="font-display text-4xl font-extrabold leading-none">{f.name}</h3>
            <p className="mt-4 opacity-85">{f.body}</p>
            {f.toConfirm && <ToConfirm className="mt-4" />}
          </div>
        </motion.article>
      ))}
    </section>
  );
}

function Upcoming() {
  return (
    <Block className="bg-amber">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionTag n="B">Upcoming</SectionTag>
          <H2 className="mt-6">Next on the calendar.</H2>
        </div>
        <div className="border-2 border-ink bg-paper p-8 shadow-offset-lg">
          <p className="label-mono text-muted-foreground">No upcoming dates published yet</p>
          <p className="mt-3 font-serif text-3xl italic">The next events of the season will be announced here and on our channels.</p>
          <RasLink to="/contact" variant="ink" className="mt-6">Ask to be notified</RasLink>
        </div>
      </div>
    </Block>
  );
}

const kinds = ["All", "Flagship", "Workshop", "Community"] as const;
function Archive() {
  const [k, setK] = useState<(typeof kinds)[number]>("All");
  const list = events.filter((e) => k === "All" || e.kind === k);
  return (
    <Block className="bg-card">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionTag n="C">Past events</SectionTag>
          <H2 className="mt-6">The archive.</H2>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events">
          {kinds.map((x) => <button key={x} type="button" aria-pressed={k === x} onClick={() => setK(x)} className={cn("border-2 border-ink px-3 py-2 label-mono", k === x ? "bg-ink text-paper" : "bg-paper hover:bg-amber")}>{x}</button>)}
        </div>
      </div>
      <ul className="mt-10 border-t-2 border-ink">
        <AnimatePresence initial={false}>
          {list.map((e) => (
            <motion.li layout key={e.slug} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="group overflow-hidden border-b-2 border-ink">
              <div className="grid items-center gap-4 py-6 transition-colors group-hover:bg-paper md:grid-cols-[8rem_1fr_auto]">
                <p className="label-mono">{e.date}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold transition-transform group-hover:translate-x-2 md:text-3xl">{e.name}</h3>
                    <span className="border border-ink px-2 py-0.5 label-mono !text-[0.6rem]">{e.kind}</span>
                    {e.toConfirm && <ToConfirm />}
                  </div>
                  <p className="mt-2 max-w-2xl text-muted-foreground">{e.body}</p>
                </div>
                <div className="flex -space-x-6">
                  {e.photos.slice(0, 3).map((p, i) => <img key={p.src} src={p.src} alt={p.alt} loading="lazy" className={cn("h-20 w-28 border-2 border-ink object-cover transition-transform group-hover:rotate-0", i % 2 ? "rotate-3" : "-rotate-3")} />)}
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Block>
  );
}

function Workshops() {
  const tracks = [
    { k: "Embedded & IoT", d: "Microcontrollers, sensors, Raspberry Pi, connected hardware." },
    { k: "Robotics", d: "Mobile robots, motors, control and competition preparation." },
    { k: "AI & Vision", d: "Computer vision and on-device intelligence for robots." },
    { k: "Soft skills", d: "Event organisation, communication and teamwork." },
  ];
  return (
    <section className="border-y-2 border-ink bg-ieee px-6 py-24 text-paper blueprint-grid">
      <div className="mx-auto max-w-7xl">
        <SectionTag n="D" className="text-amber">Workshops & training</SectionTag>
        <H2 className="mt-6 max-w-3xl">Open to all levels. You leave with something that works.</H2>
        <p className="mt-6 max-w-2xl text-paper/85">From the Raspberry Pi workshop to Summer School and NRW's certified training sessions, our workshops are hands-on: you apply each skill as you learn it.</p>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {tracks.map((t, i) => (
            <motion.li key={t.k} whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }} className="border-2 border-paper bg-navy p-6">
              <p className="font-mono text-amber">$ track --{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{t.k}</h3>
              <p className="mt-2 text-sm text-paper/80">{t.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
