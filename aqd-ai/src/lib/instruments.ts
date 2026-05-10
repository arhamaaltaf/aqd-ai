export interface Instrument {
  key: string;
  islamicName: string;
  arabic: string;
  conventionalName: string;
  description: { islamic: string; conventional: string };
  islamicPoints: string[];
  conventionalPoints: string[];
  shariahIssue: string;
  ruling: string;
}

export const INSTRUMENTS: Instrument[] = [
  {
    key: "Mudarabah",
    islamicName: "Mudarabah",
    arabic: "مضاربة",
    conventionalName: "Business Loan",
    description: {
      islamic: "Capital provider funds the venture; entrepreneur (mudarib) operates it. Profit shared at an agreed ratio; loss falls on the capital provider unless caused by negligence.",
      conventional: "Bank lends a fixed principal at a fixed interest rate. Borrower carries 100% of the downside.",
    },
    islamicPoints: [
      "Capital provider funds, manager operates",
      "Profit shared at agreed ratio (e.g. 60/40)",
      "Capital loss borne by financier (absent negligence)",
      "Bank's return tied to real performance",
    ],
    conventionalPoints: [
      "Fixed interest charged regardless of outcome",
      "Borrower bears 100% of business loss",
      "Bank profits even if venture fails",
      "No real risk-sharing",
    ],
    shariahIssue: "Fixed interest = Riba. No risk-sharing.",
    ruling: "Permitted · AAOIFI Standard No. 13",
  },
  {
    key: "Musharakah",
    islamicName: "Musharakah",
    arabic: "مشاركة",
    conventionalName: "Equity-Based Loan",
    description: {
      islamic: "All partners contribute capital; profit and loss are shared proportionally. Used in diminishing form (Diminishing Musharakah) for home finance.",
      conventional: "Bank lends at interest, with no equity stake or upside in the project's success.",
    },
    islamicPoints: [
      "All partners contribute capital",
      "Profit AND loss shared by capital ratio",
      "All partners may participate in management",
      "Diminishing form used for home finance",
    ],
    conventionalPoints: [
      "Bank lends at fixed/floating interest",
      "No upside participation by lender",
      "Borrower bears entire downside",
      "Pure debtor-creditor relationship",
    ],
    shariahIssue: "Interest charged on debt without partnership in risk.",
    ruling: "Permitted · AAOIFI Standard No. 12",
  },
  {
    key: "Ijarah",
    islamicName: "Ijarah",
    arabic: "إجارة",
    conventionalName: "Operating / Finance Lease",
    description: {
      islamic: "Bank purchases the asset and leases it to the customer for an agreed rent. The bank retains ownership risk (major repairs); lease may end with ownership transfer (Ijarah Muntahia Bittamleek).",
      conventional: "Lease structured as a financing instrument with embedded interest; late-payment penalties often compound.",
    },
    islamicPoints: [
      "Bank buys the asset first (real ownership)",
      "Bank bears ownership risk (e.g. major repairs)",
      "Rent agreed in advance, defined and known",
      "Optional ownership transfer at end of lease",
    ],
    conventionalPoints: [
      "Interest embedded in lease pricing",
      "Compounding late-payment charges",
      "Ownership risk often shifted to lessee",
      "Effectively a disguised loan",
    ],
    shariahIssue: "Interest-based pricing and risk transfer to lessee.",
    ruling: "Permitted · AAOIFI Standard No. 9",
  },
  {
    key: "Murabaha",
    islamicName: "Murabaha",
    arabic: "مرابحة",
    conventionalName: "Installment Loan",
    description: {
      islamic: "Bank purchases the asset itself and resells it to the customer at cost plus a disclosed, fixed markup, payable in installments. No compounding on late payment.",
      conventional: "Bank lends money directly; customer buys the asset; interest compounds on the outstanding principal.",
    },
    islamicPoints: [
      "Bank takes real ownership of asset first",
      "Cost + disclosed fixed markup",
      "Markup is fixed — never compounds",
      "Late payment: no additional Riba",
    ],
    conventionalPoints: [
      "Bank lends money, never owns the asset",
      "Interest compounds on outstanding principal",
      "Late fees add further interest",
      "Pure debt transaction",
    ],
    shariahIssue: "Direct lending of money at compounding interest is Riba.",
    ruling: "Permitted · AAOIFI Standard No. 8",
  },
  {
    key: "Sukuk",
    islamicName: "Sukuk",
    arabic: "صكوك",
    conventionalName: "Bonds",
    description: {
      islamic: "Certificates representing undivided ownership in real underlying assets or projects. Returns derived from actual performance of those assets.",
      conventional: "Debt instruments that pay a fixed coupon (interest); principal is contractually guaranteed at maturity.",
    },
    islamicPoints: [
      "Ownership in real underlying assets",
      "Returns tied to actual asset performance",
      "Principal not guaranteed — true risk",
      "Tradeable on Shariah-compliant exchanges",
    ],
    conventionalPoints: [
      "Pure debt — issuer owes the holder",
      "Fixed coupon = predetermined interest",
      "Principal guaranteed regardless of outcome",
      "No exposure to underlying performance",
    ],
    shariahIssue: "Fixed coupon and guaranteed principal constitute Riba.",
    ruling: "Permitted · AAOIFI Standard No. 17",
  },
  {
    key: "Takaful",
    islamicName: "Takaful",
    arabic: "تكافل",
    conventionalName: "Conventional Insurance",
    description: {
      islamic: "Participants contribute to a shared risk pool as tabarru' (donation). The operator earns a defined fee. Surplus is returned to participants.",
      conventional: "Premium is effectively the sale of an uncertain outcome (Gharar); insurer profits from others' misfortune; reserves are invested in interest-bearing instruments.",
    },
    islamicPoints: [
      "Contributions are donations to a mutual pool",
      "Operator earns a transparent fee, not a margin on risk",
      "Surplus returned to participants",
      "Reserves invested in Shariah-compliant assets",
    ],
    conventionalPoints: [
      "Premium = sale of uncertainty (Gharar)",
      "Insurer profits from others' losses",
      "Premiums invested in interest-bearing assets",
      "Zero-sum element resembles Maysir",
    ],
    shariahIssue: "Combines Gharar, Riba (in investments), and Maysir.",
    ruling: "Permitted · AAOIFI Standard No. 26",
  },
];
