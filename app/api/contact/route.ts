import { NextResponse } from "next/server";
import { getUi, site } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = getUi("en").form.topicOptions;
const BUDGETS = getUi("en").form.budgetOptions;

function text(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The contact form is not set up yet. Please email me directly." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked and drop the message.
  if (text(body.fax, 10)) return NextResponse.json({ ok: true });

  const name = text(body.name, 100);
  const email = text(body.email, 200);
  const company = text(body.company, 200);
  const url = text(body.url, 300);
  const topic = text(body.topic, 50);
  const budget = text(body.budget, 50);
  const message = text(body.message, 5000);

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!company) return NextResponse.json({ error: "Please enter your company name." }, { status: 400 });
  if (!url) return NextResponse.json({ error: "Please enter your company URL." }, { status: 400 });
  if (topic && !TOPICS.includes(topic)) return NextResponse.json({ error: "Invalid topic." }, { status: 400 });
  if (budget && !BUDGETS.includes(budget)) return NextResponse.json({ error: "Invalid budget." }, { status: 400 });

  // Resend's shared test sender only delivers to the address the Resend account was
  // created with, so CONTACT_TO must be that address. With a verified domain, change
  // the sender to an address on it and CONTACT_TO can be any mailbox.
  const to = process.env.CONTACT_TO ?? site.email;
  const from = "Website <onboarding@resend.dev>";
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Company URL: ${url}`,
    `Topic: ${topic || "-"}`,
    `Monthly marketing budget: ${budget || "-"}`,
    "",
    message || "(no message)",
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New message from ${name} (${company}) via the website`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json(
      { error: "Your message could not be sent. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
