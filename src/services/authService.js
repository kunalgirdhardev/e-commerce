import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export const ROLES = {
  USER: "user",
  SUPERADMIN: "superadmin",
};

export async function signUp({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { uid } = credential.user;

  await setDoc(doc(db, "users", uid), {
    name: name.trim(),
    email,
    role: ROLES.USER,
    createdAt: new Date().toISOString(),
  });

  return credential.user;
}

export async function signIn({ email, password }) {
  await setPersistence(auth, browserLocalPersistence);
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logOut() {
  await signOut(auth);
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { uid, ...snap.data() };
}

export async function getUserRole(uid) {
  const profile = await getUserProfile(uid);
  return profile?.role ?? ROLES.USER;
}

export function getRedirectPathForRole(role) {
  if (role === ROLES.SUPERADMIN) return "/admin";
  return "/";
}

export function getAuthErrorMessage(error) {
  const code = error?.code || "";
  const messages = {
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/wrong-password": "Incorrect password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/invalid-credential": "Invalid email or password.",
  };
  return messages[code] || error?.message || "Something went wrong. Please try again.";
}

export { auth };
