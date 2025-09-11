// src/auth/mfa.ts
import { auth } from './firebaseAuth';
// import {
//   multiFactor,
//   getMultiFactorResolver,
//   TotpMultiFactorGenerator,
//   MultiFactorError,
// } from 'firebase/auth';

/**
 * TEMPORARY: Skip TOTP enrollment for now
 * Returns dummy values so your app can run without errors.
 */
export async function startTotpEnrollment() {
  console.warn('MFA TOTP is disabled. Skipping enrollment.');

  // Return a "fake" finalize function
  return {
    secret: "Type: Qr1234",
    qrCodeUrl: "Qr1234",
    finalize: async (code: string) => {
      console.warn('MFA TOTP finalize skipped.');
    },
  };

  /*
  // Original code (for later)
  const u = auth.currentUser;
  if (!u) throw new Error('Sign in first');

  const mf = multiFactor(u);
  const session = await mf.getSession();
  const s = await TotpMultiFactorGenerator.generateSecret(session);

  const issuer = encodeURIComponent('TAME');
  const account = encodeURIComponent(u.email || 'user');
  const qrCodeUrl = `otpauth://totp/${issuer}:${account}?secret=${s.secretKey}&issuer=${issuer}`;

  return {
    secret: s.secretKey,
    qrCodeUrl,
    finalize: async (code: string) => {
      const cred = TotpMultiFactorGenerator.credential({
        secretKey: s.secretKey,
        oneTimePassword: code,
      });
      await mf.enroll(cred, 'Authenticator');
    },
  };
  */
}

/**
 * TEMPORARY: Skip MFA sign-in resolution
 */
export async function resolveMfaSignIn(
  /* err: MultiFactorError, 
     codeProvider: () => Promise<{ factorId: string; code: string }> */
) {
  console.warn('MFA sign-in resolution skipped.');
  return null;

  /*
  // Original code (for later)
  const res = getMultiFactorResolver(auth, err);

  const { factorId, code } = await codeProvider();

  if (factorId === 'totp') {
    const hint: any = res.hints[0];
    const cred = TotpMultiFactorGenerator.credential({
      oneTimePassword: code,
      enrollmentId: hint.uid,
    });
    return await res.resolveSignIn(cred as any);
  }

  throw new Error('Unsupported factor');
  */
}
