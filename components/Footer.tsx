import Link from "next/link";
import { site } from "@/data/site";
import { ConsoleHello } from "./ConsoleHello";

const built = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: site.location.timeZone,
}).format(new Date());

export function Footer() {
  return (
    <footer className="container-page border-t border-rule py-8">
      <div className="t-meta flex flex-col gap-3 text-ink-3 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Set in Geist · Built in West Lafayette · Last deployed {built}</p>
        <p className="flex gap-5">
          <Link href="/projects/" className="transition-colors hover:text-ink">
            All projects
          </Link>
          <a href="#main" className="transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </p>
      </div>
      <ConsoleHello />
    </footer>
  );
}
