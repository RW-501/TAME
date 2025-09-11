// src/auth/useAuth.ts
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { auth } from './firebaseAuth'; // your firebaseAuth file

export type AuthState = {
  user: User | null;
  role: string | null;
  mfaEnabled: boolean;
  loading: boolean;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    role: null,
    mfaEnabled: false,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState({ user: null, role: null, mfaEnabled: false, loading: false });
        return;
      }

      try {
        const tokenResult = await getIdTokenResult(user, true); // force refresh to get latest claims
        const role = tokenResult.claims.role as string | undefined;
        const mfaEnabled = user.multiFactor.enrolledFactors.length > 0;

        setAuthState({
          user,
          role: role || null,
          mfaEnabled,
          loading: false,
        });
      } catch (err) {
        console.error('Failed to get token claims', err);
        setAuthState({ user, role: null, mfaEnabled: false, loading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return authState;
}
