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
  const [active, setActive] = useState(1);
  // Mirrors the design's first frame: the first thread is highlighted and already read.
  const [highlight, setHighlight] = useState(0);
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
    setHighlight(i);
    setRead((r) => (r.includes(i) ? r : [...r, i]));
  };

  const item = faqs[active];
  let wordIndex = 0;

  return (
    <section
      id="faq"
      className="relative mt-[100px] h-[854.38px] w-full overflow-clip rounded-tr-[120px] bg-[#0b0b0d] max-md:mt-[40px] max-md:h-auto max-md:rounded-tr-[56px] max-md:px-[10px] max-md:py-[48px]"
    >
      <img
        alt=""
        src="/img/faq-bg.webp"
        className="pointer-events-none absolute left-0 top-[-21.64%] h-[143.28%] w-full max-w-none max-md:top-0 max-md:h-full max-md:object-cover"
      />

      <Reveal
        y={60}
        duration={1.1}
        className="absolute left-1/2 top-[140px] w-[1123px] -translate-x-1/2 max-md:relative max-md:left-0 max-md:top-0 max-md:w-full max-md:translate-x-0"
      >
        <div className="flex w-full flex-col items-start rounded-[16px] border border-white/20 bg-[rgba(31,31,31,0.53)] p-px shadow-[0px_2px_5px_0px_rgba(0,0,0,0.7)] backdrop-blur-[5px]">
          {/* Window bar */}
          <div className="relative h-[27px] w-full shrink-0">
            <span className="absolute left-[12.35px] top-[3.9px] size-[19.57px] rounded-full bg-[#f7f7f7]" />
            <span className="absolute left-[42.19px] top-[3.9px] size-[19.57px] rounded-full bg-[#f7f7f7]" />
            <p className="absolute left-[70.16px] top-[4px] font-inter text-[16px] font-semibold leading-[normal] text-[#d8d8d8]">
              FAQs
            </p>
          </div>

          <div className="flex items-start gap-[91px] max-md:w-full max-md:flex-col max-md:gap-0">
            {/* Thread list */}
            <div className="shrink-0 px-[16px] pb-[12.79px] pt-[32px] max-md:w-full max-md:px-[10px] max-md:pt-[16px]">
              <div
                data-lenis-prevent
                className="no-scrollbar h-[480px] w-[352px] overflow-y-auto overscroll-contain px-[4.8px] [mask-image:linear-gradient(to_bottom,transparent,#000_13%,#000_78%,transparent)] max-md:h-[300px] max-md:w-full"
              >
                <div className="flex flex-col gap-[16px] pb-[60px]">
                  <AnimatePresence initial={false}>
                    {list.map((f) => {
                      const isHighlighted = f.i === highlight;
                      const unread = !read.includes(f.i);
                      return (
                        <motion.button
                          key={f.q}
                          type="button"
                          layout
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.985 }}
                          onClick={() => select(f.i)}
                          aria-pressed={f.i === active}
                          className={`my-[3.2px] flex h-[80px] w-full shrink-0 cursor-pointer items-center rounded-[16px] border border-[rgba(254,254,254,0.2)] p-[16px] text-left transition-colors duration-300 ${
                            isHighlighted
                              ? "bg-[rgba(61,61,61,0.79)]"
                              : "bg-[rgba(31,31,31,0.79)] hover:bg-[rgba(45,45,45,0.79)]"
                          }`}
                        >
                          {f.i !== 0 && (
                            <span className="flex h-[27.83px] w-[16px] shrink-0 items-start">
                              <span
                                className={`size-[7px] rounded-full bg-[#14b8a6] transition-opacity duration-300 ${unread && !isHighlighted ? "opacity-100" : "opacity-0"}`}
                              />
                            </span>
                          )}
                          <span className="flex min-w-0 flex-1 flex-col gap-[2.195px]">
                            <span className="flex justify-between text-[12.8px] leading-[17.28px] text-[#717171]">
                              <span>{f.from}</span>
                              <span>2m ago</span>
                            </span>
                            <span className="truncate font-inter text-[16px] font-semibold leading-[normal] tracking-[-0.3px] text-[#fefefe]">
                              {f.q}
                            </span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                  {list.length === 0 && (
                    <p className="px-[12px] pt-[70px] text-[14px] text-[#717171]">
                      No questions match “{query}”.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Reader */}
            <div className="flex w-[576px] shrink-0 flex-col items-start gap-[10px] max-md:w-full max-md:px-[10px] max-md:pb-[10px]">
              <label className="flex h-[38px] w-full items-center justify-between rounded-[16px] border border-[rgba(254,254,254,0.2)] bg-[rgba(31,31,31,0.79)] px-[16px] transition-colors duration-300 focus-within:border-white/50">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Have a question for us ?"
                  aria-label="Search questions"
                  className="min-w-0 flex-1 bg-transparent font-inter text-[16px] font-medium tracking-[-0.3px] text-[#fefefe] outline-none placeholder:text-[#717171]"
                />
                <img alt="" src="/icons/faq-search.svg" className="size-[16px]" />
              </label>

              <div className="flex min-h-[407px] w-full flex-col items-start gap-[15px] p-[30.4px] font-inter max-md:min-h-[360px] max-md:p-[16px]">
                <div className="flex h-[75.2px] w-full items-start gap-[16px]">
                  <img
                    alt=""
                    src="/img/federico.webp"
                    className="size-[48px] shrink-0 rounded-full bg-[#717171] object-cover"
                  />
                  <div className="relative h-[56.64px] flex-1">
                    <p className="absolute left-0 top-[-1px] text-[16px] leading-[normal] tracking-[-0.3px] text-[#fefefe]">
                      Federico
                    </p>
                    <div className="absolute inset-x-0 top-[32.48px]">
                      <p className="text-[14px] leading-[1.2] tracking-[-0.2px] text-[#717171]">Reply-To</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={active}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                          className="mt-[0.6px] font-sans text-[14.4px] font-semibold leading-[17.28px] text-[#fefefe]"
                        >
                          {item.q}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="h-[18px] w-full pt-px">
                  <div className="h-px w-full rounded-[14.4px] bg-[#717171] opacity-30" />
                </div>
                <div className="w-[538px] pb-[16px] text-[24px] leading-[normal] tracking-[-0.75px] text-[#7e7e7e] max-md:w-full max-md:text-[18px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.a.map((line, l) => (
                        <p key={l} className="whitespace-pre-wrap">
                          {line.split(/(\s+)/).map((token, t) =>
                            /^\s+$/.test(token) || token === "" ? (
                              token
                            ) : (
                              <motion.span
                                key={t}
                                className="inline-block"
                                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 + wordIndex++ * 0.022, ease: EASE }}
                              >
                                {token}
                              </motion.span>
                            ),
                          )}
                        </p>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="text-[14px] leading-[1.2] tracking-[-0.2px] text-[#717171]">Sent from my iPhone</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
