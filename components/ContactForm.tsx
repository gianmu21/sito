"use client";

import { useState, type FormEvent } from "react";
import type { UiContent } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

/*
 * Two steps, as on the Wix form. Step 1: name and email, 301px fields, "Next" right-aligned.
 * Step 2: "Tell me more about your business", company, URL, two dropdowns and a message
 * across 626px, "Back" left and "Submit" right. Measured at 1440px: 18px labels, 42px
 * fields with 16px text and a 1px white border, 9px label gap, 14px between fields,
 * 100x48px lime pills. Widths are rem so they widen on big screens like Wix; text and
 * heights are px so they do not.
 */
const fieldClass =
  "block w-full border border-white bg-transparent px-2 text-[16px] text-white outline-none transition focus:bg-white/10";
const buttonClass =
  "h-[48px] min-w-[100px] rounded-full bg-lime px-4 text-[16px] text-blue transition-colors duration-[400ms] hover:bg-white disabled:opacity-60";
const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2 5l6 6 6-6' fill='none' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E\")";

function Field({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <label className="block text-[18px] leading-[25px] text-white">
      <span className="mb-[9px] block">
        {label}
        {note ? ` ${note}` : ""}
      </span>
      {children}
    </label>
  );
}

function Select({ name, options, label }: { name: string; options: string[]; label: string }) {
  return (
    <select
      name={name}
      aria-label={label}
      defaultValue=""
      className={`${fieldClass} h-[42px] appearance-none bg-no-repeat pr-10 [&>option]:text-blue`}
      style={{ backgroundImage: chevron, backgroundPosition: "right 14px center", backgroundSize: "16px" }}
    >
      <option value="" />
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export default function ContactForm({ labels }: { labels: UiContent["form"] }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function next(event: React.MouseEvent<HTMLButtonElement>) {
    // Validate only the first step's fields before moving on.
    const form = event.currentTarget.form;
    if (!form) return;
    const fields = [...form.querySelectorAll<HTMLInputElement>("[data-step='1']")];
    if (fields.every((f) => f.reportValidity())) setStep(2);
  }

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
    <form onSubmit={onSubmit} className={`w-full space-y-[14px] ${step === 1 ? "max-w-[18.8rem]" : "max-w-[39.125rem]"}`}>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Fax
          <input name="fax" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Step 1 stays mounted but hidden on step 2 so its values are submitted and kept for "Back". */}
      <div className={step === 1 ? "space-y-[14px]" : "hidden"}>
        <Field label={labels.name} note={labels.required}>
          <input data-step="1" name="name" type="text" required maxLength={100} autoComplete="name" className={`${fieldClass} h-[42px]`} />
        </Field>
        <Field label={labels.email} note={labels.required}>
          <input data-step="1" name="email" type="email" required maxLength={200} autoComplete="email" className={`${fieldClass} h-[42px]`} />
        </Field>
        <div className="flex justify-end">
          <button type="button" onClick={next} className={buttonClass}>
            {labels.next}
          </button>
        </div>
      </div>

      {step === 2 && (
        <div className="space-y-[14px]">
          <h2 className="mb-[25px] text-[24px] leading-[25px] text-white">{labels.step2Heading}</h2>
          <Field label={labels.company} note={labels.required}>
            <input name="company" type="text" required maxLength={200} autoComplete="organization" className={`${fieldClass} h-[42px]`} />
          </Field>
          <Field label={labels.url} note={labels.required}>
            <input name="url" type="text" inputMode="url" required maxLength={300} autoComplete="url" className={`${fieldClass} h-[42px]`} />
          </Field>
          <Field label={labels.topic}>
            <Select name="topic" options={labels.topicOptions} label={labels.topic} />
          </Field>
          <Field label={labels.budget}>
            <Select name="budget" options={labels.budgetOptions} label={labels.budget} />
          </Field>
          <Field label={labels.message}>
            <textarea name="message" maxLength={5000} className={`${fieldClass} h-[76px] resize-none py-2 leading-snug`} />
            <span className="mt-[10px] block text-[14px] leading-[14px]">{labels.messageHint}</span>
          </Field>
          {status === "error" && (
            <p role="alert" className="text-[14px] leading-tight text-lime">
              {error}
            </p>
          )}
          <div className="flex items-center justify-between pt-[22px]">
            <button type="button" onClick={() => setStep(1)} className={buttonClass}>
              {labels.back}
            </button>
            <button type="submit" disabled={status === "sending"} className={buttonClass}>
              {status === "sending" ? labels.sending : labels.submit}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
