// src/lib/useInvestor.tsx
"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function useInvestorProfile(uid?: string) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const id = uid ?? auth.currentUser?.uid;
      if (!id) { setLoading(false); return; }
      const snap = await getDoc(doc(db, "users", id));
      setProfile(snap.exists() ? snap.data() : null);
      setLoading(false);
    }
    load();
  }, [uid]);

  return { profile, loading };
}
