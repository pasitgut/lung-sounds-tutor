"use client";

import Loading from "@/components/layout/Loading";
import { auth } from "@/lib/firebase/firebase";
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
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }

      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);
  if (!initialized) return <Loading />;
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth msut be used within AuthProviderContext");
  return context;
};
