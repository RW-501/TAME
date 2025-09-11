// src/auth/useAuth.ts
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { auth } from './firebaseAuth'; // Make sure you export `auth` from your firebaseAuth.ts

/**
 * AuthState type tracks:
 *  - the current user (Firebase User)
 *  - their role from custom claims
 *  - whether MFA is enabled
 *  - loading state
 */
export type AuthState = {
  user: User | null;
  role: string | null;
  mfaEnabled: boolean;
  loading: boolean;
};

/**
 * Custom React hook to get Firebase auth state with role & MFA info.
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    role: null,
    mfaEnabled: false,
    loading: true,
  });

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // No user logged in
        setAuthState({ user: null, role: null, mfaEnabled: false, loading: false });
        return;
      }

      try {
        // Get ID token to access custom claims
        const tokenResult = await getIdTokenResult(user, true); // force refresh
        const role = tokenResult.claims.role as string | undefined;

        // Check if user has any enrolled MFA factors (like TOTP)
const mfaEnabled = user.multiFactor?.enrolledFactors?.length > 0;

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

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return authState;
}
