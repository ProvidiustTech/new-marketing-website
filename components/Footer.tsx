"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { EASE, Reveal } from "./motion";

/* eslint-disable @next/next/no-img-element */

const info = ["Company", "Products", "Pricing", "Services"];
const about = ["Our Team", "Contacts"];
const contact = ["+1 (999) 999-99-99", "hello@logoipsum.com", "London"];
const socials = ["Facebook", "Instagram", "YouTube", "Twitter"];

const FooterLink = ({ children }: { children: string }) => (
  <a href="#" className="group relative w-fit">
    {children}
    <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 ease-out group-hover:scale-x-100" />
  </a>
);

const Heading = ({ children }: { children: string }) => (
  <p className="w-full text-[16px] font-medium uppercase leading-[1.4] tracking-[0.64px] text-[#146ef5]">
    {children}
  </p>
);

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete: string;
}) {
  return (
    <label className="flex h-[56px] w-full cursor-text flex-col items-start gap-[4px] rounded-[12px] border border-white/25 px-[12px] py-[8px] transition-colors duration-300 focus-within:border-white/60 hover:border-white/40">
      <span className="text-[10px] font-medium uppercase leading-[1.4] tracking-[0.4px] text-white/40">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="w-full bg-transparent text-[14px] leading-[1.4] text-white caret-[#146ef5] outline-none"
      />
    </label>
  );
}

export default function Footer() {
  const [sent, setSent] = useState(false);

  // No backend is wired up yet: this only confirms in the UI.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer
      id="contact"
      className="flex w-full items-center gap-[128px] overflow-clip bg-[#22242a] px-[108px] pb-[24px] pt-[64px] font-inter max-md:flex-col max-md:items-stretch max-md:gap-[20px] max-md:px-[16px] max-md:pt-[32px]"
    >
      <Reveal className="flex h-[461px] w-[392px] shrink-0 flex-col items-start justify-between overflow-clip rounded-[16px] bg-[#17181c] px-[24px] py-[32px] max-md:w-full">
        <form onSubmit={onSubmit} className="flex w-full flex-col items-start gap-[24px]">
          <div className="flex flex-col items-start gap-[20px]">
            <p className="text-[10px] font-medium uppercase leading-[1.4] tracking-[0.4px] text-[#146ef5]">
              Feedback
            </p>
            <p className="w-[320px] font-sans text-[28px] leading-[1.3] tracking-[-0.56px] text-white">
              <span className="text-white/40">Seeking personalized support?</span> Request a message
              from our team
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-[16px]">
            <Field label="Your name" name="name" autoComplete="name" />
            <Field label="Mail" name="email" type="email" autoComplete="email" />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex cursor-pointer items-center justify-center overflow-clip rounded-[50px] bg-[#146ef5] px-[32px] py-[10px] text-[14px] font-medium leading-[1.4] text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={sent ? "sent" : "idle"}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {sent ? "Request sent ✓" : "Send a request"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </form>
        <a href="#" className="text-[10px] leading-[1.4] text-white/40 transition-colors hover:text-white/80">
          Privacy
        </a>
      </Reveal>

      <Reveal
        delay={0.12}
        className="flex h-[461px] w-[704px] shrink-0 flex-col items-start justify-between py-[32px] max-md:h-auto max-md:w-full max-md:gap-[36px] max-md:px-[8px]"
      >
        <div className="flex w-full flex-col items-start gap-[36px]">
          <div className="flex w-full items-start gap-[24px]">
            <div className="flex min-w-px flex-1 flex-col items-start gap-[24px]">
              <Heading>Info</Heading>
              <div className="flex w-full flex-col items-start gap-[5px] text-[14px] leading-[1.4] text-white">
                {info.map((l) => (
                  <FooterLink key={l}>{l}</FooterLink>
                ))}
              </div>
            </div>
            <div className="flex min-w-px flex-1 flex-col items-start gap-[24px]">
              <Heading>About us</Heading>
              <div className="flex w-full flex-col items-start gap-[5px] text-[14px] leading-[1.4] text-white">
                {about.map((l) => (
                  <FooterLink key={l}>{l}</FooterLink>
                ))}
              </div>
            </div>
            <motion.img
              alt="ProvidiusTech"
              src="/img/footer-logo.png"
              className="h-[53px] w-[50px] shrink-0"
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            />
          </div>
          <div className="flex w-full flex-col items-start gap-[24px]">
            <Heading>Contact us</Heading>
            <div className="flex w-full flex-col items-start gap-[5px] text-[14px] leading-[1.4] text-white">
              {contact.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="flex items-center gap-[12px]">
            {socials.map((s, i) => (
              <motion.a
                key={s}
                href="#"
                aria-label={s}
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="size-[50px] rounded-full"
              >
                <img alt="" src={`/icons/social-${i + 1}.svg`} className="size-[50px]" />
              </motion.a>
            ))}
          </div>
          <p className="text-[10px] leading-[1.4] text-white/40 whitespace-nowrap">© 2026 Copyright</p>
        </div>
      </Reveal>
    </footer>
  );
}
