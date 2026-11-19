"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE, Reveal, Words } from "./motion";


const DEFAULT_COPY =
  "We’ve got one connected experience for your customers and your team. Customers shouldn’t have to figure out which channel to use to get help. Your support operation should be ready wherever the conversation starts. ProvidiusTech brings your supported communication channels into one connected customer support system.";

type Channel = {
  id: string;
  name: string;
  color: string;
  /** Exact layout from the design's 1259×413 stage: bounding box + resting tilt. */
  x: number;
  y: number;
  bw: number;
  bh: number;
  w: number;
  h: number;
  rotate: number;
  name_px: number;
  icon_px: number;
  dot_px: number;
  line_px: number;
  rows: (string | null)[];
  lines: number[];
  copy: string;
};

const TEAL = "#2dd4bf";
const BLUE = "#4ea6f5";

const channels: Channel[] = [
  {
    id: "whatsapp", name: "WhatsApp", color: "#1fc15b",
    x: 0, y: 152, bw: 219, bh: 261, w: 190, h: 236, rotate: -8,
    name_px: 26, icon_px: 66, dot_px: 13, line_px: 10,
    rows: [TEAL, BLUE], lines: [76, 60],
    copy: "Answer WhatsApp customers instantly, around the clock, with AI agents that know your business and hand over to your team when needed.",
  },
  {
    id: "webchat", name: "Web Chat", color: "#0c7cf2",
    x: 207, y: 66, bw: 251, bh: 295, w: 226, h: 275, rotate: -5,
    name_px: 29, icon_px: 67, dot_px: 13, line_px: 10,
    rows: [TEAL, BLUE, BLUE], lines: [84, 66, 84],
    copy: "Add a chat widget to your website in minutes and let AI resolve questions the moment visitors ask them.",
  },
  {
    id: "facebook", name: "Facebook", color: "#0866ff",
    x: 472, y: 0, bw: 312, bh: 304, w: 300, h: 294, rotate: 0,
    name_px: 30, icon_px: 67, dot_px: 28, line_px: 11,
    rows: [BLUE, BLUE, BLUE, BLUE], lines: [80, 62, 80, 62],
    copy: "Reply to Facebook Messenger conversations instantly, with answers drawn from your own knowledge base.",
  },
  {
    id: "email", name: "Email", color: "#0c7cf2",
    x: 787, y: 40, bw: 268, bh: 301, w: 243, h: 280, rotate: 4,
    name_px: 30, icon_px: 64, dot_px: 0, line_px: 11,
    rows: [null, null, null], lines: [100, 84, 100],
    copy: "Draft, triage, and reply to support email automatically, with answers grounded in your own knowledge base.",
  },
  {
    id: "telegram", name: "Telegram", color: "#0c7cf2",
    x: 1052, y: 131, bw: 207, bh: 234, w: 192, h: 220, rotate: 4,
    name_px: 24, icon_px: 53, dot_px: 17, line_px: 8,
    rows: [BLUE, BLUE, BLUE], lines: [80, 66, 80],
    copy: "Support customers who reach you on Telegram, with the same AI agents and the same shared inbox as every other channel.",
  },
];

const STAGE_W = 1259;
const STAGE_H = 413;

/** Filled channel glyphs, drawn to sit on the coloured app-icon tile. */
function Glyph({ id }: { id: string }) {
  switch (id) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className="size-[58%]" aria-hidden>
          <path fill="none" stroke="#fff" strokeWidth="1.9" strokeLinejoin="round" d="M12 3.2a8.8 8.8 0 0 0-7.6 13.3L3.3 20.7l4.3-1.1A8.8 8.8 0 1 0 12 3.2Z" />
          <path fill="#fff" d="M9.1 7.9c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.8 1 1.5 1.7 2 .5.4 1 .7 1.6.9.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .4-.1 1.1-.6 1.5-.5.4-1.2.6-1.9.5-1.6-.3-3-1.1-4.2-2.2-1-1-1.9-2.2-2.3-3.6-.2-.7-.1-1.6.4-2.2.3-.4.7-.6 1.2-.6Z" />
        </svg>
      );
    case "webchat":
      return (
        <svg viewBox="0 0 24 24" className="size-[52%]" aria-hidden>
          <path fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" d="M3.5 4h17v12.2h-9.3L6 20.2v-4H3.5V4Z" />
          <circle cx="8.4" cy="10.2" r="1.25" fill="#fff" />
          <circle cx="12" cy="10.2" r="1.25" fill="#fff" />
          <circle cx="15.6" cy="10.2" r="1.25" fill="#fff" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className="size-[100%]" aria-hidden>
          <path fill="#fff" d="M15.6 24v-8.6h2.9l.5-3.4h-3.4V9.8c0-1 .3-1.7 1.7-1.7h1.8V5.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V12H9.2v3.4h2.9V24h3.5Z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" className="size-[55%]" aria-hidden>
          <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" fill="none" stroke="#fff" strokeWidth="2" />
          <path d="m3.4 6.3 8.6 6.5 8.6-6.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="size-[60%]" aria-hidden>
          <path fill="#fff" d="M20.7 3.6 2.9 10.4c-1.2.5-1.2 1.2 0 1.6l4.6 1.4 1.8 5.4c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.2c.3-1.3-.5-1.8-1.8-1.3ZM8.6 13.1l9.3-5.8c.5-.3.8-.1.5.2l-7.8 7-.3 3.3-1.7-4.7Z" />
        </svg>
      );
  }
}

