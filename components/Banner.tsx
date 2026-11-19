"use client";

import { motion } from "motion/react";
import CtaButton from "./CtaButton";
import { EASE } from "./motion";

/* eslint-disable @next/next/no-img-element */

const COPY =
  "A ready-made AI customer support infrastructure that connects your channels, automates responses, and scales with your business.";

/**
 * "Full control of your support" banner.
 * Desktop uses the design's own 2× export (title, copy and button included) so it matches pixel for pixel;
 * the real heading/copy stay in the DOM for screen readers and a link sits exactly over the drawn button.
 * Phones get a text-free crop of the same photo with live text underneath.
 */
export default function Banner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50, clipPath: "inset(6% 6% 6% 6% round 32px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
      className="relative mx-auto mt-20 w-full max-w-[1229px] px-5 md:mt-[100px] md:px-10"
    >
      {/* Phones: sharp photo crop, live copy on a matching blue panel below */}
      <div className="overflow-hidden rounded-[24px] bg-[#2a7fc6] text-white md:hidden">
        <div className="relative">
          <img
            alt=""
            src="/img/banner-mobile.webp"
            width={844}
            height={767}
            decoding="async"
            className="block aspect-[844/767] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2a7fc6] to-transparent" />
          <h2 className="absolute bottom-4 left-5 text-[30px] font-medium leading-[1.02] tracking-[-0.03em]">
            <span className="block">Full control</span>
            <span className="block">of your support</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-6 px-5 pb-7 pt-3">
          <p className="text-[15px] leading-[1.45] tracking-[-0.02em]">{COPY}</p>
          <CtaButton />
        </div>
      </div>

      {/* Tablet and up: the design export itself */}
      <div className="relative hidden overflow-hidden rounded-[24px] md:block">
        <img
          alt=""
          src="/img/banner-full.webp"
          width={1980}
          height={767}
          decoding="async"
          className="block aspect-[1980/767] w-full"
        />
        <h2 className="sr-only">Full control of your support</h2>
        <p className="sr-only">{COPY}</p>
        <a
          href="#contact"
          aria-label="Get started"
          className="absolute left-[72.98%] top-[71.06%] h-[9.26%] w-[19.44%] rounded-full focus-visible:outline-2 focus-visible:outline-white"
        />
      </div>
    </motion.section>
  );
}
