// src/lib/investorProposalApi.ts
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export type CreateInvestorProposalPayload = {
  title: string;
  thesis: string;
  industries: string[];
  minCheckSize?: number;
  maxCheckSize?: number;
};

export async function createInvestorProposal(payload: CreateInvestorProposalPayload) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not authenticated");
  }

  const proposalData = {
    investorUid: user.uid,
    title: payload.title,
    thesis: payload.thesis,
    industries: payload.industries,
    minCheckSize: payload.minCheckSize ?? 0,
    maxCheckSize: payload.maxCheckSize ?? 0,
    status: "Active",
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, "investorProposals"), proposalData);
    return { id: docRef.id };
  } catch (e: any) {
    if (e.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: `investorProposals`,
        operation: 'create',
        requestResourceData: proposalData,
      });
      errorEmitter.emit('permission-error', permissionError);
    }
    // Re-throw the error to be caught by the calling component
    throw e;
  }
}
