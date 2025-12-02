'use client';

import { FirebaseProvider, type FirebaseProviderProps } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const { firebaseApp } = initializeFirebase();
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const props: FirebaseProviderProps = {
    firebaseApp,
    auth,
    firestore,
  };
  return <FirebaseProvider {...props}>{children}</FirebaseProvider>;
}
