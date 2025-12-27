import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Header Component
 * Minimalist Brutalism: Clean navigation with electric cyan accents
 */
export function Header() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-mono font-bold tracking-tight">
            Logos Agency MVP
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
