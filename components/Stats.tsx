"use client";

import { motion } from "motion/react";
import { Count, EASE, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const stripes = [
  36, 50.149, 63.816, 76.535, 87.875, 97.447, 104.928, 110.061, 112.672, 112.672, 110.061,
  104.928, 97.447, 87.875, 76.535, 63.816, 50.149,
];

const card = (i: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.9, delay: i * 0.1, ease: EASE },
});

export default function Stats() {
  return (
    <section id="about" className="mx-auto w-full max-w-[1082px] px-5 pt-16 md:px-10 md:pt-[100px]">
      <h2 className="mx-auto max-w-[882px] text-center text-[26px] font-semibold leading-[1.1] tracking-[-0.9px] text-[#1f1f1f] sm:text-[32px] md:text-[38px] md:leading-[40px]">
        <Words
          segments={[
            { text: "A global customer support infrastructure for businesses that want to" },
            { text: "scale smarter", className: "text-[#146ef5]" },
          ]}
          stagger={0.035}
        />
      </h2>

      {/* Bento as laid out in the design: 324 / 318 / 320 columns, 234px tall */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[324fr_318fr_320fr] md:gap-5">
        {/* AI support agents */}
        <motion.div
          {...card(0)}
          whileHover={{ y: -6 }}
          className="relative h-[250px] overflow-hidden rounded-[16px] text-white sm:col-span-2 md:col-span-1 md:h-[234px]"
          style={{ backgroundImage: "linear-gradient(135deg, #0a5fd2 0%, #3b9af0 55%, #7fdcfd 100%)" }}
        >
          <img alt="Providiustech" src="/img/logo.png" width={720} height={135} className="absolute left-[11px] top-[20px] h-[21px] w-auto" />

          <div className="absolute right-4 top-[15px] grid h-[31px] w-[33px] place-items-center rounded-[8px] bg-white">
            <div className="flex items-end gap-[2px]">
              {[8, 16, 12].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[4px] origin-bottom rounded-[1px] bg-[#092341]"
                  style={{ height: h }}
                  animate={{ scaleY: [1, 0.55, 1] }}
                  transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>

          {/* Striped bubble motif peeking out on the right */}
          <div className="pointer-events-none absolute right-[-4px] top-[73px] flex w-[113px] flex-col items-center gap-[3px]">
            {stripes.map((w, i) => (
              <motion.span
                key={i}
                className="block h-[4px] rounded-[2px] bg-[#b0ecff]"
                style={{ width: w }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 0.45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.04, ease: EASE }}
              />
            ))}
          </div>

          <div className="absolute inset-x-[17px] bottom-[14px] rounded-[12px] bg-white px-[19px] pb-[10px] pt-[6px] text-[#081b3a] md:h-[125px]">
            <p className="text-[38px] font-semibold leading-[43px] tracking-[-1.3px] tabular-nums">
              <Count to={120} suffix="+" />
            </p>
            <p className="text-[18px] font-semibold leading-[23px]">AI support agents</p>
            <p className="mt-[9px] text-[12px] leading-[16px] text-[#3c4a63]">
              Trained to resolve inquiries, automate tasks, and deliver human-like support.
            </p>
          </div>
        </motion.div>

        {/* Resolution rate */}
        <motion.div
          {...card(1)}
          whileHover={{ y: -6 }}
          className="flex h-[240px] flex-col overflow-hidden rounded-[16px] bg-[#e9edf5] px-6 pt-[14px] text-[#081b3a] md:h-[233px]"
        >
          <p className="text-[13px] leading-[17px] text-[#1f2a3d]">Resolution rate</p>
          <p className="mt-[6px] text-[44px] font-semibold leading-[50px] tracking-[-1.3px] tabular-nums">
            <Count to={98} suffix="%" />
          </p>
          <motion.img
            alt=""
            src="/img/avatars-stack.webp"
            width={441}
            height={147}
            className="-mt-[2px] h-[49px] w-[147px] object-contain object-left"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          />
          <p className="max-w-[278px] text-[16px] leading-[21px] text-[#1f2a3d]">
            “Our AI agents handle the busy work across channels, so your team can focus on what
            matters most growth.”
          </p>
        </motion.div>

        {/* Right column: two stacked stats */}
        <div className="flex flex-col gap-4 md:gap-[15px]">
          <motion.div
            {...card(2)}
            whileHover={{ y: -6 }}
            className="flex h-[139px] flex-col overflow-hidden rounded-[16px] bg-[#06b6d4] px-6 pt-[13px] text-[#052a33]"
          >
            <p className="text-[15px] leading-[19px]">Support conversations</p>
            <p className="mt-[3px] text-[40px] font-semibold leading-[45px] tracking-[-1.3px] tabular-nums">
              <Count to={520} suffix="K+" />
            </p>
            <p className="mt-[3px] max-w-[275px] text-[16px] leading-[20px]">Handled monthly across all connected channels.</p>
          </motion.div>

          <motion.div
            {...card(3)}
            whileHover={{ y: -6 }}
            className="flex h-[76px] items-center justify-between overflow-hidden rounded-[16px] bg-[#061936] px-6 text-white"
          >
            <p className="text-[15px] leading-[19px]">Businesses supported</p>
            <p className="text-[36px] leading-[41px] tracking-[-1px] tabular-nums">
              <Count to={20} suffix="+" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
