// src/lib/useDeals.tsx
"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function useDeals(filters: { industries?: string[], minRaise?: number, maxRaise?: number } = {}) {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const snaps = await getDocs(collection(db, "businesses"));
      let docs = snaps.docs.map(d => ({ id: d.id, ...d.data() }));
      if (filters.industries?.length) docs = docs.filter(d => filters.industries.includes(d.industry));
      if (filters.minRaise) docs = docs.filter(d => (d.targetRaise ?? 0) >= filters.minRaise);
      if (filters.maxRaise) docs = docs.filter(d => (d.targetRaise ?? 0) <= filters.maxRaise);
      setDeals(docs);
      setLoading(false);
    }
    load();
  }, [JSON.stringify(filters)]);

  return { deals, loading };
}
