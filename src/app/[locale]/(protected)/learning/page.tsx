"use client";

import InfoPanel from "@/components/learning/InfoPanel";
import SoundMenu from "@/components/learning/SoundMenu";
import { useState } from "react";

const soundList = [
  "Vestricular breath sound",
  "Wheezes",
  "Fine Crackle",
  "Coarse Crackle",
  "Ronchi Crackle",
  "Stridor",
  "Bronchial",
];
export default function LearningMediaPage() {
  const [activeSound, setActiveSound] = useState<string>(soundList[0]);

  return (
    <div className="min-h-screen bg-[#F0F8FF] relative overflow-hidden font-sans">
      {/* Background Pattern (Optional - ใช้ CSS Gradient หรือรูปภาพจางๆ) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-100 to-transparent"></div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-360">
        {/* Navbar */}
        {/*<Navbar />*/}

        {/* Grid Layout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 lg:mt-8 items-start h-[calc(100vh-120px)]">
          {/* Left: Sound Menu */}
          <div className="lg:col-span-3 flex flex-col justify-center h-full">
            <SoundMenu
              items={soundList}
              activeItem={activeSound}
              onSelect={setActiveSound}
            />
          </div>

          {/* Center: Lung Model */}
          <div className="lg:col-span-5 flex items-center justify-center h-full">
            {/*<LungModel />*/}
          </div>

          {/* Right: Info Panel */}
          <div className="lg:col-span-4 flex flex-col justify-center h-full pb-10">
            <InfoPanel activeSound={activeSound} />
          </div>
        </div>
      </div>
    </div>
  );
}
