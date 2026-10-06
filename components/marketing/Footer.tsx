import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kvapp. თბილისი, საქართველო.</p>
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:text-foreground">
            ფასები
          </Link>
          <Link href="/calculators/bmr-tdee" className="hover:text-foreground">
            კალკულატორი
          </Link>
          <Link href="/quiz" className="hover:text-foreground">
            იპოვეთ თქვენი პაკეტი
          </Link>
        </div>
      </div>
    </footer>
  );
}
