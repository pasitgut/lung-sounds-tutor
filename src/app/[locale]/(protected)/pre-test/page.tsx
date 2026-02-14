"use client";

import Navbar from "@/components/layout/Navbar";
import Pagination from "@/components/quiz/Pagination";
import QuestionCard from "@/components/quiz/QuestionCard";
import ScoreSummary from "@/components/quiz/ScoreSummary";
import { pretestOne, pretestTwo } from "@/data/questions";
import { useQuiz } from "@/hooks/useQuiz";

export default function PreTestPage() {
  const {
    questions,
    currentQuestion,
    currentQuestionIndex,
    userAnswer,
    maxAccessQuestion,
    isFinished,
    score,
    handleOptionSelect,
    goToQuestion,
    handleSubmit,
  } = useQuiz([...pretestOne, ...pretestTwo]);

  console.log("Current Question: ", currentQuestion);
  if (!currentQuestion && !isFinished)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F6FF] text-[#1E74BC]">
        Loading Quiz...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F0F6FF] font-sans text-slate-800 pb-20">
      <Navbar />

      {isFinished ? (
        <ScoreSummary score={score} totalQuestions={questions.length} />
      ) : (
        <main className="max-w-4xl mx-auto px-4 pt-4">
          {/* Header Title */}
          <div className="relative text-center mb-10">
            <h1 className="text-4xl font-bold text-[#1E74BC]">Per-test</h1>
            {/*<div className="absolute right-0 top-1 text-sm font-semibold">
              <span className="text-[#1E74BC] border-b-2 border-[#1E74BC] cursor-pointer">
                TH
              </span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-400 hover:text-[#1E74BC] cursor-pointer transition-colors">
                ENG
              </span>
            </div>*/}
          </div>

          <QuestionCard
            question={currentQuestion}
            index={currentQuestionIndex}
            selectedOptions={userAnswer[currentQuestion.id] || []}
            onOptionSelect={handleOptionSelect}
          />

          <Pagination
            questions={questions}
            currentIndex={currentQuestionIndex}
            maxAccessibleIndex={maxAccessQuestion}
            userAnswer={userAnswer}
            onGoToQuestion={goToQuestion}
            onSubmit={handleSubmit}
          />
        </main>
      )}
    </div>
  );
}
