import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "ZeroPoint: Ditch the notebook. Every range day, logged. Free on iPhone and Android.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => readFile(path.join(process.cwd(), "assets/og", file));
const dataUrl = async (file: string, type: string) =>
  `data:${type};base64,${(await asset(file)).toString("base64")}`;

// The share card for every page: the Home hero, rendered at build time.
export default async function OpengraphImage() {
  const [bold, regular, notebook, phone] = await Promise.all([
    asset("jakarta-extrabold.ttf"),
    asset("jakarta-regular.ttf"),
    dataUrl("notebook.png", "image/png"),
    dataUrl("home.jpg", "image/jpeg"),
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
        <div style={{ display: "flex", flexDirection: "column", width: 620 }}>
          <div style={{ color: "#ad3a00", fontSize: 24, fontWeight: 800, letterSpacing: 5 }}>
            THE SHOOTING LOG
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#161614",
            }}
          >
            <span>Ditch the</span>
            <span style={{ position: "relative", display: "flex", alignSelf: "flex-start" }}>
              notebook.
              <span
                style={{
                  position: "absolute",
                  left: -12,
                  right: -20,
                  top: 54,
                  height: 11,
                  borderRadius: 99,
                  background: "#ff5a1f",
                  transform: "rotate(-2.5deg)",
                }}
              />
            </span>
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#55564d", fontWeight: 400 }}>
            Every range day, logged.
          </div>
          <div style={{ marginTop: 34, fontSize: 26, color: "#161614", fontWeight: 800 }}>
            Free on iPhone and Android
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 520, height: 630 }}>
          <img
            src={notebook}
            width={430}
            height={430}
            style={{ position: "absolute", left: -10, top: 110, transform: "rotate(-7deg)" }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 210,
              top: 10,
              width: 236,
              height: 512,
              padding: 8,
              borderRadius: 40,
              background: "#121212",
              transform: "rotate(6deg)",
            }}
          >
            <img src={phone} width={220} height={478} style={{ borderRadius: 33 }} />
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
