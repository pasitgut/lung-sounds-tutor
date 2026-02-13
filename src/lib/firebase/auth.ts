import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as _signOut,
} from "firebase/auth";
import { removeSession } from "../actions/auth";
import { auth } from "./firebase";

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account",
    hd: "kkumail.com",
  });

  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (!result || !result.user) {
      throw new Error("Google sign in failed.");
    }

    const email = result.user.email;
    if (!email || !email.endsWith("@kkumail.com")) {
      await _signOut(auth);
      throw new Error("Access Denied: อนุญาเฉพาะ kkumail.com เท่านั้น");
    }
    return result.user;
  } catch (err) {
    console.error("Error signing in with Google.", err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    await _signOut(auth);
    await removeSession();
  } catch (err) {
    console.error("Error signing out. ", err);
    throw err;
  }
};
