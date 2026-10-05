export type Experience = {
  company: string;
  role: string;
  period: string;
  year: string;
  location: string;
  summary: string;
  impact: { value: string; label: string }[];
  details: string[];
  stack: string[];
};

// Mirrors public/resume.pdf — update both together.
export const experience: Experience[] = [
  {
    company: "MergeWorks",
    role: "Software Engineer Intern",
    period: "May 2026 — Present",
    year: "2026",
    location: "Remote",
    summary:
      "Built the M&A due-diligence pipeline that turns messy financial packets into source-cited, audit-ready analysis.",
    impact: [
      { value: "71s", label: "p50 per packet (125s p95), down from hours" },
      { value: "111", label: "passing unit tests" },
      { value: "6", label: "legacy workflows retired" },
    ],
    details: [
      "Transforms Excel files, QuickBooks exports, tax returns, and scanned PDFs into source-cited analysis in 71 seconds at p50 and 125 seconds at p95, replacing hours of manual review.",
      "Built automated checks that verify every financial figure against its source documents — five reconciliation checks at 2% tolerance — so each reported number is traceable and audit-ready.",
      "Led a zero-downtime migration from n8n Data Tables to PostgreSQL and Supabase, retired six legacy workflows, and prevented duplicate paid AI calls.",
    ],
    stack: ["TypeScript", "React", "PostgreSQL", "Supabase", "n8n", "LlamaParse"],
  },
  {
    company: "Cosmos Granite & Marble",
    role: "Software Engineer Intern",
    period: "May 2025 — Aug 2025",
    year: "2025",
    location: "Chantilly, VA",
    summary:
      "Built the lead-generation pipeline behind the sales team's outreach across target states.",
    impact: [
      { value: "1,000+", label: "prospective customers found" },
      { value: "+18%", label: "sales" },
      { value: "+15%", label: "outreach click-through" },
    ],
    details: [
      "Built a Python data-collection pipeline using SerpAPI and web scraping that identified 1,000+ prospective customers across target states — qualified leads that supported an 18% increase in sales.",
      "Automated extraction, filtering, and deduplication of business contact data into state-level datasets that powered targeted campaigns, contributing to a 15% increase in click-through rates.",
      "Sat in on 50+ client consultations with the sales team to refine the pipeline's targeting and filtering criteria.",
    ],
    stack: ["Python", "SerpAPI", "Pandas", "Excel"],
  },
];
