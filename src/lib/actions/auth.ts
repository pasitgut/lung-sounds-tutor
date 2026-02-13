"use server";

import { HOME_ROUTE, LOGIN_ROUTE, SESSION_NAME } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createSession = async (token: string) => {
  const cookieStore = await cookies();

  const existingSession = cookieStore.get(SESSION_NAME);
  if (existingSession) return;
  cookieStore.set(SESSION_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 5,
    path: "/",
    sameSite: "lax",
  });

  redirect(HOME_ROUTE);
};

export const removeSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);

  redirect(LOGIN_ROUTE);
};
