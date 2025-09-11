// src/auth/firebaseAuth.ts
import { firebaseConfig } from '../config/firebaseConfig';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, Auth } from 'firebase/auth';

let _app: ReturnType<typeof initializeApp> | null = null;
let _auth: Auth | null = null;

export function ensureApp() {
  if (!_app) {
    _app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig as any);
    _auth = getAuth(_app); // ✅ create Auth instance once
  }
  return _app;
}

// Export a SINGLE auth instance, not a function
export const auth: Auth = getAuth(ensureApp());

export async function signInEmailPassword(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAll() {
  return await signOut(auth);
}
