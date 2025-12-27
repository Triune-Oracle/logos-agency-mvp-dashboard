import { Badge } from "@/components/ui/badge";

interface RealTimeIndicatorProps {
  isActive?: boolean;
  label?: string;
}

/**
 * RealTimeIndicator Component
 * Shows live collaboration and real-time sync status
 * Minimalist Brutalism: Subtle animated indicator with cyan accent
 */
export function RealTimeIndicator({ isActive = true, label = "Live" }: RealTimeIndicatorProps) {
  return (
    <Badge 
      className={`flex items-center gap-2 ${
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "bg-muted text-muted-foreground"
      }`}
    >
      <span 
        className={`w-2 h-2 rounded-full ${
          isActive ? "bg-accent-foreground animate-pulse" : "bg-muted-foreground"
        }`}
      />
      {label}
    </Badge>
  );
}
