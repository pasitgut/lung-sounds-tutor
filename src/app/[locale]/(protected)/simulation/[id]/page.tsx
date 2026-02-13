"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  RotateCcw,
  Home,
  FileText,
  Stethoscope,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";

const PATIENT_INFO = {
  age: 68,
  gender: "ชาย",
  dx: "Acute Exacerbation with Chronic Obstructive Pulmonary Disease",
  cc: "หายใจหอบเหนื่อย 2 วันก่อนมาโรงพยาบาล",
  ph: "สูบบุหรี่มามากกว่า 30 ปี",
  status:
    "ผู้ป่วยเพศชาย นอนอยู่บนเตียง หายใจ room air เสียงหายใจยาว ใช้กล้ามเนื้อช่วยหายใจ",
};

const VITALS = {
  bp: "142/86 (104)",
  hr: 104,
  o2: 89,
  rr: 26,
  temp: 37.1,
};

const NURSING_TASKS = [
  { id: "1", text: "ประเมินสัญญาณชีพทุก 4 ชั่วโมง" },
  { id: "2", text: "จัดท่านอนศีรษะสูง 30 องศา" },
  { id: "3", text: "ให้ยา Beradual 4 NB ตามแผนการรักษา" },
  { id: "4", text: "ให้ O2 nasal cannula 2-3 LPM" },
  { id: "5", text: "เคาะปอด" },
  { id: "6", text: "ติดตามผลตรวจทางห้องปฏิบัติการ เช่น ABG" },
];

const CORRECT_ORDER_IDS = ["1", "2", "3", "4", "5", "6"];

export default function SimulationPage({ params }: { params: { id: string } }) {
  const [stage, setStage] = useState(1);

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F8FF] font-sans pb-10">
      <Navbar />

      <div className="flex-1 overflow-y-auto container mx-auto px-4 lg:px-20 content-center ">
        {stage === 1 && <Stage1_Diagnosis onNext={() => setStage(2)} />}
        {stage === 2 && <Stage2_Ordering onNext={() => setStage(3)} />}
        {stage === 3 && <Stage3_Success />}
      </div>
    </div>
  );
}