function ChannelCard({ c }: { c: Channel }) {
  const flat = c.rotate === 0;
  return (
    <div
      className={`flex size-full flex-col rounded-[20px] px-[22px] pb-6 pt-[22px] ${
        flat
          ? "bg-[#e9f1fb]"
          : "border-[3px] border-white bg-[#eef5fd] shadow-[0_14px_34px_-18px_rgba(8,30,68,0.28)]"
      }`}
    >
      <span
        className={`grid shrink-0 place-items-center overflow-hidden rounded-[18px]`}
        style={{ width: c.icon_px, height: c.icon_px, background: c.color }}
      >
        <Glyph id={c.id} />
      </span>
      <p
        className="mt-2 font-semibold leading-[1.15] tracking-[-0.5px] text-[#081e44]"
        style={{ fontSize: c.name_px, marginTop: c.id === "facebook" ? 6 : 14 }}
      >
        {c.name}
      </p>
      <div className={`flex flex-col ${c.id === "facebook" ? "mt-3 gap-[8px]" : "mt-auto gap-3"}`}>
        {c.rows.map((dot, i) => (
          <div key={i} className="flex items-center gap-[14px]">
            {dot && (
              <span className="shrink-0 rounded-full" style={{ width: c.dot_px, height: c.dot_px, background: dot }} />
            )}
            <span
              className="block rounded-full bg-[#a9cdf3]"
              style={{ width: `${c.lines[i]}%`, height: c.line_px }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardButton({
  c,
  i,
  active,
  setActive,
  stage,
}: {
  c: Channel;
  i: number;
  active: string | null;
  setActive: (id: string | null) => void;
  stage?: boolean;
}) {
  const isActive = active === c.id;
  const dimmed = active !== null && !isActive;
  return (
    <motion.button
      type="button"
      aria-pressed={isActive}
      aria-label={`${c.name}: learn more`}
      onClick={() => setActive(isActive ? null : c.id)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.08 * i }}
      className={`cursor-pointer text-left outline-none ${stage ? "absolute grid place-items-center" : "relative shrink-0 snap-center"}`}
      style={
        stage
          ? { left: c.x, top: c.y, width: c.bw, height: c.bh, zIndex: c.rotate === 0 ? 1 : 2 }
          : { width: c.w * 0.82, height: c.h * 0.82 }
      }
    >
      <div style={stage ? undefined : { transform: "scale(0.82)", transformOrigin: "top left" }}>
        <motion.div
          style={{ width: c.w, height: c.h }}
          initial={false}
          animate={{ rotate: c.rotate, y: isActive ? -14 : 0, opacity: dimmed ? 0.55 : 1 }}
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <ChannelCard c={c} />
        </motion.div>
      </div>
    </motion.button>
  );
}

export default function Channels() {
  const [active, setActive] = useState<string | null>(null);
  const stageWrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fit the 1259px-wide design stage to the available width.
  useEffect(() => {
    const el = stageWrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / STAGE_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const current = channels.find((c) => c.id === active);

  const next = () => {
    const idx = channels.findIndex((c) => c.id === active);
    setActive(channels[(idx + 1) % channels.length].id);
  };

  return (
    <section id="channels" className="mx-auto mt-20 w-full max-w-[1339px] px-5 md:mt-[100px] md:px-10">
      {/* Tilted channel cards: the design's exact fan (scaled to fit) from tablet up, a swipeable strip on phones */}
      <div ref={stageWrap} className="relative hidden w-full md:block" style={{ height: STAGE_H * scale }}>
        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${scale})` }}
        >
          {channels.map((c, i) => (
            <CardButton key={c.id} c={c} i={i} active={active} setActive={setActive} stage />
          ))}
        </div>
      </div>
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-center gap-3 overflow-x-auto px-6 py-6 md:hidden">
        {channels.map((c, i) => (
          <CardButton key={c.id} c={c} i={i} active={active} setActive={setActive} />
        ))}
      </div>

      <div className="mx-auto mt-4 max-w-[794px] text-center md:mt-0">
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
