'use client';

import {
  collection,
  addDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {
  FirestorePermissionError,
  type SecurityRuleContext,
} from '@/firebase/errors';

export type CreateProposalPayload = {
  title: string;
  description: string;
};

export function createProposal(
  db: Firestore,
  businessId: string,
  payload: CreateProposalPayload
) {
  if (!businessId) {
    throw new Error('Business ID is required to create a proposal.');
  }

  const proposalsCol = collection(db, 'proposals');

  const newProposalData = {
    businessId: businessId,
    title: payload.title,
    description: payload.description,
    status: 'Draft',
    createdAt: serverTimestamp(),
  };

  addDoc(proposalsCol, newProposalData).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: proposalsCol.path,
      operation: 'create',
      requestResourceData: newProposalData,
    } satisfies SecurityRuleContext);
    errorEmitter.emit('permission-error', permissionError);
  });
}
