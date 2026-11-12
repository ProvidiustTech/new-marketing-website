"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = 8,
  duration = 0.9,
  ...rest
}: HTMLMotionProps<"div"> & {
  children?: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type Segment = { text: string; className?: string };

/** Word-by-word masked rise, used for headlines. */
export function Words({
  segments,
  delay = 0,
  stagger = 0.045,
  onView = true,
}: {
  segments: Segment[];
  delay?: number;
  stagger?: number;
  onView?: boolean;
}) {
  let i = 0;
  const target = { y: "0%", opacity: 1, filter: "blur(0px)" };
  return (
    <>
      {segments.map((seg, s) =>
        seg.text.split(" ").map((word, w, arr) => {
          const d = delay + i++ * stagger;
          return (
            <span
              key={`${s}-${w}`}
              className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
            >
              <motion.span
                className={`inline-block ${seg.className ?? ""}`}
                initial={{ y: "105%", opacity: 0, filter: "blur(6px)" }}
                {...(onView
                  ? {
                      whileInView: target,
                      viewport: { once: true, margin: "0px 0px -10% 0px" },
                    }
                  : { animate: target })}
                transition={{ duration: 0.85, delay: d, ease: EASE }}
              >
                {word}
                {w < arr.length - 1 || s < segments.length - 1 ? " " : ""}
              </motion.span>
            </span>
          );
        }),
      )}
    </>
  );
}

/** Counts up to `to` when scrolled into view. */
export function Count({
  to,
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}
