"use client";

import { motion } from "motion/react";

/**
 * The cyan "Get started" pill with the darker chevron tail peeking out
 * behind it, exactly as layered in the design.
 */
export default function CtaButton({
  href = "#contact",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      className={`group relative block h-[41px] w-[221px] ${className}`}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="rest"
      animate="rest"
    >
      <span className="absolute left-[54px] top-0 h-[41px] w-[167px] overflow-clip rounded-[24px] bg-[#04549b]">
        {[116, 128, 140].map((left, i) => (
          <span
            key={left}
            className="absolute top-[10px] flex size-[23px] items-center justify-center"
            style={{ left }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/icons/chev-1.svg"
              className="size-[23px] -rotate-90 animate-chev"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          </span>
        ))}
      </span>
      <motion.span
        className="absolute left-0 top-0 h-[41px] w-[175px] overflow-clip rounded-[24px] bg-[#20edff]"
        variants={{ rest: { x: 0 }, hover: { x: 6 } }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <span className="absolute left-[17px] top-[12px] text-[13px] font-semibold leading-[14.95px] tracking-[-0.24px] text-[#03294a]">
          GET STARTED
        </span>
        <span className="absolute left-[136px] top-[4px] size-[33px] overflow-clip rounded-[18px] bg-[#00425d]">
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            variants={{ rest: { x: 0 }, hover: { x: [0, 26, -26, 0] } }}
            transition={{ duration: 0.5, times: [0, 0.45, 0.46, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/icons/arrow-right.svg" width={12.78} height={11.2} />
          </motion.span>
        </span>
      </motion.span>
    </motion.a>
  );
}
