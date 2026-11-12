"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CtaButton from "./CtaButton";
import Dashboard from "./Dashboard";
import { EASE, Words } from "./motion";

/* eslint-disable @next/next/no-img-element */

const NewMessage = () => (
  <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#2563eb] p-[8px] font-sans text-[14px] font-medium leading-none text-white whitespace-nowrap">
    + New Message
  </div>
);

const AppIdentity = ({ color, icon, name }: { color: string; icon: string; name: string }) => (
  <div className="flex shrink-0 items-center gap-[12px]">
    <div
      className="flex size-[24px] shrink-0 items-center justify-center rounded-[6px]"
      style={{ background: color }}
    >
      <img alt="" src={`/icons/${icon}.svg`} className="size-[14px]" />
    </div>
    <div className="flex flex-col items-start gap-px whitespace-nowrap">
      <p className="text-[11px] font-semibold text-[#171717]">{name}</p>
      <p className="text-[8px] text-[#989898]">Providius Tech</p>
    </div>
  </div>
);

const Pill = ({ className, children }: { className: string; children: string }) => (
  <div className={`flex items-start rounded-[4px] px-[8px] py-[2px] text-[9px] font-semibold whitespace-nowrap ${className}`}>
    {children}
  </div>
);

// Each channel window slides up out of the one in front of it.
const windowIn = (delay: number, from: number) => ({
  initial: { y: from, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 1, delay, ease: EASE },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const workY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative mx-auto mt-[28px] h-[818px] w-[1380px] overflow-clip rounded-[24px] bg-[#0b5fd0] max-md:mt-[10px] max-md:h-[478px] max-md:w-[370px] max-md:rounded-[20px]"
    >
      <motion.div className="absolute -inset-y-[50px] inset-x-0" style={{ y: bgY }}>
        <motion.img
          alt=""
          src="/img/hero-bg.webp"
          className="size-full"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </motion.div>

      {/* Copy */}
      <motion.div className="absolute inset-x-0 top-0 z-10 text-center text-white" style={{ y: copyY }}>
        <h1 className="absolute inset-x-0 top-[172px] text-[56px] font-semibold tracking-[-1.325px] max-md:top-[96px] max-md:text-[36px]">
          <span className="block leading-[54.88px] max-md:leading-[38px]">
            <Words onView={false} delay={0.3} segments={[{ text: "New Frontiers In" }]} />
          </span>
          <span className="block leading-[56px] text-[#a8efff] max-md:leading-[40px] md:-mt-[5.88px]">
            <Words onView={false} delay={0.45} segments={[{ text: "Customer Support" }]} />
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="absolute left-1/2 top-[288px] w-[568px] -translate-x-1/2 text-[17px] leading-[20.06px] max-md:top-[188px] max-md:w-[320px] max-md:text-[14px] max-md:leading-[18px]"
        >
          Grow your business without growing support.
          <br />
          AI agents, channels, and infrastructure that scales with you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="absolute left-[603px] top-[350px] max-md:left-[80px] max-md:top-[262px]"
        >
          <CtaButton />
        </motion.div>
      </motion.div>

      {/* Product workspace */}
      <motion.div
        style={{ y: workY }}
        className="absolute left-[108px] top-[387px] h-[567px] w-[1165px] max-md:left-[34px] max-md:top-[1040px] max-md:[zoom:0.3]"
      >
        <div className="absolute left-[40px] top-[42px] h-[132px] w-[1074px] overflow-clip font-inter">
          {/* WhatsApp */}
          <motion.div
            {...windowIn(1.5, 132)}
            className="absolute left-[53px] top-0 flex h-[40px] w-[968px] flex-col rounded-t-[14px] border border-[#eee] bg-white px-[24px]"
          >
            <div className="flex h-[40px] w-full items-center">
              <AppIdentity color="#25d366" icon="message-circle" name="WhatsApp" />
              <div className="flex min-w-px flex-1 items-center gap-[4px] p-[9px]">
                <div className="flex items-center gap-[8px]">
                  <Pill className="bg-[#e8f5e9] text-[#2e7d32]">Active</Pill>
                  <p className="text-[10px] text-[#7d7d7d] whitespace-nowrap">12:45 PM</p>
                </div>
                <img alt="" src="/icons/shield-check.svg" className="size-[9px]" />
              </div>
              <div className="flex shrink-0 items-center gap-[6px] pr-[9px]">
                <img alt="" src="/img/collab-wa.webp" className="h-[18px] w-[69px] rounded-[5px]" />
                <div className="flex h-[26px] w-[44px] items-center justify-center rounded-[8px] border border-[#eee] bg-white text-[10px] text-[#171717]">
                  Share
                </div>
                <NewMessage />
              </div>
            </div>
          </motion.div>
          {/* Facebook */}
          <motion.div
            {...windowIn(1.35, 92)}
            className="absolute left-[28px] top-[40px] flex h-[43px] w-[1018px] flex-col rounded-t-[14px] border border-[#eee] bg-[#fafafa]"
          >
            <div className="flex h-[43px] w-full items-center px-[24px]">
              <AppIdentity color="#1877f2" icon="facebook" name="Facebook" />
              <p className="min-w-px flex-1 text-[14px] font-semibold text-[#414141] whitespace-pre">
                {"   September "}
                <span className="font-normal text-[#c4c4c4]">2026</span>
              </p>
              <div className="flex w-[219px] shrink-0 items-center gap-[12px] pr-[12px]">
                <div className="flex items-center gap-[8px]">
                  <Pill className="bg-[#f3f4f6] text-[#6b7280]">Idle</Pill>
                  <p className="text-[10px] text-[#7d7d7d] whitespace-nowrap">Yesterday</p>
                </div>
                <img alt="" src="/icons/chevron-left.svg" className="size-[10px]" />
                <img alt="" src="/icons/chevron-right.svg" className="size-[10px]" />
                <div className="flex h-[26px] w-[47px] shrink-0 items-center justify-center rounded-[8px] border border-[#eee] bg-white text-[10px] text-[#171717]">
                  Today
                </div>
              </div>
            </div>
            <div className="absolute left-[408px] top-[41px] h-[2px] w-[39px] rounded-[2px] bg-[#ffb3a7]" />
          </motion.div>
          {/* Gmail */}
          <motion.div
            {...windowIn(1.2, 49)}
            className="absolute left-0 top-[83px] flex h-[49px] w-[1074px] flex-col rounded-t-[14px] border border-[#eee] bg-white px-[24px]"
          >
            <div className="flex h-[49px] w-full items-center">
              <AppIdentity color="#ea4335" icon="mail" name="Gmail" />
              <div className="flex min-w-px flex-1 items-center gap-[7px] p-[10px]">
                <p className="text-[11px] text-[#7d7d7d]">General</p>
                <img alt="" src="/icons/chevron-right.svg" className="size-[10px]" />
              </div>
              <div className="flex shrink-0 items-center gap-[7px] pr-[10px]">
                <img alt="" src="/img/collab-gmail.webp" className="h-[20px] w-[76px] rounded-[5px]" />
                <div className="flex items-center gap-[8px]">
                  <Pill className="bg-[#fff3e0] text-[#e65100]">Pending</Pill>
                  <p className="text-[10px] text-[#7d7d7d] whitespace-nowrap">2 mins ago</p>
                </div>
                <NewMessage />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
          className="absolute left-[9px] top-[174px]"
        >
          <Dashboard delay={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
