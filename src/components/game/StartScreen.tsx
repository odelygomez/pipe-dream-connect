import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onPlay: () => void;
}

const JerryCanIcon = () => (
  <svg viewBox="0 0 64 80" className="w-16 h-20 mx-auto mb-4" fill="none">
    <rect x="12" y="20" width="40" height="55" rx="4" className="fill-primary" />
    <rect x="22" y="10" width="20" height="14" rx="2" className="fill-primary" />
    <rect x="28" y="4" width="8" height="10" rx="2" className="stroke-primary" strokeWidth="2" fill="none" />
    <rect x="20" y="38" width="24" height="20" rx="2" className="fill-primary-foreground" opacity="0.3" />
  </svg>
);

export default function StartScreen({ onPlay }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 bg-background">
      <JerryCanIcon />
      <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
        charity: water
      </p>
      <h1 className="text-4xl font-bold text-foreground mb-4">Pipe Connect</h1>
      <p className="text-muted-foreground text-center max-w-xs mb-10 leading-relaxed">
        Tap when the pipe is aligned to connect clean water to a village
      </p>
      <Button
        onClick={onPlay}
        className="px-10 py-6 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
      >
        Play
      </Button>
    </div>
  );
}
