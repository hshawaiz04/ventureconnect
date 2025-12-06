import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export async function debugCreateProposal(payload: {
  title: string;
  description: string;
  amountRequested?: number;
}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const businessId = `biz_${user.uid}`;

  const proposal = {
    ownerUid: user.uid,
    businessId,
    title: payload.title,
    description: payload.description,
    amountRequested: payload.amountRequested ?? 0,
    status: "Draft",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  console.log("[debugCreateProposal] uid=", user.uid);
  console.log("[debugCreateProposal] proposal=", proposal);

  try {
    const ref = await addDoc(collection(db, "proposals"), proposal);
    console.log("[debugCreateProposal] SUCCESS id=", ref.id);
    return { ok: true, id: ref.id };
  } catch (err) {
    console.error("[debugCreateProposal] FAILED", err);
    return { ok: false, err };
  }
}
