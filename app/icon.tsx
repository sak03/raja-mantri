import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Favicon / app icon — matches BrandLogo (chit + crown + RM) */
export default function Icon() {
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
          borderRadius: 112,
          position: "relative",
        }}
      >
        {/* gold inner frame */}
        <div
          style={{
            position: "absolute",
            inset: 36,
            borderRadius: 88,
            border: "6px solid rgba(224, 195, 90, 0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -12,
          }}
        >
          {/* crown */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 0,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "28px solid transparent",
                borderRight: "28px solid transparent",
                borderBottom: "48px solid #E0C35A",
                marginRight: -8,
              }}
            />
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "36px solid transparent",
                borderRight: "36px solid transparent",
                borderBottom: "64px solid #C9A227",
              }}
            />
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "28px solid transparent",
                borderRight: "28px solid transparent",
                borderBottom: "48px solid #E0C35A",
                marginLeft: -8,
              }}
            />
          </div>
          <div
            style={{
              width: 168,
              height: 28,
              background: "#C9A227",
              borderRadius: 6,
              marginTop: -10,
              marginBottom: 18,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 140,
              fontWeight: 700,
              color: "#F7F1E6",
              fontFamily: "Georgia, serif",
              letterSpacing: 4,
              lineHeight: 1,
              display: "flex",
            }}
          >
            RM
          </div>
          {/* role dots */}
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 28,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#E0C35A",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#7EC8C8",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#5CBC8A",
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
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
