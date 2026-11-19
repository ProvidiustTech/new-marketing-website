"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { EASE } from "./motion";

/* eslint-disable @next/next/no-img-element */

const links = [
  { label: "SERVICES", href: "#how-it-works" },
  { label: "INDUSTRIES", href: "#industries" },
  { label: "PRICING", href: "#about" },
  { label: "RESOURCES", href: "#faq", chevron: true },
];

/** Transparent over the hero, then a frosted bar once the page scrolls. */
export default function Nav() {
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setStuck(y > 24));

  const lenis = useLenis();
  const close = () => setOpen(false);

  // While the mobile menu is open: freeze the page (Lenis + native scroll) and close it
  // again if the screen grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev.html;
      document.body.style.overflow = prev.body;
      lenis?.start();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  // Menu links: close first (which unlocks scrolling), then glide to the section.
  const navTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Wait a tick for the lock to release, then force the glide even if Lenis was just restarted.
    window.setTimeout(() => {
      if (lenis) lenis.scrollTo(href, { offset: -90, force: true });
      else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-3 md:px-10 md:pt-5">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className={`mx-auto flex max-w-[1048px] items-center justify-between gap-4 rounded-full border px-4 py-2.5 text-white transition-[background,box-shadow,border-color] duration-500 md:px-6 md:py-3 ${
          stuck || open
            ? "border-white/15 bg-[#06224a]/80 shadow-[0_12px_40px_-12px_rgba(3,20,50,0.55)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" onClick={close}>
          <img alt="Providiustech" src="/img/logo.png" width={720} height={135} className="h-[26px] w-auto md:h-[30px]" />
        </a>

        <div className="hidden items-center gap-[35px] md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative flex items-center gap-[9px] text-[12px] font-medium leading-[13.8px] tracking-[1px] text-white transition-opacity hover:opacity-80"
            >
              {l.label}
              {l.chevron && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M3 4.5 6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden h-[35px] w-[142px] place-items-center rounded-[22px] bg-white text-[12px] font-semibold leading-[13.8px] tracking-[-0.24px] text-[#082249] sm:grid"
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

      {/* Blurred backdrop behind the mobile menu; tapping it closes the menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 -z-10 h-dvh touch-none bg-[#031432]/45 backdrop-blur-md md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mx-auto mt-2 flex max-w-[1048px] touch-none flex-col gap-1 rounded-3xl border border-white/15 bg-[#06224a]/90 p-3 text-white backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => navTo(e, l.href)}
                className="rounded-2xl px-4 py-3 text-[15px] font-medium hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => navTo(e, "#contact")}
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
