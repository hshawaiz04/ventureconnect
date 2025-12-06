// src/lib/businessApi.ts
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

/**
 * Payload type for creating a business profile
 */
export type CreateBusinessPayload = {
  name: string;
  industry: string;
  stage: string;
  pitch: string;
  targetRaise?: number;
};

/**
 * Create or overwrite the business doc at businesses/biz_<uid>
 * Returns the created docId
 */
export async function createBusinessProfile(payload: CreateBusinessPayload): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const businessId = `biz_${user.uid}`; // deterministic id
  const data = {
    ownerUid: user.uid,
    name: payload.name,
    industry: payload.industry,
    stage: payload.stage,
    pitch: payload.pitch,
    targetRaise: payload.targetRaise ?? 0,
    raisedAmount: 0,
    profileComplete: 10,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await setDoc(doc(db, "businesses", businessId), data);
  return businessId;
}

/**
 * Update the existing business doc for the current user (deterministic id)
 * Pass only the fields you want to update.
 */
export async function updateBusinessProfile(updates: Partial<CreateBusinessPayload>) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const businessId = `biz_${user.uid}`;
  const ref = doc(db, "businesses", businessId);

  await updateDoc(ref, {
    ...updates,
    updatedAt: Date.now(),
  });
}
