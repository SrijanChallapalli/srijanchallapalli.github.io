"use client";

import { useEffect } from "react";
import { site } from "@/data/site";

let greeted = false;

/** A note for anyone who opens devtools. */
export function ConsoleHello() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      `%cHey — thanks for looking under the hood.%c\nThis site is Next.js + Motion, statically exported to GitHub Pages.\nSource: ${site.links.github}\nSay hi: ${site.email}`,
      "font: 600 14px system-ui; padding: 4px 0;",
      "font: 12px ui-monospace, monospace; color: #8a867e;",
    );
  }, []);
  return null;
}
