"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { EASE } from "./motion";

/* eslint-disable @next/next/no-img-element */

const links = [
  { label: "HOME", left: 297, href: "#top" },
  { label: "SERVICES", left: 372, href: "#how-it-works" },
  { label: "ABOUT US", left: 479, href: "#about" },
  { label: "RESOURCES", left: 591, href: "#faq", chevron: true },
];

/**
 * Sits over the hero exactly as designed, then sticks to the top of the
 * viewport on a frosted pill once the page scrolls.
 */
export default function Nav() {
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setStuck(y > 30));

  return (
    <div className="pointer-events-none sticky top-0 z-50 h-0">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className={`pointer-events-auto absolute left-1/2 h-[36px] w-[1002px] -translate-x-1/2 text-white transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-md:w-[338px] ${
          stuck ? "top-[20px] max-md:top-[16px]" : "top-[64px] max-md:top-[28px]"
        }`}
      >
        <span
          className={`absolute -inset-x-[24px] -inset-y-[11px] rounded-[30px] border border-white/15 bg-[#06224a]/75 shadow-[0_12px_40px_-12px_rgba(3,20,50,0.55)] backdrop-blur-[14px] transition-opacity duration-500 max-md:-inset-x-[12px] ${
            stuck ? "opacity-100" : "opacity-0"
          }`}
        />
        <a href="#top" className="absolute left-0 top-[2px] flex items-center gap-[6px]">
          <img alt="" src="/img/logo-mark.png" className="h-[32px] w-[29px]" />
          <span className="text-[23px] font-semibold leading-[26.45px]">ProvidiusTech</span>
          <span className="absolute left-[181px] top-[2px] text-[8px] leading-[9.2px] tracking-[-0.24px]">™</span>
        </a>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="group absolute top-[9px] text-[12px] font-medium leading-[13.8px] tracking-[1px] max-md:hidden"
            style={{ left: l.left }}
          >
            {l.label}
            {l.chevron && (
              <img
                alt=""
                src="/icons/nav-chevron.svg"
                className="absolute left-[95px] top-[5px] h-[4.7px] w-[7.7px] transition-transform duration-300 group-hover:rotate-180"
              />
            )}
            <span className="absolute -bottom-[6px] left-0 h-px w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        ))}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="absolute right-0 top-0 flex h-[35px] w-[142px] items-center justify-center rounded-[22px] bg-white text-[12px] font-semibold leading-[13.8px] tracking-[-0.24px] text-[#082249] max-md:w-[118px] max-md:text-[11px]"
        >
          CONTACT SALES
        </motion.a>
      </motion.nav>
    </div>
  );
}
