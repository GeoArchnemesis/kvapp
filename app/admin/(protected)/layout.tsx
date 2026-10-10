import { verifySession } from "@/lib/domain/admin/session";
import { signOutAction } from "@/lib/domain/admin/actions";
import { Logo } from "@/components/ui/Logo";
import { adminDashboard } from "@/content/text";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { email } = await verifySession();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-accent-soft/30">
      <header className="flex items-center justify-between border-b border-border bg-background px-4 py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground-muted">{email}</span>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent-soft"
            >
              {adminDashboard.signOut}
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
    </div>
  );
}
