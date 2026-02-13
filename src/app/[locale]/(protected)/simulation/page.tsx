"use client";

import Navbar from "@/components/layout/Navbar";
import { useProgressStore } from "@/store/useProgressStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const contentData = [
  {
    id: 1,
    title: "Recommended Learning materials",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "/images/patient-1.png",
  },
  {
    id: 2,
    title: "Advanced Lung Simulations",
    description:
      "Explore advanced scenarios with our interactive simulation tools designed for medical professionals. Enhance your diagnostic skills with real-time feedback.",
    image: "/images/patient-2.png",
  },
  {
    id: 3,
    title: "Pediatric Care Modules",
    description:
      "Specialized learning materials focusing on pediatric lung sounds and respiratory conditions. Comprehensive guides and audio samples included.",
    image: "/images/patient-3.png",
  },
];
export default function SimulationPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? contentData.length - 1 : currentIndex - 1;
    setCurrentIndex((prev) => (prev = newIndex));
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex == contentData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex((prev) => (prev = newIndex));
  };

  const currentItem = contentData[currentIndex];

  const { isPretestDone } = useProgressStore();
  // if (!isPretestDone) {
  //   return <div>คุณยังไม่ปลดล็อค module นี้</div>;
  // }

  return (
    <div className="min-h-screen bg-[#F0F8FF] relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-6xl">💊</div>
        <div className="absolute bottom-20 right-40 text-6xl">🩺</div>
        <div className="absolute top-40 right-20 text-6xl">💉</div>
        <div className="absolute bottom-10 left-40 text-6xl">🏥</div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 lg:px-32 gap-10">
          {/* Left Column: Text */}
          <div className="flex-1 space-y-6 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D8CBA] leading-tight">
              {currentItem.title.split(" ").slice(0, 1)} <br />
              {currentItem.title.split(" ").slice(1).join(" ")}
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
              {currentItem.description}
            </p>

            <div className="pt-4">
              <Link href={`/simulation/${currentItem.id}`}>
                <button className="bg-[#2D8CBA] hover:bg-[#257a9e] text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 font-medium">
                  เริ่มทำสื่อการเรียนรู้
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Image & Navigation */}
          <div className="flex-1 relative flex justify-center items-center w-full">
            {/* Left Arrow Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-20 p-2 rounded-full hover:bg-white/50 text-[#2D8CBA] transition-all hidden md:block"
            >
              <ChevronLeft size={48} strokeWidth={1.5} />
            </button>

            {/* Image Container */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Note: ใส่รูปภาพของคุณที่นี่ 
                   ผมใช้ div placeholder แทนรูปภาพ หากมีรูปให้ใช้ <Image /> ของ Next.js
                 */}
              <div className="w-full h-full relative">
                {/* แทนที่ตรงนี้ด้วย <Image src={currentItem.image} ... /> */}
                <img
                  src="https://placehold.co/500x500/e2e8f0/2D8CBA?text=Patient+Illustration"
                  alt="Patient Illustration"
                  className="object-contain w-full h-auto drop-shadow-xl"
                />
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-20 p-2 rounded-full hover:bg-white/50 text-[#2D8CBA] transition-all"
            >
              <ChevronRight size={48} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Dots Indicators (Pagination) */}
        <div className="flex justify-center gap-3 pb-10">
          {contentData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-[#2D8CBA] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
