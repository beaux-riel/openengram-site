"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import {
  Brain,
  Cpu,
  Code2,
  LayoutDashboard,
  Plug,
  Package,
  Moon,
  Search,
  Activity,
  Shield,
  Users,
  Zap,
  Check,
  Github,
  ArrowRight,
  Star,
  Lock,
  Globe,
} from "lucide-react";

// ── Supabase ───────────────────────────────────────────────────
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uwnyuvhgzuqxbejakgtg.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) return null;
  return createClient(url, key);
}

// ── Animation variants ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Section wrapper ────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className={`py-24 px-6 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ── NAV ────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold">
          ◎ <span className="text-gradient">Engram</span>
        </a>
        <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
          <a href="https://github.com/heybeaux/engram" target="_blank" className="hover:text-white transition-colors">GitHub</a>
        </div>
        <a
          href="#waitlist"
          className="px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-black text-sm font-semibold transition-colors"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}

// ── HERO ───────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden pt-14">
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-sm mb-8">
          <Star className="w-4 h-4" />
          <span>Open Source — Apache 2.0</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Your AI&apos;s memories
          <br />
          <span className="text-gradient">shouldn&apos;t belong to OpenAI</span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Every AI platform locks your agent&apos;s memories in their walled garden.
          Switch providers and start from zero. Engram gives you portable,
          private, platform-agnostic memory — self-hosted or cloud.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-black font-semibold transition-colors"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/heybeaux/engram"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold transition-colors"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
        </div>

        {/* Value props instead of vanity stats */}
        <div className="flex flex-wrap gap-6 justify-center mt-16 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-400" />
            <span>Self-hosted &amp; private</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-400" />
            <span>Works with any LLM</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-400" />
            <span>124ms p50 recall</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-brand-400" />
            <span>Apache 2.0 license</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── THE PROBLEM ────────────────────────────────────────────────
function Problem() {
  return (
    <Section>
      <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Every AI agent wakes up{" "}
          <span className="text-gradient">blank</span>
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Your agent doesn&apos;t remember yesterday&apos;s conversation, last
          week&apos;s decision, or the user&apos;s name. Most &ldquo;memory&rdquo;
          solutions bolt vector search onto chat history and call it a day.
          That&apos;s not memory — that&apos;s <code className="text-brand-400">ctrl+F</code>.
        </p>
        <p className="text-lg text-zinc-400 leading-relaxed mt-4">
          And worse — the platforms that do offer memory lock it inside their
          walled gardens. Your agent&apos;s knowledge belongs to them, not you.
        </p>
      </motion.div>
    </Section>
  );
}

// ── HOW IT WORKS ───────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Remember",
    desc: "Your agent captures knowledge from every conversation. Engram extracts facts, preferences, events, and decisions — classifying each by type and scoring importance.",
    icon: Brain,
  },
  {
    num: "02",
    title: "Consolidate",
    desc: "The Dream Cycle runs nightly — deduplicating, scoring, pruning stale memories, and forming connections. Like your brain processing short-term into long-term storage.",
    icon: Moon,
  },
  {
    num: "03",
    title: "Recall",
    desc: "Ensemble search across multiple embedding models finds the right memory in 124ms. Temporal awareness means recent context wins when it matters.",
    icon: Search,
  },
];

function HowItWorks() {
  return (
    <Section id="how-it-works">
      <motion.div variants={fadeUp} className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          How it <span className="text-gradient">works</span>
        </h2>
      </motion.div>

      <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <motion.div
            key={step.num}
            variants={fadeUp}
            className="relative p-8 rounded-xl border border-zinc-800 bg-zinc-900/30"
          >
            <span className="text-6xl font-bold text-zinc-800 absolute top-4 right-6">
              {step.num}
            </span>
            <step.icon className="w-8 h-8 text-brand-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Code example */}
      <motion.div variants={fadeUp} className="mt-12 max-w-2xl mx-auto">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500">
            <span className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-2">agent.ts</span>
          </div>
          <pre className="p-6 text-sm overflow-x-auto">
            <code className="text-zinc-300">
{`import { Engram } from '@engram/client';

const engram = new Engram({ apiKey: 'ek_...' });

// Remember
await engram.remember("Beaux prefers dark mode");

// Recall
const memories = await engram.recall("UI preferences");
// → [{ content: "Beaux prefers dark mode", score: 0.94 }]`}
            </code>
          </pre>
        </div>
      </motion.div>
    </Section>
  );
}

