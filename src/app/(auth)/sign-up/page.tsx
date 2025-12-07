// src/app/(auth)/sign-up/page.tsx
import React, { Suspense } from "react";
import SignUpClient from "@/components/auth/SignUpClient";

export const metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <main className="container mx-auto p-8">
      <Suspense fallback={<div>Loading…</div>}>
        <SignUpClient />
      </Suspense>
    </main>
  );
}
