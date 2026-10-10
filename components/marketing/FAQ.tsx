"use client";

import { useState } from "react";
import { ChatIcon, ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { faqHeading, faqItems } from "@/content/text";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold">{faqHeading}</h2>
      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface px-6 shadow-[var(--shadow-card)]">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="py-1">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 py-4 text-left font-semibold"
              >
                <ChatIcon className="h-5 w-5 shrink-0 text-accent" />
                <span className="flex-1">{item.q}</span>
                <ChevronDownIcon
                  className={cn(
                    "h-5 w-5 shrink-0 text-foreground-muted transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 pl-8 pr-8 text-sm text-foreground-muted">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
