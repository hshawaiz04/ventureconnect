
'use client';

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export type CreateLoanProductPayload = {
  title: string;
  description: string;
  minAmount?: number;
  maxAmount?: number;
  interestRate: string;
};

export async function createLoanProduct(payload: CreateLoanProductPayload) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not authenticated");
  }

  const loanProductData = {
    bankerUid: user.uid,
    title: payload.title,
    description: payload.description,
    minAmount: payload.minAmount ?? 0,
    maxAmount: payload.maxAmount ?? 0,
    interestRate: payload.interestRate,
    status: "Active",
    createdAt: serverTimestamp(),
  };

  const loanProductsCollection = collection(db, "loanProducts");

  addDoc(loanProductsCollection, loanProductData)
    .catch(async (e: any) => {
        if (e.code === 'permission-denied') {
          const permissionError = new FirestorePermissionError({
            path: `loanProducts`,
            operation: 'create',
            requestResourceData: loanProductData,
          });
          errorEmitter.emit('permission-error', permissionError);
        } else {
            console.error("Error creating loan product: ", e);
        }
        // Re-throw to allow the UI to handle it
        throw e;
    });
}
