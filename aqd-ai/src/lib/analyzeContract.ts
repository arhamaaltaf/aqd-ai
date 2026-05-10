export type ViolationType = "RIBA" | "GHARAR" | "MAYSIR" | "COMPLIANT";

export interface Finding {
  id: number;
  type: ViolationType;
  clauseText: string;
  explanation: string;
  principleName: string;
  principleDescription: string;
  source: string;
}

export interface AnalysisResult {
  contractText: string;
  findings: Finding[];
  summary: {
    violations: number;
    uncertain: number;
    compliant: number;
    text?: string;
    chunksScanned?: number;
    relevantChunks?: number;
  };
}

export const SAMPLE_CONTRACT = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is made between Horizon Tech (Pvt) Ltd, a Pakistani company ("Client"), and the undersigned independent contractor ("Contractor") for the provision of software development services.

1. Scope of Work. The Contractor shall deliver a customer-facing web application as described in Annexure A, with milestones to be agreed upon during project kickoff.

2. Compensation. The Client shall pay the Contractor PKR 450,000 per month, payable within 15 days of invoice receipt.

3. Late Payment. In the event that any invoice remains unpaid beyond the 15-day window, a financing charge of 2.5% per month shall accrue on the outstanding balance, compounded monthly, until the amount is paid in full.

4. Performance Bonus. Upon successful project completion, the Contractor shall be entitled to a performance bonus, the amount of which shall be determined at the sole discretion of the Client based on overall satisfaction.

5. Speculative Equity. In lieu of partial cash compensation, the Contractor may elect to receive future equity tokens whose value shall be determined by the eventual market price upon listing, with no guaranteed conversion ratio.

6. Intellectual Property. All deliverables, source code and associated intellectual property shall vest exclusively with the Client upon receipt of full payment for the relevant milestone.

7. Confidentiality. Both parties agree to maintain the confidentiality of all proprietary information disclosed under this Agreement for a period of three (3) years from termination.

8. Termination. Either party may terminate this Agreement with thirty (30) days written notice. Upon termination, the Client shall pay all undisputed amounts owed for work completed.`;

const MOCK_RESULT: AnalysisResult = {
  contractText: SAMPLE_CONTRACT,
  summary: { violations: 2, uncertain: 2, compliant: 2 },
  findings: [
    {
      id: 1,
      type: "RIBA",
      clauseText:
        "a financing charge of 2.5% per month shall accrue on the outstanding balance, compounded monthly, until the amount is paid in full.",
      explanation:
        "This clause imposes a fixed, predetermined and compounding charge on a delayed payment. Such a charge is a textbook example of Riba al-Nasi'ah — interest on a deferred debt — which is strictly prohibited regardless of whether it is framed as a 'financing charge' or 'late fee'.",
      principleName: "Prohibition of Riba (ربا)",
      principleDescription:
        "Money owed cannot generate additional money simply due to the passage of time.",
      source: "AAOIFI Shariah Standard No. 3 — Default in Payment by a Debtor",
    },
    {
      id: 2,
      type: "GHARAR",
      clauseText:
        "milestones to be agreed upon during project kickoff.",
      explanation:
        "Key terms of the deliverables — scope, timing, and acceptance criteria — are deferred to a later, undefined moment. This creates excessive uncertainty (Gharar) about the subject matter of the contract at the time of signing.",
      principleName: "Avoidance of Gharar (غرر)",
      principleDescription:
        "All material terms of an Islamic contract must be known with reasonable clarity at signing.",
      source: "AAOIFI Shariah Standard No. 31 — Controls on Gharar",
    },
    {
      id: 3,
      type: "GHARAR",
      clauseText:
        "the amount of which shall be determined at the sole discretion of the Client based on overall satisfaction.",
      explanation:
        "Compensation that is left entirely to one party's unilateral discretion introduces material uncertainty over the price (thaman) of the service, which is a form of Gharar.",
      principleName: "Certainty of Price (Thaman Ma'lum)",
      principleDescription:
        "The price in any exchange contract must be defined or determinable by an objective formula.",
      source: "AAOIFI Shariah Standard No. 8 — Murabaha & Pricing Principles",
    },
    {
      id: 4,
      type: "MAYSIR",
      clauseText:
        "future equity tokens whose value shall be determined by the eventual market price upon listing, with no guaranteed conversion ratio.",
      explanation:
        "Tying compensation to a wholly speculative future market event with no defined ratio resembles a wager on an uncertain outcome (Maysir). The Contractor is exchanging certain labour for an entirely uncertain return.",
      principleName: "Prohibition of Maysir (ميسر)",
      principleDescription:
        "Zero-sum or purely speculative gain disconnected from real, defined economic exchange is impermissible.",
      source: "AAOIFI Shariah Standard No. 21 — Financial Papers",
    },
    {
      id: 5,
      type: "COMPLIANT",
      clauseText:
        "All deliverables, source code and associated intellectual property shall vest exclusively with the Client upon receipt of full payment for the relevant milestone.",
      explanation:
        "Transfer of ownership conditional on payment is a clear, mutually understood exchange. This mirrors a valid sale (Bay') with defined subject matter and counter-value.",
      principleName: "Validity of Bay' (Sale)",
      principleDescription:
        "An exchange of a defined asset for a defined price upon a defined trigger is permissible.",
      source: "AAOIFI Shariah Standard No. 8",
    },
    {
      id: 6,
      type: "COMPLIANT",
      clauseText:
        "Either party may terminate this Agreement with thirty (30) days written notice.",
      explanation:
        "A symmetric, clearly-defined termination right with an undisputed-amounts settlement is consistent with Islamic contract principles of mutual consent and fairness.",
      principleName: "Mutual Consent (Tara'di)",
      principleDescription:
        "Contracts may be ended by clearly-stated mutual mechanisms without injustice to either party.",
      source: "AAOIFI Shariah Standard No. 25",
    },
  ],
};

type AnalyzeContractInput =
  | string
  | {
      contractText?: string;
      file?: File;
    };

type AnalyzeContractResponse = AnalysisResult & {
  success?: boolean;
  error?: string;
};

export async function analyzeContract(input: AnalyzeContractInput): Promise<AnalysisResult> {
  const contractText = typeof input === "string" ? input : input.contractText ?? "";
  const file = typeof input === "string" ? undefined : input.file;

  const init: RequestInit = {
    method: "POST",
  };

  if (file) {
    const body = new FormData();
    body.append("file", file);
    if (contractText) body.append("contractText", contractText);
    init.body = body;
  } else {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify({ contractText });
  }

  const res = await fetch("/api/analyze", init);
  const data = (await res.json()) as AnalyzeContractResponse;

  if (!res.ok || data.success === false) {
    throw new Error(data.error || "Contract analysis failed");
  }

  return {
    contractText: data.contractText || contractText || MOCK_RESULT.contractText,
    findings: data.findings ?? [],
    summary: data.summary ?? { violations: 0, uncertain: 0, compliant: 0 },
  };
}
