/**
 * One-time script: creates admin@yopmail.com and sets Firestore role to superadmin.
 * Run: npm run seed:admin
 */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const EMAIL = "admin@yopmail.com";
const PASSWORD = "Admin12@";
const NAME = "Admin";

const firebaseConfig = {
  apiKey: "AIzaSyAWyBKFmRXwfYt9UaJloUB_VQT8U9hnCJc",
  authDomain: "e-commerce-5711.firebaseapp.com",
  projectId: "e-commerce-5711",
  storageBucket: "e-commerce-5711.firebasestorage.app",
  messagingSenderId: "257023649736",
  appId: "1:257023649736:web:f10816ea250e05782782fd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function main() {
  let uid;

  try {
    const cred = await createUserWithEmailAndPassword(auth, EMAIL, PASSWORD);
    uid = cred.user.uid;
    console.log("Created new Auth user:", EMAIL);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      const cred = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
      uid = cred.user.uid;
      console.log("Auth user already exists, signed in:", EMAIL);
    } else {
      throw err;
    }
  }

  await setDoc(
    doc(db, "users", uid),
    {
      name: NAME,
      email: EMAIL,
      role: "superadmin",
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  console.log("\nSuccess!");
  console.log("  Email:    ", EMAIL);
  console.log("  Password: ", PASSWORD);
  console.log("  UID:      ", uid);
  console.log("  Role:     superadmin (Firestore users/" + uid + ")");
  console.log("\nSign in at /login → you will be routed to /admin\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed:", err.message || err);
  process.exit(1);
});
