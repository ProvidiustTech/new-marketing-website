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
      "WhatsApp, web chat, Instagram, Telegram, Facebook and email, with voice notes supported across all channels.",
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
      className="relative mt-20 w-full overflow-hidden rounded-tr-[64px] bg-[#0b0b0d] text-white md:mt-[100px] md:rounded-tr-[150px]"
    >
      <img
        alt=""
        src="/img/faq-bg.webp"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-90"
      />

      <Reveal y={60} duration={1.1} className="relative mx-auto max-w-[1163px] px-4 pb-16 pt-24 sm:px-5 md:pb-[130px] md:pt-[150px]">
        <h2 className="sr-only">Frequently asked questions</h2>
        <div className="overflow-hidden rounded-[16px] border border-white/20 bg-[rgba(20,20,22,0.55)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md">
          {/* Window title bar */}
          <div className="flex h-[27px] items-center gap-[10px] px-3 pt-1">
            <span className="size-[19px] rounded-full bg-white" />
            <span className="size-[19px] rounded-full bg-white" />
            <span className="ml-1 text-[16px] font-medium">FAQs</span>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Thread list, fading out at the bottom */}
            <div className="relative px-4 pb-4 pt-6 md:w-[384px] md:shrink-0 md:pb-3 md:pt-8">
              <div
                data-lenis-prevent
                className="no-scrollbar flex max-h-[300px] flex-col gap-4 overflow-y-auto overscroll-contain pb-10 [mask-image:linear-gradient(to_bottom,#000_78%,transparent)] md:max-h-[480px]"
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
                        className={`mx-[5px] flex min-h-20 cursor-pointer items-center gap-2 rounded-[16px] px-4 text-left transition-colors duration-300 ${
                          isActive
                            ? "bg-gradient-to-b from-white/[0.16] to-white/[0.07] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
                            : "border border-white/25 hover:bg-white/[0.06]"
                        }`}
                      >
                        {!isActive && (
                          <span
                            className={`size-[7px] shrink-0 rounded-full bg-[#2563eb] transition-opacity ${unread ? "opacity-100" : "opacity-40"}`}
                          />
                        )}
                        <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
                          <span className={`flex justify-between text-[13px] ${isActive ? "text-white/20" : "text-white/55"}`}>
                            <span>{f.from}</span>
                            <span>2m ago</span>
                          </span>
                          <span className="text-[15px] font-semibold leading-6 text-white">{f.q}</span>
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
            <div className="flex min-h-[380px] flex-1 flex-col px-5 pb-8 pt-2 md:ml-[91px] md:mr-[50px] md:px-0 md:pt-0">
              <label className="flex h-9 items-center gap-3 rounded-full border border-white/25 px-4 transition-colors focus-within:border-white/60">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Have a question for us ?"
                  aria-label="Search questions"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/60"
                />
                <img alt="" src="/icons/faq-search.svg" className="size-4 opacity-80" />
              </label>

              <div className="px-[30px] pt-[30px] max-md:px-1">
                <div className="flex items-start gap-4">
                  <img alt="" src="/img/federico.webp" className="size-12 shrink-0 rounded-full bg-[#717171] object-cover" />
                  <div className="min-w-0">
                    <p className="text-[16px] leading-[23px] text-white">Federico</p>
                    <p className="mt-2 text-[13px] leading-[17px] text-white/40">Reply-To</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-[15px] font-semibold leading-[18px] text-white"
                      >
                        {item.q}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="my-[17px] h-px w-full bg-white/10" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="text-[18px] leading-[1.6] tracking-[-0.2px] text-white/45 md:text-[22px] md:leading-[35px]"
                  >
                    {item.a.map((line, l) => (
                      <p key={l}>{line}</p>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <p className="mt-6 text-[13px] text-white/40">Sent from my iPhone</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
