// config/firebase.ts
import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;

// Client-side initialization (only if in browser and no app exists)
if (typeof window !== 'undefined' && !getApps().length && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log("Firebase Client-Side initialized successfully!");
}

// API route initialization (always initialize, separate instance)
export function initializeFirebaseForApi(): { db: Firestore; storage: FirebaseStorage } | { db: undefined; storage: undefined } {
  const API_APP_NAME = "apiApp";

  const existingApp = getApps().find(app => app.name === API_APP_NAME);

  if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    if (!existingApp) {
      const apiApp = initializeApp(firebaseConfig, API_APP_NAME);
      console.log("Firebase API-Side initialized successfully!");
      return {
        db: getFirestore(apiApp),
        storage: getStorage(apiApp),
      };
    } else {
      return {
        db: getFirestore(existingApp),
        storage: getStorage(existingApp),
      };
    }
} else {
    console.warn("Firebase API-Side NOT initialized. NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set.");
    return { db: undefined, storage: undefined }; // Return undefined
  }
}

// Server-side Component initialization
export function initializeFirebaseForServerComponent() {
    const SERVER_APP_NAME = "serverApp"; // Use a different name

    const existingApp = getApps().find(app => app.name === SERVER_APP_NAME);

    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      if (!existingApp) {
        // For server components, initialize a *separate* app instance.
        const serverApp = initializeApp(firebaseConfig, SERVER_APP_NAME); // Different name
        console.log("Firebase Server-Component initialized successfully!");
        return {
            db: getFirestore(serverApp),
            storage: getStorage(serverApp)
        }
      } else {
          return {
            db: getFirestore(existingApp),
            storage: getStorage(existingApp),
          };
      }
    }
    else {
        console.warn("Firebase Server-Component NOT initialized. NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set.");
        return { db: undefined, storage: undefined };
  }
}

export { db, storage }; // Client-side instances (might be undefined on server)