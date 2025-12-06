// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const fallbackConfig = {
  apiKey: "AIzaSyDm56wYLNpDFPzBXJ3ITpLdOsJFhPu5gWc",
  authDomain: "studio-3648319522-8b6d6.firebaseapp.com",
  projectId: "studio-3648319522-8b6d6",
  storageBucket: "studio-3648319522-8b6d6.appspot.com",
  messagingSenderId: "113522247316",
  appId: "1:113522247316:web:a962f87b3d2c1a005a9681",
  measurementId: typeof process !== "undefined" ? process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID : undefined,
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || fallbackConfig.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || fallbackConfig.measurementId,
};

function validateConfig(cfg: Record<string, any>) {
  if (!cfg.apiKey || !cfg.authDomain || !cfg.projectId || !cfg.appId) {
    console.warn("[firebase] Config missing required fields:", {
      apiKey: !!cfg.apiKey,
      authDomain: !!cfg.authDomain,
      projectId: !!cfg.projectId,
      appId: !!cfg.appId,
    });
  }
}

function initFirebaseApp() {
  validateConfig(firebaseConfig);
  try {
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig);
      // attach for debug
      if (typeof window !== "undefined") (window as any).__FB_APP__ = app;
      console.info("[firebase] App initialized", {
        apiKeyPresent: !!firebaseConfig.apiKey,
        authDomain: firebaseConfig.authDomain,
        projectId: firebaseConfig.projectId,
      });
      return app;
    } else {
      const app = getApp();
      if (typeof window !== "undefined") (window as any).__FB_APP__ = app;
      console.info("[firebase] Using existing initialized app", {
        authDomain: firebaseConfig.authDomain,
        projectId: firebaseConfig.projectId,
      });
      return app;
    }
  } catch (err) {
    console.error("[firebase] initialization error:", err);
    throw err;
  }
}

const app = initFirebaseApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
