// src/lib/useProposals.tsx
"use client";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function useProposalsForCurrentBusiness() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) { setProposals([]); setLoading(false); return; }

    const businessId = `biz_${user.uid}`;
    const q = query(collection(db, "proposals"), where("businessId", "==", businessId));

    const unsub = onSnapshot(q, (snap) => {
      setLoading(false);
      setProposals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.error("useProposalsForCurrentBusiness error", err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { proposals, loading };
}
