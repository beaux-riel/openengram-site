const API = process.env.NEXT_PUBLIC_API_URL || "https://api.openengram.ai";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("engram_token");
}

async function authFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(opts.headers as Record<string, string>),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("engram_token");
    window.location.href = "/";
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function getAccount() {
  return authFetch("/v1/account");
}

export async function getApiKeys() {
  return authFetch("/v1/account/api-keys");
}

export async function regenerateApiKey() {
  return authFetch("/v1/account/api-keys", { method: "POST" });
}

export async function createCheckout(plan: string) {
  return authFetch("/v1/billing/checkout", {
    method: "POST",
    body: JSON.stringify({ plan }),
  });
}

export async function getBillingPortal() {
  return authFetch("/v1/billing/portal");
}

export { getToken };
