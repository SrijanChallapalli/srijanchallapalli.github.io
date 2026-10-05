"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    window.setTimeout(() => root.classList.remove("theme-transition"), 320);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`group relative grid size-9 place-items-center rounded-full text-ink transition-colors duration-200 hover:bg-paper-2 ${className}`}
    >
      {/* Half-filled disc: rotates a half-turn between themes. */}
      <svg
        viewBox="0 0 20 20"
        className="size-[18px] transition-transform duration-500 ease-[var(--ease-out)] [[data-theme=dark]_&]:rotate-180"
        aria-hidden
      >
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
