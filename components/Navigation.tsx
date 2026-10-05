"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { nav, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { EASE } from "./motion/ease";

export function Navigation() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Compact after a little scroll.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") return setActive(null);
    const ids = nav.map((n) => n.href.split("#")[1]);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  // Close the mobile menu on navigation / Escape, and lock scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`absolute inset-0 border-b transition-[background-color,border-color] duration-300 ${
          compact || open
            ? "border-rule bg-paper/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
        aria-hidden
      />
      <nav
        aria-label="Primary"
        className={`container-page relative flex items-center justify-between transition-[height] duration-300 ease-[var(--ease-out)] ${
          compact ? "h-14" : "h-20"
        }`}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 text-[15px] font-semibold tracking-[-0.03em]"
          aria-label={`${site.name} — home`}
        >
          <span className="relative">
            {site.shortName}
            <span className="absolute -top-0.5 -right-2 size-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <ul className="hidden items-center md:flex">
            {nav.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative block px-3 py-2 text-[15px] text-ink-2 transition-colors duration-200 hover:text-ink aria-[current=true]:text-ink"
                    aria-current={isActive ? "true" : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute top-1/2 left-0.5 size-1 -translate-y-1/2 rounded-full bg-accent transition-[opacity,scale] duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener"
                className="group block px-3 py-2 text-[15px] text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                Resume <span className="arrow arrow-ne">↗</span>
              </a>
            </li>
          </ul>

          <ThemeToggle />

          <button
            ref={menuButton}
            type="button"
            className="t-meta -mr-2 px-2 py-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-x-0 top-14 bottom-0 bg-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="container-page flex flex-col pt-10">
              {[...nav, { label: "All projects", href: "/projects/" }].map((item, i) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-5xl font-semibold tracking-[-0.045em]"
                  >
                    {item.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="container-page absolute inset-x-0 bottom-8 flex gap-6 t-meta text-ink-2">
              <a href={site.resume} target="_blank" rel="noopener">Resume ↗</a>
              <a href={site.links.github} target="_blank" rel="noopener">GitHub ↗</a>
              <a href={site.links.x} target="_blank" rel="noopener">X ↗</a>
              <a href={`mailto:${site.email}`}>Email ↗</a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
