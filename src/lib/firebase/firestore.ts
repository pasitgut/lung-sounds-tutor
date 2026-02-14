import { UserProfile } from "@/types/user";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
};

export const createUserProfile = async (user: User) => {
  const docRef = doc(db, "users", user.uid);
  const newProfile = {};

  await setDoc(docRef, newProfile, { merge: true });
  return newProfile;
};

export const saveFirstAttemptEaxm = async () => {
  const newResult = {
    uid: "",
  };
};

export const saveFirstAttemptSimulation = async () => {};
