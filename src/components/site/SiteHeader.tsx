import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { media, nav } from "@/content/site";
import { RasLink } from "./RasButton";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between border-2 border-ink bg-paper px-3 py-2 shadow-offset">
        <Link to="/" className="flex items-center gap-2 bg-navy px-2 py-1" aria-label="IEEE RAS INSAT home">
          <img src={media.rasLogoWhite} alt="IEEE Robotics and Automation Society INSAT" className="h-8 w-auto" />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: true }}
                  className="relative block px-3 py-2 label-mono !text-[0.72rem] font-semibold transition-colors hover:bg-ink hover:text-paper data-[status=active]:bg-amber"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/partners" className="label-mono font-semibold underline decoration-2 underline-offset-4 hover:text-ieee">
            Partner with us
          </Link>
          <RasLink to="/join" className="!py-2">Join us</RasLink>
        </div>
        <button
          type="button"
          className="border-2 border-ink px-3 py-2 label-mono font-bold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div
        id="mobile-nav"
        className={cn(
          "mx-auto mt-2 max-w-7xl overflow-hidden border-2 border-ink bg-paper shadow-offset transition-all lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="divide-y-2 divide-ink">
          {nav.map((n, i) => (
            <li key={n.to}>
              <Link to={n.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 px-5 py-4 font-display text-3xl font-bold hover:bg-amber">
                <span className="label-mono text-muted-foreground">0{i + 1}</span>
                {n.label}
              </Link>
            </li>
          ))}
          <li className="flex flex-wrap gap-3 p-5">
            <RasLink to="/join" onClick={() => setOpen(false)}>Join us</RasLink>
            <RasLink to="/partners" variant="paper" onClick={() => setOpen(false)}>Partner with us</RasLink>
          </li>
        </ul>
      </div>
    </motion.header>
  );
}