// ── FEATURES ───────────────────────────────────────────────────
const features = [
  {
    icon: Moon,
    title: "Dream Cycle",
    desc: "4-stage nightly consolidation: score refresh, dedup, pattern extraction, staleness pruning",
  },
  {
    icon: Search,
    title: "Ensemble Search",
    desc: "Multiple embedding models with Reciprocal Rank Fusion for higher recall accuracy",
  },
  {
    icon: Activity,
    title: "Memory Health Score",
    desc: "Real-time cognitive health monitoring — freshness, coverage, dedup health, vitality",
  },
  {
    icon: Shield,
    title: "Safety Detection",
    desc: "16 patterns catch PII, medical info, financial data, and credentials before they persist",
  },
  {
    icon: Users,
    title: "Memory Pools",
    desc: "Multi-agent shared memory with granular access control and attribution tracking",
  },
  {
    icon: Zap,
    title: "Local Embeddings",
    desc: "Run models on your own GPU with engram-embed. Zero API costs, total privacy",
  },
];

function Features() {
  return (
    <Section id="features">
      <motion.div variants={fadeUp} className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Built for <span className="text-gradient">production</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Not a toy. Not a wrapper around vector search. Real memory
          infrastructure with the features you need.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            className="p-6 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors"
          >
            <f.icon className="w-6 h-6 text-brand-400 mb-3" />
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-zinc-400">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ── MID-PAGE CTA ───────────────────────────────────────────────
function MidCta() {
  return (
    <Section>
      <motion.div
        variants={fadeUp}
        className="text-center p-12 rounded-2xl border border-zinc-800 bg-gradient-to-b from-brand-500/5 to-transparent"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Your memories. Your control. <span className="text-gradient">Any model.</span>
        </h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          Talk to Claude on one device, ChatGPT on another, and Gemini on a third.
          Your Engram memories follow you everywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-black font-semibold transition-colors"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/heybeaux/engram"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold transition-colors"
          >
            <Github className="w-5 h-5" />
            Self-host now — it&apos;s free
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

// ── WHO IS THIS FOR ────────────────────────────────────────────
const useCases = [
  {
    title: "AI Coding Assistants",
    desc: "Your assistant remembers your codebase conventions, past decisions, and project context across sessions.",
  },
  {
    title: "Customer Support Agents",
    desc: "Agents recall customer history, preferences, and past issues without re-reading every ticket.",
  },
  {
    title: "Personal AI Companions",
    desc: "Your AI remembers your name, your family, your preferences — like a real relationship.",
  },
  {
    title: "Multi-Agent Systems",
    desc: "Shared memory pools let agents collaborate with full context of what other agents have learned.",
  },
];

function UseCases() {
  return (
    <Section>
      <motion.div variants={fadeUp} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Who is this <span className="text-gradient">for?</span>
        </h2>
      </motion.div>
      <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
        {useCases.map((uc) => (
          <motion.div
            key={uc.title}
            variants={fadeUp}
            className="p-6 rounded-xl border border-zinc-800/50"
          >
            <h3 className="font-semibold mb-2">{uc.title}</h3>
            <p className="text-sm text-zinc-400">{uc.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ── ECOSYSTEM ──────────────────────────────────────────────────
const ecosystem = [
  {
    icon: Brain,
    name: "Engram Core",
    desc: "Memory API with extraction, classification, scoring, and temporal reasoning",
    repo: "https://github.com/heybeaux/engram",
    color: "brand",
  },
  {
    icon: Cpu,
    name: "Engram Embed",
    desc: "Local embeddings on Metal GPU — multiple models, zero API costs",
    repo: "https://github.com/heybeaux/engram-embed",
    color: "blue",
  },
  {
    icon: Code2,
    name: "Engram Code",
    desc: "Semantic code search across your entire codebase",
    repo: "https://github.com/heybeaux/engram-code",
    color: "purple",
  },
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    desc: "Real-time monitoring, health scores, knowledge graph visualization",
    repo: "https://github.com/heybeaux/engram-dashboard",
    color: "orange",
  },
  {
    icon: Plug,
    name: "MCP Server",
    desc: "Drop-in memory for Claude Desktop, Cursor, Windsurf, and any MCP client",
    repo: "https://github.com/heybeaux/engram-mcp",
    color: "cyan",
  },
  {
    icon: Package,
    name: "TypeScript SDK",
    desc: "engram.remember() and engram.recall() — fully typed, 18 methods",
    repo: "https://github.com/heybeaux/engram-client",
    color: "pink",
  },
];

const colorMap: Record<string, string> = {
  brand: "border-brand-500/20 hover:border-brand-500/50",
  blue: "border-blue-500/20 hover:border-blue-500/50",
  purple: "border-purple-500/20 hover:border-purple-500/50",
  orange: "border-orange-500/20 hover:border-orange-500/50",
  cyan: "border-cyan-500/20 hover:border-cyan-500/50",
  pink: "border-pink-500/20 hover:border-pink-500/50",
};

const iconColorMap: Record<string, string> = {
  brand: "text-brand-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
  orange: "text-orange-400",
  cyan: "text-cyan-400",
  pink: "text-pink-400",
};

function Ecosystem() {
  return (
    <Section id="ecosystem">
      <motion.div variants={fadeUp} className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          The <span className="text-gradient">ecosystem</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Every piece is open source. Use them standalone or together.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {ecosystem.map((item) => (
          <motion.a
            key={item.name}
            variants={fadeUp}
            href={item.repo}
            target="_blank"
            className={`group p-6 rounded-xl border bg-zinc-900/50 backdrop-blur transition-all hover:bg-zinc-900 ${colorMap[item.color]}`}
          >
            <item.icon
              className={`w-8 h-8 mb-4 ${iconColorMap[item.color]}`}
            />
            <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-zinc-400">{item.desc}</p>
            <div className="mt-4 flex items-center gap-1 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
              <Github className="w-3.5 h-3.5" />
              View on GitHub
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

// ── PRICING ────────────────────────────────────────────────────
const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "Self-hosted, forever",
    cta: "Get Started",
    ctaHref: "https://github.com/heybeaux/engram",
    highlighted: true,
    features: [
      ["Memories", "1,000"],
      ["API calls/day", "100"],
      ["Agents", "1"],
      ["Dream Cycle", "❌"],
      ["Ensemble search", "1 model"],
      ["Knowledge graph", "❌"],
      ["Support", "Community"],
    ],
  },
  {
    name: "Starter",
    price: "$9",
    period: "/mo",
    desc: "For solo builders",
    cta: "Coming Soon",
    ctaHref: "#waitlist",
    highlighted: false,
    features: [
      ["Memories", "10,000"],
      ["API calls/day", "1,000"],
      ["Agents", "3"],
      ["Dream Cycle", "✅ Daily"],
      ["Ensemble search", "2 models"],
      ["Knowledge graph", "❌"],
      ["Support", "Email"],
    ],
  },
  {
    name: "Pro",
    price: "$39",
    period: "/mo",
    desc: "For growing teams",
    cta: "Coming Soon",
    ctaHref: "#waitlist",
    highlighted: false,
    features: [
      ["Memories", "100,000"],
      ["API calls/day", "10,000"],
      ["Agents", "10"],
      ["Dream Cycle", "✅ Daily"],
      ["Ensemble search", "4 models"],
      ["Knowledge graph", "✅"],
      ["Support", "Priority"],
    ],
  },
  {
    name: "Scale",
    price: "$99",
    period: "/mo",
    desc: "For production workloads",
    cta: "Coming Soon",
    ctaHref: "#waitlist",
    highlighted: false,
    features: [
      ["Memories", "1,000,000"],
      ["API calls/day", "100,000"],
      ["Agents", "Unlimited"],
      ["Dream Cycle", "✅ Hourly"],
      ["Ensemble search", "4 models"],
      ["Knowledge graph", "✅"],
      ["Support", "Dedicated"],
    ],
  },
];

function Pricing() {
  return (
    <Section id="pricing">
      <motion.div variants={fadeUp} className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Simple <span className="text-gradient">pricing</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Self-host free forever, or let us handle the infrastructure.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
      >
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={fadeUp}
            className={`relative p-6 rounded-xl border ${
              tier.highlighted
                ? "border-brand-500/50 bg-brand-500/5"
                : "border-zinc-800 bg-zinc-900/30"
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-500 text-black text-xs font-semibold">
                Available Now
              </span>
            )}
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="text-zinc-500 text-xs mb-3">{tier.desc}</p>
            <div className="mb-5">
              <span className="text-3xl font-bold">{tier.price}</span>
              {tier.period && (
                <span className="text-zinc-500 text-sm">{tier.period}</span>
              )}
            </div>
            <ul className="space-y-2 mb-6">
              {tier.features.map(([label, value]) => (
                <li key={label} className="flex justify-between text-xs">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-zinc-300 font-medium">{value}</span>
                </li>
              ))}
            </ul>
            <a
              href={tier.ctaHref}
              target={tier.name === "Free" ? "_blank" : undefined}
              className={`block text-center py-2 rounded-lg text-sm font-medium transition-colors ${
                tier.highlighted
                  ? "bg-brand-500 hover:bg-brand-600 text-black"
                  : tier.name === "Free"
                  ? "border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white"
                  : "border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white"
              }`}
            >
              {tier.cta}
            </a>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ── WAITLIST ───────────────────────────────────────────────────
function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    setStatus("loading");
    setErrorMsg("");

    try {
      // Try Supabase insert if configured
      const sb = getSupabase();
      if (sb) {
        const { error } = await sb.from("waitlist").insert({ email });
        if (error) {
          if (error.code === "23505") {
            // Unique violation — already signed up
            setStatus("success");
            form.reset();
            return;
          }
          throw error;
        }
      } else {
        // Fallback: store locally + log
        const existing = JSON.parse(localStorage.getItem("engram_waitlist") || "[]");
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem("engram_waitlist", JSON.stringify(existing));
        }
        console.log("Waitlist signup (local):", email);
      }
      setStatus("success");
      form.reset();
    } catch (err: unknown) {
      console.error("Waitlist error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <Section id="waitlist">
      <motion.div
        variants={fadeUp}
        className="max-w-xl mx-auto text-center p-12 rounded-2xl border border-zinc-800 bg-zinc-900/50"
      >
        <h2 className="text-3xl font-bold mb-4">
          Get early <span className="text-gradient">access</span>
        </h2>
        <p className="text-zinc-400 mb-8">
          Be the first to know when hosted Engram launches. No spam, just
          updates.
        </p>
        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-brand-400 py-4">
            <Check className="w-5 h-5" />
            <span className="font-medium">You&apos;re on the list! We&apos;ll be in touch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="waitlist-email" className="sr-only">Email address</label>
            <input
              id="waitlist-email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              disabled={status === "loading"}
              className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-brand-500 focus:outline-none text-white placeholder:text-zinc-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-black font-semibold transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-3">{errorMsg}</p>
        )}
      </motion.div>
    </Section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────
const repos = [
  { name: "Core API", href: "https://github.com/heybeaux/engram" },
  { name: "MCP Server", href: "https://github.com/heybeaux/engram-mcp" },
  { name: "Dashboard", href: "https://github.com/heybeaux/engram-dashboard" },
  { name: "Embeddings", href: "https://github.com/heybeaux/engram-embed" },
  { name: "Code Search", href: "https://github.com/heybeaux/engram-code" },
  { name: "SDK", href: "https://github.com/heybeaux/engram-client" },
];

function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="text-lg font-semibold mb-1">
            ◎ <span className="text-gradient">Open Engram</span>
          </div>
          <p className="text-sm text-zinc-500">
            Your memories. Your control. Any model. Apache 2.0.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-500">
          {repos.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              className="hover:text-white transition-colors py-1"
            >
              {r.name}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/heybeaux/engram"
          target="_blank"
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}

// ── PAGE ───────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <MidCta />
      <UseCases />
      <Ecosystem />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
