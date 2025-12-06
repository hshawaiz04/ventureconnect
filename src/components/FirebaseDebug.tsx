// src/components/FirebaseDebug.tsx
"use client";

import React, { useEffect, useState } from "react";
// at top of src/components/FirebaseDebug.tsx
import app, { auth } from "../lib/firebase";


export default function FirebaseDebug() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    try {
      const envApi = (process as any).env?.NEXT_PUBLIC_FIREBASE_API_KEY ?? "env-missing";
      const envAuthDomain = (process as any).env?.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "env-missing";

      setInfo({
        appName: app?.name ?? "no-app",
        authCurrentUser: !!auth.currentUser,
        envApi,
        envAuthDomain,
      });

      console.log("[FirebaseDebug] app:", app);
      console.log("[FirebaseDebug] auth:", auth);
    } catch (err) {
      console.error("[FirebaseDebug] error", err);
      setInfo({ error: String(err) });
    }
  }, []);

  if (!info) return <div>Checking Firebase config...</div>;

  return (
    <div style={{ padding: 12, background: "#0b0b0b", color: "#fff", fontFamily: "monospace" }}>
      <div><strong>Initialized App Name:</strong> {String(info.appName)}</div>
      <div><strong>Auth currentUser present:</strong> {String(info.authCurrentUser)}</div>
      <div><strong>Env NEXT_PUBLIC_FIREBASE_API_KEY:</strong> {String(info.envApi)}</div>
      <div><strong>Env NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:</strong> {String(info.envAuthDomain)}</div>
      {info.error && <div style={{ color: "salmon" }}>Error: {info.error}</div>}
    </div>
  );
}
