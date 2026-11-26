import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-amber text-ink",
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  blue: "bg-ieee text-paper",
};

type Props = { variant?: keyof typeof variants; children: ReactNode; className?: string; arrow?: boolean };

const base =
  "group inline-flex items-center gap-3 border-2 border-ink px-5 py-3 label-mono !text-[0.75rem] font-bold shadow-offset transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-offset-lg active:translate-x-1.5 active:translate-y-1.5 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring";

function Arrow() {
  return (
    <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-rotate-45">
      →
    </span>
  );
}

export function RasLink({ variant = "primary", children, className, arrow = true, ...rest }: Props & ComponentProps<typeof Link>) {
  return (
    <Link {...rest} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function RasAnchor({ variant = "primary", children, className, arrow = true, ...rest }: Props & ComponentProps<"a">) {
  return (
    <a {...rest} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}
