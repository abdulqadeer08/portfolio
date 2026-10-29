import { NextResponse } from "next/server";
import { profile } from "@/data/portfolio";

/**
 * Receives the contact form.
 *
 * Without configuration it validates the message and logs it, which is handy in
 * development. To receive real emails, set these environment variables (see
 * `.env.example`) and messages are delivered through Resend:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (optional)
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  budget?: unknown;
  interests?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend everything went fine.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const company = text(body.company, 120);
  const message = text(body.message, 5000);
  const budget = text(body.budget, 60);
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((item): item is string => typeof item === "string").slice(0, 10)
    : [];

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Please fill in your name, email and message." }, { status: 422 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const summary = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    interests.length > 0 && `Interested in: ${interests.join(", ")}`,
    budget && `Budget: ${budget}`,
    "",
    message,
  ]
    .filter((line) => line !== false && line !== "")
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // No Resend key: deliver through FormSubmit to the address in the profile.
    // The first message triggers a one-time activation email to that inbox.
    const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        interests: interests.join(", "),
        budget,
        message,
        _subject: `New enquiry from ${name}`,
        _replyto: email,
        _template: "table",
      }),
    }).catch(() => null);
    if (!response?.ok) {
      return NextResponse.json({ ok: false, error: "Your message couldn't be sent. Please email me directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ||"Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text: summary,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error", response.status, await response.text());
    return NextResponse.json(
      { ok: false, error: "Your message couldn't be sent. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
