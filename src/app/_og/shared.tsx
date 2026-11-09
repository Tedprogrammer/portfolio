import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { Locale } from "@/lib/i18n";

const ogDirectory = join(process.cwd(), "src", "app", "_og");

export const ogSize = { width: 1200, height: 630 };
// Served as JPEG: the photo makes a PNG around 500 KB, and WhatsApp in
// particular is unreliable with preview images much over 300 KB.
export const ogContentType = "image/jpeg";

// Satori does not understand oklch, so these mirror the tokens in globals.css
// as hex values.
const colors = {
  background: "#000000",
  paper: "#f4f1fb",
  ink: "#000000",
  accent: "#7a3cf0",
};

// robot.png (transparent) is 3:2, so at the card's full width it is 800px tall and is
// centre-cropped to the 630px canvas.
const photo = { width: 1200, height: 800, top: -85 };
const card = { left: 100, top: 330, height: 220 };

async function loadAssets() {
  const [latoBlack, beVietnamProBlack, plexMono, robot] = await Promise.all([
    readFile(join(ogDirectory, "Lato-Black.ttf")),
    // Lato has no Vietnamese glyphs, so Vietnamese titles use Be Vietnam Pro.
    readFile(join(ogDirectory, "BeVietnamPro-Black.ttf")),
    readFile(join(ogDirectory, "IBMPlexMono-Medium.ttf")),
    readFile(join(ogDirectory, "robot.png")),
  ]);

  return {
    fonts: [
      {
        name: "Lato",
        data: latoBlack,
        weight: 900 as const,
        style: "normal" as const,
      },
      {
        name: "Be Vietnam Pro",
        data: beVietnamProBlack,
        weight: 900 as const,
        style: "normal" as const,
      },
      {
        name: "Plex Mono",
        data: plexMono,
        weight: 500 as const,
        style: "normal" as const,
      },
    ],
    robotUrl: `data:image/png;base64,${robot.toString("base64")}`,
  };
}

/**
 * The site's share card: the robot render full-bleed, with a paper card whose
 * title is "cut out" so the render shows through the letters.
 */
export async function renderOgCard({
  lang,
  title,
  tagline,
  titleSize,
}: {
  lang: Locale;
  title: string;
  tagline: string;
  titleSize: number;
}) {
  const { fonts, robotUrl } = await loadAssets();

  const png = new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        background: colors.background,
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain img elements. */}
      <img
        alt=""
        height={photo.height}
        src={robotUrl}
        style={{ position: "absolute", left: 0, top: photo.top }}
        width={photo.width}
      />
      <div
        style={{
          position: "absolute",
          left: card.left,
          right: card.left,
          top: card.top,
          height: card.height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          padding: "0 48px",
          background: colors.paper,
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: lang === "vi" ? "Be Vietnam Pro" : "Lato",
            fontWeight: 900,
            // Be Vietnam Pro Black runs about 30% wider than Lato Black.
            fontSize: lang === "vi" ? Math.round(titleSize * 0.76) : titleSize,
            lineHeight: 1,
            letterSpacing: -2,
            color: "transparent",
            backgroundColor: colors.ink,
            // Darken the render so the cut-out letters read against the paper.
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${robotUrl})`,
            backgroundSize: `100% 100%, ${photo.width}px ${photo.height}px`,
            backgroundPosition: `0 0, -${card.left}px ${photo.top - card.top}px`,
            backgroundClip: "text",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Plex Mono",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.accent,
          }}
        >
          {tagline}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": ogContentType },
  });
}
