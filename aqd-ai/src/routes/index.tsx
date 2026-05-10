import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, BookOpen, MapPin, Upload, Search, FileText, ArrowRight, Lock, Briefcase, Building2, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aqd AI — AI Shariah Compliance Scanner for Contracts" },
      { name: "description", content: "Scan business contracts for Riba, Gharar and Maysir. Privacy-first, AAOIFI-grounded Shariah analysis built for Pakistani freelancers and SMEs." },
      { property: "og:title", content: "Aqd AI — AI Shariah Compliance Scanner" },
      { property: "og:description", content: "Clause-level Shariah analysis of your business contracts." },
    ],
  }),
  component: Index,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 text-white">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 rounded-full">
              <span className="font-arabic text-gold">عقد</span>
              <span className="text-white/70">· AI for your contracts</span>
            </span>
            <h1 className="mt-6 font-serif text-5xl md:text-[52px] leading-[1.05] font-bold">
              Does your contract contain hidden <em className="text-gold not-italic">Riba</em>?
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              Upload any business contract — service agreement, lease, or terms of service — and Aqd AI's AI will scan it for Riba, Gharar, and Maysir clause by clause. Your documents never leave your session.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/scanner" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3.5 rounded-lg hover:bg-white/90 transition-all shadow-lg">
                Scan a Contract <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/education" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-white/10 transition-all">
                How Islamic Finance Works
              </Link>
            </div>
            <p className="mt-6 text-sm text-gold flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> Zero data retention · Clause-level analysis · AAOIFI-grounded
            </p>
          </motion.div>

          {/* Mockup preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-warm-surface">
                <div className="w-3 h-3 rounded-full bg-haram/40" />
                <div className="w-3 h-3 rounded-full bg-gold/50" />
                <div className="w-3 h-3 rounded-full bg-halal/40" />
                <span className="ml-3 text-xs text-muted-foreground">service-agreement.pdf</span>
              </div>
              <div className="grid grid-cols-5 min-h-[280px]">
                <div className="col-span-3 p-6 space-y-2 text-xs text-foreground/80 leading-relaxed border-r border-border">
                  <p>1. Scope of Work. The Contractor shall deliver...</p>
                  <p className="bg-haram/10 border-l-2 border-haram px-2 py-1.5 rounded">
                    <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] bg-haram text-white rounded-full mr-2">1</span>
                    a financing charge of 2.5% per month shall accrue, compounded monthly...
                  </p>
                  <p>4. Performance Bonus. Upon successful completion...</p>
                  <p className="bg-gold/15 border-l-2 border-gold px-2 py-1.5 rounded">
                    <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] bg-gold text-foreground rounded-full mr-2">2</span>
                    determined at the sole discretion of the Client...
                  </p>
                  <p className="bg-halal/10 border-l-2 border-halal px-2 py-1.5 rounded">
                    <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] bg-halal text-white rounded-full mr-2">3</span>
                    Either party may terminate with thirty (30) days notice...
                  </p>
                </div>
                <div className="col-span-2 p-5 bg-warm-surface space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-haram/10 rounded-lg p-2 text-center"><div className="text-lg font-bold text-haram">2</div><div className="text-[10px] text-haram/80">Violations</div></div>
                    <div className="bg-gold/15 rounded-lg p-2 text-center"><div className="text-lg font-bold text-foreground">2</div><div className="text-[10px] text-foreground/70">Uncertain</div></div>
                    <div className="bg-halal/10 rounded-lg p-2 text-center"><div className="text-lg font-bold text-halal">2</div><div className="text-[10px] text-halal/80">Compliant</div></div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <span className="inline-block text-[10px] font-bold text-white bg-haram px-2 py-0.5 rounded-full">RIBA</span>
                    <p className="mt-2 text-[11px] text-foreground/70 leading-relaxed">Compounding late fee constitutes Riba al-Nasi'ah.</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <span className="inline-block text-[10px] font-bold text-foreground bg-gold px-2 py-0.5 rounded-full">GHARAR</span>
                    <p className="mt-2 text-[11px] text-foreground/70 leading-relaxed">Bonus left to unilateral discretion creates uncertainty.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 {...fadeUp} className="text-4xl font-bold text-center max-w-2xl mx-auto">
          What Aqd AI does differently
        </motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Privacy-first scanning", body: "Unlike public AI tools, Aqd AI processes your contracts through a zero-data-retention API. Your confidential business documents are never stored or used for model training." },
            { icon: BookOpen, title: "Clause-level explanation", body: "Aqd AI doesn't just flag issues — it explains which Islamic finance principle is being violated and why, citing the relevant Shariah rule." },
            { icon: MapPin, title: "Built for Pakistan", body: "Trained on common contract structures used by Pakistani freelancers, SMEs, and entrepreneurs. Understands local terminology and common clause patterns." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-7 shadow-soft hover:shadow-warm transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="bg-warm-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold leading-tight">
              Built for Pakistani freelancers and SMEs
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                { icon: Briefcase, text: "Freelancers reviewing client contracts from international platforms" },
                { icon: Building2, text: "Small business owners signing service agreements or leases" },
                { icon: Users, text: "Entrepreneurs reviewing vendor or supplier terms" },
              ].map((item) => (
                <li key={item.text} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="pt-2 text-foreground/80 leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-3xl" style={{ background: "var(--gradient-hero)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/95 rounded-2xl p-6 shadow-xl rotate-[-6deg]">
                    <FileText className="w-12 h-12 text-primary" />
                  </div>
                  <div className="bg-white/95 rounded-2xl p-6 shadow-xl rotate-[6deg] mt-8">
                    <Shield className="w-12 h-12 text-gold" />
                  </div>
                  <div className="bg-white/95 rounded-2xl p-6 shadow-xl rotate-[6deg]">
                    <BookOpen className="w-12 h-12 text-navy" />
                  </div>
                  <div className="bg-white/95 rounded-2xl p-6 shadow-xl rotate-[-6deg] mt-8">
                    <Lock className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 {...fadeUp} className="text-4xl font-bold text-center">Three steps to Shariah clarity</motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
          {[
            { icon: Upload, n: "01", title: "Upload your contract", body: "PDF or Word document, processed locally in your session." },
            { icon: Search, n: "02", title: "AI scans every clause", body: "Each clause is checked against a curated database of AAOIFI standards and Shariah principles." },
            { icon: FileText, n: "03", title: "Get a full compliance report", body: "Flagged clauses are highlighted with explanations. Download your report." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative bg-card border border-border rounded-xl p-7 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="font-serif text-3xl text-gold/70">{s.n}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{s.body}</p>
              {i < 2 && <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-border z-10" />}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
