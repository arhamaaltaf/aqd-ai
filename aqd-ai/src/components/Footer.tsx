import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-warm-surface mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-serif text-xl font-bold">Aqd AI</span>
              <span className="font-arabic text-gold">عقد</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Shariah compliance powered by AI.
            </p>
          </div>
          <div className="flex md:justify-center gap-6 text-sm">
            <Link to="/scanner" className="text-foreground/70 hover:text-primary">Scanner</Link>
            <Link to="/education" className="text-foreground/70 hover:text-primary">How It Works</Link>
          </div>
          <div className="md:text-right text-xs text-muted-foreground">
            Built as part of Islamic Banking & Finance coursework — IBA Karachi
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          This tool is for educational and awareness purposes. Always consult a qualified Shariah scholar for binding rulings.
        </div>
      </div>
    </footer>
  );
}
