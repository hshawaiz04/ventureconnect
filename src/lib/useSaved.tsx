// src/lib/useSaved.tsx
"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function useSaved() {
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { setSaved([]); setLoading(false); return; }
    const unsub = onSnapshot(collection(db, `saved/${uid}/bookmarks`), snap => {
      setSaved(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, err => {
      console.error(err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { saved, loading };
}
