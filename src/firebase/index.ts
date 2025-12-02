
'use client';

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDm56wYLNpDFPzBXJ3ITpLdOsJFhPu5gWc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-3648319522-8b6d6.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-3648319522-8b6d6",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-3648319522-8b6d6.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "113522247316",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:113522247316:web:a962f87b3d2c1a005a9681"
};


// Initialize Firebase
// This function checks if an app is already initialized to prevent errors during hot-reloading.
function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
} {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  return { firebaseApp: app, auth, firestore, storage };
}

const { firebaseApp, auth, firestore, storage } = initializeFirebase();

export { firebaseApp as app, auth, firestore as db, storage };

// Barrel exports for other firebase utilities
export { FirebaseProvider } from '@/firebase/provider';
export { FirebaseClientProvider } from '@/firebase/client-provider';
export { useUser } from '@/firebase/auth/use-user';
export {
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from '@/firebase/provider';
