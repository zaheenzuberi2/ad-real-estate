"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  respond,
  OPENING,
  type BotReply,
  type ChatAction,
} from "@/lib/chat/engine";
import {
  LEAD_FLOW,
  FLOW_SKIP_LABEL,
  type FlowStep,
} from "@/lib/chat/lead-flow";
import { submitChatLead } from "@/app/actions/submit-chat-lead";
import type { ChatLeadInput } from "@/lib/lead-schema";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { LogoMark } from "@/components/ui/Logo";

type Message = {
  id: string;
  from: "bot" | "user";
  reply?: BotReply;
  text?: string;
};

type FlowState = { index: number; answers: Record<string, string> };

/**
 * A sequential counter would collide with itself: it resets to 0 on every
 * full page load, but conversation history survives reloads in
 * sessionStorage, so a fresh "m1" would land on top of an already-used one
 * from before the reload. Randomising the suffix keeps ids unique across
 * reloads without needing any server-assigned state.
 */
const nextId = () =>
  `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const STORAGE_KEY = "ad-re-chat-history-v1";
const FLOW_KEY = "ad-re-chat-flow-v1";

function loadHistory(): Message[] | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Message[];
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

function saveHistory(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
  } catch {
    // Private browsing or a full quota — the widget still works, it just
    // will not remember the conversation across a reload.
  }
}

function loadFlow(): FlowState | null {
  try {
    const raw = sessionStorage.getItem(FLOW_KEY);
    return raw ? (JSON.parse(raw) as FlowState) : null;
  } catch {
    return null;
  }
}

function saveFlow(flow: FlowState | null) {
  try {
    if (flow) sessionStorage.setItem(FLOW_KEY, JSON.stringify(flow));
    else sessionStorage.removeItem(FLOW_KEY);
  } catch {
    // Non-fatal — the flow just will not resume after a reload.
  }
}

const whatsappFallback: ChatAction = {
  kind: "external",
  label: "Message us on WhatsApp",
  href: `${site.whatsapp.href}?text=${encodeURIComponent(
    "Hi, I tried to leave my details on the site assistant."
  )}`,
};

/** The bot bubble for one flow step: its question plus tappable answers. */
function stepReply(step: FlowStep): BotReply {
  const actions: ChatAction[] = (step.options ?? []).map((label) => ({
    kind: "reply",
    label,
  }));
  if (step.skippable) actions.push({ kind: "reply", label: FLOW_SKIP_LABEL });
  return { text: step.question, actions };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  // The panel (and this list) only renders once `open` is true, so restoring
  // from sessionStorage here changes no server-rendered output and needs no
  // effect: the closed-state HTML is identical either way.
  const [messages, setMessages] = useState<Message[]>(() =>
    typeof window === "undefined"
      ? [{ id: nextId(), from: "bot", reply: OPENING }]
      : loadHistory() ?? [{ id: nextId(), from: "bot", reply: OPENING }]
  );
  const [flow, setFlow] = useState<FlowState | null>(() =>
    typeof window === "undefined" ? null : loadFlow()
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    saveFlow(flow);
  }, [flow]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, typing]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  const toggleOpen = () => {
    setOpen((v) => !v);
    setEverOpened(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pushBot = (reply: BotReply) =>
    setMessages((prev) => [...prev, { id: nextId(), from: "bot", reply }]);

  const startFlow = () => {
    setFlow({ index: 0, answers: {} });
    pushBot(stepReply(LEAD_FLOW[0]));
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || sending) return;
    setInput("");
    setMessages((prev) => [...prev, { id: nextId(), from: "user", text }]);

    // ── Guided lead-capture flow ──────────────────────────────────────────
    if (flow) {
      const step = LEAD_FLOW[flow.index];
      const skipped =
        !!step.skippable && text.toLowerCase() === FLOW_SKIP_LABEL.toLowerCase();
      const value = skipped ? "" : text;

      if (!skipped && step.validate) {
        const err = step.validate(value);
        if (err) {
          setTyping(true);
          window.setTimeout(() => {
            pushBot({ text: err, actions: stepReply(step).actions });
            setTyping(false);
          }, 300);
          return;
        }
      }

      const answers = { ...flow.answers, [step.key]: value };
      const nextIndex = flow.index + 1;

      if (nextIndex < LEAD_FLOW.length) {
        setFlow({ index: nextIndex, answers });
        setTyping(true);
        window.setTimeout(() => {
          pushBot(stepReply(LEAD_FLOW[nextIndex]));
          setTyping(false);
        }, 360 + Math.random() * 240);
        return;
      }

      // Last answer collected — hand it to the server.
      setFlow(null);
      setSending(true);
      setTyping(true);
      void (async () => {
        let result;
        try {
          result = await submitChatLead(answers as unknown as ChatLeadInput);
        } catch {
          result = {
            ok: false,
            message:
              "That did not go through. You can reach us straight on WhatsApp.",
          };
        }
        setTyping(false);
        setSending(false);
        pushBot({
          text: result.message,
          actions: result.ok ? undefined : [whatsappFallback],
        });
      })();
      return;
    }

    // ── Ordinary Q&A ─────────────────────────────────────────────────────
    setTyping(true);
    const delay = 380 + Math.random() * 320;
    window.setTimeout(() => {
      pushBot(respond(text));
      setTyping(false);
    }, delay);
  };

  const reset = () => {
    const opening = { id: nextId(), from: "bot" as const, reply: OPENING };
    setMessages([opening]);
    saveHistory([opening]);
    setFlow(null);
  };

  const composerHint = flow
    ? LEAD_FLOW[flow.index]?.allowText
      ? "Type your answer…"
      : "Tap an option above…"
    : "Ask about plots, prices, visits…";

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-28 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          // The launcher button and its gap sit below this panel in the same
          // fixed, bottom-anchored column, so the reserved space here has to
          // include them too — otherwise the panel's top edge clips above the
          // viewport on shorter screens instead of just shrinking.
          className="flex h-[min(34rem,calc(100dvh-12.5rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-[0_28px_60px_-16px_rgba(6,13,26,0.45)] animate-[chat-in_0.35s_var(--ease-brand)]"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-3 bg-navy-deep px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15">
                <LogoMark size={20} />
              </div>
              <div className="min-w-0">
                <p id={titleId} className="truncate font-display text-sm font-semibold text-white">
                  AD Real Estate Assistant
                </p>
                <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
                  Automated, not a person
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={reset}
                aria-label="Restart conversation"
                className="tap flex items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white"
              >
                <Icon name="navigation" className="h-4 w-4 rotate-45" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="tap flex items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-ivory px-3.5 py-4"
          >
            {messages.map((m) => (
              <ChatBubble
                key={m.id}
                message={m}
                onAction={send}
                onStartFlow={startFlow}
              />
            ))}
            {typing && (
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm w-fit">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-hairline bg-white px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={composerHint}
              aria-label="Type your message"
              autoComplete="off"
              disabled={sending}
              className="min-w-0 flex-1 rounded-full bg-sand px-4 py-2.5 text-sm text-navy-deep placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send message"
              className="tap flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy-deep transition-transform duration-200 ease-brand hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Icon name="arrow-right" className="h-4 w-4 -rotate-45" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="tap group relative flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold shadow-[0_10px_26px_-8px_rgba(11,27,51,0.6)] transition-all duration-300 ease-brand hover:-translate-y-1 hover:bg-navy-mid hover:shadow-[0_18px_36px_-10px_rgba(11,27,51,0.65)]"
      >
        {!everOpened && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-gold" />
          </span>
        )}
        <Icon
          name={open ? "close" : "message-circle"}
          className="h-6 w-6 transition-transform duration-300 ease-brand group-hover:scale-110"
        />
      </button>
    </div>
  );
}

function ChatBubble({
  message,
  onAction,
  onStartFlow,
}: {
  message: Message;
  onAction: (text: string) => void;
  onStartFlow: () => void;
}) {
  if (message.from === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-navy px-4 py-2.5 text-sm text-white">
          {message.text}
        </div>
      </div>
    );
  }

  const reply = message.reply;
  if (!reply) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-relaxed text-navy-deep shadow-sm">
        {reply.text}
      </div>

      {reply.cards && reply.cards.length > 0 && (
        <div className="flex w-full flex-col gap-1.5">
          {reply.cards.slice(0, 3).map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex items-center justify-between gap-2 rounded-xl border border-hairline bg-white px-3.5 py-2.5 transition-colors hover:border-gold"
            >
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-navy-deep">
                  {c.title}
                </span>
                <span className="block truncate text-[11px] text-slate-500">
                  {c.meta}
                </span>
              </span>
              <Icon
                name="arrow-right"
                className="h-3.5 w-3.5 shrink-0 text-gold transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      )}

      {reply.actions && reply.actions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {reply.actions.map((a) => (
            <ActionChip
              key={a.label}
              action={a}
              onReply={onAction}
              onStartFlow={onStartFlow}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ActionChip({
  action,
  onReply,
  onStartFlow,
}: {
  action: ChatAction;
  onReply: (text: string) => void;
  onStartFlow: () => void;
}) {
  const cls =
    "tap inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors";

  if (action.kind === "flow") {
    return (
      <button
        type="button"
        onClick={onStartFlow}
        className={`${cls} bg-gold text-navy-deep hover:bg-gold-bright`}
      >
        <Icon name="phone" className="h-3.5 w-3.5" />
        {action.label}
      </button>
    );
  }

  if (action.kind === "reply") {
    return (
      <button
        type="button"
        onClick={() => onReply(action.label)}
        className={`${cls} bg-sand text-navy hover:bg-hairline`}
      >
        {action.label}
      </button>
    );
  }

  if (action.kind === "external") {
    const isWhatsApp = action.href.includes("wa.me");
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} ${
          isWhatsApp
            ? "bg-whatsapp text-white hover:bg-whatsapp-dark"
            : "border border-navy/20 text-navy hover:bg-navy hover:text-white"
        }`}
      >
        {isWhatsApp && <WhatsAppGlyph className="h-3.5 w-3.5" />}
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={`${cls} border border-navy/20 text-navy hover:bg-navy hover:text-white`}>
      {action.label}
    </Link>
  );
}
