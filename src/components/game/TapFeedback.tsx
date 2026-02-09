import { useEffect, useState } from "react";

const SUCCESS_MESSAGES = ["Connected!", "Nice timing!", "+10"];
const FAIL_MESSAGES = ["Missed!", "Try again!", "Mistake +1"];

interface TapFeedbackProps {
  flashSuccess: boolean;
  flashError: boolean;
}

export default function TapFeedback({ flashSuccess, flashError }: TapFeedbackProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (flashSuccess) {
      const msg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
      setMessage(msg);
      setIsSuccess(true);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [flashSuccess]);

  useEffect(() => {
    if (flashError) {
      const msg = FAIL_MESSAGES[Math.floor(Math.random() * FAIL_MESSAGES.length)];
      setMessage(msg);
      setIsSuccess(false);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [flashError]);

  if (!visible || !message) return null;

  return (
    <div
      className={`
        absolute inset-0 flex items-center justify-center pointer-events-none z-50
      `}
    >
      <span
        className={`
          text-2xl font-bold px-4 py-2 rounded-xl animate-bounce
          ${isSuccess ? "text-water bg-water/10" : "text-primary bg-primary/10"}
        `}
      >
        {message}
      </span>
    </div>
  );
}
