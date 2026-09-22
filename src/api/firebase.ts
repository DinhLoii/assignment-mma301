/**
 * Firebase App & Firestore Initialization
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from '@/config/env';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  if (isFirebaseConfigured()) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('[Firebase] Connected to Cloud Firestore:', firebaseConfig.projectId);
  } else {
    console.warn(
      '[Firebase] Configuration missing or incomplete in .env. App will run in Offline/Demo mode until credentials are set.',
    );
  }
} catch (error) {
  console.error('[Firebase] Initialization error:', error);
}

export { app, db, isFirebaseConfigured };
