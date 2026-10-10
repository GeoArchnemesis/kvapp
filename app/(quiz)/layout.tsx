import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-accent-soft/30">
      <header className="border-b border-border bg-background px-4 py-4">
        <Link href="/">
          <Logo />
        </Link>
      </header>
      {/*
        No max-width here — the intro/step pages are a single narrow
        question flow and set their own max-w-xl; /quiz/result shows a
        3-column pricing comparison and needs real width, or the pricing
        cards get squeezed too narrow for their CTA text (even with
        whitespace-nowrap, the container itself becomes too small).
      */}
      <main className="mx-auto flex w-full flex-1 flex-col px-4 py-12">{children}</main>
    </div>
  );
}
