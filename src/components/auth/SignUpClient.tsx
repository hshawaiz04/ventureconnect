// src/components/auth/SignUpClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SignUpClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams?.get("role") ?? "";
  const invite = searchParams?.get("invite") ?? "";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prefillEmail = searchParams?.get("email");
    if (prefillEmail) setEmail(prefillEmail);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // <-- TODO: replace with your Firebase sign-up logic
      // await signUpWithEmailAndPassword(email, ...)

      // on success:
      router.push("/dashboard");
    } catch (err) {
      console.error("signup error", err);
      // show user-friendly UI error here
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create account {role ? `— ${role}` : ""}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-input"
            placeholder="you@example.com"
          />
        </label>

        <div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating…" : "Create account"}
          </button>
        </div>

        {invite && <p className="text-sm text-muted-foreground">Invite code: {invite}</p>}
      </form>
    </div>
  );
}
