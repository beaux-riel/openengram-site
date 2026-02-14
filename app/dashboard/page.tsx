"use client";

import { useEffect, useState } from "react";
import { getAccount, createCheckout } from "./lib/api";
import { Zap, Database, Activity } from "lucide-react";

const PLANS: Record<string, string> = { free: "FREE", starter: "STARTER", pro: "PRO", scale: "SCALE" };
const PLAN_COLORS: Record<string, string> = {
  free: "bg-gray-600", starter: "bg-blue-600", pro: "bg-accent", scale: "bg-purple-600",
};

function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted">{label}</span>
        <span className="text-foreground">{value.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [account, setAccount] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    getAccount().then(setAccount).catch(() => {});
  }, []);

  if (!account) return null;

  const plan = (account.plan as string) || "free";
  const usage = (account.usage as Record<string, number>) || {};
  const limits = (account.limits as Record<string, number>) || {};
  const apiKey = (account.api_key as string) || "eng_xxxxxxxxxxxxxxxx";

  const handleUpgrade = async (p: string) => {
    try {
      const { url } = await createCheckout(p);
      if (url) window.location.href = url;
    } catch {}
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className={`px-2 py-0.5 text-xs font-bold rounded ${PLAN_COLORS[plan] || "bg-gray-600"} text-white`}>
          {PLANS[plan] || plan.toUpperCase()}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-surface rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-3 text-muted"><Database size={16} /> Memories</div>
          <ProgressBar value={usage.memories || 0} max={limits.memories || 1000} label="Stored" />
        </div>
        <div className="bg-surface rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-3 text-muted"><Activity size={16} /> API Calls Today</div>
          <ProgressBar value={usage.api_calls_today || 0} max={limits.api_calls_daily || 100} label="Used" />
        </div>
      </div>

      {plan === "free" && (
        <button
          onClick={() => handleUpgrade("starter")}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Zap size={16} /> Upgrade Plan
        </button>
      )}

      <div className="bg-surface rounded-xl p-5 border border-white/10">
        <h2 className="text-sm font-semibold mb-3 text-muted">Quick Start</h2>
        <pre className="text-sm text-green-400 bg-black/40 rounded-lg p-4 overflow-x-auto font-mono">
{`curl -X POST https://api.openengram.ai/v1/memories \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"content": "User prefers dark mode"}'`}
        </pre>
      </div>
    </div>
  );
}
