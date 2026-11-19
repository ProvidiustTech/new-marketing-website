"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE, Reveal, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const DEFAULT_COPY =
  "We’ve got one connected experience for your customers and your team. Customers shouldn’t have to figure out which channel to use to get help. Your support operation should be ready wherever the conversation starts. ProvidiusTech brings your supported communication channels into one connected customer support system.";

type Channel = {
  id: string;
  name: string;
  color: string;
  icon: string;
  /** Card width in px at desktop size, and its resting tilt / drop. */
  w: number;
  rotate: number;
  top: number;
  /** Dot colour per row (null = line with no dot). */
  rows: (string | null)[];
  lines: number[];
  copy: string;
};

const TEAL = "#2dd4bf";
const BLUE = "#60a5fa";

const channels: Channel[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    color: "#11c866",
    icon: "ch-whatsapp",
    w: 219,
    rotate: -8,
    top: 152,
    rows: [TEAL, BLUE],
    lines: [64, 48],
    copy: "Answer WhatsApp customers instantly, around the clock, with AI agents that know your business and hand over to your team when needed.",
  },
  {
    id: "webchat",
    name: "Web Chat",
    color: "#087aff",
    icon: "ch-chat",
    w: 251,
    rotate: -5,
    top: 66,
    rows: [TEAL, BLUE, BLUE],
    lines: [72, 58, 72],
    copy: "Add a chat widget to your website in minutes and let AI resolve questions the moment visitors ask them.",
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#0866ff",
    icon: "facebook",
    w: 312,
    rotate: 0,
    top: 0,
    rows: [BLUE, BLUE, BLUE, BLUE],
    lines: [76, 62, 70, 62],
    copy: "Reply to Facebook Messenger conversations instantly, with answers drawn from your own knowledge base.",
  },
  {
    id: "email",
    name: "Email",
    color: "#2b7fff",
    icon: "mail",
    w: 268,
    rotate: 5,
    top: 40,
    rows: [null, null, null],
    lines: [86, 74, 86],
    copy: "Draft, triage, and reply to support email automatically, with answers grounded in your own knowledge base.",
  },
  {
    id: "telegram",
    name: "Telegram",
    color: "#1d8fe8",
    icon: "ch-telegram",
    w: 207,
    rotate: 4,
    top: 131,
    rows: [BLUE, BLUE, BLUE],
    lines: [72, 58, 72],
    copy: "Support customers who reach you on Telegram, with the same AI agents and the same shared inbox as every other channel.",
  },
];

function ChannelCard({ c }: { c: Channel }) {
  const big = c.w >= 300;
  return (
    <div
      className="flex size-full flex-col rounded-[22px] border-[3px] border-white bg-[#f1f8ff] p-5 shadow-[0_18px_40px_-24px_rgba(8,30,68,0.35)] md:p-6"
    >
      <span
        className="grid size-12 place-items-center rounded-[14px] md:size-[52px]"
        style={{ background: c.color }}
      >
        <img alt="" src={`/icons/${c.icon}.svg`} className="max-w-none scale-[1.6]" />
      </span>
      <p
        className={`mt-3 font-semibold tracking-[-0.4px] text-[#081e44] ${big ? "text-[26px]" : "text-[22px]"}`}
      >
        {c.name}
      </p>
      <div className={`mt-auto flex flex-col ${big ? "gap-3.5" : "gap-3"}`}>
        {c.rows.map((dot, i) => (
          <div key={i} className="flex items-center gap-3">
            {dot && <span className="size-[13px] shrink-0 rounded-full" style={{ background: dot }} />}
            <span
              className="block h-[9px] rounded-full bg-[#afd1f6]"
              style={{ width: `${c.lines[i]}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Channels() {
  const [active, setActive] = useState<string | null>(null);
  const current = channels.find((c) => c.id === active);

  const next = () => {
    const idx = channels.findIndex((c) => c.id === active);
    setActive(channels[(idx + 1) % channels.length].id);
  };

  return (
    <section id="channels" className="mx-auto mt-20 w-full max-w-[1340px] px-5 md:mt-28 md:px-10">
      {/* Tilted channel cards: an overlapping fan on desktop, a swipeable strip on smaller screens */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-8 pt-4 xl:mx-0 xl:justify-center xl:gap-0 xl:overflow-visible xl:px-0 xl:pb-0">
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
              className="channel-card relative shrink-0 cursor-pointer snap-center text-left outline-none"
              style={
                {
                  "--w": `${c.w}px`,
                  "--h": `${Math.round(c.w * (c.w >= 300 ? 0.97 : 1.17))}px`,
                  "--top": `${c.top}px`,
                  zIndex: c.rotate === 0 ? 5 : 5 - Math.abs(i - 2),
                } as React.CSSProperties
              }
            >
              <motion.div
                className="size-full"
                initial={false}
                animate={{
                  rotate: c.rotate,
                  y: isActive ? -14 : 0,
                  scale: isActive ? 1.04 : 1,
                  opacity: dimmed ? 0.55 : 1,
                }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <ChannelCard c={c} />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto mt-8 max-w-[794px] text-center xl:mt-0">
        <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.6px] text-[#18181b] sm:text-[34px] md:text-[38px]">
          <span className="block">
            <Words segments={[{ text: "Wherever your customers reach you," }]} />
          </span>
          <span className="block text-[#2563eb]">
            <Words delay={0.15} segments={[{ text: "support follows." }]} />
          </span>
        </h2>
        <Reveal delay={0.25} className="mx-auto mt-5 min-h-[120px] md:min-h-[72px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={active ?? "default"}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="font-jakarta text-[14px] leading-[1.55] text-[#71717a] md:text-[15px]"
            >
              {current && <span className="font-bold text-[#18181b]">{current.name}. </span>}
              {current ? current.copy : DEFAULT_COPY}
            </motion.p>
          </AnimatePresence>
        </Reveal>
      </div>

      <Reveal delay={0.35} className="mt-6 flex justify-center">
        <motion.button
          type="button"
          onClick={next}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex h-12 w-[280px] cursor-pointer items-center justify-center rounded-full bg-[#146ef5] px-7 text-[14px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(20,110,245,0.6)]"
        >
          Tap each channel to learn more
        </motion.button>
      </Reveal>
    </section>
  );
}
