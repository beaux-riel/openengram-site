"use client";

import { useEffect, useState } from "react";
import { getApiKeys, regenerateApiKey } from "../lib/api";
import { Copy, RefreshCw, Check, Eye, EyeOff } from "lucide-react";

interface ApiKey {
  id: string;
  key: string;
  created_at: string;
  last_used?: string;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState("");
  const [confirming, setConfirming] = useState(false);

  const load = () => getApiKeys().then((d) => setKeys(d.keys || d || [])).catch(() => {});

  useEffect(() => { load(); }, []);

  const mask = (k: string) => k.slice(0, 8) + "•".repeat(Math.max(0, k.length - 12)) + k.slice(-4);

  const copy = (k: string) => {
    navigator.clipboard.writeText(k);
    setCopied(k);
    setTimeout(() => setCopied(""), 2000);
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const regen = async () => {
    if (!confirming) { setConfirming(true); return; }
    setConfirming(false);
    await regenerateApiKey();
    load();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">API Keys</h1>
        <button
          onClick={regen}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            confirming ? "bg-red-600 hover:bg-red-700 text-white" : "bg-accent hover:bg-accent-hover text-black"
          }`}
        >
          <RefreshCw size={14} /> {confirming ? "Confirm Regenerate?" : "Regenerate Key"}
        </button>
      </div>

      <div className="space-y-3">
        {keys.map((k) => (
          <div key={k.id} className="bg-surface rounded-xl p-4 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <code className="text-sm font-mono text-foreground">
                {revealed.has(k.id) ? k.key : mask(k.key)}
              </code>
              {k.created_at && (
                <p className="text-xs text-muted mt-1">Created {new Date(k.created_at).toLocaleDateString()}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleReveal(k.id)} className="p-1.5 rounded hover:bg-white/10 text-muted hover:text-foreground transition-colors">
                {revealed.has(k.id) ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button onClick={() => copy(k.key)} className="p-1.5 rounded hover:bg-white/10 text-muted hover:text-foreground transition-colors">
                {copied === k.key ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        ))}
        {keys.length === 0 && <p className="text-muted text-sm">No API keys found.</p>}
      </div>
    </div>
  );
}
