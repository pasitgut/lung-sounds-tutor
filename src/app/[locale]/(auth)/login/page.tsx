import React from "react";
import {
  Stethoscope,
  HeartPulse,
  Pill,
  Syringe,
  ClipboardList,
  Activity,
  Thermometer,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#F0F8FF] overflow-hidden flex flex-col items-center justify-center font-sans">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Stethoscope className="absolute top-10 left-20 text-blue-400 w-12 h-12 -rotate-12" />
        <HeartPulse className="absolute top-12 left-1/2 text-blue-300 w-10 h-10" />
        <Activity className="absolute top-20 right-24 text-sky-400 w-14 h-14" />
        <Pill className="absolute top-1/3 left-10 text-pink-300 w-8 h-8 rotate-45" />
        <Syringe className="absolute top-1/3 right-10 text-blue-300 w-10 h-10 -rotate-45" />
        <ClipboardList className="absolute bottom-20 right-20 text-blue-400 w-10 h-10" />
        <Thermometer className="absolute bottom-32 left-16 text-blue-300 w-8 h-8" />
        <Activity className="absolute bottom-10 left-1/2 text-sky-300 w-16 h-16" />

        <div className="absolute top-40 right-1/4 text-blue-200 text-4xl">
          mo
        </div>
        <div className="absolute bottom-40 left-1/3 text-pink-200 w-6 h-6 rounded-full border-2 border-pink-200"></div>
      </div>

      <div className="z-10 flex flex-col items-center gap-12 w-full max-w-4xl px-4">
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="relative transform -rotate-12">
            <div className="w-16 h-12 bg-white border-2 border-sky-900 rounded-t-xl flex items-center justify-center shadow-sm">
              <span className="text-sky-900 font-bold text-xl">+</span>
            </div>
            <span className="absolute -top-2 -left-2 text-sky-400 text-xs">
              ♥
            </span>
            <span className="absolute -top-1 -right-2 text-sky-400 text-xs">
              ♥
            </span>
          </div>

          <div className="flex items-end gap-1 select-none">
            <div className="relative flex items-end">
              <Stethoscope
                className="w-16 h-16 text-sky-700 -mr-2 mb-1"
                strokeWidth={2.5}
              />
              <span className="text-6xl md:text-7xl font-bold text-sky-800 tracking-tight">
                ung
              </span>
            </div>

            <div className="relative mx-1">
              <span className="absolute -top-4 left-0 right-0 flex justify-center">
                <Activity className="w-8 h-4 text-sky-400" />
              </span>
              <span className="text-6xl md:text-7xl font-bold text-sky-800 tracking-tight">
                Sound
              </span>
              <span className="absolute -bottom-2 left-0 right-0 flex justify-center">
                <Activity className="w-8 h-4 text-sky-400" />
              </span>
            </div>

            <div className="relative">
              <span className="text-6xl md:text-7xl font-bold text-sky-800 tracking-tight">
                Learn
              </span>

              <div className="absolute top-1/2 -right-4 w-2 h-2 bg-sky-400 rounded-full"></div>
              <div className="absolute top-1/3 -right-2 w-1 h-1 bg-sky-400 rounded-full"></div>
            </div>
          </div>

          <div className="w-20 h-20 md:w-24 md:h-24 bg-sky-100 rounded-full border-2 border-sky-200 flex items-center justify-center overflow-hidden">
            <div className="text-center text-[10px] text-sky-800 leading-tight">
              <span className="block font-bold">มหาวิทยาลัย</span>
              <span className="block font-bold">ขอนแก่น</span>
            </div>
          </div>
        </div>

        {/* --- ปุ่ม Login --- */}
        <button
          className="group relative flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all active:scale-95 border border-transparent hover:border-gray-200"
          type="button"
        >
          {/* Google Icon SVG */}
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>

          <span className="font-bold text-gray-600 tracking-wide text-lg">
            LOGIN WITH GOOGLE
          </span>
        </button>
      </div>
    </div>
  );
}
