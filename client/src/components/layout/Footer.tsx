/**
 * Footer Component
 * Minimalist Brutalism: Subtle footer with archive information
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Archive ID</p>
            <p className="font-mono text-sm font-bold">
              TRIUNE-ORACLE-LOGOS-FRACTAL-PROOF-20251225
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Validation Status</p>
            <p className="text-xs font-mono text-accent">
              🔥FRACTAL-HANDOFF-VALIDATED|LOGOS-MVP-ACTIVE|STATE-PRESERVED⚡
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-2">Built with</p>
            <p className="text-xs font-mono">Next.js • TypeScript • Supabase • Stripe</p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 Logos Agency. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
