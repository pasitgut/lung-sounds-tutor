import { Question, QuizState } from "@/types/quiz";
import { useEffect, useMemo, useState } from "react";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffle = [...array];
  for (let i = shuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
  }
  return shuffle;
};

export const useQuiz = (sourceQuestions: Question[]) => {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswer: {},
    score: 0,
    isFinished: false,
  });

  useEffect(() => {
    console.log("Source Questions: ", sourceQuestions);
    const shuffled = shuffleArray(sourceQuestions).slice(0, 10);
    setState((prev) => ({ ...prev, questions: shuffled }));
  }, [sourceQuestions]);

  const currentQuestion = state.questions[state.currentQuestionIndex];
  console.log(currentQuestion);
  const maxAccessQuestion = useMemo(() => {
    const firstUnanswered = state.questions.findIndex((q) => {
      const ans = state.userAnswer[q.id];
      return !ans || ans.length === 0;
    });
    return firstUnanswered === -1
      ? state.questions.length - 1
      : firstUnanswered;
  }, [state.questions, state.userAnswer]);

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;

    setState((prev) => {
      const currentAnswers = prev.userAnswer[currentQuestion.id] || [];
      let newAnswers: string[];
      const isMultiple = currentQuestion.correctOption.length > 1;

      if (!isMultiple) {
        newAnswers = [optionId];
      } else {
        if (currentAnswers.includes(optionId)) {
          newAnswers = currentAnswers.filter((id) => id !== optionId);
        } else {
          newAnswers = [...currentAnswers, optionId];
        }
      }

      return {
        ...prev,
        userAnswer: {
          ...prev.userAnswer,
          [currentQuestion.id]: newAnswers,
        },
      };
    });
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < state.questions.length) {
      if (index <= maxAccessQuestion) {
        setState((prev) => ({ ...prev, currentQuestionIndex: index }));
      }
    }
  };

  const handleSubmit = () => {
    if (Object.keys(state.userAnswer).length < state.questions.length) return;

    let totalScore = 0;

    state.questions.forEach((q) => {
      const userAns = state.userAnswer[q.id] || [];
      const correctAns = q.correctOption;

      const isCorrect =
        userAns.length === correctAns.length &&
        userAns.every((val) => correctAns.includes(val));

      if (isCorrect) totalScore += 1;
    });

    setState((prev) => ({ ...prev, isFinished: true, score: totalScore }));
  };

  const restartQuiz = () => {
    const shuffled = shuffleArray(sourceQuestions).slice(0, 10);
    setState({
      questions: shuffled,
      currentQuestionIndex: 0,
      userAnswer: {},
      score: 0,
      isFinished: false,
    });
  };

  return {
    ...state,
    currentQuestion,
    maxAccessQuestion,
    handleOptionSelect,
    goToQuestion,
    handleSubmit,
    restartQuiz,
  };
};
