"use client";

import { useId } from "react";

interface BrandLogoProps {
  size?: number;
  className?: string;
  title?: string;
}

/** Brand mark: chit card + crown + RM */
export function BrandLogo({
  size = 32,
  className = "",
  title = "Raja, Mantri & Sipahi",
}: BrandLogoProps) {
  const uid = useId().replace(/:/g, "");
  const bgId = `rmsBg-${uid}`;
  const goldId = `rmsGold-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient
          id={bgId}
          x1="8"
          y1="4"
          x2="56"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F5C5C" />
          <stop offset="1" stopColor="#0A4545" />
        </linearGradient>
        <linearGradient
          id={goldId}
          x1="16"
          y1="8"
          x2="48"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0C35A" />
          <stop offset="1" stopColor="#C9A227" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="14" fill={`url(#${bgId})`} />
      <rect
        x="10"
        y="10"
        width="44"
        height="44"
        rx="11"
        stroke={`url(#${goldId})`}
        strokeWidth="1.5"
        opacity="0.55"
        fill="none"
      />
      <path
        d="M20 26 L24 18 L32 24 L40 18 L44 26 L42 30 H22 L20 26Z"
        fill={`url(#${goldId})`}
      />
      <circle cx="24" cy="17.5" r="1.6" fill="#F7F1E6" />
      <circle cx="32" cy="15.5" r="1.8" fill="#F7F1E6" />
      <circle cx="40" cy="17.5" r="1.6" fill="#F7F1E6" />
      <text
        x="32"
        y="48"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="16"
        fontWeight="700"
        fill="#F7F1E6"
        letterSpacing="0.5"
      >
        RM
      </text>
      <circle cx="20" cy="54.5" r="1.8" fill="#E0C35A" />
      <circle cx="28" cy="54.5" r="1.8" fill="#7EC8C8" />
      <circle cx="36" cy="54.5" r="1.8" fill="#5CBC8A" />
      <circle cx="44" cy="54.5" r="1.8" fill="#E07264" />
    </svg>
  );
}
