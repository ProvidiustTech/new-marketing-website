"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CtaButton from "./CtaButton";
import { EASE, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const NewMessage = () => (
  <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#2563eb] p-2 font-sans text-[12px] font-medium leading-none text-white whitespace-nowrap md:text-[14px]">
    + New Message
  </div>
);

const AppIdentity = ({ color, icon, name }: { color: string; icon: string; name: string }) => (
  <div className="flex shrink-0 items-center gap-2.5">
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md" style={{ background: color }}>
      <img alt="" src={`/icons/${icon}.svg`} className="size-3.5" />
    </div>
    <div className="flex flex-col items-start whitespace-nowrap">
      <p className="font-inter text-[11px] font-semibold text-[#171717]">{name}</p>
      <p className="font-inter text-[8px] text-[#989898]">Providius Tech</p>
    </div>
  </div>
);

const Pill = ({ className, children }: { className: string; children: string }) => (
  <span className={`rounded px-2 py-0.5 font-inter text-[9px] font-semibold whitespace-nowrap ${className}`}>
    {children}
  </span>
);

type Row = {
  avatar: string;
  name: string;
  handle: string;
  bold?: boolean;
  dot?: "live" | "done" | "none";
  request: string;
  outcome: string;
  outcomeClass: string;
  muted?: boolean;
  duration: string;
  status: "LIVE" | "DONE" | "MISSED" | "ESCALATED";
  selected?: boolean;
};

const ROWS: Row[] = [
  { avatar: "avatar-1", name: "Amara Solis", handle: "@amara.solis.ig", bold: true, dot: "live", request: "Restaurant booking for 6", outcome: "Table confirmed Fri 8 PM", outcomeClass: "font-medium text-[#22c55e]", duration: "0:24 live", status: "LIVE", selected: true },
  { avatar: "avatar-2", name: "Jordan Kim", handle: "@jordankim_dines", bold: true, dot: "live", request: "Hours & menu inquiry", outcome: "Pilot answering now...", outcomeClass: "text-[#b2b2b2]", duration: "0:08 live", status: "LIVE", selected: true },
  { avatar: "avatar-3", name: "Maria Chen", handle: "@mariachen_foodie", dot: "done", request: "Reservation change Sat → Sun, party of 4", outcome: "Rescheduled confirmed", outcomeClass: "font-medium text-[#22c55e]", duration: "1:52", status: "DONE" },
  { avatar: "avatar-4", name: "@luca_visconti", handle: "+233 (415) 882-3301", dot: "none", request: "Parking & valet options inquiry", outcome: "Info provided, no booking needed", outcomeClass: "text-[#b2b2b2]", muted: true, duration: "0:47", status: "DONE" },
  { avatar: "avatar-5", name: "@sara.bellini", handle: "+233 (628) 443-0129", dot: "none", request: "Private event enquiry", outcome: "Missed — callback pending", outcomeClass: "text-[#1f3cff]", muted: true, duration: "—", status: "MISSED" },
  { avatar: "avatar-6", name: "Priya Sharma", handle: "@priyasharma_eats", dot: "done", request: "Takeout order – pasta + tiramisu –", outcome: "Order placed, pickup 7:30 PM", outcomeClass: "font-medium text-[#22c55e]", duration: "2:11", status: "DONE" },
  { avatar: "avatar-7", name: "@nightwatch_official", handle: "+1 (510) 774-8823", dot: "done", request: "Complaint – wrong order delivered", outcome: "Escalated to manager", outcomeClass: "font-medium text-[#f59e0b]", duration: "3:04", status: "ESCALATED" },
];

const STATUS: Record<Row["status"], string> = {
  LIVE: "bg-[#fef3c7] text-[#d97706]",
  DONE: "bg-[#f0fdf4] text-[#16a34a]",
  MISSED: "bg-[#fef2f2] text-[#dc2626]",
  ESCALATED: "bg-[#fffbeb] text-[#d97706]",
};

const NAV = [
  { icon: "inbox", label: "All Calls", active: true },
  { icon: "send", label: "Completed" },
  { icon: "calendar", label: "Bookings" },
  { icon: "alert", label: "Missed" },
  { icon: "archive", label: "Escalated" },
  { icon: "trash", label: "Spam" },
];

/** The live "Message Log" dashboard from the design, built in markup so it stays crisp. */
function Dashboard() {
  return (
    <div className="flex h-[430px] overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white font-inter text-left">
      <aside className="hidden w-[172px] shrink-0 flex-col bg-[#f5f5f5] md:flex">
        <div className="flex h-[49px] items-center px-[14px]">
          <img alt="Providiustech" src="/img/logo.png" width={720} height={135} className="h-[18px] w-auto brightness-0 opacity-85" />
        </div>
        <div className="flex flex-col gap-px px-[7px]">
          <div className="flex h-7 items-center gap-[5px] rounded-[7px] bg-white px-[7px]">
            <img alt="" src="/icons/phone-call.svg" className="size-[13px]" />
            <span className="text-[11.5px] text-[#171717]">Live message</span>
            <span className="grid h-[14px] place-items-center rounded-[4px] bg-[#1f3cff] px-1 text-[8px] font-semibold text-white">2</span>
          </div>
          {[
            ["search", "Search"],
            ["settings", "Settings"],
          ].map(([icon, label]) => (
            <div key={label} className="flex h-7 items-center gap-[5px] px-[7px]">
              <img alt="" src={`/icons/${icon}.svg`} className="size-[13px]" />
              <span className="text-[11.5px] text-[#7d7d7d]">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col pl-[11px] pr-[10px] pt-3">
          <p className="text-[9px] leading-4 text-[#7d7d7d]">CALLS</p>
          {NAV.map((n) => (
            <div
              key={n.label}
              className={`flex h-7 items-center gap-[5px] rounded-[5px] px-[7px] ${n.active ? "bg-[#ebebeb]" : ""}`}
            >
              <img alt="" src={`/icons/${n.icon}.svg`} className="size-[13px]" />
              <span className={`text-[11.5px] ${n.active ? "text-[#171717]" : "text-[#7d7d7d]"}`}>{n.label}</span>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[43px] shrink-0 items-center pl-[17px] pr-[14px]">
          <p className="text-[14px] font-semibold text-[#171717]">
            Message Log <span className="font-medium text-[#1f3cff]">12</span>
          </p>
        </div>
        <div className="flex h-8 shrink-0 items-center gap-4 overflow-hidden border-b border-[#eee] bg-[#fafafa] pl-[18px] pr-4 text-[9px] whitespace-nowrap">
          <p>
            <span className="text-[#b2b2b2]">TODAY </span>
            <span className="font-semibold text-[#171717]">38 messages</span>
          </p>
          <p className="flex items-center gap-1 text-[#7d7d7d]">
            <span className="size-[5px] rounded-full bg-[#22c55e]" /> 31 resolved
          </p>
          <p className="flex items-center gap-1 text-[#7d7d7d]">
            <span className="size-[5px] rounded-full bg-[#1f3cff]" /> 4 missed
          </p>
          <p className="flex items-center gap-1 text-[#7d7d7d]">
            <span className="size-[5px] rounded-full bg-[#f59e0b]" /> 2 live now
          </p>
          <p className="hidden text-[#7d7d7d] sm:block">avg 1m 42s</p>
        </div>
        <div className="flex h-7 shrink-0 items-center gap-[9px] border-b border-[#eee] bg-[#fafafa] pl-[18px] pr-4 text-[9px] text-[#b2b2b2]">
          <span className="size-[11px] shrink-0 rounded-[1px] border border-[#e6e6e6] bg-white" />
          <span className="w-6 shrink-0" />
          <span className="w-[92px] shrink-0 pl-[3px] sm:w-[160px]">CALLER</span>
          <span className="min-w-0 flex-1">REQUEST &amp; OUTCOME</span>
          <span className="hidden w-[60px] shrink-0 sm:block">DURATION</span>
          <span className="hidden w-[58px] shrink-0 sm:block">STATUS</span>
        </div>
        {ROWS.map((r) => (
          <div
            key={r.name}
            className={`flex h-11 shrink-0 items-center gap-[9px] border-b border-[#eee] pl-[18px] pr-4 ${r.selected ? "bg-[#f8f9ff]" : ""}`}
          >
            {r.selected ? (
              <span className="grid size-[11px] shrink-0 place-items-center rounded-[1px] bg-[#1f3cff]">
                <img alt="" src="/icons/check.svg" className="size-2" />
              </span>
            ) : (
              <span className="size-[11px] shrink-0 rounded-[1px] border border-[#e6e6e6] bg-white" />
            )}
            <img alt="" src={`/img/${r.avatar}.webp`} className="size-6 shrink-0 rounded-[5px] object-cover" />
            <div className="flex w-[92px] shrink-0 flex-col overflow-hidden pl-[3px] whitespace-nowrap sm:w-[160px]">
              <span
                className={`truncate text-[11.5px] ${r.bold ? "font-semibold" : ""} ${r.muted ? "text-[#7d7d7d]" : "text-[#171717]"}`}
              >
                {r.name}
              </span>
              <span className="truncate text-[9px] text-[#989898]">{r.handle}</span>
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-[7px]">
              <span
                className={`size-[6px] shrink-0 rounded-full ${
                  r.dot === "live" ? "bg-[#f59e0b]" : r.dot === "done" ? "bg-[#1f3cff]" : "bg-transparent"
                }`}
              />
              <p className={`truncate text-[11.5px] ${r.muted ? "text-[#7d7d7d]" : "text-[#171717]"}`}>
                {r.request} <span className={r.outcomeClass}>{r.outcome}</span>
              </p>
            </div>
            <span className={`hidden w-[60px] shrink-0 text-[11px] sm:block ${r.duration === "—" ? "text-[#b2b2b2]" : "text-[#7d7d7d]"}`}>
              {r.duration}
            </span>
            <span
              className={`hidden w-[58px] shrink-0 justify-center rounded-[4px] px-1.5 py-0.5 text-[9px] font-semibold sm:flex ${STATUS[r.status]}`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      className="relative mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-[1440px] overflow-hidden rounded-[28px] bg-[#0b5fd0] px-5 pb-0 pt-24 md:mt-3 md:w-[calc(100%-2.5rem)] md:rounded-[36px] md:px-10 md:pb-0 md:pt-[108px]"
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
        <h1 className="text-[40px] font-semibold leading-[1] tracking-[-1.325px] sm:text-[50px] md:text-[56px]">
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
          className="mt-4 max-w-[671px] text-[15px] leading-[1.35] text-white md:mt-[11px] md:text-[17px] md:leading-[20.06px]"
        >
          Providius Tech gives your business AI-powered customer support agents that handle everyday
          conversations across WhatsApp, web chat, Instagram, Telegram, Facebook and email, so you can
          serve more customers without constantly expanding your support team.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-6 md:mt-[22px]"
        >
          <CtaButton href="https://dashboard.providiustech.com" />
        </motion.div>
      </div>

      {/* Product workspace preview: three channel windows stacked over the live dashboard, cropped by the hero */}
      <div className="relative z-10 mx-auto mt-10 h-[330px] w-full max-w-[1136px] overflow-hidden sm:h-[360px] md:mt-[38px] md:h-[389px]">
        <div className="mx-auto flex w-full flex-col">
          <motion.div
            {...windowIn(1.5)}
            className="relative z-30 mx-auto flex h-10 w-[85%] items-center gap-3 rounded-t-[14px] border border-b-0 border-[#eee] bg-white px-4 md:px-6"
          >
            <AppIdentity color="#25d366" icon="message-circle" name="WhatsApp" />
            <div className="hidden items-center gap-2 p-[9px] md:flex">
              <Pill className="bg-[#e8f5e9] text-[#2e7d32]">Active</Pill>
              <p className="text-[10px] text-[#7d7d7d]">12:45 PM</p>
              <img alt="" src="/icons/shield-check.svg" className="size-[9px]" />
            </div>
            <div className="ml-auto flex items-center gap-1.5 pr-0 md:pr-[9px]">
              <img alt="" src="/img/collab-wa.webp" className="hidden h-[18px] w-[69px] rounded-[5px] md:block" />
              <span className="hidden h-[26px] items-center rounded-lg border border-[#eee] bg-white px-2 text-[10px] text-[#171717] sm:flex">
                Share
              </span>
              <NewMessage />
            </div>
          </motion.div>

          <motion.div
            {...windowIn(1.35)}
            className="relative z-20 mx-auto flex h-[43px] w-[89.6%] items-center gap-3 rounded-t-[14px] border border-b-0 border-[#eee] bg-[#fafafa] px-4 md:px-6"
          >
            <AppIdentity color="#1877f2" icon="facebook" name="Facebook" />
            <p className="hidden flex-1 text-[14px] font-semibold text-[#414141] md:block">
              September <span className="font-normal text-[#c4c4c4]">2026</span>
            </p>
            <div className="ml-auto flex items-center gap-3 pr-0 md:pr-3">
              <Pill className="bg-[#f3f4f6] text-[#6b7280]">Idle</Pill>
              <p className="hidden text-[10px] text-[#7d7d7d] sm:block">Yesterday</p>
              <img alt="" src="/icons/chevron-left.svg" className="hidden size-[10px] sm:block" />
              <img alt="" src="/icons/chevron-right.svg" className="hidden size-[10px] sm:block" />
              <span className="hidden h-[26px] items-center rounded-lg border border-[#eee] bg-white px-2 text-[10px] text-[#171717] sm:flex">
                Today
              </span>
            </div>
          </motion.div>

          <motion.div
            {...windowIn(1.2)}
            className="relative z-10 mx-auto flex h-[49px] w-[94.5%] items-center gap-3 rounded-t-[14px] border border-b-0 border-[#eee] bg-white px-4 md:px-6"
          >
            <AppIdentity color="#ea4335" icon="mail" name="Gmail" />
            <div className="hidden items-center gap-[7px] p-[10px] md:flex">
              <p className="text-[11px] text-[#7d7d7d]">General</p>
              <img alt="" src="/icons/chevron-right.svg" className="size-[10px]" />
            </div>
            <div className="ml-auto flex items-center gap-[7px] pr-0 md:pr-[10px]">
              <img alt="" src="/img/collab-wa.webp" className="hidden h-5 w-[76px] rounded-[5px] md:block" />
              <Pill className="bg-[#fff3e0] text-[#e65100]">Pending</Pill>
              <p className="hidden text-[10px] text-[#7d7d7d] sm:block">2 mins ago</p>
              <NewMessage />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
            className="relative z-0 -mt-px"
          >
            <Dashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
