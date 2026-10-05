export const site = {
  name: "Srijan Challapalli",
  shortName: "SC",
  url: "https://srijanchallapalli.com",
  title: "Srijan Challapalli — AI student & software engineer",
  description:
    "AI student at Purdue building software, systems, and things I wish already existed — an iOS app with 300+ users, a storage engine in Rust, and AI agents that do real work.",
  roles: ["AI Student", "Software Engineer", "Builder"],
  email: "srijanchallapalli@gmail.com",
  resume: "/resume.pdf",
  links: {
    github: "https://github.com/SrijanChallapalli",
    linkedin: "https://linkedin.com/in/srijan-challapalli",
    x: "https://x.com/dongaranga",
  },
  location: {
    label: "West Lafayette, IN",
    timeZone: "America/Indiana/Indianapolis",
    latitude: 40.4259,
    longitude: -86.9081,
  },
  /**
   * Powers "Listening" in the status strip. Connect Spotify to Last.fm once
   * (last.fm/settings/applications), then create a key at last.fm/api/account/create.
   * The key is read-only and safe to publish. Leave blank to hide the live track.
   */
  lastfm: {
    user: "schallap",
    apiKey: "bb8af69b7c29fa55660a4698f2337d3c",
  },
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
] as const;

export const about = {
  paragraphs: [
    "I'm an AI student at Purdue. Most of what I know came from building things that started as ways to make my own life easier.",
    "Before code, it was badminton. I was ranked No. 1 in the country.",
  ],
  facts: [
    ["Based in", "West Lafayette, Indiana"],
    ["Studying", "B.S. Artificial Intelligence, Purdue · '28"],
    ["Off-screen", "Badminton, lifting, hiking, football"],
    ["Open to", "SWE & AI engineering internships"],
  ],
} as const;

export const now = [
  { topic: "Distributed systems", note: "Raft, replication, and what happens when a node lies." },
  { topic: "AI inference", note: "Batching, KV caches, and why tokens/sec isn't the whole story." },
  { topic: "Rust & C++", note: "Keeping two LSM engines byte-compatible." },
  { topic: "Blockchain infrastructure", note: "Oracles, AMMs, and contract-size limits." },
  { topic: "Neural networks", note: "Rebuilding the basics from scratch, without a framework." },
] as const;

export const stack = [
  { label: "Languages", items: ["Python", "TypeScript", "Rust", "C++", "Swift", "Java", "SQL"] },
  { label: "Frameworks", items: ["React", "Next.js", "FastAPI", "Flask", "Express", "SwiftUI"] },
  { label: "Data & tools", items: ["PostgreSQL", "Supabase", "Pandas", "XGBoost", "Linux", "Vercel", "Vitest"] },
  { label: "Interests", items: ["AI Systems", "Distributed Systems", "Full Stack", "Developer Tools"] },
] as const;
