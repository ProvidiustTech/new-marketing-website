"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CtaButton from "./CtaButton";
import { EASE, Reveal, Words } from "./motion";

export default function Banner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50, clipPath: "inset(6% 6% 6% 6% round 64px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 64px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
      className="relative ml-[159px] mt-[65px] h-[455px] w-[1157px] overflow-clip rounded-[64px] bg-[#2b7fc4] text-white max-md:ml-[10px] max-md:mt-[40px] max-md:h-[470px] max-md:w-[370px] max-md:rounded-[36px]"
    >
      <motion.img
        alt=""
        src="/img/banner-bg.webp"
        className="absolute inset-0 size-full max-md:object-cover max-md:object-[32%_50%]"
        style={{ scale, y }}
      />
      <div className="absolute inset-0 hidden bg-gradient-to-b from-[#0a3f7a]/55 via-transparent to-[#0a3f7a]/70 max-md:block" />

      <h2 className="absolute left-[70px] top-[115px] w-[304px] text-[43px] font-medium leading-[45.15px] tracking-[-1.325px] max-md:left-[26px] max-md:top-[30px] max-md:text-[32px] max-md:leading-[34px]">
        <span className="block">
          <Words segments={[{ text: "Full control" }]} />
        </span>
        <span className="block whitespace-nowrap">
          <Words delay={0.12} segments={[{ text: "of your support" }]} />
        </span>
      </h2>

      <Reveal
        delay={0.3}
        className="absolute left-[847px] top-[206px] w-[290px] text-[20px] leading-[1.2] tracking-[-1.325px] max-md:left-[26px] max-md:top-[316px] max-md:w-[320px] max-md:text-[15px] max-md:tracking-[-0.4px]"
      >
        A ready-made AI customer support infrastructure that connects your channels, automates
        responses, and scales with your business.
      </Reveal>
      <Reveal
        delay={0.45}
        className="absolute left-[836px] top-[319px] max-md:left-[26px] max-md:top-[404px]"
      >
        <CtaButton />
      </Reveal>
    </motion.section>
  );
}
