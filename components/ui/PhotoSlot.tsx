import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A photography slot for the hero / how-it-works / pricing sections. Pass
 * `src` once a real photo file is dropped into /public — until then it
 * renders an on-brand placeholder (not a broken image) so the layout still
 * reads as intentional.
 */
export function PhotoSlot({
  src,
  alt,
  icon,
  className,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 640px) 33vw, 100vw",
  priority,
}: {
  src?: string;
  alt: string;
  icon?: ReactNode;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl", aspect, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent-soft to-primary-soft",
        aspect,
        className
      )}
      role="img"
      aria-label={alt}
    >
      {icon ?? <div className="h-10 w-10 rounded-full bg-white/60" />}
    </div>
  );
}
