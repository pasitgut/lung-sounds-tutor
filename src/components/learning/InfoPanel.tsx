import React, { useEffect, useState } from "react";
import { Volume2, User, Stethoscope } from "lucide-react";
import AudioPlayer from "../audio/AudioPlayer";

interface InfoPanelProps {
  activeSound: string;
  switchModel: () => void;
}

const contentData: Record<string, { general: string; nursing: string }> = {
  "Vestricular breath sound": {
    general:
      "Vesicular sounds are soft, low-pitched sounds heard over most of the lung fields. Inspiration is longer than expiration.",
    nursing: "",
  },
  Wheezes: {
    general:
      "High-pitched, musical sounds heard primarily during expiration. Caused by narrowing of the airways.",
    nursing:
      "Nursing: Administer bronchodilators as prescribed. Encourage coughing and deep breathing. Monitor O2 saturation.",
  },
  "Fine Crackle": {
    general:
      "Brief, discontinuous, popping lung sounds that are high-pitched. Similar to the sound of wood burning in a fireplace.",
    nursing:
      "Nursing: Assess for signs of fluid overload or heart failure. Position patient for optimal lung expansion.",
  },
  "Coarse Crackle": {
    general:
      "Discontinuous, low-pitched, rattling sounds often heard during early inspiration and throughout expiration.",
    nursing:
      "Nursing: Assist with secretion clearance (suctioning if needed). Encourage hydration to thin secretions.",
  },
  "Ronchi Crackle": {
    general:
      "Low-pitched, snoring or rattling sounds caused by secretions in the large airways.",
    nursing:
      "Nursing: Encourage coughing to clear airways. Perform chest physiotherapy if ordered.",
  },
  Stridor: {
    general:
      "High-pitched, crowing sound that occurs chiefly on inspiration. Indicates obstruction of the larynx or trachea.",
    nursing:
      "Nursing: Immediate assessment of airway patency. Keep patient calm. Prepare for emergency airway management if needed.",
  },
  Bronchial: {
    general:
      "Loud, high-pitched, hollow sounds normally heard over the manubrium. Expiration is longer than inspiration.",
    nursing:
      "Nursing: If heard in peripheral lung fields, assess for consolidation (pneumonia). Monitor temperature and WBC count.",
  },
};

const nursingSounds = [
  "Wheezes",
  "Fine Crackle",
  "Coarse Crackle",
  "Ronchi Crackle",
  "Stridor",
  "Bronchial",
];

const InfoPanel: React.FC<InfoPanelProps> = ({ activeSound, switchModel }) => {
  const [activeTab, setActiveTab] = useState<"general" | "nursing">("general");

  const hasNursingContent = nursingSounds.includes(activeSound);

  useEffect(() => {
    setActiveTab("general");
  }, [activeSound]);

  const currentData = contentData[activeSound] || {
    general: "Description not found",
    nusring: "Nursing intervention not found.",
  };

  const textToShow =
    activeTab === "general" ? currentData.general : currentData.nursing;
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#008CC9]">Learning materials</h2>

      {/* Legend & Icon */}
      <div className="flex items-start justify-between">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-medium text-[#008CC9]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-200"></span>
            Trachea
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200"></span>
            Upper lobe
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-200"></span>
            Middle lobe
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-fuchsia-500 ring-2 ring-fuchsia-200"></span>
            Lower lobe
          </div>
        </div>
        <div className="text-[#004e64]">
          <button onClick={switchModel}>
            <User className="h-12 w-12" />
          </button>
        </div>
      </div>

      {/* Buttons & Description Section */}
      <div className="mt-2">
        {/* Tab Buttons Area */}
        <div className="flex gap-3 mb-4">
          {/* General (Sound Name) Button */}
          <button
            onClick={() => setActiveTab("general")}
            className={`
                        px-6 py-2 rounded-full font-bold text-lg transition-all border-2
                        ${
                          activeTab === "general"
                            ? "bg-[#008CC9] text-white border-[#008CC9]"
                            : "bg-white text-[#008CC9] border-[#008CC9] hover:bg-blue-50"
                        }
                    `}
          >
            {activeSound}
          </button>

          {/* Nursing Button (Show only if listed in nursingSounds) */}
          {hasNursingContent && (
            <button
              onClick={() => setActiveTab("nursing")}
              className={`
                            flex items-center gap-2 px-6 py-2 rounded-full font-bold text-lg transition-all border-2
                            ${
                              activeTab === "nursing"
                                ? "bg-[#008CC9] text-white border-[#008CC9]"
                                : "bg-white text-[#008CC9] border-[#008CC9] hover:bg-blue-50"
                            }
                        `}
            >
              <Stethoscope size={20} />
              Nursing
            </button>
          )}
        </div>

        {/* Content Card */}
        <div className="border-2 border-[#008CC9] rounded-2xl p-6 bg-white relative min-h-62.5 flex flex-col justify-between shadow-sm">
          <div className="text-gray-500 text-sm leading-relaxed space-y-4 animate-fadeIn">
            <p className="whitespace-pre-line">{textToShow}</p>

            <p className="opacity-80">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          {/* Audio Player Section */}
          <div className="mt-6 flex items-center gap-4 text-gray-700 font-bold border-t pt-4">
            {/*<Volume2 className="text-[#2b4eff] w-8 h-8 cursor-pointer hover:scale-110 transition-transform" />*/}
            <AudioPlayer src="/audios/sound-test.mp3" />
            <span>{activeSound}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
