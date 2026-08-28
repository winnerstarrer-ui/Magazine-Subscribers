// Firebase initialization.
// All values come from environment variables so real keys never live in
// source control. Copy .env.example to .env for local dev, and add the
// same keys as Environment Variables in your Vercel project settings.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
enableIndexedDbPersistence(db)
  .then(() => console.log('🔥 Offline cache enabled! Refreshes are now free.'))
  .catch((err) => console.log('⚠️ Persistence error (ignore if multiple tabs open):', err));

export default app
