"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { EASE } from "./motion";

/* eslint-disable @next/next/no-img-element */

const links = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#how-it-works" },
  { label: "About us", href: "#about" },
  { label: "Resources", href: "#faq" },
];

/** Transparent over the hero, then a frosted bar once the page scrolls. */
export default function Nav() {
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setStuck(y > 24));

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-3 md:px-10 md:pt-5">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className={`mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full border px-4 py-2.5 text-white transition-[background,box-shadow,border-color] duration-500 md:px-6 md:py-3 ${
          stuck
            ? "border-white/15 bg-[#06224a]/80 shadow-[0_12px_40px_-12px_rgba(3,20,50,0.55)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" onClick={close}>
          <img alt="" src="/img/logo-mark.png" className="h-9 w-[34px] object-contain" />
          <span className="relative text-[22px] font-semibold tracking-[-0.4px] md:text-[26px]">
            Providiustech
            <sup className="absolute -right-[10px] top-[2px] text-[9px] font-normal leading-none">™</sup>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-[13px] font-medium tracking-[0.3px] text-white/90 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold tracking-[0.2px] text-[#082249] sm:block"
          >
            CONTACT SALES
          </motion.a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full bg-white/10 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[2px] w-4 rounded bg-white transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rounded bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 h-[2px] w-4 rounded bg-white transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-full"}`}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mx-auto mt-2 flex max-w-[1240px] flex-col gap-1 rounded-3xl border border-white/15 bg-[#06224a]/90 p-3 text-white backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={close}
                className="rounded-2xl px-4 py-3 text-[15px] font-medium hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={close}
              className="mt-1 rounded-full bg-white px-4 py-3 text-center text-[13px] font-semibold text-[#082249]"
            >
              CONTACT SALES
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
