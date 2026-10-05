import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[80svh] flex-col justify-center pt-28">
      <p className="t-meta text-ink-3">404 · key not found</p>
      <h1 className="t-display mt-6">Not here.</h1>
      <p className="t-lead mt-8 max-w-[34ch] text-ink-2">
        The bloom filter said maybe, the SSTables said no. This page doesn&apos;t exist.
      </p>
      <Link href="/" className="group mt-10 inline-flex items-center gap-2 text-lg font-medium">
        <span className="link-underline">Back home</span>
        <span className="arrow arrow-e" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}
