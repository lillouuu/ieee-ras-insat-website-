import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SectionTag } from "@/components/site/motion-bits";
import { InquiryForm } from "@/components/site/InquiryForm";
import { contact, socials } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IEEE RAS INSAT" },
      { name: "description", content: "Contact IEEE RAS INSAT at INSAT, Centre Urbain Nord, Tunis — general questions, membership and partnership inquiries." },
      { property: "og:title", content: "Contact IEEE RAS INSAT" },
      { property: "og:description", content: "Write to IEEE RAS INSAT — general questions, membership and partnerships." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

const topics = [
  { k: "General", prefix: "General inquiry", fields: [] },
  { k: "Membership", prefix: "Membership question", fields: [{ name: "study", label: "Field & year of study" }] },
  { k: "Partnership", prefix: "Partnership inquiry", fields: [{ name: "org", label: "Organisation" }] },
  { k: "Events", prefix: "Event question", fields: [{ name: "event", label: "Which event?" }] },
];

function Contact() {
  const [t, setT] = useState(0);
  const topic = topics[t]!;
  return (
    <>
      <PageHero n="05" label="Contact" title="Say hello." intro="Questions about membership, events or partnerships — we read every message." tone="paper" />
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTag n="A">Send a message</SectionTag>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Inquiry type">
              {topics.map((x, i) => (
                <button key={x.k} type="button" role="tab" aria-selected={t === i} onClick={() => setT(i)} className={cn("border-2 border-ink px-4 py-2 label-mono", t === i ? "bg-amber shadow-offset" : "bg-paper hover:bg-muted")}>{x.k}</button>
              ))}
            </div>
            <div className="mt-6"><InquiryForm key={topic.k} subjectPrefix={topic.prefix} fields={topic.fields} /></div>
            {topic.k === "Partnership" && <p className="mt-4 text-sm">See all options on the <Link to="/partners" className="underline">Partners page</Link>.</p>}
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="border-2 border-ink bg-navy p-6 text-paper shadow-offset-lg">
              <p className="label-mono text-amber">Find us</p>
              <p className="mt-3 font-display text-2xl font-bold">INSAT</p>
              <p className="text-paper/80">{contact.address}</p>
              <p className="mt-6 label-mono text-amber">Write · Call</p>
              <a href={`mailto:${contact.email}`} className="mt-2 block font-mono hover:text-amber">{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="mt-1 block font-mono hover:text-amber">{contact.phone}</a>
              <a href="https://ras-insat.ieee.tn/" target="_blank" rel="noreferrer" className="mt-1 block font-mono hover:text-amber">ras-insat.ieee.tn ↗</a>
            </div>
            <div className="border-2 border-ink bg-card p-6">
              <p className="label-mono">Social</p>
              <ul className="mt-3 flex flex-wrap gap-3">{socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="inline-block border-2 border-ink px-4 py-2 font-display font-bold hover:bg-amber">{s.label} ↗</a></li>)}</ul>
            </div>
            <div className="overflow-hidden border-2 border-ink shadow-offset">
              <iframe title="Map of INSAT, Tunis" src="https://www.openstreetmap.org/export/embed.html?bbox=10.185%2C36.835%2C10.205%2C36.850&layer=mapnik&marker=36.8429%2C10.1960" className="h-72 w-full" loading="lazy" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
