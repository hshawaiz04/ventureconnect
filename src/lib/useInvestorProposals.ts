'use client';

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@/firebase/auth/use-user";

export interface InvestorProposal extends DocumentData {
    id: string;
    title: string;
    thesis: string;
    status: string;
}

export default function useInvestorProposals() {
  const { user } = useUser();
  const [proposals, setProposals] = useState<InvestorProposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "investorProposals"), where("investorUid", "==", user.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      setProposals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InvestorProposal)));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching investor proposals: ", error);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  return { proposals, loading };
}
