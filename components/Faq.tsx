"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { EASE, Reveal } from "./motion";

/* eslint-disable @next/next/no-img-element */

const faqs = [
  {
    from: "Emma Wilson",
    q: "What is Providius?",
    a: [
      "Providius is a ready-made AI customer support infrastructure.",
      "It connects your channels, answers customers with AI agents trained on your knowledge, and brings your team in when a human is needed.",
    ],
  },
  {
    from: "James Rodriguez",
    q: "Is this just another AI chatbot?",
    a: [
      "No.",
      "Providius goes beyond basic Automated chatbots.",
      " It understands context, uses your knowledge, and improves over time so conversations feel more natural and accurate.",
    ],
  },
  {
    from: "Sophia Chen",
    q: "Do I need technical skills to use it?",
    a: [
      "Not at all.",
      "You connect your channels, upload your documents or website, and your AI agent is ready. No code and no engineering team required.",
    ],
  },
  {
    from: "Andrew Thomas",
    q: "Is my customer’s data safe?",
    a: [
      "Yes.",
      "Conversations and knowledge are kept private to your workspace, and you stay in control of what your AI agents can access and share.",
    ],
  },
  {
    from: "Rukayat Ahmed",
    q: "How long does it take to set up?",
    a: [
      "Most teams are live in minutes.",
      "Add your knowledge, connect a channel like WhatsApp or web chat, and your AI agent starts answering customers right away.",
    ],
  },
  {
    from: "Daniel Okafor",
    q: "Which channels can I connect?",
    a: [
      "WhatsApp, web chat, email and voice.",
      "Everything lands in one omnichannel inbox, so your team sees the full conversation wherever it started.",
    ],
  },
  {
    from: "Lena Fischer",
    q: "What happens when the AI is unsure?",
    a: [
      "It escalates.",
      "The conversation is passed to the right person on your team with the full context, so the customer never has to repeat themselves.",
    ],
  },
];

export default function Faq() {
  const [active, setActive] = useState(0);
  const [read, setRead] = useState<number[]>([0]);
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs
      .map((f, i) => ({ ...f, i }))
      .filter((f) => !q || f.q.toLowerCase().includes(q) || f.a.join(" ").toLowerCase().includes(q));
  }, [query]);

  const select = (i: number) => {
    setActive(i);
    setRead((r) => (r.includes(i) ? r : [...r, i]));
  };

  const item = faqs[active];

  return (
    <section
      id="faq"
      className="relative mt-20 w-full overflow-hidden rounded-[32px] bg-[#0b0b0d] text-white md:mt-28 md:rounded-[48px]"
    >
      <img
        alt=""
        src="/img/faq-bg.webp"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/40 via-transparent to-[#0b0b0d]" />

      <Reveal y={60} duration={1.1} className="relative mx-auto max-w-[1100px] px-4 py-12 sm:px-8 md:py-20">
        <div className="mb-8 px-1 text-center md:mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[2px] text-[#20edff]">FAQs</p>
          <h2 className="mt-3 text-[30px] font-semibold leading-[1.15] tracking-[-0.6px] sm:text-[38px] md:text-[44px]">
            Questions, answered
          </h2>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[24px] border border-white/15 bg-[rgba(31,31,31,0.55)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md md:flex-row">
          {/* Thread list */}
          <div className="flex flex-col gap-3 border-b border-white/10 p-4 md:w-[380px] md:shrink-0 md:border-b-0 md:border-r md:p-5">
            <label className="flex h-11 items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-4 transition-colors focus-within:border-white/50">
              <img alt="" src="/icons/faq-search.svg" className="size-4 opacity-70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions"
                aria-label="Search questions"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-[#8a8a8a]"
              />
            </label>

            <div
              data-lenis-prevent
              className="no-scrollbar flex max-h-[260px] flex-col gap-2 overflow-y-auto overscroll-contain pr-1 md:max-h-[420px]"
            >
              <AnimatePresence initial={false}>
                {list.map((f) => {
                  const isActive = f.i === active;
                  const unread = !read.includes(f.i);
                  return (
                    <motion.button
                      key={f.q}
                      type="button"
                      layout
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      onClick={() => select(f.i)}
                      aria-pressed={isActive}
                      className={`flex w-full cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-300 ${
                        isActive
                          ? "border-white/25 bg-white/15"
                          : "border-white/10 bg-white/[0.04] hover:bg-white/10"
                      }`}
                    >
                      <span className="mt-[7px] flex w-2 shrink-0 justify-center">
                        <span
                          className={`size-2 rounded-full bg-[#14b8a6] transition-opacity duration-300 ${
                            unread && !isActive ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="flex justify-between text-[12px] text-[#9a9a9a]">
                          <span>{f.from}</span>
                          <span>2m ago</span>
                        </span>
                        <span className="text-[15px] font-semibold leading-snug text-white">{f.q}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
              {list.length === 0 && (
                <p className="px-2 py-8 text-center text-[14px] text-[#9a9a9a]">No questions match “{query}”.</p>
              )}
            </div>
          </div>

          {/* Reader */}
          <div className="flex min-h-[320px] flex-1 flex-col gap-6 p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-4">
              <img
                alt=""
                src="/img/federico.webp"
                className="size-12 shrink-0 rounded-full bg-[#717171] object-cover"
              />
              <div className="min-w-0">
                <p className="text-[15px] text-white">Federico</p>
                <p className="text-[13px] text-[#9a9a9a]">Reply-To · ProvidiusTech</p>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex flex-col gap-5"
              >
                <h3 className="text-[22px] font-semibold leading-snug tracking-[-0.4px] text-white md:text-[26px]">
                  {item.q}
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.65] text-[#c4c4c4] md:text-[18px]">
                  {item.a.map((line, l) => (
                    <p key={l}>{line}</p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="mt-auto pt-4 text-[13px] text-[#7a7a7a]">Sent from ProvidiusTech Support</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
