// import { db } from "@/lib/firebase/firebase";
// import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

// export interface UserProgress {
//   pretest: { isDone: boolean; score: number; completedAt: Timestamp | null };
//   simulation: { isDone: boolean; completedAt: Timestamp | null };
//   posttest: { isDone: boolean; score: number; completedAt: Timestamp | null };
// }

// export interface UserProfile {
//   uid: string;
//   email: string;
//   displayName: string;
//   progress: UserProgress;
// }

// export const UserModel = {
//   async create(uid: string, email: string, displayName: string) {
//     const initialData: UserProfile = {
//       uid,
//       email,
//       displayName,
//       progress: {
//         pretest: { isDone: false, score: 0, completedAt: null },
//         simulation: { isDone: false, completedAt: null },
//         posttest: { isDone: false, score: 0, completedAt: null },
//       },
//     };

//     await setDoc(doc(db, "users", uid), initialData);
//   },

//   async get(uid: string): Promise<UserProfile | null> {
//     const snap = await getDoc(doc(db, "users", uid));
//     return snap.exists() ? (snap.data() as UserProfile) : null;
//   },

//   async updateProgress(
//     uid: string,
//     type: "pretest" | "simulation" | "posttest",
//     score?: number,
//   ) {
//     const ref = doc(db, "users", uid);
//     const updatedData: any = {
//       [`progress.${type}.isDone`]: true,
//       [`progress.${type}.completedAt`]: Timestamp.now(),
//     };

//     if (type === "pretest" || type === "posttest") {
//       updatedData[`progress.${type}.score`] = score;
//     }
//     await updateDoc(ref, updatedData);
//   },
// };
