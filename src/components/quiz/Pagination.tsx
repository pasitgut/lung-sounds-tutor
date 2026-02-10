import React from "react";
import { Question } from "@/types/quiz";

interface PaginationProps {
  questions: Question[];
  currentIndex: number;
  maxAccessibleIndex: number;
  userAnswer: Record<number, string[]>;
  onGoToQuestion: (index: number) => void;
  onSubmit: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  questions,
  currentIndex,
  maxAccessibleIndex,
  userAnswer,
  onGoToQuestion,
  onSubmit,
}) => {
  const isAllAnswered = Object.keys(userAnswer).length === questions.length;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 select-none pb-10">
      {questions.map((_, index) => {
        const isActive = index === currentIndex;
        const isLocked = index > maxAccessibleIndex;
        const hasAnswer = userAnswer[questions[index].id]?.length > 0;

        let btnClass =
          "w-10 h-10 rounded-lg text-lg font-bold transition-all duration-200 ";

        if (isActive) {
          btnClass +=
            "bg-[#1E74BC] text-white shadow-md scale-110 ring-2 ring-blue-200";
        } else if (isLocked) {
          btnClass += "bg-gray-200 text-gray-400 cursor-not-allowed";
        } else if (hasAnswer) {
          btnClass += "bg-blue-100 text-[#1E74BC] hover:bg-blue-200";
        } else {
          btnClass +=
            "bg-white border-2 border-[#1E74BC] text-[#1E74BC] hover:bg-blue-50";
        }

        return (
          <button
            key={index}
            onClick={() => !isLocked && onGoToQuestion(index)}
            disabled={isLocked}
            className={btnClass}
          >
            {index + 1}
          </button>
        );
      })}

      <button
        onClick={onSubmit}
        disabled={!isAllAnswered}
        className={`
          ml-4 px-8 h-10 rounded-lg font-bold text-white transition-all shadow-sm
          ${
            isAllAnswered
              ? "bg-[#8E99A4] hover:bg-gray-500 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed opacity-70"
          }
        `}
      >
        Submit
      </button>
    </div>
  );
};

export default Pagination;
