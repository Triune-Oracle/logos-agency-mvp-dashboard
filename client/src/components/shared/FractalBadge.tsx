import { Badge } from "@/components/ui/badge";
import { logosAgencyMVPCapsule } from "@/lib/fractal-compressor";

/**
 * FractalBadge Component
 * Displays the project's fractal glyph and validation status
 * Minimalist Brutalism: Raw, honest display of project state
 */
export function FractalBadge() {
  const capsule = logosAgencyMVPCapsule;

  return (
    <div className="flex flex-col gap-2">
      <Badge variant="outline" className="w-fit border-accent text-accent">
        {capsule.glyph}
      </Badge>
      <p className="text-xs text-muted-foreground font-mono">
        Compression Ratio: {(capsule.meta_compression.pattern_proven ? "Multi-hour" : "Standard")} → Single Artifact
      </p>
    </div>
  );
}
