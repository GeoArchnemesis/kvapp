import { cn } from "@/lib/utils/cn";
import { siteMeta } from "@/content/text";

export function LogoMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="url(#kvapp-logo-gradient)" />
      <circle
        cx="16"
        cy="16"
        r="8"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M16 8a8 8 0 0 1 6.9 11.98"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="kvapp-logo-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-lg font-extrabold tracking-tight text-foreground">
        {siteMeta.title}
      </span>
    </span>
  );
}
