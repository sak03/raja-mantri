import { ImageResponse } from "next/og";

export const alt = "Raja Mantri Chor Sipahi — play free online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0a4545 0%, #0f5c5c 45%, #1a3a2f 100%)",
          color: "#f7f1e6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e0c35a",
            marginBottom: 20,
          }}
        >
          Free · Pass the phone · Hindi & English
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Raja, Mantri & Sipahi
        </div>
        <div style={{ marginTop: 18, fontSize: 36, color: "#c9e8e8" }}>
          राजा मंत्री चोर सिपाही
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "#d8e6e2",
            maxWidth: 820,
          }}
        >
          Classic Indian chits / parchi game — play online with family.
        </div>
      </div>
    ),
    { ...size },
  );
}
