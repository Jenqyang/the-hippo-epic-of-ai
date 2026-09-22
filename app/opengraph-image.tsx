import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteLatinTitle, siteName, siteTitle } from "@/app/_data/site";

// The share card mirrors the masthead: the emblem remains artwork, while the
// publication name is real type rendered with the same Chinese face as the UI.
export const alt = siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const asDataUrl = async (file: string) =>
  `data:image/png;base64,${await readFile(join(process.cwd(), "public", file), "base64")}`;

const huiwenMincho = await readFile(
  join(process.cwd(), "app", "fonts", "Huiwen-Mincho.ttf"),
);

export default async function OpengraphImage() {
  const emblem = await asDataUrl("masthead-emblem.png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          background: "#ffffff",
          borderTop: "14px solid #111111",
          borderBottom: "14px solid #111111",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={emblem} width={220} height={220} style={{ filter: "grayscale(1)" }} />
        <div
          style={{
            width: 720,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#121212",
            fontFamily: "Huiwen Mincho",
          }}
        >
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              fontSize: 118,
              lineHeight: 0.9,
              letterSpacing: -6,
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              whiteSpace: "nowrap",
              fontSize: 27,
              lineHeight: 1,
              letterSpacing: 7,
              textTransform: "uppercase",
            }}
          >
            {siteLatinTitle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Huiwen Mincho",
          data: huiwenMincho,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
