"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE, Reveal, Words } from "./motion";

const cards = [
  {
    left: 0,
    title: "A customer sends a message",
    body: "From your website, WhatsApp, or any channel  you connect.",
    text: { left: 33, top: 33, titleTop: 0, bodyTop: 47 },
    img: { src: "phone-conversations", left: 33, top: 150, w: 336, h: 457 },
    fadeTop: 323,
  },
  {
    left: 437,
    title: "Our AI understands and replies instantly",
    body: "It uses your knowledge base and past conversations to give accurate answers.",
    text: { left: 30, top: 33, titleTop: 0, bodyTop: 65 },
    img: { src: "phone-knowledge", left: 33, top: 196, w: 372, h: 357 },
    fadeTop: 358,
  },
  {
    left: 875,
    title: "It escalates when needed",
    body: "If the AI is unsure, it passes the conversation to  your team.",
    text: { left: 33, top: 19, titleTop: 15, bodyTop: 72 },
    img: { src: "phone-escalation", left: 33, top: 172, w: 314, h: 375 },
    fadeTop: 348,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const phoneY = useTransform(scrollYProgress, [0.15, 0.85], [26, -14]);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative ml-[35px] mt-[127px] h-[818px] w-[1355px] max-md:ml-[10px] max-md:mt-[64px] max-md:h-auto max-md:w-[370px] max-md:pb-[24px]"
    >
      <div className="absolute inset-0 overflow-clip rounded-[32px]">
        <motion.img
          alt=""
          src="/img/cyan-glow.webp"
          className="size-full object-cover"
          style={{ scale: glowScale }}
        />
      </div>

      <div className="absolute left-[140px] top-[55px] w-[1166px] text-center text-[#1e293b] max-md:relative max-md:left-0 max-md:top-0 max-md:w-full max-md:px-[18px] max-md:pt-[36px]">
        <h2 className="text-[38px] font-bold leading-[1.2] max-md:text-[26px]">
          <Words segments={[{ text: "How our AI customer support works" }]} />
        </h2>
        <Reveal delay={0.15} className="mt-[24px] text-[24px] leading-[normal] max-md:mt-[14px] max-md:text-[15px]">
          From the moment a customer sends a message to when it’s resolved, our AI understands the
          request, finds the right information from your knowledge base, responds instantly and
          follow up, so you don’t have to.
        </Reveal>
      </div>

      <div className="absolute left-[24px] top-[252px] h-[518px] w-[1292px] max-md:relative max-md:left-0 max-md:top-0 max-md:mt-[28px] max-md:flex max-md:h-auto max-md:w-full max-md:flex-col max-md:items-center max-md:gap-[16px] max-md:[zoom:0.86]">
        {cards.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
            whileHover="hover"
            className="group absolute top-0 h-[518px] w-[405px] overflow-clip rounded-[32px] bg-[#06b6d4] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.04)] max-md:relative max-md:!left-0"
            style={{ left: c.left }}
          >
            <div className="absolute w-[355px]" style={{ left: c.text.left, top: c.text.top }}>
              <h3
                className="absolute left-0 w-[355px] text-[24px] font-bold leading-[1.2] text-[#1a1a1a]"
                style={{ top: c.text.titleTop }}
              >
                {c.title}
              </h3>
              <p
                className="absolute left-0 w-[355px] text-[20px] leading-[normal] text-black whitespace-pre-wrap"
                style={{ top: c.text.bodyTop }}
              >
                {c.body}
              </p>
            </div>
            <motion.div
              className="absolute"
              style={{ left: c.img.left, top: c.img.top, width: c.img.w, height: c.img.h, y: phoneY }}
            >
              <motion.img
                alt=""
                src={`/img/${c.img.src}.webp`}
                className="size-full object-cover"
                initial={{ y: 90, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.2, delay: 0.25 + i * 0.12, ease: EASE }}
                variants={{ hover: { y: -10, scale: 1.02 } }}
              />
            </motion.div>
            <div
              className="pointer-events-none absolute left-0 h-[253px] w-[428px] blur-[10px]"
              style={{
                top: c.fadeTop,
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.5) 50%, #fff 69.712%)",
              }}
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
