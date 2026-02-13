"use client";

import { createSession } from "@/lib/actions/auth";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!isAccepted) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();

      if (!result) {
        setError("Login Failed");
        throw new Error("Login failed");
      }

      const token = await result.getIdToken();
      createSession(token);
    } catch (error: any) {
      console.error("Type of error: ", typeof error);
      console.error("Error Code: ", error.code);
      if (error.code === "auth/popup-closed-by-user") {
        console.error("Popup closed by user");
      } else {
        setError(
          error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ โปรดลองใหม่อีกครั้ง",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 left-10 text-blue-200 opacity-50">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 text-blue-200 opacity-50">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center gap-10">
        {/* LOGO Area */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Lung Sounds Tutor
          </h1>
        </div>

        {/* Login Area */}
        <div className="flex flex-col items-center gap-6">
          {/* Google Button Container */}
          <div className="relative group w-full max-w-xs">
            {" "}
            <div
              className={`
                absolute top-2 left-0 w-full h-full rounded-full 
                transition-all duration-300 transform origin-top
                ${isAccepted ? "bg-indigo-100 shadow-md translate-y-1 scale-100" : "bg-gray-100 translate-y-0 scale-95 opacity-50"}
              `}
            ></div>
            {/* Google Button */}
            <button
              onClick={handleLogin}
              disabled={!isAccepted}
              className={`
                relative w-full flex items-center justify-center gap-4 px-8 py-4 bg-white rounded-full 
                border border-slate-100 shadow-sm
                transition-all duration-200
                ${
                  isAccepted
                    ? "hover:-translate-y-1 hover:shadow-lg active:translate-y-0 cursor-pointer text-slate-700"
                    : "opacity-60 cursor-not-allowed text-slate-400 grayscale bg-gray-50"
                }
              `}
            >
              {/* Google Icon (SVG) */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.61.81-.23z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              <span className="font-bold tracking-wide text-sm md:text-base whitespace-nowrap">
                LOGIN WITH GOOGLE
              </span>
            </button>
          </div>
          <span className="mt-2 text-gray-700">
            Login with @kkumail.com only
          </span>
          {/* Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group select-none ">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="peer w-5 h-5 cursor-pointer appearance-none rounded border-2 border-slate-300 transition-all checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <svg
                className="pointer-events-none absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 ease-in-out"
                viewBox="0 0 12 10"
                fill="none"
              >
                <path
                  d="M1 5L4.5 8.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors font-medium">
              ฉันยอมรับเงื่อนไขการใช้งาน
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
