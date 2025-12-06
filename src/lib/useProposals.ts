"use client";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, DocumentData } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export interface Proposal extends DocumentData {
    id: string;
    title: string;
    description: string;
    status: string;
}

export default function useProposalsForCurrentBusiness() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) { setLoading(false); return; }

    const businessId = `biz_${user.uid}`;
    const q = query(collection(db, "proposals"), where("businessId", "==", businessId));

    const unsub = onSnapshot(q, (snap) => {
      setLoading(false);
      setProposals(snap.docs.map(d => ({ id: d.id, ...d.data() } as Proposal)));
    });

    return () => unsub();
  }, []);

  return { proposals, loading };
}
