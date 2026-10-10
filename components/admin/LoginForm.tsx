"use client";

import { useActionState, useState } from "react";
import { passwordLoginAction, type PasswordLoginState } from "@/lib/domain/admin/actions";
import { adminLogin } from "@/content/text";
import { AlertIcon, MailIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const initialState: PasswordLoginState = {};

// Magic-link sign-in (lib/domain/admin/actions.ts's requestMagicLinkAction,
// lib/auth.ts's "mailgun-magic-link" provider) is already built and tested
// end-to-end, but not shown here for now — the admin only wants the
// password shortcut (lib/auth.ts's temporary "dev-password" provider) in
// the UI today. Re-add the magic-link form here once it's wanted again.
export function LoginForm() {
  const [state, formAction, pending] = useActionState(passwordLoginAction, initialState);
  const [email, setEmail] = useState(state.value ?? "");
  const [password, setPassword] = useState("");

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="text-sm font-bold">
          {adminLogin.emailLabel}
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 focus-within:border-primary">
          <MailIcon className="h-4 w-4 shrink-0 text-foreground-muted" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(state.error)}
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-bold">
          {adminLogin.passwordLabel}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={Boolean(state.error)}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
        />
        {state.error && (
          <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary">
            <AlertIcon className="h-3.5 w-3.5 shrink-0" />
            {state.error}
          </p>
        )}
      </div>

      <Button type="submit" disabled={pending} className={cn("w-full", pending && "opacity-70")}>
        {pending ? adminLogin.submitting : adminLogin.passwordSubmit}
      </Button>
    </form>
  );
}
