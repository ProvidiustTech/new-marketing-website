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
    <section id="about" className="relative pt-[57px] max-md:px-[20px] max-md:pt-[36px]">
      <h2 className="mx-auto w-[882px] text-center text-[38px] font-semibold leading-[39.9px] tracking-[-1.325px] text-[#1f1f1f] max-md:w-full max-md:text-[27px] max-md:leading-[30px]">
        <Words
          segments={[
            { text: "A global customer support infrastructure for businesses that want to" },
            { text: "scale smarter", className: "text-[#146ef5]" },
          ]}
          stagger={0.035}
        />
      </h2>

      <div className="relative mx-auto mt-[24px] h-[234px] w-[1002px] max-md:flex max-md:h-auto max-md:w-full max-md:flex-col max-md:gap-[14px]">
        {/* AI support agents */}
        <motion.div
          {...card(0)}
          whileHover={{ y: -6 }}
          className="absolute left-0 top-0 h-[234px] w-[324px] overflow-clip rounded-[17px] max-md:relative max-md:mx-auto"
          style={{
            backgroundImage:
              "linear-gradient(140.19deg, rgb(0, 95, 206) 14.286%, rgb(114, 217, 252) 85.714%)",
          }}
        >
          <img alt="" src="/img/logo-mark-card.png" className="absolute left-[25px] top-[17px] h-[30px] w-[26px]" />
          <p className="absolute left-[58px] top-[20px] text-[20px] font-semibold leading-[23px] text-white">
            ProvidiusTech
          </p>
          <p className="absolute left-[181px] top-[20px] text-[7px] leading-[8.05px] text-white">™</p>
          <div className="absolute left-[275px] top-[15px] h-[31px] w-[33px] overflow-clip rounded-[10px] bg-white">
            {[
              [9, 13, 8],
              [15, 5, 16],
              [21, 9, 12],
            ].map(([left, top, h], i) => (
              <motion.span
                key={left}
                className="absolute w-[4px] origin-bottom rounded-[1px] bg-[#092341]"
                style={{ left, top, height: h }}
                animate={{ scaleY: [1, 0.55, 1] }}
                transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          {stripes.map((w, i) => (
            <motion.span
              key={i}
              className="absolute h-[4px] rounded-[2px] bg-[#b0ecff]"
              style={{ left: 273 - w / 2, top: 73 + i * 7, width: w }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.04, ease: EASE }}
            />
          ))}
          <div className="absolute left-[17px] top-[95px] h-[125px] w-[291px] overflow-clip rounded-[14px] bg-white opacity-[0.96]">
            <p className="absolute left-[19px] top-[6px] text-[43px] font-semibold leading-[43px] tracking-[-1.325px] text-black tabular-nums">
              <Count to={120} suffix="+" />
            </p>
            <p className="absolute left-[19px] top-[50px] text-[20px] font-semibold leading-[23px] text-black">
              AI support agents
            </p>
            <p className="absolute left-[19px] top-[82px] w-[265px] text-[14px] leading-[16.38px] text-[#081b3a]">
              Trained to resolve inquiries, automate tasks, and deliver human-like support.
            </p>
          </div>
        </motion.div>

        {/* Resolution rate */}
        <motion.div
          {...card(1)}
          whileHover={{ y: -6 }}
          className="absolute left-[344px] top-0 h-[233px] w-[318px] overflow-clip rounded-[17px] bg-[#e9edf5] max-md:relative max-md:left-0 max-md:mx-auto"
        >
          <p className="absolute left-[24px] top-[14px] text-[14px] leading-[16.1px] text-black">Resolution rate</p>
          <p className="absolute left-[24px] top-[37px] text-[43px] font-semibold leading-[49.45px] tracking-[-1.325px] text-black tabular-nums">
            <Count to={98} suffix="%" />
          </p>
          <motion.img
            alt=""
            src="/img/avatars-stack.webp"
            className="absolute left-[24px] top-[85px] h-[49px] w-[147px]"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          />
          <p className="absolute left-[24px] top-[134px] w-[278px] text-[16px] leading-[20.96px] text-[#081b3a]">
            “Our AI agents handle the busy
            <br />
            work across channels, so your team can focus on what matters most growth.”
          </p>
        </motion.div>

        {/* Support conversations */}
        <motion.div
          {...card(2)}
          whileHover={{ y: -6 }}
          className="absolute left-[682px] top-0 h-[139px] w-[320px] overflow-clip rounded-[21px] bg-[#06b6d4] text-black max-md:relative max-md:left-0 max-md:mx-auto"
        >
          <p className="absolute left-[24px] top-[13px] text-[16px] leading-[18.4px]">Support conversations</p>
          <p className="absolute left-[24px] top-[35px] text-[39px] font-semibold leading-[44.85px] tracking-[-1.325px] tabular-nums">
            <Count to={520} suffix="K+" />
          </p>
          <p className="absolute left-[24px] top-[83px] w-[275px] text-[16px] leading-[19.68px]">
            Handled monthly across all
            <br />
            connected channels.
          </p>
        </motion.div>

        {/* Businesses supported */}
        <motion.div
          {...card(3)}
          whileHover={{ y: -6 }}
          className="absolute left-[682px] top-[154px] h-[76px] w-[320px] overflow-clip rounded-[20px] bg-[#061936] text-white max-md:relative max-md:left-0 max-md:top-0 max-md:mx-auto"
        >
          <p className="absolute left-[24px] top-[29px] text-[16px] font-medium leading-[18.4px]">
            Businesses supported
          </p>
          <p className="absolute left-[237px] top-[20px] text-[35px] leading-[40.25px] tracking-[-1.325px] tabular-nums">
            <Count to={20} suffix="+" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
