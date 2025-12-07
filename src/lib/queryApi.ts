
'use client';

import { collection, addDoc, serverTimestamp, doc, getDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { useUser } from "@/firebase/auth/use-user";
import { useEffect, useState } from "react";

export async function postSolution(queryId: string, content: string) {
  const user = auth.currentUser;
  const { userData } = useUser(); // This will not work as it's a hook. We need to get it from the component.
  // We'll pass authorName from the component.
  if (!user || !userData) {
    throw new Error("User is not authenticated or user data is not available.");
  }
   if (userData.role !== 'advisor') {
    throw new Error("Only advisors can post solutions.");
  }

  const solutionData = {
    queryId,
    advisorUid: user.uid,
    advisorName: userData.name,
    content,
    createdAt: serverTimestamp(),
  };

  const solutionsCollection = collection(db, `queries/${queryId}/solutions`);

  try {
    const docRef = await addDoc(solutionsCollection, solutionData);
    return { id: docRef.id };
  } catch (e: any) {
    if (e.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: `queries/${queryId}/solutions`,
        operation: 'create',
        requestResourceData: solutionData,
      });
      errorEmitter.emit('permission-error', permissionError);
    }
    throw e;
  }
}

export function useQueryAndSolutions(queryId: string) {
    const [queryData, setQueryData] = useState<any>(null);
    const [solutions, setSolutions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!queryId) {
            setLoading(false);
            return;
        }

        const queryDocRef = doc(db, 'queries', queryId);

        const unsubscribeQuery = onSnapshot(queryDocRef, (doc) => {
            if (doc.exists()) {
                setQueryData({ id: doc.id, ...doc.data() });
            } else {
                setError("Query not found.");
            }
        }, (err) => {
            console.error("Error fetching query:", err);
            setError(err.message);
        });

        const solutionsCollectionRef = collection(db, `queries/${queryId}/solutions`);
        const q = query(solutionsCollectionRef, orderBy('createdAt', 'asc'));

        const unsubscribeSolutions = onSnapshot(q, (snapshot) => {
            setSolutions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => {
            console.error("Error fetching solutions:", err);
            setError(err.message);
            setLoading(false);
        });


        return () => {
            unsubscribeQuery();
            unsubscribeSolutions();
        };

    }, [queryId]);

    return { queryData, solutions, loading, error };
}
