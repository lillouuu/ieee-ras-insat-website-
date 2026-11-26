import { Link } from "@tanstack/react-router";
import { contact, media, nav, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-navy text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <img src={media.rasLogoWhite} alt="IEEE Robotics and Automation Society INSAT" className="h-14 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-paper/70">IEEE Robotics and Automation Society — INSAT Student Branch Chapter, Tunis.</p>
        </div>
        <nav aria-label="Footer">
          <p className="label-mono text-amber">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {[...nav, { to: "/join", label: "Join us" } as const].map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-amber hover:underline">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <address className="not-italic">
          <p className="label-mono text-amber">Contact</p>
          <p className="mt-3 text-sm text-paper/80">{contact.address}</p>
          <p className="mt-2 text-sm"><a className="hover:text-amber" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></p>
          <p className="mt-1 text-sm"><a className="hover:text-amber" href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p className="mt-3 flex gap-4 label-mono">{socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-amber">{s.label} ↗</a>)}</p>
        </address>
      </div>
      <div className="border-t border-paper/20 px-6 py-4 text-center label-mono text-paper/50">© IEEE RAS INSAT SBC</div>
    </footer>
  );
}
