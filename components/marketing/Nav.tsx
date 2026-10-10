import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ClockIcon, TagIcon, CalculatorIcon } from "@/components/icons";
import { nav, primaryCta } from "@/content/text";

const links = [
  { href: "/#how-it-works", label: nav.howItWorks, Icon: ClockIcon },
  { href: "/pricing", label: nav.pricing, Icon: TagIcon },
  { href: "/calculators/bmr-tdee", label: nav.calculator, Icon: CalculatorIcon },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {links.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-1.5 hover:text-accent">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/quiz" className="text-sm">
          {primaryCta}
        </ButtonLink>
      </div>
    </header>
  );
}
