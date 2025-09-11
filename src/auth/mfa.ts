// src/auth/mfa.ts
import { auth } from './firebaseAuth';
import {
  multiFactor,
  getMultiFactorResolver,
  TotpMultiFactorGenerator,
  MultiFactorError,
} from 'firebase/auth';

/**
 * Begin TOTP enrollment for the currently signed-in user.
 * Returns a secret and QR code URL, plus a finalize function to complete enrollment.
 */
export async function startTotpEnrollment() {
  const u = auth.currentUser;
  if (!u) throw new Error('Sign in first');

  const mf = multiFactor(u);
  const session = await mf.getSession();

  // Generate secret for authenticator app
  const s = await TotpMultiFactorGenerator.generateSecret(session);

  // Firebase Web SDK doesn’t always return `qrCodeUrl`, so we build it manually
  const issuer = encodeURIComponent('TAME'); // your app name
  const account = encodeURIComponent(u.email || 'user');
  const qrCodeUrl = `otpauth://totp/${issuer}:${account}?secret=${s.secretKey}&issuer=${issuer}`;

  return {
    secret: s.secretKey,
    qrCodeUrl,

    // Call this once the user has scanned the QR and entered their code
    finalize: async (code: string) => {
      const cred = TotpMultiFactorGenerator.credential({
        secretKey: s.secretKey,
        oneTimePassword: code,
      });
      await mf.enroll(cred, 'Authenticator'); // “Authenticator” is just a display name
    },
  };
}

/**
 * Handle MFA sign-in flow when Firebase throws a MultiFactorError.
 */
export async function resolveMfaSignIn(
  err: MultiFactorError,
  codeProvider: () => Promise<{ factorId: string; code: string }>
) {
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
}
