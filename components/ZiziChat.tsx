"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CHAT_WIDGET } from "@/lib/site";

type Msg = { id: string; from: "user" | "bot"; text: string };

const SESSION_KEY = "zizi_session_id";
const HISTORY_KEY = "zizi_history";

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: the chat still works, it just won't persist.
  }
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** The conversation id the platform groups this visitor's messages under. */
function sessionId(): string {
  let id = readStorage(SESSION_KEY);
  if (!id) {
    id = `web-${newId()}`;
    writeStorage(SESSION_KEY, id);
  }
  return id;
}

const greeting: Msg = { id: "greeting", from: "bot", text: CHAT_WIDGET.greeting };

export default function ZiziChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore the conversation after hydration so server and client render the same first frame.
  useEffect(() => {
    const saved = readStorage(HISTORY_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Msg[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from storage
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
    } catch {
      // Corrupt history: start fresh.
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) writeStorage(HISTORY_KEY, JSON.stringify(messages.slice(-50)));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;

    const clientId = newId();
    setMessages((m) => [...m, { id: clientId, from: "user", text }]);
    setDraft("");
    setSending(true);

    let reply = "Sorry, I couldn't reach our team just now. Please try again in a moment.";
    try {
      const res = await fetch(`${CHAT_WIDGET.apiUrl}/api/v1/webchat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          org_id: CHAT_WIDGET.orgId,
          session_id: sessionId(),
          sender_name: "Website Visitor",
          text,
          client_message_id: clientId,
        }),
      });
      const data = await res.json();
      if (data?.reply?.text) reply = data.reply.text;
      else if (data?.duplicate) reply = "";
    } catch {
      // Network or CORS failure: keep the fallback reply.
    }

    if (reply) setMessages((m) => [...m, { id: newId(), from: "bot", text: reply }]);
    setSending(false);
  }

  const side = CHAT_WIDGET.position === "left" ? "left-4 sm:left-6" : "right-4 sm:right-6";
  const origin = CHAT_WIDGET.position === "left" ? "bottom left" : "bottom right";

  return (
    <div className={`fixed bottom-4 z-[60] sm:bottom-6 ${side}`} style={{ ["--zizi" as string]: CHAT_WIDGET.color }}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={`Chat with ${CHAT_WIDGET.botName}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: origin }}
            className="mb-3 flex h-[min(560px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.35)] ring-1 ring-black/5 sm:w-[380px]"
          >
            <header className="flex items-center gap-3 bg-[var(--zizi)] px-4 py-3 text-white">
              <span className="grid size-9 place-items-center rounded-full bg-white/20 font-jakarta text-base font-bold">
                {CHAT_WIDGET.botName.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-jakarta text-[15px] font-semibold leading-tight">{CHAT_WIDGET.botName}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="size-1.5 rounded-full bg-emerald-200" /> AI assistant · replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-full transition hover:bg-white/15"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div
              ref={listRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-slate-50 px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-md bg-[var(--zizi)] text-white"
                        : "rounded-bl-md bg-white text-slate-800 ring-1 ring-slate-200"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start" aria-label={`${CHAT_WIDGET.botName} is typing`}>
                  <span className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-3.5 py-3 ring-1 ring-slate-200">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={send} className="flex items-end gap-2 border-t border-slate-200 bg-white p-3">
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder="Type your message…"
                aria-label="Message"
                className="max-h-28 min-h-10 flex-1 resize-none rounded-xl bg-slate-100 px-3 py-2.5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--zizi)]/40"
              />
              <button
                type="submit"
                disabled={!draft.trim() || sending}
                aria-label="Send message"
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--zizi)] text-white transition disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex ${CHAT_WIDGET.position === "left" ? "justify-start" : "justify-end"}`}>
        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : `Chat with ${CHAT_WIDGET.botName}`}
          aria-expanded={open}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 items-center gap-2 rounded-full bg-[var(--zizi)] pl-4 pr-5 text-white shadow-[0_10px_30px_-8px_rgba(20,110,245,0.6)]"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 20.5l1.4-4.4A8.4 8.4 0 1 1 21 11.5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="font-jakarta text-[15px] font-semibold">{open ? "Close" : `Ask ${CHAT_WIDGET.botName}`}</span>
        </motion.button>
      </div>
    </div>
  );
}
