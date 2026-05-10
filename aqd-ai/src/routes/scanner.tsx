import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileUp, Lock, FileText, Download, Scale, CheckCircle2, AlertCircle, RotateCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { analyzeContract, SAMPLE_CONTRACT, type AnalysisResult, type ViolationType } from "@/lib/analyzeContract";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Scanner — Aqd AI Shariah Compliance" },
      { name: "description", content: "Upload a contract and scan clause-by-clause for Riba, Gharar and Maysir." },
    ],
  }),
  component: ScannerPage,
});

type Filter = "all" | "flagged" | "compliant";
type Stage = "idle" | "loading" | "done" | "error";

function ScannerPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [filename, setFilename] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [loadingStep, setLoadingStep] = useState(0);

  const startAnalysis = async (text: string, name: string, file?: File) => {
    setFilename(name);
    setStage("loading");
    setLoadingStep(0);
    const stepTimer = setInterval(() => setLoadingStep((s) => Math.min(s + 1, 2)), 700);
    try {
      const r = await analyzeContract({ contractText: text, file });
      clearInterval(stepTimer);
      setResult(r);
      setStage("done");
    } catch {
      clearInterval(stepTimer);
      setStage("error");
    }
  };

  const handleFile = async (file: File) => {
    let text = "";
    if (file.type === "text/plain") {
      text = await file.text();
    }
    startAnalysis(text, file.name, file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setStage("idle");
    setResult(null);
    setFilename("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Shariah Compliance Scanner</h1>
            <p className="mt-2 text-muted-foreground">Upload a contract to scan for Riba, Gharar, and Maysir.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            <Lock className="w-3 h-3" /> Zero Data Retention — your document is never stored
          </span>
        </div>

        <div className="mt-8">
          {stage === "idle" && <UploadZone onFile={handleFile} onDemo={() => startAnalysis(SAMPLE_CONTRACT, "sample-service-agreement.pdf")} />}
          {stage === "loading" && <LoadingState step={loadingStep} />}
          {stage === "error" && (
            <div className="bg-card border border-border rounded-xl p-10 text-center shadow-soft">
              <AlertCircle className="w-10 h-10 text-haram mx-auto" />
              <h3 className="mt-4 text-xl font-bold">Analysis failed</h3>
              <p className="mt-2 text-muted-foreground">Something went wrong. Please try again.</p>
              <button onClick={reset} className="mt-5 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold">
                <RotateCw className="w-4 h-4" /> Retry
              </button>
            </div>
          )}
          {stage === "done" && result && (
            <ResultView result={result} filename={filename} filter={filter} setFilter={setFilter} onReset={reset} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function UploadZone({ onFile, onDemo }: { onFile: (f: File) => void; onDemo: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
        className="block border-2 border-dashed border-primary/40 bg-warm-surface rounded-2xl p-16 text-center cursor-pointer hover:bg-primary/5 transition-colors"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <FileUp className="w-8 h-8 text-primary" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">Drop your contract here</h3>
        <p className="mt-2 text-muted-foreground">Supports PDF and Word (.docx) — Max 10MB</p>
        <span className="mt-6 inline-flex items-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold">
          Browse files
        </span>
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
        />
      </label>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>Documents are processed in-session only. No data is stored on our servers.</span>
        <button onClick={onDemo} className="text-primary font-semibold hover:underline">
          Try with sample contract →
        </button>
      </div>
    </motion.div>
  );
}

function LoadingState({ step }: { step: number }) {
  const steps = ["Extracting text and clauses", "Retrieving Shariah principles", "Generating compliance analysis"];
  return (
    <div className="bg-card border border-border rounded-2xl p-16 text-center shadow-soft">
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <Scale className="w-16 h-16 text-primary mx-auto" />
      </motion.div>
      <h3 className="mt-6 text-2xl font-bold">Analyzing your contract...</h3>
      <div className="mt-8 max-w-md mx-auto space-y-3 text-left">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-3 p-3 rounded-lg ${i === step ? "bg-primary/10" : i < step ? "opacity-60" : "opacity-40"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < step ? "bg-primary text-white" : i === step ? "bg-primary/30" : "bg-muted"}`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className="text-sm font-medium">{s}</span>
            {i === step && <span className="ml-auto text-xs text-primary animate-pulse">working…</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

const TYPE_STYLES: Record<ViolationType, { bg: string; border: string; pill: string; label: string }> = {
  RIBA: { bg: "bg-haram/10", border: "border-haram", pill: "bg-haram text-white", label: "RIBA" },
  GHARAR: { bg: "bg-gold/15", border: "border-gold", pill: "bg-gold text-foreground", label: "GHARAR" },
  MAYSIR: { bg: "bg-[#6b2c9b]/10", border: "border-[#6b2c9b]", pill: "bg-[#6b2c9b] text-white", label: "MAYSIR" },
  COMPLIANT: { bg: "bg-halal/10", border: "border-halal", pill: "bg-halal text-white", label: "COMPLIANT" },
};

function ResultView({ result, filename, filter, setFilter, onReset }: {
  result: AnalysisResult; filename: string; filter: Filter; setFilter: (f: Filter) => void; onReset: () => void;
}) {
  const visibleFindings = useMemo(() => {
    if (filter === "all") return result.findings;
    if (filter === "compliant") return result.findings.filter(f => f.type === "COMPLIANT");
    return result.findings.filter(f => f.type !== "COMPLIANT");
  }, [filter, result]);

  const renderedDoc = useMemo(() => renderDocument(result), [result]);

  if (result.summary.violations === 0 && result.summary.uncertain === 0) {
    return (
      <div className="bg-halal/10 border border-halal/30 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-halal mx-auto" />
        <h3 className="mt-4 text-2xl font-bold">No violations found</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          This contract appears Shariah-compliant based on our analysis. We recommend a final review by a qualified scholar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* LEFT: Document */}
      <div className="lg:col-span-3 bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-warm-surface">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-medium text-sm truncate">{filename}</span>
          </div>
          <button onClick={onReset} className="text-xs text-muted-foreground hover:text-primary">New scan</button>
        </div>
        <div className="px-5 py-3 border-b border-border flex gap-2 flex-wrap">
          {(["all", "flagged", "compliant"] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"}`}
            >
              {f === "all" ? "All Clauses" : f === "flagged" ? "Flagged Only" : "Compliant Only"}
            </button>
          ))}
        </div>
        <div className="p-6 max-h-[700px] overflow-y-auto space-y-3 text-sm leading-relaxed text-foreground/90">
          {renderedDoc.map((block, i) => {
            if (block.kind === "text") {
              return <p key={i} className="whitespace-pre-wrap">{block.text}</p>;
            }
            const finding = block.finding;
            if (filter === "flagged" && finding.type === "COMPLIANT") return null;
            if (filter === "compliant" && finding.type !== "COMPLIANT") return null;
            const style = TYPE_STYLES[finding.type];
            return (
              <div key={i} className={`${style.bg} border-l-4 ${style.border} rounded-r-lg px-4 py-3`}>
                <span className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold ${style.pill} rounded-full mr-2`}>
                  {finding.id}
                </span>
                <span className="italic">{finding.clauseText}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Analysis */}
      <div className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Tile color="haram" value={result.summary.violations} label="Violations Found" />
          <Tile color="gold" value={result.summary.uncertain} label="Uncertain Clauses" />
          <Tile color="halal" value={result.summary.compliant} label="Compliant Clauses" />
        </div>
        <div className="space-y-3">
          <AnimatePresence>
            {visibleFindings.map((f) => {
              const style = TYPE_STYLES[f.type];
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-card border border-border rounded-xl p-5 shadow-soft"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold ${style.pill} rounded-full`}>{f.id}</span>
                    <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${style.pill}`}>{style.label}</span>
                  </div>
                  <blockquote className={`border-l-2 ${style.border} pl-3 italic text-sm text-foreground/80`}>
                    "{f.clauseText}"
                  </blockquote>
                  {f.type !== "COMPLIANT" && (
                    <>
                      <h4 className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Why this is non-compliant</h4>
                      <p className="mt-1 text-sm leading-relaxed">{f.explanation}</p>
                    </>
                  )}
                  <h4 className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Islamic principle</h4>
                  <p className="mt-1 text-sm font-semibold">{f.principleName}</p>
                  <p className="text-sm text-muted-foreground">{f.principleDescription}</p>
                  <p className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">Source: {f.source}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <button className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-lg hover:bg-primary/90 inline-flex items-center justify-center gap-2 shadow-soft">
          <Download className="w-4 h-4" /> Download Full Report
        </button>
      </div>
    </div>
  );
}

function Tile({ color, value, label }: { color: "haram" | "gold" | "halal"; value: number; label: string }) {
  const cls = color === "haram" ? "bg-haram/10 text-haram" : color === "gold" ? "bg-gold/15 text-foreground" : "bg-halal/10 text-halal";
  return (
    <div className={`${cls} rounded-xl p-4 text-center`}>
      <div className="text-3xl font-bold font-serif">{value}</div>
      <div className="text-[11px] font-medium mt-1 opacity-80">{label}</div>
    </div>
  );
}

type Block = { kind: "text"; text: string } | { kind: "finding"; finding: AnalysisResult["findings"][number] };

function renderDocument(result: AnalysisResult): Block[] {
  let remaining = result.contractText;
  const blocks: Block[] = [];
  // Sort findings by occurrence in text
  const indexed = result.findings
    .map(f => ({ f, idx: result.contractText.indexOf(f.clauseText) }))
    .filter(x => x.idx >= 0)
    .sort((a, b) => a.idx - b.idx);

  let cursor = 0;
  for (const { f, idx } of indexed) {
    if (idx > cursor) {
      blocks.push({ kind: "text", text: result.contractText.slice(cursor, idx) });
    }
    blocks.push({ kind: "finding", finding: f });
    cursor = idx + f.clauseText.length;
  }
  if (cursor < result.contractText.length) {
    blocks.push({ kind: "text", text: result.contractText.slice(cursor) });
  }
  if (blocks.length === 0) blocks.push({ kind: "text", text: remaining });
  return blocks;
}
