// src/app/(auth)/sign-up/page.tsx
import React, { Suspense } from "react";
import SignUpClient from "./SignUpClient"; // relative path to the client component

export const metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <main className="container mx-auto p-6">
      {/* Suspense is required so Next can SSR the page while client component hydrates */}
      <Suspense fallback={<div>Loading sign-up…</div>}>
        <SignUpClient />
      </Suspense>
    </main>
  );
}
