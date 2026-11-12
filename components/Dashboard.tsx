"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "./motion";

/* eslint-disable @next/next/no-img-element */

const Icon = ({ name, size }: { name: string; size: number }) => (
  <img
    alt=""
    src={`/icons/${name}.svg`}
    className="shrink-0"
    style={{ width: size, height: size }}
  />
);

const folders = [
  { icon: "inbox", label: "All Calls", active: true },
  { icon: "send", label: "Completed" },
  { icon: "calendar", label: "Bookings" },
  { icon: "alert", label: "Missed" },
  { icon: "archive", label: "Escalated" },
  { icon: "trash", label: "Spam" },
];

type Row = {
  avatar: string;
  name: string;
  handle: string;
  live?: number; // seconds elapsed for live calls
  strong?: boolean;
  muted?: boolean;
  dot?: "live" | "dot";
  request: string;
  outcome: string;
  outcomeClass: string;
  typing?: boolean;
  duration?: string;
  status: string;
  statusClass: string;
};

const rows: Row[] = [
  {
    avatar: "avatar-1",
    name: "Amara Solis",
    handle: "@amara.solis.ig",
    live: 24,
    strong: true,
    dot: "live",
    request: "Restaurant booking for 6",
    outcome: "Table confirmed Fri 8 PM",
    outcomeClass: "font-medium text-[#22c55e]",
    status: "LIVE",
    statusClass: "bg-[#fef3c7] text-[#d97706]",
  },
  {
    avatar: "avatar-2",
    name: "Jordan Kim",
    handle: "@jordankim_dines",
    live: 8,
    strong: true,
    dot: "live",
    request: "Hours & menu inquiry",
    outcome: "Pilot answering now",
    outcomeClass: "text-[#b2b2b2]",
    typing: true,
    status: "LIVE",
    statusClass: "bg-[#fef3c7] text-[#d97706]",
  },
  {
    avatar: "avatar-3",
    name: "Maria Chen",
    handle: "@mariachen_foodie",
    dot: "dot",
    request: "Reservation change Sat → Sun, party of 4",
    outcome: "Rescheduled confirmed",
    outcomeClass: "font-medium text-[#22c55e]",
    duration: "1:52",
    status: "DONE",
    statusClass: "bg-[#f0fdf4] text-[#16a34a]",
  },
  {
    avatar: "avatar-4",
    name: "@luca_visconti",
    handle: "+233 (415) 882-3301",
    muted: true,
    request: "Parking & valet options inquiry",
    outcome: "Info provided, no booking needed",
    outcomeClass: "text-[#b2b2b2]",
    duration: "0:47",
    status: "DONE",
    statusClass: "bg-[#f0fdf4] text-[#16a34a]",
  },
  {
    avatar: "avatar-5",
    name: "@sara.bellini",
    handle: "+233 (628) 443-0129",
    muted: true,
    request: "Private event enquiry",
    outcome: "Missed, callback pending",
    outcomeClass: "text-[#1f3cff]",
    duration: "-",
    status: "MISSED",
    statusClass: "bg-[#fef2f2] text-[#dc2626]",
  },
  {
    avatar: "avatar-6",
    name: "Priya Sharma",
    handle: "@priyasharma_eats",
    dot: "dot",
    request: "Takeout order – pasta + tiramisu –",
    outcome: "Order placed, pickup 7:30 PM",
    outcomeClass: "font-medium text-[#22c55e]",
    duration: "2:11",
    status: "DONE",
    statusClass: "bg-[#f0fdf4] text-[#16a34a]",
  },
  {
    avatar: "avatar-7",
    name: "@nightwatch_official",
    handle: "+1 (510) 774-8823",
    dot: "dot",
    request: "Complaint – wrong order delivered",
    outcome: "Escalated to manager",
    outcomeClass: "font-medium text-[#f59e0b]",
    duration: "3:04",
    status: "ESCALATED",
    statusClass: "bg-[#fffbeb] text-[#d97706]",
  },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function TypingDots() {
  return (
    <span className="inline-flex">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-chev"
          style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1.2s" }}
        >
          .
        </span>
      ))}
    </span>
  );
}

