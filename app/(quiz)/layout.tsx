import Link from "next/link";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-border px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          Kvapp
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-12">{children}</main>
    </div>
  );
}
