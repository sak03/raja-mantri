import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0F5C5C 0%, #0A4545 100%)",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 14,
              background: "#C9A227",
              borderRadius: 4,
              marginBottom: 6,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: "#F7F1E6",
              fontFamily: "Georgia, serif",
              letterSpacing: 2,
              lineHeight: 1,
              display: "flex",
            }}
          >
            RM
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#E0C35A",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#7EC8C8",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#5CBC8A",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#E07264",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
