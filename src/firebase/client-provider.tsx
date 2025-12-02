'use client';

import { FirebaseProvider, type FirebaseProviderProps } from '@/firebase/provider';
import { app, auth, db } from '@/firebase';
import { ReactNode } from 'react';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const props: FirebaseProviderProps = {
    firebaseApp: app,
    auth: auth,
    firestore: db,
  };
  return <FirebaseProvider {...props}>{children}</FirebaseProvider>;
}
