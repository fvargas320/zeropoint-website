import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Card = {
  eyebrow: string;
  /** The headline, a line each. */
  lines: [string, string];
  /** Smaller for headlines that would run into the phones. */
  titleSize?: number;
  /** Files in assets/og: front, then left and right behind it. */
  screens: [string, string, string];
  /** Written on the tape, from the front phone's screen. */
  tape: string;
};

const SEAM = 392;
const LEFT = 64;
const LOGO = { width: 160, height: 86 };
const TAPE = "#e6d9b8";

const asset = (file: string) => readFile(path.join(process.cwd(), "assets/og", file));
const dataUrl = async (file: string) =>
  `data:image/${file.endsWith("png") ? "png" : "jpeg"};base64,${(await asset(file)).toString("base64")}`;

function Phone({ src, width, style }: { src: string; width: number; style: React.CSSProperties }) {
  const inner = width - 12;
  return (
    <div style={{ display: "flex", position: "absolute", padding: 6, borderRadius: width * 0.15, background: "#1b1b19", boxShadow: "0 0 0 2px #8d8a80, 0 26px 40px #0000007a", ...style }}>
      <img src={src} width={inner} height={Math.round(inner * 2.17)} style={{ borderRadius: width * 0.13, objectFit: "cover", objectPosition: "top" }} />
    </div>
  );
}

function Tape({ style }: { style: React.CSSProperties }) {
  return <div style={{ display: "flex", position: "absolute", width: 104, height: 32, background: TAPE, opacity: 0.92, boxShadow: "0 1px 3px #0000004d", ...style }} />;
}

function Hole({ left, top }: { left: number; top: number }) {
  return (
    <div style={{ display: "flex", position: "absolute", left, top, width: 34, height: 34, alignItems: "center", justifyContent: "center", borderRadius: 99, background: "#5a1d008c" }}>
      <div style={{ display: "flex", width: 24, height: 24, borderRadius: 99, background: "#14100c" }} />
    </div>
  );
}

/** The share card: the landing hero on its side. The app taped across the seam
    of a cream page and an orange backer, rendered at build time. */
export async function shareCard({ eyebrow, lines, titleSize = 90, screens, tape }: Card) {
  const [bold, regular, marker, logo, front, left, right] = await Promise.all([
    asset("jakarta-extrabold.ttf"),
    asset("jakarta-regular.ttf"),
    asset("permanent-marker.ttf"),
    dataUrl("wordmark-on-orange.png"),
    ...screens.map(dataUrl),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#ece3d1", fontFamily: "Jakarta", overflow: "hidden" }}>
        <div style={{ display: "flex", position: "absolute", left: 0, right: 0, top: SEAM, bottom: 0, background: "#ff5a1f" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "absolute", left: LEFT, top: 0, width: 620, height: SEAM }}>
          <div style={{ color: "#ad3a00", fontSize: 23, fontWeight: 800, letterSpacing: 3.5 }}>{eyebrow.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 18, color: "#161614", fontSize: titleSize, fontWeight: 800, letterSpacing: -3.5, lineHeight: 1.06 }}>
            <span>{lines[0]}</span>
            <span>{lines[1]}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "absolute", left: LEFT, top: SEAM, height: 630 - SEAM, color: "#161614" }}>
          <img src={logo} width={LOGO.width} height={LOGO.height} />
          <div style={{ marginTop: 16, fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>Free on iPhone and Android</div>
        </div>

        <Hole left={606} top={500} />
        <Hole left={654} top={548} />
        <Hole left={560} top={556} />

        <Phone src={left} width={196} style={{ left: 668, top: 92, transform: "rotate(-7deg)" }} />
        <Phone src={right} width={196} style={{ left: 980, top: 100, transform: "rotate(7deg)" }} />
        <Phone src={front} width={244} style={{ left: 802, top: 40 }} />

        <Tape style={{ left: 644, top: 118, transform: "rotate(-38deg)" }} />
        <Tape style={{ left: 1076, top: 124, transform: "rotate(40deg)" }} />
        <Tape style={{ left: 684, top: 462, transform: "rotate(-24deg)" }} />
        <div style={{ display: "flex", position: "absolute", right: 34, top: 530, padding: "9px 22px", background: TAPE, boxShadow: "0 1px 3px #0000004d", color: "#161614", fontFamily: "Marker", fontSize: 25, transform: "rotate(-5deg)" }}>
          {tape}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: bold, weight: 800, style: "normal" },
        { name: "Jakarta", data: regular, weight: 400, style: "normal" },
        { name: "Marker", data: marker, weight: 400, style: "normal" },
      ],
    },
  );
}
