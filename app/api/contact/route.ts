import nodemailer from "nodemailer";
import { EMAIL } from "@/lib/site";

// Emails the support inbox over SMTP (Resend's SMTP relay). Required env vars,
// set in Vercel and in .env.local for local development:
//   SMTP_HOST=smtp.resend.com
//   SMTP_PORT=587
//   SMTP_USER=resend
//   SMTP_PASSWORD=re_...            (a Resend API key)
//   FROM_EMAIL=no-reply@contact.providiustech.com

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

const GENERIC_FAILURE = "We couldn't send your message right now. Please try again shortly.";

export async function POST(request: Request) {
  let input: { name?: unknown; email?: unknown; phone?: unknown; message?: unknown };
  try {
    input = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = typeof input.name === "string" ? input.name.trim().slice(0, 120) : "";
  const email = typeof input.email === "string" ? input.email.trim().slice(0, 200) : "";
  const phone = typeof input.phone === "string" ? input.phone.trim().slice(0, 40) : "";
  const message = typeof input.message === "string" ? input.message.trim().slice(0, 3000) : "";

  if (!name) return json({ error: "Please enter your name." }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: "Please enter a valid email address." }, 400);

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !FROM_EMAIL) {
    console.error("Contact form: SMTP environment variables are not fully set.");
    return json({ error: "Our contact form is being set up. Please email us directly." }, 500);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  const text = [
    "New enquiry from the Providiustech website",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    "",
    message || "(no message)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#1f1f1f;line-height:1.6">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry from the Providiustech website</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 16px 4px 0;color:#71717a">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#71717a">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#71717a">Phone</td><td>${escapeHtml(phone || "-")}</td></tr>
      </table>
      <p style="margin:20px 0 6px;color:#71717a">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message || "(no message)")}</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: EMAIL,
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    console.error("Contact form: SMTP send failed", err);
    return json({ error: GENERIC_FAILURE }, 502);
  }
}
