// src/lib/useSaved.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "@/firebase";

export default function useSaved() {
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const loadSavedItems = useCallback(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { 
      setSaved([]); 
      setLoading(false); 
      return () => {}; // Return an empty unsubscribe function
    }
    
    setLoading(true);
    const q = query(collection(db, `saved/${uid}/bookmarks`), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, snap => {
      setSaved(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, err => {
      console.error(err);
      setLoading(false);
    });
    return unsub;
  }, []);


  useEffect(() => {
    const unsubscribe = loadSavedItems();
    return () => unsubscribe();
  }, [loadSavedItems]);

  return { saved, loading, refresh: loadSavedItems };
}
