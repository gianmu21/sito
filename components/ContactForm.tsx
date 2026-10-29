"use client";

import { useState, type FormEvent } from "react";
import type { UiContent } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full max-w-[18.75rem] border border-white bg-transparent px-3 py-2 text-white outline-none transition focus:bg-white/10";

export default function ContactForm({ labels }: { labels: UiContent["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? labels.error);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : labels.error);
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="lead max-w-md text-white">
        {labels.sent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 text-white">
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="grid gap-2 text-lg">
        <span>
          {labels.name} {labels.required}
        </span>
        <input name="name" type="text" required maxLength={100} autoComplete="name" className={inputClass} />
      </label>
      <label className="grid gap-2 text-lg">
        <span>
          {labels.email} {labels.required}
        </span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} />
      </label>
      <label className="grid gap-2 text-lg">
        <span>
          {labels.message} {labels.required}
        </span>
        <textarea name="message" required rows={4} maxLength={5000} className={inputClass} />
      </label>
      <div className="flex max-w-[18.75rem] flex-wrap items-center justify-end gap-4">
        {status === "error" && (
          <p role="alert" className="w-full text-sm text-lime">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-lime px-10 py-3 text-base text-blue transition-colors duration-[400ms] hover:bg-white disabled:opacity-60"
        >
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}
