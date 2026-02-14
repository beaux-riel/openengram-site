"use client";

import { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";

const API = "https://api.openengram.ai";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuth: () => void;
  /** If set, auto-trigger checkout after auth */
  pendingPlan?: string | null;
}

export default function AuthModal({ open, onClose, onAuth, pendingPlan }: AuthModalProps) {
  const [tab, setTab] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setError("");
      setApiKey(null);
      setCopied(false);
    }
  }, [open]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = tab === "register" ? "/v1/auth/register" : "/v1/auth/login";
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Request failed");

      // Store credentials
      if (data.token) localStorage.setItem("engram_jwt", data.token);
      if (data.apiKey) localStorage.setItem("engram_api_key", data.apiKey);

      if (tab === "register" && data.apiKey) {
        setApiKey(data.apiKey);
        setToast("Account created!");
      } else {
        setToast("Logged in!");
        onAuth();
        onClose();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleApiKeyDone() {
    onAuth();
    onClose();
  }

  function copyKey() {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-2 rounded-lg bg-brand-500 text-black text-sm font-medium animate-fade-in">
          {toast}
        </div>
      )}

      {/* Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="relative w-full max-w-md mx-4 p-6 rounded-2xl border border-zinc-800 bg-[#0a0a0f]" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>

          {apiKey ? (
            /* API Key display after registration */
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Your API Key</h2>
              <p className="text-zinc-400 text-sm mb-4">
                Save this now — you won&apos;t see it again!
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-700 mb-6">
                <code className="flex-1 text-sm text-brand-400 break-all">{apiKey}</code>
                <button onClick={copyKey} className="shrink-0 p-1.5 rounded hover:bg-zinc-800">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                </button>
              </div>
              <button
                onClick={handleApiKeyDone}
                className="w-full py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-black font-semibold transition-colors"
              >
                I&apos;ve saved it — continue
              </button>
            </div>
          ) : (
            /* Auth form */
            <>
              <div className="flex gap-1 mb-6 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
                {(["register", "login"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setError(""); }}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      tab === t ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {t === "register" ? "Register" : "Login"}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="auth-email" className="block text-sm text-zinc-400 mb-1">Email</label>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 focus:border-brand-500 focus:outline-none text-white placeholder:text-zinc-600"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="auth-password" className="block text-sm text-zinc-400 mb-1">Password</label>
                  <input
                    id="auth-password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 focus:border-brand-500 focus:outline-none text-white placeholder:text-zinc-600"
                    placeholder="••••••••"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-black font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? "Please wait..." : tab === "register" ? "Create Account" : "Sign In"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export async function handleCheckout(plan: string): Promise<void> {
  const jwt = localStorage.getItem("engram_jwt");
  if (!jwt) return;

  const res = await fetch(`${API}/v1/billing/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ plan }),
  });

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  }
}
