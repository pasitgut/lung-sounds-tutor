import React from "react";
import OptionItem from "./OptionItem";
import { Question } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedOptions: string[];
  onOptionSelect: (id: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  selectedOptions,
  onOptionSelect,
}) => {
  return (
    <div className="mb-16">
      {/* Question Text Header */}
      <div className="p-6 ">
        <h2 className="flex text-2xl font-bold text-[#1E74BC] leading-relaxed">
          <span className="mr-2">{index + 1}.</span>
          <div className="flex gap-2 ">
            {" "}
            {question.text}
            <span className="block mt-2 text-lg font-normal text-blue-400">
              ({" "}
              {question.type === "multiple"
                ? "เลือกได้มากกว่า 1 ข้อ"
                : "เลือกตอบ 1 ข้อ"}{" "}
              )
            </span>{" "}
          </div>
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-4 pl-2">
        {question.options.map((option) => (
          <OptionItem
            key={option.id}
            option={option}
            isSelected={selectedOptions.includes(option.id)}
            onSelect={onOptionSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
