import type { ReactNode } from "react";
import { KineticHeadline, SectionTag } from "./motion-bits";
import { cn } from "@/lib/utils";

export function PageHero({ n, label, title, intro, tone = "paper", children }: { n: string; label: string; title: string; intro: string; tone?: "paper" | "navy" | "purple"; children?: ReactNode }) {
  const t = { paper: "bg-paper text-ink", navy: "bg-navy text-paper", purple: "bg-purple text-paper" }[tone];
  return (
    <section className={cn("border-b-2 border-ink px-6 pb-20 pt-36 blueprint-grid", t)}>
      <div className="mx-auto max-w-7xl">
        <SectionTag n={n} className={tone === "paper" ? "" : "text-amber"}>{label}</SectionTag>
        <KineticHeadline as="h1" text={title} className="mt-6 max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-tight" />
        <p className="mt-6 max-w-2xl text-lg opacity-85">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function Block({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return <section id={id} className={cn("scroll-mt-28 px-6 py-24", className)}><div className="mx-auto max-w-7xl">{children}</div></section>;
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-none tracking-tight", className)}>{children}</h2>;
}
