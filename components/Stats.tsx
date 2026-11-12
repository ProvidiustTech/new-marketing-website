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
    <section id="about" className="mx-auto w-full max-w-[1240px] px-5 pt-16 md:px-10 md:pt-24">
      <h2 className="mx-auto max-w-[900px] text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.9px] text-[#1f1f1f] sm:text-[34px] md:text-[44px]">
        <Words
          segments={[
            { text: "A global customer support infrastructure for businesses that want to" },
            { text: "scale smarter", className: "text-[#146ef5]" },
          ]}
          stagger={0.035}
        />
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
        {/* AI support agents — large feature card */}
        <motion.div
          {...card(0)}
          whileHover={{ y: -6 }}
          className="relative min-h-[300px] overflow-hidden rounded-[24px] p-7 text-white md:row-span-2 md:min-h-[480px] md:p-9"
          style={{
            backgroundImage: "linear-gradient(140deg, #005fce 10%, #72d9fc 90%)",
          }}
        >
          <div className="flex items-center gap-3">
            <img alt="" src="/img/logo-mark-card.png" className="h-8 w-[26px] object-contain" />
            <p className="text-[20px] font-semibold">Providiustech</p>
            <span className="-mt-2 text-[8px]">™</span>
          </div>

          <div className="absolute right-7 top-7 grid size-10 place-items-center rounded-xl bg-white md:right-9 md:top-9">
            <div className="flex items-end gap-[3px]">
              {[13, 22, 16].map((h, i) => (
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

          <div className="pointer-events-none absolute inset-x-0 top-[96px] flex flex-col items-center gap-[7px] md:top-[120px]">
            {stripes.map((w, i) => (
              <motion.span
                key={i}
                className="block h-[4px] rounded-[2px] bg-[#b0ecff]"
                style={{ width: w * 1.25 }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 0.35 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.04, ease: EASE }}
              />
            ))}
          </div>

          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white p-5 text-[#081b3a] md:inset-x-9 md:bottom-9 md:p-6">
            <p className="text-[44px] font-semibold leading-none tracking-[-1.3px] tabular-nums md:text-[56px]">
              <Count to={120} suffix="+" />
            </p>
            <p className="mt-3 text-[18px] font-semibold md:text-[20px]">AI support agents</p>
            <p className="mt-1.5 text-[14px] leading-[1.5] text-[#3c4a63]">
              Trained to resolve inquiries, automate tasks, and deliver human-like support.
            </p>
          </div>
        </motion.div>

        {/* Resolution rate */}
        <motion.div
          {...card(1)}
          whileHover={{ y: -6 }}
          className="flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#e9edf5] p-7 text-[#081b3a] md:p-8"
        >
          <div>
            <p className="text-[14px] text-[#4b5870]">Resolution rate</p>
            <p className="mt-2 text-[48px] font-semibold leading-none tracking-[-1.3px] tabular-nums md:text-[56px]">
              <Count to={98} suffix="%" />
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <motion.img
              alt=""
              src="/img/avatars-stack.webp"
              className="h-[44px] w-[140px] object-contain object-left"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            />
            <p className="text-[15px] leading-[1.5] text-[#3c4a63]">
              “Our AI agents handle the busy work across channels, so your team can focus on what
              matters most: growth.”
            </p>
          </div>
        </motion.div>

        {/* Support conversations */}
        <motion.div
          {...card(2)}
          whileHover={{ y: -6 }}
          className="flex min-h-[160px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#06b6d4] p-7 text-[#052a33] md:p-8"
        >
          <p className="text-[15px] font-medium">Support conversations</p>
          <div>
            <p className="text-[44px] font-semibold leading-none tracking-[-1.3px] tabular-nums md:text-[52px]">
              <Count to={520} suffix="K+" />
            </p>
            <p className="mt-2 text-[14px] leading-[1.45]">Handled monthly across all connected channels.</p>
          </div>
        </motion.div>

        {/* Businesses supported */}
        <motion.div
          {...card(3)}
          whileHover={{ y: -6 }}
          className="flex min-h-[120px] items-center justify-between overflow-hidden rounded-[24px] bg-[#061936] p-7 text-white md:p-8"
        >
          <p className="text-[15px] font-medium text-white/90">Businesses supported</p>
          <p className="text-[44px] leading-none tracking-[-1.3px] tabular-nums md:text-[52px]">
            <Count to={20} suffix="+" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
