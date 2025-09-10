# TAME (Triple A Multisensory Education) — v4

Expo (React Native + TypeScript) app with Firebase **Auth + Firestore + Storage**, **TOTP MFA**, **Google Sign‑In**, **Phone/SMS Auth**, and **Role‑based access** (custom claims scaffold).

## Quick start
```bash
npm i
npm run start
# press i (iOS simulator on mac) or a (Android)
```
Edit `src/config/firebaseConfig.ts` with your web config, then:
```bash
npm i firebase @react-native-google-signin/google-signin @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/storage
```

## Google Sign-In
- Enable Google provider in Firebase Auth.
- Set `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` in your env (or hardcode in `configureGoogle(...)`).

## Phone/SMS
- Enable Phone provider in Firebase Auth.
- Native step:
```bash
npx expo prebuild
cd ios && pod install
```
- Use **Phone Sign-In** screen from Login.

## Cloud Storage uploads
- Therapist Live View uploads to `artifacts/{studentId}/{timestamp}/notes.txt` and stores the download URL in Firestore.

## Roles (custom claims)
- Deploy `functions/` and call **Admin — Roles** screen to assign `therapist` or `admin` roles.
- Update Firestore/Storage rules to enforce roles.

## MFA
- Enroll TOTP in **Therapist Tools → Set up MFA**; enforced by `MFAGate`.

