// src/app/(auth)/sign-up/SignUpClient.tsx
"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/**
 * Client component for the sign-up form. Keeps all client-only hooks here.
 * Put any event handlers, useSearchParams, useEffect using window, etc. here.
 */

export default function SignUpClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const invitedCode = searchParams.get("invite") ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // TODO: call your firebase signup wrapper here
      // await authSignUp({ email, password, invitedCode });

      // For now simulate
      await new Promise((r) => setTimeout(r, 600));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create an account</h2>
      {invitedCode && (
        <p className="mb-4 text-sm text-muted-foreground">
          You were invited — code: <strong>{invitedCode}</strong>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border p-2"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}
