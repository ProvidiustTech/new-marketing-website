"use client";

import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { EMAIL, SOCIALS, WHATSAPP_NUMBER, whatsappLink } from "@/lib/site";
import { Reveal } from "./motion";

/* eslint-disable @next/next/no-img-element */

const quickLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#how-it-works" },
  { label: "About us", href: "#about" },
  { label: "Resources", href: "#faq" },
];

const socials = [
  {
    label: "Facebook",
    href: SOCIALS.facebook,
    icon: (
      <path d="M13.5 8.5H16V5.2h-2.7c-2.6 0-4.1 1.6-4.1 4.2v2.1H7v3.3h2.2V21h3.3v-6.2h2.7l.4-3.3h-3.1v-1.9c0-.9.3-1.6 1.6-1.6z" />
    ),
  },
  {
    label: "Instagram",
    href: SOCIALS.instagram,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.1" />
      </>
    ),
  },
  {
    label: "X",
    href: SOCIALS.x,
    icon: (
      <path d="M17.7 4h2.9l-6.3 7.2L21.4 20h-5.8l-4.5-5.9L6 20H3.1l6.7-7.7L2.7 4h6l4.1 5.4L17.7 4zm-1 14.3h1.6L7.4 5.6H5.6l11.1 12.7z" />
    ),
  },
];

const Heading = ({ children }: { children: string }) => (
  <p className="text-[12px] font-semibold uppercase tracking-[1.6px] text-[#5aa7ff]">{children}</p>
);

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="flex w-full flex-col gap-1.5 rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-[#5aa7ff] hover:border-white/30">
      <span className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/45">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-transparent text-[15px] text-white caret-[#5aa7ff] outline-none placeholder:text-white/30"
      />
    </label>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function Footer() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Posts the form to /api/contact, which emails the support inbox.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.");
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="relative mt-20 w-full overflow-hidden bg-[#111216] text-white md:mt-28">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-10 md:py-24">
        {/* Contact form → WhatsApp */}
        <Reveal className="rounded-[28px] border border-white/10 bg-[#17181c] p-6 sm:p-8 md:p-10">
          <Heading>Feedback</Heading>
          <h2 className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-[-0.6px] md:text-[34px]">
            <span className="text-white/45">Seeking personalized support?</span> Request a message from
            our team
          </h2>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" autoComplete="name" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
            </div>
            <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" required={false} />
            <label className="flex w-full flex-col gap-1.5 rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-[#5aa7ff] hover:border-white/30">
              <span className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/45">
                How can we help? (optional)
              </span>
              <textarea
                name="message"
                rows={3}
                className="w-full resize-none bg-transparent text-[15px] text-white caret-[#5aa7ff] outline-none placeholder:text-white/30"
              />
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#146ef5] px-8 py-3 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(20,110,245,0.7)] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </motion.button>
              <p
                className={`min-h-[1.25rem] text-[13px] ${status === "error" ? "text-[#fca5a5]" : "text-white/60"}`}
                role="status"
                aria-live="polite"
              >
                {status === "sent" && "Thanks — your message has been sent to our team. ✓"}
                {status === "error" && error}
                {(status === "idle" || status === "sending") && "We reply to every message from support@providiustech.com."}
              </p>
            </div>
          </form>
        </Reveal>

        {/* Contact details + links */}
        <Reveal delay={0.12} className="flex flex-col justify-between gap-12">
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Heading>Quick links</Heading>
              <nav className="flex flex-col gap-3 text-[15px] text-white/85">
                {quickLinks.map((l) => (
                  <a key={l.label} href={l.href} className="group relative w-fit transition-colors hover:text-white">
                    {l.label}
                    <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <Heading>Contact us</Heading>
              <div className="flex flex-col gap-3 text-[15px] text-white/85">
                <a href={whatsappLink()} className="transition-colors hover:text-white">
                  WhatsApp: {WHATSAPP_NUMBER}
                </a>
                <a href={`mailto:${EMAIL}`} className="break-all transition-colors hover:text-white">
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Heading>Follow us</Heading>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.12)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="grid size-12 place-items-center rounded-full border border-white/15 text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                    {s.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img alt="" src="/img/logo-mark.png" className="h-9 w-[34px] object-contain" />
              <p className="relative text-[22px] font-semibold tracking-[-0.4px]">
                Providiustech
                <sup className="absolute -right-[10px] top-[2px] text-[9px] font-normal leading-none">™</sup>
              </p>
            </div>
            <p className="text-[13px] text-white/45">© 2026 ProvidiusTech. All rights reserved.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
