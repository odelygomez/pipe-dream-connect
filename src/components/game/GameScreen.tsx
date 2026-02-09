import GameArea from "./GameArea";

interface GameScreenProps {
  mistakes: number;
  connectedSlots: boolean[];
  currentSlotIndex: number;
  pipeX: number;
  flashError: boolean;
  flashSuccess: boolean;
  onTap: () => void;
}

const DropIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 28" className={`w-5 h-7 ${filled ? "fill-water" : "fill-muted"}`}>
    <path d="M10 0 Q10 0 10 0 C4 10 0 16 0 20 A10 10 0 0 0 20 20 C20 16 16 10 10 0Z" />
  </svg>
);

export default function GameScreen({
  mistakes,
  connectedSlots,
  currentSlotIndex,
  pipeX,
  flashError,
  flashSuccess,
  onTap,
}: GameScreenProps) {
  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-background select-none cursor-pointer"
      onClick={onTap}
      onTouchStart={(e) => {
        e.preventDefault();
        onTap();
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">
          {connectedSlots.filter(Boolean).length} / 5
        </span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <DropIcon key={i} filled={i >= mistakes} />
          ))}
        </div>
      </div>

      {/* Game area */}
      <div className="flex-1 flex items-center justify-center px-4">
        <GameArea
          connectedSlots={connectedSlots}
          currentSlotIndex={currentSlotIndex}
          pipeX={pipeX}
          flashError={flashError}
          flashSuccess={flashSuccess}
          showWaterFlow={false}
        />
      </div>

      {/* Tap hint */}
      <div className="text-center pb-6">
        <p className="text-sm text-muted-foreground animate-pulse">Tap when aligned!</p>
      </div>
    </div>
  );
}
