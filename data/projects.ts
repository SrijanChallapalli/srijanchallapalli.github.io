export type VisualKind = "chityap" | "lsm" | "applypilot" | "diligence";

export type Project = {
  slug: string;
  name: string;
  year: string;
  category: string;
  oneLiner: string;
  /** One or two sentences — what's interesting about it. */
  blurb: string;
  /** Short, scannable numbers shown in mono. */
  facts: string[];
  stack: string[];
  github?: string;
  live?: string;
  /** Shown when there is no public repo. */
  privateNote?: string;
  /** Visual for the project block (real screenshots or a code-drawn diagram). */
  visual: VisualKind;
};

export const projects: Project[] = [
  {
    slug: "chityap",
    name: "ChitYap",
    year: "2025",
    category: "iOS · Co-founder",
    oneLiner: "A privacy-first social accountability app for close friends.",
    blurb:
      "Co-founded and shipped to 300+ beta users. Real-time feeds, offline retry, push, and an on-device Apple Vision rep counter — on a Supabase/Postgres backend locked down by 60+ row-level security policies.",
    facts: ["300+ beta users", "~5,000 posts", "60+ RLS policies"],
    stack: ["Swift", "SwiftUI", "Supabase", "PostgreSQL", "Apple Vision", "HealthKit", "APNs"],
    github: "https://github.com/SrijanChallapalli/ChitYap",
    live: "https://chityap.com/",
    visual: "chityap",
  },
  {
    slug: "lsm-storage-engine",
    name: "LSM-Tree Storage Engine",
    year: "2026",
    category: "Systems · Rust & C++",
    oneLiner: "A persistent key-value store written from scratch — then ported to C++.",
    blurb:
      "Write-ahead log, memtable, SSTables, Bloom filters, background compaction, and crash recovery via WAL replay. The C++17 port writes SSTables byte-compatible with the Rust version.",
    facts: ["WAL replay", "p99 via Criterion + perf", "Rust ⇄ C++17"],
    stack: ["Rust", "C++", "Tokio", "Criterion", "CMake", "Linux perf"],
    github: "https://github.com/SrijanChallapalli/LSM-Storage-Engine",
    visual: "lsm",
  },
  {
    slug: "applypilot",
    name: "ApplyPilot",
    year: "2026",
    category: "Full Stack · AI",
    oneLiner: "A human-in-the-loop job search platform that ranks roles — and never applies for you.",
    blurb:
      "Ingests live postings from Greenhouse, Ashby, and Lever across ~30 companies, ranks them with explainable scoring and hard eligibility checks, and prepares review-ready applications.",
    facts: ["~30 companies", "21 API routes", "64+ tests"],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Vercel", "Vitest"],
    privateNote: "Private repo",
    visual: "applypilot",
  },
  {
    slug: "due-diligence-agent",
    name: "Financial Due Diligence Agent",
    year: "2026",
    category: "AI Agents · Finance",
    oneLiner: "An AI system for Quality of Earnings work that scores how far each source can be trusted.",
    blurb:
      "Weighs evidence on recency, corroboration, and materiality, flags contradictions, and analyzes revenue concentration — while every number is checked deterministically, never by the model.",
    facts: ["5,000+ agent runs", "71s p50 per packet", "0 LLM arithmetic"],
    stack: ["TypeScript", "LLM agents", "PostgreSQL", "Supabase", "LlamaParse"],
    privateNote: "Built at MergeWorks",
    visual: "diligence",
  },
];

export type ArchiveProject = {
  name: string;
  category: string;
  description: string;
  stack: string[];
  href?: string;
};

