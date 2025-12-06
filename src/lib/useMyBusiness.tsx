// src/lib/useMyBusiness.tsx
"use client";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function useMyBusiness() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setBusiness(null);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "businesses"), where("ownerUid", "==", user.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      setLoading(false);
      if (snapshot.empty) {
        setBusiness(null);
        return;
      }
      const docData = snapshot.docs[0];
      setBusiness({ id: docData.id, ...docData.data() });
    }, (err) => {
      console.error("useMyBusiness listener error:", err);
      setError(String(err));
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { business, loading, error };
}
