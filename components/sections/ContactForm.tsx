"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const FIELD =
  "mt-3 w-full border-b border-border bg-transparent py-2 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-royal";
const LABEL = "block text-xs font-semibold uppercase tracking-[0.2em] text-muted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-12 rounded-2xl border border-border p-8">
        <p className="font-serif text-3xl italic">Merci !</p>
        <p className="mt-3 max-w-sm text-muted">
          Votre message a bien été envoyé. Je vous réponds très vite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 max-w-xl space-y-8">
      <div>
        <label htmlFor="name" className={LABEL}>
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={fields.name}
          onChange={onChange}
          placeholder="Votre nom"
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={fields.email}
          onChange={onChange}
          placeholder="vous@exemple.com"
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={fields.message}
          onChange={onChange}
          placeholder="Parlez-moi de votre projet…"
          className={`${FIELD} resize-none`}
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2.5 disabled:opacity-50"
        >
          <span className="inline-flex h-12 items-center rounded-md border border-fg/50 px-6 text-xs font-semibold uppercase tracking-[0.15em] transition-colors group-hover:bg-fg/5">
            {status === "sending" ? "Envoi…" : "Envoyer le message"}
          </span>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-royal text-lg text-white transition-opacity group-hover:opacity-90">
            <span aria-hidden>→</span>
          </span>
        </button>
        {status === "error" && (
          <p className="text-sm text-red-600">
            Une erreur est survenue. Réessayez plus tard.
          </p>
        )}
      </div>
    </form>
  );
}
