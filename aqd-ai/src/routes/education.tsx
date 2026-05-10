import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Scale, Building, RefreshCw, Quote } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { INSTRUMENTS } from "@/lib/instruments";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "How Islamic Finance Works — Aqd AI" },
      { name: "description", content: "Riba, Gharar, Maysir explained. Side-by-side comparisons of Mudarabah, Musharakah, Ijarah, Murabaha, Sukuk and Takaful." },
    ],
  }),
  component: EducationPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

function EducationPage() {
  const [activeKey, setActiveKey] = useState(INSTRUMENTS[0].key);
  const active = INSTRUMENTS.find(i => i.key === activeKey)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div {...fadeUp} className="max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight">How Islamic Finance Works</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Islamic finance isn't just conventional banking with Arabic names. The difference is structural — here's what that actually means.
          </p>
        </motion.div>

        {/* MYTH BUSTER */}
        <motion.section {...fadeUp} className="mt-14 bg-warm-surface border-l-4 border-gold rounded-r-2xl p-8 md:p-10">
          <Quote className="w-10 h-10 text-gold" />
          <p className="mt-4 font-serif text-2xl md:text-3xl italic leading-snug">
            "Islamic finance is just conventional banking with different terminology."
          </p>
          <p className="mt-5 text-sm font-semibold text-haram inline-flex items-center gap-2">
            <X className="w-4 h-4" /> This is the most common misconception — and it gets the logic entirely backwards.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed max-w-3xl">
            The difference is not cosmetic. Islamic finance restructures the relationship between capital, risk and return. Where conventional banking guarantees a return on lent money regardless of outcome, Islamic finance ties every return to real economic activity and shared risk.
          </p>
        </motion.section>

        {/* THREE PROHIBITIONS */}
        <section className="mt-20">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold">What Islamic finance prohibits — and why</motion.h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { name: "Riba", arabic: "ربا", subtitle: "Interest", body: "Any fixed, predetermined return on money. Money itself cannot generate profit — only productive economic effort can." },
              { name: "Gharar", arabic: "غرر", subtitle: "Excessive Uncertainty", body: "Contracts where key terms (price, subject, delivery) are ambiguous or unknown at signing. Both parties must have full clarity." },
              { name: "Maysir", arabic: "ميسر", subtitle: "Speculation / Gambling", body: "Zero-sum transactions not linked to real economic activity. Finance must be anchored to tangible assets or real services." },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border border-l-4 border-l-haram rounded-xl p-6 shadow-soft"
              >
                <div className="text-haram text-xs font-bold tracking-wider">PROHIBITED</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <span className="font-arabic text-xl text-gold">{p.arabic}</span>
                </div>
                <p className="text-sm font-semibold text-muted-foreground">{p.subtitle}</p>
                <p className="mt-4 text-foreground/80 leading-relaxed text-sm">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ROOT DIFFERENCE */}
        <section className="mt-20">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold">One structural difference that changes everything</motion.h2>
          <div className="mt-10 grid md:grid-cols-[1fr_auto_1fr] gap-5 items-stretch">
            <ComparisonCard
              tone="navy"
              title="Conventional Banking"
              points={[
                "Bank lends money and charges fixed interest",
                "Borrower bears all risk of loss",
                "Bank profits regardless of project outcome",
                "Relationship: creditor vs. debtor",
              ]}
            />
            <div className="hidden md:flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gold text-foreground font-serif font-bold text-lg flex items-center justify-center shadow-warm">VS</div>
            </div>
            <ComparisonCard
              tone="green"
              title="Islamic Banking"
              points={[
                "Bank invests in real assets or partnerships",
                "Risk is shared between parties",
                "Bank profits only when the venture succeeds",
                "Relationship: partner or co-owner",
              ]}
            />
          </div>
        </section>

        {/* INSTRUMENT EXPLORER */}
        <section className="mt-20">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold">Instrument by instrument comparison</motion.h2>
          <p className="mt-3 text-muted-foreground">Select a concept to see how it differs from its conventional equivalent.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {INSTRUMENTS.map(i => (
              <button
                key={i.key}
                onClick={() => setActiveKey(i.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeKey === i.key
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border text-foreground/70 hover:border-primary/40"
                }`}
              >
                {i.islamicName}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-8 grid md:grid-cols-2 gap-5"
            >
              {/* Conventional */}
              <div className="bg-navy/5 border border-navy/20 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-7 flex-1">
                  <span className="inline-block text-[10px] font-bold tracking-wider text-white bg-navy px-2.5 py-1 rounded-full">CONVENTIONAL</span>
                  <h3 className="mt-4 text-2xl font-bold">{active.conventionalName}</h3>
                  <p className="mt-3 text-foreground/80 leading-relaxed text-sm">{active.description.conventional}</p>
                  <ul className="mt-5 space-y-2.5">
                    {active.conventionalPoints.map(p => (
                      <li key={p} className="flex gap-2.5 items-start text-sm">
                        <X className="w-4 h-4 text-haram mt-0.5 flex-shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-haram/10 border-t border-haram/20 px-7 py-3 text-sm">
                  <span className="font-semibold text-haram">Shariah issue:</span>{" "}
                  <span className="text-foreground/80">{active.shariahIssue}</span>
                </div>
              </div>
              {/* Islamic */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-7 flex-1">
                  <span className="inline-block text-[10px] font-bold tracking-wider text-primary-foreground bg-primary px-2.5 py-1 rounded-full">ISLAMIC</span>
                  <div className="mt-4 flex items-baseline gap-3">
                    <h3 className="text-2xl font-bold">{active.islamicName}</h3>
                    <span className="font-arabic text-2xl text-gold">{active.arabic}</span>
                  </div>
                  <p className="mt-3 text-foreground/80 leading-relaxed text-sm">{active.description.islamic}</p>
                  <ul className="mt-5 space-y-2.5">
                    {active.islamicPoints.map(p => (
                      <li key={p} className="flex gap-2.5 items-start text-sm">
                        <Check className="w-4 h-4 text-halal mt-0.5 flex-shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-halal/10 border-t border-halal/20 px-7 py-3 text-sm">
                  <span className="font-semibold text-halal">Ruling:</span>{" "}
                  <span className="text-foreground/80">{active.ruling}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* SCENARIO */}
        <section className="mt-20">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold">Same situation. Structurally different outcomes.</motion.h2>
          <motion.div {...fadeUp} className="mt-8 bg-warm-surface border border-border rounded-2xl p-7 leading-relaxed">
            <p className="text-foreground/80">
              <strong className="text-foreground">Ali</strong> runs a textile business in Lahore. He financed PKR 5 million in machinery. Six months in, flooding reduces revenue by <strong>60%</strong>.
            </p>
          </motion.div>
          <div className="mt-5 grid md:grid-cols-2 gap-5">
            <ScenarioCard
              tone="navy"
              title="Under a conventional bank loan"
              points={[
                "Interest continues to accrue and compound",
                "Late-payment penalties stack on top",
                "Bank can seize collateral regardless of cause",
                "Ali bears 100% of the loss",
              ]}
            />
            <ScenarioCard
              tone="green"
              title="Under a Musharakah arrangement"
              points={[
                "Bank shares the loss in proportion to capital",
                "No compounding penalties — debt does not grow",
                "Bank is incentivised to help recovery, not foreclose",
                "Risk is shared, not transferred",
              ]}
            />
          </div>
        </section>

        {/* THREE PILLARS */}
        <section className="mt-20">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold">Every valid Islamic contract must have these three qualities</motion.h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { icon: Scale, title: "Certainty of terms", subtitle: "no Gharar", body: "Price, quality, delivery and obligations must be fully defined at the moment of signing." },
              { icon: Building, title: "Real asset backing", subtitle: "tangible substance", body: "Finance must be tied to tangible assets or real services — not pure money-on-money exchange." },
              { icon: RefreshCw, title: "Shared risk", subtitle: "Al-ghunm bil-ghurm", body: "Profit entitlement requires real risk exposure. No reward without responsibility." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 shadow-soft"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
                <p className="text-xs font-semibold text-gold tracking-wider uppercase mt-1">{p.subtitle}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          {...fadeUp}
          className="mt-20 rounded-3xl p-10 md:p-14 text-center text-white"
          style={{ background: "var(--gradient-hero)" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready to check your contracts?</h2>
          <p className="mt-4 text-white/85 max-w-xl mx-auto">
            Use Aqd AI's scanner to check if your business agreements contain any of these prohibited elements.
          </p>
          <Link to="/scanner" className="mt-7 inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3.5 rounded-lg hover:bg-white/90 shadow-lg">
            Scan a Contract <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
}

function ComparisonCard({ tone, title, points }: { tone: "navy" | "green"; title: string; points: string[] }) {
  const isNavy = tone === "navy";
  return (
    <div className={`rounded-2xl p-7 border ${isNavy ? "bg-navy/5 border-navy/20" : "bg-primary/5 border-primary/20"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isNavy ? "bg-navy text-white" : "bg-primary text-primary-foreground"}`}>
          <Building className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ul className="mt-5 space-y-3">
        {points.map(p => (
          <li key={p} className="flex gap-2.5 items-start text-sm leading-relaxed">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isNavy ? "bg-navy" : "bg-primary"}`} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScenarioCard({ tone, title, points }: { tone: "navy" | "green"; title: string; points: string[] }) {
  const isNavy = tone === "navy";
  return (
    <div className={`rounded-2xl p-7 border ${isNavy ? "bg-navy/5 border-navy/20" : "bg-primary/5 border-primary/20"}`}>
      <h3 className={`text-lg font-bold ${isNavy ? "text-navy" : "text-primary"}`}>{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {points.map(p => (
          <li key={p} className="flex gap-2.5 items-start text-sm">
            {isNavy ? <X className="w-4 h-4 text-haram mt-0.5 flex-shrink-0" /> : <Check className="w-4 h-4 text-halal mt-0.5 flex-shrink-0" />}
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
