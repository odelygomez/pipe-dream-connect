import { Button } from "@/components/ui/button";

interface LoseScreenProps {
  onRetry: () => void;
}

export default function LoseScreen({ onRetry }: LoseScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 bg-background">
      <div className="text-5xl mb-6">💧</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">So close!</h2>
      <p className="text-muted-foreground text-center max-w-xs mb-8">
        Every drop counts. Give it another try to connect clean water to the village.
      </p>
      <Button
        onClick={onRetry}
        className="px-10 py-5 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Try Again
      </Button>
    </div>
  );
}
