
'use client';

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, DocumentData, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@/firebase/auth/use-user";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export interface LoanProduct extends DocumentData {
    id: string;
    title: string;
    description: string;
    interestRate: string;
    status: string;
}

export default function useLoanProducts() {
  const { user } = useUser();
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
        collection(db, "loanProducts"), 
        where("bankerUid", "==", user.uid),
        orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setLoanProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoanProduct)));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching loan products: ", error);
      if (error.code === 'permission-denied') {
          const permissionError = new FirestorePermissionError({
            path: `loanProducts`,
            operation: 'list',
          });
          errorEmitter.emit('permission-error', permissionError);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  return { loanProducts, loading };
}

    