// src/lib/savedApi.ts
'use-client';

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
  
  try {
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Unsave the opportunity
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(doc(bookmarksCollection, docToDelete.id));
      return { action: 'unsaved', id: docToDelete.id };
    } else {
      // Save the new opportunity
      const bookmarkData = {
        type: 'business',
        refId: businessId,
        createdAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(bookmarksCollection, bookmarkData);
      return { action: 'saved', id: docRef.id };
    }

  } catch (e: any) {
     if (e.code === 'permission-denied') {
        // Here we can determine if the operation was a create or delete
        // For simplicity, let's assume 'create' for now as that's the most likely
        // initial failure point.
        const permissionError = new FirestorePermissionError({
          path: `saved/${user.uid}/bookmarks`,
          operation: 'write', // Use a general 'write' or get more specific
          requestResourceData: {
            type: 'business',
            refId: businessId,
          },
        });
        errorEmitter.emit('permission-error', permissionError);
      } else {
        console.error("Failed to save/unsave opportunity:", e);
        throw e; // re-throw other errors
      }
      // Return an error state for the UI to handle
      return { action: 'error', error: e };
  }
}

export async function isOpportunitySaved(businessId: string): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;

  const bookmarksCollection = collection(db, `saved/${user.uid}/bookmarks`);
  const q = query(bookmarksCollection, where("refId", "==", businessId));
  
  try {
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (e: any) {
     if (e.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: `saved/${user.uid}/bookmarks`,
          operation: 'list'
        });
        errorEmitter.emit('permission-error', permissionError);
     }
     // For read operations, it's often fine to just return the "empty" state
     return false;
  }
}
