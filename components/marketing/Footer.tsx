import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footer } from "@/content/text";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p>
            © {new Date().getFullYear()} {footer.copyrightSuffix}
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:text-foreground">
            {footer.pricing}
          </Link>
          <Link href="/calculators/bmr-tdee" className="hover:text-foreground">
            {footer.calculator}
          </Link>
          <Link href="/quiz" className="hover:text-foreground">
            {footer.cta}
          </Link>
        </div>
      </div>
    </footer>
  );
}
