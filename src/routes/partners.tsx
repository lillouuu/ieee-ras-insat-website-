import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHero, Block, H2 } from "@/components/site/PageHero";
import { ScrollHighlight, SectionTag } from "@/components/site/motion-bits";
import { InquiryForm } from "@/components/site/InquiryForm";
import { partners, contact } from "@/content/site";
import { partnershipOptions } from "@/content/pages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — IEEE RAS INSAT" },
      { name: "description", content: "Partner with IEEE RAS INSAT: sponsorship, technical collaboration, workshops, challenges, equipment and event partnerships." },
      { property: "og:title", content: "Partner with IEEE RAS INSAT" },
      { property: "og:description", content: "Sponsorship, technical collaboration, workshops, challenges and event partnerships with a leading student robotics chapter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Partners,
});

function Partners() {
  const reasons = [
    { k: "Proven track record", d: "Region 8 Chapter of the Year, two Darrel Chong Awards for NRW, Tunisia RAS SBC Award of the Year in 2024 and 2025." },
    { k: "National reach", d: "We organised the Tunisian NXP Cup qualification and Tunisia's first Micromouse competition." },
    { k: "Talent pipeline", d: "Meet engineering students in robotics, embedded systems and AI — while they are still choosing their path." },
  ];
  const tones = ["bg-ieee text-paper", "bg-amber", "bg-card", "bg-crimson text-paper", "bg-gold", "bg-navy text-paper"];
  return (
    <>
      <PageHero n="04" label="Partners" title="Invest in the engineers who build what's next." intro="Companies, institutions and organisations help us run events, equip teams and open doors for students. Here is how we work together." tone="navy" />
      <Block className="bg-card">
        <SectionTag n="A">Why collaborate</SectionTag>
        <ScrollHighlight className="mt-8 max-w-5xl font-display text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-[1.1]" text="Since 2015 we have turned support into workshops, robots, competitions and events that the Tunisian robotics community remembers." />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.k} className="border-t-4 border-ink pt-5">
              <p className="label-mono text-ieee">0{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{r.k}</h3>
              <p className="mt-2 text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block className="border-y-2 border-ink bg-paper">
        <SectionTag n="B">Our partners</SectionTag>
        {partners.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-px border-2 border-ink bg-ink md:grid-cols-4">
            {partners.map((p) => <div key={p.name} className="flex items-center justify-center bg-card p-8"><img src={p.logo} alt={p.name} className="h-12 w-auto grayscale transition hover:grayscale-0" /></div>)}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-px border-2 border-ink bg-ink md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex aspect-[3/2] items-center justify-center bg-card p-6 text-center">
                <span className="label-mono text-muted-foreground">{i === 0 ? "Official partner list being confirmed" : "Logo slot"}</span>
              </div>
            ))}
          </div>
        )}
      </Block>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTag n="C">Partnership opportunities</SectionTag>
          <H2 className="mt-6">Six ways in.</H2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {partnershipOptions.map((o, i) => (
              <motion.div key={o.k} initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}
                className={cn("border-2 border-ink p-6 shadow-offset", tones[i], i === 0 && "md:row-span-2 md:flex md:flex-col md:justify-end")}>
                <p className="label-mono opacity-70">0{i + 1}</p>
                <h3 className={cn("mt-2 font-display font-bold", i === 0 ? "text-4xl" : "text-2xl")}>{o.k}</h3>
                <p className="mt-2 opacity-85">{o.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="become" className="scroll-mt-28 border-t-2 border-ink bg-purple px-6 py-24 text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionTag n="D" className="text-gold">Become a partner</SectionTag>
            <H2 className="mt-6">Let's talk about your goals.</H2>
            <p className="mt-6 max-w-md text-paper/85">Tell us who you are and what you'd like to achieve. We'll reply with options and our partnership package.</p>
            <p className="mt-8 label-mono text-gold">Direct line</p>
            <a href={`mailto:${contact.email}`} className="mt-2 block font-display text-2xl font-bold underline decoration-2 underline-offset-4 hover:text-gold">{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="mt-1 block font-mono hover:text-gold">{contact.phone}</a>
          </div>
          <InquiryForm subjectPrefix="Partnership inquiry" fields={[{ name: "org", label: "Organisation" }, { name: "interest", label: "Interested in (sponsorship, workshop, equipment…)" }]} />
        </div>
      </section>
    </>
  );
}
