"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";
import { adminLogin } from "@/content/text";

const emailSchema = z.string().trim().min(1, adminLogin.emailRequired).email(adminLogin.emailInvalid);

export type RequestMagicLinkState = {
  sent?: boolean;
  error?: string;
  value?: string;
};

export async function requestMagicLinkAction(
  _prevState: RequestMagicLinkState,
  formData: FormData
): Promise<RequestMagicLinkState> {
  const value = formData.get("email")?.toString() ?? "";
  const parsed = emailSchema.safeParse(value);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, value };
  }

  // We always show the same "check your email" confirmation below,
  // whether or not this address is actually an admin (see lib/auth.ts's
  // signIn callback, which silently rejects non-admin emails before
  // anything is sent) — this avoids leaking which addresses are valid.
  try {
    await signIn("mailgun-magic-link", { email: parsed.data, redirect: false });
  } catch {
    // Swallow: next-auth throws/redirects internally for rejected or
    // misconfigured sign-ins. The UI response is identical either way.
  }

  return { sent: true };
}

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

// Temporary — see lib/auth.ts's "dev-password" provider doc comment.
// Remove alongside it once Mailgun delivery is confirmed working.
const passwordLoginSchema = z.object({
  email: z.string().trim().min(1, adminLogin.emailRequired).email(adminLogin.emailInvalid),
  password: z.string().min(1, adminLogin.passwordRequired),
});

export type PasswordLoginState = {
  error?: string;
  value?: string;
};

export async function passwordLoginAction(
  _prevState: PasswordLoginState,
  formData: FormData
): Promise<PasswordLoginState> {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const parsed = passwordLoginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, value: email };
  }

  const result = await signIn("dev-password", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  if (typeof result === "string" && result.includes("error=")) {
    return { error: adminLogin.passwordInvalid, value: email };
  }

  redirect("/admin");
}
