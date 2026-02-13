"use client";

import Navbar from "@/components/layout/Navbar";
import Pagination from "@/components/quiz/Pagination";
import QuestionCard from "@/components/quiz/QuestionCard";
import ScoreSummary from "@/components/quiz/ScoreSummary";
import { allQuestions } from "@/data/questions";
import { useQuiz } from "@/hooks/useQuiz";
import { useProgressStore } from "@/store/useProgressStore";

export default function PostTestPage() {
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
  } = useQuiz(allQuestions);
  const { isPretestDone, isSimulationDone } = useProgressStore();
  if (!isPretestDone && !isSimulationDone) {
    return <div>คุณยังไม่ปลดล็อค module นี้</div>;
  }

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
            <h1 className="text-4xl font-bold text-[#1E74BC]">Post-test</h1>
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
