// config/firebaseAdmin.ts
import { initializeApp, App, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';
import { credential } from 'firebase-admin';

let adminApp: App;
let adminDb: Firestore;
let adminStorage: Storage;

if (!getApps().length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64) {
    // Decode the Base64 string
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString('utf-8')
    );

    adminApp = initializeApp({
      credential: credential.cert(serviceAccount),
    });
  } else {
    console.error("FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set!");
    // You might want to throw an error here to prevent the app from starting
    throw new Error("Firebase service account key not found.");
  }

  adminDb = getFirestore(adminApp);
  adminStorage = getStorage(adminApp);
  console.log("Firebase Admin initialized successfully!");
} else {
  adminApp = getApps()[0];
  adminDb = getFirestore(adminApp);
  adminStorage = getStorage(adminApp);
  console.log("Firebase Admin already initialized.");
}

export { adminDb, adminStorage };