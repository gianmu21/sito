"use client";

import { useState, type FormEvent } from "react";
import type { UiContent } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

/*
 * Measured on the Wix form at 1440px: 18px labels, 301x42px fields with 16px text and a
 * 1px white border, 9px between label and field, 14px between fields, a 100x48px lime
 * pill button right-aligned under the fields. Wider screens widen the fields (rem) but
 * keep text and heights fixed (px), as Wix does.
 */
const fieldClass =
  "block w-full border border-white bg-transparent px-2 text-[16px] leading-none text-white outline-none transition focus:bg-white/10";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[18px] leading-[25px] text-white">
      <span className="mb-[9px] block">
        {label} {required}
      </span>
      {children}
    </label>
  );
}

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
      <p role="status" className="max-w-[18.8rem] text-[18px] leading-[25px] text-white">
        {labels.sent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[18.8rem] space-y-[14px]">
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Field label={labels.name} required={labels.required}>
        <input name="name" type="text" required maxLength={100} autoComplete="name" className={`${fieldClass} h-[42px]`} />
      </Field>
      <Field label={labels.email} required={labels.required}>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={`${fieldClass} h-[42px]`} />
      </Field>
      <Field label={labels.message} required={labels.required}>
        <textarea name="message" required maxLength={5000} className={`${fieldClass} h-[84px] resize-none py-2 leading-snug`} />
      </Field>
      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
        {status === "error" && (
          <p role="alert" className="w-full text-right text-[14px] leading-tight text-lime">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-[48px] min-w-[100px] rounded-full bg-lime px-4 text-[16px] text-blue transition-colors duration-[400ms] hover:bg-white disabled:opacity-60"
        >
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}
