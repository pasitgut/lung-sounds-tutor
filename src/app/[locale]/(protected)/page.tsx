"use client";

import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import lung from "@/../public/images/lung-home.png";
import { useProgressStore } from "@/store/useProgressStore";
import Loading from "@/components/layout/Loading";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
export default function LungSoundLanding() {
  const { progress } = useUserStore();

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-10"></div>
      <Navbar />
      <main className="container mx-auto px-6 lg:px-12 py-10  relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl text-[#008CC9]">
              How to use the <br />
              <span className="text-[#008CC9] font-black">
                Lung Sound Learn App
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed text-sm lg:text-base max-w-xl mx-auto lg:mx-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="pre-test">
                <button className="cursor-pointer px-6 py-2 rounded-full bg-white border-2 border-[#008CC9] text-[#008CC9] font-medium hover:bg-slate-50 transition shadow-sm min-w-40">
                  Pre-test
                </button>
              </Link>
              <Link href="/learning">
                <button className="cursor-pointer px-6 py-2 rounded-full bg-[#008CC9] text-white font-medium hover:bg-[#007bb5] transition shadow-md min-w-30">
                  Learning materials
                </button>
              </Link>
              <Link href="/simulation">
                <button
                  disabled={!progress.pretestDone}
                  className={`
                    px-6 py-2 rounded-full font-medium transition shadow-md min-w-30
                    ${
                      !progress.pretestDone
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                        : " bg-[#008CC9] hover:bg-[#007bb5] text-white cursor-pointer"
                    }
                    `}
                >
                  Simulation
                </button>
              </Link>

              <Link href="/post-test">
                <button
                  disabled={!progress.simulationDone}
                  className={`
                    px-6 py-2 rounded-full font-medium transition shadow-md min-w-30
                    ${
                      !progress.simulationDone
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                        : " bg-[#008CC9] hover:bg-[#007bb5] text-white cursor-pointer"
                    }
                    `}
                >
                  Post-test
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-lg">
              <Image
                src={lung}
                alt="Lung and Nurse Illustration"
                className="w-full h-auto drop-shadow-xl"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
