import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PageHero, Block, H2 } from "@/components/site/PageHero";
import { KineticHeadline, SectionTag } from "@/components/site/motion-bits";
import { RasLink, RasAnchor } from "@/components/site/RasButton";
import { Schematic } from "@/components/site/Schematic";
import { contact, domains, joinFaq, photos } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Us — IEEE RAS INSAT" },
      { name: "description", content: "Join IEEE RAS INSAT: learn robotics from zero, build real projects, compete and organise events with the chapter at INSAT." },
      { property: "og:title", content: "Join IEEE RAS INSAT" },
      { property: "og:description", content: "Beginners welcome. Learn, build, compete and lead with the robotics chapter at INSAT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Join,
});

const explore = {
  Technical: ["Mobile robots", "Embedded firmware", "PCB design", "Computer vision", "CAD & fabrication", "Control systems", "Competition teams"],
  "Non-technical": ["Event organisation", "Communication & media", "Design", "Partnerships & sponsoring", "Human resources", "Training coordination"],
};
const journey = [
  { k: "Discover", d: "Come to an open session or IEEE Day and meet the chapter." },
  { k: "Learn", d: "Workshops and training take you from your first circuit to real skills." },
  { k: "Build", d: "Join a project team and turn ideas into working robots." },
  { k: "Compete", d: "Represent INSAT at competitions like Eurobot and NXP Cup." },
  { k: "Lead", d: "Run events, mentor newcomers and take a seat on the board." },
];
const gains = [
  { k: "Learning", d: "Hands-on workshops, from your first circuit to competition-level skills." },
  { k: "Collaboration", d: "Teammates across years and specialities who help you unblock." },
  { k: "Projects", d: "Real builds with real deadlines — Eurobot, NXP Cup, Micromouse." },
  { k: "Events", d: "Organise and live National Robotics Week from the inside." },
  { k: "Career", d: "Meet partners, speakers and the international IEEE network." },
];

