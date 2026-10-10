import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "currentColor",
};

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2 3 10.8V21h6v-6.5h6V21h6V10.8L12 3.2Z" />
    </svg>
  );
}

export function RecipesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="3.2" rx="1.6" />
      <rect x="4" y="10.4" width="16" height="3.2" rx="1.6" />
      <rect x="4" y="15.8" width="16" height="3.2" rx="1.6" />
    </svg>
  );
}

export function ProfileIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7v.5H4V21Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.7L12 3.5Z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}

export function GroceryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16l-1.4 11.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 7Z" />
      <path d="M8 7a4 4 0 0 1 8 0" fill="none" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5a5.5 5.5 0 0 0-5.5 5.5v3.3L4.5 15h15L17.5 11.3V8A5.5 5.5 0 0 0 12 2.5Z" />
      <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0Z" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12.6 3H5a2 2 0 0 0-2 2v7.6c0 .5.2 1 .6 1.4l9 9a2 2 0 0 0 2.8 0l6.6-6.6a2 2 0 0 0 0-2.8l-9-9A2 2 0 0 0 12.6 3Z" />
      <circle cx="8" cy="8" r="1.6" fill="var(--background)" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4.3 3.4A.6.6 0 0 1 4 19V6a1 1 0 0 1 0 0Z" />
    </svg>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h12v18l-6-4-6 4V3Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 13 4.5 4.5L19 8" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.4 7.5 10 4.3-1.6 7.5-5 7.5-10v-6L12 2.5Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5c.6 3.7 2.3 5.4 6 6-3.7.6-5.4 2.3-6 6-.6-3.7-2.3-5.4-6-6 3.7-.6 5.4-2.3 6-6Z" />
      <path d="M19 15.5c.3 1.6 1 2.3 2.6 2.6-1.6.3-2.3 1-2.6 2.6-.3-1.6-1-2.3-2.6-2.6 1.6-.3 2.3-1 2.6-2.6Z" />
    </svg>
  );
}

export function CrownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8Z" />
    </svg>
  );
}

const line = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function UserLineIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PhoneLineIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a10 10 0 0 0 4.5 4.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 5 5.1a1.5 1.5 0 0 1 1.5-1.6Z" />
    </svg>
  );
}

export function MessageLineIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 3.5V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
      <path d="M7.5 9.5h9M7.5 12.5h5.5" />
    </svg>
  );
}

export function ShieldLineIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <path d="M12 3.5 4.5 6v5.5c0 4.6 3 8 7.5 9 4.5-1 7.5-4.4 7.5-9V6L12 3.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...line} {...props}>
      <path d="M12 3.5 21 19H3L12 3.5Z" />
      <path d="M12 9.5v4M12 16.5h.01" />
    </svg>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <rect x="6.5" y="5" width="11" height="4" rx="1" fill="var(--background)" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={8 + col * 4}
            cy={12.5 + row * 2.3}
            r="0.9"
            fill="var(--background)"
          />
        ))
      )}
    </svg>
  );
}
