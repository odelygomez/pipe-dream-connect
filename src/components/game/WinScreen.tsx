import { Button } from "@/components/ui/button";
import GameArea from "./GameArea";

interface WinScreenProps {
  connectedSlots: boolean[];
  onPlayAgain: () => void;
}

export default function WinScreen({ connectedSlots, onPlayAgain }: WinScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 bg-background">
      <div className="w-full max-w-sm mb-6">
        <GameArea
          connectedSlots={connectedSlots}
          currentSlotIndex={5}
          pipeX={50}
          flashError={false}
          flashSuccess={false}
          showWaterFlow={true}
        />
      </div>

      <h2 className="text-2xl font-bold text-foreground text-center mb-2">
        Clean water is flowing.
      </h2>
      <p className="text-lg text-water font-semibold mb-1">
        You helped connect a community.
      </p>
      <p className="text-sm text-muted-foreground text-center max-w-xs mb-8">
        663 million people lack clean water. You can help.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          asChild
          className="bg-water text-water-foreground hover:bg-water/90 rounded-full py-5 font-bold"
        >
          <a href="https://www.charitywater.org" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Button>
        <Button
          onClick={onPlayAgain}
          variant="outline"
          className="rounded-full py-5 font-bold"
        >
          Play Again
        </Button>
      </div>
    </div>
  );
}
