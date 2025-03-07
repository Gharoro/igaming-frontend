import { useState, useEffect, useRef } from "react";
import { useAppStore } from "../store/useAppStore";

interface CountdownTimerProps {
  countdownType: "timeLeft" | "nextSessionIn";
  onComplete?: () => void;
}

export default function CountDownTimer({
  countdownType,
  onComplete,
}: CountdownTimerProps) {
  const { timeLeft, nextSessionIn } = useAppStore();
  const initialTime = countdownType === "timeLeft" ? timeLeft : nextSessionIn;
  const [displayTimeLeft, setDisplayTimeLeft] = useState<number | null>(
    initialTime
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (displayTimeLeft === null || displayTimeLeft <= 0) {
      if (displayTimeLeft === 0 && onComplete) {
        onComplete();
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setDisplayTimeLeft((prev) => {
        if (prev !== null && prev > 0) {
          return prev - 1;
        } else {
          if (onComplete) onComplete();
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displayTimeLeft, onComplete]);

  return <span className="text-orange-400 font-bold">{displayTimeLeft}s</span>;
}
