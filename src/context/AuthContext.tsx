"use client";

import Loading from "@/components/layout/Loading";
import { createSession, removeSession } from "@/lib/actions/auth";
import { auth } from "@/lib/firebase/auth";
import { useProgressStore } from "@/store/useProgressStore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProviderContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProviderContext({ children }: AuthProviderContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { fetchProgress } = useProgressStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          if (!currentUser.email?.endsWith("@kkumail.com")) {
            await auth.signOut();
            setUser(null);
            return;
          }

          const token = await currentUser.getIdToken();
          await createSession(token);
          setUser(currentUser);

          await fetchProgress(currentUser.uid);
        } else {
          await removeSession();
          setUser(null);
        }
      } catch (error) {
        console.error("Auth Error: ", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth msut be used within AuthProviderContext");
  return context;
};
