"use client";

import { useEffect, useState } from "react";
import { getAccount, createCheckout, getBillingPortal } from "../lib/api";
import { Check } from "lucide-react";

const tiers = [
  { id: "free", name: "Free", price: "$0/mo", features: ["1,000 memories", "100 API calls/day", "Community support"] },
  { id: "starter", name: "Starter", price: "$29/mo", features: ["10,000 memories", "1,000 API calls/day", "Email support"] },
  { id: "pro", name: "Pro", price: "$99/mo", features: ["100,000 memories", "10,000 API calls/day", "Priority support"] },
  { id: "scale", name: "Scale", price: "$499/mo", features: ["Unlimited memories", "Unlimited API calls", "Dedicated support"] },
];

const tierOrder = ["free", "starter", "pro", "scale"];

export default function BillingPage() {
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    getAccount().then((a) => setPlan(a.plan || "free")).catch(() => {});
  }, []);

  const handleUpgrade = async (p: string) => {
    try {
      const { url } = await createCheckout(p);
      if (url) window.location.href = url;
    } catch {}
  };

  const handleManage = async () => {
    try {
      const { url } = await getBillingPortal();
      if (url) window.location.href = url;
    } catch {}
  };

  const currentIdx = tierOrder.indexOf(plan);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Billing</h1>
        {plan !== "free" && (
          <button onClick={handleManage} className="px-4 py-2 rounded-lg text-sm font-semibold border border-white/20 text-foreground hover:bg-white/5 transition-colors">
            Manage Subscription
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t, i) => {
          const isCurrent = t.id === plan;
          const isLower = i <= currentIdx;
          return (
            <div key={t.id} className={`bg-surface rounded-xl p-5 border ${isCurrent ? "border-accent" : "border-white/10"} flex flex-col`}>
              <h3 className="font-bold text-lg">{t.name}</h3>
              <p className="text-2xl font-bold mt-1 mb-4">{t.price}</p>
              <ul className="space-y-2 flex-1 mb-4">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={14} className="text-accent mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <span className="text-center text-sm font-semibold text-accent py-2">Current Plan</span>
              ) : isLower ? null : (
                <button
                  onClick={() => handleUpgrade(t.id)}
                  className="w-full bg-accent hover:bg-accent-hover text-black font-semibold py-2 rounded-lg text-sm transition-colors"
                >
                  Upgrade
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
