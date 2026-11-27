import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(d: FormData): Errors {
  const e: Errors = {};
  const name = String(d.get("name") ?? "").trim();
  const email = String(d.get("email") ?? "").trim();
  const msg = String(d.get("message") ?? "").trim();
  if (!name) e.name = "Tell us your name.";
  if (!email) e.email = "We need an email to reply.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "This email doesn't look right.";
  if (msg.length < 10) e.message = "A few more words please (10 characters minimum).";
  return e;
}

/** Opens the visitor's email app with the message pre-filled, addressed to the chapter. */
export function InquiryForm({ subjectPrefix, fields = [] }: { subjectPrefix: string; fields?: { name: string; label: string }[] }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const errs = validate(d);
    setErrors(errs); setTouched(true);
    const first = Object.keys(errs)[0];
    if (first) { (form.elements.namedItem(first) as HTMLElement | null)?.focus(); setSent(false); return; }
    const name = String(d.get("name")).trim();
    const email = String(d.get("email")).trim();
    const extra = fields.map((f) => `${f.label}: ${String(d.get(f.name) ?? "")}`).join("\n");
    const body = `${String(d.get("message")).trim()}\n\n${extra}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`${subjectPrefix} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input = (bad?: string | undefined) => cn("mt-1.5 w-full border-2 bg-card px-3 py-3 font-sans text-base normal-case tracking-normal transition-shadow focus:outline-none focus:ring-4 focus:ring-ring", bad ? "border-crimson" : "border-ink");
  const Err = ({ id, msg }: { id: string; msg?: string | undefined }) => msg ? <span id={id} className="mt-1 block font-sans text-xs normal-case tracking-normal text-crimson">{msg}</span> : null;

  return (
    <form
      onSubmit={submit}
      onChange={(e) => touched && setErrors(validate(new FormData(e.currentTarget)))}
      noValidate
      className="border-2 border-ink bg-paper p-6 text-ink shadow-offset-lg md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="label-mono">Name *
          <input name="name" autoComplete="name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby="err-name" className={input(errors.name)} />
          <Err id="err-name" msg={errors.name} />
        </label>
        <label className="label-mono">Email *
          <input name="email" type="email" autoComplete="email" required maxLength={255} aria-invalid={!!errors.email} aria-describedby="err-email" className={input(errors.email)} />
          <Err id="err-email" msg={errors.email} />
        </label>
        {fields.map((f) => <label key={f.name} className="label-mono md:col-span-2">{f.label}<input name={f.name} maxLength={200} className={input()} /></label>)}
        <label className="label-mono md:col-span-2">Message *
          <textarea name="message" required rows={5} maxLength={2000} aria-invalid={!!errors.message} aria-describedby="err-message" className={input(errors.message)} />
          <Err id="err-message" msg={errors.message} />
        </label>
      </div>
      {sent && (
        <p role="status" className="mt-5 border-2 border-ink bg-gold px-4 py-3 text-sm font-semibold">
          ✓ Your email app should now open with the message ready — just press send. Nothing opened? Write to {contact.email}.
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="inline-flex items-center gap-3 border-2 border-ink bg-amber px-6 py-3 label-mono font-bold shadow-offset transition-[transform,box-shadow] hover:-translate-y-0.5 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none">Send message →</button>
        <p className="text-xs text-muted-foreground">Opens your email app. Fields with * are required.</p>
      </div>
    </form>
  );
}
