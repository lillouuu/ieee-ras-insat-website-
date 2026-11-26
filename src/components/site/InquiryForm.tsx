import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";

/** Opens the visitor's email app with the message pre-filled, addressed to the chapter. */
export function InquiryForm({ subjectPrefix, fields = [] }: { subjectPrefix: string; fields?: { name: string; label: string }[] }) {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") ?? "").trim();
    const email = String(d.get("email") ?? "").trim();
    const msg = String(d.get("message") ?? "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || msg.length < 5) { setErr("Please fill your name, a valid email and a message."); return; }
    setErr("");
    const extra = fields.map((f) => `${f.label}: ${String(d.get(f.name) ?? "")}`).join("\n");
    const body = `${msg}\n\n${extra}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`${subjectPrefix} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  const input = "mt-1 w-full border-2 border-ink bg-card px-3 py-3 focus:outline-none focus:ring-4 focus:ring-ring";
  return (
    <form onSubmit={submit} noValidate className="border-2 border-ink bg-paper p-6 text-ink shadow-offset-lg md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="label-mono">Name<input name="name" required maxLength={100} className={input} /></label>
        <label className="label-mono">Email<input name="email" type="email" required maxLength={255} className={input} /></label>
        {fields.map((f) => <label key={f.name} className="label-mono md:col-span-2">{f.label}<input name={f.name} maxLength={200} className={input} /></label>)}
        <label className="label-mono md:col-span-2">Message<textarea name="message" required rows={5} maxLength={2000} className={input} /></label>
      </div>
      {err && <p role="alert" className="mt-4 text-sm font-semibold text-crimson">{err}</p>}
      {sent && <p role="status" className="mt-4 text-sm font-semibold text-ieee">Your email app should open with the message ready — just press send.</p>}
      <button type="submit" className="mt-6 inline-flex items-center gap-3 border-2 border-ink bg-amber px-6 py-3 label-mono font-bold shadow-offset transition-[transform,box-shadow] hover:-translate-y-0.5 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none">Send message →</button>
      <p className="mt-3 text-xs text-muted-foreground">Or write directly to <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
    </form>
  );
}
