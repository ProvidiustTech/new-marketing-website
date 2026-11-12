"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CtaButton from "./CtaButton";
import { EASE, Reveal, Words } from "./motion";

export default function Banner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50, clipPath: "inset(6% 6% 6% 6% round 40px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 40px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
      className="relative mx-auto mt-20 w-full max-w-[1240px] px-5 md:mt-28 md:px-10"
    >
      <div className="relative isolate min-h-[520px] overflow-hidden rounded-[32px] bg-[#2b7fc4] text-white md:min-h-[480px] md:rounded-[48px]">
        <motion.img
          alt=""
          src="/img/banner-bg.webp"
          className="absolute inset-0 -z-10 size-full object-cover object-[60%_40%] md:object-center"
          style={{ scale, y }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a3f7a]/70 via-[#0a3f7a]/25 to-[#0a3f7a]/85 md:bg-gradient-to-r md:from-[#0a3f7a]/80 md:via-[#0a3f7a]/30 md:to-transparent" />

        <div className="flex h-full min-h-[520px] flex-col justify-between gap-10 p-7 sm:p-10 md:min-h-[480px] md:max-w-[620px] md:p-14">
          <h2 className="text-[38px] font-medium leading-[1.05] tracking-[-1.2px] sm:text-[48px] md:text-[60px]">
            <span className="block">
              <Words segments={[{ text: "Full control" }]} />
            </span>
            <span className="block whitespace-nowrap">
              <Words delay={0.12} segments={[{ text: "of your support" }]} />
            </span>
          </h2>

          <div className="flex flex-col items-start gap-7">
            <Reveal delay={0.3} className="max-w-[460px] text-[16px] leading-[1.6] text-white/90 md:text-[19px]">
              A ready-made AI customer support infrastructure that connects your channels, automates
              responses, and scales with your business.
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
