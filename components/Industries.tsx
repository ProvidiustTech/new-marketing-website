"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { EASE, Reveal, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const industries = [
  {
    title: "E-commerce",
    src: "ind-ecommerce",
    body: "From the first product enquiry to purchase, through product questions, pricing, order details and checkout, We help customers  complete their purchases while your team focuses on running the business.",
  },
  {
    title: "Fintech & Financial Services",
    src: "ind-fintech",
    body: "ProvidiusTech guides customers through their support journey, providing answers and escalate sensitive or complex issues to the right team when human assistance is needed.",
  },
  {
    title: "Delivery & Logistics",
    src: "ind-logistics",
    body: "From shipment enquiries to delivery updates and issue resolution, ProvidiusTech keeps customers informed and guides them through each stage of the delivery journey.",
  },
  {
    title: "Service-Based Businesses",
    src: "ind-services",
    body: "From the first service enquiry to booking and follow-up, ProvidiusTech guides customers through the process, helping them move from interest to confirmed appointments.",
  },
];

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label={dir === "prev" ? "Previous industries" : "Next industries"}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`grid h-14 cursor-pointer place-items-center rounded-[11px] border border-[#d7dce3] bg-white text-[#6e7480] md:h-[87px] ${
        dir === "prev" ? "w-[60px] md:w-[95px]" : "w-[56px] md:w-[85px]"
      }`}
    >
      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden>
        <path
          d={dir === "prev" ? "M10 2 2 10l8 8" : "M2 2l8 8-8 8"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

export default function Industries() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (296 + 16), behavior: "smooth" });
  };

  return (
    <section id="industries" className="mx-auto mt-20 w-full max-w-[1352px] px-5 font-jakarta md:mt-24 md:px-[60px]">
      <div className="flex items-start justify-between gap-6 pb-6 pt-8">
        <div className="flex max-w-[541px] flex-col gap-3">
          <h2 className="text-[26px] font-bold leading-[1.08] text-[#171a20] md:text-[32px]">
            <Words segments={[{ text: "Customer Support that adapts to how your business operates." }]} />
          </h2>
          <Reveal delay={0.15} className="text-[15px] leading-[1.55] text-[#1e293b] md:text-[16px]">
            No matter your industry or how your support operations are structured, We adapts to your
            existing workflows. Our AI agents integrate into the way your business already serves
            customers, without disrupting the way your team works.
          </Reveal>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <Arrow dir="prev" onClick={() => scroll(-1)} />
          <Arrow dir="next" onClick={() => scroll(1)} />
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 md:mx-0 md:px-0"
      >
        {industries.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            className="group flex h-[437px] w-[296px] shrink-0 snap-start flex-col overflow-hidden rounded-[12px] border border-[#e3e7ec] bg-[radial-gradient(120%_80%_at_50%_45%,#1d1c20_0%,#0e0e0e_100%)] shadow-[0_3px_8px_rgba(0,0,0,0.05)]"
          >
            <div className="h-[176px] shrink-0 overflow-hidden">
              <img
                alt=""
                src={`/img/${it.src}.webp`}
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-5 px-4 pb-4 pt-4 text-white">
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-bold leading-[1.15]">{it.title}</h3>
                <p className="text-[14px] leading-[1.45] text-white/90">{it.body}</p>
              </div>
              <a
                href="#contact"
                className="mt-auto flex h-8 w-full items-center justify-center rounded-[24px] bg-[#2563eb] text-[14px] font-semibold text-white transition-colors hover:bg-[#1d4fd8]"
              >
                Explore More
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
