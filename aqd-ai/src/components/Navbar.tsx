import { Link } from "@tanstack/react-router";
import { Scale, Lock } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Scale className="w-5 h-5 text-primary" strokeWidth={2.2} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-foreground">Aqd AI</span>
            <span className="font-arabic text-base text-gold">عقد</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/scanner"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Scanner
          </Link>
          <Link
            to="/education"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            How It Works
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            <Lock className="w-3 h-3" />
            Privacy-First · Zero Data Retention
          </span>
          <Link
            to="/scanner"
            className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Try Scanner
          </Link>
        </div>
      </nav>
    </header>
  );
}
