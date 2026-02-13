import { Option } from "@/types/quiz";
import React from "react";

interface OptionItemProps {
  option: Option;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const OptionItem: React.FC<OptionItemProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(option.id)}
      className={`
        flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group border
        ${
          isSelected
            ? "bg-white border-blue-200 shadow-sm"
            : "bg-transparent border-transparent hover:bg-white/60"
        }
      `}
    >
      <div
        className={`
        w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200 shrink-0
        ${
          isSelected
            ? "bg-[#1E74BC] border-[#1E74BC] scale-110"
            : "bg-white border-blue-200 group-hover:border-[#1E74BC]"
        }
      `}
      >
        {isSelected && <CheckIcon />}
      </div>

      <span
        className={`text-xl font-medium transition-colors ${isSelected ? "text-[#1E74BC]" : "text-blue-900"}`}
      >
        {option.label}
      </span>
    </div>
  );
};

export default OptionItem;
