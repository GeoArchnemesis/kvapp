import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: "linear-gradient(135deg, #ef4694, #8b85f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="8" stroke="white" strokeOpacity={0.35} strokeWidth={3} fill="none" />
          <path
            d="M16 8a8 8 0 0 1 6.9 11.98"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