/** The "Omni Pilot" call-log dashboard from the hero, rebuilt in markup. */
export default function Dashboard({ delay = 0 }: { delay?: number }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-[430px] w-[1136px] items-start overflow-clip rounded-[14px] border border-[#e5e5e5] bg-white font-inter">
      {/* Sidebar */}
      <div className="flex h-[430px] w-[172px] shrink-0 flex-col items-start overflow-clip bg-[#f5f5f5]">
        <div className="flex h-[49px] w-full shrink-0 items-center px-[10px]">
          <div className="flex items-center gap-[12px]">
            <div className="pr-[8px]">
              <div className="relative grid size-[32px] place-items-center rounded-full bg-[#1f3cff]">
                <span className="absolute -left-[3.07px] -top-[3.07px] size-[38.13px] rounded-full bg-[#1f3cff] opacity-[0.43]" />
                <span className="absolute inset-0 rounded-full bg-[#1f3cff] animate-ping-soft" />
                <span className="relative">
                  <Icon name="omni" size={16} />
                </span>
              </div>
            </div>
            <p className="whitespace-nowrap text-[11px] font-semibold text-[#171717]">
              Omni Pilot
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-px px-[7px]">
          <div className="flex h-[28px] w-full items-center gap-[5px] rounded-[7px] bg-white px-[7px]">
            <Icon name="phone-call" size={13} />
            <p className="whitespace-nowrap text-[11.5px] text-[#171717]">Live message</p>
            <span className="flex h-[14px] items-center justify-center rounded-[4px] bg-[#1f3cff] px-[4px] text-[8px] font-semibold text-white">
              2
            </span>
          </div>
          {[
            ["search", "Search"],
            ["settings", "Settings"],
          ].map(([icon, label]) => (
            <div key={label} className="flex h-[28px] w-full items-center gap-[5px] rounded-[5px] px-[7px]">
              <Icon name={icon} size={13} />
              <p className="whitespace-nowrap text-[11.5px] text-[#7d7d7d]">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex w-full shrink-0 flex-col items-start pl-[11px] pr-[10px] pt-[12px]">
          <p className="whitespace-nowrap text-[9px] leading-[16px] text-[#7d7d7d]">CALLS</p>
          {folders.map((f) => (
            <div
              key={f.label}
              className={`flex h-[28px] w-full items-center gap-[5px] rounded-[5px] px-[7px] ${f.active ? "bg-[#ebebeb]" : ""}`}
            >
              <Icon name={f.icon} size={13} />
              <p className={`whitespace-nowrap text-[11.5px] ${f.active ? "text-[#171717]" : "text-[#7d7d7d]"}`}>
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call log */}
      <div className="flex h-[430px] w-[964px] shrink-0 flex-col items-start overflow-clip bg-white">
        <div className="flex h-[43px] w-full shrink-0 items-center justify-between pl-[17px] pr-[14px]">
          <p className="whitespace-nowrap text-[14px] font-semibold text-[#171717]">
            Call Log <span className="font-medium text-[#1f3cff]">12</span>
          </p>
          <div className="flex items-center justify-center rounded-[8px] bg-[#1f3cff] p-[8px] font-sans text-[14px] font-medium leading-none text-white">
            + New Call
          </div>
        </div>
        <div className="flex h-[32px] w-full shrink-0 items-center gap-[16px] border-b border-[#eee] bg-[#fafafa] pl-[18px] pr-[16px] text-[9px] whitespace-nowrap">
          <div className="flex items-center gap-[4px]">
            <p className="text-[#b2b2b2]">TODAY</p>
            <p className="font-semibold text-[#171717]">38 calls</p>
          </div>
          {[
            ["dot-green", "31 resolved"],
            ["dot-blue", "4 missed"],
            ["dot-amber", "2 live now"],
          ].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-[4px]">
              <Icon name={icon} size={5} />
              <p className="text-[#7d7d7d]">{label}</p>
            </div>
          ))}
          <p className="text-[#7d7d7d]">avg 1m 42s</p>
        </div>
        <div className="flex h-[28px] w-full shrink-0 items-center gap-[9px] border-b border-[#eee] bg-[#fafafa] pl-[18px] pr-[16px] text-[9px] text-[#b2b2b2] whitespace-nowrap">
          <div className="size-[11px] shrink-0 rounded-[1px] border border-[#e6e6e6] bg-white" />
          <div className="h-[11px] w-[24px] shrink-0" />
          <div className="w-[160px] shrink-0 pl-[3px]">CALLER</div>
          <div className="min-w-px flex-1">REQUEST &amp; OUTCOME</div>
          <div className="w-[60px] shrink-0">DURATION</div>
          <div className="w-[58px] shrink-0">STATUS</div>
        </div>

        {rows.map((r, i) => {
          const isLive = r.live !== undefined;
          return (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: delay + 0.35 + i * 0.07, ease: EASE }}
              className={`flex h-[44px] w-full shrink-0 items-center gap-[9px] border-b border-[#eee] pl-[18px] pr-[16px] ${isLive ? "bg-[#f8f9ff]" : ""}`}
            >
              {isLive ? (
                <div className="flex size-[11px] shrink-0 items-center justify-center rounded-[1px] border border-[#1f3cff] bg-[#1f3cff]">
                  <Icon name="check" size={8} />
                </div>
              ) : (
                <div className="size-[11px] shrink-0 rounded-[1px] border border-[#e6e6e6] bg-white" />
              )}
              <img
                alt=""
                src={`/img/${r.avatar}.webp`}
                className="size-[24px] shrink-0 rounded-[5px] object-cover"
              />
              <div className="flex w-[160px] shrink-0 flex-col items-start overflow-clip pl-[3px] whitespace-nowrap">
                <p
                  className={`w-full truncate text-[11.5px] ${r.strong ? "font-semibold" : ""} ${r.muted ? "text-[#7d7d7d]" : "text-[#171717]"}`}
                >
                  {r.name}
                </p>
                <p className="w-full truncate text-[9px] text-[#989898]">{r.handle}</p>
              </div>
              <div className="flex min-w-px flex-1 items-center gap-[7px] overflow-clip">
                <div className="relative size-[7px] shrink-0">
                  {r.dot === "live" && (
                    <span className="absolute left-0 top-0 size-[6px] rounded-full bg-[#f59e0b] animate-ping-soft" />
                  )}
                  {r.dot && (
                    <img
                      alt=""
                      src={`/icons/${r.dot === "live" ? "live-dot" : "dot"}.svg`}
                      className="absolute inset-0 size-[7px]"
                    />
                  )}
                </div>
                <p
                  className={`min-w-px flex-1 truncate text-[11.5px] whitespace-pre ${r.muted ? "text-[#7d7d7d]" : "text-[#171717]"}`}
                >
                  {r.request}
                  {"  "}
                  <span className={r.outcomeClass}>
                    {r.outcome}
                    {r.typing && <TypingDots />}
                  </span>
                </p>
              </div>
              <div className="w-[60px] shrink-0">
                <p
                  className={`whitespace-nowrap text-[11px] tabular-nums ${r.duration === "-" ? "text-[#b2b2b2]" : "text-[#7d7d7d]"}`}
                >
                  {isLive ? `${fmt(r.live! + tick)} live` : r.duration}
                </p>
              </div>
              <div
                className={`flex w-[58px] shrink-0 items-center justify-center rounded-[4px] px-[6px] py-[2px] text-[9px] font-semibold whitespace-nowrap ${r.statusClass}`}
              >
                {r.status}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
