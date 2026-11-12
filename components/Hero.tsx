"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CtaButton from "./CtaButton";
import { EASE, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const NewMessage = () => (
  <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#2563eb] px-2.5 py-1.5 font-sans text-[12px] font-medium leading-none text-white whitespace-nowrap md:text-[13px]">
    + New Message
  </div>
);

const AppIdentity = ({ color, icon, name }: { color: string; icon: string; name: string }) => (
  <div className="flex shrink-0 items-center gap-2.5">
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md" style={{ background: color }}>
      <img alt="" src={`/icons/${icon}.svg`} className="size-3.5" />
    </div>
    <div className="flex flex-col items-start whitespace-nowrap">
      <p className="text-[12px] font-semibold text-[#171717]">{name}</p>
      <p className="text-[9px] text-[#989898]">Providius Tech</p>
    </div>
  </div>
);

const Pill = ({ className, children }: { className: string; children: string }) => (
  <span className={`rounded px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${className}`}>
    {children}
  </span>
);

// Each channel window slides up out of the one in front of it.
const windowIn = (delay: number) => ({
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 1, delay, ease: EASE },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-[1280px] overflow-hidden rounded-[28px] bg-[#0b5fd0] px-5 pb-0 pt-24 md:mt-5 md:w-[calc(100%-5rem)] md:rounded-[36px] md:px-10 md:pb-0 md:pt-28"
    >
      <motion.div className="pointer-events-none absolute -inset-y-12 inset-x-0" style={{ y: bgY }}>
        <motion.img
          alt=""
          src="/img/hero-bg.webp"
          className="size-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a3f7a]/30 via-transparent to-[#0a3f7a]/60" />

      <div className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center text-center text-white">
        <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-1.4px] sm:text-[52px] md:text-[64px]">
          <span className="block">
            <Words onView={false} delay={0.3} segments={[{ text: "New Frontiers In" }]} />
          </span>
          <span className="block text-[#a8efff]">
            <Words onView={false} delay={0.45} segments={[{ text: "Customer Support" }]} />
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="mt-5 max-w-[560px] text-[16px] leading-[1.55] text-white/90 md:mt-6 md:text-[19px]"
        >
          Grow your business without growing support.
          <br className="hidden sm:block" /> AI agents, channels, and infrastructure that scales with you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-8"
        >
          <CtaButton href="https://dashboard.providiustech.com" />
        </motion.div>
      </div>

      {/* Product workspace preview: three channel windows stacked over the live dashboard */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1000px] md:mt-12">
        <div className="flex flex-col">
          <motion.div
            {...windowIn(1.5)}
            className="relative z-30 mx-auto flex w-[94%] items-center gap-3 rounded-t-2xl border border-[#eee] bg-white px-4 py-3 md:w-[96%] md:px-6"
          >
            <AppIdentity color="#25d366" icon="message-circle" name="WhatsApp" />
            <div className="hidden items-center gap-2 md:flex">
              <Pill className="bg-[#e8f5e9] text-[#2e7d32]">Active</Pill>
              <p className="text-[11px] text-[#7d7d7d]">12:45 PM</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <img alt="" src="/img/collab-wa.webp" className="hidden h-[18px] w-[69px] rounded md:block" />
              <NewMessage />
            </div>
          </motion.div>

          <motion.div
            {...windowIn(1.35)}
            className="relative z-20 mx-auto -mt-2 flex w-[97%] items-center gap-3 rounded-t-2xl border border-[#eee] bg-[#fafafa] px-4 py-2.5 md:px-6"
          >
            <AppIdentity color="#1877f2" icon="facebook" name="Facebook" />
            <p className="hidden text-[13px] font-semibold text-[#414141] md:block">
              September <span className="font-normal text-[#c4c4c4]">2026</span>
            </p>
            <div className="ml-auto flex items-center gap-2">
              <Pill className="bg-[#f3f4f6] text-[#6b7280]">Idle</Pill>
              <p className="hidden text-[11px] text-[#7d7d7d] sm:block">Yesterday</p>
            </div>
          </motion.div>

          <motion.div
            {...windowIn(1.2)}
            className="relative z-10 mx-auto -mt-2 flex w-full items-center gap-3 rounded-t-2xl border border-[#eee] bg-white px-4 py-3 md:px-6"
          >
            <AppIdentity color="#e1306c" icon="instagram" name="Instagram" />
            <p className="hidden text-[12px] text-[#7d7d7d] md:block">General</p>
            <div className="ml-auto flex items-center gap-2">
              <Pill className="bg-[#fff3e0] text-[#e65100]">Pending</Pill>
              <p className="hidden text-[11px] text-[#7d7d7d] sm:block">2 mins ago</p>
            </div>
          </motion.div>

          {/* Dashboard screenshot, cropped by the hero's bottom edge */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
            className="aspect-[16/9] overflow-hidden rounded-b-2xl border border-t-0 border-[#e5e5e5] bg-white shadow-[0_30px_80px_-30px_rgba(3,20,50,0.5)]"
          >
            <img
              src="/img/hero-dashboard.webp"
              alt="The Providiustech dashboard showing AI-handled conversations across Instagram, WhatsApp, Messenger, Email and Telegram"
              className="block h-full w-full object-cover object-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
