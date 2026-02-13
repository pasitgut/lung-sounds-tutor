"use client";

import { useCallback, useState } from "react";

export const useLearning = (soundList: string[]) => {
  const [activeSound, setActiveSound] = useState<string>(soundList[0]);
  const [currentModel, setCurrentModel] = useState<"inside" | "outside">(
    "inside",
  );

  const handleSwitchModel = useCallback(() => {
    setCurrentModel((prev) => (prev === "inside" ? "outside" : "inside"));
  }, []);

  return {
    activeSound,
    setActiveSound,
    currentModel,
    handleSwitchModel,
  };
};
