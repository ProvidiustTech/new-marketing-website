"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE, Reveal, Words } from "./motion";

const steps = [
  {
    title: "A customer sends a message",
    body: "From your website, WhatsApp, or any channel you connect.",
    src: "phone-conversations",
  },
  {
    title: "Our AI understands and replies instantly",
    body: "It uses your knowledge base and past conversations to give accurate answers.",
    src: "phone-knowledge",
  },
  {
    title: "It escalates when needed",
    body: "If the AI is unsure, it passes the conversation to your team.",
    src: "phone-escalation",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section id="how-it-works" ref={ref} className="relative mx-auto mt-20 w-full max-w-[1240px] px-5 md:mt-28 md:px-10">
      <div className="pointer-events-none absolute inset-x-5 inset-y-0 -z-10 overflow-hidden rounded-[32px] md:inset-x-10">
        <motion.img alt="" src="/img/cyan-glow.webp" className="size-full object-cover" style={{ scale: glowScale }} />
      </div>

      <div className="mx-auto max-w-[820px] px-2 pt-14 text-center text-[#1e293b] md:pt-20">
        <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.6px] sm:text-[36px] md:text-[44px]">
          <Words segments={[{ text: "How our AI customer support works" }]} />
        </h2>
        <Reveal delay={0.15} className="mx-auto mt-5 max-w-[680px] text-[16px] leading-[1.6] md:text-[19px]">
          From the moment a customer sends a message to when it’s resolved, our AI understands the
          request, finds the right information from your knowledge base, responds instantly and
          follows up, so you don’t have to.
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 pb-20 md:mt-16 md:grid-cols-3 md:gap-6">
        {steps.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
            whileHover="hover"
            className="group relative flex flex-col overflow-hidden rounded-[28px] bg-[#06b6d4] shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
          >
            <div className="relative z-10 p-7 md:p-8">
              <span className="mb-4 inline-grid size-8 place-items-center rounded-full bg-white/80 text-[13px] font-bold text-[#0e7490]">
                {i + 1}
              </span>
              <h3 className="text-[21px] font-bold leading-[1.25] text-[#0f172a] md:text-[22px]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#0c4a5a] md:text-[16px]">{s.body}</p>
            </div>

            <div className="relative mt-auto h-[300px] overflow-hidden md:h-[340px]">
              <motion.img
                alt=""
                src={`/img/${s.src}.webp`}
                className="absolute inset-x-0 top-6 mx-auto h-full w-[78%] object-contain object-top transition-transform duration-500 group-hover:-translate-y-2"
                initial={{ y: 90, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.2, delay: 0.25 + i * 0.12, ease: EASE }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06b6d4] to-transparent" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