export const archive: { group: string; items: ArchiveProject[] }[] = [
  {
    group: "On-chain",
    items: [
      {
        name: "Secretariat",
        category: "Marketplace · ETHDenver",
        description:
          "Tokenized-asset marketplace — 17 Solidity contracts, a factory/deployer split to beat the 24 KB contract-size limit, and an off-chain XGBoost valuation engine.",
        stack: ["Solidity", "Foundry", "Next.js", "XGBoost"],
        href: "https://github.com/SrijanChallapalli/Secretariat",
      },
      {
        name: "Over-Collateralized Lending",
        category: "DeFi",
        description: "Lending protocol with collateral-tracked borrowing power and a liquidation path for underwater positions.",
        stack: ["Solidity", "Hardhat", "Wagmi"],
        href: "https://github.com/SrijanChallapalli/challenge-over-collateralized-lending",
      },
      {
        name: "MyUSD Stablecoin",
        category: "Stablecoin",
        description: "Single-collateral, Dai-style stablecoin that holds its peg with rates, burning, and liquidations.",
        stack: ["Solidity", "Hardhat", "Viem"],
        href: "https://github.com/SrijanChallapalli/challenge-stablecoins",
      },
      {
        name: "Decentralized Oracles",
        category: "Oracles",
        description: "Whitelist, staking, and optimistic oracle designs, each trading security against efficiency.",
        stack: ["Solidity", "Hardhat"],
        href: "https://github.com/SrijanChallapalli/challenge-oracles",
      },
      {
        name: "Constant-Product DEX",
        category: "DeFi",
        description: "A minimal Uniswap-v2-style AMM on x·y=k with liquidity provisioning and fee-earning LP shares.",
        stack: ["Solidity", "Hardhat"],
        href: "https://github.com/SrijanChallapalli/challenge-dex",
      },
      {
        name: "Dice Game & Exploit",
        category: "Security",
        description: "A block-hash dice game, then an attacker contract that predicts every roll.",
        stack: ["Solidity"],
        href: "https://github.com/SrijanChallapalli/challenge-dice-game",
      },
      {
        name: "Crowdfunding dApp",
        category: "dApp",
        description: "Trustless group funding — released at goal, refundable otherwise.",
        stack: ["Solidity", "Next.js"],
        href: "https://github.com/SrijanChallapalli/challenge-crowdfunding",
      },
      {
        name: "Token Vendor",
        category: "ERC-20",
        description: "An ERC-20 and a vending-machine contract that buys and sells it.",
        stack: ["Solidity", "OpenZeppelin"],
        href: "https://github.com/SrijanChallapalli/challenge-token-vendor",
      },
      {
        name: "Asset Tokenization",
        category: "RWA",
        description: "Issuing real-world assets as transferable ERC tokens.",
        stack: ["Solidity"],
        href: "https://github.com/SrijanChallapalli/challenge-tokenization",
      },
    ],
  },
  {
    group: "Experiments",
    items: [
      {
        name: "DevGuard",
        category: "DevSecOps",
        description: "Zero-config SCA, SAST, IaC, container, and secrets scans on every push — deduped, ranked, with auto-fix PRs.",
        stack: ["Python", "Docker", "GitHub Apps", "Semgrep"],
        href: "https://github.com/SrijanChallapalli/DevGuard",
      },
      {
        name: "FrameAI",
        category: "AI / LLM",
        description: "Structured reasoning engine that decomposes a prompt into facts, strategies, and rationales.",
        stack: ["Python", "FastAPI", "React"],
        href: "https://github.com/SrijanChallapalli/frameAI",
      },
      {
        name: "APEX Coach",
        category: "AI coach",
        description: "Fitness coach where a tested deterministic engine does the math and the LLM only explains.",
        stack: ["React", "Python", "SSE"],
      },
      {
        name: "RangeRunner",
        category: "Algo trading",
        description: "Opening-range-breakout assistant with simulated bracket orders — paper-only by design.",
        stack: ["Python", "Alpaca", "Pandas"],
      },
      {
        name: "ResuMate",
        category: "AI / NLP",
        description: "Resume-to-job matcher with hybrid keyword, semantic, and evidence scoring.",
        stack: ["Python", "NLP"],
        href: "https://github.com/SrijanChallapalli/ResuMate",
      },
      {
        name: "Assessment-First Tutor",
        category: "EdTech",
        description: "Diagnose → teach → verify loop that targets exactly the gaps a pre-test finds.",
        stack: ["FastAPI", "React", "LLM"],
        href: "https://github.com/SrijanChallapalli/Assessment-First-Tutor",
      },
      {
        name: "Pulse of Profit",
        category: "Fintech",
        description: "RSI, MACD, OBV, and Ichimoku as interactive charts with data-source fallback.",
        stack: ["Python", "Flask", "Plotly"],
        href: "https://github.com/SrijanChallapalli/PulseOfProfit",
      },
    ],
  },
];

/** Where a project's title should take you: the live product, else the repo. */
export const primaryLink = (p: Project) => p.live ?? p.github;
