"use client";

import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { EMAIL, SOCIALS, WHATSAPP_NUMBER, whatsappLink } from "@/lib/site";
import { Reveal } from "./motion";

/* eslint-disable @next/next/no-img-element */

const infoLinks = [
  { label: "Company", href: "#about" },
  { label: "Products", href: "#how-it-works" },
  { label: "Pricing", href: "#contact" },
  { label: "Services", href: "#channels" },
];

const aboutLinks = [
  { label: "Our Team", href: "#about" },
  { label: "Contacts", href: "#contact" },
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
  <p className="text-[14px] font-medium uppercase tracking-[0.4px] text-[#2f7bff]">{children}</p>
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
    <label className="flex h-[50px] w-full flex-col justify-center gap-0.5 rounded-[10px] border border-white/20 px-3 transition-colors focus-within:border-white/80 hover:border-white/40">
      <span className="text-[8px] font-medium uppercase tracking-[0.4px] text-white/55">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-transparent text-[13px] text-white caret-white outline-none placeholder:text-white/30"
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
    <footer id="contact" className="relative w-full bg-[#22242a] text-white">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-12 px-5 pb-10 pt-14 md:grid-cols-[354px_1fr] md:gap-[116px] md:px-[66px] md:pb-6 md:pt-[58px]">
        {/* Request form, emailed to the support inbox */}
        <Reveal className="rounded-[12px] bg-[#1b1c21] px-[21px] pb-6 pt-[34px]">
          <p className="text-[9px] font-medium uppercase tracking-[0.3px] text-[#2f7bff]">Feedback</p>
          <h2 className="mt-[22px] text-[22px] font-normal leading-[1.45] tracking-[-0.3px]">
            <span className="text-white/55">Seeking personalized support?</span> Request a message&nbsp; from
            our team
          </h2>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-[14px]">
            <Field label="Your name" name="name" autoComplete="name" />
            <Field label="Mail" name="email" type="email" autoComplete="email" />

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-[9px] inline-flex h-9 w-fit cursor-pointer items-center justify-center rounded-full bg-[#146ef5] px-7 text-[12px] font-medium text-white disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Send a request"}
            </motion.button>
            <p
              className={`min-h-4 text-[11px] ${status === "error" ? "text-[#fca5a5]" : "text-white/60"}`}
              role="status"
              aria-live="polite"
            >
              {status === "sent" && "Thanks — your request has been sent to our team. ✓"}
              {status === "error" && error}
            </p>
          </form>
          <p className="mt-6 text-[9px] text-white/45">Privacy</p>
        </Reveal>

        {/* Links, contact details and socials */}
        <Reveal delay={0.12} className="relative flex flex-col gap-10 pt-[30px]">
          <img
            alt="Providiustech"
            src="/img/footer-logo.png"
            className="absolute right-0 top-[28px] hidden h-[41px] w-auto md:block"
          />
          <div className="grid grid-cols-2 gap-10 md:max-w-[480px] md:gap-[115px]">
            <div className="flex flex-col gap-[22px]">
              <Heading>Info</Heading>
              <nav className="flex flex-col gap-[7px] text-[11px] text-white/90">
                {infoLinks.map((l) => (
                  <a key={l.label} href={l.href} className="w-fit transition-colors hover:text-white">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-col gap-[22px]">
              <Heading>About us</Heading>
              <nav className="flex flex-col gap-[7px] text-[11px] text-white/90">
                {aboutLinks.map((l) => (
                  <a key={l.label} href={l.href} className="w-fit transition-colors hover:text-white">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col gap-[22px]">
            <Heading>Contact us</Heading>
            <div className="flex flex-col gap-[7px] text-[11px] text-white/90">
              <a href={whatsappLink()} className="w-fit transition-colors hover:text-white">
                WhatsApp: {WHATSAPP_NUMBER}
              </a>
              <a href={`mailto:${EMAIL}`} className="w-fit break-all transition-colors hover:text-white">
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-[11px]">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.08)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="grid size-[45px] place-items-center rounded-full border border-white/15 text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden>
                    {s.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
            <p className="text-[8px] text-white/45">© 2026 — Copyright</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
