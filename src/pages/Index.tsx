import { useGameState } from "@/hooks/useGameState";
import StartScreen from "@/components/game/StartScreen";
import GameScreen from "@/components/game/GameScreen";
import WinScreen from "@/components/game/WinScreen";
import LoseScreen from "@/components/game/LoseScreen";

const Index = () => {
  const {
    phase,
    mistakes,
    connectedSlots,
    currentSlotIndex,
    pipeX,
    flashError,
    flashSuccess,
    startGame,
    handleTap,
  } = useGameState();

  switch (phase) {
    case "start":
      return <StartScreen onPlay={startGame} />;
    case "playing":
      return (
        <GameScreen
          mistakes={mistakes}
          connectedSlots={connectedSlots}
          currentSlotIndex={currentSlotIndex}
          pipeX={pipeX}
          flashError={flashError}
          flashSuccess={flashSuccess}
          onTap={handleTap}
        />
      );
    case "won":
      return <WinScreen connectedSlots={connectedSlots} onPlayAgain={startGame} />;
    case "lost":
      return <LoseScreen onRetry={startGame} />;
  }
};

export default Index;
