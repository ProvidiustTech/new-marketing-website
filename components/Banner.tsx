"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CtaButton from "./CtaButton";
import { EASE, Reveal, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const COPY =
  "A ready-made AI customer support infrastructure that connects your channels, automates responses, and scales with your business.";

export default function Banner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Gentle parallax on desktop only; phones get the photo at its native scale so it stays crisp.
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50, clipPath: "inset(6% 6% 6% 6% round 32px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
      className="relative mx-auto mt-20 w-full max-w-[1229px] px-5 md:mt-24 md:px-10"
    >
      {/* Phone / small tablet: photo at its natural ratio, copy on a matching blue panel below */}
      <div className="overflow-hidden rounded-[24px] bg-[#1d6fb8] text-white md:hidden">
        <div className="relative">
          <img
            alt=""
            src="/img/banner-bg.webp"
            width={730}
            height={291}
            decoding="async"
            className="block aspect-[730/291] w-full object-cover"
          />
          <h2 className="absolute bottom-3 left-5 text-[26px] font-medium leading-[1.05] tracking-[-0.8px] [text-shadow:0_2px_12px_rgba(6,40,90,0.45)] min-[420px]:text-[30px]">
            <span className="block">Full control</span>
            <span className="block">of your support</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-6 bg-gradient-to-b from-[#2a7fc6] to-[#1b5f9f] px-5 pb-7 pt-5">
          <p className="text-[15px] leading-[1.55] text-white/95">{COPY}</p>
          <CtaButton />
        </div>
      </div>

      {/* Tablet and up: full-bleed photo, title left, copy + CTA right */}
      <div className="relative isolate hidden aspect-[1149/452] min-h-[400px] overflow-hidden rounded-[24px] bg-[#2b7fc4] text-white md:block">
        <motion.img
          alt=""
          src="/img/banner-bg.webp"
          className="absolute inset-0 -z-10 size-full object-cover object-center"
          style={{ scale, y }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a3f7a]/35 via-transparent to-[#0a3f7a]/35" />

        <div className="flex h-full items-center justify-between gap-8 px-10 lg:px-[60px]">
          <h2 className="text-[36px] font-medium leading-[1.05] tracking-[-1px] lg:text-[44px] xl:text-[48px]">
            <span className="block">
              <Words segments={[{ text: "Full control" }]} />
            </span>
            <span className="block whitespace-nowrap">
              <Words delay={0.12} segments={[{ text: "of your support" }]} />
            </span>
          </h2>

          <div className="flex w-[250px] shrink-0 flex-col items-start gap-6 self-center pt-24 lg:w-[290px]">
            <Reveal delay={0.3} className="text-[15px] leading-[1.4] text-white lg:text-[16px]">
              {COPY}
            </Reveal>
            <Reveal delay={0.45}>
              <CtaButton />
            </Reveal>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