function Stage1_Diagnosis({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const CORRECT_ANSWER = "Coarse Crackle";

  const handleSubmit = () => {
    if (!selected) return;
    setIsSubmitted(true);
    if (selected === CORRECT_ANSWER) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left: Patient Info */}
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold text-[#2D8CBA]">
          Patient information
        </h2>

        <div className="space-y-4 text-gray-700">
          <p className="text-xl font-bold">
            ผู้ป่วยเพศ{PATIENT_INFO.gender} อายุ {PATIENT_INFO.age} ปี
          </p>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Dx:</span> {PATIENT_INFO.dx}
            </p>
            <p>
              <span className="font-semibold">CC:</span> {PATIENT_INFO.cc}
            </p>
            <p>
              <span className="font-semibold">PH:</span> {PATIENT_INFO.ph}
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">สภาพแรกพบ:</p>
            <p className="pl-4 border-l-4 border-[#2D8CBA]">
              {PATIENT_INFO.status}
            </p>
          </div>
        </div>
      </div>

      {/* Mid: Image */}
      <div className="flex-1 flex justify-center content-center">
        <div className="w-full max-w-xl aspect-video bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src="/images/patient-bed.png"
            alt="Patient"
            className="object-cover"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Right: Monitor & Question */}
      <div className="flex-1 w-full max-w-md mx-auto space-y-6">
        <div className="flex gap-6 ">
          <Monitor />

          <Stethoscope size={100} color="#000000" />
        </div>

        <div className="space-y-4">
          <p className="text-gray-500 text-sm text-center">
            กรุณาลาก stethoscope ไปที่ปอดเพื่อเลือกคำตอบ (จำลอง)
          </p>

          <div className="space-y-3">
            {["Fine Crackle", "Coarse Crackle", "Stridor"].map((choice) => {
              let btnClass =
                "border-2 border-[#2D8CBA] text-[#2D8CBA] bg-white";

              if (isSubmitted) {
                if (choice === CORRECT_ANSWER)
                  btnClass = "bg-green-500 text-white border-green-500";
                else if (choice === selected && choice !== CORRECT_ANSWER)
                  btnClass = "bg-red-500 text-white border-red-500";
                else btnClass = "border-gray-300 text-gray-400 bg-gray-100";
              } else if (selected === choice) {
                btnClass = "bg-[#2D8CBA] text-white";
              }

              return (
                <button
                  key={choice}
                  disabled={isSubmitted}
                  onClick={() => setSelected(choice)}
                  className={`w-full py-3 rounded-full font-bold transition-all ${btnClass}`}
                >
                  <div className="flex items-center px-4">
                    <div
                      className={`w-4 h-4 rounded-full border border-current mr-3 ${selected === choice || (isSubmitted && choice === CORRECT_ANSWER) ? "bg-current" : ""}`}
                    ></div>
                    {choice}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center pt-4">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="bg-[#2D8CBA] text-white px-8 py-2 rounded-full font-bold hover:bg-[#24769c] disabled:opacity-50"
              >
                ตรวจคำตอบ
              </button>
            ) : (
              <button
                onClick={onNext}
                className="bg-[#2D8CBA] text-white px-8 py-2 rounded-full font-bold hover:bg-[#24769c] flex items-center gap-2"
              >
                ถัดไป <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Stage 2: Ordering
// ----------------------------------------------------------------------
function Stage2_Ordering({ onNext }: { onNext: () => void }) {
  const [availableItems, setAvailableItems] = useState(NURSING_TASKS);
  const [selectedItems, setSelectedItems] = useState<typeof NURSING_TASKS>([]);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");

  const moveToSelected = (item: (typeof NURSING_TASKS)[0]) => {
    if (submitStatus !== "idle") return;
    setAvailableItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedItems((prev) => [...prev, item]);
  };

  const moveToAvailable = (item: (typeof NURSING_TASKS)[0]) => {
    if (submitStatus !== "idle") return;
    setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
    setAvailableItems((prev) => [...prev, item]);
  };

  const checkOrder = () => {
    if (selectedItems.length !== NURSING_TASKS.length) {
      alert("กรุณาเลือกข้อความให้ครบทุกข้อ");
      return;
    }

    const currentOrderIds = selectedItems.map((i) => i.id);
    const isMatch =
      JSON.stringify(currentOrderIds) === JSON.stringify(CORRECT_ORDER_IDS);

    if (isMatch) {
      setSubmitStatus("correct");
    } else {
      setSubmitStatus("incorrect");
    }
  };

  const resetGame = () => {
    setAvailableItems(NURSING_TASKS);
    setSelectedItems([]);
    setSubmitStatus("idle");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      <div className="hidden lg:block w-1/4 max-w-50">
        <Image
          src="/images/patient-sit.png"
          alt="Patient"
          className="w-full object-contain"
          width={1000}
          height={1000}
        />
      </div>

      {/* Main Game Area */}
      <div className="flex-1 w-full bg-white rounded-3xl shadow-xl border-2 border-[#2D8CBA] p-6">
        <h2 className="text-xl font-bold text-[#2D8CBA] text-center mb-2">
          จงให้การพยาบาลผู้ป่วย พร้อมเรียงลำดับตามความสำคัญ
        </h2>
        <p className="text-gray-400 text-xs text-center mb-6">
          ให้คลิกข้อความฝั่งซ้ายไปใส่ในช่องฝั่งขวา (หรือคลิกเพื่อย้ายกลับ)
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column: Available */}
          <div className="flex-1 space-y-2">
            {availableItems.map((item) => (
              <div
                key={item.id}
                onClick={() => moveToSelected(item)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg text-sm font-medium cursor-pointer transition-colors text-center"
              >
                {item.text}
              </div>
            ))}
            {availableItems.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-300 text-sm italic py-10">
                เลือกครบแล้ว
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            {Array.from({ length: NURSING_TASKS.length }).map((_, index) => {
              const item = selectedItems[index];

              let itemClass = "bg-white border-2 border-gray-200 text-gray-400";
              if (item) {
                itemClass =
                  "bg-gray-100 border-2 border-gray-300 text-gray-800 cursor-pointer hover:bg-red-50";
                if (submitStatus === "correct")
                  itemClass = "bg-green-500 border-green-500 text-white";
                if (submitStatus === "incorrect")
                  itemClass = "bg-red-500 border-red-500 text-white";
              }

              return (
                <div
                  key={index}
                  onClick={() => item && moveToAvailable(item)}
                  className={`h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${itemClass}`}
                >
                  {item ? item.text : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="w-full lg:w-auto flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center gap-6 ">
          <Monitor />

          <Stethoscope size={100} color="#000000" />
        </div>
        {submitStatus === "idle" && (
          <button
            onClick={checkOrder}
            className="bg-[#2D8CBA] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#24769c]"
          >
            ยืนยันคำตอบ
          </button>
        )}

        {submitStatus === "incorrect" && (
          <button
            onClick={resetGame}
            className="bg-[#2D8CBA] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-[#24769c] flex items-center gap-2"
          >
            ทำอีกครั้ง <RotateCcw size={16} />
          </button>
        )}

        {submitStatus === "correct" && (
          <button
            onClick={onNext}
            className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-green-700 flex items-center gap-2 animate-bounce"
          >
            ถัดไป <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Stage 3: Success
// ----------------------------------------------------------------------
function Stage3_Success() {
  return (
    <div className="flex flex-col items-center justify-center pt-10 text-center animate-in fade-in zoom-in duration-500">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#2D8CBA] mb-8">
        ยินดีด้วยคุณผ่านการทดสอบแล้ว !!
      </h1>

      <div className="flex gap-4 mb-12">
        <Link href="/post-test">
          <button className="bg-[#2D8CBA] hover:bg-[#24769c] text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
            Post-test <FileText size={20} />
          </button>
        </Link>
        <Link href="/">
          <button className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
            กลับหน้าหลัก <Home size={20} />
          </button>
        </Link>
      </div>

      <div className="relative w-full max-w-3xl flex items-end justify-center">
        {/* Patient + Nurse Illustration */}
        <div className="flex items-end gap-4">
          <img
            src="/images/patient-oxygen.png"
            alt="Patient Recovered"
            className="h-64 object-contain"
          />
          <img
            src="/images/nurse-happy.png"
            alt="Nurse"
            className="h-72 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Utility Components
// ----------------------------------------------------------------------
const Monitor = ({ small = false }: { small?: boolean }) => (
  <div
    className={`bg-black text-white rounded-xl p-4 shadow-xl border-4 border-gray-800 ${small ? "w-full lg:w-64 text-xs" : "w-full"}`}
  >
    <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-1">
      <span className="text-pink-500 font-bold">♥ 142/86 (104) mmHg</span>
    </div>
    <div className="grid grid-cols-2 gap-y-2">
      <div className="text-red-500 font-bold flex justify-between">
        <span>HR</span> <span>{VITALS.hr}</span>
      </div>
      <div className="text-blue-400 font-bold flex justify-between">
        <span>O2</span> <span>{VITALS.o2}%</span>
      </div>
      <div className="text-yellow-400 font-bold flex justify-between">
        <span>RR</span> <span>{VITALS.rr}</span>
      </div>
      <div className="text-cyan-400 font-bold flex justify-between">
        <span>Temp</span> <span>{VITALS.temp}</span>
      </div>
    </div>
  </div>
);
