"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE, Reveal, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const DEFAULT_COPY =
  "Bring AI agents, unified conversations, and human support together in one powerful, easy-to-use platform.";

const channels = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    src: "ch-whatsapp",
    copy: "Answer WhatsApp customers instantly, around the clock, with AI agents that know your business and hand over to your team when needed.",
  },
  {
    id: "webchat",
    name: "Web Chat",
    src: "ch-webchat",
    copy: "Add a chat widget to your website in minutes and let AI resolve questions the moment visitors ask them.",
  },
  {
    id: "omni",
    name: "Omnichannel Inbox",
    src: "ch-omni",
    copy: "Every conversation from every channel in one shared inbox, so nothing slips through and your team always has the full context.",
  },
  {
    id: "email",
    name: "Email",
    src: "ch-email",
    copy: "Draft, triage, and reply to support email automatically, with answers grounded in your own knowledge base.",
  },
  {
    id: "voice",
    name: "Voice",
    src: "ch-voice",
    copy: "AI voice agents pick up every call, take bookings, answer questions, and escalate to a human when it matters.",
  },
];

export default function Channels() {
  const [active, setActive] = useState<string | null>(null);
  const current = channels.find((c) => c.id === active);

  const next = () => {
    const idx = channels.findIndex((c) => c.id === active);
    setActive(channels[(idx + 1) % channels.length].id);
  };

  return (
    <section id="channels" className="mx-auto mt-20 w-full max-w-[1240px] px-5 md:mt-28 md:px-10">
      <div className="text-center font-jakarta">
        <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.6px] text-[#18181b] sm:text-[36px] md:text-[44px]">
          <span className="block">
            <Words segments={[{ text: "A simple approach to" }]} />
          </span>
          <span className="block text-[#2563eb]">
            <Words delay={0.15} segments={[{ text: "modern customer support" }]} />
          </span>
        </h2>
        <Reveal delay={0.25} className="mx-auto mt-5 min-h-[72px] max-w-[640px] md:min-h-[56px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={active ?? "default"}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-[15px] leading-[1.6] text-[#71717a] md:text-[17px]"
            >
              {current && <span className="font-bold text-[#18181b]">{current.name}. </span>}
              {current ? current.copy : DEFAULT_COPY}
            </motion.p>
          </AnimatePresence>
        </Reveal>
      </div>

      {/* Channel cards: a row on desktop, a swipeable strip on phones */}
      <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-14 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
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
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.08 * i }}
              className="group relative w-[62vw] max-w-[260px] shrink-0 cursor-pointer snap-center overflow-hidden rounded-[24px] outline-none md:w-auto md:max-w-none"
            >
              <motion.div
                className="relative aspect-[4/5] w-full"
                animate={{ y: isActive ? -14 : 0, scale: isActive ? 1.03 : 1, opacity: dimmed ? 0.5 : 1 }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <img
                  alt={c.name}
                  src={`/img/${c.src}.webp`}
                  draggable={false}
                  className="size-full object-cover"
                />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <Reveal delay={0.35} className="mt-8 flex justify-center">
        <motion.button
          type="button"
          onClick={next}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#146ef5] px-7 text-[14px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(20,110,245,0.6)]"
        >
          Tap each channel to learn more
        </motion.button>
      </Reveal>
    </section>
  );
}