function Join() {
  const [side, setSide] = useState<keyof typeof explore>("Technical");
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <>
      <PageHero n="06" label="Join us" title="No experience? Perfect. Start here." intro="RAS INSAT is where beginners become builders. If you're curious, there's a place for you — on the bench or behind the scenes." tone="purple">
        <div className="mt-10"><RasAnchor href="#apply">Apply now</RasAnchor></div>
      </PageHero>
      <Block className="bg-card">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTag n="A">Why join RAS INSAT?</SectionTag>
            <KineticHeadline text="Because robots are built by teams." className="mt-6 font-display text-[clamp(2.3rem,5vw,4.5rem)] font-extrabold leading-none" />
            <p className="mt-6 max-w-md text-muted-foreground">Since 2015, members have learned from each other, won awards together and launched events the whole country attends. You'll learn faster here than alone.</p>
          </div>
          <div className="relative">
            <img src={photos.ss1.src} alt={photos.ss1.alt} loading="lazy" className="aspect-[4/3] w-full rotate-2 border-2 border-ink object-cover shadow-offset-lg" />
            <img src={photos.ieeeday.src} alt={photos.ieeeday.alt} loading="lazy" className="absolute -bottom-8 -left-6 w-1/2 -rotate-3 border-2 border-ink object-cover shadow-offset" />
          </div>
        </div>
      </Block>
      <Block className="border-t-2 border-ink bg-paper">
        <SectionTag n="↗">Your journey</SectionTag>
        <H2 className="mt-6">From curious to captain.</H2>
        <ol className="mt-12 grid gap-px border-2 border-ink bg-ink md:grid-cols-5">
          {journey.map((j, i) => (
            <motion.li key={j.k} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group relative bg-card p-5 transition-colors hover:bg-amber focus-within:bg-amber">
              <span className="label-mono text-ieee">Step 0{i + 1}</span>
              <p className="mt-3 font-display text-3xl font-extrabold">{j.k}</p>
              <p className="mt-2 text-sm text-muted-foreground group-hover:text-ink">{j.d}</p>
              {i < journey.length - 1 && <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center border-2 border-ink bg-paper font-mono text-xs md:flex">→</span>}
            </motion.li>
          ))}
        </ol>
      </Block>
      <section className="border-y-2 border-ink bg-amber px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTag n="B">What you can explore</SectionTag>
          <div className="mt-8 inline-flex border-2 border-ink bg-paper" role="tablist">
            {(Object.keys(explore) as (keyof typeof explore)[]).map((k) => (
              <button key={k} type="button" role="tab" aria-selected={side === k} onClick={() => setSide(k)} className={cn("px-5 py-3 label-mono font-bold", side === k && "bg-ink text-paper")}>{k}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul key={side} className="mt-10 flex flex-wrap gap-3">
              {explore[side].map((x, i) => (
                <motion.li key={x} initial={{ opacity: 0, y: 20, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }} exit={{ opacity: 0 }} whileHover={{ rotate: 0, scale: 1.08 }} transition={{ delay: i * 0.04 }}
                  className="border-2 border-ink bg-paper px-5 py-3 font-display text-xl font-bold shadow-offset odd:bg-gold">{x}</motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>
      <Block className="bg-paper">
        <SectionTag n="C">Technical teams & activities</SectionTag>
        <H2 className="mt-6">Five fields to grow into.</H2>
        <div className="mt-12 grid gap-px border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-5">
          {domains.map((d) => (
            <div key={d.slug} className="group bg-card p-5 transition-colors hover:bg-ieee hover:text-paper">
              <div className="mx-auto aspect-square max-w-[7rem] text-ieee group-hover:text-amber"><Schematic shape={d.shape} /></div>
              <p className="mt-3 font-display text-lg font-bold leading-tight">{d.name}</p>
              <p className="mt-1 text-sm opacity-75">{d.short}</p>
            </div>
          ))}
        </div>
      </Block>
      <section className="border-y-2 border-ink bg-navy px-6 py-24 text-paper blueprint-grid">
        <div className="mx-auto max-w-7xl">
          <SectionTag n="D" className="text-amber">What members gain</SectionTag>
          <ol className="mt-12 space-y-0 border-t-2 border-paper">
            {gains.map((g, i) => (
              <motion.li key={g.k} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group grid items-baseline gap-4 border-b-2 border-paper py-6 md:grid-cols-[6rem_1fr_2fr]">
                <span className="font-mono text-amber">0{i + 1}</span>
                <span className="font-display text-4xl font-extrabold transition-transform group-hover:translate-x-3">{g.k}</span>
                <span className="text-paper/80">{g.d}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
      <Block className="bg-card">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTag n="E">Recruitment process</SectionTag>
            <H2 className="mt-6">How it works.</H2>
            <ol className="mt-8 space-y-4">
              {["Follow our channels for the recruitment call", "Send your application or message us", "Meet the team", "Start learning & building"].map((s, i) => (
                <li key={s} className="flex items-center gap-4"><span className="flex size-10 shrink-0 items-center justify-center border-2 border-ink bg-amber font-display font-bold">{i + 1}</span><span className="font-display text-xl font-bold">{s}</span></li>
              ))}
            </ol>
            <p className="mt-6 border-2 border-dashed border-ink p-4 text-sm text-muted-foreground">Exact dates and steps for this year's recruitment will be published when the call opens.</p>
          </div>
          <div>
            <SectionTag n="F">FAQ</SectionTag>
            <ul className="mt-6 border-t-2 border-ink">
              {joinFaq.map((f, i) => (
                <li key={f.q} className="border-b-2 border-ink">
                  <button type="button" aria-expanded={faq === i} onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-xl font-bold hover:text-ieee">
                    {f.q}<span aria-hidden className={cn("font-mono transition-transform", faq === i && "rotate-45")}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {faq === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-muted-foreground">{f.a}</motion.p>}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>
      <section id="apply" className="relative scroll-mt-20 overflow-hidden bg-ink px-6 py-32 text-paper">
        <img src={photos.tb12.src} alt="" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTag n="G" className="text-amber">Apply</SectionTag>
          <KineticHeadline text="Your seat at the workbench is waiting." className="mt-8 max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-tight" />
          <div className="mt-12 flex flex-wrap gap-4">
            <RasAnchor href={`mailto:${contact.email}?subject=${encodeURIComponent("I want to join IEEE RAS INSAT")}`} className="!px-8 !py-5 !text-base">Apply by email</RasAnchor>
            <RasLink to="/contact" variant="paper">Ask a question first</RasLink>
          </div>
        </div>
      </section>
    </>
  );
}
