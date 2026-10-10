import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminLogin } from "@/content/text";

export const metadata: Metadata = {
  title: adminLogin.metaTitle,
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-accent-soft/30 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <Card>
          <h1 className="text-center text-xl font-bold">{adminLogin.heading}</h1>
          <p className="mt-1.5 text-center text-sm text-foreground-muted">
            {adminLogin.subheading}
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
