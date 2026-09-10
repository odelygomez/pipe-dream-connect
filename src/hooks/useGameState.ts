import { useState, useRef, useCallback, useEffect } from "react";

export type GamePhase = "start" | "playing" | "won" | "lost";

const SLOT_COUNT = 5;
const BASE_SPEED = 0.9;
const SPEED_INCREMENT = 0.1;
const HIT_TOLERANCE = 18;
const TAP_COOLDOWN_MS = 250;

export interface SlotPosition {
  x: number;
  y: number;
}

// Stepped path from top-left (source) to bottom-right (village)
export const SLOT_POSITIONS: SlotPosition[] = [
  { x: 20, y: 20 },
  { x: 35, y: 32 },
  { x: 50, y: 44 },
  { x: 65, y: 56 },
  { x: 80, y: 68 },
];

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [mistakes, setMistakes] = useState(0);
  const [connectedSlots, setConnectedSlots] = useState<boolean[]>(
    Array(SLOT_COUNT).fill(false)
  );
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [pipeX, setPipeX] = useState(0);
  const [flashError, setFlashError] = useState(false);
  const [flashSuccess, setFlashSuccess] = useState(false);

  const animRef = useRef<number>(0);
  const directionRef = useRef(1);
  const pipeXRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);

  const currentTarget = SLOT_POSITIONS[currentSlotIndex]?.x ?? 50;

  const animate = useCallback(() => {
    pipeXRef.current += speedRef.current * directionRef.current;
    if (pipeXRef.current >= 95) {
      pipeXRef.current = 95;
      directionRef.current = -1;
    } else if (pipeXRef.current <= 5) {
      pipeXRef.current = 5;
      directionRef.current = 1;
    }
    setPipeX(pipeXRef.current);
    animRef.current = requestAnimationFrame(animate);
  }, []);

  const startGame = useCallback(() => {
    setPhase("playing");
    setMistakes(0);
    setConnectedSlots(Array(SLOT_COUNT).fill(false));
    setCurrentSlotIndex(0);
    pipeXRef.current = 5;
    directionRef.current = 1;
    speedRef.current = BASE_SPEED;
    setPipeX(5);
    setFlashError(false);
    setFlashSuccess(false);
  }, []);

  const handleTap = useCallback(() => {
    if (phase !== "playing") return;

    const distance = Math.abs(pipeXRef.current - currentTarget);

    if (distance <= HIT_TOLERANCE) {
      // Correct!
      cancelAnimationFrame(animRef.current);
      setFlashSuccess(true);
      setTimeout(() => setFlashSuccess(false), 300);

      const newConnected = [...connectedSlots];
      newConnected[currentSlotIndex] = true;
      setConnectedSlots(newConnected);

      const nextIndex = currentSlotIndex + 1;
      if (nextIndex >= SLOT_COUNT) {
        setPhase("won");
        return;
      }

      setCurrentSlotIndex(nextIndex);
      speedRef.current += SPEED_INCREMENT;
      pipeXRef.current = 5;
      directionRef.current = 1;
      setPipeX(5);

      // Resume after brief pause
      setTimeout(() => {
        animRef.current = requestAnimationFrame(animate);
      }, 400);
    } else {
      // Mistake
      setFlashError(true);
      setTimeout(() => setFlashError(false), 400);

      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= 3) {
        cancelAnimationFrame(animRef.current);
        setPhase("lost");
      }
    }
  }, [phase, currentTarget, connectedSlots, currentSlotIndex, mistakes, animate]);

  // Start/stop animation loop
  useEffect(() => {
    if (phase === "playing") {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, animate]);

  return {
    phase,
    mistakes,
    connectedSlots,
    currentSlotIndex,
    pipeX,
    flashError,
    flashSuccess,
    startGame,
    handleTap,
  };
}
