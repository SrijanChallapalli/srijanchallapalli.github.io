"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";

/**
 * Privacy-friendly view tracking via GoatCounter (no cookies, no consent
 * banner). count.js records the first page load and automatically ignores
 * localhost; the effect below counts client-side route changes too. Stats live
 * at https://<code>.goatcounter.com. Leave site.analytics.goatcounter blank to
 * disable.
 */
export function Analytics() {
  const code = site.analytics.goatcounter;
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!code) return;
    // The initial load is counted by count.js, so skip the first run.
    if (first.current) {
      first.current = false;
      return;
    }
    const gc = (window as unknown as { goatcounter?: { count?: (o: { path: string }) => void } }).goatcounter;
    gc?.count?.({ path: pathname });
  }, [pathname, code]);

  if (!code) return null;

  return (
    <Script
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
