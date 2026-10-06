import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(33,31,43,0.04),0_8px_24px_rgba(33,31,43,0.06)]",
        className
      )}
      {...props}
    />
  );
}
