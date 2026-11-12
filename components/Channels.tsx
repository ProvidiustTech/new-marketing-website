"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE, Reveal, Words } from "./motion";

const DEFAULT_COPY =
  "Bring AI agents, unified conversations, and human support together in one powerful, easy-to-use platform.";

// Positions are relative to the top of the card cluster in the design.
const channels = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    src: "ch-whatsapp",
    left: 90,
    top: 152,
    w: 219,
    h: 261,
    from: { x: 420, y: 120, rotate: 14 },
    copy: "Answer WhatsApp customers instantly, around the clock, with AI agents that know your business and hand over to your team when needed.",
  },
  {
    id: "webchat",
    name: "Web Chat",
    src: "ch-webchat",
    left: 297,
    top: 66,
    w: 251,
    h: 295,
    from: { x: 240, y: 140, rotate: 9 },
    copy: "Add a chat widget to your website in minutes and let AI resolve questions the moment visitors ask them.",
  },
  {
    id: "omni",
    name: "Omnichannel Inbox",
    src: "ch-omni",
    left: 562,
    top: 0,
    w: 312,
    h: 304,
    from: { x: 0, y: 160, rotate: 0 },
    copy: "Every conversation from every channel in one shared inbox, so nothing slips through and your team always has the full context.",
  },
  {
    id: "email",
    name: "Email",
    src: "ch-email",
    left: 877,
    top: 40,
    w: 268,
    h: 301,
    from: { x: -240, y: 140, rotate: -9 },
    copy: "Draft, triage, and reply to support email automatically, with answers grounded in your own knowledge base.",
  },
  {
    id: "voice",
    name: "Voice",
    src: "ch-voice",
    left: 1142,
    top: 131,
    w: 207,
    h: 234,
    from: { x: -420, y: 120, rotate: -14 },
    copy: "AI voice agents pick up every call, take bookings, answer questions, and escalate to a human when it matters.",
  },
];

export default function Channels() {
  const [active, setActive] = useState<string | null>(null);
  const current = channels.find((c) => c.id === active);

  return (
    <section
      id="channels"
      className="relative mt-[91px] h-[602px] w-full max-md:mt-[56px] max-md:h-[384px]"
    >
      <div className="absolute left-0 top-0 h-[420px] w-[1440px] max-md:[zoom:0.2708]">
        {channels.map((c, i) => {
          const isActive = active === c.id;
          const dimmed = active !== null && !isActive;
          return (
            <motion.button
              key={c.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`${c.name}: learn more`}
              onClick={() => setActive(isActive ? null : c.id)}
              className="absolute cursor-pointer outline-none"
              style={{ left: c.left, top: c.top, width: c.w, height: c.h, zIndex: isActive ? 5 : 1 }}
              initial={{ opacity: 0, scale: 0.6, ...c.from }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.08 * Math.abs(i - 2) }}
            >
              <motion.span
                className="block size-full"
                animate={{ y: isActive ? -18 : 0, scale: isActive ? 1.06 : 1, opacity: dimmed ? 0.55 : 1 }}
                whileHover={{ y: -14, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={c.name}
                  src={`/img/${c.src}.webp`}
                  draggable={false}
                  className="size-full animate-floaty object-cover"
                  style={{ animationDelay: `${-i * 1.3}s`, animationDuration: `${6 + i * 0.6}s` }}
                />
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div className="absolute left-[376px] top-[374px] w-[672px] text-center font-jakarta max-md:left-[20px] max-md:top-[128px] max-md:w-[350px]">
        <h2 className="text-[36px] font-bold leading-[40px] max-md:text-[26px] max-md:leading-[30px]">
          <span className="block text-[#18181b]">
            <Words segments={[{ text: "A simple approach to" }]} />
          </span>
          <span className="block text-[#2563eb]">
            <Words delay={0.15} segments={[{ text: "modern customer support" }]} />
          </span>
        </h2>
        <Reveal delay={0.25} className="relative mt-[20px] h-[60px] max-md:h-[84px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={active ?? "default"}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute -inset-x-[5px] top-0 text-[15px] leading-[24px] text-[#71717a]"
            >
              {current && <span className="font-bold text-[#18181b]">{current.name}. </span>}
              {current ? current.copy : DEFAULT_COPY}
            </motion.p>
          </AnimatePresence>
        </Reveal>
        <Reveal delay={0.35} className="mt-[20px] flex justify-center">
          <motion.button
            type="button"
            onClick={() => {
              const idx = channels.findIndex((c) => c.id === active);
              setActive(channels[(idx + 1) % channels.length].id);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-[48px] w-[280px] cursor-pointer items-center justify-center rounded-full bg-[#146ef5] px-[24px] text-[14px] font-bold leading-[18.667px] text-white"
          >
            Tap each channel to learn more
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
