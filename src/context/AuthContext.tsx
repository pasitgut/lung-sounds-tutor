"use client";

import { createSession, removeSession } from "@/lib/actions/auth";
import { auth } from "@/lib/firebase/auth";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (!currentUser.email?.endsWith("@kkumail.com")) {
          await auth.signOut();
          return;
        }

        const token = await currentUser.getIdToken();
        await createSession(token);
        setUser(currentUser);
      } else {
        await removeSession();
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth msut be used within AuthProviderContext");
  return context;
};
