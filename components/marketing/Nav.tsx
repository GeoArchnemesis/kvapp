import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export function Nav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          Kvapp
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          <Link href="/#how-it-works" className="hover:text-accent">
            როგორ მუშაობს
          </Link>
          <Link href="/pricing" className="hover:text-accent">
            ფასები
          </Link>
          <Link href="/calculators/bmr-tdee" className="hover:text-accent">
            კალკულატორი
          </Link>
        </nav>
        <ButtonLink href="/quiz" className="text-sm">
          იპოვეთ თქვენი პაკეტი
        </ButtonLink>
      </div>
    </header>
  );
}
