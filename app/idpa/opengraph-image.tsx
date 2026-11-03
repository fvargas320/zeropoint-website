import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "ZeroPoint for IDPA shooters: see where your seconds went. A real IDPA match page from the app. Free on iPhone and Android.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => readFile(path.join(process.cwd(), "assets/og", file));
const dataUrl = async (file: string, type: string) =>
  `data:${type};base64,${(await asset(file)).toString("base64")}`;

// The /idpa share card: the site's share-card layout with a real IDPA match
// page render (rangeai docs/design/competition/built/idpa-match-official-375-light.png).
export default async function OpengraphImage() {
  const [bold, regular, target, phone] = await Promise.all([
    asset("jakarta-extrabold.ttf"),
    asset("jakarta-regular.ttf"),
    dataUrl("target.png", "image/png"),
    dataUrl("idpa-match.jpg", "image/jpeg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#ece3d1",
          fontFamily: "Jakarta",
          padding: "64px 0 0 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ color: "#ad3a00", fontSize: 24, fontWeight: 800, letterSpacing: 5 }}>
            FOR IDPA SHOOTERS
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#161614",
            }}
          >
            <span>See where your</span>
            <span>seconds went.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#55564d", fontWeight: 400, lineHeight: 1.35 }}>
            Time plus 1 s per point down plus penalties. Your 5x5 and your class, NV to DM.
          </div>
          <div style={{ marginTop: 30, fontSize: 26, color: "#161614", fontWeight: 800 }}>
            ZeroPoint · Free on iPhone and Android
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 500, height: 630 }}>
          <img
            src={target}
            width={400}
            height={400}
            style={{ position: "absolute", left: -20, top: 150, transform: "rotate(-7deg)" }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 190,
              top: 10,
              width: 256,
              height: 554,
              padding: 8,
              borderRadius: 42,
              background: "#121212",
              transform: "rotate(6deg)",
            }}
          >
            <img src={phone} width={240} height={538} style={{ borderRadius: 35, objectFit: "cover", objectPosition: "top" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: bold, weight: 800, style: "normal" },
        { name: "Jakarta", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
