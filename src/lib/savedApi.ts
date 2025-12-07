// src/lib/savedApi.ts
'use client';

import { collection, addDoc, serverTimestamp, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export async function saveOpportunity(businessId: string) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const bookmarksCollection = collection(db, `saved/${user.uid}/bookmarks`);

  // Check if already saved
  const q = query(bookmarksCollection, where("refId", "==", businessId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    console.log("This opportunity is already saved.");
    // Optionally, you could unsave it here or just return
    // For now, let's just return to prevent duplicates.
    // Or let's unsave it.
    const docToDelete = querySnapshot.docs[0];
    await deleteDoc(doc(bookmarksCollection, docToDelete.id));
    return { action: 'unsaved', id: docToDelete.id };
  }

  const bookmarkData = {
    type: 'business',
    refId: businessId,
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(bookmarksCollection, bookmarkData);
    return { action: 'saved', id: docRef.id };
  } catch (e: any) {
     if (e.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: `saved/${user.uid}/bookmarks`,
          operation: 'create',
          requestResourceData: bookmarkData,
        });
        errorEmitter.emit('permission-error', permissionError);
      } else {
        console.error("Failed to save opportunity:", e);
        throw e;
      }
      return { action: 'error', error: e };
  }
}

export async function isOpportunitySaved(businessId: string): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;

  const bookmarksCollection = collection(db, `saved/${user.uid}/bookmarks`);
  const q = query(bookmarksCollection, where("refId", "==", businessId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
