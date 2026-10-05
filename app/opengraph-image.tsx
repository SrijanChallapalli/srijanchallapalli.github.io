import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const alt = `${site.name} — AI student & software engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) =>
  readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

export default async function OpenGraphImage() {
  const [semibold, mono] = await Promise.all([
    font("geist-sans/Geist-SemiBold.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f1ec",
          color: "#121211",
          padding: "64px 72px",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "GeistMono", fontSize: 22, color: "#57544e", letterSpacing: 1 }}>
          <span>AI STUDENT / SOFTWARE ENGINEER / BUILDER</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, background: "#d93f14" }} />
            WEST LAFAYETTE, IN
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, lineHeight: 0.86, letterSpacing: -9 }}>
          <span>Srijan</span>
          <span>Challapalli</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "GeistMono", fontSize: 22, color: "#57544e" }}>
          <span>srijanchallapalli.com</span>
          <span>ChitYap · LSM engine · ApplyPilot · QoE agent</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600 },
        { name: "GeistMono", data: mono, weight: 400 },
      ],
    },
  );
}
