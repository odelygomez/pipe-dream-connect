import { SLOT_POSITIONS, type SlotPosition } from "@/hooks/useGameState";

interface GameAreaProps {
  connectedSlots: boolean[];
  currentSlotIndex: number;
  pipeX: number;
  flashError: boolean;
  flashSuccess: boolean;
  showWaterFlow: boolean;
}

const WaterSource = () => (
  <g transform="translate(20, 30)">
    <circle r="18" className="fill-water/20" />
    <path d="M0,-12 Q4,-6 0,0 Q-4,6 0,12" className="stroke-water" strokeWidth="3" fill="none" />
    <circle r="3" cy="-14" className="fill-water" />
  </g>
);

const Village = () => (
  <g transform="translate(310, 250)">
    <rect x="-20" y="-15" width="18" height="20" rx="1" className="fill-foreground/70" />
    <polygon points="-20,-15 -11,-25 -2,-15" className="fill-foreground/50" />
    <rect x="5" y="-12" width="14" height="17" rx="1" className="fill-foreground/60" />
    <polygon points="5,-12 12,-20 19,-12" className="fill-foreground/40" />
    <rect x="-7" y="0" width="5" height="5" rx="0.5" className="fill-primary/60" />
  </g>
);

const PipeSlot = ({ pos, connected, index }: { pos: SlotPosition; connected: boolean; index: number }) => {
  const svgX = (pos.x / 100) * 360;
  const svgY = (pos.y / 100) * 300;
  return (
    <g transform={`translate(${svgX}, ${svgY})`}>
      <rect
        x="-18" y="-8" width="36" height="16" rx="3"
        className={connected ? "fill-water" : "fill-muted stroke-border"}
        strokeWidth={connected ? 0 : 1.5}
        strokeDasharray={connected ? "0" : "4 3"}
      />
      {connected && (
        <rect x="-14" y="-4" width="28" height="8" rx="2" className="fill-water" opacity="0.6" />
      )}
    </g>
  );
};

// Lines connecting slots
const PipePath = ({ connectedSlots, showWaterFlow }: { connectedSlots: boolean[]; showWaterFlow: boolean }) => {
  const points = SLOT_POSITIONS.map(p => ({
    x: (p.x / 100) * 360,
    y: (p.y / 100) * 300,
  }));

  const sourcePoint = { x: 20, y: 30 };
  const villagePoint = { x: 310, y: 250 };
  const allPoints = [sourcePoint, ...points, villagePoint];

  const pathD = allPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <>
      <path d={pathD} stroke="hsl(var(--border))" strokeWidth="3" fill="none" strokeDasharray="6 4" opacity="0.4" />
      {showWaterFlow && (
        <path d={pathD} stroke="hsl(var(--water))" strokeWidth="4" fill="none" className="animate-water-flow" />
      )}
    </>
  );
};

const MovingPipe = ({
  currentSlotIndex,
  pipeX,
  flashError,
  flashSuccess,
}: {
  currentSlotIndex: number;
  pipeX: number;
  flashError: boolean;
  flashSuccess: boolean;
}) => {
  const targetY = SLOT_POSITIONS[currentSlotIndex]
    ? (SLOT_POSITIONS[currentSlotIndex].y / 100) * 300
    : 150;
  const svgX = (pipeX / 100) * 360;

  let fillClass = "fill-primary";
  if (flashError) fillClass = "fill-destructive";
  if (flashSuccess) fillClass = "fill-water";

  return (
    <g transform={`translate(${svgX}, ${targetY})`}>
      <rect x="-18" y="-8" width="36" height="16" rx="3" className={fillClass} />
      <rect x="-12" y="-4" width="24" height="8" rx="2" className="fill-primary-foreground" opacity="0.3" />
    </g>
  );
};

export default function GameArea({
  connectedSlots,
  currentSlotIndex,
  pipeX,
  flashError,
  flashSuccess,
  showWaterFlow,
}: GameAreaProps) {
  return (
    <svg viewBox="0 0 360 300" className="w-full max-w-sm mx-auto">
      <PipePath connectedSlots={connectedSlots} showWaterFlow={showWaterFlow} />
      <WaterSource />
      <Village />
      {SLOT_POSITIONS.map((pos, i) => (
        <PipeSlot key={i} pos={pos} connected={connectedSlots[i]} index={i} />
      ))}
      {!showWaterFlow && currentSlotIndex < 5 && (
        <MovingPipe
          currentSlotIndex={currentSlotIndex}
          pipeX={pipeX}
          flashError={flashError}
          flashSuccess={flashSuccess}
        />
      )}
    </svg>
  );
}
