"use client";

import LockModule from "@/components/layout/LockModule";
import { useProgressStore } from "@/store/useProgressStore";

export default function Certificate() {
  const { isPosttestDone } = useProgressStore();
  if (!isPosttestDone) {
    return <LockModule />;
  }

  return <div></div>;
}
